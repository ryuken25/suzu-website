'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Bell, Check, ChevronDown, Copy, ExternalLink, Handshake, Mail, Menu, MessageCircle, Music2, Palette, Sparkles, Star, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { portfolio, portfolioTabs, type PortfolioItem, type PortfolioCategory } from '@/data/portfolio';
import { pricing, priceNotes } from '@/data/pricing';
import { faqs } from '@/data/faq';
import { getCollabs } from '@/lib/collabs';
import { getXArt } from '@/lib/x-art';
import { cn, mailtoUrl, gmailComposeUrl } from '@/lib/utils';

const nav = [['home','Home'],['open-collab','Open Collab'],['portfolio','Portfolio'],['pricing','Pricing'],['terms','Terms'],['process','Process'],['faq','FAQ'],['contact','Contact']];
const contact = { email:'mysuzuverse@gmail.com', x:'https://x.com/ssuzudayo', discord:'@suzuuv' };

function go(id:string){ const el=document.getElementById(id); if(el) window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-88,behavior:'smooth'}); }
function SectionHeader({eyebrow,title,intro}:{eyebrow:string;title:string;intro?:string}){ return <div className="mx-auto mb-10 max-w-3xl text-center"><p className="eyebrow">{eyebrow}</p><h2 className="section-title mt-3">{title}</h2>{intro&&<p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-mocha sm:text-lg">{intro}</p>}</div> }
function Navbar(){ const [open,setOpen]=useState(false); return <><nav className="fixed left-1/2 top-3 z-50 hidden w-[min(1180px,calc(100%-24px))] -translate-x-1/2 rounded-full border border-pink/25 bg-white/75 px-3 py-2 shadow-[0_20px_60px_rgba(126,104,114,.14)] backdrop-blur-2xl md:block"><div className="flex items-center justify-between gap-3"><button onClick={()=>go('home')} className="flex items-center gap-2 rounded-full px-4 py-2 font-display text-xl font-black"><Bell className="h-5 w-5 text-pink"/>Suzu</button><div className="flex items-center gap-1">{nav.map(([id,label])=><button key={id} onClick={()=>go(id)} className="rounded-full px-3 py-2 text-sm font-bold text-mocha transition hover:bg-pink/10 hover:text-ink">{label}</button>)}</div><button onClick={()=>go('contact')} className="soft-button px-5 py-2.5">Open</button></div></nav><div className="fixed right-4 top-4 z-50 md:hidden"><button onClick={()=>setOpen(!open)} className="glass rounded-full p-3"><Menu/></button></div><AnimatePresence>{open&&<motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} className="fixed inset-x-3 top-16 z-50 rounded-[2rem] border border-pink/25 bg-white/90 p-4 shadow-soft backdrop-blur-2xl md:hidden"><div className="grid grid-cols-2 gap-2">{nav.map(([id,label])=><button key={id} onClick={()=>{setOpen(false);go(id)}} className="rounded-2xl bg-pink/10 px-4 py-3 text-left text-sm font-black text-ink">{label}</button>)}</div></motion.div>}</AnimatePresence><div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 gap-2 rounded-3xl border border-pink/25 bg-white/85 p-2 shadow-[0_20px_60px_rgba(126,104,114,.2)] backdrop-blur-xl md:hidden">{nav.slice(0,4).map(([id,label])=><button key={id} onClick={()=>go(id)} className="rounded-2xl px-2 py-2 text-xs font-black text-mocha hover:bg-pink/15">{label.split(' ')[0]}</button>)}</div></> }
function SuzuBellDiorama(){ const reduce=useReducedMotion(); const imgs=portfolio.filter(x=>x.featured).slice(0,3); return <motion.div className="relative mx-auto h-[390px] w-full max-w-[560px] sm:h-[480px]" animate={reduce?{}:{y:[0,-8,0]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut'}}><div className="absolute inset-8 rounded-[4rem] bg-gradient-to-br from-pink/30 via-lavender/25 to-sky/25 blur-3xl"/><div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-b-[44%] rounded-t-full border border-white/80 bg-white/40 shadow-[inset_0_2px_18px_rgba(255,255,255,.6),0_30px_90px_rgba(246,167,198,.32)] backdrop-blur-xl"><div className="absolute left-1/2 top-5 h-4 w-16 -translate-x-1/2 rounded-full bg-peach/70"/><div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-pink/45"/><div className="absolute -top-8 left-1/2 h-16 w-28 -translate-x-1/2 rounded-full border-t-8 border-pink/55"/><div className="absolute -right-7 top-10 h-16 w-9 rotate-12 rounded-full bg-pink/45"/><div className="absolute -left-7 top-10 h-16 w-9 -rotate-12 rounded-full bg-pink/45"/></div>{imgs.map((it,i)=><motion.div key={it.id} className="absolute w-28 rounded-3xl border border-white/80 bg-white/75 p-2 shadow-[0_20px_55px_rgba(126,104,114,.18)] sm:w-36" style={{left:['2%','65%','47%'][i], top:['16%','5%','67%'][i]}} animate={reduce?{}:{y:[0,-12,0],rotate:[-4,4,-4]}} transition={{duration:5+i,repeat:Infinity,delay:i*.35,ease:'easeInOut'}}><Image src={it.thumb} alt={it.alt} width={360} height={360} className="aspect-square rounded-2xl object-cover"/><p className="mt-2 line-clamp-1 text-center text-[11px] font-black text-mocha">{it.title}</p></motion.div>)}{['✦','♡','✧','✿'].map((s,i)=><span key={i} className="sparkle absolute text-2xl text-pink" style={{left:['18%','82%','35%','70%'][i],top:['10%','38%','78%','82%'][i],animationDelay:`${i*.4}s`}}>{s}</span>)}</motion.div> }
function Hero({openContact}:{openContact:(mode:string)=>void}){ return <section id="home" className="relative min-h-[92svh] overflow-hidden pb-16 pt-28 sm:pt-36"><div className="pointer-events-none absolute inset-0"><div className="absolute left-8 top-28 rotate-[-8deg] rounded-3xl bg-white/50 px-5 py-3 font-display font-black text-pink shadow-soft">Soft Daydream Studio</div><div className="absolute bottom-24 right-10 rotate-6 rounded-3xl bg-peach/40 px-5 py-3 font-black text-mocha shadow-soft">ribbon notes</div></div><div className="container-suzu grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]"><motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}}><div className="inline-flex items-center gap-2 rounded-full border border-pink/30 bg-white/70 px-4 py-2 text-sm font-black text-mocha shadow-soft"><span className="h-2 w-2 rounded-full bg-pink shadow-[0_0_18px_rgba(246,167,198,.9)]"/>Commission & Collab Open</div><h1 className="mt-6 font-display text-[clamp(3.4rem,8vw,7.8rem)] font-black leading-[.88] tracking-[-.055em]">Pesona Suzu <span className="text-pink">Art Studio</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-mocha">Soft anime and chibi illustration for personal gifts, profile icons, character moments, and creative collaborations.</p><div className="mt-7 flex flex-wrap gap-3"><button onClick={()=>openContact('commission')} className="soft-button">Open Commission <ArrowRight className="ml-2 inline h-4 w-4"/></button><button onClick={()=>go('open-collab')} className="ghost-button">See Collab Works</button></div><div className="mt-6 flex flex-wrap gap-2">{['Chibi','Anime','Couple Art','Character Art','Collab Assets'].map(x=><span key={x} className="tag">{x}</span>)}</div></motion.div><SuzuBellDiorama/></div></section> }
function OpenCollab({openContact}:{openContact:(mode:string)=>void}){ const cards = [
  { title:'Cover / MV Illustration', Icon:Music2, desc:'YouTube cover, music video still, thumbnail, visualizer.' },
  { title:'VTuber / Stream Asset', Icon:Sparkles, desc:'Chibi, sticker, panel, profile decoration, tiny assets.' },
  { title:'OC / Mascot Project', Icon:Palette, desc:'Character-focused artwork for persona, brand, or event.' },
  { title:'Mutual Creative Collab', Icon:Handshake, desc:'Shared creator project with clear credit and timeline.' },
]; return <section id="open-collab" className="py-20"><div className="container-suzu grid gap-8 lg:grid-cols-[.9fr_1.1fr]"><div className="glass-strong rounded-[2.5rem] p-8 sm:p-10"><p className="eyebrow">Open / Selective</p><h2 className="mt-3 font-display text-5xl font-black leading-tight">Open Collab</h2><p className="mt-5 leading-8 text-mocha">Suzu is open for creative collaborations with a clear scope, role, usage, credit format, timeline, and output. Send a proposal when the project has shape.</p><div className="mt-6 grid gap-3 text-sm font-bold text-mocha"><p>Prepare: brief, role, deadline, usage, credit, budget/value, references.</p><p>Filtered out: vague asks, huge unpaid commercial work, AI dataset/training, hate/gore, exact style copying.</p></div><button onClick={()=>openContact('collab')} className="soft-button mt-8">Propose a Collab</button></div><div className="grid gap-4 sm:grid-cols-2">{cards.map(({ title, Icon, desc })=><motion.div key={title} whileHover={{y:-6,rotate:-1}} className="glass rounded-[2rem] p-6"><Icon className="h-8 w-8 text-pink"/><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-mocha">{desc}</p></motion.div>)}</div></div></section> }
function Portfolio({openContact}:{openContact:(mode:string)=>void}){ const [tab,setTab]=useState<'all'|PortfolioCategory>('all'); const [sel,setSel]=useState<PortfolioItem|null>(null); const items=useMemo(()=>tab==='all'?portfolio:portfolio.filter(i=>i.categories.includes(tab)),[tab]); const featured=portfolio.filter(i=>i.featured); return <section id="portfolio" className="py-20"><div className="container-suzu"><SectionHeader eyebrow="Portfolio" title="Chibi, anime, pair moments" intro="Browse by style so chibi and normal/anime samples stay clear."/><div className="mb-8 grid gap-4 lg:grid-cols-4">{featured.map(it=><button key={it.id} onClick={()=>setSel(it)} className="group glass overflow-hidden rounded-[2rem] p-3 text-left transition hover:-translate-y-1"><Image src={it.thumb} alt={it.alt} width={620} height={620} className="aspect-square rounded-[1.5rem] object-cover transition group-hover:scale-[1.03]"/><p className="mt-3 font-black">{it.title}</p></button>)}</div><div className="mb-8 flex flex-wrap justify-center gap-2">{portfolioTabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} className={cn('rounded-full px-4 py-2 text-sm font-black transition',tab===t.id?'bg-pink text-white shadow-soft':'bg-white/65 text-mocha hover:bg-white')}>{t.label}</button>)}</div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map(it=><motion.button layout key={it.id} onClick={()=>setSel(it)} className="group glass overflow-hidden rounded-[2rem] p-3 text-left"><div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-white/50"><Image src={it.thumb} alt={it.alt} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105"/></div><h3 className="mt-3 font-black">{it.title}</h3><div className="mt-2 flex flex-wrap gap-1">{it.categories.map(c=><span key={c} className="rounded-full bg-pink/10 px-2 py-1 text-[10px] font-black uppercase text-pink">{c}</span>)}</div></motion.button>)}</div></div><AnimatePresence>{sel&&<motion.div className="fixed inset-0 z-[80] grid place-items-center bg-ink/45 p-4 backdrop-blur-md" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSel(null)}><motion.div initial={{scale:.96,y:20}} animate={{scale:1,y:0}} exit={{scale:.96,y:20}} onClick={e=>e.stopPropagation()} className="grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-soft lg:grid-cols-[1.1fr_.9fr]"><div className="relative min-h-[360px] bg-[#fff7f2]"><Image src={sel.file} alt={sel.alt} fill sizes="90vw" className="object-contain p-4"/></div><div className="p-7"><button onClick={()=>setSel(null)} className="float-right rounded-full bg-pink/10 p-2"><X/></button><p className="eyebrow">Portfolio sample</p><h3 className="mt-3 font-display text-4xl font-black">{sel.title}</h3><p className="mt-4 leading-7 text-mocha">{sel.alt}</p><div className="mt-5 flex flex-wrap gap-2">{sel.tags.map(t=><span key={t} className="tag">{t}</span>)}</div><button onClick={()=>openContact('commission')} className="soft-button mt-8">Ask for similar style</button></div></motion.div></motion.div>}</AnimatePresence></section> }
function XArtFeed({openContact}:{openContact:(mode:string)=>void}){
  const items=getXArt();
  return (
    <section id="x-art" className="py-16">
      <div className="container-suzu">
        <SectionHeader
          eyebrow="From X @ssuzudayo"
          title="Fresh Art from X"
          intro="Only posts that look like Suzu’s own drawing/illustration. VRC, game screenshots, status selfies, and gift dumps are filtered out."
        />
        {items.length===0 ? (
          <div className="glass mx-auto max-w-3xl rounded-[2rem] p-8 text-center">
            <Palette className="mx-auto h-10 w-10 text-pink"/>
            <h3 className="mt-4 text-2xl font-black">No verified X art posts yet</h3>
            <p className="mt-3 text-mocha">The scraper only keeps posts with clear drawing wording + media. Browse the local portfolio meanwhile.</p>
            <button onClick={()=>go('portfolio')} className="soft-button mt-6">See Portfolio</button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item)=> (
              <article key={item.id} className="glass overflow-hidden rounded-[2rem] p-3">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-white/50">
                  <Image src={item.media[0].url} alt={item.media[0].alt||item.text} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover"/>
                </div>
                <div className="p-3">
                  <span className="tag">Verified X Art</span>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-mocha">{item.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a className="ghost-button" href={item.url} target="_blank" rel="noopener noreferrer">Open on X</a>
                    <button className="soft-button" onClick={()=>openContact('commission')}>Request similar</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CollabFeed({openContact}:{openContact:(mode:string)=>void}){
  const collabs=getCollabs();
  return (
    <section id="collab-works" className="py-16">
      <div className="container-suzu">
        <SectionHeader
          eyebrow="Strict archive"
          title="Verified Collab Works from X"
          intro="Only posts with clear project/collaborator signals. No dummy posts. No solo art. No game clips."
        />
        {collabs.length===0 ? (
          <div className="glass mx-auto max-w-3xl rounded-[2rem] p-8 text-center">
            <Star className="mx-auto h-10 w-10 text-pink"/>
            <h3 className="mt-4 text-2xl font-black">No verified collab posts found yet.</h3>
            <p className="mt-3 text-mocha">Suzu’s public X is mostly casual/VRC. When a real collab/project post appears, it will show here after strict filtering.</p>
            <button onClick={()=>openContact('collab')} className="soft-button mt-6">Propose a Collab</button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {collabs.map((c)=>(
              <div key={c.id} className="glass rounded-[2rem] p-5">
                <span className="tag">{c.source==='manual'?'Curated Collab':'Verified Collab'}</span>
                <p className="mt-4 line-clamp-4 text-sm leading-7 text-mocha">{c.text}</p>
                <a className="ghost-button mt-5 inline-flex" href={c.url} target="_blank" rel="noopener noreferrer">Open on X</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Pricing(){ return <section id="pricing" className="py-20"><div className="container-suzu"><SectionHeader eyebrow="Pricing" title="Simple commission menu" intro="Base prices from Suzu’s pricelist. Final quote depends on scope."/><div className="grid gap-6 lg:grid-cols-2">{pricing.map(card=><div key={card.style} className="glass-strong rounded-[2.5rem] p-8"><h3 className="font-display text-4xl font-black">{card.style}</h3><p className="mt-2 text-mocha">{card.note}</p><div className="mt-6 divide-y divide-pink/15">{card.rows.map(r=><div key={r[0]} className="flex items-center justify-between py-4"><span className="font-black">{r[0]}</span><span className="text-right font-black text-pink">{r[1]} <span className="text-mocha">/ {r[2]}</span></span></div>)}</div></div>)}</div><div className="glass mt-6 rounded-[2rem] p-6"><ul className="grid gap-2 text-sm font-bold text-mocha md:grid-cols-3">{priceNotes.map(n=><li key={n} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-pink"/>{n}</li>)}</ul></div></div></section> }
function Accordions(){ const terms=[['Accepted',['Original character','Anime-style character art','Chibi icon/sticker-style art','Couple/pair art','Simple pet or mascot detail','Cover/MV/collab assets if scope is clear']],['Not accepted',['Hate or harmful content','Gore/extreme violence','Exact copy of another artist style','Very complex mecha/armor/weapons unless approved','Commercial use without discussion','AI model training / dataset usage']],['Usage & posting',['Default use is personal unless discussed otherwise.','Client/creator may post finished artwork with proper credit.','Artist may use finished work as portfolio sample unless agreed private.','Commercial use must be discussed before payment.']],['Revision & timeline',['Minor revisions are allowed during sketch/checkpoint.','Major changes after rendering may require extra fee.','Timeline depends on queue and complexity.','Rush deadline must be discussed first.']]]; const [open,setOpen]=useState(0); return <section id="terms" className="py-20"><div className="container-suzu"><SectionHeader eyebrow="Terms" title="Clear scope, soft process"/><div className="mx-auto max-w-4xl space-y-3">{terms.map((t,i)=><div key={t[0] as string} className="glass rounded-[1.5rem]"><button className="flex w-full items-center justify-between p-5 text-left font-black" onClick={()=>setOpen(open===i?-1:i)}>{t[0]}<ChevronDown className={cn('transition',open===i&&'rotate-180')}/></button><AnimatePresence>{open===i&&<motion.ul initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden px-5 pb-5 text-mocha">{(t[1] as string[]).map(x=><li key={x} className="flex gap-2 py-1"><Check className="h-5 w-5 text-pink"/>{x}</li>)}</motion.ul>}</AnimatePresence></div>)}</div></div></section> }
function Process(){ const a=['Brief & references','Scope check','Price confirmation','Sketch / early preview','Render & revision','Delivery + credit info']; const b=['Send proposal','Fit check','Agree role/credit/timeline','Asset creation','Launch/post together']; return <section id="process" className="py-20"><div className="container-suzu"><SectionHeader eyebrow="Process" title="From tiny idea to finished art"/><div className="grid gap-6 lg:grid-cols-2"><Flow title="Commission Flow" items={a}/><Flow title="Open Collab Flow" items={b}/></div></div></section> }
function Flow({title,items}:{title:string;items:string[]}){ return <div className="glass-strong rounded-[2.5rem] p-7"><h3 className="font-display text-3xl font-black">{title}</h3><div className="mt-6 space-y-3">{items.map((x,i)=><div key={x} className="flex gap-4 rounded-2xl bg-white/55 p-4"><span className="font-display text-2xl font-black text-pink">{String(i+1).padStart(2,'0')}</span><span className="font-bold text-mocha">{x}</span></div>)}</div></div> }
function FAQ(){ const [open,setOpen]=useState(0); return <section id="faq" className="py-20"><div className="container-suzu"><SectionHeader eyebrow="FAQ" title="Tiny notes before ordering"/><div className="mx-auto max-w-4xl space-y-3">{faqs.map(([q,a],i)=><button key={q} onClick={()=>setOpen(open===i?-1:i)} className="glass block w-full rounded-[1.5rem] p-5 text-left transition hover:-translate-y-1 hover:border-pink/45"><div className="flex justify-between gap-4"><h3 className="font-black">{q}</h3><ChevronDown className={cn('shrink-0 transition',open===i&&'rotate-180')}/></div><AnimatePresence>{open===i&&<motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden pt-3 leading-7 text-mocha">{a}</motion.p>}</AnimatePresence></button>)}</div></div></section> }
function ContactModal({mode,onClose}:{mode:string|null;onClose:()=>void}){
  const [form,setForm]=useState({name:'',contact:'',type:mode||'commission',deadline:'',brief:''});
  const [copied,setCopied]=useState(false);
  if(!mode) return null;
  const subject=`Pesona Suzu ${form.type} request`;
  const body=`Pesona Suzu Request\n\nType: ${form.type}\nName/handle: ${form.name}\nContact: ${form.contact}\nDeadline: ${form.deadline}\n\nBrief:\n${form.brief}\n\nReferences / moodboard: `;
  const copy=async()=>{ try{ await navigator.clipboard.writeText(body); setCopied(true); setTimeout(()=>setCopied(false),2000);}catch{} };
  return (
    <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-ink/40 p-4 backdrop-blur-md" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
      <motion.div onClick={e=>e.stopPropagation()} initial={{scale:.96,y:20}} animate={{scale:1,y:0}} exit={{scale:.96,y:20}} className="w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-soft">
        <button onClick={onClose} className="float-right rounded-full bg-pink/10 p-2"><X/></button>
        <p className="eyebrow">Contact Suzu</p>
        <h3 className="mt-2 font-display text-4xl font-black">Tell us what you need</h3>
        <p className="mt-2 text-sm text-mocha">No SMTP yet. Open Gmail compose or your default mail app with a ready summary.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <input className="rounded-2xl border border-pink/25 bg-white px-4 py-3" placeholder="Name / handle" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input className="rounded-2xl border border-pink/25 bg-white px-4 py-3" placeholder="Contact method" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})}/>
          <select className="rounded-2xl border border-pink/25 bg-white px-4 py-3" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
            <option value="commission">I want to commission</option>
            <option value="collab">I want to propose collab</option>
            <option value="availability">I want to ask availability</option>
          </select>
          <input className="rounded-2xl border border-pink/25 bg-white px-4 py-3" placeholder="Deadline / launch date" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})}/>
          <textarea className="min-h-36 rounded-2xl border border-pink/25 bg-white px-4 py-3 sm:col-span-2" placeholder="Brief, usage, references, budget/value..." value={form.brief} onChange={e=>setForm({...form,brief:e.target.value})}/>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="soft-button" href={gmailComposeUrl(subject, body)} target="_blank" rel="noopener noreferrer">Open in Gmail</a>
          <a className="ghost-button" href={mailtoUrl(subject, body)}>Open Email App</a>
          <button onClick={copy} className="ghost-button"><Copy className="mr-2 inline h-4 w-4"/>{copied?'Copied!':'Copy Summary'}</button>
          <a className="ghost-button" href={contact.x} target="_blank" rel="noopener noreferrer">X DM</a>
        </div>
        <p className="mt-4 text-sm text-mocha">Email: {contact.email} • Discord: {contact.discord}</p>
        <p className="mt-2 text-xs text-mocha/80">Gmail compose opens gmail.com if you&apos;re logged in. If your browser blocks it or you use another client, use Open Email App / Copy Summary.</p>
      </motion.div>
    </motion.div>
  );
}

function ContactSection({openContact}:{openContact:(mode:string)=>void}){ return <section id="contact" className="py-20 pb-32"><div className="container-suzu"><div className="glass-strong rounded-[3rem] p-8 text-center sm:p-12"><p className="eyebrow">Contact</p><h2 className="mx-auto mt-3 max-w-3xl font-display text-5xl font-black leading-tight">Ready for a soft character piece or collab?</h2><div className="mt-7 flex flex-wrap justify-center gap-3"><button onClick={()=>openContact('commission')} className="soft-button"><Mail className="mr-2 inline h-4 w-4"/>Open Commission</button><button onClick={()=>openContact('collab')} className="ghost-button"><MessageCircle className="mr-2 inline h-4 w-4"/>Propose Collab</button><a className="ghost-button" href={contact.x} target="_blank"><ExternalLink className="mr-2 inline h-4 w-4"/>@ssuzudayo</a></div><p className="mt-5 text-mocha">{contact.email} • Discord {contact.discord}</p></div></div></section> }
export default function Home(){ const [modal,setModal]=useState<string|null>(null); return <main><Navbar/><Hero openContact={setModal}/><OpenCollab openContact={setModal}/><Portfolio openContact={setModal}/><XArtFeed openContact={setModal}/><CollabFeed openContact={setModal}/><Pricing/><Accordions/><Process/><FAQ/><ContactSection openContact={setModal}/><footer className="border-t border-pink/20 py-8 text-center text-sm font-bold text-mocha">© Pesona Suzu Art Studio — soft anime & chibi illustration.</footer><AnimatePresence>{modal&&<ContactModal mode={modal} onClose={()=>setModal(null)}/>}</AnimatePresence></main> }
