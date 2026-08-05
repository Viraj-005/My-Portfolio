import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';

/**
 * The previous version gated every route behind a hard-coded 1000ms timer and a
 * `bg-white` splash: a full second of artificial delay before any content, plus
 * a white flash for anyone on the dark theme. Both are gone; the app is static
 * and has nothing to wait for.
 */
function App() {
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
