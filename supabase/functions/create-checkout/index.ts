
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";

// Get the Stripe secret key from environment variables
const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
if (!stripeSecretKey) {
  console.error("Missing STRIPE_SECRET_KEY environment variable");
}

const stripe = new Stripe(stripeSecretKey || "", {
  httpClient: Stripe.createFetchHttpClient(),
});

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
    const { ebook, returnUrl } = await req.json();
    
    // Ensure ebook.id is a string for consistency
    ebook.id = String(ebook.id);
    
    // For debugging
    console.log("Creating checkout session for:", { 
      ebookId: ebook.id, 
      title: ebook.title, 
      price: ebook.price 
    });
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: ebook.title,
              description: ebook.description || "Herbal e-book",
            },
            unit_amount: Math.round(parseFloat(ebook.price.replace("$", "")) * 100), // Convert price to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}&ebook_id=${ebook.id}`,
      cancel_url: returnUrl,
    });

    console.log("Checkout session created successfully:", { sessionId: session.id });

    // Return the session ID and URL
    return new Response(
      JSON.stringify({ 
        sessionId: session.id, 
        url: session.url 
      }),
      { 
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        } 
      }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
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
