import Link from "next/link";
import { ReactNode } from "react";

const navGroups = [
  ["Обзор", [["Дашборд", "/admin", "▣", ""]]],
  [
    "Продажи",
    [
      ["Заказы", "/admin/orders", "▤", "12"],
      ["Товары", "/admin/products", "◈", ""],
      ["Категории", "/admin/products", "▥", ""],
      ["Остатки и склады", "/admin/products", "▦", ""]
    ]
  ],
  [
    "Клиенты",
    [
      ["Покупатели", "/admin/orders", "◎", ""],
      ["Отзывы", "/admin/orders", "★", "5"]
    ]
  ],
  [
    "Контент",
    [
      ["Блог", "/blog", "✎", ""],
      ["Баннеры и акции", "/admin", "◆", ""],
      ["Промокоды", "/admin", "%", ""]
    ]
  ],
  ["Система", [["Настройки", "/admin", "⚙", ""]]]
] as const;

export function AdminShell({ children, active }: { children: ReactNode; active: "dashboard" | "orders" | "products" }) {
  const activePath = active === "dashboard" ? "/admin" : `/admin/${active}`;

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <Link className="sb-logo" href="/admin">
          YComp<span>.</span>
          <small>admin</small>
        </Link>
        {navGroups.map(([group, links]) => (
          <div key={group}>
            <div className="sb-group">{group}</div>
            {links.map(([label, href, icon, badge]) => (
              <Link className={`sb-item${href === activePath ? " active" : ""}`} href={href} key={`${group}-${label}`}>
                <span>{icon}</span>
                <span style={{ flex: 1 }}>{label}</span>
                {badge ? <span className="n-badge">{badge}</span> : null}
              </Link>
            ))}
          </div>
        ))}
      </aside>

      <div>
        <header className="topbar">
          <form className="topbar-search">
            <input placeholder="Поиск заказа, товара, клиента..." />
          </form>
          <div className="topbar-right">
            <span className="topbar-icon">
              !<span className="dot" />
            </span>
            <span className="topbar-icon">
              @<span className="dot" />
            </span>
            <div className="admin-chip">
              <span className="admin-avatar" />
              <span className="muted">Admin</span>
            </div>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
