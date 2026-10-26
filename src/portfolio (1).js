import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =====================================================================
   EDIT THIS SECTION ONLY — all text and contact details live here.
   ===================================================================== */
const PROFILE = {
  name: "Moazam Mustafa",
  firstLine: "Moazam",
  secondLine: "Mustafa",
  title: "Social Media Manager",
  intro:
    "I plan, schedule and manage social media content, and I keep office data and records clean and organised.",
  about: [
    "I have studied FA with Information Technology and work in digital marketing and social media management.",
    "I also have hands-on experience in data entry and office management, so I am comfortable with both creative content work and careful, detail-focused admin work.",
  ],
  languages: [
    { name: "English", note: "Written & spoken" },
    { name: "Urdu", note: "Written & spoken" },
  ],
};

// Replace these. WhatsApp/phone buttons only appear when you fill them in.
const CONTACT = {
  email: "moazzimali388@gmai.com", // <- replace
  phone: "+923215959388",
  whatsapp: "+923215959388",
  location: "Faislabad, Pakistan",
};

const SKILL_GROUPS = [
  // {
  //   title: "Digital marketing",
  //   items: [
  //     "Social media marketing",
  //     "Content planning & scheduling",
  //     "Caption & post writing",
  //     "Facebook & Instagram pages",
  //     "Audience engagement",
  //     "Basic ad campaign support",
  //   ],
  // },
  {
    title: "Social media management",
    items: [
      "Page setup & profile optimisation",
      "Meta Business Suite",
      "Posting calendars",
      "Comment & message handling",
      "Basic Canva designs",
      "Simple performance reports",
    ],
  },
  {
    title: "Office & data",
    items: [
      "Data entry (fast & accurate)",
      "MS Word, Excel & PowerPoint",
      "Record keeping & filing",
      "Email & document handling",
      "Scheduling & coordination",
      "Basic IT / computer skills",
    ],
  },
];

const SERVICES = [
  {
    title: "Social media management",
    text: "Regular posting, a clear content calendar and replies to your audience, handled for you.",
  },
  {
    title: "Data entry",
    text: "Typing, spreadsheets and database entry done carefully and delivered on time.",
  },
];

const EXPERIENCE = [
  {
    role: "Data Entry",
    points: [
      "Entered and updated records in spreadsheets and documents.",
      "Checked entries for accuracy before submitting.",
    ],
  },
  {
    role: "Office Management",
    points: [
      "Handled day-to-day office tasks, files and paperwork.",
      "Helped keep schedules and records organised.",
    ],
  },
];

const EDUCATION = [
  {
    role: "FA — Information Technology",
    points: ["Intermediate studies with a focus on IT and computer skills."],
  },
];

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const WEEK = [
  { d: "Mon", t: "Post", c: "blue" },
  { d: "Tue", t: "Reel", c: "pink" },
  { d: "Wed", t: "Story", c: "yellow" },
  { d: "Thu", t: "Post", c: "blue" },
  { d: "Fri", t: "Reel", c: "pink" },
  { d: "Sat", t: "Story", c: "yellow" },
  { d: "Sun", t: "Report", c: "ink" },
];

/* ===================================================================== */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:wght@400;500;700&display=swap');

.pf {
  --paper: #f2f5ff;
  --card: #ffffff;
  --ink: #15183d;
  --muted: #555a85;
  --blue: #3a4bff;
  --pink: #ff5c8a;
  --yellow: #ffd84d;
  --line: #d9def5;
  font-family: 'DM Sans', system-ui, sans-serif;
  color: var(--ink);
  background: var(--paper);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
  min-width: 320px;
}
.pf *, .pf *::before, .pf *::after { box-sizing: border-box; }
.pf h1, .pf h2, .pf h3 {
  font-family: 'Bricolage Grotesque', 'DM Sans', sans-serif;
  line-height: 1.02;
  margin: 0;
  letter-spacing: -0.02em;
}
.pf p { margin: 0; }
.pf a { color: inherit; }
.pf ul { margin: 0; padding: 0; list-style: none; }
.pf :focus-visible { outline: 3px solid var(--blue); outline-offset: 3px; border-radius: 6px; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

.pf-wrap { width: min(1120px, 100% - clamp(32px, 6vw, 80px)); margin-inline: auto; }
.pf-hero-grid > *, .pf-about > *, .pf-exp > *, .pf-skills > *, .pf-services > * { min-width: 0; }
.pf-section { padding-block: clamp(64px, 10vw, 96px); }
.pf-section { scroll-margin-top: 60px; }
.pf-section-title { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; margin-bottom: 40px; max-width: 14ch; }

/* NAV */
.pf-nav { position: sticky; top: 0; z-index: 50; background: linear-gradient(110deg, rgba(255,255,255,.96), rgba(245,247,255,.92) 58%, rgba(238,241,255,.94)); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(58,75,255,.12); box-shadow: 0 8px 28px rgba(21,24,61,.07); }
.pf-nav-in { display: flex; align-items: center; justify-content: space-between; height: 68px; }
.pf-logo { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.15rem; text-decoration: none; color: var(--ink); }
.pf-logo span { color: var(--blue); }
.pf-links { display: flex; align-items: center; gap: 28px; }
.pf-links a { text-decoration: none; font-weight: 500; font-size: .95rem; color: var(--muted); transition: color .2s, background .2s; }
.pf-links a:hover { color: var(--blue); }
.pf-links a.pf-cta { color: #fff; background: linear-gradient(135deg, #3a4bff, #626dff); padding: 10px 20px; border-radius: 999px; font-weight: 700; box-shadow: 0 6px 16px rgba(58,75,255,.22); }
.pf-links a.pf-cta:hover { background: linear-gradient(135deg, #2d3de5, #515de8); color: #fff; }
.pf-burger { display: none; min-height: 44px; min-width: 44px; background: rgba(58,75,255,.06); border: 1px solid rgba(58,75,255,.2); border-radius: 10px; padding: 8px 14px; font: inherit; font-weight: 700; color: var(--ink); cursor: pointer; }

/* HERO */
.pf-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 72px 0 96px;
  color: #fff;
  background:
    radial-gradient(ellipse at 82% 16%, rgba(92, 105, 255, .34), transparent 34%),
    radial-gradient(ellipse at 12% 100%, rgba(58, 75, 255, .2), transparent 38%),
    linear-gradient(125deg, #10132f 0%, #1c2050 54%, #15183d 100%);
}
.pf-hero::before {
  content: "";
  position: absolute;
  z-index: -1;
  width: 360px;
  height: 360px;
  top: -210px;
  left: 42%;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 50%;
  box-shadow: 0 0 0 42px rgba(255, 255, 255, .025), 0 0 0 84px rgba(255, 255, 255, .02);
  pointer-events: none;
}
.pf-hero-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 56px; align-items: center; }
.pf-role { display: inline-block; background: rgba(255, 216, 77, .12); border: 1px solid rgba(255, 216, 77, .42); color: #ffe58b; font-weight: 700; padding: 6px 14px; border-radius: 999px; font-size: .92rem; margin-bottom: 24px; }
.pf-name { font-size: clamp(2.9rem, 11.5vw, 7.4rem); font-weight: 800; }
.pf-line { display: block; overflow: hidden; padding-bottom: .08em; }
.pf-line-in { display: block; }
.pf-line:nth-child(2) .pf-line-in { color: #aeb6ff; }
.pf-intro { font-size: clamp(1.05rem, 2.6vw, 1.2rem); color: rgba(237, 239, 255, .78); max-width: 46ch; margin: 28px 0 36px; }
.pf-btns { display: flex; flex-wrap: wrap; gap: 14px; }
.pf-btn { display: inline-flex; align-items: center; justify-content: center; font-weight: 700; text-decoration: none; padding: 15px 28px; border-radius: 999px; border: 2px solid var(--ink); transition: transform .2s, background .2s, color .2s; }
.pf-btn:hover { transform: translateY(-3px); }
.pf-btn.primary { background: var(--blue); border-color: var(--blue); color: #fff; }
.pf-btn.primary:hover { background: var(--ink); border-color: var(--ink); }
.pf-hero .pf-btn.ghost { background: rgba(255, 255, 255, .04); border-color: rgba(255, 255, 255, .55); color: #fff; }
.pf-hero .pf-btn.ghost:hover { background: #fff; border-color: #fff; color: var(--ink); }

.pf-week { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.pf-tile { aspect-ratio: 1; border-radius: 22px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; font-weight: 700; }
.pf-tile small { font-weight: 500; opacity: .75; font-size: .8rem; }
.pf-tile strong { font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.25rem; }
.pf-tile.blue { background: var(--blue); color: #fff; }
.pf-tile.pink { background: var(--pink); color: #fff; }
.pf-tile.yellow { background: var(--yellow); color: var(--ink); }
.pf-tile.ink { background: var(--ink); color: #fff; }
.pf-tile.label { background: var(--card); color: var(--ink); border: 1.5px solid var(--line); font-weight: 500; font-size: .92rem; justify-content: center; }
.pf-tile.label strong { display: block; margin-bottom: 4px; }

/* ABOUT */
.pf-about { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }
.pf-about p { font-size: clamp(1.02rem, 2.4vw, 1.15rem); color: var(--muted); margin-bottom: 18px; max-width: 56ch; }
.pf-lang { background: var(--card); border: 1.5px solid var(--line); border-radius: 24px; padding: clamp(22px, 4vw, 28px); align-self: start; }
.pf-lang h3 { font-size: 1.4rem; margin-bottom: 18px; }
.pf-lang li { display: flex; justify-content: space-between; gap: 12px; padding: 14px 0; border-top: 1px solid var(--line); font-weight: 500; }
.pf-lang li span:last-child { color: var(--muted); font-weight: 400; }

/* SKILLS */
.pf-skills { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.pf-skill-box { background: var(--card); border: 1.5px solid var(--line); border-radius: 24px; padding: clamp(22px, 4vw, 28px); }
.pf-skill-box h3 { font-size: 1.35rem; margin-bottom: 18px; }
.pf-skill-box li { padding: 9px 0 9px 22px; position: relative; color: var(--muted); }
.pf-skill-box li::before { content: ""; position: absolute; left: 0; top: 18px; width: 9px; height: 9px; border-radius: 50%; background: var(--pink); }
.pf-skill-box:nth-child(2) li::before { background: var(--blue); }
.pf-skill-box:nth-child(3) li::before { background: var(--yellow); }

/* SERVICES */
.pf-services { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.pf-service { background: var(--ink); color: #fff; border-radius: 24px; padding: clamp(24px, 4vw, 32px); transition: transform .25s, background .25s; }
.pf-service:hover { transform: translateY(-4px); background: var(--blue); }
.pf-service h3 { font-size: 1.5rem; margin-bottom: 12px; }
.pf-service p { color: rgba(255,255,255,.8); max-width: 40ch; }

/* EXPERIENCE */
.pf-exp { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }
.pf-exp h3.pf-col { font-size: 1.5rem; margin-bottom: 24px; }
.pf-track { border-left: 3px solid var(--line); padding-left: 28px; display: grid; gap: 32px; }
.pf-entry { position: relative; }
.pf-entry::before { content: ""; position: absolute; left: -38px; top: 6px; width: 15px; height: 15px; border-radius: 50%; background: var(--blue); border: 3px solid var(--paper); }
.pf-entry h4 { font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.25rem; margin: 0 0 8px; }
.pf-entry li { color: var(--muted); padding: 3px 0; }
.pf-hint { font-size: .85rem; color: var(--muted); font-style: italic; margin-top: 8px; }

/* CONTACT */
.pf-contact { background: var(--blue); color: #fff; border-radius: clamp(24px, 4vw, 32px); padding: clamp(36px, 7vw, 64px) clamp(22px, 5vw, 48px); }
.pf-contact h2 { font-size: clamp(2.2rem, 6vw, 4rem); font-weight: 800; max-width: 12ch; margin-bottom: 20px; }
.pf-contact p { max-width: 46ch; margin-bottom: 32px; color: rgba(255,255,255,.9); font-size: 1.1rem; }
.pf-contact .pf-btn { border-color: #fff; }
.pf-contact .pf-btn.primary { background: #fff; color: var(--ink); }
.pf-contact .pf-btn.primary:hover { background: var(--yellow); border-color: var(--yellow); }
.pf-contact .pf-btn.ghost { color: #fff; }
.pf-contact .pf-btn.ghost:hover { background: #fff; color: var(--ink); }
.pf-contact small { display: block; margin-top: 28px; opacity: .85; overflow-wrap: anywhere; }

/* FOOTER */
.pf-footer { padding: 36px 0 44px; color: var(--muted); font-size: .92rem; }
.pf-footer-in { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; border-top: 1px solid var(--line); padding-top: 24px; }

/* RESPONSIVE */
@media (max-width: 1024px) {
  .pf-hero-grid { gap: 40px; }
  .pf-about, .pf-exp { gap: 40px; }
  .pf-skills { gap: 16px; }
  .pf-skill-box, .pf-lang { border-radius: 20px; }
}
@media (max-width: 900px) {
  .pf-hero { padding: 48px 0 72px; }
  .pf-hero-grid, .pf-about, .pf-exp { grid-template-columns: 1fr; }
  .pf-week { max-width: 520px; width: 100%; }
  .pf-skills { grid-template-columns: 1fr; }
  .pf-section-title { max-width: none; margin-bottom: 28px; }
  .pf-burger { display: block; }
  .pf-links { display: none; position: absolute; top: 68px; left: 0; right: 0; flex-direction: column; align-items: stretch; gap: 0; background: rgba(248,249,255,.98); border-bottom: 1px solid rgba(58,75,255,.12); padding: 8px clamp(16px, 6vw, 40px) 20px; box-shadow: 0 18px 30px rgba(21,24,61,.12); }
  .pf-links.open { display: flex; }
  .pf-links a { padding: 14px 0; font-size: 1.05rem; border-bottom: 1px solid rgba(21,24,61,.08); }
  .pf-links a.pf-cta { text-align: center; margin-top: 14px; border-bottom: 0; padding: 14px 20px; }
}
@media (max-width: 600px) {
  .pf-nav-in { height: 60px; }
  .pf-links { top: 60px; }
  .pf-hero { padding: 36px 0 56px; }
  .pf-role { font-size: .85rem; margin-bottom: 18px; }
  .pf-intro { margin: 20px 0 28px; }
  .pf-btns { flex-direction: column; }
  .pf-btn { width: 100%; padding: 15px 20px; }
  .pf-week { gap: 8px; max-width: none; }
  .pf-tile { border-radius: 16px; padding: 10px; }
  .pf-tile strong { font-size: 1rem; }
  .pf-tile small { font-size: .72rem; }
  .pf-tile.label { font-size: .75rem; }
  .pf-services { grid-template-columns: 1fr; gap: 14px; }
  .pf-lang li { flex-direction: column; gap: 2px; }
  .pf-track { padding-left: 22px; gap: 26px; }
  .pf-entry::before { left: -32px; }
  .pf-footer-in { flex-direction: column; }
}
@media (max-width: 360px) {
  .pf-name { font-size: 2.7rem; }
  .pf-tile strong { font-size: .92rem; }
  .pf-tile { padding: 8px; }
}
@media (hover: none) {
  .pf-service:hover, .pf-btn:hover { transform: none; }
}
`;

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="pf-nav">
      <div className="pf-wrap pf-nav-in">
        <a className="pf-logo" href="#top" aria-label={`${PROFILE.name} — home`}>
          Moazam<span>.</span>
        </a>
        <button
          className="pf-burger"
          aria-expanded={open}
          aria-controls="pf-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="pf-menu" className={`pf-links${open ? " open" : ""}`} aria-label="Main">
          {NAV.slice(0, -1).map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a className="pf-cta" href="#contact" onClick={() => setOpen(false)}>
            Contact me
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pf-hero" id="top">
      <div className="pf-wrap pf-hero-grid">
        <div>
          <span className="pf-role pf-fade">{PROFILE.title}</span>
          <h1 className="pf-name" aria-label={PROFILE.name}>
            <span className="pf-line" aria-hidden="true">
              <span className="pf-line-in">{PROFILE.firstLine}</span>
            </span>
            <span className="pf-line" aria-hidden="true">
              <span className="pf-line-in">{PROFILE.secondLine}</span>
            </span>
          </h1>
          <p className="pf-intro pf-fade">{PROFILE.intro}</p>
          <div className="pf-btns pf-fade">
            <a className="pf-btn primary" href="#contact">
              Work with me
            </a>
            <a className="pf-btn ghost" href="#skills">
              See my skills
            </a>
          </div>
        </div>

        <div className="pf-week" aria-hidden="true">
          {WEEK.map((w) => (
            <div key={w.d} className={`pf-tile ${w.c}`}>
              <small>{w.d}</small>
              <strong>{w.t}</strong>
            </div>
          ))}
          <div className="pf-tile label">
            <strong>Content week</strong>
            Planned & scheduled
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="pf-section" id="about">
      <div className="pf-wrap">
        <h2 className="pf-section-title reveal">About me</h2>
        <div className="pf-about">
          <div className="reveal">
            {PROFILE.about.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <div className="pf-lang reveal">
            <h3>Languages</h3>
            <ul>
              {PROFILE.languages.map((l) => (
                <li key={l.name}>
                  <span>{l.name}</span>
                  <span>{l.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="pf-section" id="skills">
      <div className="pf-wrap">
        <h2 className="pf-section-title reveal">What I am good at</h2>
        <div className="pf-skills">
          {SKILL_GROUPS.map((g) => (
            <div className="pf-skill-box reveal" key={g.title}>
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="pf-section" id="services">
      <div className="pf-wrap">
        <h2 className="pf-section-title reveal">How I can help</h2>
        <div className="pf-services">
          {SERVICES.map((s) => (
            <article className="pf-service reveal" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Track({ items, hint }) {
  return (
    <div className="pf-track">
      {items.map((e) => (
        <div className="pf-entry" key={e.role}>
          <h4>{e.role}</h4>
          <ul>
            {e.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          {hint && <p className="pf-hint">{hint}</p>}
        </div>
      ))}
    </div>
  );
}

function Experience() {
  return (
    <section className="pf-section" id="experience">
      <div className="pf-wrap">
        <h2 className="pf-section-title reveal">Experience & education</h2>
        <div className="pf-exp">
          <div className="reveal">
            <h3 className="pf-col">Experience</h3>
            <Track items={EXPERIENCE} hint="Add company name and dates here." />
          </div>
          <div className="reveal">
            <h3 className="pf-col">Education</h3>
            <Track items={EDUCATION} hint="Add college name and year here." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const subject = encodeURIComponent("Work enquiry");
  return (
    <section className="pf-section" id="contact">
      <div className="pf-wrap">
        <div className="pf-contact reveal">
          <h2>Let us work together</h2>
          <p>
            Need help with your social media or with data entry and office work? Send a message and
            I will reply as soon as I can.
          </p>
          <div className="pf-btns">
            <a className="pf-btn primary" href={`mailto:${CONTACT.email}?subject=${subject}`}>
              Email me
            </a>
            {CONTACT.whatsapp && (
              <a
                className="pf-btn ghost"
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message on WhatsApp
              </a>
            )}
            {CONTACT.phone && (
              <a className="pf-btn ghost" href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                Call {CONTACT.phone}
              </a>
            )}
          </div>
          <small>
            {CONTACT.email} · {CONTACT.location}
          </small>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pf-footer">
      <div className="pf-wrap pf-footer-in">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // One orchestrated moment: the name rises, then the week tiles pop in.
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".pf-line-in", { yPercent: 110, duration: 1, stagger: 0.12 })
          .from(".pf-fade", { y: 18, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
          .from(
            ".pf-tile",
            { scale: 0.85, opacity: 0, duration: 0.6, stagger: 0.06, ease: "back.out(1.6)" },
            "-=0.9"
          );

        // Sections reveal once as they enter the viewport.
        ScrollTrigger.batch(".reveal", {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.from(els, {
              y: 28,
              opacity: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
              clearProps: "all",
            }),
        });
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div className="pf" ref={root}>
      <style>{CSS}</style>
      <a
        href="#about"
        style={{ position: "absolute", left: -9999 }}
        onFocus={(e) => (e.currentTarget.style.left = "12px")}
        onBlur={(e) => (e.currentTarget.style.left = "-9999px")}
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
