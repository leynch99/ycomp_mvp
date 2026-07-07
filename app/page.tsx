import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { ProductTicket } from "@/components/ProductTicket";
import { SectionHead } from "@/components/SectionHead";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts, categories, products } from "@/lib/data";

const quickActions = [
  {
    tag: "// CONFIG",
    title: "Конфигуратор ПК",
    text: "Соберите корзину по шагам и сохраните сборку в кабинете.",
    href: "/compare"
  },
  {
    tag: "// FAST PICK",
    title: "Быстрый подбор",
    text: "Бюджет, задачи, город - менеджер подготовит точную спецификацию.",
    href: "/contacts"
  },
  {
    tag: "// SERVICE",
    title: "Trade-In и апгрейд",
    text: "Оценим старое железо и предложим понятный маршрут обновления.",
    href: "/warranty"
  }
];

const audiences = [
  ["Для геймера", "GPU, CPU, охлаждение и монитор без узких мест."],
  ["Для дизайнера", "Память, SSD, цвет, рендер и стабильная рабочая станция."],
  ["Для офиса", "Тихие сборки, гарантия, B2B счета и быстрый сервис."],
  ["Для стримера", "Кодирование, захват, звук и запас по питанию."]
];

const benefits = [
  ["NP // 24H", "Доставка по Украине", "Новая Почта, курьер и самовывоз из шоурума."],
  ["QA // SERIAL", "Проверка серийников", "Фиксируем товар и гарантию прямо в заказе."],
  ["PAY // PARTS", "Оплата частями", "LiqPay/Fondy адаптер готов к подключению ключей."],
  ["LAB // SUPPORT", "Подбор и сборка", "Помогаем проверить совместимость до покупки."]
];

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="wrap">
            <div>
              <div className="eyebrow">PC components // Ukraine</div>
              <h1 className="hero-title">
                Комплектующие, которые можно <em>сравнить по цифрам</em>
              </h1>
              <p className="hero-sub">
                YComp соединяет каталог, проверку совместимости, корзину, кабинет покупателя и админку в одном MVP.
              </p>
              <div className="hero-ctas">
                <Link className="btn btn-primary" href="/catalog">
                  Открыть каталог
                </Link>
                <Link className="btn btn-outline" href="/product/msi-rtx-5070-ti-ventus-3x-16gb">
                  Товар дня
                </Link>
              </div>
              <div className="hero-stats">
                <div>
                  <b>1 525+</b>
                  <span>SKU в структуре MVP</span>
                </div>
                <div>
                  <b>8</b>
                  <span>ключевых категорий</span>
                </div>
                <div>
                  <b>24/7</b>
                  <span>чат и поддержка</span>
                </div>
              </div>
            </div>
            <ProductTicket product={products[0]} />
          </div>
        </section>

        <section className="page-section">
          <div className="wrap">
            <SectionHead index="01 /" title="Быстрые маршруты" />
            <div className="quick-grid">
              {quickActions.map((action) => (
                <Link className="quick-card" href={action.href} key={action.title}>
                  <span className="tag">{action.tag}</span>
                  <h3>{action.title}</h3>
                  <p>{action.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="wrap">
            <SectionHead index="02 /" title="Категории" href="/catalog" />
            <div className="cat-grid">
              {categories.map((category) => (
                <Link className="cat-tile" href={`/catalog/${category.slug}`} key={category.slug}>
                  <div className="cat-icon">{category.icon}</div>
                  <b>{category.name}</b>
                  <span>{category.count} товаров</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="wrap">
            <div className="section-head">
              <h2>
                <span className="num">03 /</span>
                Подборки товаров
              </h2>
              <div className="tabs">
                <span className="tab active">Хиты</span>
                <span className="tab">Новинки</span>
                <span className="tab">Outlet</span>
                <span className="tab">Рекомендуем</span>
              </div>
            </div>
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard product={product} key={product.slug} />
              ))}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="wrap">
            <SectionHead index="04 /" title="По назначению" />
            <div className="audience-grid">
              {audiences.map(([title, text], index) => (
                <Link className="aud-card" href="/catalog" key={title}>
                  <span className="mono-label">build // 0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="wrap">
            <SectionHead index="05 /" title="Сервис магазина" />
            <div className="benefits-grid">
              {benefits.map(([code, title, text]) => (
                <div className="benefit" key={title}>
                  <b>{code}</b>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="wrap">
            <SectionHead index="06 /" title="Последние статьи" href="/blog" />
            <div className="blog-grid">
              {blogPosts.slice(0, 3).map((post) => (
                <Link className="blog-card" href={`/blog/${post.slug}`} key={post.slug}>
                  <div className="blog-media">
                    <span className="b-cat-badge">{post.category}</span>
                    <img src={post.cover} alt={post.title} />
                  </div>
                  <div className="blog-content">
                    <div className="article-meta">
                      {post.date} // {post.readTime}
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="wrap">
            <div className="newsletter">
              <div>
                <div className="eyebrow">mail // stock alerts</div>
                <h2 className="page-title">Уведомления о ценах и наличии</h2>
                <p className="muted">Без маркетингового шума: только важные изменения по вашим категориям.</p>
              </div>
              <form className="newsletter-form">
                <input placeholder="email@example.com" />
                <button className="btn btn-primary" type="submit">
                  Подписаться
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
