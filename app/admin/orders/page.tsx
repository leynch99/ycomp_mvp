import { AdminShell } from "@/components/admin/AdminShell";
import { formatPrice, orders, statusClass, statusLabel } from "@/lib/data";

export default function AdminOrdersPage() {
  return (
    <AdminShell active="orders">
      <div className="page-head">
        <div>
          <h1>Заказы</h1>
          <div className="page-sub">server pagination // filters // role protected</div>
        </div>
        <button className="btn btn-primary">Создать заказ</button>
      </div>

      <section className="panel" style={{ marginTop: 24 }}>
        <div className="table-toolbar">
          <div className="tabs-row">
            <span className="tab-pill active">Все</span>
            <span className="tab-pill">Новые</span>
            <span className="tab-pill">Оплачены</span>
            <span className="tab-pill">Возвраты</span>
          </div>
          <div className="toolbar-right">
            <select className="sort-select" defaultValue="date">
              <option value="date">По дате</option>
              <option value="total">По сумме</option>
            </select>
          </div>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Заказ</th>
              <th>Клиент</th>
              <th>Дата</th>
              <th>Товары</th>
              <th>Сумма</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders.concat(orders).map((order, index) => (
              <tr key={`${order.id}-${index}`}>
                <td className="oid">{order.id}</td>
                <td>{order.customer}</td>
                <td className="oid">{order.date}</td>
                <td className="oid">{order.items.join(" / ")}</td>
                <td>{formatPrice(order.total)}</td>
                <td>
                  <span className={`status-pill ${statusClass(order.status)}`}>{statusLabel(order.status)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AdminShell>
  );
}
