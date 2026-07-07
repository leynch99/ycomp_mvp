import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { formatPrice, getProduct, products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 4);

  return (
    <>
      <SiteHeader active={product.categorySlug} />
      <main>
        <div className="wrap">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Каталог", href: "/catalog" },
              { label: product.category, href: `/catalog/${product.categorySlug}` },
              { label: product.name }
            ]}
          />

          <section className="p-hero">
            <div>
              <div className="gallery-main">
                {product.badge ? (
                  <div className="p-badges">
                    <span className={`p-badge ${product.badge === "Скидка" ? "b-sale" : "b-new"}`}>
                      {product.badge}
                    </span>
                  </div>
                ) : null}
                <img src={product.image} alt={product.name} />
              </div>
              <div className="gallery-thumbs">
                {[1, 2, 3, 4, 5].map((thumb) => (
                  <div className={thumb === 1 ? "active" : undefined} key={thumb}>
                    <img src={product.image} alt={`${product.name} фото ${thumb}`} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="p-eyebrow">
                {product.brand} // {product.category}
              </div>
              <h1 className="p-title">{product.name}</h1>
              <div className="p-meta-row">
                <span className="stars">★★★★★</span>
                <Link href="#reviews">{product.reviews} отзывов</Link>
                <span className="sku">SKU // {product.sku}</span>
                <span>Бренд: {product.brand}</span>
              </div>

              <div className="top-specs">
                {product.topSpecs.map((spec) => (
                  <div className="top-spec-row" key={spec.label}>
                    <span>{spec.label}</span>
                    <b>{spec.value}</b>
                  </div>
                ))}
              </div>

              <div className="compat-box">
                <span className="ic">✓</span>
                <div>
                  <b>Совместимо с последней сборкой</b>
                  <span>Сокет AM5, DDR5 и запас БП 30% проходят базовую проверку.</span>
                </div>
              </div>
              <div className="compat-box warn">
                <span className="ic">!</span>
                <div>
                  <b>Проверьте габариты корпуса</b>
                  <span>Длина компонента должна помещаться в выбранный корпус с учетом кабелей.</span>
                </div>
              </div>
            </div>

            <aside className="buy-box">
              <div className="stock">В наличии // {product.stock} шт.</div>
              <div className="price-row">
                <div className="price">{formatPrice(product.price)}</div>
                {product.oldPrice ? <div className="old-price">{formatPrice(product.oldPrice)}</div> : null}
              </div>
              <div className="installment">Оплата частями от {formatPrice(Math.ceil(product.price / 6))} / мес.</div>
              <div className="qty-row">
                <div className="qty-stepper">
                  <div>-</div>
                  <span>1</span>
                  <div>+</div>
                </div>
                <Link className="btn btn-primary" href="/cart">
                  В корзину
                </Link>
              </div>
              <div className="secondary-actions">
                <button className="icon-btn">♡ Избранное</button>
                <button className="icon-btn">◈ Сравнить</button>
              </div>
              <div className="delivery-info">
                <div className="row">
                  <span>NP</span>
                  <span>
                    <b>Новая Почта</b>
                    <br />
                    завтра, от 0 ₴
                  </span>
                </div>
                <div className="row">
                  <span>KY</span>
                  <span>
                    <b>Самовывоз Киев</b>
                    <br />
                    сегодня с 15:00
                  </span>
                </div>
              </div>
              <div className="build-widget">
                <div className="txt">
                  <b>BUILD // 03</b>
                  Собрать ПК с этим товаром и сохранить спецификацию.
                </div>
                <Link className="btn btn-quiet" href="/compare">
                  Открыть
                </Link>
              </div>
            </aside>
          </section>

          <section>
            <nav className="tabs-nav" aria-label="Информация о товаре">
              <span className="tab-item active">Описание</span>
              <span className="tab-item">Характеристики</span>
              <span className="tab-item">Отзывы</span>
              <span className="tab-item">Доставка и оплата</span>
            </nav>

            <div className="tab-panel">
              <div className="desc-cols">
                <div>
                  <h3>Технический фокус</h3>
                  <p>
                    Карточка товара строится вокруг данных: SKU, топ-характеристики, наличие, цена и совместимость
                    вынесены выше длинного описания.
                  </p>
                  <p>
                    Для реальной базы атрибуты приходят из ProductAttribute и рендерятся динамически без привязки к
                    конкретной категории.
                  </p>
                </div>
                <div>
                  <div className="spec-group-title">Полная спецификация</div>
                  <table className="spec-table">
                    <tbody>
                      {Object.entries(product.attributes).map(([key, value]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section id="reviews" className="page-section">
            <div className="section-head">
              <h2>
                <span className="num">01 /</span>
                Отзывы
              </h2>
              <button className="btn btn-outline">Написать отзыв</button>
            </div>
            <div className="review-summary">
              <div className="review-score">
                <div className="big">{product.rating}</div>
                <div className="stars">★★★★★</div>
                <div className="count">{product.reviews} отзывов</div>
              </div>
              <div className="review-bars">
                {[92, 71, 24, 9, 4].map((value, index) => (
                  <div className="review-bar-row" key={value}>
                    <span>{5 - index}</span>
                    <div className="bar">
                      <div className="fill" style={{ width: `${value}%` }} />
                    </div>
                    <span>{value}%</span>
                  </div>
                ))}
              </div>
            </div>
            {["Дмитрий Коваль", "Олена Петренко"].map((name, index) => (
              <article className="review-item" key={name}>
                <div className="avatar" />
                <div>
                  <div className="p-meta-row">
                    <b>{name}</b>
                    <span className="sku">0{index + 1}.07.2026</span>
                  </div>
                  <div className="stars">★★★★★</div>
                  <p className="muted">
                    Понравилось, что характеристики и рекомендации по совместимости видны до покупки. Упаковка и
                    гарантийные данные совпали с заказом.
                  </p>
                </div>
              </article>
            ))}
          </section>

          <section className="page-section">
            <div className="section-head">
              <h2>
                <span className="num">02 /</span>
                Похожие товары
              </h2>
              <Link className="section-link" href={`/catalog/${product.categorySlug}`}>
                В категорию
              </Link>
            </div>
            <div className="related-grid product-grid">
              {related.map((item) => (
                <ProductCard product={item} key={item.slug} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
