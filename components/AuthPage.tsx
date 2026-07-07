import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";

  return (
    <>
      <SiteHeader />
      <main className="auth-shell">
        <section className="auth-card">
          <div className="mono-label">auth // {mode}</div>
          <h1>{isLogin ? "Вход" : "Регистрация"}</h1>
          <p className="muted">
            {isLogin
              ? "Демо-форма для email/пароля. NextAuth можно подключить к Prisma User без смены интерфейса."
              : "Создаем покупателя, бонусный счет и персональный реферальный код."}
          </p>
          <form>
            {!isLogin ? (
              <div className="field">
                <label>Имя</label>
                <input placeholder="Дмитрий Коваль" />
              </div>
            ) : null}
            <div className="field">
              <label>Email или телефон</label>
              <input placeholder="email@example.com" />
            </div>
            <div className="field">
              <label>Пароль</label>
              <input type="password" placeholder="••••••••" />
            </div>
            {!isLogin ? (
              <div className="field">
                <label>Интересы</label>
                <select defaultValue="gaming">
                  <option value="gaming">Гейминг</option>
                  <option value="design">Дизайн / рендер</option>
                  <option value="office">Офис</option>
                </select>
              </div>
            ) : null}
            <Link className="btn btn-primary" href="/account" style={{ width: "100%", marginTop: 10 }}>
              {isLogin ? "Войти" : "Создать аккаунт"}
            </Link>
          </form>
          <p className="muted" style={{ marginTop: 18 }}>
            {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
            <Link className="section-link" href={isLogin ? "/register" : "/login"}>
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </Link>
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
