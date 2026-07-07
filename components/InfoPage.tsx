import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function InfoPage({
  title,
  subtitle,
  rows,
  body
}: {
  title: string;
  subtitle: string;
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
          <div className="info-content">
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
          </div>
          <aside className="info-card">
            <div className="mono-label">contact // support</div>
            <h2>Нужна помощь?</h2>
            <p className="muted">Менеджер проверит наличие, совместимость и условия доставки по вашему городу.</p>
            <a className="btn btn-primary" href="tel:+380443907878">
              Заказать звонок
            </a>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
