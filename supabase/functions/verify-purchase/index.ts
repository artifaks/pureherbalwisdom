
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";

// Initialize Stripe
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  httpClient: Stripe.createFetchHttpClient(),
});

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, ebookId, userId } = await req.json();
    
    // Retrieve the checkout session to verify payment
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === "paid") {
      // Update the purchase record in the database
      const { data, error } = await supabase
        .from("purchases")
        .update({ 
          payment_status: "completed",
          updated_at: new Date().toISOString()
        })
        .eq("stripe_session_id", sessionId)
        .eq("user_id", userId)
        .eq("ebook_id", ebookId);
      
      if (error) {
        throw new Error(`Failed to update purchase: ${error.message}`);
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Payment verified and purchase completed" 
        }),
        { 
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          } 
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Payment not completed" 
        }),
        { 
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          } 
        }
      );
    }
  } catch (error) {
    console.error("Error verifying purchase:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        } 
      }
    );
  }
});
