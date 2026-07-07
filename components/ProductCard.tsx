import Link from "next/link";
import { formatPrice, Product } from "@/lib/data";

function badgeClass(badge?: Product["badge"]) {
  if (badge === "Скидка") {
    return "b-sale";
  }

  return "b-new";
}

export function ProductCard({ product, wide = false }: { product: Product; wide?: boolean }) {
  return (
    <article className={`p-card${wide ? " wide" : ""}`}>
      <Link className="p-img" href={`/product/${product.slug}`}>
        {product.badge ? (
          <span className="p-badges">
            <span className={`p-badge ${badgeClass(product.badge)}`}>{product.badge}</span>
          </span>
        ) : null}
        <span className="p-fav" aria-label="В избранное">
          ♡
        </span>
        <img src={product.image} alt={product.name} />
      </Link>

      <div className="p-body">
        <div className="p-main">
          <div className="p-cat">
            {product.category} // {product.sku}
          </div>
          <Link className="p-name" href={`/product/${product.slug}`}>
            {product.name}
          </Link>
          <div className="p-tags">
            {product.tags.map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="p-rating">
            <span className="stars">★★★★★</span>
            <span>
              {product.rating} / {product.reviews} отзывов
            </span>
          </div>
          <div className="p-compare">
            <span className="fake-check" />
            Добавить к сравнению
          </div>
        </div>

        {wide ? (
          <div className="p-specs-inline">
            {product.topSpecs.slice(0, 3).map((spec) => (
              <span key={spec.label}>
                {spec.label}
                <b>{spec.value}</b>
              </span>
            ))}
          </div>
        ) : null}

        <div className="p-foot">
          <div className="p-price">
            {formatPrice(product.price)}
            {product.oldPrice ? <span className="old">{formatPrice(product.oldPrice)}</span> : null}
          </div>
          <button className="p-cart-btn" aria-label={`Добавить ${product.name} в корзину`}>
            +
          </button>
        </div>
      </div>
    </article>
  );
}
