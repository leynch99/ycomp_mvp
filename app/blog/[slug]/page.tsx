import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts, formatPrice, getBlogPost, getProduct, products } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  const inlineProduct = getProduct(post.relatedProductSlugs[0]);
  const relatedProducts = post.relatedProductSlugs.map((slug) => getProduct(slug));

  return (
    <>
      <SiteHeader />
      <main>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Блог", href: "/blog" }, { label: post.title }]} />
          <section className="article-hero">
            <div className="eyebrow">article // {post.category}</div>
            <h1 className="article-title">{post.title}</h1>
            <div className="p-meta-row">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
              <span>{post.author}</span>
            </div>
            <img className="article-cover" src={post.cover} alt={post.title} />
          </section>

          <div className="article-layout">
            <article className="article-body">
              <p>
                Эта статья показывает, как экспертный контент YComp связан с каталогом: формула, проверка параметров и
                прямой переход к подходящим комплектующим.
              </p>
              <div className="callout">
                <b>Формула для MVP</b>
                <p>
                  CPU TDP + GPU TDP + остальные компоненты + запас 30%. Для новых видеокарт дополнительно учитывайте
                  ATX 3.1 и наличие 12V-2x6.
                </p>
              </div>
              <h2>Что считать данными</h2>
              <p>
                Мощность, сертификат, интерфейс, сокет, частота и ресурс - это данные. В интерфейсе они показаны
                моноширинным шрифтом и не смешиваются с длинным описанием.
              </p>
              <div className="inline-product">
                <img src={inlineProduct.image} alt={inlineProduct.name} />
                <div style={{ flex: 1 }}>
                  <div className="mono-label">product // {inlineProduct.sku}</div>
                  <b>{inlineProduct.name}</b>
                  <div className="muted">{inlineProduct.tags.join(" / ")}</div>
                </div>
                <div className="price">{formatPrice(inlineProduct.price)}</div>
                <Link className="btn btn-primary" href={`/product/${inlineProduct.slug}`}>
                  Открыть
                </Link>
              </div>
              <h2>Проверка совместимости</h2>
              <p>
                В следующей фазе конфигуратор сможет сравнивать сохраненную сборку с выбранным товаром. В MVP эта
                логика уже вынесена в модель Build и может быть подключена к карточке товара.
              </p>

              <h2>Комментарии</h2>
              <form className="comment-form">
                <textarea placeholder="Ваш вопрос по статье или сборке..." />
                <button className="btn btn-outline" type="submit">
                  Отправить
                </button>
              </form>
              {["Павел", "Анна"].map((name) => (
                <div className="comment" key={name}>
                  <div className="avatar" />
                  <div>
                    <b>{name}</b>
                    <p className="muted">Полезно, что формула привязана к конкретным характеристикам из карточек.</p>
                  </div>
                </div>
              ))}
            </article>

            <aside>
              <div className="toc">
                <h3>Оглавление</h3>
                <a href="#">Формула</a>
                <a href="#">Данные</a>
                <a href="#">Совместимость</a>
                <a href="#">Комментарии</a>
              </div>
              <div className="side-card">
                <h3>Товары из статьи</h3>
                {relatedProducts.map((product) => (
                  <Link className="mini-item" href={`/product/${product.slug}`} key={product.slug}>
                    <img src={product.image} alt={product.name} />
                    <span>{product.name}</span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>

          <section className="page-section">
            <div className="section-head">
              <h2>
                <span className="num">01 /</span>
                Рекомендуемые товары
              </h2>
              <Link className="section-link" href="/catalog">
                В каталог
              </Link>
            </div>
            <div className="product-grid">
              {products.slice(0, 4).map((product) => (
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
