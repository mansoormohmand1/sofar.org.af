import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  AlertTriangle, ArrowRight, ChevronDown, Facebook, HandHelping,
  Instagram, Mail, Menu, Phone, Plus, Twitter, X, Youtube,
  Briefcase, MapPin, Clock, Calendar, BookOpen,
} from "lucide-react";
import { useCms } from "@/lib/cms";
import { E } from "@/components/Editable";

export const Route = createFileRoute("/publications/job-opportunities/$slug")({
  component: JobDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Job not found</h2>
        <p className="mt-2 text-sm text-gray-500">The job posting you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link to="/publications/job-opportunities" className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors">
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  ),
});

function JobDetailPage() {
  const { slug } = Route.useParams();
  const { content, editMode, update } = useCms();
  const c = content;
  const job = c.jobOpportunities.find((j) => j.slug === slug);
  const jobPage = c.jobPages[slug];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!job || !jobPage) throw notFound();

  const idx = c.jobOpportunities.findIndex((j) => j.slug === slug);
  const base = `jobOpportunities[${idx}]`;
  const pageBase = `jobPages.${slug}`;

  return (
    <div className="bg-white font-sans text-gray-800 antialiased">
      <div className="urgency-bar text-white text-sm overflow-hidden" role="alert">
        <div className="flex whitespace-nowrap marquee-track py-2">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12 px-6 font-medium" aria-hidden="true">
              <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" aria-hidden="true" /> SOFAR Job Opportunities — <E path={`${base}.title`} /></span>
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
          <Link to="/publications/job-opportunities" className="hover:text-brand-600 transition-colors">Job Opportunities</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium"><E path={`${base}.title`} /></span>
        </div>
      </div>

      <section className="py-12 bg-gradient-to-br from-brand-700 to-brand-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-3"><E path={`${base}.title`} /></h1>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-brand-100 px-3 py-1 rounded-full">
                  <Briefcase className="w-3.5 h-3.5" /> <E path={`${base}.department`} />
                </span>
                <span className="inline-flex items-center gap-1.5 text-brand-200">
                  <MapPin className="w-3.5 h-3.5" /> <E path={`${base}.location`} />
                </span>
                <span className="inline-flex items-center gap-1.5 text-brand-200">
                  <Clock className="w-3.5 h-3.5" /> <E path={`${base}.type`} />
                </span>
                <span className="inline-flex items-center gap-1.5 text-brand-200">
                  <Calendar className="w-3.5 h-3.5" /> Deadline: <E path={`${base}.deadline`} />
                </span>
              </div>
            </div>
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-red hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-2xl shrink-0">
              Apply Now <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {jobPage.about && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-brand-600" /> About <E path={`${pageBase}.organization`} /></h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line"><E path={`${pageBase}.about`} multiline /></div>
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Job Summary</h2>
                <div className="text-gray-700 leading-relaxed"><E path={`${base}.description`} multiline /></div>
              </div>

              {jobPage.responsibilities && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line"><E path={`${pageBase}.responsibilities`} multiline /></div>
                </div>
              )}

              {jobPage.reqQualifications && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Qualifications</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line"><E path={`${pageBase}.reqQualifications`} multiline /></div>
                </div>
              )}

              {jobPage.submissionGuidelines && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Submission Guidelines</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line"><E path={`${pageBase}.submissionGuidelines`} multiline /></div>
                </div>
              )}

              <div className="pt-4">
                <a href={job.applyUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg">
                  Apply Now <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Job Details</h3>
                <div className="space-y-3 text-sm">
                  <DetailRow label="Organization" value={jobPage.organization} path={`${pageBase}.organization`} editMode={editMode} />
                  <DetailRow label="Location" value={job.location} path={`${base}.location`} editMode={editMode} />
                  <DetailRow label="Education" value={jobPage.education} path={`${pageBase}.education`} editMode={editMode} />
                  <DetailRow label="Gender" value={jobPage.gender} path={`${pageBase}.gender`} editMode={editMode} />
                  <DetailRow label="Work Type" value={job.type} path={`${base}.type`} editMode={editMode} />
                  <DetailRow label="Salary Range" value={jobPage.salaryRange} path={`${pageBase}.salaryRange`} editMode={editMode} />
                  <DetailRow label="Experience" value={jobPage.experienceRequired} path={`${pageBase}.experienceRequired`} editMode={editMode} />
                  <DetailRow label="Reference No." value={jobPage.referenceNumber} path={`${pageBase}.referenceNumber`} editMode={editMode} />
                  <DetailRow label="No. of Vacancies" value={jobPage.numberOfVacancies} path={`${pageBase}.numberOfVacancies`} editMode={editMode} />
                  <DetailRow label="Announcement Type" value={jobPage.announcementType} path={`${pageBase}.announcementType`} editMode={editMode} />
                  <DetailRow label="Publish Date" value={jobPage.publishDate} path={`${pageBase}.publishDate`} editMode={editMode} />
                  <DetailRow label="Closing Date" value={job.deadline} path={`${base}.deadline`} editMode={editMode} />
                  <DetailRow label="Probation Period" value={jobPage.probationaryPeriod} path={`${pageBase}.probationaryPeriod`} editMode={editMode} />
                  <DetailRow label="Contract Type" value={jobPage.contractType} path={`${pageBase}.contractType`} editMode={editMode} />
                  <DetailRow label="Contract Duration" value={jobPage.contractDuration} path={`${pageBase}.contractDuration`} editMode={editMode} />
                  <DetailRow label="Contract Extension" value={jobPage.contractExtension} path={`${pageBase}.contractExtension`} editMode={editMode} />
                  <DetailRow label="Languages" value={jobPage.languages} path={`${pageBase}.languages`} editMode={editMode} />
                  <DetailRow label="Functional Area" value={jobPage.functionalArea} path={`${pageBase}.functionalArea`} editMode={editMode} />
                  <DetailRow label="Nationality" value={jobPage.nationality} path={`${pageBase}.nationality`} editMode={editMode} />
                  <DetailRow label="Travel Required" value={jobPage.travelRequired} path={`${pageBase}.travelRequired`} editMode={editMode} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Don't see the right role?</h2>
          <p className="text-gray-600 mb-8">SOFAR is always looking for talented individuals committed to serving Afghan communities.</p>
          <Link to="/publications/job-opportunities"
            className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 rounded-full text-lg font-semibold transition-all">
            <ArrowRight className="w-5 h-5" /> Browse All Openings
          </Link>
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

function DetailRow({ label, value, path, editMode }: { label: string; value: string; path: string; editMode: boolean }) {
  if (!value && !editMode) return null;
  return (
    <div>
      <span className="text-gray-500 text-xs block">{label}</span>
      {editMode ? (
        <E path={path} className="text-gray-900 font-medium" />
      ) : (
        <span className="text-gray-900 font-medium">{value}</span>
      )}
    </div>
  );
}
