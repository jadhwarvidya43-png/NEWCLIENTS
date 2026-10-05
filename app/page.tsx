"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, MoveUpRight, X } from "lucide-react";

const photos = {
  hero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=88",
  exterior: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
  living: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=85",
  bedroom: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
  kitchen: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=85",
  terrace: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
  pool: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1600&q=85",
  lounge: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1500&q=85",
  garden: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1500&q=85",
  detail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
};

const residences = [
  { name: "Three bedroom residence", beds: "3 BEDROOMS", price: "₹4.25 Cr", area: "2,150 sq.ft.", image: photos.living, alt: "Warm, sunlit contemporary living room" },
  { name: "Four bedroom residence", beds: "4 BEDROOMS", price: "₹6.80 Cr", area: "3,100 sq.ft.", image: photos.bedroom, alt: "Quiet, refined bedroom with natural finishes" },
  { name: "The signature penthouse", beds: "PENTHOUSE", price: "₹12 Cr", area: "5,400 sq.ft.", image: photos.terrace, alt: "Private residence opening onto a terrace" },
];

const plans = [
  { label: "3 BEDROOM", bed: "03", bath: "03", area: "2,150", kitchen: "01", terrace: "01", parking: "02", type: "A" },
  { label: "4 BEDROOM", bed: "04", bath: "04", area: "3,100", kitchen: "01", terrace: "02", parking: "02", type: "B" },
  { label: "PENTHOUSE", bed: "05", bath: "06", area: "5,400", kitchen: "02", terrace: "03", parking: "04", type: "C" },
];

const amenities = [
  { name: "The infinity pool", category: "A MOMENT ABOVE THE EVERYDAY", image: photos.pool, alt: "Still, blue infinity pool framed by greenery" },
  { name: "A quieter kind of focus", category: "PRIVATE WELLNESS STUDIO", image: photos.lounge, alt: "Calm residential lounge with sculptural furniture" },
  { name: "Room to exhale", category: "LANDSCAPED GARDENS", image: photos.garden, alt: "A landscaped garden beside a modern residence" },
];

const links = ["The residences", "Amenities", "The address", "Our story"];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Wordmark({ light = false }: { light?: boolean }) {
  return <a className={`wordmark${light ? " wordmark-light" : ""}`} href="#top" aria-label="Aurelia Developments home"><span className="wordmark-icon">A</span><span>AURELIA<span className="wordmark-sub">DEVELOPMENTS</span></span></a>;
}

function Photo({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return <img className="cover-photo" src={src} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />;
}

function PlanDrawing({ type }: { type: string }) {
  return <svg className="floorplan-drawing" viewBox="0 0 600 410" role="img" aria-label={`${type} residence architectural floor plan`}>
    <rect x="65" y="47" width="465" height="320" fill="#e9e6de" stroke="#847c6d" strokeWidth="3" />
    <path d="M65 235h160v132M225 235v-90h126v90h179M351 145V47M225 235h126v132M351 235v132M455 235v132M455 145h75M65 145h160" fill="none" stroke="#8e8779" strokeWidth="3" />
    <path d="M225 47v62m126 36h42m-168 90h50m76 0h40m64-90v44M65 180h45m160 187v-35m126 35v-35m-126-92v45" fill="none" stroke="#b2aa9b" strokeWidth="2" />
    <g fill="#777064" fontFamily="Arial,sans-serif" fontSize="11" letterSpacing="1.4" textAnchor="middle">
      <text x="144" y="137">BEDROOM 01</text><text x="287" y="105">BEDROOM 02</text><text x="443" y="128">BEDROOM 03</text>
      <text x="145" y="302">LIVING / DINING</text><text x="286" y="306">KITCHEN</text><text x="403" y="302">TERRACE</text>
      <text x="126" y="213">BATH</text><text x="395" y="212">BATH</text>
    </g>
    <path d="M65 235h160M225 235h126m0 0h179" stroke="#b69b6b" strokeWidth="5" opacity=".55" />
    <path d="M83 365v17h429v-17" fill="none" stroke="#b69b6b" strokeWidth="2" />
    <text x="296" y="398" fill="#897e69" fontSize="9" letterSpacing="3" textAnchor="middle">ILLUSTRATIVE PLAN · NOT TO SCALE</text>
  </svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [planIndex, setPlanIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryOffset, setGalleryOffset] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const activePlan = plans[planIndex];
  const galleryRef = useRef<HTMLDivElement>(null);

  function moveGallery(direction: number) {
    const next = (galleryIndex + direction + 3) % 3;
    setGalleryIndex(next);
    const first = galleryRef.current?.firstElementChild as HTMLElement | null;
    const gap = galleryRef.current ? parseFloat(getComputedStyle(galleryRef.current).gap) || 0 : 0;
    setGalleryOffset(next * ((first?.getBoundingClientRect().width || window.innerWidth * .66) + gap));
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = old; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phone = String(data.get("phone") || "").replace(/\D/g, "");
    if (phone.length < 10) { setFormError("Please enter a valid phone number so our team can reach you."); return; }
    setFormError("");
    setSubmitted(true);
  }

  return <main id="top">
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-shell"><Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">{links.map((item, i) => <a key={item} href={["#residences", "#amenities", "#location", "#story"][i]}>{item}</a>)}</nav>
        <a className="nav-cta" href="#enquire">BOOK A PRIVATE TOUR <MoveUpRight size={13} strokeWidth={1.5} /></a>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: .55, ease: [0.76, 0, 0.24, 1] }}>
      <div className="mobile-menu-inner"><div className="mobile-menu-top"><Wordmark light /><button aria-label="Close navigation" onClick={() => setMenuOpen(false)}><X /></button></div>
        <nav aria-label="Mobile navigation">{links.map((item, i) => <a key={item} href={["#residences", "#amenities", "#location", "#story"][i]} onClick={() => setMenuOpen(false)}><span>0{i + 1}</span>{item}<ArrowUpRight size={20} /></a>)}</nav>
        <a className="button button-gold" href="#enquire" onClick={() => setMenuOpen(false)}>BOOK A PRIVATE TOUR <MoveUpRight size={14} /></a>
        <p>MUMBAI, INDIA <span>19°04&apos; N · 72°52&apos; E</span></p>
      </div>
    </motion.div>}</AnimatePresence>

    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-image"><Photo src={photos.hero} alt="Sunlit modern residence interior with warm natural finishes" priority /></div>
      <div className="hero-shade" />
      <div className="hero-content">
        <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2, duration: 1 }}><span className="eyebrow-line" /> AURELIA DEVELOPMENTS <span className="eyebrow-dot">·</span> MUMBAI</motion.p>
        <motion.h1 id="hero-heading" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: .3, ease: [.22, 1, .36, 1] }}>The next address<br />of <em>luxury living.</em></motion.h1>
        <motion.p className="hero-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .8 }}>A private collection of residences designed around light, space and the art of living well.</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: 1 }}><a className="button button-gold" href="#enquire">BOOK A PRIVATE TOUR <MoveUpRight size={14} /></a><a className="text-link light-link" href="#residences">EXPLORE THE RESIDENCES <ArrowDownRight size={15} /></a></motion.div>
      </div>
      <div className="hero-bottom"><span>01 — 06</span><span className="hero-caption">AN ADDRESS THAT FEELS LIKE YOURS.</span><a href="#introduction" className="scroll-cue">SCROLL TO DISCOVER <ArrowDown size={13} /></a></div>
      <span className="hero-index">A / 01</span>
    </section>

    <section className="intro section-pad" id="introduction">
      <div className="intro-top"><Reveal><p className="eyebrow dark-eyebrow">A PLACE APART <span>—</span> AURELIA ONE</p></Reveal><Reveal delay={.1}><p className="intro-aside">A considered collection<br />in the heart of Mumbai.</p></Reveal></div>
      <div className="intro-grid"><Reveal className="intro-title-wrap"><h2>Designed for<br />a different way<br />of <em>living.</em></h2></Reveal><div className="intro-copy-wrap"><Reveal delay={.12}><p className="intro-copy">Aurelia One is an architectural statement shaped by natural light, generous proportions and a quiet attention to detail.</p><a href="#story" className="text-link dark-link">A CLOSER LOOK <ArrowDownRight size={15} /></a></Reveal>
        <div className="facts-grid">{[["01", "PRIVATE RESIDENCES"], ["02", "PRIME MUMBAI ADDRESS"], ["03", "ARCHITECTURALLY DESIGNED"], ["04", "LIMITED COLLECTION"]].map(([n, label], i) => <Reveal key={n} delay={.1 * i}><div className="fact"><span>{n}</span><p>{label}</p></div></Reveal>)}</div></div>
      </div>
      <Reveal className="intro-image-wrap"><div className="intro-image"><Photo src={photos.exterior} alt="Contemporary residence with expansive glazing and considered material detail" /></div><span className="image-note">AURELIA ONE <i>·</i> MUMBAI</span></Reveal>
    </section>

    <section className="gallery-section" id="gallery">
      <div className="gallery-heading section-pad"><Reveal><p className="eyebrow dark-eyebrow">A STUDY IN FORM & FEEL</p><h2>A residence<br />with <em>presence.</em></h2></Reveal><Reveal delay={.12}><p className="gallery-description">A composition of considered spaces. Made to be seen, felt, and lived in.</p><div className="gallery-controls"><button aria-label="Previous image" onClick={() => moveGallery(-1)}><ArrowLeft /></button><span>0{galleryIndex + 1} <i>/</i> 03</span><button aria-label="Next image" onClick={() => moveGallery(1)}><ArrowRight /></button></div></Reveal></div>
      <div className="gallery-track" ref={galleryRef} style={{ transform: `translateX(-${galleryOffset}px)` }}>
        {[{ label: "A quieter kind of living", img: photos.living, alt: "Light-filled residence with sculptural furniture", cls: "gallery-wide" }, { label: "The art of arriving", img: photos.exterior, alt: "Modern residential architecture at golden hour", cls: "gallery-tall" }, { label: "A room of your own", img: photos.bedroom, alt: "Quiet bedroom with natural textures", cls: "gallery-wide" }, { label: "Made for lingering", img: photos.kitchen, alt: "Minimal kitchen in warm stone and timber", cls: "gallery-tall" }].map((item, i) => <Reveal key={item.label} className={`gallery-card ${item.cls}`} delay={i * .08}><div className="gallery-photo"><Photo src={item.img} alt={item.alt} /></div><div className="gallery-card-caption"><span>0{i + 1}</span><p>{item.label}</p><ArrowUpRight size={16} /></div></Reveal>)}
      </div>
      <p className="gallery-foot section-pad">01 — 04 <span>SPACES THAT SPEAK SOFTLY, AND STAY WITH YOU.</span></p>
    </section>

    <section className="residences section-pad" id="residences">
      <div className="section-head"><Reveal><p className="eyebrow dark-eyebrow">A PRIVATE COLLECTION</p><h2>Choose your<br /><em>space.</em></h2></Reveal><Reveal delay={.12}><p className="section-head-note">Three distinct expressions of a life<br />well considered.</p><a className="text-link dark-link" href="#floorplans">FIND YOUR RESIDENCE <ArrowDownRight size={15} /></a></Reveal></div>
      <div className="residence-list">{residences.map((home, i) => <Reveal key={home.name} delay={i * .1}><article className="residence-row"><div className="residence-image"><Photo src={home.image} alt={home.alt} /><span className="residence-index">0{i + 1}</span><a href="#enquire" aria-label={`Enquire about ${home.name}`} className="image-arrow"><ArrowUpRight /></a></div><div className="residence-detail"><div><p className="eyebrow dark-eyebrow">{home.beds}</p><h3>{home.name}</h3><div className="residence-meta"><span>{home.area}</span><span className="meta-separator" /><span>PRIVATE TERRACE</span></div></div><div className="residence-price"><p>RESIDENCES FROM</p><span>{home.price}</span></div><a href="#enquire" className="residence-link">ENQUIRE <ArrowUpRight size={14} /></a></div></article></Reveal>)}</div>
      <p className="price-note">Pricing shown for concept purposes only. Plans, areas and specifications are indicative.</p>
    </section>

    <section className="floorplans" id="floorplans"><div className="floorplans-inner section-pad">
      <div className="section-head floorplan-head"><Reveal><p className="eyebrow light-eyebrow">ROOM TO MAKE YOUR OWN</p><h2>Every detail,<br /><em>considered.</em></h2></Reveal><Reveal delay={.1}><p className="floorplan-intro">Open, generous plans with space for the way you choose to live.</p></Reveal></div>
      <div className="plan-tabs" role="tablist" aria-label="Select a residence floor plan">{plans.map((plan, i) => <button key={plan.label} role="tab" aria-selected={planIndex === i} className={planIndex === i ? "active" : ""} onClick={() => setPlanIndex(i)}>{plan.label}<span>0{i + 1}</span></button>)}</div>
      <div className="plan-layout"><div className="plan-visual"><AnimatePresence mode="wait"><motion.div key={activePlan.type} className="plan-paper" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .32 }}><PlanDrawing type={activePlan.type} /></motion.div></AnimatePresence><span className="plan-visual-label">TYPICAL FLOOR PLAN · TYPE {activePlan.type}</span></div>
        <div className="plan-details"><div className="plan-area"><span>{activePlan.area}</span><i>sq.ft.</i></div><p className="plan-details-label">A LITTLE MORE ROOM<br />FOR WHAT MATTERS.</p><dl>{[["BEDROOMS", activePlan.bed], ["BATHROOMS", activePlan.bath], ["KITCHEN", activePlan.kitchen], ["TERRACE", activePlan.terrace], ["CAR PARKING", activePlan.parking]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><a className="button button-outline-light" href="#enquire">REQUEST COMPLETE FLOOR PLAN <ArrowUpRight size={14} /></a><p className="plan-disclaimer">Plans are indicative and subject to change. Areas are approximate.</p></div></div>
    </div></section>

    <section className="amenities section-pad" id="amenities">
      <div className="section-head"><Reveal><p className="eyebrow dark-eyebrow">THE ART OF UNHURRIED LIVING</p><h2>Everyday,<br /><em>elevated.</em></h2></Reveal><Reveal delay={.1}><p className="section-head-note">A thoughtful collection of places<br />to restore, gather and grow.</p></Reveal></div>
      <div className="amenities-grid">{amenities.map((item, i) => <Reveal key={item.name} delay={i * .12}><a className="amenity" href="#enquire"><div className="amenity-image"><Photo src={item.image} alt={item.alt} /><span className="amenity-number">0{i + 1}</span><span className="amenity-arrow"><ArrowUpRight /></span></div><p className="eyebrow dark-eyebrow">{item.category}</p><h3>{item.name}</h3></a></Reveal>)}</div>
      <div className="amenities-foot"><span>AND SO MUCH MORE</span><p>Private cinema <i>·</i> Residents’ lounge <i>·</i> Concierge <i>·</i> Landscaped gardens <i>·</i> Secure parking</p></div>
    </section>

    <section className="location" id="location"><div className="location-photo"><Photo src={photos.hero} alt="Modern residence interior looking out to a private garden" /></div><div className="location-panel"><Reveal><p className="eyebrow light-eyebrow">A CONNECTED KIND OF CALM</p><h2>At the centre<br />of <em>everything.</em></h2><p className="location-copy">A rare sense of stillness, with the city’s most important places close at hand.</p></Reveal><div className="location-list">{[["05", "MIN", "Restaurants & cafés"], ["08", "MIN", "Major highway"], ["10", "MIN", "Business district"], ["12", "MIN", "Premium shopping"], ["15", "MIN", "International airport"]].map(([time, unit, place], i) => <Reveal key={place} delay={i * .06}><div className="location-row"><span className="location-time">{time}<i>{unit}</i></span><p>{place}</p><ArrowUpRight size={14} /></div></Reveal>)}</div><a href="#enquire" className="text-link light-link">EXPLORE THE NEIGHBOURHOOD <ArrowUpRight size={14} /></a></div></section>

    <section className="story section-pad" id="story"><div className="story-top"><Reveal><p className="eyebrow dark-eyebrow">MADE WITH MEANING</p><h2>Architecture<br />with <em>intention.</em></h2></Reveal><Reveal delay={.12}><p className="story-intro">Every line, material and opening has been considered to create homes that feel timeless rather than temporary.</p></Reveal></div><div className="story-image-wrap"><Reveal className="story-image" ><div className="story-photo"><Photo src={photos.exterior} alt="Quiet architectural detail in stone and glass" /></div><span className="image-note">FORM FOLLOWING FEELING <i>·</i> AURELIA ONE</span></Reveal><Reveal className="story-quote" delay={.15}><span className="quote-mark">“</span><blockquote>A home should make the world feel a little quieter.</blockquote><p>THE AURELIA DESIGN PHILOSOPHY</p><a href="#enquire" className="text-link dark-link">DISCOVER OUR APPROACH <ArrowUpRight size={14} /></a></Reveal></div><div className="creative-team">{[["ARCHITECT", "Studio North"], ["INTERIOR DESIGN", "Atelier Forme"], ["LANDSCAPE", "Groundworks Studio"]].map(([role, name]) => <div key={role}><span>{role}</span><p>{name}</p></div>)}</div></section>

    <section className="progress-section"><div className="progress-inner section-pad"><div className="progress-heading"><Reveal><p className="eyebrow light-eyebrow">CRAFT, IN PROGRESS</p><h2>From vision<br />to <em>reality.</em></h2></Reveal><Reveal delay={.1}><div className="progress-stat"><span>72<sup>%</sup></span><p>ILLUSTRATIVE<br />CONCEPT PROGRESS</p></div></Reveal></div><div className="progress-track"><span /></div><div className="timeline">{[["01", "FOUNDATION", "COMPLETE"], ["02", "STRUCTURE", "COMPLETE"], ["03", "FAÇADE", "IN PROGRESS"], ["04", "INTERIORS", "UP NEXT"], ["05", "LANDSCAPING", "UP NEXT"], ["06", "COMPLETION", "UP NEXT"]].map(([n, label, status], i) => <Reveal key={n} delay={i * .04}><div className={`timeline-item${i < 2 ? " done" : i === 2 ? " current" : ""}`}><span>{n}</span><p>{label}</p><i>{status}</i></div></Reveal>)}</div><p className="progress-note">Illustrative concept timeline. All project information shown is fictional and for demonstration purposes.</p></div></section>

    <section className="testimonial-section section-pad"><Reveal><p className="eyebrow dark-eyebrow">A SENSE OF BELONGING</p><h2>A place worth<br /><em>coming home to.</em></h2></Reveal><div className="testimonial-grid">{[["“The attention to detail is unlike anything we had seen in the area.”", "ARJUN & MEERA S.", "FUTURE RESIDENTS"], ["“It feels considered in a way that makes you want to slow down.”", "ANANYA R.", "FUTURE RESIDENT"], ["“A beautiful balance between the city and a place to retreat.”", "KABIR & TARA M.", "FUTURE RESIDENTS"]].map(([quote, name, tag], i) => <Reveal key={name} delay={i * .1}><figure className="testimonial"><span>0{i + 1}</span><blockquote>{quote}</blockquote><figcaption>{name}<i>{tag}</i></figcaption></figure></Reveal>)}</div><p className="testimonial-note">Fictional testimonials created for this concept presentation.</p></section>

    <section className="developer"><div className="developer-image"><Photo src={photos.detail} alt="A considered interior in warm natural tones" /></div><div className="developer-content section-pad"><Reveal><p className="eyebrow light-eyebrow">THE PEOPLE BEHIND THE PLACE</p><h2>Building what<br /><em>lasts.</em></h2><p className="developer-copy">Aurelia Developments is a fictional developer imagined around a simple belief: thoughtful places shape better lives.</p><a href="#enquire" className="text-link light-link">DISCOVER AURELIA <ArrowUpRight size={14} /></a></Reveal><div className="developer-stats">{[["15+", "YEARS EXPERIENCE"], ["28", "PROJECTS DELIVERED"], ["4.8M+", "SQ. FT. DEVELOPED"], ["12", "AWARDS"]].map(([number, label], i) => <Reveal key={label} delay={i * .07}><div><span>{number}</span><p>{label}</p></div></Reveal>)}</div></div></section>

    <section className="enquiry section-pad" id="enquire"><div className="enquiry-left"><Reveal><p className="eyebrow dark-eyebrow">A MORE PERSONAL INTRODUCTION</p><h2>Your private tour<br />starts <em>here.</em></h2><p className="enquiry-copy">Tell us a little about what you’re looking for. A member of our team will be in touch to arrange your visit.</p><div className="contact-details"><a href="mailto:hello@aurelia.example">HELLO@AURELIA.EXAMPLE <ArrowUpRight size={13} /></a><span>MUMBAI, MAHARASHTRA</span></div></Reveal></div><div className="enquiry-form-wrap"><AnimatePresence mode="wait">{submitted ? <motion.div className="success-state" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><span className="success-icon"><Check /></span><p className="eyebrow dark-eyebrow">THANK YOU</p><h3>Your enquiry<br />is in good hands.</h3><p>This concept form does not send enquiries. A live site would connect you with the Aurelia team.</p><button className="text-link dark-link" onClick={() => setSubmitted(false)}>SEND ANOTHER ENQUIRY <ArrowUpRight size={14} /></button></motion.div> : <motion.form className="enquiry-form" onSubmit={submitForm} initial={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }}>
        <label>YOUR NAME<input name="name" placeholder="Full name" autoComplete="name" required minLength={2} /></label>
        <div className="form-row"><label>PHONE NUMBER<input name="phone" placeholder="+91 00000 00000" type="tel" autoComplete="tel" required /></label><label>EMAIL ADDRESS<input name="email" placeholder="you@email.com" type="email" autoComplete="email" required /></label></div>
        <label>RESIDENCE OF INTEREST<span className="select-wrap"><select name="residence" defaultValue=""><option value="" disabled>Select a residence</option><option>3 bedroom residence</option><option>4 bedroom residence</option><option>Signature penthouse</option><option>I'd like to explore</option></select><ChevronDown size={15} /></span></label>
        <label>PREFERRED VISIT DATE<input name="date" type="date" /></label>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <button type="submit" className="button button-dark">REQUEST A PRIVATE TOUR <ArrowUpRight size={14} /></button>
        <p className="form-privacy">By submitting, you agree to be contacted about AURELIA ONE. Your details remain private.</p>
        <a className="whatsapp-link" href="https://wa.me/910000000000" target="_blank" rel="noreferrer">OR CHAT WITH US ON WHATSAPP <ArrowUpRight size={13} /></a>
      </motion.form>}</AnimatePresence></div></section>

    <section className="final-cta"><div className="final-image"><Photo src={photos.hero} alt="Warm, light-filled residence prepared for a quiet evening" /></div><div className="final-shade" /><Reveal className="final-content"><p className="eyebrow light-eyebrow">AURELIA ONE · MUMBAI</p><h2>Come home to<br />something <em>extraordinary.</em></h2><div className="final-actions"><a className="button button-gold" href="#enquire">BOOK A PRIVATE TOUR <ArrowUpRight size={14} /></a><a className="text-link light-link" href="#enquire">REQUEST A BROCHURE <ArrowDownRight size={15} /></a></div></Reveal><span className="final-edition">AN ADDRESS BY AURELIA DEVELOPMENTS</span></section>

    <footer className="footer"><div className="footer-main section-pad"><div className="footer-brand"><Wordmark light /><p>THE NEXT ADDRESS<br />OF LUXURY LIVING.</p></div><div className="footer-nav"><div><span>DISCOVER</span><a href="#residences">Residences</a><a href="#amenities">Amenities</a><a href="#location">The address</a><a href="#story">Our story</a></div><div><span>GET IN TOUCH</span><a href="mailto:hello@aurelia.example">hello@aurelia.example</a><a href="tel:+910000000000">+91 XXX XXX XXXX</a><p>Mumbai, Maharashtra</p></div></div><a href="#top" className="back-top">BACK TO TOP <ArrowUpRight size={14} /></a></div><div className="footer-bottom section-pad"><p>© 2026 AURELIA DEVELOPMENTS</p><p>CONCEPT / DEMONSTRATION WEBSITE · ALL PROJECT DETAILS ARE FICTIONAL</p><div><a href="#disclaimer">PRIVACY</a><a href="#disclaimer">TERMS</a><a href="#disclaimer">DISCLAIMER</a></div></div><p className="footer-disclaimer" id="disclaimer">This website is a fictional concept created for presentation purposes. Project name, location, pricing, specifications, imagery and developer details are illustrative only and do not represent a real offering.</p></footer>
  </main>;
}
