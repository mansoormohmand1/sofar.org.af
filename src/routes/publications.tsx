import { useState, useCallback } from "react";
import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import {
  AlertTriangle, ArrowRight, ChevronDown, Facebook, HandHelping,
  Instagram, Mail, Menu, Phone, Plus, Twitter, X, Youtube, Trash2,
} from "lucide-react";
import { useCms } from "@/lib/cms";
import { E } from "@/components/Editable";

export const Route = createFileRoute("/publications")({
  component: PublicationsPage,
  head: () => ({
    meta: [
      { title: "Publications – SOFAR" },
      { name: "description", content: "Browse SOFAR's publications including Annual Reports, Job Opportunities, RFPs, and RFQs." },
    ],
  }),
});

function PublicationsPage() {
  const { content, editMode, addPublisherLink, removePublisherLink } = useCms();
  const c = content;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const navigate = useCallback((url: string) => { router.navigate({ to: url }); }, [router]);

  return (
    <div className="bg-white font-sans text-gray-800 antialiased">
      {/* Urgency bar */}
      <div className="urgency-bar text-white text-sm overflow-hidden" role="alert">
        <div className="flex whitespace-nowrap marquee-track py-2">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12 px-6 font-medium" aria-hidden="true">
              <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" aria-hidden="true" /> SOFAR Publications — Annual Reports, Job Opportunities, RFPs & RFQs</span>
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
              const anchors = ["#programs", "#provinces", "#about", "#news", "#involved", "/publications"];
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

      {/* Mobile menu */}
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

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 text-xs text-gray-500">
          <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Publications</span>
        </div>
      </div>

      {/* Publications content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4"><E path="publisher.title" /></h1>
            <p className="text-lg text-gray-600">Browse our latest publications, reports, and opportunities.</p>
            {editMode && (
              <button onClick={addPublisherLink}
                className="mt-4 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all">
                <Plus className="w-4 h-4" /> Add Link
              </button>
            )}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.publisher.links.map((link, i) => {
              const isInternal = link.url.startsWith("/");
              const Tag = isInternal ? "div" : "a";
              const extraProps = isInternal ? {} : { href: link.url, target: "_blank", rel: "noopener noreferrer" as const };
              return (
                <Tag key={i} {...extraProps} onClick={isInternal ? () => navigate(link.url) : undefined}
                  className="group relative block p-8 rounded-2xl bg-white border border-gray-100 hover:border-brand-300 hover:shadow-xl transition-all text-center cursor-pointer">
                  {editMode && (
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (confirm("Delete this link?")) removePublisherLink(i); }}
                      className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow-lg z-10"
                      title="Delete link"><Trash2 className="w-3.5 h-3.5" /></button>
                  )}
                  <div className="w-14 h-14 mx-auto rounded-xl bg-brand-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <span className="text-xl font-bold text-brand-600">{link.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2"><E path={`publisher.links[${i}].name`} /></h3>
                  <span className="text-brand-600 font-semibold text-sm flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                    Open <ArrowRight className="w-4 h-4" />
                  </span>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Want to work with SOFAR?</h2>
          <p className="text-brand-200 mb-8 text-lg">Check our latest job openings, RFPs, and partnership opportunities.</p>
          <a href="/#involved" className="inline-flex items-center gap-2 primary-btn text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl">
            <HandHelping className="w-5 h-5" /> Contact Us <ArrowRight className="w-4 h-4" />
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
              <a href={c.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition"><Facebook className="w-4 h-4" /></a>
              <a href={c.social.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition"><Twitter className="w-4 h-4" /></a>
              <a href={c.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition"><Instagram className="w-4 h-4" /></a>
              <a href={c.social.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition"><Youtube className="w-4 h-4" /></a>
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
