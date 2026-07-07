import Link from "next/link";
import { categories } from "@/lib/data";

export function SiteHeader({ active = "videocards" }: { active?: string }) {
  return (
    <>
      <div className="utility-bar">
        <div className="wrap">
          <div>
            Доставка по Украине · <span className="city">Киев</span>
          </div>
          <nav aria-label="Сервисные ссылки">
            <Link href="/delivery">Доставка</Link>
            <Link href="/warranty">Гарантия</Link>
            <Link href="/contacts">Помощь</Link>
          </nav>
        </div>
      </div>

      <header className="main-header">
        <div className="wrap">
          <Link className="logo" href="/">
            YComp<span>.</span>
            <small>компоненты</small>
          </Link>

          <form className="search-box" action="/catalog">
            <input name="q" placeholder="Найти процессор, видеокарту, SSD..." />
            <button type="submit">Найти</button>
          </form>

          <div className="header-icons" aria-label="Быстрые разделы">
            <Link className="icon-item" href="/compare">
              <span className="glyph">◈</span>
              <span>Сравнение</span>
              <span className="count-badge">3</span>
            </Link>
            <Link className="icon-item" href="/favorites">
              <span className="glyph">♡</span>
              <span>Избранное</span>
              <span className="count-badge">7</span>
            </Link>
            <Link className="icon-item" href="/account">
              <span className="glyph">◎</span>
              <span>Кабинет</span>
            </Link>
            <Link className="icon-item" href="/cart">
              <span className="glyph">▤</span>
              <span>Корзина</span>
              <span className="count-badge">2</span>
            </Link>
          </div>
        </div>
      </header>

      <nav className="catalog-nav" aria-label="Каталог">
        <div className="wrap">
          <Link className="catalog-btn" href="/catalog">
            ☰ Каталог
          </Link>
          <div className="catalog-links">
            {categories.slice(0, 8).map((category) => (
              <Link
                className={category.slug === active ? "active" : undefined}
                href={`/catalog/${category.slug}`}
                key={category.slug}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
