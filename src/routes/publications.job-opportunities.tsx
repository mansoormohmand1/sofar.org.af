import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle, ArrowRight, ChevronDown, Facebook, HandHelping,
  Instagram, Mail, MapPin, Menu, Phone, Plus, Twitter, X, Youtube,
  Trash2, Briefcase, Clock, Calendar,
} from "lucide-react";
import { useCms } from "@/lib/cms";
import { E, EditableImage } from "@/components/Editable";

export const Route = createFileRoute("/publications/job-opportunities")({
  component: JobOpportunitiesPage,
  head: () => ({
    meta: [
      { title: "Job Opportunities – SOFAR" },
      { name: "description", content: "Explore career opportunities at SOFAR. Join our team serving communities across Afghanistan." },
    ],
  }),
});

function JobOpportunitiesPage() {
  const { content, editMode, addJobOpportunity, removeJobOpportunity, update } = useCms();
  const c = content;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white font-sans text-gray-800 antialiased">
      <div className="urgency-bar text-white text-sm overflow-hidden" role="alert">
        <div className="flex whitespace-nowrap marquee-track py-2">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12 px-6 font-medium" aria-hidden="true">
              <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" aria-hidden="true" /> SOFAR Job Opportunities — Join Our Team</span>
            </div>
          ))}
        </div>
      </div>

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
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook className="w-3.5 h-3.5" aria-hidden="true" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><Twitter className="w-3.5 h-3.5" aria-hidden="true" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram className="w-3.5 h-3.5" aria-hidden="true" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Youtube"><Youtube className="w-3.5 h-3.5" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>

      <header className="bg-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3" aria-label="SOFAR Home">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
              <E path="brand.logoText" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-brand-900 leading-none tracking-tight"><E path="brand.name" /></div>
              <div className="text-[8px] text-brand-600 tracking-[0.15em] uppercase font-medium mt-0.5"><E path="brand.tagline" /></div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {c.nav.map((l, i) => {
              const anchors = ["/#programs", "/#provinces", "/#about", "/#news", "/#involved", "/publications"];
              return (
                <a key={i} href={anchors[i] || "#"} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 flex items-center gap-1 transition-colors">
                  {l}{i === 0 && <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <a href="/#involved" className="primary-btn text-white px-5 py-2.5 rounded-full text-sm font-semibold hidden sm:inline-flex items-center gap-2">
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

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-72 max-w-[80vw] bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-brand-900">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-gray-500 hover:text-gray-900" aria-label="Close menu"><X className="w-5 h-5" /></button>
            </div>
            <nav className="p-4 space-y-1">
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
              <a href="/#involved" onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 primary-btn text-white px-5 py-3 rounded-full font-semibold mt-2">
                <HandHelping className="w-4 h-4" /> <E path="donateBtn" />
              </a>
            </nav>
          </div>
        </div>
      )}

      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 text-xs text-gray-500">
          <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/publications" className="hover:text-brand-600 transition-colors">Publications</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Job Opportunities</span>
        </div>
      </div>

      <section className="relative py-20 bg-gradient-to-br from-brand-700 to-brand-950 overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-6">
            <Briefcase className="w-8 h-8 text-brand-300" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">Job Opportunities</h1>
          <p className="text-brand-200 text-lg max-w-2xl mx-auto">
            Join SOFAR's dedicated team working to serve communities across Afghanistan. Explore current openings and make a difference.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          {editMode && (
            <div className="flex justify-center mb-10">
              <button onClick={addJobOpportunity}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all">
                <Plus className="w-4 h-4" /> Add Position
              </button>
            </div>
          )}
          <div className="space-y-6">
            {c.jobOpportunities.map((job, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 lg:p-8 relative">
                {editMode && (
                  <button onClick={() => { if (confirm("Delete this position?")) removeJobOpportunity(i); }}
                    className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow-lg z-10"
                    title="Delete position"><Trash2 className="w-3.5 h-3.5" /></button>
                )}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      <E path={`jobOpportunities[${i}].title`} />
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                      <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 px-3 py-1 rounded-full font-medium">
                        <Briefcase className="w-3.5 h-3.5" /> <E path={`jobOpportunities[${i}].department`} />
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-gray-500">
                        <MapPin className="w-3.5 h-3.5" /> <E path={`jobOpportunities[${i}].location`} />
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-gray-500">
                        <Clock className="w-3.5 h-3.5" /> <E path={`jobOpportunities[${i}].type`} />
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-gray-500">
                        <Calendar className="w-3.5 h-3.5" /> Deadline: <E path={`jobOpportunities[${i}].deadline`} />
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      <E path={`jobOpportunities[${i}].description`} multiline />
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col gap-2">
                    <Link to="/publications/job-opportunities/$slug" params={{ slug: job.slug }}
                      className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow">
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 border border-brand-600 text-brand-600 hover:bg-brand-50 px-6 py-2.5 rounded-full text-sm font-semibold transition-all">
                      Apply Now
                    </a>
                  </div>
                </div>
                {editMode && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <label className="text-xs text-gray-500 block mb-1">Apply URL:</label>
                    <input type="text" value={job.applyUrl} placeholder="https://..."
                      onChange={(e) => update(`jobOpportunities[${i}].applyUrl`, e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded bg-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
          {c.jobOpportunities.length === 0 && (
            <div className="text-center py-16">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500">No open positions right now</h3>
              <p className="text-gray-400 text-sm mt-1">Check back later for new opportunities.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-brand-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Don't see the right role?</h2>
          <p className="text-brand-200 mb-8 text-lg">SOFAR is always looking for talented individuals committed to serving Afghan communities. Send us your resume.</p>
          <a href="/#involved" className="inline-flex items-center gap-2 primary-btn text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl">
            <HandHelping className="w-5 h-5" /> Contact Us <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <footer className="bg-brand-950 text-brand-100 pt-16 pb-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center text-white font-extrabold"><E path="brand.logoText" /></div>
              <div><div className="text-lg font-bold text-white"><E path="brand.name" /></div><div className="text-[8px] tracking-[0.15em] uppercase text-brand-300"><E path="brand.tagline" /></div></div>
            </div>
            <p className="text-sm text-brand-200 leading-relaxed mb-5"><E path="footer.about" multiline /></p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((I, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition"><I className="w-4 h-4" /></a>
              ))}
            </div>
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
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); const input = (e.currentTarget.querySelector("input[type=email]") as HTMLInputElement); if (input?.value?.includes("@")) { input.value = ""; alert("Thanks for subscribing!"); } }}>
              <input type="email" placeholder="Your email" required className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-brand-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
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
