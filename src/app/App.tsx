import { useState, type FormEvent } from "react";
import {
  Menu,
  X,
  Store,
  ShoppingBag,
  Package,
  MapPin,
  Check,
  Wallet,
  Bike,
  ChevronDown,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Globe,
} from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

type WaitlistSource = "hero" | "footer";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Vendors", href: "#for-vendors" },
  { label: "For Customers", href: "#for-customers" },
  { label: "FAQ", href: "#faq" },
];

async function saveWaitlistEntry(input: {
  email: string;
  name?: string;
  role?: string;
  source: WaitlistSource;
}) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase is not configured yet. Add your project URL and anon key first.");
  }

  const response = await fetch(`${SUPABASE_URL}/functions/v1/waitlist`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: input.name?.trim() || null,
      email: input.email.trim().toLowerCase(),
      role: input.role || null,
      source: input.source,
    }),
  });

  if (!response.ok) {
    let message = "We could not save your signup. Please try again.";

    try {
      const error = await response.json();
      message = error?.message || error?.error || error?.detail || error?.error_description || message;
      if (response.status === 409 || error?.code === "23505") {
        message = "This email is already on the waitlist.";
      }
    } catch {
      // Ignore JSON parse failures and fall back to the generic message.
    }

    throw new Error(message);
  }
}

const STEPS = [
  {
    num: "01",
    icon: ShoppingBag,
    title: "Browse & Order",
    desc: "Discover local vendors and add items to your cart in seconds.",
  },
  {
    num: "02",
    icon: Store,
    title: "Vendor Confirms",
    desc: "Your chosen vendor receives the order and confirms availability instantly.",
  },
  {
    num: "03",
    icon: Bike,
    title: "Rider Picks Up",
    desc: "A nearby NELDI rider collects your order from the vendor.",
  },
  {
    num: "04",
    icon: MapPin,
    title: "Delivered to You",
    desc: "Track your delivery live and receive it right at your door.",
  },
];

const FEATURES = [
  {
    icon: Store,
    title: "Easy Vendor Onboarding",
    desc: "Set up your store in minutes. No tech skills needed. Just your products and a phone.",
  },
  {
    icon: MapPin,
    title: "Real-Time Order Tracking",
    desc: "Customers follow every step of their delivery.",
  },
  {
    icon: Bike,
    title: "Integrated Local Delivery",
    desc: "We handle the riders. Vendors focus on what they do best.",
  },
  {
    icon: Wallet,
    title: "Secure In-App Payments",
    desc: "POS-free checkout with built-in payment protection for buyers and sellers.",
  },
  {
    icon: BarChart3,
    title: "Vendor Earnings Dashboard",
    desc: "See your daily sales, payouts, and top products at a glance.",
  },
  {
    icon: Globe,
    title: "Built for Local Markets",
    desc: "Gombe-first infrastructure, designed to scale across all of Nigeria.",
  },
];

const WHY = [
  {
    icon: MapPin,
    title: "Built Local First",
    desc: "Designed for Gombe State markets before scaling nationally. Every feature reflects how local commerce actually works.",
  },
  {
    icon: Shield,
    title: "Fair for Vendors",
    desc: "Transparent commission, zero hidden fees. You know what you keep before every single sale.",
  },
  {
    icon: Zap,
    title: "One App, Two Sides",
    desc: "Vendors and customers connect directly through one trusted platform. No middlemen, no confusion.",
  },
];

const FAQS = [
  {
    q: "When does NELDI launch?",
    a: "NELDI is launching in Gombe State in Q4 2026. Sign up to the waitlist and you will be among the first to get access, plus exclusive early-adopter perks.",
  },
  {
    q: "Which areas do you deliver to?",
    a: "We are launching with coverage all across Gombe metropolis, including GRA, Federal Lowcost, Tunfure, among others. We will expand zone by zone based on demand.",
  },
  {
    q: "How do I become a vendor?",
    a: "Join the waitlist as a Vendor. When we launch, you will receive a link to set up your store on the NELDI Vendor App. It takes under 10 minutes.",
  },
  /*{
    q: "Is there a fee to join the waitlist?",
    a: "None at all. Joining the waitlist is free and commits you to nothing. You will only pay when you make sales (vendors) or place orders (customers).",
  }*/,
  {
    q: "What types of products can I sell on NELDI?",
    a: "We are launching with Food, snacks, drinks, and everything in between. Later phases will open NELDI to all vendor categories.",
  },
  {
    q: "How are payments handled?",
    a: "NELDI uses secure in-app payments. Customers pay on checkout; vendors receive payouts to their bank account on a daily basis.",
  },
];

// ─── Logo Component ──────────────────────────────────────────────────────────

function NeldiLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B5E20" />
          <stop offset="60%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#4CAF50" />
        </linearGradient>
      </defs>
      {/* Pin Shape */}
      <path
        d="M50 90C50 90 84 57 84 36C84 16 68.78 4 50 4C31.22 4 16 16 16 36C16 57 50 90 50 90Z"
        fill="url(#pinGradient)"
      />
      {/* Shopping Cart handle & base */}
      <path
        d="M33 34H38.5L42 51.5C42.4 53.5 44.1 55 46.1 55H63.9C65.9 55 67.6 53.5 68 51.5L70.5 39H44"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle cx="47" cy="64" r="4.5" fill="white" />
      <circle cx="63" cy="64" r="4.5" fill="white" />
      {/* Checkmark inside cart */}
      <path
        d="M44 42L52 50L73 30"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Nav ────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/96 backdrop-blur-md border-b border-black/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-6">
        <a href="#" className="flex items-center gap-2 shrink-0">
          <NeldiLogo className="w-9 h-9" />
          <span className="font-bold text-xl text-[#1B5E20] tracking-tight font-[Poppins] ml-0.5">
            NELDI
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-[#1A1A1A] hover:text-[#008080] transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="px-5 py-2.5 rounded-full bg-[#1B5E20] text-white text-sm font-semibold hover:bg-[#145218] transition-colors shadow-md shadow-green-900/15 shrink-0"
          >
            Join Waitlist
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1.5 rounded-lg text-[#1A1A1A] hover:bg-black/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-white px-5 py-5 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-[#1A1A1A] hover:text-[#008080] transition-colors py-2.5 px-2 rounded-lg hover:bg-black/3 min-h-[44px] flex items-center"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function PhoneMockup() {
  return (
    <div className="relative z-10 w-[270px] h-[550px] bg-[#111] rounded-[40px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] border-[6px] border-[#222] overflow-hidden">
      {/* Status bar + header */}
      <div className="bg-[#1B5E20] h-14 flex items-center justify-between px-6 pt-3">
        <span className="text-white text-xs font-bold tracking-wide font-[Poppins]">NELDI</span>
        <div className="flex gap-1 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </div>

      {/* App content */}
      <div className="bg-[#F7F9F7] h-[calc(100%-56px)] px-4 pt-4 pb-6 flex flex-col justify-between gap-3 overflow-hidden">
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">
            Good morning, Amina 👋
          </p>

          {/* Search */}
          <div className="bg-white rounded-xl px-3 py-2.5 flex items-center gap-2 shadow-sm border border-black/5">
            <MapPin size={11} className="text-[#008080] shrink-0" />
            <span className="text-[10px] text-[#9CA3AF]">Search vendors near you...</span>
          </div>

          {/* Vendor card */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-black/5">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E8F5E9] flex items-center justify-center shrink-0">
                <Store size={14} className="text-[#1B5E20]" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#1A1A1A] leading-tight">
                  Neldi Small Chops
                </p>
                <p className="text-[9px] text-[#6B7280]">Tudun Wada · 1.2 km away</p>
              </div>
            </div>
            <div className="flex gap-1 flex-wrap">
              {["Cupcake", "Doughnut", "Samosa"].map((item) => (
                <span
                  key={item}
                  className="text-[8px] px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#1B5E20] font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Live tracking card */}
          <div className="bg-[#1B5E20] rounded-xl p-3 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold">Order #NLD-0042</p>
              <span className="text-[8px] px-2 py-0.5 rounded-full bg-white/25 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                Live
              </span>
            </div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <Bike size={10} className="text-green-300" />
              <p className="text-[9px] text-white/80">Ibrahim is 4 mins away</p>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full">
              <div className="w-3/4 h-1.5 bg-white rounded-full" />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[8px] text-white/50">Picked up</span>
              <span className="text-[8px] text-white/50">On the way</span>
              <span className="text-[8px] text-white/50">Delivered</span>
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex justify-around pt-3 border-t border-black/5 bg-[#F7F9F7]">
          {([Store, ShoppingBag, Package, Wallet] as const).map((Icon, i) => (
            <div
              key={i}
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                i === 0 ? "bg-[#1B5E20] shadow-md" : "bg-transparent"
              }`}
            >
              <Icon
                size={15}
                className={i === 0 ? "text-white" : "text-[#9CA3AF]"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-white pt-0 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-[52%_48%] gap-8 lg:gap-16 items-center">
        {/* Text */}
        <div className="pt-10 pb-14 md:pt-12 md:pb-20 md:pr-4 lg:pr-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5E9] text-[#008080] text-xs font-semibold uppercase tracking-widest mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008080] animate-pulse" />
            Launching Soon in Gombe State
          </div>

          <h1 className="text-[clamp(30px,4.5vw,54px)] font-bold text-[#1A1A1A] leading-[1.1] mb-6 tracking-tight">
            Your Marketplace.<br />
            Your Delivery.<br />
            <span className="text-[#1B5E20]">One App.</span>
          </h1>

          <p className="text-[17px] text-[#6B7280] leading-relaxed mb-9 max-w-[480px]">
            NELDI connects Gombe vendors with customers who need fast, reliable
            delivery with trusted sellers, and live tracking, all in
            one place.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#waitlist"
              className="px-7 py-3.5 rounded-xl bg-[#1B5E20] text-white font-semibold text-[15px] hover:bg-[#145218] transition-colors shadow-lg shadow-green-900/20 min-h-[48px] flex items-center"
            >
              Join the Waitlist
            </a>
            <a
              href="#how-it-works"
              className="px-7 py-3.5 rounded-xl border-2 border-[#008080] text-[#008080] font-semibold text-[15px] hover:bg-[#008080]/5 transition-colors min-h-[48px] flex items-center gap-2"
            >
              See How It Works <ArrowRight size={16} />
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap gap-5">
            {[
              /*{ icon: Store, label: "Built for Nigerian Vendors" },*/
              { icon: Bike, label: "Fast Local Delivery" },
              { icon: Wallet, label: "Secure Payments" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm text-[#6B7280]">
                <div className="w-9 h-9 rounded-xl bg-[#E8F5E9] flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#1B5E20]" />
                </div>
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual — desktop only */}
        <div className="hidden md:flex justify-center items-center pb-12 pt-12">
          <div className="relative p-8">
            {/* Background shapes */}
            <div className="absolute top-0 right-4 w-72 h-72 bg-[#E8F5E9] rounded-full -z-10" />
            <div className="absolute bottom-8 left-4 w-44 h-44 bg-[#008080]/10 rounded-full -z-10" />

            <PhoneMockup />

           {/* Floating: delivery done 
            <div className="absolute left-[-30px] top-24 z-20 backdrop-blur-md bg-white/95 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-black/5 animate-[fadeInLeft_0.6s_ease_both]">
              <div className="w-9 h-9 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
                <Check size={14} className="text-[#1B5E20]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#1A1A1A]">Order Delivered!</p>
                <p className="text-[10px] text-[#6B7280]">2 mins ago</p>
              </div>
            </div>
          */}

            {/* Floating: vendor earnings */}
            <div className="absolute right-[-24px] bottom-36 z-20 backdrop-blur-md bg-white/95 rounded-2xl shadow-xl px-4 py-3 border border-black/5">
              <p className="text-[10px] text-[#6B7280] mb-0.5">Today's earnings</p>
              <p className="text-sm font-bold text-[#1B5E20]">₦14,250</p>
              <p className="text-[9px] text-emerald-500 font-medium">↑ 18% from yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Dual Audience ───────────────────────────────────────────────────────────

function AudienceSection() {
  return (
    <section className="bg-[#F7F9F7] py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#008080] mb-3">
            Who It's For
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            One Platform, Two Audiences
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Vendor */}
          <div
            id="for-vendors"
            className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-black/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#008080]/10 flex items-center justify-center mb-6">
              <Store size={26} className="text-[#008080]" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">
              For Vendors
            </p>
            <h3 className="text-2xl md:text-[26px] font-bold text-[#1A1A1A] mb-5 leading-snug">
              Sell More, Stress Less
            </h3>
            <ul className="space-y-3.5 mb-8">
              {[
                "Reach more customers across Gombe. No extra rent, no marketing spend",
                "Simple dashboard to manage orders, stock, and payouts in one place",
                "Get paid fast. Daily payouts straight to your bank account",
              ].map((b) => (
                <li key={b} className="flex gap-3 text-[#6B7280] text-sm leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={10} className="text-[#1B5E20]" />
                  </div>
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#008080] text-[#008080] font-semibold text-sm hover:bg-[#008080] hover:text-white transition-colors min-h-[48px]"
            >
              Join as a Vendor <ArrowRight size={15} />
            </a>
          </div>

          {/* Customer */}
          <div
            id="for-customers"
            className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-black/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#1B5E20]/10 flex items-center justify-center mb-6">
              <ShoppingBag size={26} className="text-[#1B5E20]" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">
              For Customers
            </p>
            <h3 className="text-2xl md:text-[26px] font-bold text-[#1A1A1A] mb-5 leading-snug">
              Your Orders, Delivered Fast
            </h3>
            <ul className="space-y-3.5 mb-8">
              {[
                "Browse local vendors and markets from your phone",
                "Track your order live from the vendor straight to your door",
                "Pay securely with in-app checkout. No POS machine, no cash stress",
              ].map((b) => (
                <li key={b} className="flex gap-3 text-[#6B7280] text-sm leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={10} className="text-[#1B5E20]" />
                  </div>
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#1B5E20] text-[#1B5E20] font-semibold text-sm hover:bg-[#1B5E20] hover:text-white transition-colors min-h-[48px]"
            >
              Join as a Customer <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ────────────────────────────────────────────────────────────

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#008080] mb-3">
            The Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            How NELDI Works
          </h2>
        </div>

        <div className="relative grid md:grid-cols-4 gap-10 md:gap-6">
          {/* Connector line desktop */}
          <div className="hidden md:block absolute top-[30px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-[#008080]/20" />

          {STEPS.map(({ num, icon: Icon, title, desc }) => (
            <div key={num} className="flex flex-col items-center text-center md:items-center">
              {/* Mobile: left-aligned layout */}
              <div className="flex items-start gap-5 md:flex-col md:items-center md:gap-0 w-full md:w-auto">
                {/* Icon circle */}
                <div className="relative shrink-0 mb-0 md:mb-5">
                  <div className="w-14 h-14 rounded-full bg-[#008080] flex items-center justify-center shadow-lg shadow-teal-900/20 relative z-10">
                    <Icon size={22} className="text-white" />
                  </div>
                </div>

                <div className="text-left md:text-center">
                  <p className="text-[10px] font-bold text-[#008080] uppercase tracking-widest mb-1 md:mt-0 mt-0">
                    {num}
                  </p>
                  <h3 className="text-base font-bold text-[#1A1A1A] mb-1.5">{title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Grid ───────────────────────────────────────────────────────────

function FeaturesGrid() {
  return (
    <section className="bg-[#F7F9F7] py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#008080] mb-3">
            Platform
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            Everything You Need,
            <br className="hidden md:block" /> In One Platform
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-7 shadow-sm border border-black/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-5 group-hover:bg-[#1B5E20] transition-colors duration-200">
                <Icon size={20} className="text-[#1B5E20] group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-2">{title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why NELDI ───────────────────────────────────────────────────────────────

function WhyNeldi() {
  return (
    <section className="bg-[#1B5E20] py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4CAF50] mb-3">
            Our Difference
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Why We're Different
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {WHY.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-colors duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-[#008080] flex items-center justify-center mb-6 shadow-lg shadow-black/20">
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Waitlist CTA ────────────────────────────────────────────────────────────

function WaitlistCTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [footerSubmitted, setFooterSubmitted] = useState(false);
  const [footerSubmitting, setFooterSubmitting] = useState(false);
  const [footerError, setFooterError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name || !email || !role) {
      return;
    }

    setIsSubmitting(true);

    try {
      await saveWaitlistEntry({
        name,
        email,
        role,
        source: "hero",
      });

      setSubmittedEmail(email.trim().toLowerCase());
      setSubmitted(true);
      setName("");
      setEmail("");
      setRole("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFooterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFooterError("");

    if (!footerEmail) {
      return;
    }

    setFooterSubmitting(true);

    try {
      await saveWaitlistEntry({
        email: footerEmail,
        source: "footer",
      });

      setFooterSubmitted(true);
      setFooterEmail("");
    } catch (error) {
      setFooterError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setFooterSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="bg-[#1B5E20] border-t border-white/10 py-20">
      <div className="max-w-4xl mx-auto px-5 md:px-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">
          Limited Early Access
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Be the First to Use NELDI
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Sign up now and get early access plus exclusive launch perks
        </p>

        {submitted ? (
          <div className="bg-white/15 rounded-2xl px-8 py-12 border border-white/20 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/25 flex items-center justify-center mx-auto mb-5">
              <Check size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
            <p className="text-white/70 text-sm">
              We'll reach out to <span className="text-white font-medium">{submittedEmail}</span> when
              NELDI goes live in Gombe State.
            </p>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-3"
            >
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 rounded-xl bg-white text-[#1A1A1A] placeholder-[#9CA3AF] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/60 min-h-[50px]"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 rounded-xl bg-white text-[#1A1A1A] placeholder-[#9CA3AF] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/60 min-h-[50px]"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 rounded-xl bg-white text-[#1A1A1A] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/60 min-h-[50px] cursor-pointer"
              >
                <option value="" disabled>
                  I am a...
                </option>
                <option value="vendor">Vendor</option>
                <option value="customer">Customer</option>
              </select>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3.5 rounded-xl bg-white text-[#1B5E20] font-bold text-sm hover:bg-[#F7F9F7] transition-colors shrink-0 min-h-[50px] shadow-lg shadow-black/10 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
            {errorMessage ? (
              <p className="mt-4 text-[#FFD6D6] text-xs">{errorMessage}</p>
            ) : (
              <p className="mt-4 text-white/45 text-xs">
                No spam. We'll only email you about launch updates.
              </p>
            )}
          </>
        )}

        {!submitted && (
          <div className="mt-4">
            <p className="text-white/60 text-xs mb-3 text-left md:text-center">
              Prefer the quick signup? Drop just your email below.
            </p>
            <form
              onSubmit={handleFooterSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Your email"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                required
                className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-1 focus:ring-[#008080] border border-white/10"
              />
              <button
                type="submit"
                disabled={footerSubmitting}
                className="px-5 py-3 rounded-xl bg-[#0F3D13] text-white text-sm font-semibold hover:bg-[#145218] transition-colors shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {footerSubmitting ? "Saving..." : "Quick Join"}
              </button>
            </form>
            {footerError ? (
              <p className="mt-2 text-[#FFD6D6] text-xs text-left md:text-center">{footerError}</p>
            ) : footerSubmitted ? (
              <p className="mt-2 text-[#C8F7D1] text-xs text-left md:text-center">
                You are on the waitlist.
              </p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-20">
      <div className="max-w-2xl mx-auto px-5 md:px-0">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#008080] mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            Questions? We've Got Answers
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              className="border border-black/8 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#F7F9F7] transition-colors min-h-[64px]"
              >
                <span className="font-semibold text-[#1A1A1A] text-sm md:text-[15px] pr-4 leading-snug">
                  {q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#008080] shrink-0 transition-transform duration-200 ${
                    openIdx === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIdx === i && (
                <div className="px-6 pb-6 border-t border-black/5">
                  <p className="pt-4 text-sm text-[#6B7280] leading-relaxed">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <NeldiLogo className="w-8 h-8" />
              <span className="font-bold text-xl tracking-tight ml-0.5">NELDI</span>
            </div>
            <p className="text-white/45 text-sm leading-relaxed mb-5">
              Your marketplace. Your delivery. One app. Built for Gombe State,
              ready for Nigeria.
            </p>
            <div className="flex gap-2">
              <a
                href="https://www.instagram.com/neldiapp?igsh=Ym8zeGU5cng3YWFt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] px-3 py-1.5 rounded-full border border-white/15 text-white/45 hover:text-white hover:border-white/40 transition-colors font-medium"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-5">
              Quick Links
            </p>
            <ul className="space-y-2.5">
              {["How It Works", "Features", "Why NELDI", "FAQ"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-white/55 text-sm hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Audiences */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-5">
              Join NELDI
            </p>
            <ul className="space-y-2.5">
              {["For Vendors", "For Customers", "Become a Rider", "Partner with Us"].map(
                (l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-white/55 text-sm hover:text-white transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-5">
              Contact
            </p>
            <ul className="space-y-2 text-white/55 text-sm mb-5">
              <li>hello@neldi.ng</li>
              <li>Gombe State, Nigeria</li>
            </ul>
            <p className="text-white/35 text-xs">
              Use the waitlist form above to join in one step.
            </p>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/35 text-xs">
            © 2026 NELDI Digital Services. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-white/35 text-xs hover:text-white/65 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-[Poppins,sans-serif] bg-white antialiased">
      <Nav />
      <Hero />
      <AudienceSection />
      <HowItWorks />
      <FeaturesGrid />
      <WhyNeldi />
      <WaitlistCTA />
      <FAQSection />
      <Footer />
    </div>
  );
}
