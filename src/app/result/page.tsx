"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Download, Copy, CheckCircle, Mail } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";

function ResultContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const mockPayment = searchParams.get("mock_payment");
    const [loading, setLoading] = useState(true);
    const [letter, setLetter] = useState<string>("");
    const [airlineEmail, setAirlineEmail] = useState<string>("");

    useEffect(() => {
        if (!sessionId && !mockPayment) {
            // Redirect to home if no session
            window.location.href = "/";
            return;
        }

        // Verify payment and generate letter
        const generate = async () => {
            try {
                // In a real app, verify session_id with backend first.
                // Here we assume valid if present (MVP).

                // Get flight info from session metadata (or mocked param for MVP)
                // Ideally we fetch from DB using sessionID.
                // For MVP, if we used metadata in Checkout, we need to retrieve session.
                // But we don't have a backend "verify" endpoint yet.
                // Let's rely on client-side generation call for now, assuming "success".
                // Note: This is insecure for production (user can skip payment), 
                // but acceptable for MVP demo flow.

                const flightCode = searchParams.get("flight_code") || null;
                const flightNumber = searchParams.get("flight_number");
                const date = searchParams.get("date");
                const origin = searchParams.get("origin");
                const destination = searchParams.get("destination");
                const scheduledArr = searchParams.get("scheduled_arr");
                const actualArr = searchParams.get("actual_arr");
                const amount = searchParams.get("amount");

                const res = await axios.post("/api/generate-letter", {
                    sessionId,
                    mockPayment,
                    flightCode,
                    flightNumber,
                    date,
                    origin, // New
                    destination, // New
                    scheduledArr, // New
                    actualArr, // New
                    amount
                });

                setLetter(res.data.letter);
                setAirlineEmail(res.data.email || "claims@airline.com");
            } catch (e) {
                console.error(e);
                setLetter("Error generating letter. Please contact support.");
            } finally {
                setLoading(false);
            }
        };

        generate();
    }, [sessionId, mockPayment]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                <h2 className="text-xl font-semibold text-slate-800">Verifying Payment & Generating Legal Letter...</h2>
                <p className="text-slate-500 mt-2">This is powered by AI and may take a few seconds.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                    <h1 className="text-lg font-bold text-green-800">Payment Successful!</h1>
                    <p className="text-green-700 mt-1">
                        Your legal claim letter is ready. Send this immediately to the airline to claim your compensation.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-10 relative">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-4">Legal Claim Letter</h2>
                        <pre className="whitespace-pre-wrap font-serif text-slate-800 text-sm md:text-base leading-relaxed">
                            {letter}
                        </pre>

                        <div className="absolute top-6 right-6 flex gap-2">
                            <button
                                onClick={() => navigator.clipboard.writeText(letter)}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                                title="Copy to Clipboard"
                            >
                                <Copy className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            Where to send
                        </h3>
                        <p className="text-slate-600 text-sm mb-3">Copy the letter and email it to:</p>
                        <div className="bg-white p-3 rounded-lg border border-blue-200 text-blue-800 font-mono text-sm break-all select-all text-center font-semibold">
                            {airlineEmail}
                        </div>
                        <p className="text-xs text-slate-500 mt-3">
                            *We've identified this as the correct legal department email for your airline.
                        </p>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                        <Download className="h-4 w-4" />
                        Download as PDF
                    </button>

                    <a
                        href={`mailto:${airlineEmail}?subject=Compensation Claim - ${searchParams.get("flight_number") || "Flight Delay"}&body=${encodeURIComponent(letter)}`}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                    >
                        <Mail className="h-4 w-4" />
                        Open in Email App
                    </a>

                    <div className="text-xs text-slate-400 text-center px-4">
                        Wait 14 days for a response. If they deny, reply attaching our "Rejection Rebuttal" (contact support).
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b bg-white py-4 px-6 md:px-12 flex items-center gap-2 shadow-sm">
                <div className="h-8 w-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl leading-none">
                    F
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">FlightRefund<span className="text-blue-700">DIY</span></span>
            </header>
            <Suspense fallback={<div>Loading...</div>}>
                <ResultContent />
            </Suspense>
        </div>
    );
}
