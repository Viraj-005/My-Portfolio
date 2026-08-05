/**
 * One heading treatment for every section.
 *
 * Deliberately no small-caps eyebrow above the title. An eyebrow on every
 * section is scaffolding, not voice. Structure comes from the rule that runs
 * out to the right of the heading, which ties back to the grid in the
 * background rather than adding a new decorative element.
 */
export const SectionHeading = ({ title, lead, id }) => {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-6">
        <h2 id={id} className="heading-2 whitespace-nowrap" data-reveal>
          {title}
        </h2>
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-gradient-to-r from-border to-transparent"
          data-reveal="fade"
        />
      </div>

      {lead && (
        <p className="prose-body mt-4 text-base md:text-lg" data-reveal>
          {lead}
        </p>
      )}
    </div>
  );
};
