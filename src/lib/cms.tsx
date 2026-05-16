import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "sofar_cms_v1";
const ADMIN_KEY = "sofar_admin_v1";
export const ADMIN_PASSWORD = "Mansoor@123";

export type Appeal = {
  id: string; img: string; badge: string; badgeColor: string;
  title: string; desc: string; raised: string; goal: string; percent: number;
};

export type StatItem = { value: string; suffix?: string; label: string; icon?: string };

export type ProgramBlock = {
  layout: "left-right" | "right-left";
  desc: string;
  image: string;
};

export type ProgramPage = {
  briefDesc: string;
  heroImage: string;
  blocks: ProgramBlock[];
};

export type JobPage = {
  organization: string;
  education: string;
  gender: string;
  about: string;
  responsibilities: string;
  reqQualifications: string;
  submissionGuidelines: string;
  publishDate: string;
  referenceNumber: string;
  numberOfVacancies: string;
  announcementType: string;
  salaryRange: string;
  experienceRequired: string;
  probationaryPeriod: string;
  contractType: string;
  contractDuration: string;
  contractExtension: string;
  languages: string;
  functionalArea: string;
  nationality: string;
  travelRequired: string;
};

export type Content = {
  brand: { logoText: string; logoImage: string; name: string; tagline: string; phone: string; email: string };
  urgency: { a: string; b: string; c: string };
  nav: string[];
  donateBtn: string;
  hero: {
    image: string; eyebrow: string; titleA: string; titleHighlight: string; subtitle: string;
    ctaPrimary: string; ctaSecondary: string;
    stats: StatItem[];
  };
  impact: {
    eyebrow: string; title: string; subtitle: string;
    stats: StatItem[];
  };
  appealsTitle: string; appealsEyebrow: string; appealsViewAll: string;
  appeals: Appeal[];
  programsTitle: string; programsEyebrow: string; programsSubtitle: string;
  programs: { icon: string; color: string; bg: string; title: string; desc: string; slug: string }[];
  programPages: Record<string, ProgramPage>;
  featured: {
    image: string; eyebrow: string; title: string; desc: string;
    stats: StatItem[];
    cta1: string; cta2: string; formTitle: string; formBtn: string;
  };
  provincesTitle: string; provincesEyebrow: string; provincesSubtitle: string;
  provinces: { region: string; list: string }[];
  about: {
    image: string; eyebrow: string; title: string; p1: string; p2: string;
    pillars: { title: string; desc: string }[]; cta: string;
  };
  newsTitle: string; newsEyebrow: string;
  news: { img: string; tag: string; tagColor: string; date: string; title: string }[];
  testimonialsTitle: string; testimonialsEyebrow: string;
  testimonials: { initials: string; name: string; place: string; quote: string }[];
  involved: {
    eyebrow: string; title: string; subtitle: string;
    cards: { icon: string; title: string; desc: string; cta: string }[];
  };
  publisher: {
    eyebrow: string; title: string;
    links: { name: string; url: string }[];
  };
  annualReports: { year: string; title: string; image: string; pdfUrl: string }[];
  jobOpportunities: { title: string; department: string; location: string; type: string; deadline: string; description: string; applyUrl: string; slug: string }[];
  jobPages: Record<string, JobPage>;
  footer: { about: string; copyright: string; newsletterTitle: string; newsletterDesc: string; newsletterBtn: string; badgesTitle: string; badges: string[] };
  social: { facebook: string; twitter: string; instagram: string; youtube: string };
};

export const defaultContent: Content = {
  brand: {
    logoText: "SF", logoImage: "", name: "SOFAR",
    tagline: "Salam Organization for Afghanistan Rehabilitation",
    phone: "+93 700 123 456", email: "info@sofar.af",
  },
  urgency: {
    a: "Urgent: Afghanistan Winter Crisis — millions need food, heating, shelter.",
    b: "Herat Earthquake: Thousands displaced. SOFAR is on the ground.",
    c: "Support women & girls in Afghanistan — education and livelihood programs.",
  },
  nav: ["Our Work", "Where We Work", "About", "News", "Get Involved", "Publications"],
  donateBtn: "Donate",
  hero: {
    image: "https://picsum.photos/seed/afghanistan-mountains/1920/1080.jpg",
    eyebrow: "Urgent Appeal",
    titleA: "Standing With", titleHighlight: "Afghanistan",
    subtitle: "Over 23 million Afghans face acute hunger and poverty. SOFAR is on the ground delivering food, shelter, healthcare, and hope to families across all 34 provinces.",
    ctaPrimary: "Get Involved", ctaSecondary: "Our Story",
    stats: [
      { value: "3", suffix: "M+", label: "People Served" },
      { value: "34", label: "Provinces Reached" },
      { value: "15", label: "Years of Service" },
    ],
  },
  impact: {
    eyebrow: "Our Impact", title: "Serving Afghanistan Since 2009",
    subtitle: "For 15 years, SOFAR has delivered life-saving aid and sustainable development programs to communities across Afghanistan.",
    stats: [
      { icon: "Users", value: "3", suffix: "M+", label: "Lives Impacted" },
      { icon: "MapPin", value: "34", label: "Provinces Covered" },
      { icon: "Droplets", value: "12K", label: "Water Wells Built" },
      { icon: "School", value: "850", label: "Schools Supported" },
    ],
  },
  appealsTitle: "Current Appeals", appealsEyebrow: "Urgent", appealsViewAll: "View All",
  appeals: [
    { id: "a1", img: "https://picsum.photos/seed/afghan-winter-snow/600/400.jpg", badge: "Urgent", badgeColor: "bg-accent-red",
      title: "Winter Emergency Appeal",
      desc: "Sub-zero temperatures threaten millions of Afghan families. We're distributing heating kits, warm clothing, blankets, and insulated shelter materials.",
      raised: "12,400 families helped", goal: "25,000 goal", percent: 50 },
    { id: "a2", img: "https://picsum.photos/seed/herat-earthquake/600/400.jpg", badge: "Critical", badgeColor: "bg-accent-orange",
      title: "Herat Earthquake Response",
      desc: "After devastating earthquakes struck Herat, thousands of homes were destroyed. We're providing temporary shelters, medical aid, and reconstruction support.",
      raised: "3,200 families helped", goal: "8,000 goal", percent: 40 },
    { id: "a3", img: "https://picsum.photos/seed/afghan-hunger/600/400.jpg", badge: "Ongoing", badgeColor: "bg-brand-600",
      title: "Afghan Hunger Crisis",
      desc: "23 million Afghans face acute food insecurity. We deliver monthly food parcels, nutrition supplements for children, and agricultural training.",
      raised: "8.5M meals delivered", goal: "15M goal", percent: 57 },
  ],
  programsTitle: "What We Do in Afghanistan", programsEyebrow: "Our Programs",
  programsSubtitle: "From emergency relief to long-term development, SOFAR works alongside Afghan communities to build resilience and hope.",
  programs: [
    { icon: "Shield", color: "red", bg: "bg-red-50", title: "Emergency Response", slug: "emergency-response", desc: "Rapid deployment of life-saving aid when disaster strikes — delivering food, shelter, and medical care." },
    { icon: "Droplets", color: "blue", bg: "bg-blue-50", title: "Water & Sanitation", slug: "water-sanitation", desc: "Constructing wells, solar-powered water systems, and latrines in rural villages." },
    { icon: "GraduationCap", color: "amber", bg: "bg-amber-50", title: "Education", slug: "education", desc: "Building schools, training teachers, and supporting community-based education." },
    { icon: "HeartPulse", color: "rose", bg: "bg-rose-50", title: "Healthcare", slug: "healthcare", desc: "Operating mobile clinics, maternal health centers, and nutrition programs." },
    { icon: "Flower2", color: "purple", bg: "bg-purple-50", title: "Women's Empowerment", slug: "womens-empowerment", desc: "Vocational training, literacy classes, and livelihood opportunities for women." },
    { icon: "Snowflake", color: "sky", bg: "bg-sky-50", title: "Winterization", slug: "winterization", desc: "Providing winter kits, heaters, coal, blankets, and weather-proofing materials." },
  ],
  programPages: {
    "emergency-response": {
      briefDesc: "When disaster strikes in Afghanistan, SOFAR's Emergency Response team deploys within hours. We deliver life-saving food, clean water, medical aid, and temporary shelter to communities affected by earthquakes, floods, conflict, and displacement.",
      heroImage: "https://picsum.photos/seed/emergency-wide/1200/500.jpg",
      blocks: [
        { layout: "left-right", desc: "Our rapid assessment teams reach affected areas within 24 hours, coordinating with local authorities to identify the most urgent needs. We pre-position emergency supplies in strategic locations across Afghanistan to ensure the fastest possible response time.", image: "https://picsum.photos/seed/emergency-block1/600/400.jpg" },
        { layout: "right-left", desc: "Each emergency kit includes fortified food rations, clean water purification tablets, hygiene supplies, warm blankets, and tarpaulins for shelter. Since 2009, we have responded to over 50 emergencies, reaching more than 500,000 people.", image: "https://picsum.photos/seed/emergency-block2/600/400.jpg" },
      ],
    },
    "water-sanitation": {
      briefDesc: "Access to clean water is a fundamental right. SOFAR constructs solar-powered water systems, deep wells, and sanitation facilities in rural Afghan villages, reducing waterborne diseases and improving community health.",
      heroImage: "https://picsum.photos/seed/water-wide/1200/500.jpg",
      blocks: [
        { layout: "left-right", desc: "Afghanistan's mountainous terrain makes water access a daily challenge for millions. SOFAR's engineering team surveys villages, drills deep wells, and installs solar-powered pumps that provide clean water year-round without ongoing fuel costs.", image: "https://picsum.photos/seed/water-block1/600/400.jpg" },
        { layout: "right-left", desc: "Beyond wells, we build community latrines, hand-washing stations, and rainwater harvesting systems. Each project includes hygiene training so communities can maintain these facilities for generations.", image: "https://picsum.photos/seed/water-block2/600/400.jpg" },
      ],
    },
    "education": {
      briefDesc: "Education is the foundation of Afghanistan's future. SOFAR builds schools, trains teachers, and supports community-based education to ensure every child — especially girls — can access quality learning.",
      heroImage: "https://picsum.photos/seed/education-wide/1200/500.jpg",
      blocks: [
        { layout: "left-right", desc: "With over 1.1 million girls denied secondary education, SOFAR runs community-based learning centers and underground schools that provide safe, continuous education. Our centers follow the national curriculum while ensuring student safety.", image: "https://picsum.photos/seed/education-block1/600/400.jpg" },
        { layout: "right-left", desc: "We train local teachers in modern pedagogy, supply school materials, and provide literacy classes for adults. Each school we build includes proper sanitation facilities and a safe learning environment for all students.", image: "https://picsum.photos/seed/education-block2/600/400.jpg" },
      ],
    },
    "healthcare": {
      briefDesc: "Quality healthcare saves lives. SOFAR operates mobile medical clinics, supports maternal health centers, and runs nutrition programs for malnourished children and mothers across rural Afghanistan.",
      heroImage: "https://picsum.photos/seed/healthcare-wide/1200/500.jpg",
      blocks: [
        { layout: "left-right", desc: "Our mobile health units travel to remote villages where medical facilities are hours away. Each unit is staffed by a doctor, nurse, and midwife, providing primary care, vaccinations, and maternal health services.", image: "https://picsum.photos/seed/healthcare-block1/600/400.jpg" },
        { layout: "right-left", desc: "Malnutrition affects millions of Afghan children. Our nutrition centers provide therapeutic feeding, monitor child growth, and educate mothers on proper nutrition practices using locally available foods.", image: "https://picsum.photos/seed/healthcare-block2/600/400.jpg" },
      ],
    },
    "womens-empowerment": {
      briefDesc: "SOFAR empowers Afghan women through vocational training, literacy programs, and livelihood opportunities. When women thrive, entire communities benefit.",
      heroImage: "https://picsum.photos/seed/women-wide/1200/500.jpg",
      blocks: [
        { layout: "left-right", desc: "Our women's centers offer vocational training in tailoring, embroidery, carpet weaving, and food processing. Women gain marketable skills that allow them to generate income and support their families with dignity.", image: "https://picsum.photos/seed/women-block1/600/400.jpg" },
        { layout: "right-left", desc: "Literacy is a powerful tool. Our classes teach women to read and write in Dari and Pashto, opening doors to greater participation in community life, better healthcare decisions, and helping their children with schoolwork.", image: "https://picsum.photos/seed/women-block2/600/400.jpg" },
      ],
    },
    "winterization": {
      briefDesc: "Afghan winters are brutal, with temperatures dropping to -30°C in the central highlands. SOFAR's Winterization program provides heating, warm clothing, and weather-proof shelter to vulnerable families.",
      heroImage: "https://picsum.photos/seed/winter-wide/1200/500.jpg",
      blocks: [
        { layout: "left-right", desc: "Each winter kit contains a coal-burning heater, warm blankets for every family member, thick winter clothing, and basic food supplies. We prioritize elderly-headed households, families with young children, and displaced communities living in tents.", image: "https://picsum.photos/seed/winter-block1/600/400.jpg" },
        { layout: "right-left", desc: "Our teams distribute heaters and coal to remote mountain villages before winter roads become impassable. We also repair damaged shelters, provide insulation materials, and ensure families have what they need to survive the harsh months.", image: "https://picsum.photos/seed/winter-block2/600/400.jpg" },
      ],
    },
  },
  featured: {
    image: "https://picsum.photos/seed/afghan-girl-school/1920/800.jpg",
    eyebrow: "Featured Program", title: "Girls' Education Initiative",
    desc: "Over 1.1 million girls in Afghanistan are barred from secondary education. SOFAR runs community-based education centers, underground schools, and remote learning programs to ensure their right to learn is not lost.",
    stats: [
      { value: "45K", suffix: "+", label: "Girls Enrolled" },
      { value: "280", label: "Learning Centers" },
      { value: "1.2K", label: "Teachers Trained" },
    ],
    cta1: "Support This Program", cta2: "How It Works",
    formTitle: "Send a Message of Support", formBtn: "Submit",
  },
  provincesTitle: "Where We Work", provincesEyebrow: "Nationwide Presence",
  provincesSubtitle: "SOFAR operates across all 34 provinces of Afghanistan.",
  provinces: [
    { region: "Central", list: "Kabul, Parwan, Panjshir, Wardak" },
    { region: "Western", list: "Herat, Badghis, Farah, Ghor" },
    { region: "Northern", list: "Balkh, Samangan, Kunduz, Takhar" },
    { region: "Southern", list: "Kandahar, Helmand, Zabul, Uruzgan" },
  ],
  about: {
    image: "https://picsum.photos/seed/afghan-team-working/600/500.jpg",
    eyebrow: "About Us", title: "Who Is SOFAR?",
    p1: "SOFAR — Salam Organization for Afghanistan Rehabilitation — is an Afghan-led humanitarian and development organization dedicated to serving the people of Afghanistan since 2009.",
    p2: "Born from the belief that Afghans themselves are best positioned to address their community needs, SOFAR combines local knowledge with international standards to deliver impactful programs across all 34 provinces.",
    pillars: [
      { title: "Afghan-Led", desc: "Local team, local knowledge" },
      { title: "Transparent", desc: "Fully audited programs" },
      { title: "Community-Driven", desc: "Designed with communities" },
      { title: "Accountable", desc: "Regular impact reporting" },
    ],
    cta: "Read Our Full Story",
  },
  newsTitle: "Latest from Afghanistan", newsEyebrow: "Stay Updated",
  news: [
    { img: "https://picsum.photos/seed/afghan-winter-relief/400/300.jpg", tag: "Urgent", tagColor: "bg-accent-red", date: "Jan 15, 2025 • 3 min", title: "SOFAR Distributes Winter Kits to 5,000 Families in Central Highlands" },
    { img: "https://picsum.photos/seed/afghan-water-well-project/400/300.jpg", tag: "Impact", tagColor: "bg-blue-500", date: "Jan 12, 2025 • 4 min", title: "200 New Solar-Powered Water Systems Installed in Badghis Province" },
    { img: "https://picsum.photos/seed/afghan-women-training/400/300.jpg", tag: "Story", tagColor: "bg-purple-500", date: "Jan 10, 2025 • 5 min", title: "From Tailoring Class to Business Owner: Zubaida's Journey" },
    { img: "https://picsum.photos/seed/afghan-herat-rebuild/400/300.jpg", tag: "Report", tagColor: "bg-amber-500", date: "Jan 8, 2025 • 6 min", title: "Herat Reconstruction: 1,500 Homes Completed for Families" },
  ],
  testimonialsTitle: "Stories of Impact", testimonialsEyebrow: "Voices from Afghanistan",
  testimonials: [
    { initials: "FA", name: "Fatima Ahmadi", place: "Herat Province", quote: "When the earthquake destroyed our home in Herat, SOFAR was the first to reach us. They gave us a warm tent, food, and hope." },
    { initials: "RN", name: "Rahima Noori", place: "Ghor Province", quote: "I never learned to read — but now, at 35, SOFAR's literacy class changed my life. I can read the Quran and help my children." },
    { initials: "HM", name: "Hamid Mohammadi", place: "Kabul Province", quote: "As a volunteer teacher with SOFAR, I see the transformation in these children every day. They are eager to learn." },
  ],
  involved: {
    eyebrow: "Take Action", title: "Get Involved",
    subtitle: "Every contribution helps Afghan families rebuild their lives. Choose how you'd like to make a difference.",
    cards: [
      { icon: "HandHelping", title: "Donate", desc: "Fund emergency relief and long-term programs.", cta: "Give Now" },
      { icon: "Users", title: "Volunteer", desc: "Join our team in Afghanistan or remotely.", cta: "Contact Us" },
      { icon: "Package", title: "Send Supplies", desc: "Contribute medical supplies and winter clothing.", cta: "Learn How" },
    ],
  },
  publisher: {
    eyebrow: "Publications", title: "Publications",
    links: [
      { name: "Annual Report", url: "/publications/annual-reports" },
      { name: "Job Opportunities", url: "/publications/job-opportunities" },
      { name: "Request for Proposal (RFP)", url: "#" },
      { name: "Request for Quotation (RFQ)", url: "#" },
    ],
  },
  annualReports: [
    { year: "2025", title: "SOFAR Annual Report 2025 — Resilience in Action", image: "https://picsum.photos/seed/ar-2025/600/400.jpg", pdfUrl: "#" },
    { year: "2024", title: "SOFAR Annual Report 2024 — Building Hope", image: "https://picsum.photos/seed/ar-2024/600/400.jpg", pdfUrl: "#" },
    { year: "2023", title: "SOFAR Annual Report 2023 — Serving Communities", image: "https://picsum.photos/seed/ar-2023/600/400.jpg", pdfUrl: "#" },
    { year: "2022", title: "SOFAR Annual Report 2022 — Strength in Unity", image: "https://picsum.photos/seed/ar-2022/600/400.jpg", pdfUrl: "#" },
    { year: "2021", title: "SOFAR Annual Report 2021 — Foundations of Change", image: "https://picsum.photos/seed/ar-2021/600/400.jpg", pdfUrl: "#" },
    { year: "2020", title: "SOFAR Annual Report 2020 — Responding Together", image: "https://picsum.photos/seed/ar-2020/600/400.jpg", pdfUrl: "#" },
  ],
  jobOpportunities: [
    { title: "Program Manager — Emergency Response", department: "Programs", location: "Kabul, Afghanistan", type: "Full-time", deadline: "June 30, 2026", description: "Lead SOFAR's emergency response team in coordinating rapid relief operations across Afghanistan. Manage field staff, logistics, and partner coordination.", applyUrl: "#", slug: "program-manager-emergency-response" },
    { title: "Finance Officer", department: "Finance", location: "Herat, Afghanistan", type: "Full-time", deadline: "June 15, 2026", description: "Manage financial transactions, budgeting, and reporting for SOFAR's programs in western Afghanistan.", applyUrl: "#", slug: "finance-officer" },
    { title: "Monitoring & Evaluation Coordinator", department: "Programs", location: "Kabul, Afghanistan", type: "Full-time", deadline: "July 10, 2026", description: "Design and implement M&E frameworks for SOFAR's humanitarian and development programs.", applyUrl: "#", slug: "monitoring-evaluation-coordinator" },
    { title: "Water & Sanitation Engineer", department: "Programs", location: "Balkh, Afghanistan", type: "Contract", deadline: "July 5, 2026", description: "Design and supervise construction of solar-powered water systems, wells, and sanitation facilities.", applyUrl: "#", slug: "water-sanitation-engineer" },
    { title: "Communications Officer", department: "Communications", location: "Kabul, Afghanistan", type: "Full-time", deadline: "June 20, 2026", description: "Produce compelling content about SOFAR's work including success stories, press releases, and social media content.", applyUrl: "#", slug: "communications-officer" },
    { title: "Teacher Trainer — Girls' Education", department: "Education", location: "Multiple Provinces", type: "Full-time", deadline: "August 1, 2026", description: "Train community teachers in modern pedagogy, curriculum delivery, and classroom management.", applyUrl: "#", slug: "teacher-trainer-girls-education" },
  ],
  jobPages: {},
  footer: {
    about: "Afghan-led humanitarian organization serving communities across all 34 provinces since 2009.",
    copyright: "© 2025 SOFAR — Salam Organization for Afghanistan Rehabilitation. All rights reserved.",
    newsletterTitle: "Newsletter", newsletterDesc: "Get updates on our programs and impact in Afghanistan.",
    newsletterBtn: "Subscribe", badgesTitle: "Trusted & Accountable",
    badges: ["ACBAR Member", "CHS Verified", "UN OCHA Partner", "Audited Annually"],
  },
  social: { facebook: "#", twitter: "#", instagram: "#", youtube: "#" },
};

// Deep get/set by dot path with [index]
function getByPath(obj: any, path: string): any {
  const parts = path.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
  return parts.reduce((o, k) => (o == null ? o : o[k]), obj);
}
function setByPath(obj: any, path: string, value: any): any {
  const parts = path.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  let cur: any = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i];
    const next = cur[k];
    cur[k] = Array.isArray(next) ? [...next] : { ...(next || {}) };
    cur = cur[k];
  }
  cur[parts[parts.length - 1]] = value;
  return clone;
}

type Ctx = {
  content: Content;
  isAdmin: boolean;
  editMode: boolean;
  login: (pw: string) => boolean;
  logout: () => void;
  setEditMode: (v: boolean) => void;
  get: (path: string) => any;
  update: (path: string, value: any) => void;
  addAppeal: () => void;
  removeAppeal: (id: string) => void;
  addProgram: () => void;
  removeProgram: (idx: number) => void;
  addProgramBlock: (slug: string) => void;
  removeProgramBlock: (slug: string, idx: number) => void;
  addProvince: () => void;
  removeProvince: (idx: number) => void;
  addPillar: () => void;
  removePillar: (idx: number) => void;
  addNews: () => void;
  removeNews: (idx: number) => void;
  addInvolvedCard: () => void;
  removeInvolvedCard: (idx: number) => void;
  addPublisherLink: () => void;
  removePublisherLink: (idx: number) => void;
  addAnnualReport: () => void;
  removeAnnualReport: (idx: number) => void;
  addJobOpportunity: () => void;
  removeJobOpportunity: (idx: number) => void;
  reset: () => void;
};

const CmsCtx = createContext<Ctx | null>(null);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Content>(defaultContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw);
        const nav = defaultContent.nav.map((n, i) => stored.nav?.[i] || n);
        const programs = defaultContent.programs.map((def, i) => ({ ...def, ...(stored.programs?.[i] || {}) }));
        const programPages = { ...defaultContent.programPages, ...(stored.programPages || {}) };
        const storedJobs = stored.jobOpportunities || [];
        const jobOpportunities = defaultContent.jobOpportunities.map((def, i) => ({ ...def, ...(storedJobs[i] || {}) }));
        for (let i = defaultContent.jobOpportunities.length; i < storedJobs.length; i++) {
          jobOpportunities.push(storedJobs[i]);
        }
        const jobPages = { ...defaultContent.jobPages, ...(stored.jobPages || {}) };
        const merged = { ...defaultContent, ...stored, nav, programs, programPages, jobOpportunities, jobPages };
        setContent(merged);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      }
      if (localStorage.getItem(ADMIN_KEY) === "1") setIsAdmin(true);
    } catch {}
  }, []);

  const persist = (c: Content) => {
    setContent(c);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); } catch {}
  };

  const login = (pw: string) => {
    if (pw === ADMIN_PASSWORD) {
      setIsAdmin(true);
      try { localStorage.setItem(ADMIN_KEY, "1"); } catch {}
      return true;
    }
    return false;
  };
  const logout = () => {
    setIsAdmin(false); setEditMode(false);
    try { localStorage.removeItem(ADMIN_KEY); } catch {}
  };

  const update = useCallback((path: string, value: any) => {
    setContent(prev => {
      const next = setByPath(prev, path, value);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const get = useCallback((path: string) => getByPath(content, path), [content]);

  const addAppeal = () => {
    const newAppeal: Appeal = {
      id: "a" + Date.now(),
      img: "https://picsum.photos/seed/new-appeal-" + Date.now() + "/600/400.jpg",
      badge: "New", badgeColor: "bg-brand-600",
      title: "New Appeal Title", desc: "Describe this appeal and the impact donations will make.",
      raised: "0 families helped", goal: "1,000 goal", percent: 0,
    };
    persist({ ...content, appeals: [...content.appeals, newAppeal] });
  };
  const removeAppeal = (id: string) => {
    persist({ ...content, appeals: content.appeals.filter(a => a.id !== id) });
  };
  const addProgram = () => {
    const idx = content.programs.length;
    const slug = "program-" + Date.now();
    const newProgram = {
      icon: "Shield", color: "brand", bg: "bg-brand-50", title: "New Program", slug,
      desc: "Describe this program and the work it does in Afghan communities.",
    };
    const newPage: ProgramPage = {
      briefDesc: "Brief description of this program.",
      heroImage: "https://picsum.photos/seed/program-hero-" + Date.now() + "/1200/500.jpg",
      blocks: [
        { layout: "left-right", desc: "Edit this text to describe the first aspect of this program.", image: "https://picsum.photos/seed/program-block1-" + Date.now() + "/600/400.jpg" },
        { layout: "right-left", desc: "Edit this text to describe another aspect of this program.", image: "https://picsum.photos/seed/program-block2-" + Date.now() + "/600/400.jpg" },
      ],
    };
    persist({ ...content, programs: [...content.programs, newProgram], programPages: { ...content.programPages, [slug]: newPage } });
  };
  const removeProgram = (idx: number) => {
    const p = content.programs[idx];
    if (!p) return;
    const { [p.slug]: _, ...rest } = content.programPages;
    persist({ ...content, programs: content.programs.filter((_, i) => i !== idx), programPages: rest });
  };
  const addProgramBlock = (slug: string) => {
    const page = content.programPages[slug];
    if (!page) return;
    const newBlock: ProgramBlock = {
      layout: page.blocks.length % 2 === 0 ? "left-right" : "right-left",
      desc: "New content section. Edit this text to describe the program's work in this area.",
      image: "https://picsum.photos/seed/block-" + Date.now() + "/600/400.jpg",
    };
    persist({ ...content, programPages: { ...content.programPages, [slug]: { ...page, blocks: [...page.blocks, newBlock] } } });
  };
  const removeProgramBlock = (slug: string, idx: number) => {
    const page = content.programPages[slug];
    if (!page) return;
    persist({ ...content, programPages: { ...content.programPages, [slug]: { ...page, blocks: page.blocks.filter((_, i) => i !== idx) } } });
  };
  const addProvince = () => {
    persist({ ...content, provinces: [...content.provinces, { region: "New Region", list: "Province 1, Province 2" }] });
  };
  const removeProvince = (idx: number) => {
    persist({ ...content, provinces: content.provinces.filter((_, i) => i !== idx) });
  };
  const addPillar = () => {
    persist({ ...content, about: { ...content.about, pillars: [...content.about.pillars, { title: "New Pillar", desc: "Description of this pillar." }] } });
  };
  const removePillar = (idx: number) => {
    persist({ ...content, about: { ...content.about, pillars: content.about.pillars.filter((_, i) => i !== idx) } });
  };
  const addNews = () => {
    persist({ ...content, news: [...content.news, { img: "https://picsum.photos/seed/news-" + Date.now() + "/400/300.jpg", tag: "New", tagColor: "bg-brand-600", date: "Jan 1, 2025", title: "New Story Title" }] });
  };
  const removeNews = (idx: number) => {
    persist({ ...content, news: content.news.filter((_, i) => i !== idx) });
  };
  const addInvolvedCard = () => {
    persist({ ...content, involved: { ...content.involved, cards: [...content.involved.cards, { icon: "HandHelping", title: "New Way to Help", desc: "Describe this opportunity.", cta: "Learn More" }] } });
  };
  const removeInvolvedCard = (idx: number) => {
    persist({ ...content, involved: { ...content.involved, cards: content.involved.cards.filter((_, i) => i !== idx) } });
  };
  const addPublisherLink = () => {
    persist({ ...content, publisher: { ...content.publisher, links: [...content.publisher.links, { name: "New Link", url: "#" }] } });
  };
  const removePublisherLink = (idx: number) => {
    persist({ ...content, publisher: { ...content.publisher, links: content.publisher.links.filter((_, i) => i !== idx) } });
  };
  const addAnnualReport = () => {
    persist({ ...content, annualReports: [...content.annualReports, { year: String(new Date().getFullYear()), title: "New Annual Report", image: "https://picsum.photos/seed/ar-new/600/400.jpg", pdfUrl: "#" }] });
  };
  const removeAnnualReport = (idx: number) => {
    persist({ ...content, annualReports: content.annualReports.filter((_, i) => i !== idx) });
  };
  const addJobOpportunity = () => {
    const slug = "job-" + Date.now();
    const newJob = { title: "New Position", department: "Department", location: "Location", type: "Full-time", deadline: "Date", description: "Job description here.", applyUrl: "#", slug };
    const defaultJobPage: JobPage = {
      organization: "SOFAR", education: "", gender: "", about: "", responsibilities: "",
      reqQualifications: "", submissionGuidelines: "", publishDate: "", referenceNumber: "",
      numberOfVacancies: "1", announcementType: "New Announcement", salaryRange: "Negotiable",
      experienceRequired: "", probationaryPeriod: "", contractType: "Permanent",
      contractDuration: "", contractExtension: "Yes", languages: "", functionalArea: "",
      nationality: "Afghan", travelRequired: "No",
    };
    persist({ ...content, jobOpportunities: [...content.jobOpportunities, newJob], jobPages: { ...content.jobPages, [slug]: defaultJobPage } });
  };
  const removeJobOpportunity = (idx: number) => {
    const job = content.jobOpportunities[idx];
    if (!job) return;
    const { [job.slug]: _, ...rest } = content.jobPages;
    persist({ ...content, jobOpportunities: content.jobOpportunities.filter((_, i) => i !== idx), jobPages: rest });
  };
  const reset = () => {
    persist(defaultContent);
  };

  return (
    <CmsCtx.Provider value={{ content, isAdmin, editMode, login, logout, setEditMode, get, update, addAppeal, removeAppeal, addProgram, removeProgram, addProgramBlock, removeProgramBlock, addProvince, removeProvince, addPillar, removePillar, addNews, removeNews, addInvolvedCard, removeInvolvedCard, addPublisherLink, removePublisherLink, addAnnualReport, removeAnnualReport, addJobOpportunity, removeJobOpportunity, reset }}>
      {children}
    </CmsCtx.Provider>
  );
}

export function useCms() {
  const c = useContext(CmsCtx);
  if (!c) throw new Error("useCms must be used inside CmsProvider");
  return c;
}
