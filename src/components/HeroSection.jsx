import { useState, useEffect } from 'react';
import { ChevronDown, Download, Eye, Check } from 'lucide-react';
import profileImage from '@/assets/viraj-profile2.png';
import resumePDF from '@/assets/Viraj_Induruwa.pdf';

const texts = [
  "Hi, I'm Viraj 👋",
  "Software Engineer",
  "AI/ML Enthusiast"
];

export const HeroSection = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const type = () => {
      const fullText = texts[currentIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    };

    const timer = setTimeout(type, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    setIsDownloading(true);
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Viraj_Induruwa_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset download state after animation
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 text-center">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Stars */}
        <div className="star w-2 h-2 top-20 right-20 animate-pulse-subtle" />
        <div className="star w-1 h-1 top-40 left-32 animate-pulse-subtle" style={{ animationDelay: '1s' }} />
        <div className="star w-3 h-3 bottom-40 right-32 animate-pulse-subtle" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 relative inline-block animate-fade-in">
            <div className="relative">
              <div className="w-48 h-48 mx-auto rounded-full card-hover overflow-hidden bg-gradient-to-r from-primary/10 to-purple-500/10 p-1">
                <img 
                  src={profileImage} 
                  alt="Viraj Induruwa" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full border-2 border-primary/30 animate-pulse-subtle"></div>
            </div>
          </div>

          {/* Typing Animation */}
          <div className="mb-6 animate-fade-in-delay-1 opacity-0">
            <h1 className="text-4xl md:text-6xl font-black mb-4 min-h-[80px] md:min-h-[120px]">
              <span className="text-glow bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                {currentText.includes('👋') ? (
                  <>
                    {currentText.substring(0, currentText.indexOf('👋'))}
                    <span style={{ color: '#FFAB40' }}>👋</span>
                    {currentText.substring(currentText.indexOf('👋') + 2)}
                  </>
                ) : (
                  currentText
                )}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-delay-2 opacity-0">
            Currently an <span className="text-primary font-semibold">Intern Software Engineer</span> at 
            <span className="text-purple-500 font-semibold"> Sri Lanka Telecom</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-delay-3 opacity-0">
            <button 
              className="cosmic-button px-8 py-4 text-lg flex items-center justify-center cursor-pointer"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Eye className="mr-2 w-5 h-5" />
              View My Work
            </button>
            <button 
              className={`px-8 py-4 text-lg rounded-full border border-primary/30 hover:border-primary text-primary hover:bg-primary/10 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center card-hover cursor-pointer ${
                isDownloading ? 'bg-primary/20 border-primary' : ''
              }`}
              onClick={handleDownloadCV}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <Check className="mr-2 w-5 h-5 animate-pulse" />
                  Downloaded!
                </>
              ) : (
                <>
                  <Download className="mr-2 w-5 h-5" />
                  Download CV
                </>
              )}
            </button>
          </div>

          {/* Scroll Indicator */}
          <button 
            onClick={scrollToAbout}
            className="animate-bounce hover:scale-110 transition-transform duration-300 animate-fade-in-delay-4 opacity-0 cursor-pointer"
            aria-label="Scroll to about section"
          >
            <ChevronDown className="w-8 h-8 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};