import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download } from 'lucide-react';

// import certificate images
import cert1 from '@/assets/Forge Data Analytics Simulation.jpg'
import cert2 from '@/assets/Software Testing QA.jpeg'
import cert3 from '@/assets/project management.jpeg'
import cert4 from '@/assets/Agile PM HP LIFE.jpeg'
import cert5 from '@/assets/PowerBI.jpeg'
import cert6 from '@/assets/AIML SLIIT.jpg'
import cert7 from '@/assets/Computer Vision.png'
import cert8 from '@/assets/Intro to Deep Learning.png'
import cert9 from '@/assets/Feature Engineering.png'
import cert10 from '@/assets/Intro to Machine Learning.png'
import cert11 from '@/assets/Coursera - UIUX.jpg'
import cert12 from '@/assets/UIUX FSD.jpeg'
import cert13 from '@/assets/Web_Design_for_Beginners_2023.jpg'
import cert14 from '@/assets/Cloud Computing.jpg'

export const CertificatesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Sample certificate data - replace with your actual certificates
  const certificates = [
    {
      id: 1,
      title: "Data Analytics Job Simulation",
      image: cert1,
      issuer: "Deloitte, Forage Certification",
      date: "2025",
      description: "Completed Deloitte Australia’s Data Analytics Virtual Internship on Forage, gaining hands-on experience in data analysis, dashboard creation, and business insights"
    },
    {
      id: 2,
      title: "Programming Foundations: Software Testing/QA",
      image: cert2,
      issuer: "LinkedIn Learning",
      date: "2024",
      description: "Completed Programming Foundations: Software Testing/QA course on LinkedIn Learning, gaining skills in software testing principles and quality assurance practices."
    },
    {
      id: 3,
      title: "Project Management Simplified",
      image: cert3,
      issuer: "LinkedIn Learning",
      date: "2024",
      description: "Completed Project Management Simplified course on LinkedIn Learning, strengthening project planning and resource management skills."
    },
    {
      id: 4,
      title: "Agile Project Management",
      image: cert4,
      issuer: "HP LIFE",
      date: "2024",
      description: "Completed Agile Project Management course on HP LIFE, gaining skills in Agile methodologies, sprint planning, and continuous improvement."
    },
    {
      id: 5,
      title: "Power BI Beginner to Pro Workshop",
      image: cert5,
      issuer: "Pragmatic Works",
      date: "2024",
      description: "Completed Power BI Beginner to Pro Workshop by Pragmatic Works, gaining hands-on experience in data modeling, visualization, and dashboard creation."
    },
    {
      id: 6,
      title: "AI/ML Engineer – Stage 1",
      image: cert6,
      issuer: "SLIIT",
      date: "2024",
      description: "Completed AI/ML Engineer – Stage 1 course at SLIIT, gaining foundational knowledge and practical skills in artificial intelligence and machine learning."
    },
    {
      id: 7,
      title: "Computer Vision",
      image: cert7,
      issuer: "Kaggle",
      date: "2024",
      description: "Completed Computer Vision course on Kaggle, gaining practical knowledge of CV techniques and applications."
    },
    {
      id: 8,
      title: "Intro to Deep Learning",
      image: cert8,
      issuer: "Kaggle",
      date: "2024",
      description: "Completed Intro to Deep Learning course on Kaggle, strengthening skills in deep learning concepts and applications."
    },
    {
      id: 9,
      title: "Feature Engineering",
      image: cert9,
      issuer: "Kaggle",
      date: "2024",
      description: "Completed Feature Engineering course on Kaggle, gaining skills in transforming raw data into meaningful features for machine learning."
    },
    {
      id: 10,
      title: "Intro to Machine Learning",
      image: cert10,
      issuer: "Kaggle",
      date: "2024",
      description: "Completed Intro to Machine Learning course on Kaggle, gaining foundational skills in supervised/unsupervised learning, model evaluation, and predictive modeling with Python."
    },
    {
      id: 11,
      title: "Foundations of User Experience (UX) Design",
      image: cert11,
      issuer: "Google on Coursera",
      date: "2024",
      description: "Completed Foundations of User Experience (UX) Design course by Google on Coursera, building skills in creating intuitive and user-focused digital experiences."
    },
    {
      id: 12,
      title: "UI/UX Design",
      image: cert12,
      issuer: "FSD Academy",
      date: "2024",
      description: "Completed UI/UX Design course at FSD Academy, gaining practical skills in user experience and interface design."
    },
    {
      id: 13,
      title: "Web Design for Beginners",
      image: cert13,
      issuer: "CODL University of Moratuwa",
      date: "2023",
      description: "Completed Web Design for Beginners course at CODL University of Moratuwa, covering HTML, CSS, JavaScript, and responsive design principles."
    },
    {
      id: 14,
      title: "Cloud Computing Foundations",
      image: cert14,
      issuer: "Great Learning Academy",
      date: "2023",
      description: "Completed the Cloud Computing Foundations course from Great Learning Academy, gaining a solid understanding of core cloud concepts and services."
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % certificates.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, certificates.length]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
    setIsAutoPlaying(false);
    setIsImageLoading(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
    setIsAutoPlaying(true);
    setIsImageLoading(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 1000);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleDownload = () => {
    if (selectedCertificate) {
      const link = document.createElement('a');
      link.href = selectedCertificate.image;
      link.download = `${selectedCertificate.title}_Certificate.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section id="certificates" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center text-glow">
            Professional <span className="text-primary">Certifications</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            A comprehensive collection of professional certifications and achievements that demonstrate 
            my expertise, continuous learning commitment, and dedication to staying current with 
            industry best practices.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-xl shadow-2xl bg-card border border-border/20">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="w-full flex-shrink-0 relative group cursor-pointer"
                  onClick={() => handleCertificateClick(cert)}
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain bg-white transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Enhanced Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-8">
                        <ZoomIn className="w-12 h-12 mb-4 text-white/90" />
                        <h3 className="text-2xl font-bold mb-3">{cert.title}</h3>
                        <p className="text-sm opacity-90 mb-2">{cert.issuer} • {cert.date}</p>
                        <p className="text-xs opacity-75 max-w-xs">Click to view full certificate</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-lg border border-white/10"
              aria-label="Previous certificate"
            >
              <ChevronLeft className="w-6 h-6 cursor-pointer" />
            </button>
          
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-lg border border-white/10"
              aria-label="Next certificate"
            >
              <ChevronRight className="w-6 h-6 cursor-pointer" />
            </button>
          </div>

          {/* Enhanced Thumbnail Navigation */}
          <div className="flex justify-center gap-3 mt-8 px-4 overflow-x-auto pb-2">
            {certificates.map((cert, index) => (
              <button
                key={cert.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                  index === currentIndex
                    ? 'border-primary shadow-[0_0_20px_rgba(139,92,246,0.6)] scale-110'
                    : 'border-border hover:border-primary/50'
                }`}
                aria-label={`View ${cert.title} certificate`}
              >
                <img
                  src={cert.image}
                  alt={`${cert.title} thumbnail`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Enhanced Certificate Info */}
          <div className="text-center mt-8 bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/20 shadow-lg">
            <h3 className="text-2xl font-bold text-glow mb-3">
              {certificates[currentIndex].title}
            </h3>
            <p className="text-lg text-primary font-semibold mb-2">
              {certificates[currentIndex].issuer}
            </p>
            <p className="text-foreground/60 mb-3">
              Completed in {certificates[currentIndex].date}
            </p>
            <p className="text-sm text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              {certificates[currentIndex].description}
            </p>
          </div>

          {/* Enhanced Auto-play Control */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                isAutoPlaying 
                  ? 'cosmic-button shadow-[0_0_15px_rgba(139,92,246,0.4)]' 
                  : 'bg-card text-foreground border border-border hover:bg-primary/10 hover:border-primary/50'
              }`}
            >
              {isAutoPlaying ? '⏸ Pause Slideshow' : '▶ Start Slideshow'}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && selectedCertificate && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative bg-card rounded-2xl shadow-2xl max-w-7xl w-full h-full max-h-[95vh] flex flex-col border border-border/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/20 bg-card/50 backdrop-blur-sm rounded-t-2xl">
              <div>
                <h3 className="text-2xl font-bold text-glow">
                  {selectedCertificate.title}
                </h3>
                <p className="text-foreground/70">
                  {selectedCertificate.issuer} • {selectedCertificate.date}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full p-3 transition-all duration-300 hover:scale-105 border border-primary/20 cursor-pointer"
                  title="Download Certificate"
                >
                  <Download className="w-5 h-5" />
                </button>
                
                <button
                  onClick={closeModal}
                  className="bg-background/90 hover:bg-background rounded-full p-3 transition-all duration-300 hover:scale-105 border border-border/20 cursor-pointer"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 flex items-center justify-center p-6 min-h-0">
              <div className="relative w-full h-full flex items-center justify-center">
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                )}
                
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  onLoad={handleImageLoad}
                  style={{ 
                    opacity: isImageLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-border/20 bg-card/50 backdrop-blur-sm rounded-b-2xl">
              <div className="text-center">
                <p className="text-foreground/80 mb-2">
                  {selectedCertificate.description}
                </p>
                <p className="text-sm text-foreground/60">
                  Press <kbd className="px-2 py-1 bg-background/80 rounded text-xs border border-border/20">ESC</kbd> or click outside to close
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};