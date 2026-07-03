import { AlertCircle, CheckCircle2, Clock, FileText } from "lucide-react";
import { projects } from "../../lib/mockData";
import { StatusBadge } from "../../components/StatusBadge";

export function DashboardPage() {
  return (
    <section>
      <header className="page-header">
        <div>
          <p className="eyebrow">Organización actual</p>
          <h1>Pipeline de estructuración</h1>
        </div>
      </header>
      <div className="metric-grid">
        <article><FileText /><strong>2</strong><span>Proyectos activos</span></article>
        <article><Clock /><strong>12</strong><span>Bloques pendientes</span></article>
        <article><CheckCircle2 /><strong>4</strong><span>Bloques validados</span></article>
        <article><AlertCircle /><strong>3</strong><span>Observaciones abiertas</span></article>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Proyecto</th><th>Cliente</th><th>Tipo</th><th>Avance</th><th>Estado</th></tr></thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.clientName}</td>
                <td>{project.fundingType}</td>
                <td><progress value={project.progressPercentage} max={100} /> {project.progressPercentage}%</td>
                <td><StatusBadge status={project.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
