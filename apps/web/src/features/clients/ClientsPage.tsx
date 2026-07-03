import { Plus } from "lucide-react";
import { clients } from "../../lib/mockData";

export function ClientsPage() {
  return (
    <section>
      <header className="page-header">
        <div>
          <p className="eyebrow">Origen de proyectos</p>
          <h1>Clientes</h1>
        </div>
        <button><Plus size={16} /> Nuevo cliente</button>
      </header>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Nombre</th><th>Tipo</th><th>País</th><th>Separación</th></tr></thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.type}</td>
                <td>{client.country}</td>
                <td>Organización actual</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
