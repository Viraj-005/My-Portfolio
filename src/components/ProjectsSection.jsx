import { useState } from 'react';
import { ArrowRight, ExternalLink, Github, X } from 'lucide-react';

// Import project images
import cancerDetectiveImg from '@/assets/project-cancer-detective.png';
import plantDiseaseImg from '@/assets/project-plant-disease.png';
import cropRecognitionImg from '@/assets/project-crop-recognition.png';
import smartSkinScanImg from '@/assets/project-smart-skin.png';
import bookRecommendationImg from '@/assets/project-book-recommendation.png';
import opencvProjectsImg from '@/assets/project-opencv.png';
import skinCancerImg from '@/assets/project-skin-cancer.png';
import leukemiaImg from '@/assets/project-leukemia.png';
import lungCancerImg from '@/assets/project-lung-cancer.png';
import frozenLandImg from '@/assets/project-frozen-land.png';
import happyBlockImg from '@/assets/project-happy-block.png';

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'Cancer Detective Web App',
      category: 'Medical AI',
      description: 'Final year project - Django + React web app for early detection of skin, lung, and leukemia cancers using 30K+ medical images.',
      longDescription: 'Built a comprehensive Django + React web application for early detection of skin, lung, and leukemia cancers using deep learning models trained on 30K+ medical images. Achieved impressive accuracy rates of 93% for skin cancer, 98% for lung cancer, and 88% for leukemia detection. The application provides an intuitive interface for medical professionals to upload and analyze medical images.',
      technologies: ['Django', 'React', 'TensorFlow', 'Keras', 'Python'],
      image: cancerDetectiveImg,
      color: 'from-red-500 to-pink-500',
      githubUrl: 'https://github.com/Viraj-005/Cancer-Detective',
      liveUrl: null
    },
    {
      id: 2,
      title: 'Plant Disease Detection Web App',
      category: 'Computer Vision',
      description: 'FastAPI and Streamlit app for plant disease detection using deep learning with user-friendly interface.',
      longDescription: 'Developed a comprehensive plant disease detection system with both FastAPI backend and Streamlit frontend. The application uses deep learning models to accurately predict plant diseases, providing farmers and gardeners with an easy-to-use tool for early disease detection and treatment recommendations.',
      technologies: ['FastAPI', 'Streamlit', 'TensorFlow', 'Python', 'Deep Learning'],
      image: plantDiseaseImg,
      color: 'from-green-500 to-emerald-500',
      githubUrl: 'https://github.com/Viraj-005/plant-disease-detection-fastapi',
      liveUrl: 'https://plant-disease-detection-web-app.streamlit.app'
    },
    {
      id: 3,
      title: 'Agricultural Crop Recognition',
      category: 'Computer Vision',
      description: 'Deep learning model for identifying and classifying different crop types from satellite and drone imagery.',
      longDescription: 'Developed a convolutional neural network to classify agricultural crops from aerial imagery. The model achieves 94% accuracy in identifying crop types, helping farmers optimize their land use and monitor crop health. Implemented using TensorFlow and deployed with FastAPI.',
      technologies: ['TensorFlow', 'OpenCV', 'FastAPI', 'Python', 'Docker'],
      image: cropRecognitionImg,
      color: 'from-green-500 to-emerald-500',
      githubUrl: null,
      liveUrl: null
    },
    {
      id: 4,
      title: 'SmartSkin Scan',
      category: 'Medical AI',
      description: 'Streamlit app achieving 97.5% accuracy for skin cancer detection using EfficientNet-B3 and TensorFlow.',
      longDescription: 'A highly accurate skin cancer detection application built with Streamlit, achieving 97.5% accuracy using EfficientNet-B3 architecture and TensorFlow. The model was trained and optimized on 200 medical images to provide reliable skin cancer classification for early detection and diagnosis.',
      technologies: ['Streamlit', 'EfficientNet-B3', 'TensorFlow', 'Python', 'Computer Vision'],
      image: smartSkinScanImg,
      color: 'from-purple-500 to-indigo-500',
      githubUrl: 'https://github.com/Viraj-005/skin-cancer-detection',
      liveUrl: 'https://smartskin-scan.streamlit.app'
    },
    {
      id: 5,
      title: 'Skin Cancer Detection API',
      category: 'Medical AI',
      description: 'AI-powered system for early detection of skin cancer from dermatological images using deep learning.',
      longDescription: 'A medical diagnosis system that uses deep convolutional neural networks to detect skin cancer from images. The model is trained on a large dataset of dermatological images and can classify different types of skin lesions with high accuracy, assisting healthcare professionals in early diagnosis.',
      technologies: ['TensorFlow', 'Keras', 'OpenCV', 'FastAPI', 'Docker'],
      image: skinCancerImg,
      color: 'from-red-500 to-pink-500',
      githubUrl: null,
      liveUrl: 'https://upgectsjud5oy5pyn7ewydmv2q0hslco.lambda-url.us-east-1.on.aws/' // Placeholder for live endpoints
    },
    {
      id: 6,
      title: 'Leukemia Detection API',
      category: 'Medical AI',
      description: 'Machine learning model for detecting leukemia from blood cell microscopy images.',
      longDescription: 'An advanced computer vision system that analyzes blood cell images to detect leukemia. The model uses transfer learning with pre-trained networks and custom architectures to identify abnormal blood cells. This tool can assist medical professionals in faster and more accurate diagnosis.',
      technologies: ['TensorFlow', 'Keras', 'OpenCV', 'FastAPI', 'Docker'],
      image: leukemiaImg,
      color: 'from-purple-500 to-indigo-500',
      githubUrl: null,
      liveUrl: 'https://acqbhbxsfpxsdzuo245oinxcza0gbnio.lambda-url.us-east-1.on.aws/' // Placeholder for live endpoints
    },
    {
      id: 7,
      title: 'Lung Cancer Detection API',
      category: 'Medical AI',
      description: 'Deep learning system for detecting lung cancer from CT scan images using advanced neural networks.',
      longDescription: 'A sophisticated medical imaging system that analyzes CT scans to detect lung cancer nodules. The system uses 3D convolutional neural networks to process volumetric data and provides probability scores for malignancy. Designed to support radiologists in early cancer detection.',
      technologies: ['TensorFlow', 'Keras', 'OpenCV', 'FastAPI', 'Docker'],
      image: lungCancerImg,
      color: 'from-orange-500 to-red-500',
      githubUrl: null,
      liveUrl: 'https://kubtah5wxifg5m33jaojdiuipy0omkyo.lambda-url.us-east-1.on.aws/' // Placeholder for live endpoints
    },
    {
      id: 8,
      title: 'Book Recommendation Web App',
      category: 'AI/ML',
      description: 'Django app providing ML-powered personalized book recommendations using 20K+ ratings dataset.',
      longDescription: 'An intelligent book recommendation system built with Django that provides ML-powered personalized recommendations. The system analyzes 20K+ user ratings to deliver accurate suggestions, improving user engagement by 25% with an interactive and user-friendly interface.',
      technologies: ['Django', 'Machine Learning', 'Python', 'Pandas', 'Scikit-learn'],
      image: bookRecommendationImg,
      color: 'from-orange-500 to-red-500',
      githubUrl: 'https://github.com/Viraj-005/book-recommendation-web-app',
      liveUrl: null
    },
    {
      id: 9,
      title: 'OpenCV Computer Vision Projects',
      category: 'Computer Vision',
      description: '5 computer vision applications including motion filtering, edge detection, OCR, text enhancement, and color detection.',
      longDescription: 'A collection of 5 comprehensive computer vision projects demonstrating various OpenCV techniques: motion filtering, edge detection, OCR text recognition, text enhancement, and color detection. Utilized advanced techniques including Tesseract OCR, HSV color space, Gaussian blur, thresholding, and contour detection.',
      technologies: ['Python', 'OpenCV', 'Tesseract', 'Computer Vision', 'Image Processing'],
      image: opencvProjectsImg,
      color: 'from-indigo-500 to-purple-500',
      githubUrl: 'https://github.com/Viraj-005/opencv-projects',
      liveUrl: null
    },
    {
      id: 10,
      title: 'Frozen Land - Ice Cream Website',
      category: 'Web Development',
      description: 'A beautifully designed ice cream ordering website built with PHP, CSS, and XAMPP. 🍦',
      longDescription: 'A visually appealing and functional ice cream ordering website that showcases web development skills using PHP for backend functionality, CSS for styling, and XAMPP for local development. The website provides a complete ordering system with an attractive user interface for ice cream lovers.',
      technologies: ['PHP', 'CSS', 'HTML', 'XAMPP', 'JavaScript'],
      image: frozenLandImg,
      color: 'from-pink-500 to-rose-500',
      githubUrl: 'https://github.com/Viraj-005/Frozen-Land',
      liveUrl: null
    },
    {
      id: 11,
      title: 'HappyBlock 2D Game',
      category: 'Game Development',
      description: 'A 2D game developed using Unity and C# showcasing game development and programming skills.',
      longDescription: 'An engaging 2D game developed using Unity game engine and C# programming language. This project demonstrates proficiency in game development concepts including game mechanics, physics, user interface design, and interactive gameplay elements.',
      technologies: ['Unity', 'C#', 'Game Development', '2D Graphics', 'Game Design'],
      image: happyBlockImg,
      color: 'from-yellow-500 to-orange-500',
      githubUrl: 'https://github.com/Viraj-005/happy-block-2d-game',
      liveUrl: null
    }
  ];

  // Get projects to display based on showAllProjects state
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 6);

  const openModal = (projectId) => {
    setSelectedProject(projectId);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const toggleShowMore = () => {
    setShowAllProjects(!showAllProjects);
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <div id="projects" className="py-20 relative">
      {/* Section Header */}
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center text-glow">
            {" "}
            Featured <span className="text-primary"> Projects </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto animate-fade-in-delay-1 opacity-0">
            Showcasing innovative solutions in AI, machine learning, and software development
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className={`card-hover rounded-2xl cursor-pointer group bg-card border border-border overflow-hidden animate-fade-in opacity-0`}
              style={{ 
                animationDelay: `${(index + 2) * 0.2}s`,
                animationFillMode: 'forwards'
              }}
              onClick={() => openModal(project.id)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/50 border border-primary/20 text-foreground">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-xs bg-primary/5 border border-primary/10 rounded-md text-foreground/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-primary/5 border border-primary/10 rounded-md text-foreground/60">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More/Show Less Button */}
        {projects.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={toggleShowMore}
              className="cosmic-button w-fit flex items-center mx-auto gap-2 cursor-pointer"
            >
              {showAllProjects ? (
                <>
                  Show Less <ArrowRight size={16} className="rotate-180" />
                </>
              ) : (
                <>
                  See More Projects <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && selectedProjectData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-card border border-border rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in card-hover">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors duration-300 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                  <img 
                    src={selectedProjectData.image} 
                    alt={selectedProjectData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-glow">{selectedProjectData.title}</h3>
                  <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 border border-primary/20 text-primary mt-2">
                    {selectedProjectData.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold mb-3">About This Project</h4>
                <p className="text-foreground/70 leading-relaxed">
                  {selectedProjectData.longDescription}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectData.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg text-sm font-medium card-hover"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {selectedProjectData.githubUrl && (
                  <a 
                    href={selectedProjectData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cosmic-button flex-1 flex items-center justify-center"
                  >
                    <Github className="mr-2 w-4 h-4" />
                    View Code
                  </a>
                )}
                {selectedProjectData.liveUrl && selectedProjectData.liveUrl !== '#' && (
                  <a
                    href={selectedProjectData.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-2 rounded-full border border-primary/30 hover:border-primary text-primary hover:bg-primary/10 font-medium transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
                  >
                    <ExternalLink className="mr-2 w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {selectedProjectData.liveUrl === '#' && (
                  <div className="flex-1 px-6 py-2 rounded-full border border-primary/20 text-primary/50 font-medium flex items-center justify-center cursor-not-allowed">
                    <ExternalLink className="mr-2 w-4 h-4" />
                    Multiple Endpoints
                  </div>
                )}
                {!selectedProjectData.githubUrl && !selectedProjectData.liveUrl && (
                  <div className="text-center text-foreground/50 italic py-2">
                    Links will be available soon
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center mt-12">
        <a
          className="rounded-full px-8 py-4  w-fit flex items-center mx-auto gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm border border-white/10"
          target="_blank"
          href="https://github.com/Viraj-005"
        >
          Check My Github <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
};