import { memo, useEffect, useRef } from 'react';
export const AsciiSculpture = memo(function AsciiSculpture() {
 const ref = useRef(null);
 useEffect(() => {
  const canvas=ref.current, ctx=canvas.getContext('2d'); if(!ctx) return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0, angle=0, visible=true, width=0, height=0, pointer=0;
  const points=Array.from({length:1300},(_,i)=>{const u=i*2.399963,v=Math.acos(1-2*(i+.5)/1300),r=1+.18*Math.sin(u*3)*Math.sin(v*4);return [r*Math.sin(v)*Math.cos(u),r*Math.cos(v),r*Math.sin(v)*Math.sin(u)];});
  const draw=()=>{ctx.clearRect(0,0,width,height);ctx.fillStyle=getComputedStyle(canvas).color;ctx.font=`${Math.max(9,width/65)}px monospace`;const a=angle+pointer,s=Math.min(width,height)*.32;points.forEach(([x,y,z],i)=>{const rx=x*Math.cos(a)-z*Math.sin(a),rz=x*Math.sin(a)+z*Math.cos(a),ry=y*.94-rz*.34,d=y*.34+rz*.94,p=3/(3-d*.4);ctx.globalAlpha=Math.max(.12,(d+1.3)/2.6);ctx.fillText('01.:+*'[i%6],width/2+rx*s*p,height/2+ry*s*p);});ctx.globalAlpha=1;};
  const tick=()=>{if(visible&&!document.hidden){angle+=.003;draw();}frame=requestAnimationFrame(tick);};
  const restart=()=>{cancelAnimationFrame(frame);draw();if(!media.matches)frame=requestAnimationFrame(tick);};
  const resize=new ResizeObserver(()=>{width=canvas.clientWidth;height=canvas.clientHeight;const dpr=Math.min(devicePixelRatio,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw();});resize.observe(canvas);
  const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;});observer.observe(canvas);
  const move=e=>{if(!media.matches&&e.pointerType==='mouse')pointer=(e.offsetX/width-.5)*.6;};canvas.addEventListener('pointermove',move);media.addEventListener('change',restart);restart();
  return()=>{cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();canvas.removeEventListener('pointermove',move);media.removeEventListener('change',restart);};
 },[]);
 return <canvas ref={ref} className="ascii-sculpture" aria-hidden="true"/>;
});
