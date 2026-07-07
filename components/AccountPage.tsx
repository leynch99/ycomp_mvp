import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { accountStats, formatPrice, orders, placeholder, statusClass, statusLabel } from "@/lib/data";

const accountSections = [
  ["Обзор", [["Дашборд", "/account", ""]]],
  [
    "Покупки",
    [
      ["Мои заказы", "/account/orders", "2"],
      ["Избранное", "/favorites", "7"],
      ["Сравнения", "/compare", ""],
      ["Мои сборки ПК", "/account/builds", ""],
      ["Отзывы и вопросы", "/account/reviews", ""],
      ["Trade-In заявки", "/account/trade-in", ""]
    ]
  ],
  [
    "Данные",
    [
      ["Адреса доставки", "/account/addresses", ""],
      ["Способы оплаты", "/account/payments", ""]
    ]
  ],
  [
    "Программы",
    [
      ["Бонусная программа", "/account/bonus", ""],
      ["Реферальная программа", "/account/referral", ""]
    ]
  ],
  [
    "Настройки",
    [
      ["Профиль", "/account/profile", ""],
      ["Уведомления", "/account/notifications", ""]
    ]
  ]
] as const;

function AccountNav({ section }: { section?: string }) {
  const currentPath = section ? `/account/${section}` : "/account";

  return (
    <aside>
      <div className="acc-profile">
        <div className="acc-avatar">ДК</div>
        <div>
          <div className="name">Дмитрий Коваль</div>
          <div className="tier">Gold · 2 340 бонусов</div>
        </div>
      </div>
      <nav className="acc-nav">
        {accountSections.map(([group, links]) => (
          <div key={group}>
            <div className="group-title">{group}</div>
            {links.map(([label, href, badge]) => (
              <Link className={href === currentPath ? "active" : undefined} href={href} key={href}>
                {label}
                {badge ? <span className="n-badge">{badge}</span> : null}
              </Link>
            ))}
          </div>
        ))}
        <div className="divider" />
        <Link className="logout" href="/login">
          Выйти
        </Link>
      </nav>
    </aside>
  );
}

function OrdersCard() {
  return (
    <div className="card">
      <div className="card-head">
        <h2>Последние заказы</h2>
        <Link className="section-link" href="/account/orders">
          Все заказы
        </Link>
      </div>
      <div className="order-row head-row">
        <span>Заказ</span>
        <span>Товары</span>
        <span>Дата</span>
        <span>Сумма</span>
        <span>Статус</span>
        <span />
      </div>
      {orders.map((order) => (
        <div className="order-row" key={order.id}>
          <span className="oid">{order.id}</span>
          <div>
            <div className="order-thumbs">
              {order.items.map((item) => (
                <img src={placeholder(item, 64, 64)} alt={item} key={item} />
              ))}
            </div>
            <div className="muted">{order.items.length} позиции</div>
          </div>
          <span className="oid">{order.date}</span>
          <span className="order-price">{formatPrice(order.total)}</span>
          <span className={`status-pill ${statusClass(order.status)}`}>{statusLabel(order.status)}</span>
          <Link className="repeat-btn" href="/cart">
            Повторить
          </Link>
        </div>
      ))}
    </div>
  );
}

function BuildsAndAddresses() {
  return (
    <div className="two-col">
      <div className="card">
        <div className="card-head">
          <h2>Сохраненные сборки</h2>
          <Link className="section-link" href="/account/builds">
            Открыть
          </Link>
        </div>
        {[
          ["AM5 gaming build", "GPU + CPU + RAM + PSU", 78240],
          ["Workstation render", "CPU + 64GB RAM + SSD", 64590],
          ["Office compact", "APU + mATX + NVMe", 28880]
        ].map(([name, spec, price]) => (
          <div className="build-item" key={String(name)}>
            <div className="order-thumbs">
              {["CPU", "GPU", "RAM"].map((item) => (
                <img src={placeholder(item, 64, 64)} alt={item} key={item} />
              ))}
            </div>
            <div className="info">
              <b>{name}</b>
              <span>{spec}</span>
            </div>
            <div className="price">{formatPrice(Number(price))}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <h2>Адреса доставки</h2>
          <Link className="section-link" href="/account/addresses">
            Изменить
          </Link>
        </div>
        {[
          ["Киев, отделение №24", "ул. Дегтяревская 25", "по умолчанию"],
          ["Киев, курьер", "ул. Антоновича 176", ""],
          ["Львов, отделение №11", "ул. Городоцкая 174", ""]
        ].map(([title, note, tag]) => (
          <div className="list-item" key={title}>
            <div>
              <b>
                {title}
                {tag ? <span className="tag-default">{tag}</span> : null}
              </b>
              <div className="muted">{note}</div>
            </div>
            <span className="section-link">edit</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BonusCard() {
  return (
    <div className="card">
      <div className="card-head">
        <h2>Бонусная и реферальная программа</h2>
        <Link className="section-link" href="/faq">
          Правила
        </Link>
      </div>
      <div className="bonus-card-body">
        <div className="bonus-balance">
          <div>
            <div className="mono-label">balance // available</div>
            <div className="amount">
              2 340 ₴ <span className="muted">до списания</span>
            </div>
          </div>
          <Link className="btn btn-outline" href="/cart">
            Использовать
          </Link>
        </div>
        <div className="bonus-progress">
          <div className="fill" />
        </div>
        <div className="bonus-note">До уровня Platinum осталось 8 200 ₴ покупок</div>
        <div className="ref-link-row">
          <input readOnly value="https://ycomp.ua/r/DK-2048" />
          <button className="btn btn-quiet">Скопировать</button>
        </div>
      </div>
    </div>
  );
}

export function AccountPage({ section }: { section?: string }) {
  const sectionTitle =
    {
      orders: "Мои заказы",
      builds: "Мои сборки ПК",
      addresses: "Адреса доставки",
      bonus: "Бонусная программа",
      referral: "Реферальная программа"
    }[section ?? ""] ?? "Личный кабинет";

  return (
    <>
      <SiteHeader mobileActive="account" />
      <main>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: sectionTitle }]} />
          <div className="acc-layout">
            <AccountNav section={section} />
            <section>
              <div className="acc-head">
                <div>
                  <h1>{sectionTitle}</h1>
                  <div className="page-sub">demo session // customer // protected layout scaffold</div>
                </div>
                <Link className="btn btn-primary" href="/catalog">
                  Продолжить покупки
                </Link>
              </div>

              <div className="stat-grid">
                {accountStats.map((stat) => (
                  <div className={`stat-card${stat.accent ? " bonus" : ""}`} key={stat.label}>
                    <div className="k">{stat.label}</div>
                    <div className="v">
                      {stat.value} <span>{stat.delta}</span>
                    </div>
                  </div>
                ))}
              </div>

              <OrdersCard />
              <BuildsAndAddresses />
              <BonusCard />
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
