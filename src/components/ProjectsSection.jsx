import { useState } from 'react';
import { ArrowRight, ArrowUpRight, ExternalLink, Github, Lock } from 'lucide-react';
import { useReveal, stagger } from '@/hooks/use-reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Modal } from '@/components/Modal';

import salesIncentiveImg from '@/assets/Sales Incentive Automation System.webp';
import exportHubImg from '@/assets/Export Hub.webp';
import cancerDetectiveImg from '@/assets/project-cancer-detective.webp';
import plantDiseaseImg from '@/assets/project-plant-disease.webp';
import cropRecognitionImg from '@/assets/project-crop-recognition.webp';
import omniFileAiImg from '@/assets/project-ominifile-ai.webp';
import smartSkinScanImg from '@/assets/project-smart-skin.webp';
import bookRecommendationImg from '@/assets/project-book-recommendation.webp';
import opencvProjectsImg from '@/assets/project-opencv.webp';
import skinCancerImg from '@/assets/project-skin-cancer.webp';
import leukemiaImg from '@/assets/project-leukemia.webp';
import lungCancerImg from '@/assets/project-lung-cancer.webp';
import frozenLandImg from '@/assets/project-frozen-land.webp';
import happyBlockImg from '@/assets/project-happy-block.webp';
import gemstoneMlImg from '@/assets/project-gemstone-ml.webp';
import medicoreHmsImg from '@/assets/project-medicore-hms.webp';
import mindfulAiImg from '@/assets/project-mindful-ai.webp';

const projects = [
  {
    id: 16,
    title: 'Sales Incentive Automation System',
    category: 'Enterprise',
    status: 'In active development',
    description:
      'Internal enterprise platform for Sri Lanka Telecom covering sales incentives, dealer commissions, manager incentives, user management, analytics, and reporting.',
    longDescription:
      'An internal enterprise system built for Sri Lanka Telecom to manage sales incentives, dealer commissions, manager incentives, user management, analytics, and reporting. The web application is built with Django on the backend and React with Vite on the frontend. Three calculation engines are live, covering the sales, dealer, and manager incentive modules, implemented with FastAPI and Python against PostgreSQL and Oracle databases. Two further calculation modules, microbusiness and SME, are still in development.',
    technologies: ['Django', 'React', 'Vite', 'FastAPI', 'Python', 'PostgreSQL', 'Oracle DB'],
    metrics: [
      { value: '3', label: 'calculation modules live' },
      { value: '2', label: 'in development' },
      { value: '90%', label: 'efficiency gain' },
    ],
    image: salesIncentiveImg,
    imageRatio: '1600 / 764',
    githubUrl: null,
    liveUrl: null,
    accessNote:
      'Internal Sri Lanka Telecom system. The source is not publicly available.',
  },
  {
    id: 1,
    title: 'Cancer Detective',
    category: 'Medical AI',
    description:
      'Final year project. Django and React platform for early detection of skin, lung, and leukemia cancers from 30K+ medical images.',
    longDescription:
      'Built a comprehensive Django + React web application for early detection of skin, lung, and leukemia cancers using deep learning models trained on 30K+ medical images. Achieved accuracy rates of 93% for skin cancer, 98% for lung cancer, and 88% for leukemia detection. The application provides an intuitive interface for medical professionals to upload and analyze medical images.',
    technologies: ['Django', 'React', 'TensorFlow', 'Keras', 'Python'],
    metrics: [
      { value: '98%', label: 'lung' },
      { value: '93%', label: 'skin' },
      { value: '88%', label: 'leukemia' },
      { value: '30K+', label: 'images' },
    ],
    image: cancerDetectiveImg,
    githubUrl: 'https://github.com/Viraj-005/Cancer-Detective',
    liveUrl: null,
  },
  {
    id: 2,
    title: 'MediCore HMS',
    category: 'Full-Stack',
    description:
      'Production-grade hospital management system pairing clinical operations with four predictive ML models for demand and risk forecasting.',
    longDescription:
      'MediCore HMS is a production-grade Hospital Management System designed for modern healthcare facilities. It integrates clinical operations with advanced predictive analytics: four specialized machine learning models built with CatBoost and Scikit-Learn provide proactive insights through a Drug Expiry Risk Engine, Inventory Consumption Forecaster, Equipment Demand & Maintenance Predictor, and Patient Load Forecaster. Includes a real-time command center, clinical logs, and intelligent alerts.',
    technologies: ['React', 'FastAPI', 'CatBoost', 'PostgreSQL', 'Tailwind CSS'],
    metrics: [
      { value: '4', label: 'ML models' },
      { value: 'realtime', label: 'command center' },
    ],
    image: medicoreHmsImg,
    githubUrl: 'https://github.com/Viraj-005/MediCore-HMS',
    isPrivate: true,
    liveUrl: null,
  },
  {
    id: 3,
    title: 'Gemstone ML Unified API',
    category: 'AI/ML',
    description:
      'High-performance API pairing visual gemstone identification with an intelligent precision cut advisor.',
    longDescription:
      'An advanced, high-performance API designed for the gemological industry. This unified system provides two core intelligence services: Visual & Physical Identification (combining CNN image features with properties like refractive index and hardness to predict variety, origin, and natural vs. synthetic) and an Intelligent Cut Advisor (a hierarchical pipeline advising on optimal cut families, specific cuts, and precise pavilion/crown cutting angles).',
    technologies: ['FastAPI', 'TensorFlow', 'CatBoost', 'XGBoost', 'Python'],
    image: gemstoneMlImg,
    githubUrl: 'https://github.com/Viraj-005/Gemstone-ml-unified-api',
    isPrivate: true,
    liveUrl: null,
  },
  {
    id: 4,
    title: 'Mindful-AI',
    category: 'AI/ML',
    description:
      'Conversational mental health companion with progressive stress detection through multi-turn text analysis.',
    longDescription:
      'Mindful-AI is a mental health companion and analytical dashboard. It features an interactive, multi-turn AI chatbot designed for progressive stress detection through conversational text using a state machine and context-aware follow-ups. A dual ML classifier engine (PyTorch + HuggingFace + Scikit-Learn) classifies emotions and stress levels, while a responsive React frontend visualizes well-being trends over time using interactive Recharts.',
    technologies: ['React', 'FastAPI', 'PyTorch', 'Scikit-Learn', 'Tailwind CSS'],
    image: mindfulAiImg,
    githubUrl: 'https://github.com/Viraj-005/Mindful-AI',
    isPrivate: true,
    liveUrl: null,
  },
  {
    id: 17,
    title: 'ExportHub',
    category: 'Developer Tool',
    description:
      'Windows desktop app for PostgreSQL data operations, replacing pgAdmin, Excel, and ad hoc scripts with a single tool.',
    longDescription:
      'A Windows desktop application for PostgreSQL data operations that replaces pgAdmin, Excel, and ad hoc scripts with one tool. Tables are grouped into exportable modules, each with its own database connection and custom filename template. SQL queries can be written and saved with instant results and CSV or Excel export. Multiple CSV exports can be merged through a visual join builder, or by pasting SQL-style join statements parsed by a custom recursive-descent parser that supports joins, WHERE filters, and computed CASE columns. Exports stream through PostgreSQL server-side cursors, so multi-million-row tables stay memory-safe.',
    technologies: ['Python', 'Tkinter', 'psycopg2', 'SQLite', 'pandas', 'openpyxl', 'PyInstaller'],
    image: exportHubImg,
    githubUrl: 'https://github.com/Viraj-005/ExportHub',
    liveUrl: null,
  },
  {
    id: 5,
    title: 'OmniFile AI',
    category: 'AI Tooling',
    description:
      'Streamlit app powered by Google Gemini for multi-format document understanding and analysis.',
    longDescription:
      'OmniFile AI is an intelligent document assistant that leverages the Google Gemini API to process and understand documents efficiently. It supports PDFs, DOCX, PPTX, XLSX, and code files. Users can interact naturally with their documents, generate summaries, extract key insights, create visualizations, and collaborate in real time.',
    technologies: ['Streamlit', 'Google Gemini API', 'Python', 'AI/ML', 'Data Visualization'],
    image: omniFileAiImg,
    githubUrl: 'https://github.com/Viraj-005/OmniFile-AI',
    liveUrl: 'https://omnifile-ai.streamlit.app/',
  },
  {
    id: 6,
    title: 'Plant Disease Detection',
    category: 'Computer Vision',
    description:
      'FastAPI + Streamlit service detecting plant disease from leaf imagery with treatment guidance.',
    longDescription:
      'A plant disease detection system with both a FastAPI backend and a Streamlit frontend. The application uses deep learning models to predict plant diseases, giving farmers and gardeners an accessible tool for early disease detection and treatment recommendations.',
    technologies: ['FastAPI', 'Streamlit', 'TensorFlow', 'Python', 'Deep Learning'],
    image: plantDiseaseImg,
    githubUrl: 'https://github.com/Viraj-005/plant-disease-detection-fastapi',
    liveUrl: 'https://plant-disease-detection-web-app.streamlit.app',
  },
  {
    id: 7,
    title: 'SmartSkin Scan',
    category: 'Medical AI',
    description:
      'Skin cancer classifier reaching 97.5% accuracy on EfficientNet-B3.',
    longDescription:
      'A skin cancer detection application built with Streamlit, achieving 97.5% accuracy using the EfficientNet-B3 architecture and TensorFlow. The model was trained and optimized on 200 medical images to provide reliable skin cancer classification for early detection and diagnosis.',
    technologies: ['Streamlit', 'EfficientNet-B3', 'TensorFlow', 'Python', 'Computer Vision'],
    image: smartSkinScanImg,
    githubUrl: 'https://github.com/Viraj-005/skin-cancer-detection',
    liveUrl: 'https://smartskin-scan.streamlit.app',
  },
  {
    id: 8,
    title: 'Agricultural Crop Recognition',
    category: 'Computer Vision',
    description:
      'CNN classifying crop types from satellite and drone imagery at 94% accuracy.',
    longDescription:
      'A convolutional neural network that classifies agricultural crops from aerial imagery. The model achieves 94% accuracy in identifying crop types, helping farmers optimize land use and monitor crop health. Implemented with TensorFlow and deployed via FastAPI.',
    technologies: ['TensorFlow', 'OpenCV', 'FastAPI', 'Python', 'Docker'],
    image: cropRecognitionImg,
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: 9,
    title: 'Skin Cancer Detection API',
    category: 'Medical AI',
    description:
      'Deployed inference endpoint classifying dermatological lesions from images.',
    longDescription:
      'A medical diagnosis service that uses deep convolutional neural networks to detect skin cancer from images. Trained on a large dataset of dermatological images, it classifies different types of skin lesions with high accuracy to assist healthcare professionals in early diagnosis.',
    technologies: ['TensorFlow', 'Keras', 'OpenCV', 'FastAPI', 'Docker'],
    image: skinCancerImg,
    githubUrl: null,
    liveUrl:
      'https://upgectsjud5oy5pyn7ewydmv2q0hslco.lambda-url.us-east-1.on.aws/',
  },
  {
    id: 10,
    title: 'Leukemia Detection API',
    category: 'Medical AI',
    description:
      'Transfer-learning model detecting leukemia from blood cell microscopy.',
    longDescription:
      'A computer vision service that analyzes blood cell images to detect leukemia. The model uses transfer learning with pre-trained networks and custom architectures to identify abnormal blood cells, assisting medical professionals with faster and more accurate diagnosis.',
    technologies: ['TensorFlow', 'Keras', 'OpenCV', 'FastAPI', 'Docker'],
    image: leukemiaImg,
    githubUrl: null,
    liveUrl:
      'https://acqbhbxsfpxsdzuo245oinxcza0gbnio.lambda-url.us-east-1.on.aws/',
  },
  {
    id: 11,
    title: 'Lung Cancer Detection API',
    category: 'Medical AI',
    description:
      '3D CNN scoring malignancy of lung nodules from CT volumes.',
    longDescription:
      'A medical imaging service that analyzes CT scans to detect lung cancer nodules. It uses 3D convolutional neural networks to process volumetric data and returns probability scores for malignancy, designed to support radiologists in early cancer detection.',
    technologies: ['TensorFlow', 'Keras', 'OpenCV', 'FastAPI', 'Docker'],
    image: lungCancerImg,
    githubUrl: null,
    liveUrl:
      'https://kubtah5wxifg5m33jaojdiuipy0omkyo.lambda-url.us-east-1.on.aws/',
  },
  {
    id: 12,
    title: 'Book Recommendation Engine',
    category: 'AI/ML',
    description:
      'Django app serving personalised recommendations from a 20K+ rating dataset.',
    longDescription:
      'An intelligent book recommendation system built with Django that provides ML-powered personalized recommendations. The system analyzes 20K+ user ratings to deliver accurate suggestions, improving user engagement by 25% through an interactive interface.',
    technologies: ['Django', 'Machine Learning', 'Python', 'Pandas', 'Scikit-learn'],
    image: bookRecommendationImg,
    githubUrl: 'https://github.com/Viraj-005/book-recommendation-web-app',
    liveUrl: null,
  },
  {
    id: 13,
    title: 'OpenCV Vision Suite',
    category: 'Computer Vision',
    description:
      'Five vision applications: motion filtering, edge detection, OCR, text enhancement, colour detection.',
    longDescription:
      'A collection of five computer vision projects demonstrating a range of OpenCV techniques: motion filtering, edge detection, OCR text recognition, text enhancement, and colour detection. Uses Tesseract OCR, HSV colour space, Gaussian blur, thresholding, and contour detection.',
    technologies: ['Python', 'OpenCV', 'Tesseract', 'Computer Vision', 'Image Processing'],
    image: opencvProjectsImg,
    githubUrl: 'https://github.com/Viraj-005/opencv-projects',
    liveUrl: null,
  },
  {
    id: 14,
    title: 'Frozen Land',
    category: 'Web',
    description: 'Ice cream ordering site built with PHP, CSS, and XAMPP.',
    longDescription:
      'A functional ice cream ordering website showcasing web development with PHP for backend functionality, CSS for styling, and XAMPP for local development. The site provides a complete ordering flow with an approachable interface.',
    technologies: ['PHP', 'CSS', 'HTML', 'XAMPP', 'JavaScript'],
    image: frozenLandImg,
    githubUrl: 'https://github.com/Viraj-005/Frozen-Land',
    liveUrl: null,
  },
  {
    id: 15,
    title: 'HappyBlock',
    category: 'Games',
    description: '2D game built in Unity and C#.',
    longDescription:
      'A 2D game developed with the Unity engine and C#. The project covers game mechanics, physics, user interface design, and interactive gameplay elements.',
    technologies: ['Unity', 'C#', 'Game Development', '2D Graphics', 'Game Design'],
    image: happyBlockImg,
    githubUrl: 'https://github.com/Viraj-005/happy-block-2d-game',
    liveUrl: null,
  },
];

// Three tiers of prominence: one full-width lead project, two featured, then
// the grid. Keeps the section from reading as one undifferentiated card wall.
const LEAD_COUNT = 1;
const FEATURED_COUNT = 2;
const INITIAL_REST = 6;

const StatusChip = ({ status }) => (
  <span className="chip bg-background/80 backdrop-blur">
    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
    </span>
    {status}
  </span>
);

/**
 * The lead project. Full-bleed banner above a two-column body, so it reads as
 * clearly more important than the featured pair without just being a bigger
 * copy of the same card.
 */
const LeadProjectCard = ({ project, onOpen }) => (
  <article
    data-reveal
    className="panel-interactive group relative overflow-hidden"
  >
    <div
      className="relative overflow-hidden border-b border-border"
      // Native ratio: this banner carries logos in the far corners, so cropping
      // it to a standard card ratio would cut them off.
      style={{ aspectRatio: project.imageRatio ?? '16 / 9' }}
    >
      <img
        src={project.image}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[600ms] ease-[--ease-out-expo] group-hover:scale-[1.02]"
      />
      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
        <span className="chip bg-background/80 backdrop-blur">{project.category}</span>
        {project.status && <StatusChip status={project.status} />}
      </div>
    </div>

    <div className="gap-10 p-6 md:p-8 lg:grid lg:grid-cols-[1.5fr_1fr]">
      <div>
        <h3 className="heading-2">
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            className="stretch-target cursor-pointer text-left transition-colors duration-[--duration-fast] group-hover:text-primary"
          >
            {project.title}
          </button>
        </h3>

        <p className="prose-body mt-3">{project.description}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {project.metrics && (
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-3 lg:mt-0 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dd className="text-2xl font-semibold tabular">{metric.value}</dd>
              <dt className="label-mono mt-0.5">{metric.label}</dt>
            </div>
          ))}
        </dl>
      )}
    </div>
  </article>
);

const ProjectCard = ({ project, featured, onOpen, index }) => (
  <article
    data-reveal
    style={stagger(index, 60)}
    className="panel-interactive group relative flex flex-col overflow-hidden"
  >
    <div className={`relative overflow-hidden ${featured ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
      <img
        src={project.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[600ms] ease-[--ease-out-expo] group-hover:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent opacity-70"
      />
      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
        <span className="chip bg-background/80 backdrop-blur">{project.category}</span>
        {project.status && <StatusChip status={project.status} />}
      </div>
    </div>

    <div className={`flex flex-1 flex-col ${featured ? 'p-6' : 'p-5'}`}>
      <h3 className={featured ? 'heading-3' : 'text-base font-semibold'}>
        <button
          type="button"
          onClick={() => onOpen(project.id)}
          className="stretch-target cursor-pointer text-left transition-colors duration-[--duration-fast] group-hover:text-primary"
        >
          {project.title}
        </button>
      </h3>

      <p className="prose-body mt-2 text-sm">{project.description}</p>

      {featured && project.metrics && (
        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-4">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="label-mono">{metric.label}</dt>
              <dd className="text-lg font-semibold tabular">{metric.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.technologies.slice(0, featured ? 5 : 3).map((tech) => (
          <li key={tech} className="chip">
            {tech}
          </li>
        ))}
        {project.technologies.length > (featured ? 5 : 3) && (
          <li className="chip">+{project.technologies.length - (featured ? 5 : 3)}</li>
        )}
      </ul>
    </div>
  </article>
);

export const ProjectsSection = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const revealRef = useReveal();

  const gridStart = LEAD_COUNT + FEATURED_COUNT;
  const lead = projects.slice(0, LEAD_COUNT);
  const featured = projects.slice(LEAD_COUNT, gridStart);
  const rest = showAll
    ? projects.slice(gridStart)
    : projects.slice(gridStart, gridStart + INITIAL_REST);

  const selected = projects.find((project) => project.id === selectedId) ?? null;

  return (
    <section id="projects" ref={revealRef} className="scroll-mt-24 py-24 md:py-32">
      <div className="container">
        <SectionHeading
          title="Selected work"
          lead="Enterprise automation at Sri Lanka Telecom, machine learning applied to medical imaging, and the tools built along the way."
        />

        {/* Lead: full width, the current flagship */}
        <div className="mt-14">
          {lead.map((project) => (
            <LeadProjectCard
              key={project.id}
              project={project}
              onOpen={setSelectedId}
            />
          ))}
        </div>

        {/* Featured: larger, with the numbers that matter */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured
              index={index}
              onOpen={setSelectedId}
            />
          ))}
        </div>

        {/* The rest */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={setSelectedId}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {projects.length > gridStart + INITIAL_REST && (
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="btn btn-secondary"
              aria-expanded={showAll}
            >
              {showAll
                ? 'Show fewer'
                : `Show all ${projects.length} projects`}
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-[--duration-base] ease-[--ease-out-expo] ${
                  showAll ? '-rotate-90' : 'rotate-90'
                }`}
                aria-hidden="true"
              />
            </button>
          )}

          <a
            href="https://github.com/Viraj-005"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* ── Detail dialog ───────────────────────────────────────── */}
      <Modal
        open={Boolean(selected)}
        onClose={() => setSelectedId(null)}
        labelledBy="project-dialog-title"
        className="max-w-2xl"
      >
        {selected && (
          <>
            <div className="relative aspect-[16/9] shrink-0 overflow-hidden">
              <img
                src={selected.image}
                alt=""
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"
              />
            </div>

            <div className="overflow-y-auto p-6 md:p-8">
              <div className="flex flex-wrap gap-1.5">
                <span className="chip">{selected.category}</span>
                {selected.status && <StatusChip status={selected.status} />}
              </div>

              <h3 id="project-dialog-title" className="heading-3 mt-3">
                {selected.title}
              </h3>

              <p className="prose-body mt-4 text-sm">{selected.longDescription}</p>

              {selected.metrics && (
                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-4">
                  {selected.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="label-mono">{metric.label}</dt>
                      <dd className="text-xl font-semibold tabular">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <h4 className="label-mono mt-6">built with</h4>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {selected.technologies.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {selected.isPrivate ? (
                  <p className="btn btn-secondary pointer-events-none opacity-70">
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    Private repository
                  </p>
                ) : (
                  selected.githubUrl && (
                    <a
                      href={selected.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      View code
                    </a>
                  )
                )}

                {selected.liveUrl && (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Live demo
                  </a>
                )}

                {/* Client work has its own reason for having no links, which is
                    worth saying plainly rather than falling through to the
                    generic "not public" line. */}
                {selected.accessNote ? (
                  <p className="flex items-center gap-2 text-sm text-subtle">
                    <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {selected.accessNote}
                  </p>
                ) : (
                  !selected.githubUrl &&
                  !selected.liveUrl && (
                    <p className="text-sm text-subtle">
                      Source and demo links aren't public for this one.
                    </p>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
};
