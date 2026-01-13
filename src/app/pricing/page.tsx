import { Check, X } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b bg-white py-4 px-6 md:px-12 flex items-center justify-between shadow-sm sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="h-8 w-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl leading-none">
                            F
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">FlightRefund<span className="text-blue-700">DIY</span></span>
                    </a>
                </div>
                <nav className="flex gap-6 text-sm font-medium text-slate-600">
                    <a href="/" className="hover:text-blue-700 transition-colors">Home</a>
                    <a href="/faq" className="hover:text-blue-700 transition-colors">FAQ</a>
                </nav>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-16">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Simple, Fair Pricing
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Why give away 30-50% of your compensation? With FlightRefund DIY, you pay a flat fee and keep everything else.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Competitor Card */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm opacity-80 scale-95 origin-right">
                        <h3 className="text-xl font-bold text-slate-500 mb-2">Traditional Claims Agencies</h3>
                        <div className="text-3xl font-bold text-slate-400 mb-6">€140 - €250 <span className="text-sm font-normal text-slate-400">commission</span></div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start text-slate-500">
                                <X className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                                <span>Take 30% to 50% of your payout</span>
                            </li>
                            <li className="flex items-start text-slate-500">
                                <X className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                                <span>Charge VAT on top of commission</span>
                            </li>
                            <li className="flex items-start text-slate-500">
                                <X className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                                <span>Slow manual processing</span>
                            </li>
                            <li className="flex items-start text-slate-500">
                                <X className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                                <span>Often refuse valid but "small" claims</span>
                            </li>
                        </ul>

                        <div className="w-full py-4 text-center rounded-xl bg-slate-100 text-slate-400 font-semibold cursor-not-allowed">
                            Expensive Option
                        </div>
                    </div>

                    {/* Our Card */}
                    <div className="bg-white rounded-2xl p-8 border-2 border-blue-600 shadow-xl relative overflow-hidden transform md:scale-105">
                        <div className="absolute top-0 right-0 bg-green-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                            Limited Offer
                        </div>
                        <h3 className="text-xl font-bold text-blue-900 mb-2">FlightRefund DIY</h3>
                        <div className="text-5xl font-extrabold text-blue-700 mb-6">Free <span className="text-sm font-normal text-slate-500 line-through">€2.99</span></div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start text-slate-700">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="font-semibold">You keep 100% of the claim (up to €600)</span>
                            </li>
                            <li className="flex items-start text-slate-700">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Instant AI Letter Generation</span>
                            </li>
                            <li className="flex items-start text-slate-700">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Direct Airline Contact Info provided</span>
                            </li>
                            <li className="flex items-start text-slate-700">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Works for all EU/UK flights</span>
                            </li>
                        </ul>

                        <a href="/" className="w-full flex items-center justify-center py-4 rounded-xl bg-blue-700 text-white font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/20">
                            Get Started Now
                        </a>
                    </div>
                </div>

                <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8">
                    <h3 className="text-lg font-semibold text-blue-900">Example Payout Scenario</h3>
                    <div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-4 text-slate-700">
                        <div className="bg-white px-6 py-3 rounded-lg border border-blue-100 shadow-sm">
                            <span className="block text-xs text-slate-400 uppercase">Airline Pays</span>
                            <span className="text-xl font-bold">€600.00</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-300">-</div>
                        <div className="bg-white px-6 py-3 rounded-lg border border-blue-100 shadow-sm">
                            <span className="block text-xs text-slate-400 uppercase">Agency Costs</span>
                            <span className="text-xl font-bold text-red-500">€0.00</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-300">-</div>
                        <div className="bg-white px-6 py-3 rounded-lg border border-blue-100 shadow-sm">
                            <span className="block text-xs text-slate-400 uppercase">DIY Fee</span>
                            <span className="text-xl font-bold text-blue-600">€0.00</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-300">=</div>
                        <div className="bg-green-100 px-6 py-3 rounded-lg border border-green-200 shadow-sm">
                            <span className="block text-xs text-green-600 uppercase">You Keep</span>
                            <span className="text-xl font-bold text-green-700">€600.00</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
