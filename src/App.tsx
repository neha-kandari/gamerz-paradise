import { useState, useEffect, useRef } from 'react'
import logo from './imports/gamerz_paradise_logo.png'
import heroVideo from './imports/gaming.mp4'

const IMG = {
  vr:      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=900&h=600&fit=crop&auto=format',
  vr2:     'https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?w=900&h=600&fit=crop&auto=format',
  pc:      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&h=600&fit=crop&auto=format',
  pc2:     'https://images.unsplash.com/photo-1626218174358-7769486c4b79?w=900&h=600&fit=crop&auto=format',
  racing:  'https://images.unsplash.com/photo-1771440571270-e27b63085a48?w=900&h=600&fit=crop&auto=format',
  racing2: 'https://images.unsplash.com/photo-1743649978995-c76212449e15?w=900&h=600&fit=crop&auto=format',
  console: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=900&h=600&fit=crop&auto=format',
  venue:   'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1400&h=900&fit=crop&auto=format',
  venue2:  'https://images.unsplash.com/photo-1558271697-dd9f331ca8b3?w=800&h=600&fit=crop&auto=format',
  sports:  'https://images.unsplash.com/photo-1551385093-ad3fb362dc43?w=900&h=500&fit=crop&auto=format',
  action:  'https://images.unsplash.com/photo-1773216344148-45afea590cf6?w=900&h=500&fit=crop&auto=format',
  survival:'https://images.unsplash.com/photo-1573339607881-208e75e4b267?w=900&h=500&fit=crop&auto=format',
  neon:    'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=900&h=500&fit=crop&auto=format',
  city:    'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900&h=500&fit=crop&auto=format',
}

type Experience = 'all' | 'solo' | 'friends' | 'competitive' | 'casual'

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true) }, { threshold })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [threshold])
  return { ref, on }
}

function R({ children, delay = 0, x = 0, className = '' }: {
  children: React.ReactNode; delay?: number; x?: number; className?: string
}) {
  const { ref, on } = useReveal()
  return (
    <div ref={ref} className={className} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'none' : `translateY(24px) translateX(${x}px)`,
      transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms`,
    }}>{children}</div>
  )
}

/* ── SVG Icons ──────────────────────────── */
const ZoneIcons: Record<string, () => JSX.Element> = {
  vr: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2 8h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"/><path d="M7 12h.01M17 12h.01"/></svg>,
  pc: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  racing: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 17H5a2 2 0 0 1-2-2V9l3-5h12l3 5v6a2 2 0 0 1-2 2z"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/></svg>,
  console: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="3"/><path d="M8 12h4M10 10v4M16 12h.01M18 12h.01"/></svg>,
  esports: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 9H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2l3 5h2V4H9L6 9z"/><path d="M18 9h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2l-3 5h-2V4h2l3 5z"/></svg>,
}

const ExpIcons: Record<string, () => JSX.Element> = {
  solo:        () => <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  friends:     () => <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3 2.7-5 6-5h2"/><circle cx="16" cy="8" r="3"/><path d="M13 20c0-3 2.7-5 6-5"/></svg>,
  competitive: () => <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 9v1a6 6 0 0 0 12 0V9"/><path d="M6 9H4l1-5h14l1 5h-2M9 17l-1 4h8l-1-4"/></svg>,
  casual:      () => <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>,
}

/* ── Data ───────────────────────────────── */
const zones = [
  { id:'vr',      label:'VR Zone',      desc:'Full-immersion VR suites with the latest headsets.', detail:'Step into another dimension — Beat Saber, Half-Life: Alyx, and 40+ titles in private booths.', img:IMG.vr,  accentColor:'#7c3aed', stats:[['12','Booths'],['40+','Titles'],['90 min','Max Session']], tag:'IMMERSIVE' },
  { id:'pc',      label:'PC Gaming',    desc:'Championship-grade rigs, 240Hz monitors, mech keyboards.', detail:'RTX 4090 rigs, 240Hz 1440p displays, and tournament-spec peripherals. LAN parties to solo grind.', img:IMG.pc,  accentColor:'#0ea5e9', stats:[['20','Stations'],['240Hz','Refresh'],['4K','Resolution']], tag:'HIGH-END' },
  { id:'racing',  label:'Racing Sim',   desc:'Pro force-feedback cockpits with triple-screen setups.', detail:'Direct-drive wheels, hydraulic seats, triple 4K screens. Most realistic racing outside a cockpit.', img:IMG.racing, accentColor:'#f59e0b', stats:[['6','Cockpits'],['3×4K','Screens'],['Force','Feedback']], tag:'REALISTIC' },
  { id:'console', label:'Console',      desc:'Latest-gen consoles on massive screens — solo or squad.', detail:'PS5, Xbox Series X, Switch on 75" 4K displays. FIFA tournaments, party play, casual sessions.', img:IMG.console, accentColor:'#10b981', stats:[['10','Setups'],['75"','Screens'],['3','Platforms']], tag:'SOCIAL' },
  { id:'esports', label:'Esports Arena',desc:'Competitive arena built for tournament-level play.', detail:'20-seat arena with lag-free LAN, caster booth, live leaderboard, and weekly prize tournaments.', img:IMG.pc2, accentColor:'#c0152a', stats:[['20','Seats'],['Weekly','Tournaments'],['₹25K','Prize Pool']], tag:'COMPETITIVE' },
]

const bentoCategories = [
  { label:'Sports',    img:IMG.sports   },
  { label:'Racing',    img:IMG.racing   },
  { label:'Adventure', img:IMG.action   },
  { label:'Strategy',  img:IMG.city     },
  { label:'Survival',  img:IMG.survival },
  { label:'Action',    img:IMG.neon     },
]

const featured = [
  { name:'Beat Saber',      cat:'VR Zone',   players:'1',   dur:'20 min', img:IMG.vr,      badge:'NEW' },
  { name:'Forza Horizon 5', cat:'Racing',    players:'1-4', dur:'45 min', img:IMG.racing,  badge:null  },
  { name:'Valorant',        cat:'PC Gaming', players:'5v5', dur:'60 min', img:IMG.pc,      badge:'HOT' },
  { name:'Half-Life: Alyx', cat:'VR Zone',   players:'1',   dur:'90 min', img:IMG.vr2,     badge:null  },
  { name:'Gran Turismo 7',  cat:'Racing',    players:'1-2', dur:'45 min', img:IMG.racing2, badge:'HOT' },
  { name:'FIFA 25',         cat:'Console',   players:'1-4', dur:'30 min', img:IMG.console, badge:null  },
]

const expItems = [
  { id:'solo' as Experience,        label:'Play Solo',     sub:'Lone wolf mode',  img:IMG.vr2,     games:['VR Zone','Racing Sim','PC Gaming'] },
  { id:'friends' as Experience,     label:'Squad Up',      sub:'Bring your crew', img:IMG.pc,      games:['Console','Esports','PC Gaming']   },
  { id:'competitive' as Experience, label:'Compete',       sub:'Climb the ranks', img:IMG.pc2,     games:['Esports','PC Gaming','Racing']    },
  { id:'casual' as Experience,      label:'Just Have Fun', sub:'No pressure',     img:IMG.console, games:['Console','VR Zone']              },
]

const howItWorks = [
  { step:'01', title:'Choose Your Zone', desc:'Browse VR, PC, Racing, Console or Esports — pick what excites you.' },
  { step:'02', title:'Book or Walk In',  desc:'Reserve your session online or just show up. Weekends fill fast.'   },
  { step:'03', title:'Game On',          desc:'Gear up, load in, and lose yourself. Staff on hand whenever you need.' },
]

const reviews = [
  { name:'Arjun M.',     rating:5, text:'The VR section had me completely lost in another world. Best gaming zone in the city.', tag:'VR Zone'     },
  { name:'Priya K.',     rating:5, text:'Birthday party with 12 friends — console section kept us going for 4 hours straight.',   tag:'Console'     },
  { name:'Dev S.',       rating:5, text:'Racing simulators on another level. Force feedback, triple screens — feels completely real.', tag:'Racing Sim'  },
  { name:'Rahul T.',     rating:4, text:'Insane PC setup. Played Valorant with the boys on high-refresh monitors. Great staff.',  tag:'PC Gaming'   },
  { name:'Sneha R.',     rating:5, text:'Clean, air-conditioned, great snacks at the counter. Came for 2 hours, stayed for 5.',   tag:'Venue'       },
  { name:'Karthik N.',   rating:5, text:'The esports arena is tournament-grade. Love the weekly competitions and prize pools.',    tag:'Esports'     },
]

const faqs = [
  { q:"Do I need to book in advance?",             a:"Walk-ins are always welcome, but we recommend booking online on weekends and public holidays — slots fill up fast, especially for VR and Racing Sim." },
  { q:"How long is a typical session?",            a:"Sessions start at 30 minutes and go up to 3 hours. You can extend on the spot if a station is available. Most gamers end up staying 1–2 hours." },
  { q:"Is there an age restriction?",              a:"Players under 12 must be accompanied by an adult. Some VR titles have a minimum age of 13. Our staff will guide you on arrival." },
  { q:"Can I bring my own controller?",            a:"Absolutely. Bring your own peripherals and connect them to any PC station. We also have a full range of tournament-spec gear available for use." },
  { q:"Do you host birthday parties or events?",   a:"Yes! We offer private zone bookings for birthdays, college fests, and corporate outings. Contact us at least 3 days in advance for group rates." },
  { q:"What payment methods do you accept?",       a:"We accept cash, all major UPI apps (GPay, PhonePe, Paytm), credit/debit cards, and net banking. No crypto, sorry." },
]

const navLinks = ['Games', 'Experiences', 'About']

const CONTACT = {
  phoneDisplay: '816 819 1505',
  telUrl: 'tel:+918168191505',
  whatsappUrl: 'https://wa.me/918168191505',
  address: 'DSS No. 8 First Floor, 13/17, Market, near Dyal Singh Public School, Sector 13-17, HUDA, Panipat, Haryana 132103',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('DSS No. 8 First Floor, 13/17, Market, near Dyal Singh Public School, Sector 13-17, HUDA, Panipat, Haryana 132103'),
  instagramUrl: 'https://www.instagram.com/the_gamerz_paradise/',
}

/* ═══════════════════════════════════════════
   APP
═══════════════════════════════════════════ */
export default function App() {
  const [activeZone, setActiveZone] = useState(0)
  const [activeExp,  setActiveExp]  = useState<Experience>('solo')
  const [heroReady,  setHeroReady]  = useState(false)
  const [panelKey,   setPanelKey]   = useState(0)
  const [openFaq,    setOpenFaq]    = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const setVideoRef = (el: HTMLVideoElement | null) => {
    if (el) {
      el.muted = true
      el.volume = 0
      el.setAttribute('muted', '')
    }
    (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el
  }

  function selectZone(i: number) {
    if (i === activeZone) return
    setActiveZone(i)
    setPanelKey(k => k + 1)
  }

  const zone = zones[activeZone]

  /* duplicate reviews for seamless loop */
  const reviewTrack = [...reviews, ...reviews]

  return (
    <div style={{ background:'var(--bg)', color:'var(--fg)', minHeight:'100vh' }}>

      {/* ── NAV ─────────────────────────────── */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        padding:'12px var(--pad) 0',
        background:'rgba(20,20,20,.45)',
        backdropFilter:'blur(16px) saturate(160%)',
        WebkitBackdropFilter:'blur(16px) saturate(160%)',
        borderBottom:'1px solid rgba(255,255,255,.08)',
      }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:68 }}>
          <img src={logo} alt="Gamerz Paradise" style={{ height:72, width:'auto', mixBlendMode:'screen', objectFit:'contain' }} />
          <div style={{ display:'flex', gap:28 }} id="nav-desktop">
            {navLinks.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
            ))}
          </div>
          <div style={{ display:'flex', gap:12, alignItems:'center' }}>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <button className="btn-primary" style={{ padding:'9px 20px', fontSize:'.76rem' }}>Contact Now</button>
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────── */}
      <section style={{ position:'relative', height:'80vh', minHeight:500, overflow:'hidden', paddingTop:80, boxSizing:'border-box' }}>
        <div style={{ position:'absolute', inset:0, background:'#181818' }}>
          <video ref={setVideoRef} src={heroVideo} autoPlay muted loop playsInline
            onCanPlay={() => setHeroReady(true)}
            style={{ width:'100%', height:'100%', objectFit:'cover', opacity: heroReady ? 0.55 : 0, transition:'opacity 1.2s ease' }}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(5,5,5,.5) 28%,rgba(5,5,5,.08) 100%)' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 55%,var(--bg) 100%)' }} />
        </div>
        <div className="grid-bg" style={{ position:'absolute', inset:0, pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:2, height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 var(--pad)', maxWidth:'min(780px, 90vw)' }}>
          <h1 className="section-title" style={{ fontSize:'clamp(2.4rem,5.5vw,5.2rem)', color:'#fff', marginBottom:16, letterSpacing:'.02em', opacity: heroReady ? 1 : 0, transform: heroReady ? 'none' : 'translateY(24px)', transition:'all .85s ease .25s' }}>
            ENTER<br /><span style={{ color:'var(--primary)' }}>THE GAME.</span>
          </h1>
          <div style={{ opacity: heroReady ? 1 : 0, transition:'all .8s ease .4s', marginBottom:18 }}>
            <div style={{ width:44, height:2, background:'var(--primary)' }} />
          </div>
          <p className="hero-subtext" style={{ fontSize:'.92rem', fontWeight:300, color:'rgba(240,240,240,.6)', whiteSpace:'nowrap', lineHeight:1, marginBottom:30, opacity: heroReady ? 1 : 0, transition:'all .85s ease .5s' }}>
            VR · PC Gaming · Racing Sim · Console · Esports — all under one roof.
          </p>
          <div className="cta-row" style={{ display:'flex', gap:12, flexWrap:'wrap', opacity: heroReady ? 1 : 0, transition:'all .85s ease .62s' }}>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"><button className="btn-primary">Contact Now</button></a>
          </div>
          <div style={{ display:'flex', gap:7, marginTop:32, flexWrap:'wrap', opacity: heroReady ? 1 : 0, transition:'all .85s ease .76s' }}>
            {[
              { label:'VR Zone',   svg:<svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M2 8h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"/></svg> },
              { label:'PC Gaming', svg:<svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
              { label:'Racing',    svg:<svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M19 17H5a2 2 0 0 1-2-2V9l3-5h12l3 5v6a2 2 0 0 1-2 2z"/></svg> },
              { label:'Console',   svg:<svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="3"/><path d="M8 12h4M10 10v4"/></svg> },
              { label:'Esports',   svg:<svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M6 9H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2l3 5h2V4H9L6 9z"/></svg> },
            ].map(({ label, svg }) => (
              <span key={label} className="font-heading" style={{ display:'flex', alignItems:'center', gap:5, fontSize:'.66rem', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', padding:'5px 10px', background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)', color:'rgba(240,240,240,.5)' }}>
                {svg}{label}
              </span>
            ))}
          </div>
        </div>
        <div style={{ position:'absolute', bottom:26, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:5, opacity:.32 }}>
          <span className="font-heading" style={{ fontSize:'.58rem', letterSpacing:'.22em', textTransform:'uppercase' }}>Scroll</span>
          <div style={{ width:1, height:30, background:'linear-gradient(to bottom,var(--primary),transparent)' }} />
        </div>
      </section>

      {/* ── GAME CATEGORIES BENTO ────────────── */}
      <section style={{ padding:'72px 0 56px' }}>
        <R>
          <div style={{ marginBottom:28, padding:'0 var(--pad)' }}>
            <p className="tag-label" style={{ marginBottom:10 }}>What's Inside</p>
            <h2 className="section-title" style={{ fontSize:'clamp(1.9rem,4.5vw,3.6rem)', color:'var(--fg)' }}>
              GAME <span style={{ color:'var(--primary)' }}>CATEGORIES</span>
            </h2>
          </div>
        </R>

        {/* Desktop bento grid */}
        <R delay={80} className="bento-desktop">
          <div style={{ padding:'0 var(--pad)' }}>
            <div className="bento-grid" style={{ display:'grid', gridTemplateColumns:'1.9fr 1.4fr 1fr', gridTemplateRows:'210px 210px', gap:10 }}>
              {bentoCategories.map(c => (
                <div key={c.label} className="bento-card">
                  <img src={c.img} alt={c.label} />
                  <div className="overlay" />
                  <div className="cat-label">{c.label}</div>
                  <div className="arrow-icon">↗</div>
                </div>
              ))}
            </div>
          </div>
        </R>

        {/* Mobile horizontal scroll carousel */}
        <div className="bento-mobile" style={{ display:'none', flexDirection:'column', gap:16 }}>
          {/* Scroll hint text */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 var(--pad)' }}>
            <span style={{ color:'var(--muted-fg)', fontSize:'.72rem', fontWeight:600, letterSpacing:'.14em', textTransform:'uppercase', fontFamily:'Rajdhani,sans-serif' }}>Swipe to explore</span>
            <div style={{ display:'flex', gap:4 }}>
              {bentoCategories.map((_, i) => (
                <div key={i} style={{ width: i===0 ? 18 : 5, height:5, borderRadius:3, background: i===0 ? 'var(--primary)' : 'rgba(255,255,255,.2)', transition:'all .3s' }} />
              ))}
            </div>
          </div>

          {/* Scrollable track */}
          <div style={{
            display:'flex', gap:12, overflowX:'auto', scrollSnapType:'x mandatory',
            WebkitOverflowScrolling:'touch', scrollbarWidth:'none',
            padding:'4px var(--pad) 16px',
          }}>
            {bentoCategories.map((c, i) => (
              <div key={c.label} style={{
                position:'relative', borderRadius:16, overflow:'hidden', flexShrink:0,
                width:'72vw', maxWidth:280, height:340,
                scrollSnapAlign:'start', background:'#1a1a1a',
                boxShadow:'0 8px 32px rgba(0,0,0,.5)',
              }}>
                <img src={c.img} alt={c.label} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                {/* Gradient overlay */}
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(5,5,5,.9) 0%,rgba(5,5,5,.2) 55%,transparent 100%)' }} />
                {/* Top accent bar */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(to right,var(--primary),transparent)` }} />
                {/* Number badge */}
                <div style={{ position:'absolute', top:16, left:16, width:32, height:32, borderRadius:6, background:'rgba(192,21,42,.85)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, fontSize:'.8rem', color:'#fff' }}>0{i+1}</span>
                </div>
                {/* Bottom content */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'20px 20px 24px' }}>
                  <h3 style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, fontSize:'1.7rem', textTransform:'uppercase', letterSpacing:'.05em', color:'#fff', lineHeight:1, marginBottom:8 }}>{c.label}</h3>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <div style={{ flex:1, height:1, background:'rgba(255,255,255,.2)' }} />
                    <span style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:'.68rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--primary)' }}>EXPLORE</span>
                    <span style={{ color:'var(--primary)', fontSize:'.85rem' }}>↗</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Peek spacer */}
            <div style={{ width:1, flexShrink:0 }} />
          </div>
        </div>
      </section>

      {/* ── EXPLORE ZONES ───────────────────── */}
      <section id="games" style={{ padding:'80px 0 0', background:'#0e0e0e', position:'relative', overflow:'hidden' }}>
        {/* Ambient glow behind active zone */}
        <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, background:`radial-gradient(ellipse 60% 50% at 30% 50%, ${zone.accentColor}18 0%, transparent 70%)`, transition:'background 0.7s ease', pointerEvents:'none' }} />

        <div style={{ padding:'0 var(--pad)', marginBottom:44, position:'relative', zIndex:1 }}>
          <R>
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:18 }}>
              <div>
                <p className="tag-label" style={{ marginBottom:10 }}>Our Zones</p>
                <h2 className="section-title" style={{ fontSize:'clamp(2rem,5vw,4.2rem)', color:'#fff' }}>
                  EXPLORE<br /><span style={{ color:'var(--primary)' }}>GAMES</span>
                </h2>
              </div>
              <p style={{ maxWidth:300, color:'rgba(255,255,255,.4)', lineHeight:1.7, fontWeight:300, fontSize:'.86rem' }}>
                Five distinct arenas, each tuned for peak performance and total immersion.
              </p>
            </div>
          </R>
        </div>

        {/* ── DESKTOP layout ── */}
        <div className="zones-desktop" style={{ position:'relative', zIndex:1 }}>
          {/* Zone tab strip */}
          <div style={{ display:'flex', gap:0, padding:'0 var(--pad)', marginBottom:0, overflowX:'auto', scrollbarWidth:'none' }}>
            {zones.map((z, i) => (
              <button key={z.id}
                onClick={() => selectZone(i)}
                onMouseEnter={() => selectZone(i)}
                style={{
                  flex:'0 0 auto', display:'flex', alignItems:'center', gap:10, padding:'14px 24px',
                  background: i === activeZone ? z.accentColor : 'transparent',
                  border:'none', cursor:'pointer', transition:'all .28s ease',
                  borderBottom: i === activeZone ? 'none' : '1px solid rgba(255,255,255,.08)',
                  position:'relative',
                }}
              >
                <span style={{ color: i === activeZone ? '#fff' : 'rgba(255,255,255,.45)', transition:'color .25s' }}>{ZoneIcons[z.id]?.()}</span>
                <span className="font-heading" style={{ fontWeight:700, fontSize:'.88rem', letterSpacing:'.08em', textTransform:'uppercase', color: i === activeZone ? '#fff' : 'rgba(255,255,255,.45)', whiteSpace:'nowrap', transition:'color .25s' }}>{z.label}</span>
                <span className="font-heading" style={{ fontSize:'.6rem', fontWeight:600, letterSpacing:'.14em', padding:'2px 7px', background: i === activeZone ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.06)', color: i === activeZone ? '#fff' : 'rgba(255,255,255,.3)', transition:'all .25s' }}>{z.tag}</span>
              </button>
            ))}
            <div style={{ flex:1, borderBottom:'1px solid rgba(255,255,255,.08)' }} />
          </div>

          {/* Big image panel */}
          <div style={{ position:'relative', height:'clamp(420px,55vh,600px)', overflow:'hidden' }}>
            {zones.map((z, i) => (
              <img key={z.id} src={z.img} alt={z.label}
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity: i === activeZone ? 1 : 0, transform: i === activeZone ? 'scale(1)' : 'scale(1.06)', transition:'opacity .65s ease, transform .65s ease' }}
              />
            ))}
            {/* Multi-layer overlay */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(8,8,8,.92) 0%, rgba(8,8,8,.55) 45%, rgba(8,8,8,.15) 100%)' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(8,8,8,.7) 0%, transparent 50%)' }} />
            {/* Accent color stripe left edge */}
            <div style={{ position:'absolute', top:0, left:0, bottom:0, width:4, background:zone.accentColor, transition:'background .5s' }} />

            {/* Content */}
            <div key={panelKey} style={{ position:'absolute', inset:0, zIndex:2, display:'flex', padding:'48px 52px', animation:'slide-panel .5s ease both' }}>
              {/* Left: info */}
              <div style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end', maxWidth:520 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
                  <div style={{ width:40, height:40, borderRadius:6, background:`${zone.accentColor}30`, border:`1px solid ${zone.accentColor}60`, display:'flex', alignItems:'center', justifyContent:'center', color:zone.accentColor }}>
                    {ZoneIcons[zone.id]?.()}
                  </div>
                  <h3 className="section-title" style={{ fontSize:'clamp(2.2rem,4vw,3.6rem)', color:'#fff', margin:0 }}>{zone.label}</h3>
                </div>
                <p style={{ color:'rgba(240,240,240,.72)', fontSize:'.95rem', fontWeight:300, lineHeight:1.75, marginBottom:28 }}>{zone.detail}</p>
                {/* Stats row */}
                <div style={{ display:'flex', gap:32, marginBottom:32, flexWrap:'wrap' }}>
                  {zone.stats.map(([val, lbl]) => (
                    <div key={lbl} style={{ position:'relative', paddingLeft:12, borderLeft:`2px solid ${zone.accentColor}` }}>
                      <div className="font-display" style={{ fontWeight:900, fontSize:'1.9rem', color:zone.accentColor, lineHeight:1 }}>{val}</div>
                      <div className="font-heading" style={{ fontSize:'.62rem', fontWeight:600, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(240,240,240,.38)', marginTop:3 }}>{lbl}</div>
                    </div>
                  ))}
                </div>
                <button className="btn-primary" style={{ width:'fit-content', fontSize:'.82rem', padding:'12px 28px' }}>Enter {zone.label} →</button>
              </div>

              {/* Right: zone list thumbnails */}
              <div style={{ marginLeft:'auto', display:'flex', flexDirection:'column', gap:8, justifyContent:'flex-end' }}>
                {zones.map((z, i) => (
                  <button key={z.id}
                    onClick={() => selectZone(i)}
                    onMouseEnter={() => selectZone(i)}
                    style={{
                      display:'flex', alignItems:'center', gap:10, padding:'8px 14px',
                      background: i === activeZone ? `${z.accentColor}22` : 'rgba(255,255,255,.04)',
                      border:`1px solid ${i === activeZone ? z.accentColor + '55' : 'rgba(255,255,255,.08)'}`,
                      cursor:'pointer', transition:'all .25s', borderRadius:2, minWidth:180,
                    }}
                  >
                    <div style={{ width:36, height:28, borderRadius:2, overflow:'hidden', flexShrink:0 }}>
                      <img src={z.img} alt={z.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    </div>
                    <span className="font-heading" style={{ fontWeight:700, fontSize:'.82rem', letterSpacing:'.04em', textTransform:'uppercase', color: i === activeZone ? '#fff' : 'rgba(255,255,255,.45)', transition:'color .25s' }}>{z.label}</span>
                    <span style={{ marginLeft:'auto', color: i === activeZone ? z.accentColor : 'transparent', fontSize:'.75rem', transition:'color .25s' }}>→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dot nav */}
            <div style={{ position:'absolute', bottom:20, left:'50%', transform:'translateX(-50%)', display:'flex', gap:6, zIndex:3 }}>
              {zones.map((_, i) => (
                <button key={i} onClick={() => selectZone(i)} style={{ width: i===activeZone ? 24 : 7, height:7, borderRadius:4, background: i===activeZone ? zone.accentColor : 'rgba(255,255,255,.3)', border:'none', cursor:'pointer', padding:0, transition:'all .3s' }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE layout — full-screen snap cards ── */}
        <div className="zones-mobile" style={{ display:'none' }}>
          {/* Zone tab pills */}
          <div style={{ display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none', padding:'0 var(--pad) 16px', flexWrap:'nowrap' }}>
            {zones.map((z, i) => (
              <button key={z.id} onClick={() => selectZone(i)}
                style={{
                  flexShrink:0, display:'flex', alignItems:'center', gap:7, padding:'8px 16px',
                  background: i === activeZone ? z.accentColor : 'rgba(255,255,255,.06)',
                  border:`1px solid ${i === activeZone ? z.accentColor : 'rgba(255,255,255,.1)'}`,
                  borderRadius:20, cursor:'pointer', transition:'all .25s',
                }}
              >
                <span style={{ color:'#fff', opacity: i === activeZone ? 1 : .5 }}>{ZoneIcons[z.id]?.()}</span>
                <span className="font-heading" style={{ fontWeight:700, fontSize:'.78rem', letterSpacing:'.07em', textTransform:'uppercase', color:'#fff', opacity: i === activeZone ? 1 : .5, whiteSpace:'nowrap' }}>{z.label}</span>
              </button>
            ))}
          </div>

          {/* Full-bleed zone card */}
          <div key={`mzone-${panelKey}`} style={{ position:'relative', height:'76vw', minHeight:320, maxHeight:440, overflow:'hidden', margin:'0', animation:'slide-panel .4s ease both' }}>
            <img src={zone.img} alt={zone.label} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(5,5,5,.97) 0%, rgba(5,5,5,.4) 55%, transparent 100%)' }} />
            <div style={{ position:'absolute', left:0, top:0, bottom:0, width:4, background:zone.accentColor }} />

            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'24px 22px 28px' }}>
              <span style={{ display:'inline-block', marginBottom:10, padding:'3px 10px', background:zone.accentColor, color:'#fff', fontFamily:'Rajdhani,sans-serif', fontWeight:700, fontSize:'.62rem', letterSpacing:'.18em', textTransform:'uppercase', width:'fit-content' }}>{zone.tag}</span>
              <h3 className="section-title" style={{ fontSize:'2.2rem', color:'#fff', margin:'0 0 8px' }}>{zone.label}</h3>
              <p style={{ color:'rgba(240,240,240,.65)', fontSize:'.82rem', lineHeight:1.65, fontWeight:300, marginBottom:20 }}>{zone.desc}</p>
              {/* Mini stats */}
              <div style={{ display:'flex', gap:20, marginBottom:20 }}>
                {zone.stats.map(([val, lbl]) => (
                  <div key={lbl}>
                    <div className="font-display" style={{ fontWeight:900, fontSize:'1.35rem', color:zone.accentColor, lineHeight:1 }}>{val}</div>
                    <div className="font-heading" style={{ fontSize:'.58rem', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(255,255,255,.35)', marginTop:2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" style={{ fontSize:'.78rem', padding:'10px 22px', alignSelf:'flex-start' }}>Enter Zone →</button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div style={{ display:'flex', gap:8, padding:'12px var(--pad) 32px', overflowX:'auto', scrollbarWidth:'none' }}>
            {zones.map((z, i) => (
              <button key={z.id} onClick={() => selectZone(i)}
                style={{
                  position:'relative', width:72, height:52, flexShrink:0, borderRadius:6, overflow:'hidden',
                  border:`2px solid ${i === activeZone ? z.accentColor : 'transparent'}`,
                  cursor:'pointer', transition:'border-color .25s', padding:0,
                }}
              >
                <img src={z.img} alt={z.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', inset:0, background: i === activeZone ? 'transparent' : 'rgba(0,0,0,.45)' }} />
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ── CHOOSE YOUR EXPERIENCE ──────────── */}
      <section id="experiences" style={{ background:'#111', position:'relative', overflow:'hidden' }}>
        {/* Ambient background that shifts per active exp */}
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 70% 60% at 70% 50%, rgba(192,21,42,.12) 0%, transparent 65%)`, pointerEvents:'none' }} />
        <div className="grid-bg" style={{ position:'absolute', inset:0, opacity:.5 }} />

        {/* ── DESKTOP ── */}
        <div className="exp-desktop" style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'100vh', maxHeight:780 }}>

            {/* LEFT — selector panel */}
            <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'80px clamp(28px,5vw,72px)' }}>
              <R>
                <p className="tag-label" style={{ marginBottom:16 }}>Interactive</p>
                <h2 className="section-title" style={{ fontSize:'clamp(2.4rem,4.5vw,5rem)', color:'#fff', marginBottom:20 }}>
                  CHOOSE YOUR<br /><span style={{ color:'var(--primary)' }}>EXPERIENCE</span>
                </h2>
                <p style={{ color:'rgba(255,255,255,.42)', fontWeight:300, lineHeight:1.75, fontSize:'.9rem', marginBottom:48, maxWidth:340 }}>
                  Every visit is different. Pick your mode and we'll point you to the right zone.
                </p>
              </R>

              {/* Experience selector cards */}
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {expItems.map((e, i) => {
                  const active = activeExp === e.id
                  return (
                    <R key={e.id} delay={i * 60}>
                      <button
                        onClick={() => setActiveExp(active ? 'all' : e.id)}
                        onMouseEnter={() => setActiveExp(e.id)}
                        style={{
                          display:'flex', alignItems:'center', gap:18, padding:'18px 22px',
                          background: active ? 'rgba(192,21,42,.14)' : 'rgba(255,255,255,.03)',
                          border:`1px solid ${active ? 'rgba(192,21,42,.55)' : 'rgba(255,255,255,.07)'}`,
                          cursor:'pointer', transition:'all .3s ease', textAlign:'left', position:'relative', overflow:'hidden',
                        }}
                      >
                        {/* Active left bar */}
                        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background: active ? 'var(--primary)' : 'transparent', transition:'background .3s' }} />
                        {/* Icon bubble */}
                        <div style={{ width:46, height:46, borderRadius:8, flexShrink:0, overflow:'hidden', position:'relative', border:`1px solid ${active ? 'rgba(192,21,42,.4)' : 'rgba(255,255,255,.1)'}`, transition:'border-color .3s' }}>
                          <img src={e.img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', filter: active ? 'none' : 'grayscale(60%) brightness(.6)', transition:'all .4s' }} />
                        </div>
                        <div style={{ flex:1 }}>
                          <div className="font-heading" style={{ fontWeight:700, fontSize:'1.05rem', letterSpacing:'.05em', textTransform:'uppercase', color: active ? '#fff' : 'rgba(255,255,255,.55)', transition:'color .25s', marginBottom:2 }}>{e.label}</div>
                          <div style={{ fontSize:'.78rem', color: active ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.28)', fontWeight:300, transition:'color .25s' }}>{e.sub}</div>
                        </div>
                        {/* Game tags */}
                        <div style={{ display:'flex', gap:5, flexWrap:'wrap', justifyContent:'flex-end', maxWidth:160 }}>
                          {e.games.slice(0,2).map(g => (
                            <span key={g} className="font-heading" style={{ fontSize:'.58rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', padding:'2px 7px', background: active ? 'rgba(192,21,42,.2)' : 'rgba(255,255,255,.05)', border:`1px solid ${active ? 'rgba(192,21,42,.35)' : 'rgba(255,255,255,.08)'}`, color: active ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,.25)', transition:'all .3s', whiteSpace:'nowrap' }}>{g}</span>
                          ))}
                        </div>
                        <span style={{ color: active ? 'var(--primary)' : 'rgba(255,255,255,.2)', fontSize:'.9rem', transition:'color .25s', flexShrink:0 }}>→</span>
                      </button>
                    </R>
                  )
                })}
              </div>
            </div>

            {/* RIGHT — full-bleed image + details */}
            <div style={{ position:'relative', overflow:'hidden' }}>
              {expItems.map((e, i) => (
                <div key={e.id} style={{ position:'absolute', inset:0, opacity: activeExp===e.id ? 1 : 0, transition:'opacity .55s ease', pointerEvents: activeExp===e.id ? 'auto' : 'none' }}>
                  <img src={e.img} alt={e.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(8,8,8,.85) 0%, rgba(8,8,8,.3) 50%, rgba(8,8,8,.6) 100%)' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(8,8,8,.8) 0%, transparent 50%)' }} />
                </div>
              ))}

              {/* Fallback when none selected */}
              <div style={{ position:'absolute', inset:0, opacity: activeExp==='all' ? 1 : 0, transition:'opacity .55s', background:'#111' }}>
                <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <div style={{ textAlign:'center', opacity:.18 }}>
                    <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, fontSize:'5rem', letterSpacing:'.1em', color:'#fff', lineHeight:1 }}>SELECT</div>
                    <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, fontSize:'5rem', letterSpacing:'.1em', color:'var(--primary)', lineHeight:1 }}>MODE</div>
                  </div>
                </div>
              </div>

              {/* Active exp overlay content */}
              {expItems.map(e => (
                <div key={e.id} style={{ position:'absolute', bottom:0, left:0, right:0, padding:'40px 44px', opacity: activeExp===e.id ? 1 : 0, transform: activeExp===e.id ? 'translateY(0)' : 'translateY(16px)', transition:'all .45s ease', pointerEvents:'none' }}>
                  <div style={{ color:'var(--primary)', marginBottom:14 }}>{ExpIcons[e.id]?.()}</div>
                  <h3 className="section-title" style={{ fontSize:'clamp(2rem,3.5vw,3.2rem)', color:'#fff', marginBottom:8 }}>{e.label}</h3>
                  <p className="font-heading" style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.16em', textTransform:'uppercase', color:'var(--primary)', marginBottom:20 }}>{e.sub}</p>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:28 }}>
                    {e.games.map(g => (
                      <span key={g} className="font-heading" style={{ fontSize:'.65rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', padding:'5px 12px', background:'rgba(192,21,42,.18)', border:'1px solid rgba(192,21,42,.4)', color:'rgba(255,255,255,.8)' }}>{g}</span>
                    ))}
                  </div>
                  <button className="btn-primary" style={{ fontSize:'.82rem', padding:'11px 28px' }}>Start Playing →</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="exp-mobile" style={{ display:'none', padding:'60px 0 0', position:'relative', zIndex:1 }}>
          <R>
            <div style={{ padding:'0 var(--pad)', marginBottom:36 }}>
              <p className="tag-label" style={{ marginBottom:12 }}>Interactive</p>
              <h2 className="section-title" style={{ fontSize:'clamp(2.2rem,8vw,3.6rem)', color:'#fff', marginBottom:10 }}>
                CHOOSE YOUR<br /><span style={{ color:'var(--primary)' }}>EXPERIENCE</span>
              </h2>
              <p style={{ color:'rgba(255,255,255,.38)', fontWeight:300, fontSize:'.85rem', lineHeight:1.65 }}>Pick your mode — we'll set you up.</p>
            </div>
          </R>

          {/* Horizontal snap cards */}
          <div style={{ display:'flex', gap:14, overflowX:'auto', scrollSnapType:'x mandatory', WebkitOverflowScrolling:'touch', scrollbarWidth:'none', padding:'0 var(--pad) 32px' }}>
            {expItems.map((e, i) => (
              <div key={e.id} style={{
                position:'relative', flexShrink:0, width:'78vw', maxWidth:300,
                height:420, borderRadius:16, overflow:'hidden',
                scrollSnapAlign:'start',
                boxShadow:'0 12px 40px rgba(0,0,0,.6)',
                border:'1px solid rgba(255,255,255,.07)',
              }}>
                <img src={e.img} alt={e.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(5,5,5,.97) 0%, rgba(5,5,5,.45) 55%, rgba(5,5,5,.1) 100%)' }} />
                {/* Top-left number */}
                <div style={{ position:'absolute', top:18, left:18, fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, fontSize:'3rem', color:'rgba(255,255,255,.08)', lineHeight:1, userSelect:'none' }}>
                  0{i+1}
                </div>
                {/* Red accent corner */}
                <div style={{ position:'absolute', top:0, right:0, width:0, height:0, borderStyle:'solid', borderWidth:'0 52px 52px 0', borderColor:`transparent var(--primary) transparent transparent`, opacity:.8 }} />
                <div style={{ position:'absolute', top:10, right:7, color:'#fff' }}>{ExpIcons[e.id]?.()}</div>

                {/* Bottom content */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'22px 22px 26px' }}>
                  <p className="font-heading" style={{ fontSize:'.64rem', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--primary)', marginBottom:6 }}>{e.sub}</p>
                  <h3 className="section-title" style={{ fontSize:'2rem', color:'#fff', marginBottom:14 }}>{e.label}</h3>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:18 }}>
                    {e.games.map(g => (
                      <span key={g} className="font-heading" style={{ fontSize:'.6rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', padding:'3px 9px', background:'rgba(192,21,42,.18)', border:'1px solid rgba(192,21,42,.4)', color:'rgba(255,255,255,.75)' }}>{g}</span>
                    ))}
                  </div>
                  <button className="btn-primary" style={{ fontSize:'.76rem', padding:'10px 22px', width:'100%' }}>Start Playing →</button>
                </div>
              </div>
            ))}
            {/* trailing spacer so last card doesn't hug edge */}
            <div style={{ width:4, flexShrink:0 }} />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────── */}
      <section className="section-pad" style={{ padding:'100px var(--pad)', background:'#141414', position:'relative', overflow:'hidden' }}>
        {/* Background decorations */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 50% at 50% 0%,rgba(192,21,42,.08) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div className="grid-bg" style={{ position:'absolute', inset:0 }} />

        <R>
          <div style={{ textAlign:'center', marginBottom:80 }}>
            <p className="tag-label" style={{ justifyContent:'center', marginBottom:14 }}>Simple Process</p>
            <h2 className="section-title" style={{ fontSize:'clamp(2.2rem,5vw,4.4rem)', color:'var(--fg)' }}>
              HOW IT <span style={{ color:'var(--primary)' }}>WORKS</span>
            </h2>
          </div>
        </R>

        {/* Staggered step cards */}
        <div className="howit-grid" style={{ position:'relative', maxWidth:1100, margin:'0 auto', display:'flex', gap:28, justifyContent:'center', flexWrap:'wrap' }}>
          {howItWorks.map((s, i) => {
            const isLast = i === howItWorks.length - 1
            const gradients: [string, string][] = [['#7a0f1f', '#c0152a'], ['#c0152a', '#e0182c'], ['#e0182c', '#f59e0b']]
            const [c1, c2] = gradients[i] ?? gradients[gradients.length - 1]
            const stepLabels = ['Step One', 'Step Two', 'Step Three']
            return (
              <R key={s.step} delay={i * 130} className={`howit-item${i % 2 === 1 ? ' howit-item-down' : ''}`}>
                {!isLast && (
                  <div className="howit-connector" style={{
                    position:'absolute', top:46, left:'100%', width:38, borderTop:`2px dashed ${c2}77`,
                    transform: i % 2 === 0 ? 'rotate(22deg)' : 'rotate(-22deg)', transformOrigin:'left center',
                  }} />
                )}
                <div style={{
                  background:'#1b1b1b', border:'1px solid rgba(255,255,255,.08)', borderRadius:16,
                  padding:'26px 24px 24px', position:'relative', overflow:'hidden',
                  boxShadow:'0 20px 44px rgba(0,0,0,.4)',
                }}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
                    <div style={{
                      width:52, height:52, borderRadius:14, flexShrink:0,
                      background:`linear-gradient(135deg, ${c1}, ${c2})`,
                      display:'flex', alignItems:'center', justifyContent:'center', color:'#fff',
                      boxShadow:`0 10px 22px ${c2}4d`,
                    }}>
                      {i === 0
                        ? <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2 8h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"/><path d="M7 12h.01M17 12h.01"/></svg>
                        : i === 1
                        ? <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        : <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      }
                    </div>
                    <span className="font-display" style={{ fontWeight:900, fontSize:'3rem', color:'rgba(255,255,255,.05)', lineHeight:1, userSelect:'none' }}>{s.step}</span>
                  </div>
                  <p className="font-heading" style={{ fontSize:'.66rem', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:c2, marginBottom:10 }}>{stepLabels[i]}</p>
                  <h3 style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, fontSize:'1.3rem', color:'#fff', marginBottom:10, letterSpacing:'.01em' }}>{s.title}</h3>
                  <p style={{ color:'rgba(255,255,255,.5)', fontSize:'.85rem', lineHeight:1.7, fontWeight:300 }}>{s.desc}</p>
                </div>
                <div style={{ display:'flex', justifyContent:'center', marginTop:22 }}>
                  <div style={{ width:14, height:14, borderRadius:'50%', border:`2px solid ${c2}` }} />
                </div>
              </R>
            )
          })}
        </div>

        <R delay={220}>
          <div style={{ textAlign:'center', marginTop:60 }}>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <button className="btn-primary" style={{ fontSize:'.86rem', padding:'14px 42px' }}>Book Your Session</button>
            </a>
          </div>
        </R>
      </section>

      {/* ══════════════════════════════════════
          REVIEWS — infinite horizontal scroll
      ══════════════════════════════════════ */}
      <section className="section-pad" style={{ padding:'90px 0', background:'#202020', overflow:'hidden' }}>
        <R>
          <div style={{ textAlign:'center', marginBottom:48, padding:'0 var(--pad)' }}>
            <p className="tag-label" style={{ justifyContent:'center', marginBottom:12 }}>Players Love Us</p>
            <h2 className="section-title" style={{ fontSize:'clamp(2.2rem,5vw,4.2rem)', color:'var(--fg)', marginBottom:14 }}>
              WHAT THEY <span style={{ color:'var(--primary)' }}>SAY</span>
            </h2>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:9 }}>
              <span style={{ color:'#f59e0b', fontSize:'1.2rem', letterSpacing:2 }}>★★★★★</span>
              <span className="font-display" style={{ fontWeight:700, fontSize:'1.35rem', color:'var(--fg)' }}>4.9</span>
              <span style={{ color:'var(--muted-fg)', fontSize:'.82rem' }}>from 380+ reviews</span>
            </div>
          </div>
        </R>

        {/* Infinite scroll track */}
        <div style={{ position:'relative' }}>
          {/* Fade edges */}
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:120, zIndex:2, background:'linear-gradient(to right,#202020,transparent)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', right:0, top:0, bottom:0, width:120, zIndex:2, background:'linear-gradient(to left,#202020,transparent)', pointerEvents:'none' }} />

          <div style={{ display:'flex', gap:16, animation:'review-scroll 32s linear infinite', width:'max-content', padding:'4px 0' }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState='paused')}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState='running')}
          >
            {reviewTrack.map((r, i) => (
              <div key={i} className="review-card clip-hex-sm" style={{ width:310, flexShrink:0, padding:'24px 24px 28px' }}>
                <div style={{ display:'flex', gap:2, marginBottom:14 }}>
                  {Array.from({ length:r.rating }).map((_, j) => <span key={j} style={{ color:'#f59e0b', fontSize:'.9rem' }}>★</span>)}
                  {r.rating < 5 && <span style={{ color:'rgba(245,158,11,.25)', fontSize:'.9rem' }}>★</span>}
                </div>
                <p style={{ color:'var(--card-fg)', lineHeight:1.7, fontSize:'.86rem', fontWeight:300, fontStyle:'italic', marginBottom:20 }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                    <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,var(--primary),#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <span className="font-display" style={{ fontWeight:700, fontSize:'.85rem', color:'#fff' }}>{r.name[0]}</span>
                    </div>
                    <span className="font-heading" style={{ fontWeight:700, letterSpacing:'.04em', color:'var(--card-fg)', fontSize:'.9rem' }}>{r.name}</span>
                  </div>
                  <span className="font-heading" style={{ fontSize:'.6rem', fontWeight:600, letterSpacing:'.13em', padding:'3px 9px', background:'rgba(192,21,42,.12)', border:'1px solid rgba(192,21,42,.28)', color:'var(--primary)', textTransform:'uppercase' }}>{r.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ
      ══════════════════════════════════════ */}
      <section style={{ padding:'100px var(--pad)', background:'var(--bg)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-160, left:-160, width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle,rgba(192,21,42,.07) 0%,transparent 65%)', pointerEvents:'none' }} />

        <div style={{ maxWidth:860, margin:'0 auto' }}>
          <R>
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:18, marginBottom:56 }}>
              <div>
                <p className="tag-label" style={{ marginBottom:12 }}>Got Questions?</p>
                <h2 className="section-title" style={{ fontSize:'clamp(2.2rem,5vw,4.4rem)', color:'var(--fg)' }}>
                  FREQUENTLY<br /><span style={{ color:'var(--primary)' }}>ASKED</span>
                </h2>
              </div>
              <p style={{ color:'var(--muted-fg)', maxWidth:280, fontWeight:300, fontSize:'.88rem', lineHeight:1.7 }}>
                Everything you need to know before your first visit.
              </p>
            </div>
          </R>

          <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <R key={i} delay={i * 50}>
                  <div
                    style={{
                      background: isOpen ? 'rgba(192,21,42,.07)' : 'rgba(255,255,255,.03)',
                      border:`1px solid ${isOpen ? 'rgba(192,21,42,.35)' : 'rgba(255,255,255,.07)'}`,
                      transition:'all .3s ease', overflow:'hidden',
                    }}
                  >
                    {/* Question row */}
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      style={{
                        width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                        gap:16, padding:'22px 28px', background:'none', border:'none', cursor:'pointer',
                        textAlign:'left',
                      }}
                    >
                      <div style={{ display:'flex', alignItems:'center', gap:16, flex:1, minWidth:0 }}>
                        <span className="font-display" style={{ fontWeight:700, fontSize:'.78rem', color: isOpen ? 'var(--primary)' : 'rgba(192,21,42,.4)', letterSpacing:'.08em', flexShrink:0 }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-heading" style={{ fontWeight:700, fontSize:'1.05rem', letterSpacing:'.03em', color: isOpen ? '#fff' : 'var(--fg)', transition:'color .25s' }}>
                          {faq.q}
                        </span>
                      </div>
                      {/* Plus / minus icon */}
                      <div style={{
                        width:32, height:32, borderRadius:3, flexShrink:0,
                        background: isOpen ? 'var(--primary)' : 'rgba(192,21,42,.12)',
                        border:`1px solid ${isOpen ? 'var(--primary)' : 'rgba(192,21,42,.25)'}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        transition:'all .25s ease',
                        color: isOpen ? '#fff' : 'var(--primary)',
                      }}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 14 14">
                          <line x1="7" y1="1" x2="7" y2="13" style={{ transform: isOpen ? 'scaleY(0)' : 'scaleY(1)', transformOrigin:'center', transition:'transform .25s' }} />
                          <line x1="1" y1="7" x2="13" y2="7" />
                        </svg>
                      </div>
                    </button>

                    {/* Answer */}
                    <div style={{
                      maxHeight: isOpen ? 200 : 0,
                      overflow:'hidden',
                      transition:'max-height .4s cubic-bezier(.4,0,.2,1)',
                    }}>
                      <p style={{ padding:'0 28px 24px calc(28px + 16px + 36px)', color:'var(--muted-fg)', fontSize:'.88rem', lineHeight:1.8, fontWeight:300 }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </R>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          VENUE + CONTACT — combined
      ══════════════════════════════════════ */}
      <section id="about" style={{ position:'relative', overflow:'hidden' }}>
        {/* Full-bleed background image with overlay */}
        <img src={IMG.venue} alt="Venue" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.14 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(8,8,8,.97) 0%,rgba(14,10,10,.94) 100%)' }} />
        {/* Glow */}
        <div style={{ position:'absolute', top:-220, left:'50%', transform:'translateX(-50%)', width:700, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(192,21,42,.16) 0%,transparent 68%)', pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:1, padding:'96px var(--pad) 100px' }}>
          {/* Heading + description */}
          <R>
            <div style={{ maxWidth:600, margin:'0 auto 56px', textAlign:'center' }}>
              <p className="tag-label" style={{ justifyContent:'center', marginBottom:16 }}>The Venue · Get In Touch</p>
              <h2 className="section-title" style={{ fontSize:'clamp(2.4rem,5.5vw,4.6rem)', color:'#fff', lineHeight:1, marginBottom:20 }}>
                THE GAMING ZONE.<br /><span style={{ color:'var(--primary)' }}>LET'S PLAY.</span>
              </h2>
              <p style={{ fontSize:'.95rem', fontWeight:300, color:'rgba(240,240,240,.6)', lineHeight:1.75, margin:'0 auto 28px' }}>
                20,000 sq. ft. of pure gaming paradise — championship rigs, VR suites, pro racing cockpits. Walk in anytime, or reach out below.
              </p>
              <div style={{ width:44, height:2, background:'var(--primary)', margin:'0 auto' }} />
            </div>
          </R>

          {/* Info cards row */}
          <div className="contact-cards" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, maxWidth:980, margin:'0 auto' }}>
            {[
              {
                icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
                label:'Find Us',
                val:'DSS No. 8, First Floor, 13/17',
                sub:CONTACT.address,
                accent:'#c0152a',
                href:CONTACT.mapsUrl,
              },
              {
                icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
                label:'Open Hours',
                val:'Monday – Sunday',
                sub:'10 AM – 9 PM',
                accent:'#7c3aed',
              },
              {
                icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z"/></svg>,
                label:'Call Us',
                val:CONTACT.phoneDisplay,
                sub:'Available during open hours',
                accent:'#0ea5e9',
                href:CONTACT.telUrl,
              },
            ].map((item, i) => {
              const Tag = item.href ? 'a' as const : 'div' as const
              return (
              <R key={item.label} delay={i * 80}>
                <Tag
                  {...(item.href ? item.href.startsWith('tel:')
                    ? { href: item.href }
                    : { href: item.href, target:'_blank', rel:'noopener noreferrer' } : {})}
                  style={{
                  display:'flex', flexDirection:'column', height:'100%', boxSizing:'border-box',
                  background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:10,
                  backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
                  padding:'32px 28px', position:'relative', overflow:'hidden',
                  transition:'all .3s ease', cursor: item.href ? 'pointer' : 'default', textDecoration:'none',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,.07)'; el.style.borderColor = `${item.accent}55`; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 16px 32px rgba(0,0,0,.35), 0 0 0 1px ${item.accent}22` }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,.04)'; el.style.borderColor = 'rgba(255,255,255,.08)'; el.style.transform = 'none'; el.style.boxShadow = 'none' }}
                >
                  <div style={{ position:'absolute', top:0, left:0, width:'100%', height:2, background:`linear-gradient(to right,${item.accent},transparent)` }} />
                  <div style={{ width:44, height:44, borderRadius:'50%', flexShrink:0, background:`${item.accent}1a`, border:`1px solid ${item.accent}44`, display:'flex', alignItems:'center', justifyContent:'center', color:item.accent, marginBottom:20 }}>
                    {item.icon}
                  </div>
                  <p className="font-heading" style={{ fontSize:'.65rem', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color:item.accent, marginBottom:8, flexShrink:0 }}>{item.label}</p>
                  <p className="font-heading" style={{ fontWeight:700, fontSize:'1.05rem', letterSpacing:'.03em', lineHeight:1.35, color:'#fff', marginBottom:8, minHeight:'2.7em', flexShrink:0 }}>{item.val}</p>
                  <p style={{ color:'var(--muted-fg)', fontSize:'.8rem', lineHeight:1.5, marginTop:'auto' }}>{item.sub}</p>
                </Tag>
              </R>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────── */}
      <footer style={{ background:'#181818', borderTop:'1px solid var(--border)', padding:'52px var(--pad) 32px' }}>
        <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:'clamp(24px,4vw,40px)', marginBottom:44 }}>
          <div>
            <h3 className="section-title" style={{ fontSize:'1.7rem', color:'#fff', marginBottom:12 }}>
              GAMERZ <span style={{ color:'var(--primary)' }}>PARADISE</span>
            </h3>
            <p style={{ color:'var(--muted-fg)', fontSize:'.83rem', lineHeight:1.7, fontWeight:300, maxWidth:400, marginBottom:16 }}>
              Panipat's premier gaming paradise — VR, PC, Racing, Console and Esports all under one roof.
            </p>
            <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:8, color:'var(--muted-fg)', fontSize:'.83rem', textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color='var(--primary)')}
              onMouseLeave={e => (e.currentTarget.style.color='var(--muted-fg)')}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>
              Follow us on Instagram
            </a>
          </div>
          <div>
            <h4 className="font-heading" style={{ fontWeight:700, fontSize:'.68rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--fg)', marginBottom:14 }}>Contact</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"
                style={{ display:'flex', alignItems:'center', gap:9, color:'var(--muted-fg)', fontSize:'.83rem', textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color='var(--primary)')}
                onMouseLeave={e => (e.currentTarget.style.color='var(--muted-fg)')}
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ flexShrink:0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z"/></svg>
                {CONTACT.phoneDisplay}
              </a>
              <div style={{ display:'flex', alignItems:'flex-start', gap:9, color:'var(--muted-fg)', fontSize:'.83rem', lineHeight:1.6, maxWidth:280 }}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ flexShrink:0, marginTop:2 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                <span>{CONTACT.address}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop:'1px solid var(--border)', paddingTop:20, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
          <span style={{ color:'var(--muted-fg)', fontSize:'.76rem' }}>© 2026 Gamerz Paradise. All rights reserved.</span>
          <span style={{ color:'var(--muted-fg)', fontSize:'.76rem' }}>Crafted for gamers, by gamers.</span>
        </div>
      </footer>

      <style>{`
        @keyframes review-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          #nav-desktop { display: none !important; }
          .hero-subtext { white-space: normal !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .location-grid { grid-template-columns: 1fr !important; }
          .contact-cards { grid-template-columns: 1fr !important; }
          .bento-desktop { display: none !important; }
          .bento-mobile  { display: flex !important; }
          .zones-desktop { display: none !important; }
          .zones-mobile  { display: block !important; }
          .exp-desktop   { display: none !important; }
          .exp-mobile    { display: block !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .cta-row { flex-direction: column; }
          .cta-row a, .cta-row button { width: 100%; text-align: center; display: block; }
          .contact-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
