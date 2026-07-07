import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InfoSidebar } from "@/components/InfoSidebar";

export function InfoPage({
  title,
  subtitle,
  rows,
  body,
  active
}: {
  title: string;
  subtitle: string;
  active: string;
  rows: Array<[string, string]>;
  body: string[];
}) {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: title }]} />
        </div>
        <section className="info-hero">
          <div className="wrap">
            <div className="eyebrow">YComp service</div>
            <h1 className="page-title">{title}</h1>
            <p className="page-sub">{subtitle}</p>
          </div>
        </section>
        <div className="wrap info-layout">
          <InfoSidebar active={active} />
          <article className="info-content">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="info-list">
              {rows.map(([label, value]) => (
                <li key={label}>
                  <span>{label}</span>
                  <b>{value}</b>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
