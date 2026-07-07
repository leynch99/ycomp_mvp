import Link from "next/link";
import { Fragment } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { formatPrice, products } from "@/lib/data";

const compared = [products[0], products[4], products[5]];
const rows = ["category", "brand", "price", "socket", "memory", "power", "stock"] as const;

function valueFor(row: (typeof rows)[number], index: number) {
  const product = compared[index];
  if (row === "category") return product.category;
  if (row === "brand") return product.brand;
  if (row === "price") return formatPrice(product.price);
  if (row === "stock") return `${product.stock} шт.`;
  return product.attributes[row] ?? product.attributes.type ?? "-";
}

export default function ComparePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Сравнение" }]} />
          <section className="cat-head">
            <div className="cat-head-top">
              <div>
                <h1>Сравнение товаров</h1>
                <div className="count">3 позиции // спецификации side-by-side</div>
              </div>
              <Link className="btn btn-outline" href="/catalog">
                Добавить товар
              </Link>
            </div>
          </section>

          <section className="page-section">
            <div className="compare-grid">
              <div className="compare-cell label">Параметр</div>
              {compared.map((product) => (
                <div className="compare-cell" key={product.slug}>
                  <img src={product.image} alt={product.name} style={{ height: 120, marginBottom: 12 }} />
                  <b>{product.name}</b>
                </div>
              ))}
              {rows.map((row) => (
                <Fragment key={row}>
                  <div className="compare-cell label" key={`${row}-label`}>
                    {row}
                  </div>
                  {compared.map((product, index) => (
                    <div className="compare-cell" key={`${product.slug}-${row}`}>
                      {valueFor(row, index)}
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
