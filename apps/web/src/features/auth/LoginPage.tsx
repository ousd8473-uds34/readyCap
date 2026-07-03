import { LockKeyhole } from "lucide-react";

export function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="brand large">
          <LockKeyhole size={24} />
          <span>ReadyCap</span>
        </div>
        <h1>Acceso de estructuración</h1>
        <form>
          <label>
            Correo
            <input type="email" placeholder="analista@firma.com" />
          </label>
          <label>
            Contraseña
            <input type="password" placeholder="••••••••" />
          </label>
          <button type="button">Entrar</button>
        </form>
      </section>
    </main>
  );
}
