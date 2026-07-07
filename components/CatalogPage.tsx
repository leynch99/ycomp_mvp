import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { categories, getCategory, getProductsByCategory } from "@/lib/data";

export function CatalogPage({ categorySlug = "all" }: { categorySlug?: string }) {
  const isAll = categorySlug === "all";
  const category = isAll
    ? {
        slug: "all",
        name: "Каталог комплектующих",
        count: categories.reduce((sum, item) => sum + item.count, 0),
        description: "Все основные категории YComp: процессоры, видеокарты, память, накопители, питание и корпуса."
      }
    : getCategory(categorySlug);
  const catalogProducts = getProductsByCategory(isAll ? undefined : category.slug);
  const wideProduct = catalogProducts[0];

  return (
    <>
      <SiteHeader active={isAll ? "videocards" : category.slug} mobileActive="catalog" />
      <main>
        <div className="wrap">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Каталог", href: "/catalog" },
              ...(isAll ? [] : [{ label: category.name }])
            ]}
          />
        </div>

        <section className="cat-head">
          <div className="wrap">
            <div className="cat-head-top">
              <div>
                <h1>{category.name}</h1>
                <div className="count">
                  {category.count} товаров // серверная фильтрация query-параметрами готова в API
                </div>
              </div>
              <a className="btn btn-outline" href="#seo">
                Как выбрать
              </a>
            </div>
            <div className="brand-strip">
              {["MSI", "ASUS", "Gigabyte", "Kingston", "Samsung", "be quiet!"].map((brand, index) => (
                <span className={`brand-chip${index === 0 ? " active" : ""}`} key={brand}>
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="wrap cat-layout">
          <FilterSidebar />

          <section aria-label="Товары">
            <div className="toolbar">
              <div className="active-filters">
                <span className="af-chip">MSI x</span>
                <span className="af-chip">16 GB x</span>
                <span className="af-chip">PCIe 5.0 x</span>
              </div>
              <div className="toolbar-right">
                <select className="sort-select" defaultValue="popular" aria-label="Сортировка">
                  <option value="popular">По популярности</option>
                  <option value="price_asc">Цена по возрастанию</option>
                  <option value="price_desc">Цена по убыванию</option>
                  <option value="new">Новинки</option>
                </select>
                <div className="view-toggle" aria-label="Вид каталога">
                  <span className="active">▦</span>
                  <span>☰</span>
                </div>
              </div>
            </div>

            <div className="product-grid catalog-products">
              {catalogProducts.map((product, index) => (
                <ProductCard product={product} wide={index === 1 && catalogProducts.length > 3} key={product.slug} />
              ))}
              {wideProduct && catalogProducts.length < 4 ? <ProductCard product={wideProduct} wide /> : null}
            </div>

            <div className="pagination" aria-label="Пагинация">
              <span className="page-item active">1</span>
              <span className="page-item">2</span>
              <span className="page-item">3</span>
              <span className="page-item">...</span>
              <span className="page-item">12</span>
            </div>
          </section>
        </div>

        <section className="seo-block" id="seo">
          <div className="wrap seo-cols">
            <div>
              <h2>Как выбрать {isAll ? "комплектующие" : category.name.toLowerCase()}</h2>
              <p>{category.description}</p>
              <p>
                В YComp фильтры построены вокруг технических характеристик: сокет, память, TDP, интерфейс,
                форм-фактор, ресурс и наличие по городу. Это помогает сравнить товары как спецификацию, а не как
                рекламные карточки.
              </p>
            </div>
            <div>
              {[
                ["Что важнее цены?", "Совместимость с текущей сборкой, гарантия и наличие в городе."],
                ["Как работают счетчики?", "API пересчитывает их по товарам, которые проходят выбранные фильтры."],
                ["Можно сравнить товары?", "Да, добавьте 2-4 позиции в сравнение из карточек каталога."]
              ].map(([question, answer], index) => (
                <details className="faq-item" open={index === 0} key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
