import type { ProjectBlockStatus } from "@readycap/shared";

const labels: Record<ProjectBlockStatus | string, string> = {
  pendiente: "Pendiente",
  en_proceso: "En proceso",
  en_revision: "En revisión",
  validado: "Validado",
  observado: "Observado",
  no_aplica: "No aplica",
  borrador: "Borrador",
  revisado: "Revisado",
  aprobado: "Aprobado",
  enviado: "Enviado"
};

export function StatusBadge({ status }: { status: ProjectBlockStatus | string }) {
  return <span className={`status status-${status}`}>{labels[status] ?? status}</span>;
}
