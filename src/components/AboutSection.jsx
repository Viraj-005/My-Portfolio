import { MapPin, Briefcase } from 'lucide-react';
import { useReveal, stagger } from '@/hooks/use-reveal';
import { SectionHeading } from '@/components/SectionHeading';

const timeline = [
  {
    year: '2025 to Present',
    title: 'Freelance Software Engineer',
    company: 'Sri Lanka Telecom',
    description:
      'Continuing development of the Sales Incentive Automation System, including the Manager Incentive module. Enterprise backend systems integrated with Azure AD authentication and Oracle databases, deployed to the SLT intranet Linux environment.',
  },
  {
    year: '2025',
    title: 'Intern Software Engineer',
    company: 'Sri Lanka Telecom',
    description:
      'Built automated Sales Incentive and Dealer Commission calculation modules, replacing manual Excel workflows and improving operational efficiency by 80%.',
  },
];

const specializations = [
  'Backend Engineering',
  'Enterprise Automation',
  'AI/ML Systems',
  'Full-Stack Development',
];

export const AboutSection = () => {
  const revealRef = useReveal();

  return (
    <section id="about" ref={revealRef} className="scroll-mt-24 py-24 md:py-32">
      <div className="container">
        <SectionHeading
          title="About"
          lead="Software engineer working across backend systems and applied machine learning."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* ── Bio ─────────────────────────────────────────────── */}
          <div data-reveal>
            <h3 className="heading-3 mb-4">Hello, I'm Viraj</h3>

            <div className="prose-body space-y-4">
              <p>
                I'm a software engineer specialising in backend systems, AI-driven
                solutions, and enterprise automation. I currently work with Sri Lanka
                Telecom while building independent software products.
              </p>
              <p>
                My work focuses on automating complex business processes, building
                scalable APIs, and developing AI-powered applications that improve
                efficiency and decision-making. I enjoy turning manual workflows into
                intelligent systems.
              </p>
            </div>

            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="panel flex items-center gap-3 px-4 py-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <dt className="label-mono">location</dt>
                  <dd className="text-sm font-medium">Sri Lanka</dd>
                </div>
              </div>
              <div className="panel flex items-center gap-3 px-4 py-3">
                <Briefcase className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <dt className="label-mono">role</dt>
                  <dd className="text-sm font-medium">Software Engineer</dd>
                </div>
              </div>
            </dl>

            <div className="mt-8">
              <h4 className="label-mono mb-3">specializations</h4>
              <ul className="flex flex-wrap gap-2">
                {specializations.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Career timeline ─────────────────────────────────── */}
          <div>
            <h3 data-reveal className="heading-3 mb-8">
              Career
            </h3>

            <ol className="relative">
              {/* Draws itself downward as the section enters view */}
              <span
                data-reveal="draw"
                aria-hidden="true"
                className="absolute bottom-6 left-[7px] top-2 w-px bg-gradient-to-b from-primary via-border to-transparent"
              />

              {timeline.map((item, index) => (
                <li
                  key={item.title}
                  data-reveal
                  style={stagger(index + 1, 120)}
                  className="relative mb-8 pl-8 last:mb-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-primary bg-background"
                  />

                  <time className="label-mono">{item.year}</time>
                  <h4 className="mt-1.5 text-base font-semibold">{item.title}</h4>
                  <p className="text-sm font-medium text-primary">{item.company}</p>
                  <p className="prose-body mt-2 text-sm">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
