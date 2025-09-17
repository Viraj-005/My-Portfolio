import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";

// ✅ Loading component with video
function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <video
        src="/public/loading-animation.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-40 h-40"
      />
    </div>
  );
}

// ✅ Separate content wrapper so loader works with location changes
function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // adjust delay as needed
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return loading ? (
    <Loading />
  ) : (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

export default App;
