import Link from "next/link";
import { formatPrice, products } from "@/lib/data";

const cartProducts = [products[0], products[1], products[2]];

function getOrderTotals(mode: "cart" | "checkout") {
  const subtotal = cartProducts.reduce((sum, item, index) => sum + item.price * (index === 1 ? 2 : 1), 0);
  const discount = 3810;
  const bonus = mode === "checkout" ? 1200 : 0;
  const total = subtotal - discount - bonus;

  return { subtotal, discount, bonus, total };
}

function Stepper({ mode }: { mode: "cart" | "checkout" }) {
  return (
    <div className="stepper">
      <div className={`step${mode === "cart" ? " active" : " done"}`}>
        <div className="num">{mode === "cart" ? "1" : "✓"}</div>
        Корзина
      </div>
      <div className="step-line" />
      <div className={`step${mode === "checkout" ? " active" : ""}`}>
        <div className="num">2</div>
        Доставка и оплата
      </div>
      <div className="step-line" />
      <div className="step">
        <div className="num">3</div>
        Подтверждение
      </div>
    </div>
  );
}

function SummaryBox({ mode }: { mode: "cart" | "checkout" }) {
  const { subtotal, discount, bonus, total } = getOrderTotals(mode);

  return (
    <aside className="summary-box">
      <h3>Итого по заказу</h3>
      <div className="summary-row">
        <span>Товары</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="summary-row discount">
        <span>Скидка</span>
        <span>-{formatPrice(discount)}</span>
      </div>
      <div className="summary-row">
        <span>Бонусы</span>
        <span>-{formatPrice(bonus)}</span>
      </div>
      <div className="summary-row">
        <span>Доставка</span>
        <span>0 ₴</span>
      </div>
      <div className="summary-row total">
        <span>К оплате</span>
        <span className="val">{formatPrice(total)}</span>
      </div>
      <Link className="btn btn-primary" href={mode === "cart" ? "/checkout" : "/account/orders"}>
        {mode === "cart" ? "Перейти к оформлению" : "Подтвердить заказ"}
      </Link>
      <div className="summary-note">SSL // расчет скидок выполняется сервером</div>
      <div className="mini-items">
        {cartProducts.map((product, index) => (
          <div className="mini-item" key={product.slug}>
            <img src={product.image} alt={product.name} />
            <span>{product.name}</span>
            <span className="qty">x{index === 1 ? 2 : 1}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function MobileSummaryBar({ mode }: { mode: "cart" | "checkout" }) {
  const { subtotal, discount, bonus, total } = getOrderTotals(mode);

  return (
    <div className="mobile-summary-bar">
      <div className="mobile-summary-lines">
        <div>
          <span>Товары</span>
          <b>{formatPrice(subtotal)}</b>
        </div>
        <div>
          <span>Скидка</span>
          <b className="sale-val">-{formatPrice(discount + bonus)}</b>
        </div>
      </div>
      <div className="mobile-summary-total">
        <span>К оплате</span>
        <b>{formatPrice(total)}</b>
      </div>
      <Link className="btn btn-primary" href={mode === "cart" ? "/checkout" : "/account/orders"}>
        {mode === "cart" ? "Оформить заказ" : "Подтвердить заказ"}
      </Link>
    </div>
  );
}

function CartItems() {
  return (
    <div className="card">
      {cartProducts.map((product, index) => (
        <div className="cart-item" key={product.slug}>
          <img src={product.image} alt={product.name} />
          <div>
            <div className="ci-name">{product.name}</div>
            <div className="p-tags">
              {product.tags.slice(0, 2).map((tag) => (
                <span className="chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="ci-stock">● В наличии</div>
          </div>
          <div className="qty-stepper">
            <div>-</div>
            <span>{index === 1 ? 2 : 1}</span>
            <div>+</div>
          </div>
          <div className="ci-price">
            {formatPrice(product.price * (index === 1 ? 2 : 1))}
            {product.oldPrice ? <span className="old">{formatPrice(product.oldPrice)}</span> : null}
          </div>
          <div className="ci-remove">×</div>
        </div>
      ))}
      <div className="cart-upsell-row">
        <div className="lbl">// ЧАСТО ДОБАВЛЯЮТ</div>
        <div className="upsell-chip">
          Термопаста Kryonaut 1g · 490 ₴ <button className="btn btn-quiet">+ Добавить</button>
        </div>
        <div className="upsell-chip">
          Кабель-менеджмент комплект · 350 ₴ <button className="btn btn-quiet">+ Добавить</button>
        </div>
      </div>
      <div className="promo-row">
        <input placeholder="Промокод" />
        <button className="btn btn-quiet">Применить</button>
      </div>
      <div className="bonus-toggle">
        <div className="bl">
          Списать бонусы: <b>2 340 ₴</b> доступно
        </div>
        <div className="switch" />
      </div>
    </div>
  );
}

function CheckoutForms() {
  return (
    <>
      <div className="section-title">
        <span className="n">02 /</span>Способ получения
      </div>
      <div className="card" style={{ padding: 20 }}>
        {[
          ["Новая Почта - отделение", "Отделение №24, ул. Дегтяревская 25, Киев", "0 ₴"],
          ["Новая Почта - курьер до двери", "Доставка завтра, до 18:00", "89 ₴"],
          ["Самовывоз из шоурума", "ул. Антоновича 176, сегодня с 15:00", "0 ₴"]
        ].map(([title, note, price], index) => (
          <div className={`option-row${index === 0 ? " selected" : ""}`} key={title}>
            <div className="radio" />
            <div className="info">
              <b>{title}</b>
              <span>{note}</span>
            </div>
            <div className="option-price">{price}</div>
          </div>
        ))}
      </div>

      <div className="section-title">
        <span className="n">03 /</span>Получатель
      </div>
      <div className="card" style={{ padding: 20 }}>
        <div className="form-grid">
          <div className="field">
            <label>Имя</label>
            <input defaultValue="Дмитрий" />
          </div>
          <div className="field">
            <label>Фамилия</label>
            <input defaultValue="Коваль" />
          </div>
          <div className="field">
            <label>Телефон</label>
            <input defaultValue="+380 67 123 45 67" />
          </div>
          <div className="field">
            <label>Email</label>
            <input defaultValue="dmytro@example.com" />
          </div>
        </div>
      </div>

      <div className="section-title">
        <span className="n">04 /</span>Оплата
      </div>
      <div className="card" style={{ padding: 20 }}>
        {[
          ["LiqPay / карта онлайн", "Платежный адаптер готов к подключению реальных ключей"],
          ["Fondy / оплата частями", "Сценарий подтверждения вынесен в payment service"],
          ["Оплата при получении", "Доступно для заказов до 80 000 ₴"]
        ].map(([title, note], index) => (
          <div className={`option-row${index === 0 ? " selected" : ""}`} key={title}>
            <div className="radio" />
            <div className="info">
              <b>{title}</b>
              <span>{note}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function CheckoutShell({ mode }: { mode: "cart" | "checkout" }) {
  return (
    <>
      <header className="checkout-header">
        <div className="wrap wrap-narrow">
          <Link className="logo" href="/">
            YComp<span>.</span>
          </Link>
          <div className="secure-note">
            <span className="lock">●</span>
            Безопасное оформление заказа · SSL-шифрование
          </div>
        </div>
      </header>

      <Stepper mode={mode} />

      <main className="wrap wrap-narrow">
        <div className="checkout-layout">
          <div>
            <div className="section-title">
              <span className="n">01 /</span>Товары в корзине (3)
            </div>
            <CartItems />
            {mode === "checkout" ? <CheckoutForms /> : null}
          </div>
          <SummaryBox mode={mode} />
        </div>
      </main>
      <MobileSummaryBar mode={mode} />
    </>
  );
}
