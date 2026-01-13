import { Zap, CheckCircle2, FileText, Send, PiggyBank } from "lucide-react";

export default function HowItWorksPage() {
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
                    <a href="/pricing" className="hover:text-blue-700 transition-colors">Pricing</a>
                </nav>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-16">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        How to Claim Your Flight Compensation
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Follow our simple 4-step DIY process to claim up to €600 from the airline without paying huge commission fees.
                    </p>
                </div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform md:-translate-x-1/2 hidden md:block"></div>

                    <div className="space-y-12 md:space-y-24 relative">
                        <Step
                            number="1"
                            title="Check Your Eligibility Instantly"
                            description="Enter your flight number and date on our homepage. Our system connects to real-time aviation data (Aviationstack) to verify if your flight was delayed by more than 3 hours or cancelled. We automatically check EU 261/2004 rules to ensure you have a valid claim."
                            icon={<Zap className="h-6 w-6 text-yellow-600" />}
                            align="left"
                        />
                        <Step
                            number="2"
                            title="Generate Your Legal Letter"
                            description="Once verified, pay a small one-time fee of €2.99. Our AI Lawyer engine immediately drafts a professional, legally-sound demand letter customized with your flight details, passenger rights citations, and calculation of the exact owed amount (e.g., €250, €400, or €600)."
                            icon={<FileText className="h-6 w-6 text-blue-600" />}
                            align="right"
                        />
                        <Step
                            number="3"
                            title="Send to the Airline"
                            description="We provide you with the correct email address for your airline's legal/claims department. Simply download the PDF or copy the text and send the email. This puts the claim directly in your hands, establishing a paper trail and demanding payment within 14 days."
                            icon={<Send className="h-6 w-6 text-indigo-600" />}
                            align="left"
                        />
                        <Step
                            number="4"
                            title="Receive 100% of Your Money"
                            description="When the airline approves your claim, they transfer the full compensation amount directly to your bank account. Dealing directly means you don't share 30-50% of your payout with a 'no win, no fee' agency. You keep every cent."
                            icon={<PiggyBank className="h-6 w-6 text-green-600" />}
                            align="right"
                        />
                    </div>
                </div>

                <div className="mt-24 text-center">
                    <a
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/25"
                    >
                        Start Your Claim Now
                    </a>
                </div>
            </main>
        </div>
    );
}

function Step({ number, title, description, icon, align }: { number: string, title: string, description: string, icon: React.ReactNode, align: "left" | "right" }) {
    return (
        <div className={`flex flex-col md:flex-row items-center gap-8 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1 w-full md:text-right">
                {align === 'left' ? (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-9xl text-slate-300 leading-none select-none -mt-4 -mr-4">{number}</div>
                        <div className="relative z-10 text-left">
                            <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                                {icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                            <p className="text-slate-600 leading-relaxed">{description}</p>
                        </div>
                    </div>
                ) : (
                    <div className="hidden md:block"></div>
                )}
            </div>

            <div className="flex-shrink-0 z-10 hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold border-4 border-slate-50 shadow-sm">
                {number}
            </div>

            <div className="flex-1 w-full text-left">
                {align === 'right' ? (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-9xl text-slate-300 leading-none select-none -mt-4 -mr-4">{number}</div>
                        <div className="relative z-10">
                            <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                                {icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                            <p className="text-slate-600 leading-relaxed">{description}</p>
                        </div>
                    </div>
                ) : (
                    <div className="hidden md:block"></div>
                )}
                {/* Mobile View for 'Right' content when align is Left (Wait logic is flipped visually above due to empty divs) */}
                <div className="md:hidden">
                    {/* Mobile handles its own stacked layout via parent flex-col */}
                </div>
            </div>
        </div>
    );
}
