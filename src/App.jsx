import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';

function App() {
  useEffect(() => {
    const loader = document.getElementById('boot-loader');
    if (!loader) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      loader.remove();
      return;
    }
    const animation = loader.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 450, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards',
    });
    loader.style.pointerEvents = 'none';
    animation.finished.then(() => loader.remove()).catch(() => {});
    return () => animation.cancel();
  }, []);
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
