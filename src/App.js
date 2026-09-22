import { useState, useEffect, useRef } from "react";

const C = {
  primary: "#3498db",
  secondary: "#2c3e50",
  accent: "#e74c3c",
  light: "#f0f4f8",
};
const grad = "linear-gradient(135deg,#2c3e50 0%,#3498db 100%)";
const grad2 = "linear-gradient(135deg,#667eea 0%,#764ba2 100%)";

/* ── CONTACT ──
   Le formulaire envoie les messages via Formspree (gratuit, sans serveur).
   1) Créer un compte sur https://formspree.io  2) "New form"  3) copier l'identifiant
   du formulaire (la fin de l'URL https://formspree.io/f/XXXXXXXX) et le coller ci-dessous.
   Tant que FORMSPREE_ID est vide, le bouton ouvre le client mail du visiteur (mailto). */
const FORMSPREE_ID = "xkjgrrvw";
const CONTACT_EMAIL = "jawher.sbabti@gmail.com";

function useVisible(t = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, vis];
}

/* ── DONNÉES (FR / EN) ── */
const certifsByLang = {
  fr: [
    { badge:"🌍 Internationale", title:"ITS Databases", org:"Certiport / Pearson VUE", date:"Mai 2026", intl:true, img:"certif_its_databases.jpg" },
    { badge:"🏆 Expert", title:"TOSA Python 3", org:"Isograd — Niveau Expert", date:"Avril 2026", score:"950/1000", intl:true, img:"certif_tosa_python.jpg" },
    { badge:"📊 BI", title:"Data Analysis Power BI", org:"CodeQuest — 40h", date:"Février 2026", img:"certif_powerbi.jpg" },
    { badge:"💻 Dev Web", title:"Développement Web Niv.1", org:"Opus Lab — 50h", date:"Déc. 2025 – Avr. 2026", img:"certif_devweb_opuslab.jpg" },
    { badge:"🏅 Distinction", title:"Challenge IPSET", org:"Création de projets informatiques", date:"Juin 2025", img:"certif_challenge_ipset.jpg" },
    { badge:"🤝 Soft Skills", title:"Attestation Soft Skills", org:"ANETI / ACJEMP", date:"Décembre 2023", img:"certif_softskills.jpg" },
  ],
  en: [
    { badge:"🌍 International", title:"ITS Databases", org:"Certiport / Pearson VUE", date:"May 2026", intl:true, img:"certif_its_databases.jpg" },
    { badge:"🏆 Expert", title:"TOSA Python 3", org:"Isograd — Expert Level", date:"April 2026", score:"950/1000", intl:true, img:"certif_tosa_python.jpg" },
    { badge:"📊 BI", title:"Data Analysis Power BI", org:"CodeQuest — 40h", date:"February 2026", img:"certif_powerbi.jpg" },
    { badge:"💻 Web Dev", title:"Web Development Lvl.1", org:"Opus Lab — 50h", date:"Dec. 2025 – Apr. 2026", img:"certif_devweb_opuslab.jpg" },
    { badge:"🏅 Award", title:"IPSET Challenge", org:"IT project creation", date:"June 2025", img:"certif_challenge_ipset.jpg" },
    { badge:"🤝 Soft Skills", title:"Soft Skills Certificate", org:"ANETI / ACJEMP", date:"December 2023", img:"certif_softskills.jpg" },
  ],
};

const stagesByLang = {
  fr: [
    { title:"Stage Data & BI", org:"Bee Coders", date:"01/06/2026 – 01/07/2026",
      desc:"Pipeline ETL avec Talend Open Studio vers DataWarehouse MySQL (schéma en étoile). Modèles ML (Random Forest & Prophet) pour prédiction des ventes. Dashboard Power BI avec KPIs (SS, PC, EOQ) pour optimisation des stocks.",
      img:"attestation_beecoders.jpg" },
    { title:"Stage Technique", org:"Tunisair", date:"15/08/2025 – 22/09/2025",
      desc:"Développement d'une application de gestion des avances en devises (Java, MySQL). Support technique et assistance aux utilisateurs du département IT.",
      img:"attestation_tunisair.jpg" },
    { title:"Stage Développement & Support IT", org:"Ola Energy", date:"21/08/2023 – 27/09/2023",
      desc:"Application desktop de gestion des réclamations et nouvelles demandes (C#, .NET). Support IT : installation logiciels, maintenance matérielle, gestion parc informatique.",
      img:"attestation_olaenergy.jpg" },
    { title:"Stage Assistance Technique", org:"Tunisie Télécom", date:"19/09/2022 – 22/10/2022",
      desc:"Assistance technique en environnement réseau et télécommunications. Gestion du système de ticketing et résolution d'incidents.",
      img:"attestation_tunisietelecom.jpg" },
  ],
  en: [
    { title:"Data & BI Internship", org:"Bee Coders", date:"06/01/2026 – 07/01/2026",
      desc:"Built an ETL pipeline with Talend Open Studio to a MySQL Data Warehouse (star schema). ML models (Random Forest & Prophet) for sales forecasting. Power BI dashboard with KPIs (SS, RP, EOQ) for stock optimization.",
      img:"attestation_beecoders.jpg" },
    { title:"Technical Internship", org:"Tunisair", date:"08/15/2025 – 09/22/2025",
      desc:"Developed a foreign currency advance management application (Java, MySQL). Technical support and user assistance for the IT department.",
      img:"attestation_tunisair.jpg" },
    { title:"Development & IT Support Internship", org:"Ola Energy", date:"08/21/2023 – 09/27/2023",
      desc:"Desktop application for managing complaints and new requests (C#, .NET). IT support: software installation, hardware maintenance, IT asset management.",
      img:"attestation_olaenergy.jpg" },
    { title:"Technical Support Internship", org:"Tunisie Télécom", date:"09/19/2022 – 10/22/2022",
      desc:"Technical support in a network and telecommunications environment. Ticketing system management and incident resolution.",
      img:"attestation_tunisietelecom.jpg" },
  ],
};

const skillsByLang = {
  fr: [
    { icon:"🌐", title:"Développement Web", tags:["HTML5","CSS3","JavaScript","React.js","Node.js","Express.js"] },
    { icon:"⚙️", title:"Langages", tags:["Python","Java","C#","Visual Basic","SQL"] },
    { icon:"📊", title:"Data & BI", tags:["Power BI","Talend","ETL","Jupyter","DataWarehouse","DAX"] },
    { icon:"🗄️", title:"Bases de Données", tags:["SQL Server","MySQL","Oracle","PostgreSQL"] },
    { icon:"🧪", title:"Tests & QA", tags:["Selenium","Tests Fonctionnels","Tests Manuels","Bug Tracking"] },
    { icon:"🛠️", title:"Outils & DevOps", tags:["Docker","Git/GitHub","Postman","GLPI","Agile/Scrum","CRISP-DM"] },
  ],
  en: [
    { icon:"🌐", title:"Web Development", tags:["HTML5","CSS3","JavaScript","React.js","Node.js","Express.js"] },
    { icon:"⚙️", title:"Languages", tags:["Python","Java","C#","Visual Basic","SQL"] },
    { icon:"📊", title:"Data & BI", tags:["Power BI","Talend","ETL","Jupyter","DataWarehouse","DAX"] },
    { icon:"🗄️", title:"Databases", tags:["SQL Server","MySQL","Oracle","PostgreSQL"] },
    { icon:"🧪", title:"Testing & QA", tags:["Selenium","Functional Testing","Manual Testing","Bug Tracking"] },
    { icon:"🛠️", title:"Tools & DevOps", tags:["Docker","Git/GitHub","Postman","GLPI","Agile/Scrum","CRISP-DM"] },
  ],
};

const projectsByLang = {
  fr: [
    { icon:"🏦", title:"Gestion Crédit Bancaire (PFE)", g:grad,
      desc:"Plateforme bancaire complète de gestion des demandes de crédit avec workflow de validation à 2 niveaux, simulation en temps réel, calcul d'endettement et génération automatique d'échéancier. Inspiré de la Banque Zitouna.",
      tech:["PHP","MySQL","HTML5","CSS3","JavaScript","Chart.js"], video:"demo_credit_bancaire.mp4",
      github:"https://github.com/jawher71998/gestion-credit-bancaire" },
    { icon:"✈️", title:"Jawher Travel Agency", g:grad2,
      desc:"Plateforme complète d'agence de voyage avec réservation en ligne, paiement Konnect, chat temps réel, tableau de bord analytics, 5 langues (FR/EN/AR/IT/DE) et système d'emails automatiques.",
      tech:["React.js","Node.js","Express.js","MongoDB","Socket.io","JWT","Cloudinary"], video:"demo_jawher_travel.mp4",
      github:null },
    { icon:"🍝", title:"La Tavola di Roma", g:grad,
      desc:"Application web Full-Stack pour un restaurant italien. Réservation en 3 étapes, panel admin avec dashboard temps réel, gestion du menu, calendrier visuel et notifications instantanées.",
      tech:["HTML5","CSS3","JavaScript","Supabase","PostgreSQL","Netlify"], video:"demo_latavola.mp4",
      github:"https://github.com/jawher71998/restaurant-italia" },
    { icon:"🏫", title:"EduManager — Gestion Scolaire", g:grad2,
      desc:"Application desktop multi-école de gestion scolaire (Spring Boot + React + Electron). Couvre tous les besoins administratifs et pédagogiques. Architecture multi-tenant, prête à commercialiser.",
      tech:["Spring Boot","React.js","Electron","PostgreSQL","Java"], video:"demo_edumanager.mp4",
      github:"https://github.com/jawher71998/edumanager" },
    { icon:"📦", title:"Poste Tunisienne — Suivi Colis", g:grad,
      desc:"Application web de gestion et suivi de colis avec code unique, statuts en temps réel (Reçu → Livré), tableau de bord statistique, authentification et gestion des utilisateurs.",
      tech:["HTML5","CSS3","JavaScript","PHP","MySQL","Chart.js"], video:"demo_poste_tunisienne.mp4",
      github:"https://github.com/jawher71998/poste-tunisienne-suivi-colis" },
    { icon:"🏨", title:"Grand Hôtel Paradise — Réservation", g:grad2,
      desc:"Système de réservation hôtelière en ligne avec 3 rôles (Admin, Client, Visiteur). Gestion des chambres, réservations avec code promo, avis clients, galerie photos et dashboard admin.",
      tech:["PHP","MySQL","HTML5","CSS3","JavaScript"], video:"demo_hotel.mp4",
      github:"https://github.com/jawher71998/hotel-reservation" },
  ],
  en: [
    { icon:"🏦", title:"Bank Credit Management (Capstone)", g:grad,
      desc:"Full banking platform for credit request management with a 2-level approval workflow, real-time simulation, debt-ratio calculation and automatic repayment schedule generation. Inspired by Banque Zitouna.",
      tech:["PHP","MySQL","HTML5","CSS3","JavaScript","Chart.js"], video:"demo_credit_bancaire.mp4",
      github:"https://github.com/jawher71998/gestion-credit-bancaire" },
    { icon:"✈️", title:"Jawher Travel Agency", g:grad2,
      desc:"Full travel agency platform with online booking, Konnect payment, real-time chat, analytics dashboard, 5 languages (FR/EN/AR/IT/DE) and automated email system.",
      tech:["React.js","Node.js","Express.js","MongoDB","Socket.io","JWT","Cloudinary"], video:"demo_jawher_travel.mp4",
      github:null },
    { icon:"🍝", title:"La Tavola di Roma", g:grad,
      desc:"Full-stack web application for an Italian restaurant. 3-step booking, admin panel with real-time dashboard, menu management, visual calendar and instant notifications.",
      tech:["HTML5","CSS3","JavaScript","Supabase","PostgreSQL","Netlify"], video:"demo_latavola.mp4",
      github:"https://github.com/jawher71998/restaurant-italia" },
    { icon:"🏫", title:"EduManager — School Management", g:grad2,
      desc:"Multi-school desktop application for school management (Spring Boot + React + Electron). Covers all administrative and academic needs. Multi-tenant architecture, ready to commercialize.",
      tech:["Spring Boot","React.js","Electron","PostgreSQL","Java"], video:"demo_edumanager.mp4",
      github:"https://github.com/jawher71998/edumanager" },
    { icon:"📦", title:"Poste Tunisienne — Parcel Tracking", g:grad,
      desc:"Web application for parcel management and tracking with a unique code, real-time statuses (Received → Delivered), statistics dashboard, authentication and user management.",
      tech:["HTML5","CSS3","JavaScript","PHP","MySQL","Chart.js"], video:"demo_poste_tunisienne.mp4",
      github:"https://github.com/jawher71998/poste-tunisienne-suivi-colis" },
    { icon:"🏨", title:"Grand Hôtel Paradise — Booking", g:grad2,
      desc:"Online hotel booking system with 3 roles (Admin, Client, Visitor). Room management, bookings with promo codes, customer reviews, photo gallery and admin dashboard.",
      tech:["PHP","MySQL","HTML5","CSS3","JavaScript"], video:"demo_hotel.mp4",
      github:"https://github.com/jawher71998/hotel-reservation" },
  ],
};

/* ── TEXTES D'INTERFACE (FR / EN) ── */
const TXT = {
  fr: {
    navLinks: ["Accueil","À propos","Stages","Certifications","Compétences","Projets","Contact"],
    heroBadge: "🚀 Disponible pour de nouvelles opportunités",
    heroTyped: "Data Analyst & Développeur Web | QA Testeur Junior",
    heroButtons: [["📂 Projets","#projects"],["✉️ Contact","#contact"],["💼 LinkedIn","https://linkedin.com/in/jawher-sbabti"],["🐙 GitHub","https://github.com/jawher71998"],["📄 CV (FR)",`${process.env.PUBLIC_URL}/CV_Jawher_Sbabti.pdf`],["📄 CV (EN)",`${process.env.PUBLIC_URL}/CV_Jawher_Sbabti_EN.pdf`]],
    heroStats: [["4","Stages"],["6","Certifications"],["950","Score TOSA"],["2","Diplômes"]],
    aboutTitle: "À propos de moi", aboutSub: "Mon parcours, mes valeurs et ma vision",
    aboutGreeting: "Bonjour, je suis Jawher 👋", aboutBadge: "✅ Open to Work",
    aboutTags: ["📊 Data Analyst","💻 Dev Web","🧪 QA Testeur","🤖 ML","📈 Power BI"],
    aboutCvFr: "📄 CV (Français)", aboutCvEn: "📄 CV (English)",
    stagesTitle: "Mes Stages", stagesSub: "Expériences en entreprise — cliquez pour voir l'attestation",
    stagesCta: "👁️ Cliquer pour voir l'attestation",
    certifTitle: "Certifications", certifSub: "Mes certifications qui prouvent mes compétences",
    certifCta: "👁️ Cliquer pour voir le certificat", certifMissing: "Image", certifMissing2: "introuvable dans public/",
    skillsTitle: "Mes Compétences", skillsSub: "Technologies et outils que je maîtrise",
    projectsTitle: "Mes Projets", projectsSub: "Réalisations concrètes — cliquez sur ▶️ pour voir la démo vidéo",
    projectsDemo: "▶️ Voir la démo", projectsGithub: "🐙 Voir sur GitHub", projectsPrivate: "🔒 Code privé",
    videoTitleSuffix: " — Démo", videoFallback: "🎬 La démo vidéo de ce projet sera bientôt disponible.", videoEsc: "Appuyez sur Échap pour fermer",
    contactTitle: "Contactez-moi", contactSub: "Je suis disponible pour toute opportunité professionnelle",
    contactInfo: [["📧","Email","jawher.sbabti@gmail.com"],["📱","Téléphone","+216 28 880 558"],["📍","Localisation","Boumhel, Ben Arous, Tunisie"],["🚗","Mobilité","Permis B — Mobile"],["💼","Disponibilité","Immédiate — Open to Work"]],
    ph: { name:"Votre nom", email:"Votre email", subject:"Sujet", msg:"Votre message" },
    statusLabel: { sending:"⏳ Envoi en cours…", sent:"✅ Message envoyé !", error:"🔁 Réessayer l'envoi", idle:"🚀 Envoyer le message" },
    errRequired: "Remplissez le nom, l'email et le message pour envoyer.",
    errEmail: "Cette adresse email n'est pas valide. Vérifiez-la et réessayez.",
    errSend: "L'envoi a échoué. Réessayez, ou écrivez-moi directement à ",
    okSend: "Merci ! Je vous réponds dès que possible.",
    footerRole: "Data Analyst & Développeur Web | QA Testeur Junior",
    footerTagline: "Fait avec ❤️ en Tunisie 🇹🇳 • Built with React.js",
    scrollTop: "Retour en haut",
  },
  en: {
    navLinks: ["Home","About","Internships","Certifications","Skills","Projects","Contact"],
    heroBadge: "🚀 Available for new opportunities",
    heroTyped: "Data Analyst & Web Developer | Junior QA Tester",
    heroButtons: [["📂 Projects","#projects"],["✉️ Contact","#contact"],["💼 LinkedIn","https://linkedin.com/in/jawher-sbabti"],["🐙 GitHub","https://github.com/jawher71998"],["📄 CV (FR)",`${process.env.PUBLIC_URL}/CV_Jawher_Sbabti.pdf`],["📄 CV (EN)",`${process.env.PUBLIC_URL}/CV_Jawher_Sbabti_EN.pdf`]],
    heroStats: [["4","Internships"],["6","Certifications"],["950","TOSA Score"],["2","Degrees"]],
    aboutTitle: "About Me", aboutSub: "My journey, values and vision",
    aboutGreeting: "Hi, I'm Jawher 👋", aboutBadge: "✅ Open to Work",
    aboutTags: ["📊 Data Analyst","💻 Web Dev","🧪 QA Tester","🤖 ML","📈 Power BI"],
    aboutCvFr: "📄 CV (Français)", aboutCvEn: "📄 CV (English)",
    stagesTitle: "My Internships", stagesSub: "Work experience — click to view the certificate",
    stagesCta: "👁️ Click to view the certificate",
    certifTitle: "Certifications", certifSub: "My certifications, proof of my skills",
    certifCta: "👁️ Click to view the certificate", certifMissing: "Image", certifMissing2: "not found in public/",
    skillsTitle: "My Skills", skillsSub: "Technologies and tools I work with",
    projectsTitle: "My Projects", projectsSub: "Real-world work — click ▶️ to watch the video demo",
    projectsDemo: "▶️ Watch demo", projectsGithub: "🐙 View on GitHub", projectsPrivate: "🔒 Private code",
    videoTitleSuffix: " — Demo", videoFallback: "🎬 The video demo for this project will be available soon.", videoEsc: "Press Escape to close",
    contactTitle: "Get in Touch", contactSub: "Available for any professional opportunity",
    contactInfo: [["📧","Email","jawher.sbabti@gmail.com"],["📱","Phone","+216 28 880 558"],["📍","Location","Boumhel, Ben Arous, Tunisia"],["🚗","Mobility","Driving license B — Mobile"],["💼","Availability","Immediate — Open to Work"]],
    ph: { name:"Your name", email:"Your email", subject:"Subject", msg:"Your message" },
    statusLabel: { sending:"⏳ Sending…", sent:"✅ Message sent!", error:"🔁 Retry sending", idle:"🚀 Send message" },
    errRequired: "Please fill in your name, email and message before sending.",
    errEmail: "This email address isn't valid. Check it and try again.",
    errSend: "Sending failed. Please try again, or email me directly at ",
    okSend: "Thanks! I'll get back to you as soon as possible.",
    footerRole: "Data Analyst & Web Developer | Junior QA Tester",
    footerTagline: "Made with ❤️ in Tunisia 🇹🇳 • Built with React.js",
    scrollTop: "Back to top",
  },
};

/* ── MODAL CERTIF ── */
function CertifModal({ c, onClose, tt }) {
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#fff", borderRadius:18, padding:24, maxWidth:660, width:"100%", position:"relative", maxHeight:"90vh", overflowY:"auto" }}>
        <button onClick={onClose} style={{ position:"absolute", top:12, right:12, background:C.accent, color:"#fff", border:"none", borderRadius:"50%", width:34, height:34, fontSize:16, cursor:"pointer", fontWeight:700 }}>✕</button>
        <h3 style={{ marginBottom:8, color:C.secondary, paddingRight:44 }}>{c.title}</h3>
        <p style={{ color:"#666", marginBottom:16, fontSize:14 }}>{c.org} — {c.date}</p>
        <div style={{ background:C.light, borderRadius:12, overflow:"hidden" }}>
          <img 
            src={`${process.env.PUBLIC_URL}/${c.img}`} 
            alt={c.title} 
            style={{ width:"100%", display:"block", borderRadius:12 }}
            onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="block"; }} 
          />
          <div style={{ display:"none", padding:"40px 20px", textAlign:"center", color:"#999", fontSize:14 }}>
            📄 {tt.certifMissing} <strong style={{ color:C.secondary }}>{c.img}</strong> {tt.certifMissing2}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── MODAL VIDEO ── */
function VideoModal({ project, onClose, tt }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#111", borderRadius:18, padding:20, maxWidth:780, width:"100%", position:"relative" }}>
        <button onClick={onClose} aria-label="Close" style={{ position:"absolute", top:12, right:12, background:C.accent, color:"#fff", border:"none", borderRadius:"50%", width:34, height:34, fontSize:16, cursor:"pointer", fontWeight:700, zIndex:1 }}>✕</button>
        <h3 style={{ color:"#fff", marginBottom:12, paddingRight:44 }}>{project.title}{tt.videoTitleSuffix}</h3>
        <div style={{ background:"#222", borderRadius:12, overflow:"hidden", aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {failed ? (
            <div style={{ color:"#aaa", padding:40, textAlign:"center", fontSize:14 }}>
              {tt.videoFallback}
            </div>
          ) : (
            <video controls playsInline preload="metadata" style={{ display:"block", width:"100%", height:"100%", borderRadius:12 }}>
              <source src={`${process.env.PUBLIC_URL}/${project.video}`} type="video/mp4" onError={() => setFailed(true)} />
            </video>
          )}
        </div>
        <p style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginTop:10, textAlign:"center" }}>
          {tt.videoEsc}
        </p>
      </div>
    </div>
  );
}

/* ── NAV ── */
function Nav({ active, lang, setLang, tt }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const ids = ["accueil","about","stages","certif","skills","projects","contact"];
  const links = tt.navLinks.map((l,i)=>[l, ids[i]]);
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };

  const langSwitch = (mobile=false) => (
    <div style={{ display:"flex", background:mobile?"#f0f4f8":"rgba(44,62,80,0.06)", borderRadius:50, padding:3, gap:2 }}>
      {["fr","en"].map(l=>(
        <button key={l} onClick={()=>setLang(l)}
          style={{
            border:"none", cursor:"pointer", borderRadius:50, padding:mobile?"6px 12px":"4px 10px",
            fontSize:mobile?13:11, fontWeight:800, letterSpacing:0.5,
            background: lang===l ? grad : "transparent",
            color: lang===l ? "#fff" : C.secondary,
            transition:"all .2s"
          }}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <nav style={{ position:"fixed", top:0, width:"100%", zIndex:1000, background:scrolled?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.98)", backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)", boxShadow:scrolled?"0 4px 24px rgba(0,0,0,0.08)":"0 1px 0 rgba(0,0,0,0.05)", padding:scrolled?"0.6rem 1.5rem":"0.9rem 1.5rem", transition:"all .25s ease" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <button onClick={()=>go("accueil")} style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none", cursor:"pointer", padding:0 }}>
          <span style={{ width:34, height:34, borderRadius:10, background:grad, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:15, flexShrink:0 }}>JS</span>
          <span style={{ fontWeight:700, fontSize:14, color:C.secondary, display:"none" }} className="brand-name">Jawher Sbabti</span>
        </button>
        {/* Desktop */}
        <div style={{ display:"flex", gap:4, alignItems:"center" }} className="nav-desktop">
          <div style={{ display:"flex", gap:2, background:"rgba(44,62,80,0.05)", borderRadius:50, padding:4, marginRight:10 }}>
            {links.map(([l,id]) => (
              <button key={id} onClick={() => go(id)}
                style={{ background:active===id?"#fff":"none", boxShadow:active===id?"0 2px 8px rgba(0,0,0,0.08)":"none", border:"none", cursor:"pointer", fontWeight:700, fontSize:12.5, color:active===id?C.primary:"#555", borderRadius:50, padding:"7px 14px", transition:"all .2s" }}>
                {l}
              </button>
            ))}
          </div>
          {langSwitch()}
          <a href="https://linkedin.com/in/jawher-sbabti" target="_blank" rel="noreferrer" style={{ marginLeft:10, background:"#0077b5", color:"#fff", padding:"7px 13px", borderRadius:50, fontSize:12, fontWeight:700, textDecoration:"none" }}>💼 LinkedIn</a>
          <a href="https://github.com/jawher71998" target="_blank" rel="noreferrer" style={{ marginLeft:6, background:C.secondary, color:"#fff", padding:"7px 13px", borderRadius:50, fontSize:12, fontWeight:700, textDecoration:"none" }}>🐙 GitHub</a>
        </div>
        {/* Mobile: switch langue + hamburger */}
        <div style={{ display:"none", alignItems:"center", gap:10 }} className="nav-mobile-controls">
          {langSwitch(true)}
          <button onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menu" style={{ background:"none", border:"none", cursor:"pointer", fontSize:24, color:C.secondary, padding:0, lineHeight:1 }}>{menuOpen?"✕":"☰"}</button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background:"#fff", padding:"1rem 1.5rem", display:"flex", flexDirection:"column", gap:10, borderTop:"1px solid #eee", marginTop:"0.9rem" }}>
          {links.map(([l,id]) => (
            <button key={id} onClick={() => go(id)} style={{ background:active===id?C.light:"none", border:"none", cursor:"pointer", fontWeight:700, fontSize:15, color:active===id?C.primary:C.secondary, textAlign:"left", padding:"9px 12px", borderRadius:10 }}>{l}</button>
          ))}
          <div style={{ display:"flex", gap:10, marginTop:8 }}>
            <a href="https://linkedin.com/in/jawher-sbabti" target="_blank" rel="noreferrer" style={{ background:"#0077b5", color:"#fff", padding:"8px 14px", borderRadius:50, fontSize:13, fontWeight:700, textDecoration:"none" }}>💼 LinkedIn</a>
            <a href="https://github.com/jawher71998" target="_blank" rel="noreferrer" style={{ background:C.secondary, color:"#fff", padding:"8px 14px", borderRadius:50, fontSize:13, fontWeight:700, textDecoration:"none" }}>🐙 GitHub</a>
          </div>
        </div>
      )}
      <style>{`
        @media(min-width:1000px){ .brand-name{ display:inline-block!important; } }
        @media(max-width:768px){
          .nav-desktop{display:none!important}
          .nav-mobile-controls{display:flex!important}
        }
      `}</style>
    </nav>
  );
}

/* ── RETOUR EN HAUT ── */
function ScrollTop({ tt }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      aria-label={tt.scrollTop}
      title={tt.scrollTop}
      style={{
        position:"fixed", bottom:24, right:24, zIndex:999,
        width:46, height:46, borderRadius:"50%", border:"none", cursor:"pointer",
        background:grad, color:"#fff", fontSize:18, fontWeight:800,
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 8px 24px rgba(44,62,80,0.35)",
        opacity: show?1:0, transform: show?"translateY(0) scale(1)":"translateY(16px) scale(0.8)",
        pointerEvents: show?"auto":"none", transition:"all .3s ease"
      }}>
      ↑
    </button>
  );
}

/* ── HERO ── */
function Hero({ tt }) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    setTyped("");
    const t = setInterval(() => { i++; setTyped(tt.heroTyped.slice(0,i)); if (i>=tt.heroTyped.length) clearInterval(t); }, 45);
    return () => clearInterval(t);
  }, [tt.heroTyped]);
  return (
    <section id="accueil" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:grad, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 20% 50%,rgba(255,255,255,0.05),transparent 50%)" }} />
      <div style={{ textAlign:"center", color:"#fff", zIndex:1, padding:"2rem 1.5rem", maxWidth:800, width:"100%" }}>
        <div style={{ display:"inline-block", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", padding:"6px 18px", borderRadius:50, fontSize:13, marginBottom:20 }}>{tt.heroBadge}</div>
        <h1 style={{ fontSize:"clamp(2rem,7vw,3.8rem)", fontWeight:800, marginBottom:12, letterSpacing:-1 }}>Jawher Sbabti</h1>
        <div style={{ fontSize:"clamp(0.85rem,2.5vw,1.25rem)", fontWeight:400, opacity:.9, marginBottom:16, minHeight:30, fontFamily:"monospace" }}>
          {typed}<span style={{ animation:"blink 1s step-end infinite" }}>|</span>
        </div>
        <p style={{ fontSize:"clamp(.85rem,1.8vw,1.05rem)", maxWidth:620, margin:"0 auto 2rem", opacity:.85, lineHeight:1.85 }}>
          {tt===TXT.fr ? (
            <>Titulaire d'une <strong>Licence en Big Data & Analyse des Données</strong>, certifié <strong>TOSA Python Expert (950/1000)</strong> & <strong>ITS Databases (Certiport International)</strong>.</>
          ) : (
            <>Holder of a <strong>Bachelor's Degree in Big Data & Data Analysis</strong>, certified <strong>TOSA Python Expert (950/1000)</strong> & <strong>ITS Databases (Certiport International)</strong>.</>
          )}
        </p>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:40 }}>
          {tt.heroButtons.map(([lbl,href])=>(
            <a key={lbl} href={href} target={href.startsWith("http")||href.endsWith(".pdf")?"_blank":undefined} rel="noreferrer"
              onClick={e=>{ if(href.startsWith("#")){ e.preventDefault(); document.getElementById(href.slice(1))?.scrollIntoView({behavior:"smooth"}); }}}
              style={{ padding:"9px 18px", borderRadius:50, background:"rgba(255,255,255,0.15)", color:"#fff", border:"2px solid rgba(255,255,255,0.5)", fontWeight:700, fontSize:13, textDecoration:"none" }}>
              {lbl}
            </a>
          ))}
        </div>
        <div style={{ display:"flex", gap:"clamp(16px,5vw,40px)", justifyContent:"center", flexWrap:"wrap" }}>
          {tt.heroStats.map(([n,l])=>(
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontSize:"clamp(1.5rem,4vw,2rem)", fontWeight:800 }}>{n}</div>
              <div style={{ fontSize:"clamp(11px,1.5vw,13px)", opacity:.75 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </section>
  );
}

function Wrap({ id, bg="#fff", children }) {
  return <section id={id} style={{ padding:"4.5rem 1.5rem", background:bg }}><div style={{ maxWidth:1200, margin:"0 auto" }}>{children}</div></section>;
}

function Header({ title, sub }) {
  return (
    <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
      <h2 style={{ fontSize:"clamp(1.6rem,4vw,2.4rem)", fontWeight:800, color:C.secondary, marginBottom:6 }}>{title}</h2>
      <div style={{ width:60, height:4, background:grad, margin:"8px auto 12px", borderRadius:2 }} />
      {sub && <p style={{ color:"#777", fontSize:"clamp(13px,1.5vw,15px)" }}>{sub}</p>}
    </div>
  );
}

function About({ tt, lang }) {
  const [ref, vis] = useVisible();
  return (
    <Wrap id="about" bg={C.light}>
      <Header title={tt.aboutTitle} sub={tt.aboutSub} />
      <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"2.5rem", alignItems:"center", opacity:vis?1:0, transform:vis?"none":"translateY(30px)", transition:"all .7s ease" }}>
        <div style={{ textAlign:"center", position:"relative" }}>
          <img src={process.env.PUBLIC_URL + "/imagecvjawher.png"} alt="Jawher" style={{ width:"min(220px,60vw)", height:"min(220px,60vw)", borderRadius:"50%", objectFit:"cover", border:"8px solid #fff", boxShadow:"0 20px 60px rgba(0,0,0,0.15)", display:"block", margin:"0 auto" }} />
          <span style={{ display:"inline-block", marginTop:12, background:grad, color:"#fff", padding:"5px 14px", borderRadius:50, fontSize:12, fontWeight:700 }}>{tt.aboutBadge}</span>
        </div>
        <div>
          <h3 style={{ fontSize:"clamp(1.3rem,3vw,1.7rem)", marginBottom:12, color:C.secondary }}>{tt.aboutGreeting}</h3>
          {lang==="fr" ? (
            <>
              <p style={{ color:"#555", lineHeight:1.9, marginBottom:10, fontSize:"clamp(13px,1.5vw,15px)" }}>Diplômé d'une <strong>Licence en Big Data & Analyse des Données</strong> au Collège de Paris Tunis, passionné par la data et les technologies innovantes.</p>
              <p style={{ color:"#555", lineHeight:1.9, marginBottom:10, fontSize:"clamp(13px,1.5vw,15px)" }}>Fort de <strong>4 stages</strong> chez <strong>Bee Coders, Tunisair, Ola Energy et Tunisie Télécom</strong>, j'ai développé des compétences en Data Engineering, Machine Learning, développement web et QA Testing.</p>
              <p style={{ color:"#555", lineHeight:1.9, marginBottom:16, fontSize:"clamp(13px,1.5vw,15px)" }}>Certifié <strong>TOSA Python Expert (950/1000)</strong> et <strong>ITS Databases (Certiport International)</strong>, immédiatement opérationnel.</p>
            </>
          ) : (
            <>
              <p style={{ color:"#555", lineHeight:1.9, marginBottom:10, fontSize:"clamp(13px,1.5vw,15px)" }}>Graduate of a <strong>Bachelor's Degree in Big Data & Data Analysis</strong> from Collège de Paris Tunis, passionate about data and innovative technologies.</p>
              <p style={{ color:"#555", lineHeight:1.9, marginBottom:10, fontSize:"clamp(13px,1.5vw,15px)" }}>Backed by <strong>4 internships</strong> at <strong>Bee Coders, Tunisair, Ola Energy and Tunisie Télécom</strong>, I've built skills in Data Engineering, Machine Learning, Web Development and QA Testing.</p>
              <p style={{ color:"#555", lineHeight:1.9, marginBottom:16, fontSize:"clamp(13px,1.5vw,15px)" }}>Certified <strong>TOSA Python Expert (950/1000)</strong> and <strong>ITS Databases (Certiport International)</strong>, ready to contribute immediately.</p>
            </>
          )}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
            {tt.aboutTags.map(t=>(
              <span key={t} style={{ border:`2px solid ${C.primary}`, color:C.primary, padding:"4px 12px", borderRadius:50, fontSize:12, fontWeight:600 }}>{t}</span>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <a href={`${process.env.PUBLIC_URL}/CV_Jawher_Sbabti.pdf`} target="_blank" rel="noreferrer" style={{ background:grad, color:"#fff", padding:"10px 18px", borderRadius:50, fontWeight:700, textDecoration:"none", fontSize:13 }}>{tt.aboutCvFr}</a>
            <a href={`${process.env.PUBLIC_URL}/CV_Jawher_Sbabti_EN.pdf`} target="_blank" rel="noreferrer" style={{ background:"#fff", color:C.primary, border:`2px solid ${C.primary}`, padding:"8px 18px", borderRadius:50, fontWeight:700, textDecoration:"none", fontSize:13 }}>{tt.aboutCvEn}</a>
            <a href="https://linkedin.com/in/jawher-sbabti" target="_blank" rel="noreferrer" style={{ background:"#0077b5", color:"#fff", padding:"10px 18px", borderRadius:50, fontWeight:700, textDecoration:"none", fontSize:13 }}>💼 LinkedIn</a>
            <a href="https://github.com/jawher71998" target="_blank" rel="noreferrer" style={{ background:C.secondary, color:"#fff", padding:"10px 18px", borderRadius:50, fontWeight:700, textDecoration:"none", fontSize:13 }}>🐙 GitHub</a>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

function Internships({ tt, lang }) {
  const [modal, setModal] = useState(null);
  const [ref, vis] = useVisible();
  const stages = stagesByLang[lang];
  return (
    <Wrap id="stages">
      <Header title={tt.stagesTitle} sub={tt.stagesSub} />
      <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1.4rem", opacity:vis?1:0, transform:vis?"none":"translateY(30px)", transition:"all .7s" }}>
        {stages.map((s,i)=>(
          <div key={i} onClick={()=>setModal(s)}
            style={{ background:"#fff", padding:"1.5rem", borderRadius:16, boxShadow:"0 5px 20px rgba(0,0,0,0.06)", borderTop:`4px solid ${C.primary}`, cursor:"pointer", transition:"all .3s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 15px 40px rgba(0,0,0,0.12)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 5px 20px rgba(0,0,0,0.06)";}}>
            <h3 style={{ color:C.secondary, marginBottom:2, fontSize:"1.05rem" }}>{s.title}</h3>
            <p style={{ color:C.primary, fontWeight:700, fontSize:13, marginBottom:2 }}>{s.org}</p>
            <p style={{ color:"#aaa", fontSize:11, marginBottom:10 }}>{s.date}</p>
            <p style={{ color:"#666", fontSize:13, lineHeight:1.7 }}>{s.desc}</p>
            <p style={{ color:C.primary, fontSize:11, fontWeight:700, marginTop:10 }}>{tt.stagesCta}</p>
          </div>
        ))}
      </div>
      {modal && <CertifModal c={modal} onClose={()=>setModal(null)} tt={tt} />}
    </Wrap>
  );
}

function Certifications({ tt, lang }) {
  const [modal, setModal] = useState(null);
  const [ref, vis] = useVisible();
  const certifs = certifsByLang[lang];
  return (
    <Wrap id="certif">
      <Header title={tt.certifTitle} sub={tt.certifSub} />
      <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:"1.4rem", opacity:vis?1:0, transform:vis?"none":"translateY(30px)", transition:"all .7s" }}>
        {certifs.map((c,i)=>(
          <div key={i} onClick={()=>setModal(c)}
            style={{ background:C.light, borderRadius:16, padding:"1.5rem", borderLeft:`5px solid ${c.intl?C.accent:C.primary}`, cursor:"pointer", transition:"all .3s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,0.12)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none";}}>
            <span style={{ background:c.intl?"linear-gradient(135deg,#e74c3c,#c0392b)":grad, color:"#fff", padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700 }}>{c.badge}</span>
            <h3 style={{ color:C.secondary, margin:"10px 0 4px", fontSize:"1rem" }}>{c.title}</h3>
            <p style={{ color:"#666", fontSize:13 }}>{c.org}</p>
            {c.score && <div style={{ fontSize:"1.3rem", fontWeight:800, color:C.primary, margin:"4px 0" }}>{c.score}</div>}
            <p style={{ color:"#aaa", fontSize:11, marginTop:4 }}>{c.date}</p>
            <p style={{ color:C.primary, fontSize:11, fontWeight:700, marginTop:8 }}>{tt.certifCta}</p>
          </div>
        ))}
      </div>
      {modal && <CertifModal c={modal} onClose={()=>setModal(null)} tt={tt} />}
    </Wrap>
  );
}

function Skills({ tt, lang }) {
  const [ref, vis] = useVisible();
  const skills = skillsByLang[lang];
  return (
    <Wrap id="skills" bg={C.light}>
      <Header title={tt.skillsTitle} sub={tt.skillsSub} />
      <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:"1.5rem", opacity:vis?1:0, transform:vis?"none":"translateY(30px)", transition:"all .7s" }}>
        {skills.map((s,i)=>(
          <div key={i} style={{ background:"#fff", padding:"1.6rem", borderRadius:18, boxShadow:"0 5px 20px rgba(0,0,0,0.06)", borderTop:`4px solid ${C.primary}`, transition:"all .3s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)"; e.currentTarget.style.boxShadow="0 15px 40px rgba(0,0,0,0.12)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 5px 20px rgba(0,0,0,0.06)";}}>
            <h3 style={{ color:C.secondary, marginBottom:"1rem", fontSize:"1.05rem" }}>{s.icon} {s.title}</h3>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {s.tags.map(t=><span key={t} style={{ background:grad, color:"#fff", padding:"3px 9px", borderRadius:20, fontSize:11, fontWeight:600 }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </Wrap>
  );
}

function Projects({ tt, lang }) {
  const [videoProject, setVideoProject] = useState(null);
  const [ref, vis] = useVisible();
  const projects = projectsByLang[lang];
  return (
    <Wrap id="projects">
      <Header title={tt.projectsTitle} sub={tt.projectsSub} />
      <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))", gap:"1.8rem", opacity:vis?1:0, transform:vis?"none":"translateY(30px)", transition:"all .7s" }}>
        {projects.map((p,i)=>(
          <div key={i} style={{ background:"#fff", borderRadius:18, overflow:"hidden", boxShadow:"0 5px 25px rgba(0,0,0,0.08)", border:"1px solid #eee", transition:"all .3s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-10px)"; e.currentTarget.style.boxShadow="0 20px 50px rgba(0,0,0,0.15)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 5px 25px rgba(0,0,0,0.08)";}}>
            {/* Image / Video preview */}
            <div style={{ height:160, background:p.g, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
              <span style={{ fontSize:"3rem" }}>{p.icon}</span>
              {/* Bouton play vidéo */}
              <button onClick={()=>setVideoProject(p)}
                style={{ position:"absolute", bottom:12, right:12, background:"rgba(0,0,0,0.7)", color:"#fff", border:"2px solid #fff", borderRadius:50, padding:"6px 14px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6, backdropFilter:"blur(4px)", transition:"all .3s" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(52,152,219,0.9)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,0.7)"}>
                {tt.projectsDemo}
              </button>
            </div>
                          <div style={{ padding:"1.5rem" }}>
              <h3 style={{ color:C.secondary, marginBottom:8, fontSize:"1.05rem" }}>{p.title}</h3>
              <p style={{ color:"#666", marginBottom:12, fontSize:13, lineHeight:1.7 }}>{p.desc}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
                {p.tech.map(t=><span key={t} style={{ background:C.light, padding:"3px 9px", borderRadius:20, fontSize:11, color:C.primary, fontWeight:600 }}>{t}</span>)}
              </div>
              {p.github ? (
                <a href={p.github} target="_blank" rel="noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.secondary, color:"#fff", padding:"6px 14px", borderRadius:50, fontSize:12, fontWeight:700, textDecoration:"none" }}>
                  {tt.projectsGithub}
                </a>
              ) : (
                <span style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#eee", color:"#888", padding:"6px 14px", borderRadius:50, fontSize:12, fontWeight:700 }}>
                  {tt.projectsPrivate}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {videoProject && <VideoModal project={videoProject} onClose={()=>setVideoProject(null)} tt={tt} />}
    </Wrap>
  );
}

function Contact({ tt }) {
  const empty = { name:"", email:"", subject:"", msg:"", website:"" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const [ref, vis] = useVisible();
  const update = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (status === "sending") return;
    if (form.website) return; // champ piège anti-spam : un humain ne le remplit pas
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim()) {
      setError(tt.errRequired);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError(tt.errEmail);
      return;
    }
    setError("");

    // Sans identifiant Formspree : on ouvre le client mail du visiteur.
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(form.subject.trim() || `Message de ${form.name.trim()} via le portfolio`);
      const body = encodeURIComponent(`${form.msg.trim()}\n\n— ${form.name.trim()} (${form.email.trim()})`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          _subject: form.subject.trim() || "Nouveau message depuis le portfolio",
          message: form.msg.trim(),
        }),
      });
      if (!res.ok) throw new Error("Envoi refusé");
      setStatus("sent");
      setForm(empty);
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  const inp = { padding:"12px 16px", borderRadius:12, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:14, fontFamily:"inherit", width:"100%", outline:"none", boxSizing:"border-box" };
  const label = tt.statusLabel[status];

  return (
    <Wrap id="contact" bg={C.secondary}>
      <Header title={tt.contactTitle} sub={tt.contactSub} />
      <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"2.5rem", opacity:vis?1:0, transform:vis?"none":"translateY(30px)", transition:"all .7s" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {tt.contactInfo.map(([ic,lbl,val])=>(
            <div key={lbl} style={{ display:"flex", alignItems:"center", gap:12, padding:"0.9rem 1.1rem", background:"rgba(255,255,255,0.05)", borderRadius:12, transition:"background .3s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}>
              <div style={{ width:44, height:44, borderRadius:"50%", background:grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", flexShrink:0 }}>{ic}</div>
              <div><div style={{ fontSize:11, color:"rgba(255,255,255,0.6)", marginBottom:2 }}>{lbl}</div><div style={{ color:"#fff", fontWeight:600, fontSize:13 }}>{val}</div></div>
            </div>
          ))}
          <div style={{ display:"flex", gap:10, marginTop:8, flexWrap:"wrap" }}>
            <a href="https://linkedin.com/in/jawher-sbabti" target="_blank" rel="noreferrer" style={{ background:"#0077b5", color:"#fff", padding:"10px 16px", borderRadius:50, fontWeight:700, textDecoration:"none", fontSize:13 }}>💼 LinkedIn</a>
            <a href="https://github.com/jawher71998" target="_blank" rel="noreferrer" style={{ background:"#fff", color:C.secondary, padding:"10px 16px", borderRadius:50, fontWeight:700, textDecoration:"none", fontSize:13 }}>🐙 GitHub</a>
          </div>
        </div>
        <form onSubmit={handleSubmit} noValidate style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          <input aria-label={tt.ph.name} placeholder={tt.ph.name} autoComplete="name" value={form.name} onChange={update("name")} style={inp} />
          <input aria-label={tt.ph.email} type="email" placeholder={tt.ph.email} autoComplete="email" value={form.email} onChange={update("email")} style={inp} />
          <input aria-label={tt.ph.subject} placeholder={tt.ph.subject} value={form.subject} onChange={update("subject")} style={inp} />
          <textarea aria-label={tt.ph.msg} rows={5} placeholder={tt.ph.msg} value={form.msg} onChange={update("msg")} style={{ ...inp, resize:"vertical" }} />
          {/* Champ piège anti-spam, invisible pour les humains */}
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={update("website")} style={{ position:"absolute", left:"-9999px", width:1, height:1, opacity:0 }} />
          <button type="submit" disabled={status==="sending"} style={{ background:grad, color:"#fff", padding:"14px", borderRadius:12, border:"none", fontSize:15, fontWeight:700, cursor:status==="sending"?"wait":"pointer", opacity:status==="sending"?0.7:1, transition:"all .3s" }}>
            {label}
          </button>
          <div role="status" aria-live="polite" style={{ minHeight:20, fontSize:13, textAlign:"center" }}>
            {error && <span style={{ color:"#ff8a80" }}>{error}</span>}
            {status==="error" && !error && <span style={{ color:"#ff8a80" }}>{tt.errSend}{CONTACT_EMAIL}.</span>}
            {status==="sent" && <span style={{ color:"#a5d6a7" }}>{tt.okSend}</span>}
          </div>
        </form>
      </div>
    </Wrap>
  );
}

function Footer({ tt }) {
  return (
    <footer style={{ background:"#111", color:"rgba(255,255,255,0.7)", textAlign:"center", padding:"2rem 1.5rem" }}>
      <p style={{ marginBottom:12, fontSize:"clamp(12px,1.5vw,14px)" }}>© 2026 <span style={{ color:C.primary, fontWeight:700 }}>Jawher Sbabti</span> — {tt.footerRole}</p>
      <div style={{ display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap", marginBottom:10 }}>
        <a href="https://linkedin.com/in/jawher-sbabti" target="_blank" rel="noreferrer" style={{ color:C.primary, textDecoration:"none", fontWeight:600 }}>💼 LinkedIn</a>
        <a href="https://github.com/jawher71998" target="_blank" rel="noreferrer" style={{ color:C.primary, textDecoration:"none", fontWeight:600 }}>🐙 GitHub</a>
        <a href="mailto:jawher.sbabti@gmail.com" style={{ color:C.primary, textDecoration:"none", fontWeight:600 }}>📧 Email</a>
      </div>
      <p style={{ opacity:.5, fontSize:13 }}>{tt.footerTagline}</p>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("accueil");
  const [lang, setLang] = useState("fr");
  const tt = TXT[lang];
  useEffect(() => {
    const ids = ["accueil","about","stages","certif","skills","projects","contact"];
    const o = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold:0.25 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) o.observe(el); });
    return () => o.disconnect();
  }, []);
  return (
    <div style={{ fontFamily:"'Segoe UI',Tahoma,Geneva,Verdana,sans-serif", overflowX:"hidden" }}>
      <Nav active={active} lang={lang} setLang={setLang} tt={tt} />
      <div style={{ paddingTop:0 }}>
        <Hero tt={tt} />
        <About tt={tt} lang={lang} />
        <Internships tt={tt} lang={lang} />
        <Certifications tt={tt} lang={lang} />
        <Skills tt={tt} lang={lang} />
        <Projects tt={tt} lang={lang} />
        <Contact tt={tt} />
        <Footer tt={tt} />
      </div>
      <ScrollTop tt={tt} />
    </div>
  );
}