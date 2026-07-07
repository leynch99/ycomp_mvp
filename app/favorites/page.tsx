import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { products } from "@/lib/data";

export default function FavoritesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Избранное" }]} />
          <section className="cat-head">
            <div className="cat-head-top">
              <div>
                <h1>Избранное</h1>
                <div className="count">7 товаров // 4 доступны к отправке сегодня</div>
              </div>
              <button className="btn btn-primary">Добавить все в корзину</button>
            </div>
          </section>
          <section className="page-section">
            <div className="product-grid">
              {products.slice(0, 6).map((product) => (
                <ProductCard product={product} key={product.slug} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
