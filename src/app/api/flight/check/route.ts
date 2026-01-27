import { NextResponse } from "next/server";
import { calculateCompensation, FlightData } from "@/lib/utils";
import axios from "axios";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const flightNumber = searchParams.get("flight"); // e.g. DY123
    const date = searchParams.get("date"); // YYYY-MM-DD

    if (!flightNumber || !date) {
        return NextResponse.json(
            { error: "Missing flight number or date" },
            { status: 400 }
        );
    }

    const apiKey = process.env.AVIATIONSTACK_API_KEY;

    let flightData: FlightData;

    if (apiKey) {
        try {
            // Call Aviationstack
            const res = await axios.get("http://api.aviationstack.com/v1/flights", {
                params: {
                    access_key: apiKey,
                    flight_iata: flightNumber,
                    limit: 1, // Get nearest match
                }
                // Note: Free plan might restrict history. 
                // We assume User has a plan or we fallback gracefully in a real app.
            });

            const data = res.data.data?.[0]; // Take first match
            if (!data) {
                // Fallback to Mock if specific flight not found (common in free API)
                // return NextResponse.json({ eligible: false, reason: "Flight not found in database." });
                // Debug:
                console.log("Flight not found in Aviationstack, falling back to mock for demo purposes if desired, or return error.");
                return NextResponse.json({ eligible: false, reason: "Flight details not found." });
            }

            flightData = {
                flight_iata: data.flight.iata || flightNumber,
                departure: {
                    iata: data.departure.iata,
                    latitude: 0,
                    longitude: 0,
                    country_iso2: "DE", // Default/Mock for MVP if missing
                    scheduled: data.departure.scheduled,
                },
                arrival: {
                    iata: data.arrival.iata,
                    latitude: 0,
                    longitude: 0,
                    country_iso2: "GB",
                    scheduled: data.arrival.scheduled,
                    actual: data.arrival.actual,
                },
                flight_status: data.flight_status,
                airline: {
                    name: data.airline.name,
                    iata: data.airline.iata
                }
            };

            // Mock coordinates for distance calc if real data missing (Aviationstack free often omits lat/long)
            flightData.departure.latitude = 52.5200; // Berlin
            flightData.departure.longitude = 13.4050;
            flightData.arrival.latitude = 51.5074; // London
            flightData.arrival.longitude = -0.1278;

            // If we have airport codes, we usually lookup in local DB. 
            // MVP: Hardcoded Mock coordinates.

        } catch (error) {
            console.error("Aviation API Error", error);
            return NextResponse.json({ error: "Failed to fetch flight data" }, { status: 500 });
        }
    } else {
        // Mock Data for Demo
        console.log("Using Mock Data (No API Key)");

        // Simulate slight delay to feel real
        await new Promise(resolve => setTimeout(resolve, 1500));

        const isEligibleMock = flightNumber.toUpperCase().endsWith("OK") || flightNumber.toUpperCase() === "DY123";

        flightData = {
            flight_iata: flightNumber.toUpperCase(),
            departure: {
                iata: "OSL",
                latitude: 59.9139,
                longitude: 10.7522,
                country_iso2: "NO" // EEA/EFTA
            },
            arrival: {
                iata: "LHR",
                latitude: 51.4700,
                longitude: -0.4543,
                country_iso2: "GB",
                scheduled: "",
                actual: ""
            },
            flight_status: "landed",
            airline: {
                name: "Norwegian",
                iata: "DY"
            }
        };

        // Set times
        const scheduled = new Date(date + "T10:00:00Z");
        const actual = new Date(date + "T14:30:00Z"); // 4.5 hours delay

        if (!isEligibleMock) {
            // Make it on time
            actual.setTime(scheduled.getTime() + 10 * 60000); // 10 mins delay
            flightData.arrival.actual = actual.toISOString();
            flightData.arrival.scheduled = scheduled.toISOString();
        } else {
            flightData.arrival.scheduled = scheduled.toISOString();
            flightData.arrival.actual = actual.toISOString();
        }

        // Mock departure time (e.g. 2 hours flight duration)
        const depTime = new Date(scheduled.getTime() - 2 * 60 * 60 * 1000);
        flightData.departure.scheduled = depTime.toISOString();
    }

    const result = calculateCompensation(flightData);

    // Merge result with original flight data so frontend has details for checkout
    return NextResponse.json({
        ...result,
        flight_iata: flightData.flight_iata,
        airline: flightData.airline,
        departure: flightData.departure,
        arrival: flightData.arrival,
        flight_status: flightData.flight_status
    });
}
