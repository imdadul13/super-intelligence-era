import { Fragment, useEffect, useState } from 'react';
import { NeuralField } from './NeuralField';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Copy, Check, Activity, Radio, LockKeyhole } from 'lucide-react';

// Add official URLs and token details here when they are available.
const projectConfig = {
  projectName: 'SUPER INTELLIGENCE ERA',
  ticker: '$SIE',
  network: 'Solana',
  contractAddress: '',
  pumpFunUrl: '',
  xUrl: '',
  websiteUrl: '',
  launchStatus: 'PRE-LAUNCH',
};

const nav = [{ label: 'ERA', href: '#era' }, { label: 'MANIFESTO', href: '#manifesto' }, { label: 'ARCHIVE', href: '#archive' }, { label: 'INTELLIGENCE', href: '#intelligence' }, { label: 'TOKEN', href: '#token' }];
const archive = [
  { id: 'ARC—001', date: '2026 / DEMO', signal: 'A new vocabulary for a new frontier.', type: 'CULTURE', status: 'INDEXED' },
  { id: 'ARC—002', date: '2026 / DEMO', signal: 'The boundary between tool and collaborator shifts.', type: 'INTELLIGENCE', status: 'INDEXED' },
  { id: 'ARC—003', date: '2026 / DEMO', signal: 'Computation becomes a cultural force.', type: 'COMPUTING', status: 'INDEXED' },
];
type SignalItem = { source: string; time: string; category: string; title: string };
const verifiedSignals: SignalItem[] = []; // Populate only from verified, attributed sources.

function Brand() { return <a className="brand" href={projectConfig.websiteUrl || '#era'} aria-label={`${projectConfig.projectName} home`}><span className="brand-mark">S<span>.</span></span><span className="brand-name">{projectConfig.projectName}</span></a>; }
function Eyebrow({ children }: { children: React.ReactNode }) { return <div className="eyebrow"><span className="eyebrow-dot" />{children}</div>; }
function SectionTag({ children }: { children: React.ReactNode }) { return <p className="section-tag">{children}</p>; }

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#era');
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    const targets = nav.map(item => document.querySelector(item.href)).filter((node): node is Element => node instanceof Element);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); }), { rootMargin: '-25% 0px -65% 0px' });
    targets.forEach(target => observer.observe(target));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);
  return <header className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}><nav className="nav container" aria-label="Main navigation">
    <Brand />
    <div className={`nav-links ${open ? 'is-open' : ''}`}>
      {nav.map(item => <a className={active === item.href ? 'active' : ''} key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      <div className="mobile-social"><a href={projectConfig.xUrl || '#token'}>X <ArrowUpRight size={13}/></a></div>
    </div>
    <div className="nav-actions"><a className="social-link" href={projectConfig.xUrl || '#token'} aria-label="X community">X <ArrowUpRight size={12}/></a><a className="nav-cta" href="#token">ENTER ERA <ArrowRight size={14}/></a></div>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
  </nav></header>;
}

function SignalGraphic() {
  return <div className="signal-graphic" aria-hidden="true"><div className="signal-orbit orbit-one"/><div className="signal-orbit orbit-two"/><div className="signal-orbit orbit-three"/><div className="signal-core"><span>SI</span><i/></div><span className="coord coord-a">37° 46′ 49.3″ N</span><span className="coord coord-b">122° 25′ 09.7″ W</span><span className="coord coord-c">SIGNAL FIELD / 01</span><span className="coord coord-d">SIE—SYS—2026</span><div className="crosshair cross-a">+</div><div className="crosshair cross-b">+</div><div className="signal-sweep"/></div>;
}
function Hero() {
  return <section className="hero" id="era" data-neural-state="initializing"><div className="hero-grid"/><div className="hero-grain"/><div className="container hero-inner">
    <div className="hero-meta"><Eyebrow>SIE <span className="slash">//</span> 2026</Eyebrow><span className="mono">INTELLIGENCE SYSTEM <span className="meta-sep">/</span> CLASSIFICATION: <b className="online">PUBLIC</b></span></div>
    <SignalGraphic />
    <div className="hero-copy"><p className="hero-kicker">AN IDEA FOR WHAT COMES NEXT</p><h1><span className="hero-the">THE</span><span className="hero-title-main"><span>SUPER</span><span>INTELLIGENCE</span></span><span className="hero-era">ERA<span className="hero-period">.</span></span></h1><div className="boot-label mono"><span>SIE—01</span><span>ERA INITIALIZATION</span><strong><i className="status-light"/> ONLINE</strong></div><div className="hero-bottom"><div><p className="hero-thesis">AI was the beginning.<br/><span>SI is the era.</span></p><div className="hero-ctas"><a className="button button-primary" href="#shift">ENTER THE ERA <ArrowRight size={15}/></a><a className="text-link" href="#intelligence">VIEW INTELLIGENCE <ArrowDown size={14}/></a></div></div><div className="hero-status mono"><span>ERA STATUS</span><strong><i className="status-light"/> ACTIVE</strong></div></div></div>
    <a className="hero-index mono" href="#shift"><span>SCROLL TO OBSERVE <ArrowDown size={11}/></span><span>01 — 09</span></a>
  </div></section>;
}
function ShiftSection() {
  return <section className="section shift-section" id="shift" data-neural-state="connected"><div className="container"><SectionTag>01 <span>//</span> THE SHIFT</SectionTag><div className="shift-head"><h2>FROM ARTIFICIAL<br/><span>TO SUPER.</span></h2><p className="shift-intro">Every technological era has a moment when the old vocabulary stops being enough.</p></div>
    <div className="shift-diagram"><div className="shift-state old-state"><span className="shift-monogram">AI</span><div><b>ARTIFICIAL INTELLIGENCE</b><small>THE BEGINNING</small></div></div><div className="shift-connector"><span/><ArrowDown size={18}/><span/></div><div className="shift-state new-state"><span className="shift-monogram">SI</span><div><b>SUPER INTELLIGENCE</b><small>THE NEXT FRONTIER</small></div><span className="state-index">01</span></div></div>
    <div className="shift-foot"><span className="mono">SIGNAL 01 / A CHANGE IN PERSPECTIVE</span><p className="paradigm-shift">THE PARADIGM IS SHIFTING.</p><p>AI defined the beginning.<br/><strong>Super Intelligence defines what comes next.</strong></p></div>
  </div></section>;
}
function SystemStatus() {
  const rows = [['SYSTEM','SIE-01'],['STATUS','ACTIVE'],['SIGNAL','SUPER INTELLIGENCE'],['ERA','INITIALIZED'],['NETWORK','ONLINE']];
  const telemetry = [['SIGNAL STRENGTH',82],['INTELLIGENCE INDEX',91],['ERA PROGRESSION',73]] as const;
  return <section className="section status-section" data-neural-state="online"><div className="container status-layout"><div className="status-heading"><SectionTag>SYSTEM <span>//</span> STATUS</SectionTag><h2>ERA<br/>STATUS<span className="accent">.</span></h2><p>A public signal from the edge of a changing era.</p><span className="status-classification mono">CLASSIFICATION: PUBLIC</span></div><div className="terminal"><div className="terminal-top"><div className="terminal-title"><Activity size={15}/> SIE SYSTEM STATUS</div><span className="mono terminal-live"><i className="status-light"/> TRANSMISSION ACTIVE</span></div><div className="terminal-rows">{rows.map(([label, value], i) => <div className="terminal-row" key={label}><span className="row-num mono">0{i+1}</span><b>{label}</b><span className="row-line"/><span className="row-value"><i className="status-light"/>{value}</span></div>)}</div><div className="telemetry-head mono">SIMULATION / SYSTEM VISUALIZATION</div><div className="telemetry">{telemetry.map(([label, value]) => <div className="telemetry-row" key={label}><span className="mono">{label}</span><div className="telemetry-track" aria-label={`${label}: visualization only`}><i style={{width:`${value}%`}}/></div><b className="mono">{value}%</b></div>)}</div><div className="terminal-bottom mono"><span>MODEL: <b>CONCEPTUAL</b></span><span>CLASSIFICATION: <b>PUBLIC</b></span><span>MEASUREMENTS: <b>ILLUSTRATIVE ONLY</b></span></div></div></div></section>;
}

function Manifesto() {
  return <section className="section manifesto-section" id="manifesto" data-neural-state="observation"><div className="manifesto-lines"/><div className="container manifesto-inner"><SectionTag>02 <span>//</span> MANIFESTO</SectionTag><h2>INTELLIGENCE<br/>IS ENTERING<br/><span>A NEW ERA.</span></h2><div className="manifesto-copy"><div><p>Artificial intelligence changed how machines process information.</p><p>Super intelligence represents the idea of intelligence moving beyond the boundaries we once assumed.</p><p>The language is changing.<br/>The era is changing.</p></div></div><p className="manifesto-end"><span className="manifesto-first">AI WAS THE BEGINNING.</span><span className="manifesto-pause mono">[ PAUSE / RECOGNIZE THE SHIFT ]</span><span className="manifesto-last">SI IS THE ERA.</span></p><span className="manifesto-code mono">DECLARATION / 001</span></div></section>;
}
function ArchiveBridge() { return <div className="archive-bridge"><div className="container"><span>THE LANGUAGE CHANGES.</span><i/><span>THE SIGNAL REMAINS.</span></div></div>; }
function Archive() {
  return <section className="section archive-section" id="archive" data-neural-state="indexing"><div className="container"><div className="section-heading-row"><div><SectionTag>03 <span>//</span> ERA ARCHIVE</SectionTag><h2>Signals that<br/><span>define the shift.</span></h2></div><span className="mono archive-count">ARCHIVE / 003<br/>CONCEPTUAL ENTRIES</span></div><div className="archive-note mono"><span><LockKeyhole size={13}/> CLASSIFICATION: PUBLIC</span><span>CONCEPTUAL ENTRIES / NOT LIVE DATA</span></div><div className="archive-list">{archive.map(item => <article className="archive-card" key={item.id} tabIndex={0}><span className="archive-id mono">{item.id}</span><div className="archive-content"><span className="mono archive-date">{item.date} <i>·</i> SIGNAL</span><h3>{item.signal}</h3><span className="category">{item.type}</span></div><div className="archive-status"><span className="archive-dot"/> <span className="mono">{item.status}</span><ArrowUpRight size={16}/></div></article>)}</div><p className="archive-disclaimer">Conceptual entries. Real-world signals will appear only when verified sources are connected.</p></div></section>;
}
function IntelligenceFeed() {
  return <section className="section intelligence-section" id="intelligence" data-neural-state="active"><div className="container"><div className="intel-head"><div><SectionTag>04 <span>//</span> LIVE INTELLIGENCE</SectionTag><h2>THE SIGNAL<br/><span>NEVER STOPS.</span></h2></div><div className="feed-status"><span className="feed-status-line"><i className="status-light"/> SIGNAL FEED // STANDBY</span><span className="mono">SOURCE CONNECTION <b>PENDING</b></span><span className="mono">VERIFIED SIGNALS <b>0</b></span></div></div><div className="feed-shell"><div className="feed-toolbar mono"><span><Radio size={13}/> INTEL FEED</span><span>SIGNAL FEED // STANDBY</span><span className="feed-placeholder"><i/> VERIFIED SOURCES ONLY</span></div>{verifiedSignals.length ? verifiedSignals.map((item, i) => <article className="feed-item" key={item.source + item.time}><span className="feed-index mono">0{i+1}</span><div className="feed-item-main"><div className="feed-meta mono"><span>{item.source}</span><span>{item.time}</span><span>{item.category}</span></div><h3>{item.title}</h3></div><span className="signal-level mono"><i/><i/><i/><small>VERIFIED</small></span></article>) : <div className="feed-empty"><span className="feed-cursor"/><b>AWAITING VERIFIED SIGNALS.</b><p>Once connected to verified sources, the observatory will surface relevant intelligence signals here.</p></div>}<div className="feed-footer mono"><span>ATTRIBUTION REQUIRED</span><span>NO LIVE SOURCE CONNECTED</span></div></div></div></section>;
}

function WatchingSection() {
  return <section className="watching-section" data-neural-state="watching"><div className="watching-glow"/><div className="container watching-inner"><div className="watching-copy"><SectionTag>05 <span>//</span> OBSERVATION FIELD</SectionTag><h2>THE ERA<br/><span>IS WATCHING.</span></h2><p>EVERY BREAKTHROUGH<br/>LEAVES A SIGNAL.</p><span className="watching-id mono">SIMULATION / SIE—01</span></div><div className="network-map"><span className="network-map-label mono">INTELLIGENCE OBSERVATORY <i>·</i> SYNCHRONIZING</span><span className="network-map-bottom mono">NODE FIELD / CONCEPTUAL</span></div></div></section>;
}

function Principles() {
  const items = [{n:'01', title:'INTELLIGENCE', copy:'Machines learned to think. Now intelligence itself becomes the frontier.'},{n:'02', title:'ACCELERATION', copy:'Every cycle becomes shorter. Every boundary moves.'},{n:'03', title:'EVOLUTION', copy:'The next era won’t arrive quietly.'}];
  return <section className="section principles-section" data-neural-state="observation"><div className="container"><SectionTag>06 <span>//</span> ERA PRINCIPLES</SectionTag><div className="principle-list">{items.map(item => <article className="principle" key={item.n}><span className="principle-num mono">{item.n}</span><div className="principle-content"><h2>{item.title}<span>.</span></h2><p>{item.copy}</p></div><ArrowUpRight className="principle-arrow" size={20}/></article>)}</div></div></section>;
}
function TokenSection() {
 const [copied, setCopied] = useState(false);
 const copy = async () => { if (!projectConfig.contractAddress) return; try { await navigator.clipboard.writeText(projectConfig.contractAddress); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { /* Clipboard may be unavailable outside a secure context. */ } };
 return <section className="section token-section" id="token" data-neural-state="locked"><div className="token-build-up container"><p>EVERY ERA<br/>NEEDS A SIGNAL.</p><span>THE SIGNAL IS $SIE.</span></div><div className="container token-layout"><div className="token-intro"><SectionTag>07 <span>//</span> COMMUNITY SIGNAL</SectionTag><p className="token-overline">THE ERA HAS A SIGNAL.</p><h2>{projectConfig.projectName.split(' ').map((word, index) => <Fragment key={word}>{index > 0 && <br/>}{word}</Fragment>)}<span>.</span></h2><div className="ticker-lockup"><span>{projectConfig.ticker}</span><i/> IDENTITY LAYER</div><p className="token-note">An unofficial community / meme project on Solana. A cultural signal for the idea of what comes next.</p></div><div className="token-panel"><div className="token-panel-head mono"><span>SIE / NETWORK RECORD</span><span>{projectConfig.launchStatus}</span></div><div className="token-data-row"><span>NETWORK</span><b>{projectConfig.network.toUpperCase()}</b><span className="network-glyph">◎</span></div><div className="token-data-row contract-row"><span>CONTRACT</span>{projectConfig.contractAddress ? <><code>{projectConfig.contractAddress.slice(0,5)}…{projectConfig.contractAddress.slice(-5)}</code><button className="copy-button" onClick={copy} aria-label="Copy contract address">{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? 'COPIED' : 'COPY'}</button></> : <b className="pending">COMING SOON</b>}</div><div className="token-data-row"><span>COMMUNITY</span><div className="token-socials"><a href={projectConfig.xUrl || '#token'}>X <ArrowUpRight size={13}/></a></div></div><div className="token-data-row"><span>PUMPFUN</span>{projectConfig.pumpFunUrl ? <a className="token-link" href={projectConfig.pumpFunUrl}>VIEW <ArrowUpRight size={13}/></a> : <b className="pending">COMING SOON</b>}</div><p className="token-panel-foot mono">NO CONTRACT ADDRESS HAS BEEN PUBLISHED.</p></div></div></section>;
}
function FinalCTA() { return <section className="final-section"><div className="final-grain"/><div className="container final-inner"><SectionTag>08 <span>//</span> THE NEXT ERA</SectionTag><h2>WELCOME TO<br/>THE SUPER<br/><span>INTELLIGENCE ERA.</span></h2><div className="final-bottom"><p>AI WAS THE BEGINNING.<br/><strong>SI IS THE ERA.</strong></p><a className="button button-primary" href="#era">ENTER THE ERA <ArrowRight size={15}/></a></div><div className="final-coordinate mono">SIE — AN OPEN IDEA</div></div></section>; }
function Footer() { return <footer className="footer"><div className="container footer-main"><Brand/><div className="footer-year mono">2026 <span>©</span></div><div className="footer-links"><a href={projectConfig.xUrl || '#token'}>X <ArrowUpRight size={13}/></a><a href={projectConfig.pumpFunUrl || '#token'}>PUMPFUN <ArrowUpRight size={13}/></a></div></div><div className="container footer-legal"><p>Unofficial community / meme project. Not affiliated with or endorsed by any government, company, organization, or public figure.</p><a href="#era" className="back-top mono">BACK TO TOP ↑</a></div></footer>; }
function App() {
 useEffect(() => { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), { threshold: 0.12 }); document.querySelectorAll('.section, .final-inner').forEach(el => observer.observe(el)); return () => observer.disconnect(); }, []);
 return <><NeuralField/><Navbar/><main><Hero/><ShiftSection/><SystemStatus/><Manifesto/><ArchiveBridge/><Archive/><IntelligenceFeed/><WatchingSection/><Principles/><TokenSection/><FinalCTA/></main><Footer/></>;
}
export default App;
