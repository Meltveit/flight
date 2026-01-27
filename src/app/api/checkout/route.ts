import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe if key exists, otherwise handle gracefully
const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-12-18.acacia",
    } as any) // Cast to any to avoid exact version string errors if package is newer/older
    : null;

export async function POST(req: Request) {
    const body = await req.json();
    const { flightData } = body; // Expect flight metadata to pass through

    if (!stripe) {
        // Mock for Testing/Demo without keys
        console.log("Stripe Key missing, simulating success for demo.");
        return NextResponse.json({
            url: "/result?mock_payment=success&flight=" + (flightData?.departure?.iata || "FLIGHT")
        });
    }

    const productId = process.env.STRIPE_PRODUCT_ID;

    // Construct line item
    // Construct line item
    const price_data: any = {
        currency: "eur",
        unit_amount: 0, // Free
    };

    if (productId) {
        price_data.product = productId;
    } else {
        price_data.product_data = {
            name: "Flight Claim Legal Letter",
            description: `Professional legal document for ${flightData?.airline?.name || "Flight"} delay.`,
        };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        ? process.env.NEXT_PUBLIC_BASE_URL
        : process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000";

    try {
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ["card"], // Omitted for free sessions to avoid validation errors
            line_items: [
                {
                    price_data,
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${baseUrl}/result?session_id={CHECKOUT_SESSION_ID}&flight_number=${flightData?.flight_iata || "FK000"}&date=${encodeURIComponent(flightData?.arrival?.scheduled?.split("T")[0] || "")}&origin=${flightData?.departure?.iata || "ORG"}&destination=${flightData?.arrival?.iata || "DES"}&scheduled_arr=${encodeURIComponent(flightData?.arrival?.scheduled || "")}&actual_arr=${encodeURIComponent(flightData?.arrival?.actual || "")}&amount=${price_data.unit_amount === 0 ? "600" : "600"}`,
            cancel_url: `${baseUrl}/`,
            metadata: {
                flight_number: flightData?.flight_iata,
                origin: flightData?.departure?.iata,
                destination: flightData?.arrival?.iata
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error("Stripe Error:", err.message);
        return NextResponse.json({ error: err.message || "Payment initialization failed" }, { status: 500 });
    }
}