import { ChevronDown, HelpCircle, ShieldQuestion } from "lucide-react";

export default function FAQPage() {
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
                    <a href="/pricing" className="hover:text-blue-700 transition-colors">Pricing</a>
                </nav>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                        <ShieldQuestion className="h-6 w-6" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Frequently Asked Questions regarding Ticket Refunds
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Everything you need to know about claiming flight compensation under EU Regulation 261/2004.
                        Get your money back for delays, cancellations, and overbooking.
                    </p>
                </div>

                <div className="space-y-8">
                    <Section title="Eligibility & Rules">
                        <FAQItem
                            question="Am I eligible for flight compensation under EU 261?"
                            answer="You are likely eligible for flight compensation if your flight departed from an EU/UK airport (any airline) or arrived in the EU/UK on an EU/UK airline. The delay must be at least 3 hours at your final destination. Cancellations typically qualify if you were notified less than 14 days before departure. Denied boarding due to overbooking is also covered. Extraordinary circumstances like severe weather or air traffic control strikes are exempt."
                        />
                        <FAQItem
                            question="How much compensation can I claim?"
                            answer="The compensation amount is fixed by EU Regulation 261/2004 depending on flight distance:
                    • €250 for flights up to 1,500 km.
                    • €400 for flights between 1,500 and 3,500 km (or intra-EU flights > 1,500 km).
                    • €600 for flights over 3,500 km (long-haul).
                    This amount is per passenger, so a family of four could claim up to €2,400."
                        />
                        <FAQItem
                            question="Does FlightRefund DIY take a commission?"
                            answer="No! Unlike traditional claims agencies that take 30-50% of your payout (often €150-€300), FlightRefund DIY charges a one-time flat fee of €2.99. You keep 100% of the compensation the airline pays you. We provide the professional legal letter you need to file the claim yourself."
                        />
                    </Section>

                    <Section title="The Claim Process">
                        <FAQItem
                            question="How does the AI Legal Letter work?"
                            answer="Our AI engine generates a legally robust claim letter tailored to your specific flight details. It cites the relevant sections of Regulation (EC) No 261/2004 and uses professional legal terminology that signals to the airline that you know your rights. You simply copy the letter or download the PDF and email it to the airline's designated claims address, which we provide."
                        />
                        <FAQItem
                            question="What airlines do you support?"
                            answer="We support claims against all major airlines operating in Europe and the UK, including but not limited to Norwegian, SAS, Lufthansa, British Airways, Ryanair, EasyJet, Air France, KLM, Wizz Air, and many more. Our database includes the direct legal department contacts for most of these carriers."
                        />
                        <FAQItem
                            question="What if the airline ignores my email?"
                            answer="Airlines are legally required to respond. If they ignore your initial claim (which is rare with a formal legal letter), you can escalate the claim to the National Enforcement Body (NEB) of the country where the incident occurred. Our letter sets a 14-day deadline for payment, creating a strong paper trail for escalation."
                        />
                    </Section>

                    <Section title="Common Scenarios">
                        <FAQItem
                            question="Can I claim for old flights?"
                            answer="Yes! In many European countries, you can claim for flights up to 3 years ago (e.g., Germany, Sweden). In the UK, the statute of limitations is 6 years. Spain allows up to 5 years. If you had a delayed flight in the past few years, check your eligibility now."
                        />
                        <FAQItem
                            question="My flight was cancelled due to a strike. Can I claim?"
                            answer="It depends. If the strike was by airline staff (e.g., pilots or cabin crew), you ARE eligible for compensation. This is considered within the airline's control. If the strike was by airport staff or air traffic control (extraordinary circumstances), you may not be eligible for compensation, but you are still entitled to a refund of your ticket or re-routing."
                        />
                    </Section>
                </div>

                <div className="mt-20 bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to get your €600?</h2>
                    <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                        Don't let the airlines keep your cash. Take 2 minutes to generate your claim letter and get paid what you're owed.
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-blue-900 bg-white rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                    >
                        Check Eligibility Now
                    </a>
                </div>
            </main>

            <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-200 mt-12">
                <p>&copy; {new Date().getFullYear()} FlightRefund DIY. Not affiliated with any airline.</p>
            </footer>
        </div>
    );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2">{title}</h2>
            <div className="grid gap-4">
                {children}
            </div>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-start">
                <HelpCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                {question}
            </h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line pl-7">
                {answer}
            </p>
        </div>
    );
}
