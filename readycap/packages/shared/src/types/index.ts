import type { PROJECT_BLOCK_STATUSES } from "../constants/projectBlocks.js";

export type OrganizationType = "asesor" | "despacho" | "dueno_directo";
export type UserRole = "owner" | "admin" | "analyst" | "reviewer" | "viewer";
export type ProjectSector = "bienes_raices" | "turismo" | "agroindustria" | "otro";
export type FundingType = "credito" | "equity" | "mixto";
export type ProjectStatus = "draft" | "intake" | "in_progress" | "in_review" | "approved" | "archived";
export type ProjectBlockStatus = (typeof PROJECT_BLOCK_STATUSES)[number];
export type DeliverableStatus = "borrador" | "revisado" | "aprobado" | "enviado";

export type DeliverableType =
  | "plan_negocios"
  | "viabilidad"
  | "mercado_marketing"
  | "riesgos"
  | "modelo_financiero"
  | "corporativo"
  | "kyc_cumplimiento"
  | "viabilidad_financiera"
  | "transparencia_documental"
  | "esg_impact"
  | "ods_onu"
  | "impacto_ambiental_social_gobernanza"
  | "paquete_final";

export interface RequiredBlockDefinition {
  code: string;
  name: string;
  description: string;
  blockType: string;
  isRequired: boolean;
  displayOrder: number;
}

export interface ProjectSummary {
  id: string;
  name: string;
  clientName: string;
  sector: ProjectSector;
  fundingType: FundingType;
  amountRequested: number | null;
  currency: string;
  status: ProjectStatus;
  progressPercentage: number;
}
