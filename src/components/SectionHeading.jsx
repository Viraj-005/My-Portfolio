export const SectionHeading = ({title,lead,id}) => <div className="editorial-heading"><h2 id={id} data-reveal>{title}<span>.</span></h2>{lead&&<p data-reveal>{lead}</p>}</div>;
