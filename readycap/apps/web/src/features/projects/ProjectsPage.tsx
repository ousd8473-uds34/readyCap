import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { projects } from "../../lib/mockData";
import { StatusBadge } from "../../components/StatusBadge";

export function ProjectsPage() {
  return (
    <section>
      <header className="page-header">
        <div>
          <p className="eyebrow">Estructuración</p>
          <h1>Proyectos</h1>
        </div>
        <Link className="button" to="/projects/new"><Plus size={16} /> Nuevo proyecto</Link>
      </header>
      <div className="project-list">
        {projects.map((project) => (
          <Link to={`/projects/${project.id}`} className="project-row" key={project.id}>
            <div>
              <strong>{project.name}</strong>
              <span>{project.clientName}</span>
            </div>
            <span>{project.sector}</span>
            <span>{project.currency} {project.amountRequested?.toLocaleString("es-MX")}</span>
            <StatusBadge status={project.status} />
          </Link>
        ))}
      </div>
    </section>
  );
}
