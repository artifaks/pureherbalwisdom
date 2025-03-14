// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.com/manual/runtime/manual/getting_started/setup_your_environment

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";

// Initialize Stripe with your secret key
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

// Create a Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface RequestBody {
  sessionId: string;
  userId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Parse the request body
    const { sessionId, userId }: RequestBody = await req.json();

    // Validate the request
    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: "Invalid request: sessionId is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Invalid request: userId is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    // Verify the session is complete and payment was successful
    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ error: "Payment not completed" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Extract ebook IDs from the session metadata
    const ebookIds = session.metadata?.ebookIds?.split(",") || [];

    if (ebookIds.length === 0) {
      return new Response(
        JSON.stringify({ error: "No ebooks found in the session" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Create a purchases table if it doesn't exist
    const { error: tableError } = await supabase.rpc("create_purchases_table_if_not_exists");
    
    if (tableError) {
      console.error("Error creating purchases table:", tableError);
      // Continue anyway, as the table might already exist
    }

    // Record the purchase in the database
    const { data: purchaseData, error: purchaseError } = await supabase
      .from("user_purchases")
      .insert({
        user_id: userId,
        stripe_session_id: sessionId,
        amount_paid: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents
        payment_status: session.payment_status,
        purchase_date: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (purchaseError) {
      return new Response(
        JSON.stringify({
          error: "Failed to record purchase",
          details: purchaseError,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Record the purchased ebooks
    const purchaseItems = ebookIds.map((ebookId) => ({
      purchase_id: purchaseData.id,
      ebook_id: ebookId,
      user_id: userId,
    }));

    const { error: itemsError } = await supabase
      .from("purchase_items")
      .insert(purchaseItems);

    if (itemsError) {
      return new Response(
        JSON.stringify({
          error: "Failed to record purchase items",
          details: itemsError,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Purchase recorded successfully",
        purchaseId: purchaseData.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error recording purchase:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to record purchase",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
