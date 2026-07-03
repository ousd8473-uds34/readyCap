import { REQUIRED_PROJECT_BLOCKS } from "@readycap/shared";
import type { ProjectBlockStatus } from "@readycap/shared";

export const clients = [
  { id: "client-1", name: "Desarrollo Costa Norte", type: "SPV inmobiliario", country: "Mexico" },
  { id: "client-2", name: "Agroindustrial Valle Claro", type: "Empresa operativa", country: "Mexico" }
];

export const projects = [
  {
    id: "project-1",
    name: "Hotel boutique Riviera",
    clientName: "Desarrollo Costa Norte",
    sector: "turismo",
    fundingType: "mixto",
    amountRequested: 180000000,
    currency: "MXN",
    status: "in_progress",
    progressPercentage: 42
  },
  {
    id: "project-2",
    name: "Planta de empaque tecnificada",
    clientName: "Agroindustrial Valle Claro",
    sector: "agroindustria",
    fundingType: "credito",
    amountRequested: 64000000,
    currency: "MXN",
    status: "intake",
    progressPercentage: 18
  }
] as const;

export const blocks = REQUIRED_PROJECT_BLOCKS.map((block, index) => ({
  ...block,
  id: `block-${index + 1}`,
  status: (index < 2 ? "validado" : index < 5 ? "en_proceso" : "pendiente") as ProjectBlockStatus,
  progressPercentage: index < 2 ? 100 : index < 5 ? 55 : 0,
  documentsCount: index < 3 ? index + 1 : 0,
  deliverablesCount: index < 2 ? 1 : 0,
  notes: index < 2 ? "Revisado por analista. Pendiente confirmación final del revisor." : ""
}));

export const deliverables = [
  { id: "d1", type: "Plan de negocios", version: 1, status: "borrador", block: "Plan de negocios" },
  { id: "d2", type: "Modelo financiero", version: 1, status: "borrador", block: "Modelo financiero" },
  { id: "d3", type: "Paquete final", version: 1, status: "borrador", block: "Proyecto" }
];

export const auditItems = [
  { id: "a1", action: "project.created", user: "Ana Torres", entity: "Hotel boutique Riviera", date: "2026-07-03 10:34" },
  { id: "a2", action: "project_block.updated", user: "Luis Gómez", entity: "Plan de negocios", date: "2026-07-03 11:12" },
  { id: "a3", action: "document.created", user: "Ana Torres", entity: "Estados financieros 2025.pdf", date: "2026-07-03 12:07" }
];
