import { useState, useEffect, useRef } from "react";

const C = {
  primary: "#3498db",
  secondary: "#2c3e50",
  accent: "#e74c3c",
  light: "#f0f4f8",
};
const grad = "linear-gradient(135deg,#2c3e50 0%,#3498db 100%)";
const grad2 = "linear-gradient(135deg,#667eea 0%,#764ba2 100%)";

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

const certifs = [
  { badge:"🌍 Internationale", title:"ITS Databases", org:"Certiport / Pearson VUE", date:"Mai 2026", intl:true, img:"certif_its_databases.jpg" },
  { badge:"🏆 Expert", title:"TOSA Python 3", org:"Isograd — Niveau Expert", date:"Avril 2026", score:"950/1000", intl:true, img:"certif_tosa_python.jpg" },
  { badge:"📊 BI", title:"Data Analysis Power BI", org:"CodeQuest — 40h", date:"Février 2026", img:"certif_powerbi.jpg" },
  { badge:"💻 Dev Web", title:"Développement Web Niv.1", org:"Opus Lab — 50h", date:"Déc. 2025 – Avr. 2026", img:"certif_devweb_opuslab.jpg" },
  { badge:"🏅 Distinction", title:"Challenge IPSET", org:"Création de projets informatiques", date:"Juin 2025", img:"certif_challenge_ipset.jpg" },
  { badge:"🤝 Soft Skills", title:"Attestation Soft Skills", org:"ANETI / ACJEMP", date:"Décembre 2023", img:"certif_softskills.jpg" },
];

const skills = [
  { icon:"🌐", title:"Développement Web", tags:["HTML5","CSS3","JavaScript","React.js","Node.js","Express.js"] },
  { icon:"⚙️", title:"Langages", tags:["Python","Java","C#","Visual Basic","SQL"] },
  { icon:"📊", title:"Data & BI", tags:["Power BI","Talend","ETL","Jupyter","DataWarehouse","DAX"] },
  { icon:"🗄️", title:"Bases de Données", tags:["SQL Server","MySQL","Oracle","PostgreSQL"] },
  { icon:"🧪", title:"Tests & QA", tags:["Selenium","Tests Fonctionnels","Tests Manuels","Bug Tracking"] },
  { icon:"🛠️", title:"Outils & DevOps", tags:["Docker","Git/GitHub","Postman","GLPI","Agile/Scrum","CRISP-DM"] },
];

const projects = [
  {
    icon:"📊", title:"Prédiction Ventes & Stocks", g:grad,
    desc:"Pipeline ETL Talend, modèles ML (Random Forest & Prophet), dashboard Power BI avec KPIs (SS, PC, EOQ). — Bee Coders",
    tech:["Talend","Power BI","Python","ML","MySQL","ETL"],
    video:"demo_bee_coders.mp4"
  },
  {
    icon:"💰", title:"Gestion Avances en Devises", g:grad2,
    desc:"Application complète pour Tunisair. Modélisation BDD, interfaces utilisateur, support 50+ utilisateurs.",
    tech:["Java","MySQL","UML","Merise"],
    video:"demo_tunisair.mp4"
  },
  {
    icon:"📋", title:"Gestion des Réclamations", g:grad,
    desc:"Application desktop réduisant le traitement des demandes de 40%. — Ola Energy",
    tech:["C#",".NET","SQL Server"],
    video:"demo_ola_energy.mp4"
  },
  {
    icon:"✈️", title:"Site Agence de Voyage", g:grad2,
    desc:"Site responsive avec réservation en ligne et interface d'administration.",
    tech:["HTML5","CSS3","JavaScript","MySQL"],
    video:"demo_agence_voyage.mp4"
  },
  {
    icon:"📱", title:"ProManage", g:grad,
    desc:"Application de gestion de projets avec suivi des tâches et dashboards personnalisés.",
    tech:["React.js","Node.js","Express.js","MongoDB"],
    video:"demo_promanage.mp4"
  },
  {
    icon:"🌐", title:"Portfolio Personnel", g:grad2,
    desc:"Portfolio React.js moderne présentant mon parcours, certifications et projets.",
    tech:["React.js","HTML5","CSS3","JavaScript"],
    video:"demo_portfolio.mp4"
  },
];

/* ── MODAL CERTIF ── */
function CertifModal({ c, onClose }) {
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
            src={`/${c.img}`} 
            alt={c.title} 
            style={{ width:"100%", display:"block", borderRadius:12 }}
            onError={e=>{ 
              e.target.style.display="none"; 
              e.target.nextSibling.style.display="block"; 
            }} 
          />
        <div style={{ display:"none", padding:"40px 20px", textAlign:"center", color:"#999", fontSize:14 }}>
          📄 Image <strong>{c.img}</strong> introuvable
        </div>
      </div>
      </div>
    </div>
  );
}

/* ── MODAL VIDEO ── */
function VideoModal({ project, onClose }) {
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#111", borderRadius:18, padding:20, maxWidth:780, width:"100%", position:"relative" }}>
        <button onClick={onClose} style={{ position:"absolute", top:12, right:12, background:C.accent, color:"#fff", border:"none", borderRadius:"50%", width:34, height:34, fontSize:16, cursor:"pointer", fontWeight:700, zIndex:1 }}>✕</button>
        <h3 style={{ color:"#fff", marginBottom:12, paddingRight:44 }}>{project.title} — Démo</h3>
        <div style={{ background:"#222", borderRadius:12, overflow:"hidden", aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <video controls width="100%" style={{ display:"block", borderRadius:12 }}>
            <source src={project.video} type="video/mp4" />
            <div style={{ color:"#aaa", padding:40, textAlign:"center" }}>
              🎬 Placez <strong style={{ color:"#fff" }}>{project.video}</strong> dans le dossier du projet pour afficher la vidéo de démo.
            </div>
          </video>
        </div>
        <p style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginTop:10, textAlign:"center" }}>
          Fichier vidéo : {project.video} • Appuyez sur Échap pour fermer
        </p>
      </div>
    </div>
  );
}

/* ── NAV ── */
function Nav({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [["Accueil","accueil"],["À propos","about"],["Certifications","certif"],["Compétences","skills"],["Projets","projects"],["Contact","contact"]];
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };
  return (
    <nav style={{ position:"fixed", top:0, width:"100%", zIndex:1000, background:"rgba(255,255,255,0.97)", boxShadow:"0 2px 20px rgba(0,0,0,0.08)", padding:"0.75rem 1.5rem" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontWeight:800, fontSize:22, background:grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>JS</span>
        {/* Desktop */}
        <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }} className="nav-desktop">
          {links.map(([l,id]) => (
            <button key={id} onClick={() => go(id)} style={{ background:"none", border:"none", cursor:"pointer", fontWeight:600, fontSize:13, color:active===id?C.primary:C.secondary, borderBottom:active===id?`2px solid ${C.primary}`:"2px solid transparent", paddingBottom:2, transition:"all .2s" }}>{l}</button>
          ))}
          <a href="https://linkedin.com/in/jawher-sbabti" target="_blank" rel="noreferrer" style={{ background:"#0077b5", color:"#fff", padding:"6px 12px", borderRadius:50, fontSize:12, fontWeight:700, textDecoration:"none" }}>💼 LinkedIn</a>
          <a href="https://github.com/jawher71998" target="_blank" rel="noreferrer" style={{ background:C.secondary, color:"#fff", padding:"6px 12px", borderRadius:50, fontSize:12, fontWeight:700, textDecoration:"none" }}>🐙 GitHub</a>
        </div>
        {/* Hamburger mobile */}
        <button onClick={()=>setMenuOpen(!menuOpen)} style={{ display:"none", background:"none", border:"none", cursor:"pointer", fontSize:24, color:C.secondary }} className="hamburger">☰</button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background:"#fff", padding:"1rem 1.5rem", display:"flex", flexDirection:"column", gap:12, borderTop:"1px solid #eee" }}>
          {links.map(([l,id]) => (
            <button key={id} onClick={() => go(id)} style={{ background:"none", border:"none", cursor:"pointer", fontWeight:600, fontSize:15, color:active===id?C.primary:C.secondary, textAlign:"left", padding:"6px 0" }}>{l}</button>
          ))}
          <div style={{ display:"flex", gap:10, marginTop:8 }}>
            <a href="https://linkedin.com/in/jawher-sbabti" target="_blank" rel="noreferrer" style={{ background:"#0077b5", color:"#fff", padding:"8px 14px", borderRadius:50, fontSize:13, fontWeight:700, textDecoration:"none" }}>💼 LinkedIn</a>
            <a href="https://github.com/jawher71998" target="_blank" rel="noreferrer" style={{ background:C.secondary, color:"#fff", padding:"8px 14px", borderRadius:50, fontSize:13, fontWeight:700, textDecoration:"none" }}>🐙 GitHub</a>
          </div>
        </div>
      )}
      <style>{`
        @media(max-width:768px){
          .nav-desktop{display:none!important}
          .hamburger{display:block!important}
        }
      `}</style>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  const [typed, setTyped] = useState("");
  const full = "Data Analyst & Développeur Web | QA Testeur Junior";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { i++; setTyped(full.slice(0,i)); if (i>=full.length) clearInterval(t); }, 45);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="accueil" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:grad, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 20% 50%,rgba(255,255,255,0.05),transparent 50%)" }} />
      <div style={{ textAlign:"center", color:"#fff", zIndex:1, padding:"2rem 1.5rem", maxWidth:800, width:"100%" }}>
        <div style={{ display:"inline-block", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", padding:"6px 18px", borderRadius:50, fontSize:13, marginBottom:20 }}>🚀 Disponible pour de nouvelles opportunités</div>
        <h1 style={{ fontSize:"clamp(2rem,7vw,3.8rem)", fontWeight:800, marginBottom:12, letterSpacing:-1 }}>Jawher Sbabti</h1>
        <div style={{ fontSize:"clamp(0.85rem,2.5vw,1.25rem)", fontWeight:400, opacity:.9, marginBottom:16, minHeight:30, fontFamily:"monospace" }}>
          {typed}<span style={{ animation:"blink 1s step-end infinite" }}>|</span>
        </div>
        <p style={{ fontSize:"clamp(.85rem,1.8vw,1.05rem)", maxWidth:620, margin:"0 auto 2rem", opacity:.85, lineHeight:1.85 }}>
          Titulaire d'une <strong>Licence en Big Data & Analyse des Données</strong>, certifié <strong>TOSA Python Expert (950/1000)</strong> & <strong>ITS Databases (Certiport International)</strong>.
        </p>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:40 }}>
          {[["📂 Projets","#projects"],["✉️ Contact","#contact"],["💼 LinkedIn","https://linkedin.com/in/jawher-sbabti"],["🐙 GitHub","https://github.com/jawher71998"],["📄 Mon CV","CV_Jawher_Sbabti.pdf"]].map(([lbl,href])=>(
            <a key={lbl} href={href} target={href.startsWith("http")||href.endsWith(".pdf")?"_blank":undefined} rel="noreferrer"
              onClick={e=>{ if(href.startsWith("#")){ e.preventDefault(); document.getElementById(href.slice(1))?.scrollIntoView({behavior:"smooth"}); }}}
              style={{ padding:"9px 18px", borderRadius:50, background:"rgba(255,255,255,0.15)", color:"#fff", border:"2px solid rgba(255,255,255,0.5)", fontWeight:700, fontSize:13, textDecoration:"none" }}>
              {lbl}
            </a>
          ))}
        </div>
        <div style={{ display:"flex", gap:"clamp(16px,5vw,40px)", justifyContent:"center", flexWrap:"wrap" }}>
          {[["4","Stages"],["6","Certifications"],["950","Score TOSA"],["2","Diplômes"]].map(([n,l])=>(
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

function About() {
  const [ref, vis] = useVisible();
  return (
    <Wrap id="about" bg={C.light}>
      <Header title="À propos de moi" sub="Mon parcours, mes valeurs et ma vision" />
      <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"2.5rem", alignItems:"center", opacity:vis?1:0, transform:vis?"none":"translateY(30px)", transition:"all .7s ease" }}>
        <div style={{ textAlign:"center", position:"relative" }}>
          <img src="imagecvjawher.png" alt="Jawher" style={{ width:"min(220px,60vw)", height:"min(220px,60vw)", borderRadius:"50%", objectFit:"cover", border:"8px solid #fff", boxShadow:"0 20px 60px rgba(0,0,0,0.15)", display:"block", margin:"0 auto" }} />
          <span style={{ display:"inline-block", marginTop:12, background:grad, color:"#fff", padding:"5px 14px", borderRadius:50, fontSize:12, fontWeight:700 }}>✅ Open to Work</span>
        </div>
        <div>
          <h3 style={{ fontSize:"clamp(1.3rem,3vw,1.7rem)", marginBottom:12, color:C.secondary }}>Bonjour, je suis Jawher 👋</h3>
          <p style={{ color:"#555", lineHeight:1.9, marginBottom:10, fontSize:"clamp(13px,1.5vw,15px)" }}>Diplômé d'une <strong>Licence en Big Data & Analyse des Données</strong> au Collège de Paris Tunis, passionné par la data et les technologies innovantes.</p>
          <p style={{ color:"#555", lineHeight:1.9, marginBottom:10, fontSize:"clamp(13px,1.5vw,15px)" }}>Fort de <strong>4 stages</strong> chez <strong>Bee Coders, Tunisair, Ola Energy et Tunisie Télécom</strong>, j'ai développé des compétences en Data Engineering, Machine Learning, développement web et QA Testing.</p>
          <p style={{ color:"#555", lineHeight:1.9, marginBottom:16, fontSize:"clamp(13px,1.5vw,15px)" }}>Certifié <strong>TOSA Python Expert (950/1000)</strong> et <strong>ITS Databases (Certiport International)</strong>, immédiatement opérationnel.</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
            {["📊 Data Analyst","💻 Dev Web","🧪 QA Testeur","🤖 ML","📈 Power BI"].map(t=>(
              <span key={t} style={{ border:`2px solid ${C.primary}`, color:C.primary, padding:"4px 12px", borderRadius:50, fontSize:12, fontWeight:600 }}>{t}</span>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <a href="CV_Jawher_Sbabti.pdf" target="_blank" rel="noreferrer" style={{ background:grad, color:"#fff", padding:"10px 18px", borderRadius:50, fontWeight:700, textDecoration:"none", fontSize:13 }}>📄 Télécharger CV</a>
            <a href="https://linkedin.com/in/jawher-sbabti" target="_blank" rel="noreferrer" style={{ background:"#0077b5", color:"#fff", padding:"10px 18px", borderRadius:50, fontWeight:700, textDecoration:"none", fontSize:13 }}>💼 LinkedIn</a>
            <a href="https://github.com/jawher71998" target="_blank" rel="noreferrer" style={{ background:C.secondary, color:"#fff", padding:"10px 18px", borderRadius:50, fontWeight:700, textDecoration:"none", fontSize:13 }}>🐙 GitHub</a>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

function Certifications() {
  const [modal, setModal] = useState(null);
  const [ref, vis] = useVisible();
  return (
    <Wrap id="certif">
      <Header title="Certifications" sub="Mes certifications qui prouvent mes compétences" />
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
            <p style={{ color:C.primary, fontSize:11, fontWeight:700, marginTop:8 }}>👁️ Cliquer pour voir le certificat</p>
          </div>
        ))}
      </div>
      {modal && <CertifModal c={modal} onClose={()=>setModal(null)} />}
    </Wrap>
  );
}

function Skills() {
  const [ref, vis] = useVisible();
  return (
    <Wrap id="skills" bg={C.light}>
      <Header title="Mes Compétences" sub="Technologies et outils que je maîtrise" />
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

function Projects() {
  const [videoProject, setVideoProject] = useState(null);
  const [ref, vis] = useVisible();
  return (
    <Wrap id="projects">
      <Header title="Mes Projets" sub="Réalisations concrètes — cliquez sur ▶️ pour voir la démo vidéo" />
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
                ▶️ Voir la démo
              </button>
            </div>
            <div style={{ padding:"1.5rem" }}>
              <h3 style={{ color:C.secondary, marginBottom:8, fontSize:"1.05rem" }}>{p.title}</h3>
              <p style={{ color:"#666", marginBottom:12, fontSize:13, lineHeight:1.7 }}>{p.desc}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {p.tech.map(t=><span key={t} style={{ background:C.light, padding:"3px 9px", borderRadius:20, fontSize:11, color:C.primary, fontWeight:600 }}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {videoProject && <VideoModal project={videoProject} onClose={()=>setVideoProject(null)} />}
    </Wrap>
  );
}

function Contact() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", msg:"" });
  const [sent, setSent] = useState(false);
  const [ref, vis] = useVisible();
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.msg) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name:"", email:"", subject:"", msg:"" });
  };
  const inp = { padding:"12px 16px", borderRadius:12, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:14, fontFamily:"inherit", width:"100%", outline:"none", boxSizing:"border-box" };
  return (
    <Wrap id="contact" bg={C.secondary}>
      <Header title="Contactez-moi" sub="Je suis disponible pour toute opportunité professionnelle" />
      <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"2.5rem", opacity:vis?1:0, transform:vis?"none":"translateY(30px)", transition:"all .7s" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {[["📧","Email","jawher.sbabti@gmail.com"],["📱","Téléphone","+216 28 880 558"],["📍","Localisation","Boumhel, Ben Arous, Tunisie"],["🚗","Mobilité","Permis B — Mobile"],["💼","Disponibilité","Immédiate — Open to Work"]].map(([ic,lbl,val])=>(
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
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          <input placeholder="Votre nom" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inp} />
          <input type="email" placeholder="Votre email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inp} />
          <input placeholder="Sujet" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} style={inp} />
          <textarea rows={5} placeholder="Votre message" value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} style={{ ...inp, resize:"vertical" }} />
          <button onClick={handleSubmit} style={{ background:grad, color:"#fff", padding:"14px", borderRadius:12, border:"none", fontSize:15, fontWeight:700, cursor:"pointer", transition:"all .3s" }}>
            {sent ? "✅ Message envoyé !" : "🚀 Envoyer le message"}
          </button>
        </div>
      </div>
    </Wrap>
  );
}

function Footer() {
  return (
    <footer style={{ background:"#111", color:"rgba(255,255,255,0.7)", textAlign:"center", padding:"2rem 1.5rem" }}>
      <p style={{ marginBottom:12, fontSize:"clamp(12px,1.5vw,14px)" }}>© 2026 <span style={{ color:C.primary, fontWeight:700 }}>Jawher Sbabti</span> — Data Analyst & Développeur Web | QA Testeur Junior</p>
      <div style={{ display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap", marginBottom:10 }}>
        <a href="https://linkedin.com/in/jawher-sbabti" target="_blank" rel="noreferrer" style={{ color:C.primary, textDecoration:"none", fontWeight:600 }}>💼 LinkedIn</a>
        <a href="https://github.com/jawher71998" target="_blank" rel="noreferrer" style={{ color:C.primary, textDecoration:"none", fontWeight:600 }}>🐙 GitHub</a>
        <a href="mailto:jawher.sbabti@gmail.com" style={{ color:C.primary, textDecoration:"none", fontWeight:600 }}>📧 Email</a>
      </div>
      <p style={{ opacity:.5, fontSize:13 }}>Fait avec ❤️ en Tunisie 🇹🇳 • Built with React.js</p>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("accueil");
  useEffect(() => {
    const ids = ["accueil","about","certif","skills","projects","contact"];
    const o = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold:0.25 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) o.observe(el); });
    return () => o.disconnect();
  }, []);
  return (
    <div style={{ fontFamily:"'Segoe UI',Tahoma,Geneva,Verdana,sans-serif", overflowX:"hidden" }}>
      <Nav active={active} />
      <div style={{ paddingTop:0 }}>
        <Hero />
        <About />
        <Certifications />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}