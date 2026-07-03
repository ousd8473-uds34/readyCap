import { z } from "zod";
import { PROJECT_BLOCK_STATUSES } from "../constants/projectBlocks.js";

export const clientCreateSchema = z.object({
  name: z.string().min(2),
  type: z.string().optional(),
  taxId: z.string().optional(),
  country: z.string().default("Mexico")
});

export const projectCreateSchema = z.object({
  clientId: z.string().uuid(),
  name: z.string().min(3),
  sector: z.enum(["bienes_raices", "turismo", "agroindustria", "otro"]),
  fundingType: z.enum(["credito", "equity", "mixto"]),
  amountRequested: z.number().positive().optional(),
  currency: z.string().default("MXN")
});

export const projectUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  sector: z.enum(["bienes_raices", "turismo", "agroindustria", "otro"]).optional(),
  fundingType: z.enum(["credito", "equity", "mixto"]).optional(),
  amountRequested: z.number().positive().nullable().optional(),
  currency: z.string().optional(),
  status: z.enum(["draft", "intake", "in_progress", "in_review", "approved", "archived"]).optional()
});

export const projectBlockUpdateSchema = z.object({
  status: z.enum(PROJECT_BLOCK_STATUSES),
  progressPercentage: z.number().int().min(0).max(100),
  notes: z.string().optional()
});

export const documentCreateSchema = z.object({
  blockId: z.string().uuid().optional(),
  documentType: z.string().optional(),
  fileName: z.string().min(1),
  storagePath: z.string().min(1),
  mimeType: z.string().optional(),
  fileSize: z.number().int().nonnegative().optional()
});

export const deliverableCreateSchema = z.object({
  blockId: z.string().uuid().optional(),
  type: z.enum([
    "plan_negocios",
    "viabilidad",
    "mercado_marketing",
    "riesgos",
    "modelo_financiero",
    "corporativo",
    "kyc_cumplimiento",
    "viabilidad_financiera",
    "transparencia_documental",
    "esg_impact",
    "ods_onu",
    "impacto_ambiental_social_gobernanza",
    "paquete_final"
  ]),
  filePath: z.string().optional()
});
