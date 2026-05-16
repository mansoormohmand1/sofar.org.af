import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle, ArrowRight, Check, ChevronDown, Droplets, Facebook, Flower2,
  GraduationCap, HandHelping, HeartPulse, Instagram, Mail, MapPin,
  Menu, Phone, PlayCircle, School, Snowflake, Star, Twitter, Users,
  Youtube, Package, Shield, Plus, Trash2, X,
} from "lucide-react";
import { useCms, type Appeal as AppealT } from "@/lib/cms";
import { E, EditableImage } from "@/components/Editable";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SOFAR – Salam Organization for Afghanistan Rehabilitation" },
      { name: "description", content: "SOFAR is an Afghan-led humanitarian organization delivering food, shelter, healthcare, and education across all 34 provinces of Afghanistan since 2009." },
    ],
  }),
});

const ICONS: Record<string, any> = {
  Users, MapPin, Droplets, School, Shield, GraduationCap, HeartPulse,
  Flower2, Snowflake, HandHelping, Package,
};

function StatBlock({ basePath, idx }: { basePath: string; idx: number }) {
  const { get } = useCms();
  const s = get(`${basePath}[${idx}]`) || {};
  return (
    <div className="text-center">
      <div className="text-4xl lg:text-5xl font-bold text-white">
        <E path={`${basePath}[${idx}].value`} />
        {(s.suffix || s.suffix === "") && <E as="span" path={`${basePath}[${idx}].suffix`} className="text-brand-300" />}
      </div>
      <div className="text-brand-200 text-sm mt-2 uppercase tracking-wider">
        <E path={`${basePath}[${idx}].label`} />
      </div>
    </div>
  );
}

function AppealCard({ appeal, idx }: { appeal: AppealT; idx: number }) {
  const { editMode, removeAppeal, update } = useCms();
  const base = `appeals[${idx}]`;
  const colorOptions = ["bg-accent-red", "bg-accent-orange", "bg-brand-600", "bg-blue-500", "bg-purple-500", "bg-amber-500"];
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative">
      {editMode && (
        <button
          onClick={() => { if (confirm("Delete this appeal card?")) removeAppeal(appeal.id); }}
          className="absolute top-2 left-2 z-20 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg"
          title="Delete card"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
      <div className="relative h-56 overflow-hidden">
        <EditableImage path={`${base}.img`} alt={appeal.title} imgClassName="w-full h-full object-cover" />
        <span className={`absolute top-4 left-4 ${appeal.badgeColor} text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10`}>
          <E path={`${base}.badge`} />
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2"><E path={`${base}.title`} /></h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed"><E path={`${base}.desc`} multiline /></p>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-gray-700"><E path={`${base}.raised`} /></span>
          <span className="text-gray-500">of <E path={`${base}.goal`} /></span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
          <div className="bg-gradient-to-r from-brand-500 to-brand-700 h-2 rounded-full" style={{ width: `${appeal.percent}%` }} />
        </div>
        {editMode && (
          <div className="flex items-center gap-2 mb-3 text-xs">
            <label className="text-gray-600">Progress %:</label>
            <input type="number" min={0} max={100} value={appeal.percent}
              onChange={(e) => update(`${base}.percent`, Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
              className="w-16 px-2 py-1 border border-gray-300 rounded" />
            <label className="text-gray-600 ml-2">Badge:</label>
            <select value={appeal.badgeColor} onChange={(e) => update(`${base}.badgeColor`, e.target.value)}
              className="px-1 py-1 border border-gray-300 rounded text-xs">
              {colorOptions.map(c => <option key={c} value={c}>{c.replace("bg-", "")}</option>)}
            </select>
          </div>
        )}
        <a href="#involved" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
          Learn More <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function Index() {
  const { content, editMode, addAppeal, addProgram, removeProgram, addProvince, removeProvince, addPillar, removePillar, addNews, removeNews, addInvolvedCard, removeInvolvedCard, addPublisherLink, removePublisherLink, update } = useCms();
  const c = content;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", help: "Volunteer Teaching" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  return (
    <div className="bg-white font-sans text-gray-800 antialiased">
      {/* Urgency bar */}
      <div className="urgency-bar text-white text-sm overflow-hidden" role="alert" aria-label="Urgent announcements">
        <div className="flex whitespace-nowrap marquee-track py-2">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12 px-6 font-medium" aria-hidden="true">
              <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" aria-hidden="true" /> <E path="urgency.a" /></span>
              <span><E path="urgency.b" /></span>
              <span><E path="urgency.c" /></span>
            </div>
          ))}
        </div>
      </div>

      {/* Top contact bar */}
      <div className="bg-brand-950 text-brand-100 text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between">
          <div className="flex gap-5">
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" aria-hidden="true" /> <E path="brand.phone" /></span>
            <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" aria-hidden="true" /> <E path="brand.email" /></span>
          </div>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-white transition-colors">Careers</a>
            <a href="#" className="hover:text-white transition-colors">Volunteer Portal</a>
            <div className="flex gap-3 ml-3">
              <a href={c.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook className="w-3.5 h-3.5" aria-hidden="true" /></a>
              <a href={c.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Twitter"><Twitter className="w-3.5 h-3.5" aria-hidden="true" /></a>
              <a href={c.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram className="w-3.5 h-3.5" aria-hidden="true" /></a>
              <a href={c.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Youtube"><Youtube className="w-3.5 h-3.5" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3" aria-label="SOFAR Home">
            {c.brand.logoImage ? (
              <div className="h-12 w-12 rounded-lg overflow-hidden shadow-md relative">
                <EditableImage path="brand.logoImage" imgClassName="w-full h-full object-cover" />
                {editMode && (
                  <button onClick={(e) => { e.preventDefault(); update("brand.logoImage", ""); }}
                    className="absolute -bottom-2 -left-2 bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded-full">×</button>
                )}
              </div>
            ) : (
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center text-white font-extrabold text-lg shadow-md relative">
                <E path="brand.logoText" />
                {editMode && (
                  <button
                    onClick={(e) => { e.preventDefault(); const url = prompt("Logo image URL (paste a link to an image):"); if (url) update("brand.logoImage", url); }}
                    className="absolute -bottom-2 -right-2 bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded-full"
                  >img</button>
                )}
              </div>
            )}
            <div>
              <div className="text-xl font-extrabold text-brand-900 leading-none tracking-tight"><E path="brand.name" /></div>
              <div className="text-[8px] text-brand-600 tracking-[0.15em] uppercase font-medium mt-0.5"><E path="brand.tagline" /></div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {c.nav.map((l, i) => {
              const anchors = ["#programs", "#provinces", "#about", "#news", "#involved", "/publications"];
              return (
                <a key={i} href={anchors[i] || "#"} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 flex items-center gap-1 transition-colors">
                  {l}{i === 0 && <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#involved" className="primary-btn text-white px-5 py-2.5 rounded-full text-sm font-semibold hidden sm:inline-flex items-center gap-2">
              <HandHelping className="w-4 h-4" aria-hidden="true" /> <E path="donateBtn" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-brand-600 transition-colors p-2"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-72 max-w-[80vw] bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-brand-900">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-gray-500 hover:text-gray-900" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1" aria-label="Mobile navigation">
              {c.nav.map((l, i) => {
                const anchors = ["/#programs", "/#provinces", "/#about", "/#news", "/#involved", "/publications"];
                return (
                  <a key={i} href={anchors[i] || "#"} onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-brand-50 hover:text-brand-700 font-medium transition-colors">
                    {l}
                  </a>
                );
              })}
              <hr className="my-3 border-gray-100" />
              <a href="#involved" onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 primary-btn text-white px-5 py-3 rounded-full font-semibold mt-2">
                <HandHelping className="w-4 h-4" /> <E path="donateBtn" />
              </a>
              <div className="flex gap-2 justify-center pt-4">
                <a href={c.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-brand-500 hover:text-white flex items-center justify-center transition-colors"><Facebook className="w-4 h-4" /></a>
                <a href={c.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-brand-500 hover:text-white flex items-center justify-center transition-colors"><Twitter className="w-4 h-4" /></a>
                <a href={c.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-brand-500 hover:text-white flex items-center justify-center transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href={c.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-brand-500 hover:text-white flex items-center justify-center transition-colors"><Youtube className="w-4 h-4" /></a>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <EditableImage path="hero.image" alt="Hero" className="absolute inset-0 w-full h-full" imgClassName="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient pointer-events-none" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-accent-red/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> <E path="hero.eyebrow" />
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight anim-fiu">
              <E path="hero.titleA" /> <E path="hero.titleHighlight" className="text-brand-300" />
            </h1>
            <p className="text-lg md:text-xl text-brand-100 mt-6 leading-relaxed max-w-2xl">
              <E path="hero.subtitle" multiline />
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#involved" className="primary-btn text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 shadow-2xl">
                <HandHelping className="w-5 h-5" /> <E path="hero.ctaPrimary" />
              </a>
              <a href="#about" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all flex items-center gap-2">
                <PlayCircle className="w-5 h-5" /> <E path="hero.ctaSecondary" />
              </a>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl">
              {c.hero.stats.map((_, i) => <StatBlock key={i} basePath="hero.stats" idx={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-brand-950 pattern-overlay">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <span className="text-brand-400 text-sm font-semibold uppercase tracking-widest"><E path="impact.eyebrow" /></span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mt-3 tracking-tight"><E path="impact.title" /></h2>
            <p className="text-brand-200 mt-4"><E path="impact.subtitle" multiline /></p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.impact.stats.map((s, i) => {
              const Icon = ICONS[s.icon || "Users"] || Users;
              return (
                <div key={i} className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 text-center hover:bg-white/10 transition anim-fis anim-delay-${i + 1}`}>
                  <div className="w-14 h-14 mx-auto rounded-xl bg-brand-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-brand-400" />
                  </div>
                  <div className="text-4xl font-bold text-white">
                    <E path={`impact.stats[${i}].value`} />
                    <E as="span" path={`impact.stats[${i}].suffix`} className="text-brand-300" />
                  </div>
                  <div className="text-brand-200 text-sm mt-2 uppercase tracking-wider"><E path={`impact.stats[${i}].label`} /></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Current appeals */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="text-accent-red text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-red rounded-full animate-pulse" /> <E path="appealsEyebrow" />
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-3 tracking-tight"><E path="appealsTitle" /></h2>
            </div>
            <div className="flex items-center gap-3">
              {editMode && (
                <button onClick={addAppeal}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
                  <Plus className="w-4 h-4" /> Add Card
                </button>
              )}
              <a href="#" className="hidden md:flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700">
                <E path="appealsViewAll" /> <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {c.appeals.map((a, i) => <AppealCard key={a.id} appeal={a} idx={i} />)}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest"><E path="programsEyebrow" /></span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-3 tracking-tight"><E path="programsTitle" /></h2>
            <p className="text-gray-600 mt-4"><E path="programsSubtitle" multiline /></p>
            {editMode && (
              <button onClick={addProgram}
                className="mt-4 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all">
                <Plus className="w-4 h-4" /> Add Card
              </button>
            )}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.programs.map((p, i) => {
              const Icon = ICONS[p.icon] || Shield;
              const colorMap: Record<string, string> = {
                red: "text-red-600", blue: "text-blue-600", amber: "text-amber-600",
                rose: "text-rose-600", purple: "text-purple-600", sky: "text-sky-600",
                green: "text-green-600", brand: "text-brand-600",
              };
              const bgMap: Record<string, string> = {
                "bg-red-50": "bg-red-50", "bg-blue-50": "bg-blue-50", "bg-amber-50": "bg-amber-50",
                "bg-rose-50": "bg-rose-50", "bg-purple-50": "bg-purple-50", "bg-sky-50": "bg-sky-50",
                "bg-green-50": "bg-green-50", "bg-brand-50": "bg-brand-50",
              };
              const iconColor = colorMap[p.color] || "text-brand-600";
              const bgClass = bgMap[p.bg] || "bg-brand-50";
              return (
                <div key={i} className={`group p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all bg-white anim-fiu anim-delay-${i + 1} relative`}>
                  {editMode && (
                    <button onClick={() => { if (confirm("Delete this program card?")) removeProgram(i); }}
                      className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow-lg z-10"
                      title="Delete card"><Trash2 className="w-3.5 h-3.5" /></button>
                  )}
                  <div className={`w-14 h-14 rounded-xl ${bgClass} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${iconColor}`} />
                  </div>
                  {editMode && (
                    <div className="flex items-center gap-2 mb-3 text-xs flex-wrap">
                      <label className="text-gray-500">Icon:</label>
                      <select value={p.icon} onChange={(e) => update(`programs[${i}].icon`, e.target.value)}
                        className="px-1 py-1 border border-gray-300 rounded text-xs bg-white">
                        {Object.keys(ICONS).map(k => <option key={k} value={k}>{k}</option>)}
                      </select>
                      <label className="text-gray-500">Color:</label>
                      <select value={p.color} onChange={(e) => update(`programs[${i}].color`, e.target.value)}
                        className="px-1 py-1 border border-gray-300 rounded text-xs bg-white">
                        {Object.keys(colorMap).map(k => <option key={k} value={k}>{k}</option>)}
                      </select>
                      <label className="text-gray-500">Bg:</label>
                      <select value={p.bg} onChange={(e) => update(`programs[${i}].bg`, e.target.value)}
                        className="px-1 py-1 border border-gray-300 rounded text-xs bg-white">
                        {Object.keys(bgMap).map(k => <option key={k} value={k}>{k}</option>)}
                      </select>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-3"><E path={`programs[${i}].title`} /></h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed"><E path={`programs[${i}].desc`} multiline /></p>
                  <Link to="/programs/$slug" params={{ slug: p.slug }} className={`${iconColor} font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all`}>
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Provinces */}
      <section id="provinces" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest"><E path="provincesEyebrow" /></span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-3 tracking-tight"><E path="provincesTitle" /></h2>
            <p className="text-gray-600 mt-4"><E path="provincesSubtitle" multiline /></p>
            {editMode && (
              <button onClick={addProvince}
                className="mt-4 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all">
                <Plus className="w-4 h-4" /> Add Region
              </button>
            )}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.provinces.map((p, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-300 hover:bg-white hover:shadow-lg transition relative">
                {editMode && (
                  <button onClick={() => { if (confirm("Delete this region?")) removeProvince(i); }}
                    className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow-lg z-10"
                    title="Delete region"><Trash2 className="w-3.5 h-3.5" /></button>
                )}
                <div className="flex items-center gap-2 text-brand-600 mb-3">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-bold text-gray-900"><E path={`provinces[${i}].region`} /></h3>
                </div>
                <p className="text-sm text-gray-600"><E path={`provinces[${i}].list`} multiline /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <EditableImage path="about.image" alt="SOFAR Team" className="rounded-2xl shadow-xl w-full overflow-hidden h-[500px]" imgClassName="rounded-2xl w-full object-cover h-[500px]" />
          <div>
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest"><E path="about.eyebrow" /></span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-3 tracking-tight"><E path="about.title" /></h2>
            <p className="text-gray-700 mt-5 leading-relaxed"><E path="about.p1" multiline /></p>
            <p className="text-gray-600 mt-3 leading-relaxed"><E path="about.p2" multiline /></p>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {c.about.pillars.map((p, i) => (
                <div key={i} className="flex gap-3 relative">
                  {editMode && (
                    <button onClick={() => { if (confirm("Delete this pillar?")) removePillar(i); }}
                      className="absolute -top-1 -left-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-lg z-10"
                      title="Delete pillar"><Trash2 className="w-3 h-3" /></button>
                  )}
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-brand-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900"><E path={`about.pillars[${i}].title`} /></div>
                    <div className="text-sm text-gray-600"><E path={`about.pillars[${i}].desc`} multiline /></div>
                  </div>
                </div>
              ))}
              {editMode && (
                <button onClick={addPillar}
                  className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-amber-500 rounded-xl p-4 text-gray-500 hover:text-amber-600 transition text-sm font-medium">
                  <Plus className="w-4 h-4" /> Add Pillar
                </button>
              )}
            </div>
            <a href="#" className="inline-flex items-center gap-2 primary-btn text-white px-6 py-3 rounded-full font-semibold mt-8 shadow-lg">
              <E path="about.cta" /> <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* News */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest"><E path="newsEyebrow" /></span>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-3 tracking-tight"><E path="newsTitle" /></h2>
            </div>
            <div className="flex items-center gap-3">
              {editMode && (
                <button onClick={addNews}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
                  <Plus className="w-4 h-4" /> Add News
                </button>
              )}
              <a href="#" className="hidden md:flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700">All News <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.news.map((n, i) => (
              <article key={i} className="group cursor-pointer relative">
                {editMode && (
                  <button onClick={() => { if (confirm("Delete this news item?")) removeNews(i); }}
                    className="absolute top-2 left-2 z-20 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow-lg"
                    title="Delete news"><Trash2 className="w-3.5 h-3.5" /></button>
                )}
                <EditableImage path={`news[${i}].img`} alt={n.title} className="overflow-hidden rounded-xl mb-4 aspect-[4/3]" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className={`${n.tagColor} text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded`}><E path={`news[${i}].tag`} /></span>
                <div className="text-xs text-gray-500 mt-2"><E path={`news[${i}].date`} /></div>
                <h3 className="font-bold text-gray-900 group-hover:text-brand-600 leading-snug mt-2"><E path={`news[${i}].title`} multiline /></h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest"><E path="testimonialsEyebrow" /></span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-3 tracking-tight"><E path="testimonialsTitle" /></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {c.testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent-gold fill-accent-gold" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"<E path={`testimonials[${i}].quote`} multiline />"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-brand-800 text-white font-bold flex items-center justify-center">
                    <E path={`testimonials[${i}].initials`} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900"><E path={`testimonials[${i}].name`} /></div>
                    <div className="text-xs text-gray-500"><E path={`testimonials[${i}].place`} /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section id="involved" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest"><E path="involved.eyebrow" /></span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-3 tracking-tight"><E path="involved.title" /></h2>
            <p className="text-gray-600 mt-4"><E path="involved.subtitle" multiline /></p>
            {editMode && (
              <button onClick={addInvolvedCard}
                className="mt-4 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all">
                <Plus className="w-4 h-4" /> Add Card
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {c.involved.cards.map((card, i) => {
              const Icon = ICONS[card.icon] || HandHelping;
              return (
                <div key={i} className="rounded-2xl p-8 bg-gradient-to-br from-brand-700 to-brand-950 text-white shadow-lg hover:shadow-2xl transition hover:-translate-y-1 relative">
                  {editMode && (
                    <button onClick={() => { if (confirm("Delete this card?")) removeInvolvedCard(i); }}
                      className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow-lg z-10"
                      title="Delete card"><Trash2 className="w-3.5 h-3.5" /></button>
                  )}
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-brand-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2"><E path={`involved.cards[${i}].title`} /></h3>
                  <p className="text-brand-100 text-sm mb-5"><E path={`involved.cards[${i}].desc`} multiline /></p>
                  <a href="#" className="inline-flex items-center gap-1 font-semibold text-brand-300 hover:gap-2 transition-all">
                    <E path={`involved.cards[${i}].cta`} /> <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-950 text-brand-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center text-white font-extrabold"><E path="brand.logoText" /></div>
              <div>
                <div className="text-lg font-bold text-white"><E path="brand.name" /></div>
                <div className="text-[8px] tracking-[0.15em] uppercase text-brand-300"><E path="brand.tagline" /></div>
              </div>
            </div>
            <p className="text-sm text-brand-200 leading-relaxed mb-5"><E path="footer.about" multiline /></p>
            <div className="flex gap-3">
              <a href={c.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition"><Facebook className="w-4 h-4" /></a>
              <a href={c.social.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition"><Twitter className="w-4 h-4" /></a>
              <a href={c.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition"><Instagram className="w-4 h-4" /></a>
              <a href={c.social.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition"><Youtube className="w-4 h-4" /></a>
            </div>
            {editMode && (
              <div className="mt-3 space-y-1.5">
                {(["facebook", "twitter", "instagram", "youtube"] as const).map((s) => (
                  <div key={s} className="flex items-center gap-2 text-xs">
                    <span className="text-brand-300 w-16 shrink-0 capitalize">{s}:</span>
                    <input value={c.social[s]} onChange={(e) => update(`social.${s}`, e.target.value)}
                      className="flex-1 px-2 py-1 rounded bg-white/10 border border-white/10 text-white text-xs placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="https://..." />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Our Work</h4>
            <ul className="space-y-2 text-sm">
              {["Emergency Response", "Food Security", "Education", "Healthcare", "Water & Sanitation", "Winterization"].map((l) => (
                <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Organization</h4>
            <ul className="space-y-2 text-sm">
              {["About SOFAR", "Where We Work", "Annual Reports", "Careers", "Contact"].map((l) => (
                <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider"><E path="footer.newsletterTitle" /></h4>
            <p className="text-sm text-brand-200 mb-3"><E path="footer.newsletterDesc" multiline /></p>
            <form className="flex gap-2" onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.querySelector("input[type=email]") as HTMLInputElement);
              if (input?.value?.includes("@")) { input.value = ""; alert("Thanks for subscribing!"); }
            }}>
              <input type="email" placeholder="Your email" required
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-brand-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              <button type="submit" className="primary-btn text-white px-4 rounded-lg text-sm font-semibold"><E path="footer.newsletterBtn" /></button>
            </form>
            <h4 className="text-white font-bold mt-6 mb-3 text-xs uppercase tracking-wider"><E path="footer.badgesTitle" /></h4>
            <div className="flex flex-wrap gap-2">
              {c.footer.badges.map((b, i) => (
                <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-full"><E path={`footer.badges[${i}]`} /></span>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 flex flex-wrap justify-between gap-4 text-xs text-brand-300">
          <div><E path="footer.copyright" /></div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
