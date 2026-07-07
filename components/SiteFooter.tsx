import Link from "next/link";

const footerGroups = [
  {
    title: "Покупателям",
    links: [
      ["Доставка", "/delivery"],
      ["Оплата", "/delivery"],
      ["Гарантия", "/warranty"],
      ["Возврат", "/warranty"]
    ]
  },
  {
    title: "Каталог",
    links: [
      ["Видеокарты", "/catalog/videocards"],
      ["Процессоры", "/catalog/processors"],
      ["SSD / HDD", "/catalog/ssd"],
      ["Блоки питания", "/catalog/power"]
    ]
  },
  {
    title: "Сервисы",
    links: [
      ["Конфигуратор", "/compare"],
      ["Сравнение", "/compare"],
      ["Избранное", "/favorites"],
      ["Блог", "/blog"]
    ]
  },
  {
    title: "Компания",
    links: [
      ["О нас", "/about"],
      ["Контакты", "/contacts"],
      ["FAQ", "/faq"],
      ["Админка", "/admin"]
    ]
  }
];

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link className="logo" href="/">
              YComp<span>.</span>
              <small>компоненты</small>
            </Link>
            <p className="muted" style={{ marginTop: 16, maxWidth: 340 }}>
              Интернет-магазин комплектующих с каталогом, сборками, кабинетами, блогом и админ-панелью.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h5>{group.title}</h5>
              <ul>
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© 2026 YComp. Демо MVP для рынка Украины.</span>
          <span>Visa / Mastercard / LiqPay / Fondy ready</span>
        </div>
      </div>
    </footer>
  );
}
