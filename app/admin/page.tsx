import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminKpis, formatPrice, orders, statusClass, statusLabel } from "@/lib/data";

export default function AdminDashboardPage() {
  return (
    <AdminShell active="dashboard">
      <div className="page-head">
        <div>
          <h1>Дашборд</h1>
          <div className="page-sub">операционная сводка // последние 30 дней</div>
        </div>
        <div className="period">07.06.2026 - 07.07.2026</div>
      </div>

      <div className="kpi-grid">
        {adminKpis.map((kpi) => (
          <div className="kpi-card" key={kpi.label}>
            <div className="k">{kpi.label}</div>
            <div className="v">{kpi.value}</div>
            <div className={`delta ${kpi.dir}`}>{kpi.delta} к прошлому периоду</div>
            {kpi.spark ? (
              <div className="spark" aria-hidden="true">
                {[35, 70, 50, 82, 65, 92, 75].map((height, index) => (
                  <div className={index > 2 ? "hi" : undefined} style={{ height: `${height}%` }} key={height} />
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="admin-main-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>Продажи по дням</h2>
            <Link className="section-link" href="/admin/orders">
              Экспорт CSV
            </Link>
          </div>
          <div className="chart">
            {[60, 80, 45, 95, 70, 55, 88].map((height, index) => (
              <div className="chart-col" key={height}>
                <div className={`chart-bar${index === 3 || index === 6 ? " accent" : ""}`} style={{ height: `${height}%` }} />
                <div className="chart-label">0{index + 1}.07</div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>Требуют внимания</h2>
          </div>
          {[
            ["red", "7 товаров скоро закончатся", "RTX 5070 Ti - осталось 3 шт.", "сейчас"],
            ["orange", "3 заказа без движения >24ч", "#48120, #48115, #48098", "2 ч"],
            ["blue", "5 новых отзывов на модерации", "Требуют проверки перед публикацией", "4 ч"],
            ["red", "2 возврата ожидают решения", "Заказ #47950, #47811", "6 ч"]
          ].map(([color, title, text, time]) => (
            <div className="alert-row" key={title}>
              <span className={`alert-dot ${color}`} />
              <div className="txt">
                <b>{title}</b>
                <span>{text}</span>
              </div>
              <span className="time">{time}</span>
            </div>
          ))}
        </section>
      </div>

      <section className="panel">
        <div className="table-toolbar">
          <div className="tabs-row">
            <span className="tab-pill active">Все (412)</span>
            <span className="tab-pill">Новые (12)</span>
            <span className="tab-pill">В обработке (28)</span>
            <span className="tab-pill">Отправлены (54)</span>
          </div>
          <Link className="btn btn-outline" href="/admin/orders">
            Создать заказ
          </Link>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Заказ</th>
              <th>Клиент</th>
              <th>Дата</th>
              <th>Сумма</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="oid">{order.id}</td>
                <td>
                  <div className="cust">
                    <span className="av" />
                    {order.customer}
                  </div>
                </td>
                <td className="oid">{order.date}</td>
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
