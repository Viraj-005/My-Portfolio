import { useState } from 'react';
import { Download, Maximize2 } from 'lucide-react';
import { useReveal, stagger } from '@/hooks/use-reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Modal } from '@/components/Modal';

import cert1 from '@/assets/Forge Data Analytics Simulation.webp';
import cert2 from '@/assets/Software Testing QA.webp';
import cert3 from '@/assets/project management.webp';
import cert4 from '@/assets/Agile PM HP LIFE.webp';
import cert5 from '@/assets/PowerBI.webp';
import cert6 from '@/assets/AIML SLIIT.webp';
import cert7 from '@/assets/Computer Vision.webp';
import cert8 from '@/assets/Intro to Deep Learning.webp';
import cert9 from '@/assets/Feature Engineering.webp';
import cert10 from '@/assets/Intro to Machine Learning.webp';
import cert11 from '@/assets/Coursera - UIUX.webp';
import cert12 from '@/assets/UIUX FSD.webp';
import cert13 from '@/assets/Web_Design_for_Beginners_2023.webp';
import cert14 from '@/assets/Cloud Computing.webp';

/**
 * Was a 14-slide autoplaying carousel with emoji play/pause controls. Autoplay
 * carousels move content out from under the reader, and only one certificate
 * was ever visible at a time. This shows the whole set at a glance and opens
 * the full image on demand.
 */
const certificates = [
  {
    id: 1,
    title: 'Data Analytics Job Simulation',
    image: cert1,
    issuer: 'Deloitte · Forage',
    date: '2025',
    description:
      "Completed Deloitte Australia's Data Analytics Virtual Internship on Forage, covering data analysis, dashboard creation, and business insights.",
  },
  {
    id: 6,
    title: 'AI/ML Engineer, Stage 1',
    image: cert6,
    issuer: 'SLIIT',
    date: '2024',
    description:
      'Foundational knowledge and practical skills in artificial intelligence and machine learning.',
  },
  {
    id: 7,
    title: 'Computer Vision',
    image: cert7,
    issuer: 'Kaggle',
    date: '2024',
    description: 'Practical computer vision techniques and applications.',
  },
  {
    id: 8,
    title: 'Intro to Deep Learning',
    image: cert8,
    issuer: 'Kaggle',
    date: '2024',
    description: 'Deep learning concepts and applied model building.',
  },
  {
    id: 9,
    title: 'Feature Engineering',
    image: cert9,
    issuer: 'Kaggle',
    date: '2024',
    description:
      'Transforming raw data into meaningful features for machine learning.',
  },
  {
    id: 10,
    title: 'Intro to Machine Learning',
    image: cert10,
    issuer: 'Kaggle',
    date: '2024',
    description:
      'Supervised and unsupervised learning, model evaluation, and predictive modelling with Python.',
  },
  {
    id: 5,
    title: 'Power BI Beginner to Pro',
    image: cert5,
    issuer: 'Pragmatic Works',
    date: '2024',
    description:
      'Hands-on data modelling, visualisation, and dashboard creation.',
  },
  {
    id: 2,
    title: 'Programming Foundations: Software Testing/QA',
    image: cert2,
    issuer: 'LinkedIn Learning',
    date: '2024',
    description: 'Software testing principles and quality assurance practices.',
  },
  {
    id: 11,
    title: 'Foundations of User Experience (UX) Design',
    image: cert11,
    issuer: 'Google · Coursera',
    date: '2024',
    description:
      'Building intuitive, user-focused digital experiences.',
  },
  {
    id: 12,
    title: 'UI/UX Design',
    image: cert12,
    issuer: 'FSD Academy',
    date: '2024',
    description:
      'Practical skills in user experience and interface design.',
  },
  {
    id: 3,
    title: 'Project Management Simplified',
    image: cert3,
    issuer: 'LinkedIn Learning',
    date: '2024',
    description: 'Project planning and resource management.',
  },
  {
    id: 4,
    title: 'Agile Project Management',
    image: cert4,
    issuer: 'HP LIFE',
    date: '2024',
    description:
      'Agile methodologies, sprint planning, and continuous improvement.',
  },
  {
    id: 14,
    title: 'Cloud Computing Foundations',
    image: cert14,
    issuer: 'Great Learning Academy',
    date: '2023',
    description: 'Core cloud concepts and services.',
  },
  {
    id: 13,
    title: 'Web Design for Beginners',
    image: cert13,
    issuer: 'CODL · University of Moratuwa',
    date: '2023',
    description:
      'HTML, CSS, JavaScript, and responsive design principles.',
  },
];

const INITIAL_COUNT = 6;

export const CertificatesSection = () => {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const revealRef = useReveal();

  const visible = showAll ? certificates : certificates.slice(0, INITIAL_COUNT);

  const handleDownload = () => {
    if (!selected) return;
    const extension = selected.image.split('.').pop()?.split('?')[0] ?? 'jpg';
    const link = document.createElement('a');
    link.href = selected.image;
    link.download = `${selected.title} Certificate.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="certificates" ref={revealRef} className="scroll-mt-24 py-24 md:py-32">
      <div className="container">
        <SectionHeading
          title="Certifications"
          lead={`${certificates.length} completed courses and simulations across machine learning, data, design, and delivery.`}
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((certificate, index) => (
            <li key={certificate.id} data-reveal style={stagger(index, 50)}>
              <article className="panel-interactive group relative flex h-full flex-col overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden border-b border-border bg-white">
                  <img
                    src={certificate.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain transition-transform duration-[600ms] ease-[--ease-out-expo] group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="label-mono">{certificate.issuer}</span>
                    <time className="label-mono">{certificate.date}</time>
                  </div>

                  <h3 className="text-sm font-semibold leading-snug">
                    <button
                      type="button"
                      onClick={() => setSelected(certificate)}
                      className="stretch-target cursor-pointer text-left transition-colors duration-[--duration-fast] group-hover:text-primary"
                    >
                      {certificate.title}
                      <span className="sr-only">, view full certificate</span>
                    </button>
                  </h3>

                  <Maximize2
                    className="mt-3 h-3.5 w-3.5 text-subtle opacity-0 transition-opacity duration-[--duration-fast] group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>

        {certificates.length > INITIAL_COUNT && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
              className="btn btn-secondary"
            >
              {showAll
                ? 'Show fewer'
                : `Show all ${certificates.length} certifications`}
            </button>
          </div>
        )}
      </div>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        labelledBy="certificate-dialog-title"
        className="max-w-5xl"
      >
        {selected && (
          <>
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border p-5 pr-16">
              <div>
                <h3 id="certificate-dialog-title" className="heading-3">
                  {selected.title}
                </h3>
                <p className="label-mono mt-1">
                  {selected.issuer} · {selected.date}
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="btn btn-secondary shrink-0 !min-h-9 !px-3 text-sm"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-auto bg-white p-4">
              <img
                src={selected.image}
                alt={`${selected.title} certificate issued by ${selected.issuer}`}
                className="mx-auto max-h-[60vh] w-auto max-w-full object-contain"
              />
            </div>

            <p className="shrink-0 border-t border-border p-5 text-sm text-muted">
              {selected.description}
            </p>
          </>
        )}
      </Modal>
    </section>
  );
};
