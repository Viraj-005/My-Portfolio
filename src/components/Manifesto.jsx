import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export const Manifesto = () => {
 const ref=useRef(null);
 useEffect(()=>{const media=gsap.matchMedia();media.add('(prefers-reduced-motion: no-preference)',()=>{const context=gsap.context(()=>{gsap.fromTo('.manifesto-word',{opacity:.2},{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:ref.current,start:'top 78%',end:'bottom 65%',scrub:1}});},ref);return()=>context.revert();});return()=>media.revert();},[]);
 return <section className="manifesto container" ref={ref}><p className="manifesto-side">The work begins<br/>with a real problem.</p><div><h2>{'Less manual work. More possibility.'.split(' ').map((word,i)=><span className="manifesto-word" key={i}>{word} </span>)}</h2><p>I’m Viraj, a software engineer working across enterprise systems and machine learning. I build the APIs, workflows, and applications that connect a good idea to something useful.</p></div></section>;
};
