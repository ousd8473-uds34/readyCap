import { clients } from "../../lib/mockData";

export function NewProjectPage() {
  return (
    <section>
      <header className="page-header">
        <div>
          <p className="eyebrow">Intake inicial</p>
          <h1>Alta de proyecto</h1>
        </div>
      </header>
      <form className="form-grid">
        <label>Cliente<select>{clients.map((c) => <option key={c.id}>{c.name}</option>)}</select></label>
        <label>Nombre del proyecto<input placeholder="Proyecto de expansión..." /></label>
        <label>Sector<select><option>Bienes raíces</option><option>Turismo</option><option>Agroindustria</option><option>Otro</option></select></label>
        <label>Tipo de financiamiento<select><option>Crédito</option><option>Equity</option><option>Mixto</option></select></label>
        <label>Monto solicitado<input type="number" placeholder="0" /></label>
        <label>Moneda<select><option>MXN</option><option>USD</option></select></label>
        <button type="button">Crear proyecto y generar checklist</button>
      </form>
    </section>
  );
}
