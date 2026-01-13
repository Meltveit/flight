import { EligibilityForm } from "@/components/eligibility-form";
import { ShieldCheck, Zap, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl mix-blend-multiply filter opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100/50 blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-sky-100/50 blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <header className="py-6 px-6 md:px-12 relative z-10 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl leading-none">
            F
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">FlightRefund<span className="text-blue-700">DIY</span></span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <a href="/how-it-works" className="hover:text-blue-700 transition-colors">How it Works</a>
          <a href="/pricing" className="hover:text-blue-700 transition-colors">Pricing</a>
          <a href="/faq" className="hover:text-blue-700 transition-colors">FAQ</a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 relative z-10 w-full max-w-7xl mx-auto">
        <div className="w-full max-w-3xl text-center mb-10 space-y-6">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            <Zap className="mr-1.5 h-3.5 w-3.5 fill-blue-700" />
            Fastest Way to Claim EU 261 Compensation
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Turn Your Flight Delay <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-500">
              Into €600 Cash
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Don't let airlines keep your money. Generate a professional legal claim letter instantly.
            <br className="hidden md:block" />
            <span className="font-semibold text-slate-900">Agencies take ~30% (€140+). We charge a flat €2.99.</span>
          </p>
        </div>

        <EligibilityForm />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
          <Feature
            icon={<Zap className="h-6 w-6 text-yellow-500" />}
            title="Instant Verification"
            description="We check real-time aviation data to confirm your eligibility in seconds."
          />
          <Feature
            icon={<FileText className="h-6 w-6 text-blue-600" />}
            title="Legally Watertight"
            description="Our AI generates formal legal letters citing EU Regulation 261/2004."
          />
          <Feature
            icon={<ShieldCheck className="h-6 w-6 text-green-600" />}
            title="You Keep 100%"
            description="Pay just €2.99 once. If the airline pays you €600, you keep €600."
          />
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <p>&copy; {new Date().getFullYear()} FlightRefund DIY. Not affiliated with any airline.</p>
      </footer>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/80 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
