import Link from "next/link";
import { formatPrice, Product } from "@/lib/data";

export function ProductTicket({ product }: { product: Product }) {
  return (
    <article className="ticket">
      <div className="ticket-top">
        <div className="ticket-code">SKU // {product.sku}</div>
        <div className="ticket-tag">{product.stock > 0 ? "В наличии" : "Под заказ"}</div>
      </div>
      <Link className="ticket-photo" href={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="ticket-perforation" />
      <div className="ticket-specs">
        {product.topSpecs.slice(0, 4).map((spec) => (
          <div className="spec-row" key={spec.label}>
            <span>{spec.label}</span>
            <b>{spec.value}</b>
          </div>
        ))}
        <div className="ticket-price">
          <div className="price">
            {formatPrice(product.price)}
            <span>{product.oldPrice ? `было ${formatPrice(product.oldPrice)}` : "официальная гарантия"}</span>
          </div>
          <button className="p-cart-btn" aria-label={`Добавить ${product.name} в корзину`}>
            +
          </button>
        </div>
      </div>
    </article>
  );
}
