import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReveal, stagger } from '@/hooks/use-reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { AWS_LOGO, AWS_SERVICE_ICONS } from '@/lib/brand-icons';

const ICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

/**
 * Grouped by capability rather than rendered as sixteen identical cards.
 * The same information, denser, and it actually says something about the shape
 * of the skill set instead of just listing it.
 *
 * Two different dark-mode treatments, because the logos are built differently:
 *
 *   silhouetteOnDark - one solid dark shape on transparent (Django, Flask).
 *     Flattening to black then inverting gives a clean white silhouette.
 *
 *   invertOnDark - a dark shape with detail knocked out of it (Next.js is a
 *     black circle with the N cut out). Flattening it to black first would fill
 *     the knockout in and leave a plain white disc, so only invert.
 */
const groups = [
  {
    name: 'backend',
    skills: [
      { name: 'Python', icon: `${ICON_BASE}/python/python-original.svg` },
      { name: 'Django', icon: `${ICON_BASE}/django/django-plain.svg`, silhouetteOnDark: true },
      { name: 'FastAPI', icon: `${ICON_BASE}/fastapi/fastapi-original.svg` },
      { name: 'Flask', icon: `${ICON_BASE}/flask/flask-original.svg`, silhouetteOnDark: true },
      { name: 'Node.js', icon: `${ICON_BASE}/nodejs/nodejs-original.svg` },
    ],
  },
  {
    name: 'frontend',
    skills: [
      { name: 'React', icon: `${ICON_BASE}/react/react-original.svg` },
      { name: 'Next.js', icon: `${ICON_BASE}/nextjs/nextjs-original.svg`, invertOnDark: true },
      { name: 'TypeScript', icon: `${ICON_BASE}/typescript/typescript-original.svg` },
      { name: 'JavaScript', icon: `${ICON_BASE}/javascript/javascript-original.svg` },
      { name: 'Tailwind CSS', icon: `${ICON_BASE}/tailwindcss/tailwindcss-original.svg` },
    ],
  },
  {
    name: 'ai / ml',
    skills: [
      { name: 'TensorFlow', icon: `${ICON_BASE}/tensorflow/tensorflow-original.svg` },
      { name: 'PyTorch', icon: `${ICON_BASE}/pytorch/pytorch-original.svg` },
      { name: 'Scikit-learn', icon: `${ICON_BASE}/scikitlearn/scikitlearn-original.svg` },
      { name: 'OpenCV', icon: `${ICON_BASE}/opencv/opencv-original.svg` },
      { name: 'Keras', icon: `${ICON_BASE}/keras/keras-original.svg` },
    ],
  },
  {
    name: 'data & mobile',
    skills: [
      { name: 'PostgreSQL', icon: `${ICON_BASE}/postgresql/postgresql-original.svg` },
      { name: 'Oracle', icon: `${ICON_BASE}/oracle/oracle-original.svg` },
      { name: 'Apache Cassandra', icon: `${ICON_BASE}/cassandra/cassandra-original.svg` },
      { name: 'SQLite', icon: `${ICON_BASE}/sqlite/sqlite-original.svg` },
      { name: 'React Native', icon: `${ICON_BASE}/react/react-original.svg` },
    ],
  },
  {
    // Docker moved here from "data & mobile", where containerisation never
    // really belonged. AWS collapses its four services behind one row so the
    // column does not read as half AWS.
    name: 'cloud & deploy',
    skills: [
      {
        name: 'AWS',
        svg: AWS_LOGO,
        services: [
          { name: 'EC2', svg: AWS_SERVICE_ICONS.ec2 },
          { name: 'Lambda', svg: AWS_SERVICE_ICONS.lambda },
          { name: 'S3', svg: AWS_SERVICE_ICONS.s3 },
          { name: 'Amplify', svg: AWS_SERVICE_ICONS.amplify },
        ],
      },
      { name: 'Google Cloud', icon: `${ICON_BASE}/googlecloud/googlecloud-original.svg` },
      { name: 'Azure', icon: `${ICON_BASE}/azure/azure-original.svg` },
      { name: 'Docker', icon: `${ICON_BASE}/docker/docker-original.svg` },
      { name: 'Nginx', icon: `${ICON_BASE}/nginx/nginx-original.svg` },
    ],
  },
];

// Written out in full: Tailwind scans source text, so a class assembled from a
// variable at runtime never gets generated.
const ICON_SIZES = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
};

const SkillIcon = ({ skill, size = 'md' }) => {
  const [failed, setFailed] = useState(false);
  const box = ICON_SIZES[size];

  // Inlined brand glyph. No network, so no error path to handle. A null colour
  // means the mark inherits currentColor and follows the theme.
  if (skill.svg) {
    return (
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        focusable="false"
        fill={skill.svg.color ?? 'currentColor'}
        className={`${box} shrink-0 opacity-80 transition-opacity duration-[--duration-fast] group-hover:opacity-100`}
      >
        <path d={skill.svg.path} />
      </svg>
    );
  }

  if (failed) {
    // Previously fell through to via.placeholder.com, which no longer resolves.
    return (
      <span
        aria-hidden="true"
        className={`${box} grid shrink-0 place-items-center rounded border border-border font-mono text-[10px] font-semibold text-subtle`}
      >
        {skill.name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={skill.icon}
      alt=""
      width={20}
      height={20}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${box} shrink-0 object-contain opacity-80 transition-opacity duration-[--duration-fast] group-hover:opacity-100 ${
        skill.silhouetteOnDark ? 'dark:brightness-0 dark:invert' : ''
      } ${skill.invertOnDark ? 'dark:invert' : ''}`}
    />
  );
};

/**
 * AWS row. Opens on hover for pointer devices and on click or Enter/Space for
 * everyone else, so it works on touch and by keyboard rather than being a
 * hover-only affordance.
 */
const SkillDisclosure = ({ skill }) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="disclosure" data-open={open}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full cursor-pointer items-center gap-3 border-b border-border/60 py-3 text-left transition-colors duration-[--duration-fast] hover:border-border"
      >
        <SkillIcon skill={skill} />
        <span className="flex-1 text-sm text-muted transition-colors duration-[--duration-fast] group-hover:text-foreground">
          {skill.name}
        </span>
        <ChevronDown
          className="disclosure-chevron h-3.5 w-3.5 shrink-0 text-subtle"
          aria-hidden="true"
        />
      </button>

      <div id={panelId} className="disclosure-panel">
        <div>
          <ul className="ml-2 border-l border-border pb-1 pl-4 pt-2">
            {skill.services.map((service) => (
              <li key={service.name}>
                <div className="group flex items-center gap-2.5 py-1.5">
                  <SkillIcon skill={service} size="sm" />
                  <span className="text-[13px] text-subtle transition-colors duration-[--duration-fast] group-hover:text-muted">
                    {service.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const revealRef = useReveal();

  return (
    <section id="skills" ref={revealRef} className="scroll-mt-24 py-24 md:py-32">
      <div className="container">
        <SectionHeading
          title="Stack"
          lead="The tools I reach for most, grouped by where they sit in the system."
        />

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {groups.map((group, groupIndex) => (
            <div key={group.name} data-reveal style={stagger(groupIndex, 70)}>
              <h3 className="label-mono border-b border-border pb-3">{group.name}</h3>

              <ul className="mt-1">
                {group.skills.map((skill) => (
                  <li key={`${group.name}-${skill.name}`}>
                    {skill.services ? (
                      <SkillDisclosure skill={skill} />
                    ) : (
                      <div className="group flex items-center gap-3 border-b border-border/60 py-3 transition-colors duration-[--duration-fast] hover:border-border">
                        <SkillIcon skill={skill} />
                        <span className="text-sm text-muted transition-colors duration-[--duration-fast] group-hover:text-foreground">
                          {skill.name}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
