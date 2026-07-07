import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { formatPrice, products } from "@/lib/data";

export default function AdminProductsPage() {
  return (
    <AdminShell active="products">
      <div className="page-head">
        <div>
          <h1>Товары</h1>
          <div className="page-sub">CRUD scaffold // attributes JSON // stock control</div>
        </div>
        <button className="btn btn-primary">Добавить товар</button>
      </div>

      <section className="panel" style={{ marginTop: 24 }}>
        <div className="table-toolbar">
          <div className="tabs-row">
            <span className="tab-pill active">Активные ({products.length})</span>
            <span className="tab-pill">Скрытые</span>
            <span className="tab-pill">Низкий остаток</span>
          </div>
          <select className="sort-select" defaultValue="stock">
            <option value="stock">Остаток</option>
            <option value="price">Цена</option>
          </select>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Товар</th>
              <th>SKU</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Остаток</th>
              <th>Активен</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug}>
                <td>
                  <Link className="p-thumb" href={`/product/${product.slug}`}>
                    <img src={product.image} alt={product.name} />
                    {product.name}
                  </Link>
                </td>
                <td className="oid">{product.sku}</td>
                <td>{product.category}</td>
                <td>{formatPrice(product.price)}</td>
                <td>
                  <span className="oid">{product.stock} шт.</span>
                  <div className={`stock-bar${product.stock < 10 ? " low" : ""}`}>
                    <div className="fill" style={{ width: `${Math.min(product.stock * 3, 100)}%` }} />
                  </div>
                </td>
                <td>
                  <span className={`toggle-mini${product.status === "hidden" ? " off" : ""}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AdminShell>
  );
}
