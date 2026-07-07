import Link from "next/link";

const infoLinks = [
  { label: "Доставка и оплата", href: "/delivery", key: "delivery" },
  { label: "Гарантия и возврат", href: "/warranty", key: "warranty" },
  { label: "Trade-In", href: "/trade-in", key: "trade-in" },
  { label: "Бонусная программа", href: "/bonuses", key: "bonuses" },
  { label: "О нас", href: "/about", key: "about" },
  { label: "Документы", href: "/documents", key: "documents" }
];

export function InfoSidebar({ active }: { active: string }) {
  return (
    <aside className="info-nav" aria-label="Информационные страницы">
      <div className="info-nav-group">Покупателям</div>
      {infoLinks.map((link) => (
        <Link className={active === link.key ? "active" : undefined} href={link.href} key={link.key}>
          {link.label}
        </Link>
      ))}

      <div className="info-nav-contact">
        <div className="mono-label">support // online</div>
        <h3>Остались вопросы?</h3>
        <p>Чат и телефон поддержки работают ежедневно с 9:00 до 21:00.</p>
        <Link className="btn btn-primary" href="/contacts">
          Написать в чат
        </Link>
      </div>
    </aside>
  );
}
