import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { formatPrice, Product, products } from "@/lib/data";

type FavoriteItem = {
  product: Product;
  available: boolean;
  addedAt: string;
};

const favoriteItems: FavoriteItem[] = [
  { product: products[0], available: true, addedAt: "02.07.2026" },
  { product: products[1], available: true, addedAt: "01.07.2026" },
  { product: products[3], available: true, addedAt: "29.06.2026" },
  { product: products[6], available: false, addedAt: "27.06.2026" },
  { product: products[2], available: true, addedAt: "25.06.2026" },
  { product: products[4], available: true, addedAt: "24.06.2026" },
  { product: products[5], available: true, addedAt: "21.06.2026" }
];

const categoryFilters = [
  { label: "Все", count: favoriteItems.length, active: true },
  { label: "Видеокарты", count: 1 },
  { label: "Оперативная память", count: 1 },
  { label: "SSD", count: 1 },
  { label: "Корпуса", count: 1 },
  { label: "Питание", count: 1 }
];

function badgeClass(badge?: Product["badge"]) {
  return badge === "Скидка" ? "b-sale" : "b-new";
}

export default function FavoritesPage() {
  const availableCount = favoriteItems.filter((item) => item.available).length;

  return (
    <>
      <SiteHeader mobileActive="favorites" />
      <main>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Избранное" }]} />

          <section className="fav-head">
            <div>
              <h1>Избранное</h1>
              <div className="sub">
                {favoriteItems.length} товаров сохранено // {availableCount} готовы к отправке
              </div>
            </div>
            <div className="fav-actions">
              <button className="btn btn-primary" type="button">
                Добавить все в корзину
              </button>
              <button className="btn btn-outline danger" type="button">
                Очистить список
              </button>
            </div>
          </section>

          <div className="cat-filter" aria-label="Фильтр избранного по категориям">
            {categoryFilters.map((filter) => (
              <button className={`cat-chip${filter.active ? " active" : ""}`} type="button" key={filter.label}>
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          <section className="fav-grid" aria-label="Сохраненные товары">
            {favoriteItems.map((item) => (
              <FavoriteCard item={item} key={item.product.slug} />
            ))}
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function FavoriteCard({ item }: { item: FavoriteItem }) {
  const { product, available } = item;

  return (
    <article className={`p-card fav-card${available ? "" : " is-out"}`}>
      <Link className="p-img" href={`/product/${product.slug}`}>
        <span className="p-badges">
          {!available ? <span className="p-badge b-oos">Нет в наличии</span> : null}
          {available && product.badge ? <span className={`p-badge ${badgeClass(product.badge)}`}>{product.badge}</span> : null}
        </span>
        <img src={product.image} alt={product.name} />
      </Link>
      <button className="fav-remove" type="button" aria-label={`Удалить ${product.name} из избранного`}>
        ×
      </button>

      <div className="p-body">
        <div className="p-main">
          <div className="p-cat">
            {product.category} // {product.sku}
          </div>
          <Link className="p-name" href={`/product/${product.slug}`}>
            {product.name}
          </Link>
          <div className="p-tags">
            {product.tags.slice(0, 3).map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className={`stock-note${available ? " in" : " out"}`}>
            {available ? `В наличии · ${product.stock} шт.` : "Нет в наличии"}
          </div>
        </div>

        <div className="p-foot">
          <div className="p-price">
            {formatPrice(product.price)}
            {product.oldPrice ? <span className="old">{formatPrice(product.oldPrice)}</span> : null}
          </div>
          {available ? (
            <button className="p-cart-btn" type="button" aria-label={`Добавить ${product.name} в корзину`}>
              +
            </button>
          ) : null}
        </div>

        {!available ? (
          <button className="notify-btn" type="button">
            Уведомить о поступлении
          </button>
        ) : null}

        <div className="added-date">добавлено {item.addedAt}</div>
      </div>
    </article>
  );
}
