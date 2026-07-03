import { auditItems } from "../../lib/mockData";

export function AuditPage() {
  return (
    <section>
      <header className="page-header">
        <div>
          <p className="eyebrow">Trazabilidad</p>
          <h1>Historial de auditoría</h1>
        </div>
      </header>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Fecha</th><th>Acción</th><th>Entidad</th><th>Usuario</th></tr></thead>
          <tbody>
            {auditItems.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.action}</td>
                <td>{item.entity}</td>
                <td>{item.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
