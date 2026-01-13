"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Plane, Calendar, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { cn } from "@/lib/utils";

export function EligibilityForm() {
    const [flightNumber, setFlightNumber] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null); // Replace with proper type later

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!flightNumber || !date) return;

        setLoading(true);
        setResult(null);

        try {
            const res = await axios.get("/api/flight/check", {
                params: { flight: flightNumber, date },
            });
            setResult(res.data);
        } catch (error) {
            console.error(error);
            setResult({ eligible: false, reason: "Error connecting to server." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 p-8"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="flight" className="block text-sm font-medium text-slate-700">
                            Flight Number
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Plane className="h-5 w-5" />
                            </div>
                            <input
                                type="text"
                                id="flight"
                                placeholder="e.g. DY123"
                                value={flightNumber}
                                onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="date" className="block text-sm font-medium text-slate-700">
                            Flight Date
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                max={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setDate(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl text-base font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all shadow-lg shadow-blue-700/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        ) : (
                            <>
                                Check Eligibility <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </button>
                </form>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 overflow-hidden"
                        >
                            <div
                                className={cn(
                                    "p-4 rounded-xl border flex items-start",
                                    result.eligible
                                        ? "bg-green-50 border-green-200 text-green-800"
                                        : "bg-red-50 border-red-200 text-red-800"
                                )}
                            >
                                {result.eligible ? (
                                    <CheckCircle2 className="h-5 w-5 mr-3 mt-0.5" />
                                ) : (
                                    <AlertCircle className="h-5 w-5 mr-3 mt-0.5" />
                                )}
                                <div>
                                    <h3 className="font-semibold">
                                        {result.eligible ? "You are Eligible!" : "Not Eligible"}
                                    </h3>
                                    <p className="text-sm mt-1 opacity-90">{result.reason}</p>
                                    {result.delay && result.delay > 0 && (
                                        <p className="text-sm mt-1 font-medium bg-white/20 inline-block px-2 py-0.5 rounded">
                                            Delay: {Math.floor(result.delay / 60)}h {result.delay % 60}m
                                        </p>
                                    )}
                                    {result.eligible && (
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const res = await axios.post("/api/checkout", {
                                                        flightData: result
                                                    });
                                                    if (res.data.url) {
                                                        window.location.href = res.data.url;
                                                    }
                                                } catch (e) {
                                                    alert("Payment initialization failed. Please try again.");
                                                }
                                            }}
                                            className="mt-3 text-sm font-semibold underline underline-offset-2 hover:opacity-80 text-blue-700"
                                        >
                                            Proceed to Claim (€2.99)
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            <p className="text-center text-sm text-slate-500 mt-6 flex items-center justify-center gap-2">
                <span className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-1 text-slate-400" /> Instant Analysis</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-1 text-slate-400" /> No Account Needed</span>
            </p>
        </div>
    );
}
