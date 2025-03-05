
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
      price: ebook.price,
      returnUrl
    });
    
    // Convert price from string format ($X.XX) to cents (integer)
    const priceString = ebook.price.replace('$', '');
    const priceInCents = Math.round(parseFloat(priceString) * 100);
    
    console.log(`Converted price: ${priceString} -> ${priceInCents} cents`);
    
    if (isNaN(priceInCents) || priceInCents <= 0) {
      throw new Error(`Invalid price: ${ebook.price}`);
    }
    
    // Create a Stripe checkout session with more complete settings
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: ebook.title,
              description: ebook.description || "Herbal e-book",
              // Add metadata to help with fulfillment
              metadata: {
                ebook_id: ebook.id
              }
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}&ebook_id=${ebook.id}`,
      cancel_url: `${returnUrl}?canceled=true`,
      // Add metadata to the session for better tracking
      metadata: {
        ebook_id: ebook.id,
        ebook_title: ebook.title
      },
      // Improve the customer experience with localization
      locale: "auto",
      // Allow customers to adjust quantity
      allow_promotion_codes: true,
    });

    console.log("Checkout session created successfully:", { 
      sessionId: session.id,
      url: session.url
    });

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
      JSON.stringify({ 
        error: error.message,
        stack: error.stack
      }),
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
