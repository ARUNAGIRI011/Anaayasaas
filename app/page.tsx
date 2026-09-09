'use client';

import { useState } from 'react';
import { MapPin, Sparkles, Plane, Hotel, ArrowRight, ShieldCheck, IndianRupee } from 'lucide-react';

const plans = [
  { name: 'Weekend Explorer', price: '₹2,999', places: 'Pondicherry • Mahabalipuram', tag: '2 Days / 1 Night' },
  { name: 'Kerala Escape', price: '₹8,999', places: 'Munnar • Alleppey • Kochi', tag: '4 Days / 3 Nights' },
  { name: 'Rajasthan Heritage', price: '₹14,999', places: 'Jaipur • Jodhpur • Udaipur', tag: '6 Days / 5 Nights' },
];

export default function Home() {
  const [destination, setDestination] = useState('');
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 text-xl font-bold"><span className="rounded-xl bg-orange-500 p-2"><MapPin size={20}/></span> YatraPilot</div>
        <div className="hidden gap-8 text-sm text-slate-300 md:flex"><a href="#plans">Plans</a><a href="#how">How it works</a><a href="#affiliate">Travel deals</a></div>
        <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950">Start planning</button>
      </nav>

      <section className="relative overflow-hidden px-6 pb-20 pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-orange-300"><Sparkles size={16}/> Smart India travel planning</div>
            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">Your India trip, <span className="text-orange-400">beautifully planned.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">Discover ready-to-book Indian tourism plans, curated local experiences and travel products — all in one place.</p>
            <div className="mt-8 flex max-w-xl gap-2 rounded-2xl bg-white p-2 shadow-2xl">
              <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Where in India do you want to go?" className="min-w-0 flex-1 px-4 text-slate-900 outline-none" />
              <button className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold">Explore <ArrowRight size={18}/></button>
            </div>
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-400"><span className="flex items-center gap-2"><ShieldCheck size={16}/> Curated plans</span><span className="flex items-center gap-2"><IndianRupee size={16}/> Transparent pricing</span><span>🇮🇳 Built for India</span></div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-orange-500/30 via-fuchsia-500/10 to-cyan-400/20 p-2 shadow-2xl">
            <div className="rounded-[1.7rem] bg-slate-900/90 p-8 backdrop-blur">
              <div className="mb-10 flex items-center justify-between"><span className="text-sm text-slate-400">Trip preview</span><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">Personalised</span></div>
              <div className="text-4xl font-bold">Tamil Nadu<br/><span className="text-orange-400">Temple & Coast</span></div>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center text-sm"><div className="rounded-xl bg-white/5 p-4">4<br/><span className="text-slate-400">Days</span></div><div className="rounded-xl bg-white/5 p-4">6<br/><span className="text-slate-400">Stops</span></div><div className="rounded-xl bg-white/5 p-4">₹7.5K<br/><span className="text-slate-400">from</span></div></div>
              <button className="mt-6 w-full rounded-xl bg-white py-3 font-semibold text-slate-950">View itinerary</button>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="bg-white px-6 py-20 text-slate-950"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold uppercase tracking-widest text-orange-600">Sellable travel plans</p><h2 className="mt-2 text-4xl font-black">Popular India journeys</h2><div className="mt-10 grid gap-6 md:grid-cols-3">{plans.map(p => <article key={p.name} className="rounded-3xl border border-slate-200 p-7 shadow-sm"><div className="mb-8 flex items-center justify-between"><Plane className="text-orange-500"/><span className="text-sm text-slate-500">{p.tag}</span></div><h3 className="text-2xl font-bold">{p.name}</h3><p className="mt-2 text-slate-500">{p.places}</p><div className="mt-8 flex items-end justify-between"><div><span className="text-3xl font-black">{p.price}</span><span className="text-slate-500"> / person</span></div><button className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">View</button></div></article>)}</div></div></section>

      <section id="affiliate" className="px-6 py-20"><div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12"><div className="grid gap-10 md:grid-cols-2"><div><p className="text-sm font-semibold uppercase tracking-widest text-orange-400">Travel marketplace</p><h2 className="mt-3 text-4xl font-black">Earn from every trip, beyond the itinerary.</h2><p className="mt-5 leading-7 text-slate-300">Offer hotels, activities, transport and other travel products from approved affiliate partners alongside your own paid plans. Track outbound referrals and commissions without mixing partner credentials into the public UI.</p></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-slate-900 p-6"><Hotel className="text-orange-400"/><h3 className="mt-4 font-bold">Hotels & stays</h3><p className="mt-2 text-sm text-slate-400">Partner inventory and referral links.</p></div><div className="rounded-2xl bg-slate-900 p-6"><Plane className="text-orange-400"/><h3 className="mt-4 font-bold">Activities & transport</h3><p className="mt-2 text-sm text-slate-400">Curated products with tracked referrals.</p></div></div></div></div></section>

      <section id="how" className="bg-orange-500 px-6 py-16 text-slate-950"><div className="mx-auto max-w-7xl text-center"><h2 className="text-4xl font-black">Plan → Book → Earn</h2><p className="mx-auto mt-4 max-w-2xl text-lg">Customers buy your curated plans. You can cross-sell eligible partner products and earn affiliate commissions where partner terms permit.</p></div></section>

      <footer className="px-6 py-8 text-center text-sm text-slate-500">© 2026 YatraPilot • Tourism plans, partner offers and affiliate marketplace</footer>
    </main>
  );
}
