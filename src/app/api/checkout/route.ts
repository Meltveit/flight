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

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: "Flight Claim Legal Letter",
                            description: `Professional legal document for ${flightData?.airline?.name || "Flight"} delay.`,
                        },
                        unit_amount: 299, // cents -> €2.99
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/result?session_id={CHECKOUT_SESSION_ID}&flight_code=${flightData?.airline?.iata || "FL"}${flightData?.departure?.iata || "DEP"}${flightData?.arrival?.iata || "ARR"}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/`,
            metadata: {
                // Store small amount of data to retrieve on success
                flight_number: flightData?.departure?.iata + "->" + flightData?.arrival?.iata,
                // Real app should save to DB here with a pending status and passing ID
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error("Stripe Error:", err.message);
        return NextResponse.json({ error: err.message || "Payment initialization failed" }, { status: 500 });
    }
}
