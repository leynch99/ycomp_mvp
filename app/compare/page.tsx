import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { formatPrice, placeholder, products } from "@/lib/data";

type CompareProduct = {
  slug: string;
  href: string;
  maker: string;
  name: string;
  image: string;
  rating: string;
  price: number;
  oldPrice?: number;
};

type SpecRow = {
  label: string;
  values: [string, string, string];
  best?: number[];
};

const compared: CompareProduct[] = [
  {
    slug: products[0].slug,
    href: `/product/${products[0].slug}`,
    maker: "NVIDIA / MSI",
    name: products[0].name,
    image: products[0].image,
    rating: `${products[0].rating} · ${products[0].reviews} отзывов`,
    price: products[0].price,
    oldPrice: products[0].oldPrice
  },
  {
    slug: "asus-rog-strix-rtx-5080-oc-16gb",
    href: "/catalog/videocards",
    maker: "NVIDIA / ASUS",
    name: "ASUS ROG Strix RTX 5080 OC 16GB GDDR7",
    image: placeholder("ASUS RTX 5080", 460, 340),
    rating: "5.0 · 19 отзывов",
    price: 68990
  },
  {
    slug: "sapphire-pulse-rx-9070-xt-16gb",
    href: "/catalog/videocards",
    maker: "AMD / Sapphire",
    name: "Sapphire Pulse RX 9070 XT 16GB",
    image: placeholder("RX 9070 XT", 460, 340),
    rating: "4.7 · 52 отзыва",
    price: 27990
  }
];

const specGroups: Array<{ title: string; rows: SpecRow[] }> = [
  {
    title: "Память",
    rows: [
      { label: "Объем памяти", values: ["16 GB", "16 GB", "16 GB"], best: [0, 1, 2] },
      { label: "Тип памяти", values: ["GDDR7", "GDDR7", "GDDR6"], best: [0, 1] },
      { label: "Шина памяти", values: ["256 bit", "256 bit", "256 bit"], best: [0, 1, 2] }
    ]
  },
  {
    title: "Производительность",
    rows: [
      { label: "Интерфейс", values: ["PCIe 5.0", "PCIe 5.0", "PCIe 4.0"], best: [0, 1] },
      { label: "TDP", values: ["285 W", "360 W", "304 W"], best: [0] },
      { label: "Рекомендуемый БП", values: ["750 W", "850 W", "750 W"], best: [0, 2] },
      { label: "Питание", values: ["16-pin 12V-2x6", "16-pin 12V-2x6", "2 x 8-pin"], best: [0, 1] }
    ]
  },
  {
    title: "Габариты",
    rows: [
      { label: "Длина карты", values: ["322 мм", "357 мм", "304 мм"], best: [2] },
      { label: "Толщина", values: ["3 слота", "3.5 слота", "3 слота"], best: [0, 2] },
      { label: "Корпус от", values: ["Mid Tower", "Full Tower", "Mid Tower"], best: [0, 2] }
    ]
  },
  {
    title: "Гарантия",
    rows: [
      { label: "Гарантия", values: ["24 мес", "36 мес", "24 мес"], best: [1] },
      { label: "Наличие", values: ["В наличии", "В наличии", "В наличии"], best: [0, 1, 2] },
      { label: "Склад Киев", values: ["9 шт.", "4 шт.", "6 шт."], best: [0] }
    ]
  }
];

const categoryTabs = [
  { label: "Видеокарты", count: 3, active: true },
  { label: "Процессоры", count: 2 },
  { label: "Память", count: 2 }
];

export default function ComparePage() {
  return (
    <>
      <SiteHeader active="videocards" />
      <main>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Сравнение" }]} />

          <section className="cmp-head">
            <div>
              <h1>Сравнение товаров</h1>
              <div className="sub">Видеокарты · 3 товара // datasheet side-by-side</div>
            </div>
            <div className="cat-tabs" aria-label="Категории сравнения">
              {categoryTabs.map((tab) => (
                <button className={`cat-tab${tab.active ? " active" : ""}`} type="button" key={tab.label}>
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </section>

          <div className="highlight-toggle">
            <span className="toggle-mini" aria-hidden="true" />
            <span>Подсвечивать лучшее значение по каждой характеристике</span>
          </div>

          <section className="cmp-table-wrap" aria-label="Таблица сравнения товаров">
            <table className="cmp-table">
              <tbody>
                <tr>
                  <th className="row-label-col" scope="col">
                    Товар
                  </th>
                  {compared.map((product) => (
                    <td className="cmp-product-cell" key={product.slug}>
                      <button className="cmp-remove" type="button" aria-label={`Убрать ${product.name}`}>
                        ×
                      </button>
                      <Link href={product.href}>
                        <img src={product.image} alt={product.name} />
                      </Link>
                      <div className="p-cat">{product.maker}</div>
                      <Link className="p-name" href={product.href}>
                        {product.name}
                      </Link>
                      <div className="p-rating">
                        <span className="stars">★★★★★</span>
                        <span>{product.rating}</span>
                      </div>
                      <div className="p-price">
                        {formatPrice(product.price)}
                        {product.oldPrice ? <span className="old">{formatPrice(product.oldPrice)}</span> : null}
                      </div>
                      <Link className="btn btn-primary" href="/cart">
                        В корзину
                      </Link>
                    </td>
                  ))}
                  <td className="cmp-add-cell">
                    <Link className="add-slot" href="/catalog/videocards">
                      <span className="plus">+</span>
                      <span>Добавить товар для сравнения</span>
                    </Link>
                  </td>
                </tr>

                {specGroups.map((group) => (
                  <FragmentLikeGroup group={group} key={group.title} />
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function FragmentLikeGroup({ group }: { group: { title: string; rows: SpecRow[] } }) {
  return (
    <>
      <tr className="cmp-group-row">
        <td colSpan={5}>{group.title}</td>
      </tr>
      {group.rows.map((row) => (
        <tr key={row.label}>
          <th className="row-label-col" scope="row">
            {row.label}
          </th>
          {row.values.map((value, index) => (
            <td className={`spec-val${row.best?.includes(index) ? " best" : ""}`} key={`${row.label}-${value}-${index}`}>
              {value}
            </td>
          ))}
          <td className="spec-val muted-cell">—</td>
        </tr>
      ))}
    </>
  );
}
