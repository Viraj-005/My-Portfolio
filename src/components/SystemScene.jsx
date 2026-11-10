import { useEffect, useRef } from 'react';

export default function SystemScene({ paused = false, onReady }) {
  const pauseRef = useRef(paused);
  useEffect(() => { pauseRef.current = paused; }, [paused]);
  const readyRef = useRef(onReady);
  useEffect(() => { readyRef.current = onReady; }, [onReady]);
  const host = useRef(null);
  useEffect(() => {
    let disposed = false, cleanup = () => {};
    Promise.all([import('three'), import('three/examples/jsm/environments/RoomEnvironment.js')]).then(([T, { RoomEnvironment }]) => {
      if (disposed || !host.current) return;
      const element = host.current;
      let renderer;
      try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); } catch { readyRef.current?.(); return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      element.appendChild(renderer.domElement);
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(38, 1, .1, 100);
      camera.position.set(0, .8, 13.5); camera.lookAt(0,0,0);
      const room = new RoomEnvironment();
      const pmrem = new T.PMREMGenerator(renderer);
      const environment = pmrem.fromScene(room, .04);
      scene.environment = environment.texture;
      room.dispose();
      const assembly = new T.Group();
      assembly.rotation.set(.17, -.4, -.2);
      scene.add(assembly);
      const shape = new T.Shape();
      const rounded = (path, w, h, r) => {path.moveTo(-w/2+r,-h/2);path.lineTo(w/2-r,-h/2);path.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);path.lineTo(w/2,h/2-r);path.quadraticCurveTo(w/2,h/2,w/2-r,h/2);path.lineTo(-w/2+r,h/2);path.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);path.lineTo(-w/2,-h/2+r);path.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);};
      rounded(shape, 3.4, 3.4, .35);
      const hole = new T.Path();rounded(hole,2.98,2.98,.22);shape.holes.push(hole);
      const geometry = new T.ExtrudeGeometry(shape,{depth:.16,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.035,bevelThickness:.035,curveSegments:12});
      const metal = new T.MeshStandardMaterial({color:0x686a6c,metalness:1,roughness:.23});
      const ember = new T.MeshStandardMaterial({color:0xff5b32,emissive:0xff3816,emissiveIntensity:2,metalness:.5,roughness:.25});
      const frames=[];
      for(let i=0;i<8;i++){const mesh=new T.Mesh(geometry,i===3?ember:metal);mesh.position.z=(i-3.5)*.54;mesh.rotation.z=i*.11;assembly.add(mesh);frames.push(mesh);}
      const light=new T.PointLight(0xff552f,34,15,2);light.position.set(0,0,2);scene.add(light);
      const fill=new T.DirectionalLight(0xe7e3db,4);fill.position.set(-3,5,6);scene.add(fill);
      const rim=new T.DirectionalLight(0xff6a46,3);rim.position.set(4,-2,-4);scene.add(rim);
      const media=matchMedia('(prefers-reduced-motion: reduce)');
      let visible=true, frame=0, pointerX=0, pointerY=0, scroll=0, last=0;
      const resize=new ResizeObserver(()=>{const {width,height}=element.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/height;assembly.scale.setScalar(innerWidth < 768 ? Math.min(1.25, width / height * 1.25) : 1);camera.updateProjectionMatrix();render();});
      let announced = false;
      const render=()=>{renderer.render(scene,camera);if(!announced){announced=true;readyRef.current?.();}};
      const move=e=>{if(e.pointerType==='mouse'&&!media.matches){pointerX=(e.clientX/innerWidth-.5)*.18;pointerY=(e.clientY/innerHeight-.5)*.12;}};
      const onScroll=()=>{scroll=Math.min(1,Math.max(0,window.scrollY/innerHeight));};
      const tick=time=>{frame=requestAnimationFrame(tick);if(!visible||document.hidden||media.matches||pauseRef.current||time-last<33)return;last=time;if(!media.matches && !pauseRef.current){assembly.rotation.y+=(-.4+scroll*.8+pointerX-assembly.rotation.y)*.055;assembly.rotation.x+=(.17+pointerY-assembly.rotation.x)*.055;assembly.rotation.z=-.2+scroll*.3;frames.forEach((mesh,i)=>{mesh.rotation.z=i*.11*(1-scroll*.85)+Math.sin(time*.00018+i*.25)*.025;});camera.position.z=13.5-scroll*1.5;}render();};
      const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});intersection.observe(element);
      resize.observe(element);window.addEventListener('pointermove',move,{passive:true});window.addEventListener('scroll',onScroll,{passive:true});onScroll();frame=requestAnimationFrame(tick);
      cleanup=()=>{cancelAnimationFrame(frame);resize.disconnect();intersection.disconnect();window.removeEventListener('pointermove',move);window.removeEventListener('scroll',onScroll);geometry.dispose();metal.dispose();ember.dispose();environment.dispose();pmrem.dispose();renderer.dispose();renderer.domElement.remove();};
      if(disposed)cleanup();
    }).catch(()=>{ if(!disposed) readyRef.current?.(); });
    return()=>{disposed=true;cleanup();};
  },[]);
  return <div className="system-scene" ref={host} aria-hidden="true"/>;
}



