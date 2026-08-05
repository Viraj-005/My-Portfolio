import { useState } from 'react';
import { useReveal, stagger } from '@/hooks/use-reveal';
import { SectionHeading } from '@/components/SectionHeading';

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
      { name: 'SQLite', icon: `${ICON_BASE}/sqlite/sqlite-original.svg` },
      { name: 'Oracle', icon: `${ICON_BASE}/oracle/oracle-original.svg` },
      { name: 'React Native', icon: `${ICON_BASE}/react/react-original.svg` },
      { name: 'Docker', icon: `${ICON_BASE}/docker/docker-original.svg` },
    ],
  },
];

const SkillIcon = ({ skill }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Previously fell through to via.placeholder.com, which no longer resolves.
    return (
      <span
        aria-hidden="true"
        className="grid h-5 w-5 shrink-0 place-items-center rounded border border-border font-mono text-[10px] font-semibold text-subtle"
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
      className={`h-5 w-5 shrink-0 object-contain opacity-80 transition-opacity duration-[--duration-fast] group-hover:opacity-100 ${
        skill.silhouetteOnDark ? 'dark:brightness-0 dark:invert' : ''
      } ${skill.invertOnDark ? 'dark:invert' : ''}`}
    />
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

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, groupIndex) => (
            <div key={group.name} data-reveal style={stagger(groupIndex, 70)}>
              <h3 className="label-mono border-b border-border pb-3">{group.name}</h3>

              <ul className="mt-1">
                {group.skills.map((skill) => (
                  <li key={`${group.name}-${skill.name}`}>
                    <div className="group flex items-center gap-3 border-b border-border/60 py-3 transition-colors duration-[--duration-fast] hover:border-border">
                      <SkillIcon skill={skill} />
                      <span className="text-sm text-muted transition-colors duration-[--duration-fast] group-hover:text-foreground">
                        {skill.name}
                      </span>
                    </div>
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
