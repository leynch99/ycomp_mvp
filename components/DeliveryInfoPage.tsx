import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InfoSidebar } from "@/components/InfoSidebar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const deliveryMethods = [
  {
    title: "Новая Почта — отделение",
    price: "от 0 ₴",
    rows: [
      ["Срок", "1-2 дня"],
      ["Бесплатно от", "3 000 ₴"],
      ["Оплата при получении", "доступна"]
    ]
  },
  {
    title: "Курьер до двери",
    price: "89 ₴",
    rows: [
      ["Срок", "1 день по Киеву"],
      ["Бесплатно от", "5 000 ₴"],
      ["Осмотр товара", "до оплаты"]
    ]
  },
  {
    title: "Самовывоз из шоурума",
    price: "0 ₴",
    rows: [
      ["Готовность", "от 2 часов"],
      ["Города", "Киев, Львов, Одесса"],
      ["Резерв", "24 часа"]
    ]
  },
  {
    title: "Доставка сборки ПК",
    price: "по весу",
    rows: [
      ["Упаковка", "усиленная"],
      ["Проверка", "акт включения"],
      ["Страхование", "обязательно"]
    ]
  }
];

const priceRows = [
  ["До 2 кг", "59 ₴", "79 ₴"],
  ["2-5 кг", "89 ₴", "129 ₴"],
  ["5-15 кг", "149 ₴", "219 ₴"],
  ["Свыше 15 кг", "расчет менеджера", "расчет менеджера"]
];

const paymentItems = [
  "Картой онлайн: Visa, Mastercard, Apple Pay, Google Pay через LiqPay.",
  "Оплата частями 0% на 4-12 месяцев: monobank, ПриватБанк, ПУМБ.",
  "Наложенный платеж в отделении Новой Почты с осмотром товара.",
  "Безналичный расчет для юридических лиц со счетом и спецификацией."
];

export function DeliveryInfoPage() {
  return (
    <>
      <SiteHeader active="videocards" />
      <main>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Доставка и оплата" }]} />
        </div>

        <section className="info-page-head">
          <div className="wrap">
            <h1 className="page-title">Доставка и оплата</h1>
            <div className="info-updated">обновлено // 01.07.2026</div>
          </div>
        </section>

        <div className="wrap info-layout rich-info-layout">
          <InfoSidebar active="delivery" />

          <article className="info-content rich-info-content">
            <p>
              Мы доставляем комплектующие по всей Украине через Новую Почту, курьером по Киеву и
              через самовывоз из шоурума. Для техники важны не только сроки, но и сохранность:
              фиксируем серийные номера, проверяем пломбы и передаем товар в защитной упаковке.
            </p>

            <h2>Способы доставки</h2>
            <div className="method-grid">
              {deliveryMethods.map((method) => (
                <section className="method-card" key={method.title}>
                  <div className="method-card-top">
                    <h3>{method.title}</h3>
                    <span>{method.price}</span>
                  </div>
                  <div className="ticket-specs method-specs">
                    {method.rows.map(([label, value]) => (
                      <div className="spec-row" key={label}>
                        <span>{label}</span>
                        <b>{value}</b>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <h2>Стоимость по весу</h2>
            <div className="info-table-wrap">
              <table className="info-table">
                <thead>
                  <tr>
                    <th>Вес отправления</th>
                    <th>Киев</th>
                    <th>Украина</th>
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map(([weight, kyiv, ukraine]) => (
                    <tr key={weight}>
                      <td>{weight}</td>
                      <td>{kyiv}</td>
                      <td>{ukraine}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="callout">
              <div className="mono-label">important // delivery</div>
              <p>
                При заказе от 3 000 ₴ доставка в отделение Новой Почты бесплатна. Для готовых ПК
                стоимость может уточняться после проверки веса и габаритов корпуса.
              </p>
            </div>

            <h2>Способы оплаты</h2>
            <ul className="info-bullets">
              {paymentItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Частые вопросы</h2>
            <details className="faq-item" open>
              <summary>Можно ли проверить товар перед оплатой?</summary>
              <p>
                Да, при самовывозе и наложенном платеже можно осмотреть упаковку, комплектацию и
                внешний вид товара до оплаты.
              </p>
            </details>
            <details className="faq-item">
              <summary>Что делать, если товар пришел поврежденным?</summary>
              <p>
                Составьте акт повреждения в отделении перевозчика и свяжитесь с поддержкой. Мы
                организуем замену или возврат средств после фиксации случая.
              </p>
            </details>
            <details className="faq-item">
              <summary>Сколько длится доставка в удаленные регионы?</summary>
              <p>
                Обычно 2-3 дня от склада в Киеве. Для позиций под заказ срок показывается отдельно
                в карточке товара и в кабинете.
              </p>
            </details>

            <div className="helpful-row">
              <span>Страница была полезной?</span>
              <button className="btn btn-outline" type="button">
                Да
              </button>
              <button className="btn btn-outline" type="button">
                Нет
              </button>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
