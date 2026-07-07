"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const deviceTypes = [
  { id: "gpu", label: "Видеокарта", base: 7200 },
  { id: "cpu", label: "Процессор", base: 4200 },
  { id: "laptop", label: "Ноутбук", base: 12800 },
  { id: "pc", label: "Готовый ПК", base: 18400 }
];

const brands = ["NVIDIA", "AMD", "Intel", "ASUS", "MSI", "Gigabyte", "Lenovo"];

const conditions = [
  { id: "like-new", label: "Как новое", hint: "0-6 мес.", factor: 1.16 },
  { id: "good", label: "Хорошее", hint: "без повреждений", factor: 1 },
  { id: "used", label: "Среднее", hint: "следы износа", factor: 0.82 },
  { id: "repair", label: "Требует ремонта", hint: "есть дефекты", factor: 0.52 }
];

const kitItems = [
  { id: "box", label: "Оригинальная коробка", bonus: 250 },
  { id: "cables", label: "Кабели и переходники в комплекте", bonus: 300 },
  { id: "warranty", label: "Гарантийный талон / чек", bonus: 420 }
];

const processSteps = [
  ["01", "Заполните форму", "Укажите тип, бренд, модель, состояние и комплектацию устройства."],
  ["02", "Получите оценку", "Предварительная сумма зачета пересчитывается сразу в sticky-тикете."],
  ["03", "Сдайте технику", "Привезите устройство в шоурум или отправьте его перевозчиком."],
  ["04", "Получите скидку", "Зачет применяется к новому заказу после финального осмотра."]
];

function formatEstimate(value: number) {
  return new Intl.NumberFormat("uk-UA").format(value) + " ₴";
}

export function TradeInPage() {
  const [deviceType, setDeviceType] = useState(deviceTypes[0].id);
  const [brand, setBrand] = useState(brands[0]);
  const [model, setModel] = useState("RTX 3070");
  const [year, setYear] = useState("2023");
  const [condition, setCondition] = useState(conditions[1].id);
  const [kit, setKit] = useState<string[]>(["box", "cables"]);

  const selectedDevice = deviceTypes.find((item) => item.id === deviceType) ?? deviceTypes[0];
  const selectedCondition = conditions.find((item) => item.id === condition) ?? conditions[1];

  const estimate = useMemo(() => {
    const conditionPrice = Math.round(selectedDevice.base * selectedCondition.factor);
    const kitBonus = kitItems
      .filter((item) => kit.includes(item.id))
      .reduce((sum, item) => sum + item.bonus, 0);
    const tradeInBonus = Math.round(((conditionPrice + kitBonus) * 0.15) / 50) * 50;
    const total = conditionPrice + kitBonus + tradeInBonus;

    return { conditionPrice, kitBonus, tradeInBonus, total };
  }, [kit, selectedCondition.factor, selectedDevice.base]);

  function toggleKit(id: string) {
    setKit((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <>
      <SiteHeader active="videocards" />
      <main>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Trade-In" }]} />

          <section className="trade-hero">
            <div>
              <div className="eyebrow">Trade-In программа</div>
              <h1 className="hero-title">
                Сдай старую технику и получи <em>зачет</em> на новую
              </h1>
              <p className="hero-sub">
                Оцените видеокарту, процессор, ноутбук или готовый ПК онлайн за пару минут.
                Предварительный зачет можно применить к следующему заказу сразу после осмотра.
              </p>
              <div className="ti-steps-mini" aria-label="Краткий процесс Trade-In">
                <span>
                  <b>01</b> оценка
                </span>
                <span>
                  <b>02</b> осмотр
                </span>
                <span>
                  <b>03</b> скидка
                </span>
              </div>
            </div>

            <div className="ticket ti-hero-ticket" aria-label="Пример зачета Trade-In">
              <div className="ticket-top">
                <div className="ticket-code">TRADE-IN // EXAMPLE</div>
                <div className="ticket-tag">Оценено</div>
              </div>
              <div className="ticket-perforation" />
              <div className="ticket-specs">
                <div className="spec-row">
                  <span>Устройство</span>
                  <b>RTX 3070</b>
                </div>
                <div className="spec-row">
                  <span>Состояние</span>
                  <b>хорошее</b>
                </div>
                <div className="spec-row">
                  <span>Комплект</span>
                  <b>коробка + кабели</b>
                </div>
                <div className="ticket-price">
                  <div className="price">
                    8 900 ₴
                    <span>пример зачета в корзине</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="trade-process">
            <div className="section-head">
              <h2>
                <span className="num">01</span>Как это работает
              </h2>
            </div>
            <div className="process-grid">
              {processSteps.map(([number, title, text]) => (
                <article className="process-card" key={number}>
                  <div className="process-number">{number}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="trade-eval-section">
            <div>
              <div className="section-head compact">
                <h2>
                  <span className="num">02</span>Оценить устройство
                </h2>
              </div>

              <form className="form-card trade-form">
                <div className="field">
                  <label htmlFor="trade-device">Тип устройства</label>
                  <select id="trade-device" value={deviceType} onChange={(event) => setDeviceType(event.target.value)}>
                    {deviceTypes.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="trade-brand">Бренд</label>
                    <select id="trade-brand" value={brand} onChange={(event) => setBrand(event.target.value)}>
                      {brands.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="trade-model">Модель</label>
                    <input id="trade-model" value={model} onChange={(event) => setModel(event.target.value)} />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="trade-year">Год покупки</label>
                  <input id="trade-year" value={year} onChange={(event) => setYear(event.target.value)} />
                </div>

                <div className="field">
                  <label>Состояние</label>
                  <div className="condition-row">
                    {conditions.map((item) => (
                      <button
                        className={`condition-chip${condition === item.id ? " selected" : ""}`}
                        key={item.id}
                        onClick={() => setCondition(item.id)}
                        type="button"
                      >
                        {item.label}
                        <span>{item.hint}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <label>Комплектация</label>
                  <div className="checkbox-list">
                    {kitItems.map((item) => (
                      <button
                        className={`cb-row${kit.includes(item.id) ? " checked" : ""}`}
                        key={item.id}
                        onClick={() => toggleKit(item.id)}
                        type="button"
                      >
                        <span className="box" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button className="btn btn-primary form-full-btn" type="button">
                  Обновить оценку
                </button>
              </form>
            </div>

            <aside className="estimate-ticket" aria-label="Расчет Trade-In">
              <div className="estimate-head">
                <h2>Ваша оценка</h2>
                <span className="status-pill st-delivered">live</span>
              </div>
              <div className="estimate-rows">
                <div className="spec-row">
                  <span>Устройство</span>
                  <b>{selectedDevice.label}</b>
                </div>
                <div className="spec-row">
                  <span>Модель</span>
                  <b>{brand} {model || "модель"}</b>
                </div>
                <div className="spec-row">
                  <span>Год покупки</span>
                  <b>{year || "не указан"}</b>
                </div>
                <div className="spec-row">
                  <span>Базовая оценка</span>
                  <b>{formatEstimate(selectedDevice.base)}</b>
                </div>
                <div className="spec-row">
                  <span>Состояние</span>
                  <b>{formatEstimate(estimate.conditionPrice)}</b>
                </div>
                <div className="spec-row">
                  <span>Комплектация</span>
                  <b>+{formatEstimate(estimate.kitBonus)}</b>
                </div>
                <div className="spec-row">
                  <span>Бонус Trade-In</span>
                  <b className="green-value">+{formatEstimate(estimate.tradeInBonus)}</b>
                </div>
              </div>
              <div className="estimate-total">
                <span>Итоговый зачет</span>
                <strong>{formatEstimate(estimate.total)}</strong>
                <p>Финальная сумма подтверждается после осмотра устройства менеджером.</p>
                <button className="btn btn-primary" type="button">
                  Подать заявку
                </button>
              </div>
            </aside>
          </section>

          <section className="trade-faq">
            <div className="section-head compact">
              <h2>
                <span className="num">03</span>Частые вопросы
              </h2>
            </div>
            <details className="faq-item" open>
              <summary>Как быстро я узнаю финальную сумму?</summary>
              <p>
                Предварительная оценка видна сразу. Финальную сумму менеджер подтверждает после
                осмотра устройства в шоуруме или при получении отправления.
              </p>
            </details>
            <details className="faq-item">
              <summary>Можно получить деньги, а не скидку?</summary>
              <p>
                По умолчанию сумма применяется как скидка на новый заказ. Выплату на карту можно
                запросить отдельно после проверки устройства.
              </p>
            </details>
            <details className="faq-item">
              <summary>Что будет, если состояние отличается от заявки?</summary>
              <p>
                Менеджер пересчитает сумму по факту осмотра и согласует ее до применения зачета.
              </p>
            </details>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
