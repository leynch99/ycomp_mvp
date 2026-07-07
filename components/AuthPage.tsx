import Link from "next/link";

const cabinetPerks = [
  {
    icon: "◈",
    title: "Сохраненные сборки",
    text: "Возвращайтесь к конфигурациям ПК и проверяйте совместимость перед заказом."
  },
  {
    icon: "%",
    title: "Бонусы за покупки",
    text: "Получайте кешбек на комплектующие и списывайте его при следующей сборке."
  },
  {
    icon: "▤",
    title: "Статусы доставки",
    text: "Заказы, ТТН и гарантийные обращения собраны в одном кабинете."
  }
];

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";

  return (
    <>
      <header className="auth-bare">
        <Link className="logo" href="/">
          YComp<span>.</span>
          <small>компоненты</small>
        </Link>
        <Link className="auth-back-link" href="/catalog">
          ← Вернуться в магазин
        </Link>
      </header>

      <main className="auth-layout">
        <section className="auth-form-panel">
          <div className="auth-form-card">
            <div className="eyebrow">Личный кабинет</div>
            <h1>{isLogin ? "С возвращением" : "Создать аккаунт"}</h1>
            <p className="sub">
              {isLogin
                ? "Войдите, чтобы отслеживать заказы, сборки и бонусы."
                : "Зарегистрируйтесь, чтобы сохранять конфигурации и историю покупок."}
            </p>

            <nav className="mode-toggle" aria-label="Режим авторизации">
              <Link className={isLogin ? "active" : undefined} href="/login">
                Вход
              </Link>
              <Link className={!isLogin ? "active" : undefined} href="/register">
                Регистрация
              </Link>
            </nav>

            <form>
              {!isLogin ? (
                <div className="field">
                  <label>Имя</label>
                  <input placeholder="Дмитрий Коваль" />
                </div>
              ) : null}

              <div className="field">
                <label>Телефон или email</label>
                <input placeholder="+380 __ ___ __ __ / email@example.com" />
              </div>

              <div className="field">
                <label>Пароль</label>
                <div className="input-wrap">
                  <input type="password" placeholder={isLogin ? "Введите пароль" : "Минимум 8 символов"} />
                  <span className="password-peek">Показать</span>
                </div>
              </div>

              {!isLogin ? (
                <div className="field">
                  <label>Интерес</label>
                  <select defaultValue="gaming">
                    <option value="gaming">Гейминг</option>
                    <option value="design">Дизайн / рендер</option>
                    <option value="office">Офисная сборка</option>
                  </select>
                </div>
              ) : null}

              <div className="row-between">
                <label className="auth-checkbox">
                  <span className="auth-check-box" />
                  {isLogin ? "Запомнить меня" : "Принять условия сервиса"}
                </label>
                {isLogin ? <Link href="/faq">Забыли пароль?</Link> : null}
              </div>

              <Link className="btn btn-primary auth-submit" href="/account">
                {isLogin ? "Войти" : "Создать аккаунт"}
              </Link>
            </form>

            <div className="divider">или</div>

            <div className="social-row">
              <button className="social-btn" type="button">
                Google
              </button>
              <button className="social-btn" type="button">
                Apple
              </button>
            </div>

            <p className="switch-note">
              {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
              <Link href={isLogin ? "/register" : "/login"}>{isLogin ? "Зарегистрироваться" : "Войти"}</Link>
            </p>
          </div>
        </section>

        <aside className="auth-brand-panel" aria-label="Преимущества личного кабинета">
          <div className="auth-brand-inner">
            <h2>
              Кабинет, который помнит каждую <em>сборку</em>
            </h2>
            <p>
              Сохраняйте конфигурации ПК, отслеживайте заказы в реальном времени и получайте бонусы с каждой покупки.
            </p>

            <div className="perk-list">
              {cabinetPerks.map((perk) => (
                <div className="perk" key={perk.title}>
                  <span className="ic">{perk.icon}</span>
                  <span>
                    <b>{perk.title}</b>
                    <span>{perk.text}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="profile-ticket">
              <div className="profile-ticket-row">
                <span>Уровень аккаунта</span>
                <b>Gold</b>
              </div>
              <div className="profile-ticket-row">
                <span>Бонусный баланс</span>
                <b>2 340 ₴</b>
              </div>
              <div className="profile-ticket-row">
                <span>Активных заказов</span>
                <b>2</b>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
