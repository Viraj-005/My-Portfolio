import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import resume from '@/assets/Viraj_Induruwa_Resume.pdf';
const SystemScene = lazy(() => import('@/components/SystemScene'));
gsap.registerPlugin(ScrollTrigger);
export const HeroSection = () => {
 const ref=useRef(null);
 const [paused,setPaused]=useState(false);
 const [sceneReady,setSceneReady]=useState(false);
 useEffect(()=>{const media=gsap.matchMedia();media.add('(prefers-reduced-motion: no-preference)',()=>{const context=gsap.context(()=>{gsap.from('.opening-line',{yPercent:110,duration:1.2,stagger:.1,ease:'power3.out'});gsap.to('.opening-name',{yPercent:16,opacity:.2,ease:'none',scrollTrigger:{trigger:ref.current,start:'top top',end:'bottom top',scrub:1}});},ref);return()=>context.revert();});return()=>media.revert();},[]);
 return <section id="hero" className="opening" ref={ref}>
  <Suspense fallback={<div className="scene-placeholder"/>}><SystemScene paused={paused} onReady={()=>setSceneReady(true)}/></Suspense>
  {!sceneReady && <div className="scene-loading" role="status"><img src="/signature-loading.svg" width="200" height="84" alt=""/><span>Preparing the scene</span></div>}
  <div className="opening-top"><span>Independent software engineer</span><span>Sri Lanka / Available worldwide</span></div>
  <div className="opening-copy"><p>I make complex systems<br/>work for <em>people.</em></p><span>Backend engineering, enterprise<br/>automation & applied AI.</span><a href="#projects" className="opening-link">Explore selected work <ArrowDownRight size={19}/></a></div>
  <div className="opening-note"><span>Currently building at</span><strong>Sri Lanka Telecom</strong><a href={resume} download="Viraj_Induruwa_Resume.pdf">Download CV <ArrowUpRight size={15}/></a></div>
  <h1 className="opening-name" aria-label="Viraj Induruwa"><span className="name-mask"><span className="opening-line">Viraj</span></span><span className="name-mask"><span className="opening-line">Induruwa<span className="name-period">.</span></span></span></h1>
  <div className="opening-bottom"><span>Software with intent.</span><a href="#projects">Scroll to discover <ArrowDownRight size={15}/></a><button type="button" onClick={()=>setPaused(value=>!value)} aria-pressed={paused} className="motion-toggle">{paused ? 'Resume 3D motion' : 'Pause 3D motion'}</button></div>
 </section>;
};

