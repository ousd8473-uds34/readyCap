import { FileUp, Wand2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { StatusBadge } from "../../components/StatusBadge";
import { blocks, deliverables, projects } from "../../lib/mockData";

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId) ?? projects[0];

  return (
    <section>
      <header className="page-header">
        <div>
          <p className="eyebrow">{project.clientName}</p>
          <h1>{project.name}</h1>
        </div>
        <StatusBadge status={project.status} />
      </header>
      <div className="disabled-actions">
        {["Generar plan de negocios", "Generar modelo financiero", "Generar diagnóstico", "Generar premortem", "Ensamblar paquete final"].map((label) => (
          <button disabled key={label}><Wand2 size={16} /> {label}</button>
        ))}
      </div>
      <h2>Checklist de bloques mínimos</h2>
      <div className="block-grid">
        {blocks.map((block) => (
          <article className="block-card" key={block.code}>
            <div className="block-card-head">
              <strong>{block.displayOrder}. {block.name}</strong>
              <StatusBadge status={block.status} />
            </div>
            <p>{block.description}</p>
            <progress value={block.progressPercentage} max={100} />
            <div className="block-meta">
              <span>{block.documentsCount} documentos</span>
              <span>{block.deliverablesCount} entregables</span>
            </div>
            <button><FileUp size={16} /> Cargar documento</button>
          </article>
        ))}
      </div>
      <h2>Entregables</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Tipo</th><th>Bloque</th><th>Versión</th><th>Estado</th></tr></thead>
          <tbody>
            {deliverables.map((deliverable) => (
              <tr key={deliverable.id}>
                <td>{deliverable.type}</td>
                <td>{deliverable.block}</td>
                <td>v{deliverable.version}</td>
                <td><StatusBadge status={deliverable.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
