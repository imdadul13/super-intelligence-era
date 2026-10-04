import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Copy, Check, Activity, Radio, LockKeyhole } from 'lucide-react';

// Populate these values when the community's official links and token details are ready.
const projectConfig: { contractAddress: string; pumpfunUrl: string; xUrl: string; telegramUrl: string } = { contractAddress: '', pumpfunUrl: '', xUrl: '', telegramUrl: '' };
const CONTRACT_ADDRESS = projectConfig.contractAddress;
const PUMPFUN_URL = projectConfig.pumpfunUrl;
const X_URL = projectConfig.xUrl;
const TELEGRAM_URL = projectConfig.telegramUrl;

const nav = [{ label: 'ERA', href: '#era' }, { label: 'MANIFESTO', href: '#manifesto' }, { label: 'ARCHIVE', href: '#archive' }, { label: 'INTELLIGENCE', href: '#intelligence' }];
const archive = [
  { id: 'ARC—001', date: 'FIELD NOTE 01', signal: 'A new vocabulary for a new frontier.', type: 'CULTURE' },
  { id: 'ARC—002', date: 'FIELD NOTE 02', signal: 'The boundary between tool and collaborator shifts.', type: 'INTELLIGENCE' },
  { id: 'ARC—003', date: 'FIELD NOTE 03', signal: 'Computation becomes a cultural force.', type: 'COMPUTING' },
];
const feed = [
  { source: 'SIE OBSERVATORY', time: 'SIGNAL 001', category: 'CONCEPT', title: 'What happens when intelligence becomes the interface?' },
  { source: 'SIE OBSERVATORY', time: 'SIGNAL 002', category: 'CULTURE', title: 'A living archive of ideas shaping the next era.' },
  { source: 'SIE OBSERVATORY', time: 'SIGNAL 003', category: 'COMPUTING', title: 'The future is a question worth keeping open.' },
];

function Brand() { return <a className="brand" href="#era" aria-label="SIE home"><span className="brand-mark">S<span>.</span></span><span className="brand-name">SUPER INTELLIGENCE ERA</span></a>; }
function Eyebrow({ children }: { children: React.ReactNode }) { return <div className="eyebrow"><span className="eyebrow-dot" />{children}</div>; }
function SectionTag({ children }: { children: React.ReactNode }) { return <p className="section-tag">{children}</p>; }

function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="nav-wrap"><nav className="nav container" aria-label="Main navigation">
    <Brand />
    <div className={`nav-links ${open ? 'is-open' : ''}`}>
      {nav.map(item => <a key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      <div className="mobile-social"><a href={X_URL || '#community'}>X <ArrowUpRight size={13}/></a><a href={TELEGRAM_URL || '#community'}>TELEGRAM <ArrowUpRight size={13}/></a></div>
    </div>
    <div className="nav-actions"><a className="social-link" href={X_URL || '#community'} aria-label="X community">X <ArrowUpRight size={12}/></a><a className="social-link" href={TELEGRAM_URL || '#community'}>TELEGRAM <ArrowUpRight size={12}/></a><a className="nav-cta" href="#community">ENTER ERA <ArrowRight size={14}/></a></div>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
  </nav></header>;
}

function SignalGraphic() {
  return <div className="signal-graphic" aria-hidden="true"><div className="signal-orbit orbit-one"/><div className="signal-orbit orbit-two"/><div className="signal-orbit orbit-three"/><div className="signal-core"><span>SI</span><i/></div><span className="coord coord-a">37° 46′ 49.3″ N</span><span className="coord coord-b">122° 25′ 09.7″ W</span><span className="coord coord-c">SIGNAL FIELD / 01</span><span className="coord coord-d">SIE—SYS—2026</span><div className="crosshair cross-a">+</div><div className="crosshair cross-b">+</div><div className="signal-sweep"/></div>;
}
function Hero() {
  return <section className="hero" id="era"><div className="hero-grid"/><div className="hero-grain"/><div className="container hero-inner">
    <div className="hero-meta"><Eyebrow>SIE <span className="slash">//</span> 2026</Eyebrow><span className="mono">INTELLIGENCE SYSTEM <span className="meta-sep">/</span> STATUS: <b className="online">ONLINE</b></span></div>
    <SignalGraphic />
    <div className="hero-copy"><p className="hero-kicker">AN IDEA FOR WHAT COMES NEXT</p><h1><span>THE</span><span className="hero-title-main">SUPER<br/>INTELLIGENCE</span><span className="hero-era">ERA<span className="hero-period">.</span></span></h1><div className="hero-bottom"><div><p className="hero-thesis">AI was the beginning.<br/><span>SI is the era.</span></p><div className="hero-ctas"><a className="button button-primary" href="#shift">ENTER THE ERA <ArrowRight size={15}/></a><a className="text-link" href="#intelligence">VIEW INTELLIGENCE <ArrowDown size={14}/></a></div></div><div className="hero-status mono"><span>ERA STATUS</span><strong><i className="status-light"/> ACTIVE</strong></div></div></div>
    <div className="hero-index mono"><span>AN OPEN CULTURAL SIGNAL</span><span>01 — 09</span></div>
  </div></section>;
}
function ShiftSection() {
  return <section className="section shift-section" id="shift"><div className="container"><SectionTag>01 <span>//</span> THE SHIFT</SectionTag><div className="shift-head"><h2>FROM ARTIFICIAL<br/><span>TO SUPER.</span></h2><p className="shift-intro">Every technological era has a moment when the old vocabulary stops being enough.</p></div>
    <div className="shift-diagram"><div className="shift-state old-state"><span className="shift-monogram">AI</span><div><b>ARTIFICIAL INTELLIGENCE</b><small>THE BEGINNING</small></div></div><div className="shift-connector"><span/><ArrowDown size={18}/><span/></div><div className="shift-state new-state"><span className="shift-monogram">SI</span><div><b>SUPER INTELLIGENCE</b><small>THE NEXT FRONTIER</small></div><span className="state-index">01</span></div></div>
    <div className="shift-foot"><span className="mono">A CHANGE IN PERSPECTIVE</span><p>AI defined the beginning.<br/><strong>Super Intelligence defines what comes next.</strong></p></div>
  </div></section>;
}
function SystemStatus() {
  const rows = [['ERA','ACTIVE'],['INTELLIGENCE','RISING'],['AI','LEGACY'],['SI','EMERGING'],['NETWORK','ONLINE'],['SIE','INITIALIZED']];
  return <section className="section status-section"><div className="container status-layout"><div className="status-heading"><SectionTag>SYSTEM <span>//</span> 01</SectionTag><h2>ERA<br/>STATUS<span className="accent">.</span></h2><p>A public signal from the edge of a changing era.</p></div><div className="terminal"><div className="terminal-top"><div className="terminal-title"><Activity size={15}/> SIE SYSTEM STATUS</div><span className="mono terminal-live"><i className="status-light"/> MONITORING</span></div><div className="terminal-rows">{rows.map(([label, value], i) => <div className="terminal-row" key={label}><span className="row-num mono">0{i+1}</span><b>{label}</b><span className="row-line"/><span className={`row-value ${i === 2 ? 'muted-value' : ''}`}><i className={i === 2 ? 'dim-light' : 'status-light'}/>{value}</span></div>)}</div><div className="terminal-bottom mono"><span>SYSTEM ID: <b>SIE—2026</b></span><span>CLASSIFICATION: <b>PUBLIC</b></span><span>SIGNAL: <b>SUPER INTELLIGENCE</b></span></div></div></div></section>;
}
function Manifesto() {
  return <section className="section manifesto-section" id="manifesto"><div className="manifesto-lines"/><div className="container manifesto-inner"><SectionTag>02 <span>//</span> MANIFESTO</SectionTag><h2>INTELLIGENCE<br/>IS ENTERING<br/><span>A NEW ERA.</span></h2><div className="manifesto-copy"><div className="manifesto-mark">S<span>.</span></div><div><p>Artificial intelligence changed how machines process information.</p><p>Super intelligence represents the idea of intelligence moving beyond the boundaries we once assumed.</p><p>The language is changing.<br/>The era is changing.</p></div></div><p className="manifesto-end">AI WAS THE BEGINNING.<br/><span>SI IS THE ERA.</span></p><span className="manifesto-code mono">DECLARATION / 001</span></div></section>;
}
function Archive() {
  return <section className="section archive-section" id="archive"><div className="container"><div className="section-heading-row"><div><SectionTag>03 <span>//</span> ERA ARCHIVE</SectionTag><h2>Signals that<br/><span>define the shift.</span></h2></div><span className="mono archive-count">ARCHIVE / 003<br/>DEMO ENTRIES</span></div><div className="archive-note mono"><span><LockKeyhole size={13}/> PUBLIC ARCHIVE</span><span>DEMO / PLACEHOLDER DATA — NOT LIVE</span></div><div className="archive-list">{archive.map(item => <article className="archive-card" key={item.id}><span className="archive-id mono">{item.id}</span><div className="archive-content"><span className="mono archive-date">{item.date} <i>·</i> PLACEHOLDER</span><h3>{item.signal}</h3><span className="category">{item.type}</span></div><div className="archive-status"><span className="archive-dot"/> <span className="mono">INDEXED</span><ArrowUpRight size={16}/></div></article>)}</div><p className="archive-disclaimer">Conceptual entries shown for design preview. Real-world signals will be sourced and labeled when connected.</p></div></section>;
}
function IntelligenceFeed() {
  const [clock, setClock] = useState('00:00:00');
  useEffect(() => { const update = () => setClock(new Date().toISOString().slice(11,19)); update(); const id = window.setInterval(update, 1000); return () => clearInterval(id); }, []);
  return <section className="section intelligence-section" id="intelligence"><div className="container"><div className="intel-head"><div><SectionTag>04 <span>//</span> LIVE INTELLIGENCE</SectionTag><h2>THE SIGNAL<br/><span>NEVER STOPS.</span></h2></div><div className="feed-status"><span className="feed-status-line"><i className="status-light"/> CONNECTION STANDBY</span><span className="mono">UTC {clock}</span></div></div><div className="feed-shell"><div className="feed-toolbar mono"><span><Radio size={13}/> OBSERVATORY FEED</span><span>API CONNECTION PENDING</span><span className="feed-placeholder"><i/> DEMO MODE</span></div>{feed.map((item, i) => <article className="feed-item" key={item.time}><span className="feed-index mono">0{i+1}</span><div className="feed-item-main"><div className="feed-meta mono"><span>{item.source}</span><span>{item.time}</span><span>{item.category}</span></div><h3>{item.title}</h3></div><span className="signal-level mono"><i/><i/><i className={i === 2 ? 'signal-off' : ''}/><small>SIGNAL</small></span></article>)}<div className="feed-footer mono"><span>DEMO / PLACEHOLDER DATA</span><span>LIVE SOURCES NOT CONNECTED</span></div></div><p className="feed-caption">A framework for future signals. This feed is currently in preview mode; no live reporting is represented.</p></div></section>;
}
function Principles() {
  const items = [{n:'01', title:'INTELLIGENCE', copy:'Machines learned to think. Now intelligence itself becomes the frontier.'},{n:'02', title:'ACCELERATION', copy:'Every cycle becomes shorter. Every boundary moves.'},{n:'03', title:'EVOLUTION', copy:'The next era won’t arrive quietly.'}];
  return <section className="section principles-section"><div className="container"><SectionTag>05 <span>//</span> ERA PRINCIPLES</SectionTag><div className="principle-list">{items.map(item => <article className="principle" key={item.n}><span className="principle-num mono">{item.n}</span><div className="principle-content"><h2>{item.title}<span>.</span></h2><p>{item.copy}</p></div><ArrowUpRight className="principle-arrow" size={20}/></article>)}</div></div></section>;
}
function TokenSection() {
 const [copied, setCopied] = useState(false);
 const copy = async () => { if (!CONTRACT_ADDRESS) return; try { await navigator.clipboard.writeText(CONTRACT_ADDRESS); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { /* Clipboard may be unavailable outside a secure context. */ } };
 return <section className="section token-section" id="community"><div className="container token-layout"><div className="token-intro"><SectionTag>06 <span>//</span> COMMUNITY SIGNAL</SectionTag><p className="token-overline">THE ERA HAS A SIGNAL.</p><h2>SUPER<br/>INTELLIGENCE<br/>ERA<span>.</span></h2><div className="ticker-lockup"><span>$SIE</span><i/> COMMUNITY PROJECT</div><p className="token-note">An unofficial community / meme project on Solana. A cultural signal for the idea of what comes next.</p></div><div className="token-panel"><div className="token-panel-head mono"><span>SIE / NETWORK RECORD</span><span>PUBLIC</span></div><div className="token-data-row"><span>NETWORK</span><b>SOLANA</b><span className="network-glyph">◎</span></div><div className="token-data-row contract-row"><span>CONTRACT</span>{CONTRACT_ADDRESS ? <><code>{CONTRACT_ADDRESS.slice(0,5)}…{CONTRACT_ADDRESS.slice(-5)}</code><button className="copy-button" onClick={copy} aria-label="Copy contract address">{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? 'COPIED' : 'COPY'}</button></> : <b className="pending">COMING SOON</b>}</div><div className="token-data-row"><span>COMMUNITY</span><div className="token-socials"><a href={X_URL || '#community'}>X <ArrowUpRight size={13}/></a><a href={TELEGRAM_URL || '#community'}>TELEGRAM <ArrowUpRight size={13}/></a></div></div><div className="token-data-row"><span>PUMPFUN</span>{PUMPFUN_URL ? <a className="token-link" href={PUMPFUN_URL}>VIEW <ArrowUpRight size={13}/></a> : <b className="pending">COMING SOON</b>}</div><p className="token-panel-foot mono">NO CONTRACT ADDRESS HAS BEEN PUBLISHED.</p></div></div></section>;
}
function FinalCTA() { return <section className="final-section"><div className="final-grain"/><div className="container final-inner"><SectionTag>07 <span>//</span> THE NEXT ERA</SectionTag><h2>WELCOME TO<br/>THE SUPER<br/><span>INTELLIGENCE ERA.</span></h2><div className="final-bottom"><p>THE OLD ERA HAD AI.<br/><strong>THIS ERA HAS SI.</strong></p><a className="button button-primary" href="#era">ENTER THE ERA <ArrowRight size={15}/></a></div><div className="final-coordinate mono">SIE — AN OPEN IDEA</div></div></section>; }
function Footer() { return <footer className="footer"><div className="container footer-main"><Brand/><div className="footer-year mono">2026 <span>©</span></div><div className="footer-links"><a href={X_URL || '#community'}>X <ArrowUpRight size={13}/></a><a href={TELEGRAM_URL || '#community'}>TELEGRAM <ArrowUpRight size={13}/></a><a href={PUMPFUN_URL || '#community'}>PUMPFUN <ArrowUpRight size={13}/></a></div></div><div className="container footer-legal"><p>Unofficial community / meme project. Not affiliated with or endorsed by any government, company, organization, or public figure. No investment promise or representation is made.</p><a href="#era" className="back-top mono">BACK TO TOP ↑</a></div></footer>; }
function App() {
 useEffect(() => { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), { threshold: 0.12 }); document.querySelectorAll('.section, .final-inner').forEach(el => observer.observe(el)); return () => observer.disconnect(); }, []);
 return <><Navbar/><main><Hero/><ShiftSection/><SystemStatus/><Manifesto/><Archive/><IntelligenceFeed/><Principles/><TokenSection/><FinalCTA/></main><Footer/></>;
}
export default App;
