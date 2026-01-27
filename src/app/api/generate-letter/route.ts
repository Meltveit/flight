import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Enhanced Database of Airline Contacts (Emails or Form URLs)
const AIRLINE_CONTACTS: Record<string, string> = {
    // === Major EU/UK Airlines (Liable for ALL flights) ===
    "DY": "claims@norwegian.com", // Norwegian
    "SK": "claims@sas.no", // SAS
    "LH": "customer.relations@lufthansa.com", // Lufthansa
    "BA": "claims@ba.com", // British Airways
    "FR": "https://onlineform.ryanair.com/ie/en/contact-us-eu261", // Ryanair
    "AF": "mail.refund.service@airfrance.fr", // Air France
    "KL": "claims@klm.com", // KLM
    "EW": "service@eurowings.com", // Eurowings
    "LX": "contactus@swiss.com", // Swiss
    "OS": "customer.relations@austrian.com", // Austrian
    "IB": "clasica@iberia.es", // Iberia
    "TP": "customer.experience@tap.pt", // TAP Portugal
    "AY": "customer.relations@finnair.com", // Finnair
    "AZ": "customer.relations@ita-airways.com", // ITA
    "EI": "central.baggage.tracing@aerlingus.com", // Aer Lingus
    "U2": "https://www.easyjet.com/en/claim/EU261", // EasyJet
    "W6": "https://wizzair.com/en-gb/information-and-services/compliments-and-complaints/", // Wizz Air
    "VY": "contact@vueling.com", // Vueling
    "HV": "service-center@transavia.com", // Transavia
    "LS": "customer.relations@jet2.com", // Jet2
    "BT": "info@airbaltic.com", // AirBaltic
    "VS": "customer.relations@fly.virgin.com", // Virgin Atlantic (or use online form)

    // === Non-EU Airlines (Liable ONLY for flights departing EU/UK) ===
    // We keep these because users might fly e.g. LHR -> JFK on Delta
    "DL": "https://www.delta.com/us/en/need-help/overview", // Delta
    "UA": "https://www.united.com/en/us/customercare", // United
    "AA": "https://www.aa.com/contact/forms?topic=CR", // American
    "AC": "https://accc-prod.microsoftcrmportals.com/en-CA/flight-delay-or-cancellation-claim/", // Air Canada
    "EK": "https://www.emirates.com/english/help/forms/complaint/", // Emirates
    "QR": "https://www.qatarairways.com/en/legal/eu-air-passenger-rights.html", // Qatar Airways (Form)

    // Default Fallback
    "DEFAULT": "claims@airline.com"
};

const STATIC_TEMPLATE = `TO: [AIRLINE_CONTACT]

SUBJECT: Compensation Claim under Regulation EC 261/2004
Flight: [FLIGHT_NUMBER]
Date: [DATE]

Dear Sir/Madam,

I am writing to claim compensation under Regulation (EC) No 261/2004 for the above-referenced flight.

The flight was delayed by more than 3 hours on arrival.
Flight Number: [FLIGHT_NUMBER]
Route: [ORIGIN] to [DESTINATION]
Scheduled Arrival: [SCHEDULED_ARR]
Actual Arrival: [ACTUAL_ARR]

According to the regulation, I am entitled to compensation.
Amount Claimed: €[AMOUNT] per passenger.

Please remit payment to the following bank account:
Account Holder: [Your Name]
IBAN: [Your IBAN]
BIC/SWIFT: [Your SWIFT]

If I do not receive a satisfactory response within 14 days, I will escalate this matter to the National Enforcement Body and legal counsel.

Sincerely,

[Your Name]
[Your Address]
[Your Phone Number]`;

export async function POST(req: Request) {
    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { flightCode, flightNumber, date, amount, origin, destination, scheduledArr, actualArr } = body;
    // flightCode is mostly used for Airline ID derivation in current flow (e.g. VSAMSMSP)
    // flightNumber is the actual flight IATA (e.g. VS3947) - we need to ensure this is passed!

    // Determine Airline IATA & Contact
    // If flightNumber is provided (VS3947), use that. If not, fallback to flightCode substring.
    const airlineIata = flightNumber
        ? flightNumber.substring(0, 2).toUpperCase()
        : (flightCode ? flightCode.substring(0, 2).toUpperCase() : "DEFAULT");

    const airlineContact = AIRLINE_CONTACTS[airlineIata] || AIRLINE_CONTACTS["DEFAULT"];

    // Formatting helper
    const displayFlight = flightNumber || flightCode || "FLIGHT";
    const displayAmount = amount || "600";

    const formatTime = (isoString: string) => {
        if (!isoString || isoString === "undefined" || isoString === "null") return "[Time]";
        try {
            const d = new Date(isoString);
            if (isNaN(d.getTime())) return "[Time]"; // Invalid Date check
            return d.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            return "[Time]";
        }
    };

    // Fallback Function
    const generateStaticLetter = () => {
        return STATIC_TEMPLATE
            .replace("[AIRLINE_CONTACT]", airlineContact)
            .replace("[FLIGHT_NUMBER]", displayFlight)
            .replace("[FLIGHT_NUMBER]", displayFlight) // Replace second occurrence
            .replace("[DATE]", date ? new Date(date).toLocaleDateString() : "[Date]")
            .replace("[AMOUNT]", displayAmount)
            .replace("[ORIGIN]", origin || "[Origin Airport]")
            .replace("[DESTINATION]", destination || "[Destination Airport]")
            .replace("[SCHEDULED_ARR]", formatTime(scheduledArr) || "[Scheduled Time]")
            .replace("[ACTUAL_ARR]", formatTime(actualArr) || "[Actual Time]");
    };

    // Try AI Generation
    if (process.env.GEMINI_API_KEY) {
        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `You are a professional aviation lawyer. Write a formal legal claim letter for flight delay compensation citing Regulation EC 261/2004. 
            Airline Code: ${airlineIata}. 
            Flight Number: ${displayFlight}.
            Date: ${date}.
            Route: ${origin}.
            Scheduled Arrival: ${formatTime(scheduledArr)}.
            Actual Arrival: ${formatTime(actualArr)}.
            Compensation Amount: €${displayAmount}. 
            Keep it professional, firm, and concise. 
            Address it to the claims department. 
            Include placeholders for [Your Name], [Address] and [IBAN] only. Fill in all other flight details provided above.
            Return ONLY the letter text, no preamble.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const letter = response.text();

            if (!letter) throw new Error("Empty AI response");

            return NextResponse.json({
                letter,
                email: airlineContact
            });
        } catch (error) {
            console.error("Gemini AI Error:", error);
            // Fallback to static template on AI error
            console.log("Falling back to static template.");
            return NextResponse.json({
                letter: generateStaticLetter(),
                email: airlineContact,
                source: "template_fallback" // useful for debugging
            });
        }
    } else {
        // No Key Mock/Demo
        return NextResponse.json({
            letter: generateStaticLetter(),
            email: airlineContact,
            source: "demo_template"
        });
    }
}
