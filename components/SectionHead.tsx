import Link from "next/link";

export function SectionHead({
  index,
  title,
  href,
  linkLabel = "Смотреть все"
}: {
  index: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-head">
      <h2>
        <span className="num">{index}</span>
        {title}
      </h2>
      {href ? (
        <Link className="section-link" href={href}>
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
