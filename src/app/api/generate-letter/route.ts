import { NextResponse } from "next/server";

// Enhanced Database of Airline Contacts (Emails or Form URLs)
const AIRLINE_CONTACTS: Record<string, string> = {
    // Major European
    "DY": "claims@norwegian.com", // Norwegian
    "SK": "claims@sas.no", // SAS
    "LH": "customer.relations@lufthansa.com", // Lufthansa
    "BA": "claims@ba.com", // British Airways
    "FR": "https://onlineform.ryanair.com/ie/en/contact-us-eu261", // Ryanair (Strictly form only)
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

    // Low Cost / Others
    "U2": "https://www.easyjet.com/en/claim/EU261", // EasyJet
    "W6": "https://wizzair.com/en-gb/information-and-services/compliments-and-complaints/", // Wizz Air
    "VY": "contact@vueling.com", // Vueling
    "HV": "service-center@transavia.com", // Transavia
    "LS": "customer.relations@jet2.com", // Jet2
    "BT": "info@airbaltic.com", // AirBaltic

    // US (for flights departing EU)
    "DL": "https://www.delta.com/us/en/need-help/overview", // Delta
    "UA": "https://www.united.com/en/us/customercare", // United
    "AA": "https://www.aa.com/contact/forms?topic=CR", // American

    // Default Fallback
    "DEFAULT": "claims@airline.com"
};

export async function POST(req: Request) {
    const { flightCode } = await req.json();

    // Determine Airline IATA
    const airlineIata = flightCode ? flightCode.substring(0, 2).toUpperCase() : "DEFAULT";
    const airlineContact = AIRLINE_CONTACTS[airlineIata] || AIRLINE_CONTACTS["DEFAULT"];

    // Static Template Generation (No AI)
    const letter = generateStaticLetter(flightCode);

    return NextResponse.json({
        letter,
        email: airlineContact
    });
}

function generateStaticLetter(flightCode: string): string {
    const date = new Date().toLocaleDateString("en-GB");

    return `To Claims Department,

Reference: Claim for Compensation under Regulation (EC) No 261/2004

Dear Sir/Madam,

I am writing to claim compensation for flight ${flightCode || "[FLIGHT NUMBER]"} which was delayed/cancelled on [DATE OF FLIGHT].

Flight Details:
- Flight Number: ${flightCode || "[FLIGHT NUMBER]"}
- Date: [DATE OF FLIGHT]
- Departure Airport: [DEPARTURE AIRPORT]
- Arrival Airport: [ARRIVAL AIRPORT]
- Booking Reference: [BOOKING REFERENCE]

The flight was delayed by more than 3 hours at arrival (or cancelled without sufficient notice), and this was not caused by extraordinary circumstances. Therefore, under Regulation (EC) No 261/2004, I am entitled to compensation.

Passenger(s) Claiming:
1. [PASSENGER NAME]

I request that you transfer the compensation amount (EUR 250 / 400 / 600 per passenger) to the following bank account:

Bank Name: [BANK NAME]
Account Holder: [ACCOUNT HOLDER NAME]
IBAN: [IBAN NUMBER]
BIC/SWIFT: [SWIFT CODE]

If I do not receive payment or a satisfactory response within 14 days, I will escalate this claim to the relevant National Enforcement Body (NEB) and consider further legal action.

Sincerely,

[YOUR NAME]
[YOUR ADDRESS]
[YOUR PHONE NUMBER]`;
}
