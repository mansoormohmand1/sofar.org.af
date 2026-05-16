import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  AlertTriangle, ArrowRight, Check, ChevronDown, Facebook, HandHelping,
  Instagram, Mail, Menu, Phone, Plus, Star, Trash2, Twitter, X, Youtube,
} from "lucide-react";
import { useCms } from "@/lib/cms";
import { E, EditableImage } from "@/components/Editable";

export const Route = createFileRoute("/programs/$slug")({
  component: ProgramPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Program not found</h2>
        <p className="mt-2 text-sm text-gray-500">The program page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  ),
});

function ProgramPage() {
  const { slug } = Route.useParams();
  const { content, editMode, addProgramBlock, removeProgramBlock, update } = useCms();
  const c = content;
  const program = c.programs.find((p) => p.slug === slug);
  const page = c.programPages[slug];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!program || !page) throw notFound();

  return (
    <div className="bg-white font-sans text-gray-800 antialiased">
      {/* Urgency bar */}
      <div className="urgency-bar text-white text-sm overflow-hidden" role="alert" aria-label="Urgent announcements">
        <div className="flex whitespace-nowrap marquee-track py-2">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12 px-6 font-medium" aria-hidden="true">
              <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" aria-hidden="true" /> <E path={`programPages.${slug}.briefDesc`} /></span>
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
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook className="w-3.5 h-3.5" aria-hidden="true" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><Twitter className="w-3.5 h-3.5" aria-hidden="true" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram className="w-3.5 h-3.5" aria-hidden="true" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Youtube"><Youtube className="w-3.5 h-3.5" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
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
            {c.nav.map((l, i) => (
              <span key={i} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 flex items-center gap-1 cursor-pointer transition-colors">
                {l}{i === 0 && <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />}
              </span>
            ))}
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
              {c.nav.map((l, i) => (
                <Link key={i} to="/" onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-brand-50 hover:text-brand-700 font-medium transition-colors">
                  {l}
                </Link>
              ))}
              <hr className="my-3 border-gray-100" />
              <a href="/#involved" onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 primary-btn text-white px-5 py-3 rounded-full font-semibold mt-2">
                <HandHelping className="w-4 h-4" /> <E path="donateBtn" />
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 text-xs text-gray-500">
          <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{program.title}</span>
        </div>
      </div>

      {/* Section 1: Brief description */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6">{program.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            <E path={`programPages.${slug}.briefDesc`} multiline />
          </p>
        </div>
      </section>

      {/* Section 2: Full-width hero image (landscape) */}
      <section className="w-full overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: "1200 / 500" }}>
          <EditableImage path={`programPages.${slug}.heroImage`} alt={program.title} imgClassName="w-full h-full object-cover" />
        </div>
      </section>

      {/* Sections 3+: Alternating left-right / right-left blocks */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {editMode && (
            <div className="flex justify-center mb-8">
              <button onClick={() => addProgramBlock(slug)}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all">
                <Plus className="w-4 h-4" /> Add Content Block
              </button>
            </div>
          )}
          <div className="space-y-12">
            {page.blocks.map((block, i) => (
              <div key={i} className={`flex flex-col ${block.layout === "left-right" ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-14 items-center`}>
                <div className="flex-1">
                  {editMode && (
                    <div className="flex items-center gap-2 mb-3">
                      <label className="text-xs text-gray-500 font-medium">Layout:</label>
                      <select
                        value={block.layout}
                        onChange={(e) => update(`programPages.${slug}.blocks[${i}].layout`, e.target.value)}
                        className="text-xs px-2 py-1 border border-gray-300 rounded bg-white"
                      >
                        <option value="left-right">Left → Right</option>
                        <option value="right-left">Right → Left</option>
                      </select>
                      <button
                        onClick={() => { if (confirm("Delete this block?")) removeProgramBlock(slug, i); }}
                        className="ml-auto bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5"
                        title="Delete block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <p className="text-gray-700 leading-relaxed text-lg">
                    <E path={`programPages.${slug}.blocks[${i}].desc`} multiline />
                  </p>
                </div>
                <div className="flex-1 w-full">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <EditableImage path={`programPages.${slug}.blocks[${i}].image`} alt="" imgClassName="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Support {program.title}</h2>
          <p className="text-brand-200 mb-8 text-lg">Your contribution helps us continue this vital work across Afghanistan.</p>
          <a href="/#involved" className="inline-flex items-center gap-2 primary-btn text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl">
            <HandHelping className="w-5 h-5" /> Get Involved <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-950 text-brand-100 pt-16 pb-8 border-t border-white/10">
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
              {[Facebook, Twitter, Instagram, Youtube].map((I, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition">
                  <I className="w-4 h-4" />
                </a>
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
            <form className="flex gap-2" onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.querySelector("input[type=email]") as HTMLInputElement);
              if (input?.value?.includes("@")) { input.value = ""; alert("Thanks for subscribing!"); }
            }}>
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
