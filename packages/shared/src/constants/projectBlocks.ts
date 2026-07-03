import type { RequiredBlockDefinition } from "../types/index.js";

export const PROJECT_BLOCK_STATUSES = [
  "pendiente",
  "en_proceso",
  "en_revision",
  "validado",
  "observado",
  "no_aplica"
] as const;

export const REQUIRED_PROJECT_BLOCKS: RequiredBlockDefinition[] = [
  {
    code: "business_plan",
    name: "Plan de negocios",
    description: "Estructura estratégica, comercial, operativa y financiera del proyecto.",
    blockType: "business",
    isRequired: true,
    displayOrder: 1
  },
  {
    code: "feasibility_study",
    name: "Estudio de viabilidad",
    description: "Evaluación técnica, comercial, operativa y financiera de factibilidad.",
    blockType: "analysis",
    isRequired: true,
    displayOrder: 2
  },
  {
    code: "market_marketing",
    name: "Estudio de mercado y marketing",
    description: "Análisis de demanda, competencia, posicionamiento y estrategia comercial.",
    blockType: "market",
    isRequired: true,
    displayOrder: 3
  },
  {
    code: "risk_management",
    name: "Marco de gestión de riesgos",
    description: "Identificación, mitigación y seguimiento de riesgos clave.",
    blockType: "risk",
    isRequired: true,
    displayOrder: 4
  },
  {
    code: "financial_model",
    name: "Modelo financiero y proyecciones",
    description: "Supuestos, escenarios y proyecciones financieras del proyecto.",
    blockType: "financial",
    isRequired: true,
    displayOrder: 5
  },
  {
    code: "corporate_documents",
    name: "Documentación corporativa",
    description: "Actas, poderes, identificaciones y documentos legales corporativos.",
    blockType: "legal",
    isRequired: true,
    displayOrder: 6
  },
  {
    code: "kyc_compliance",
    name: "Documentación KYC y de cumplimiento",
    description: "Elementos de identificación, cumplimiento y debida diligencia.",
    blockType: "compliance",
    isRequired: true,
    displayOrder: 7
  },
  {
    code: "financial_viability_review",
    name: "Revisión de viabilidad financiera",
    description: "Validación de capacidad de pago, estructura de capital y sensibilidad.",
    blockType: "financial",
    isRequired: true,
    displayOrder: 8
  },
  {
    code: "documentary_transparency",
    name: "Transparencia documental",
    description: "Trazabilidad, integridad y estado de revisión de documentos fuente.",
    blockType: "documents",
    isRequired: true,
    displayOrder: 9
  },
  {
    code: "esg_impact_financing",
    name: "Apartado ESG & Impact Financing",
    description: "Información ESG útil para estructuras de impacto o financiamiento sostenible.",
    blockType: "impact",
    isRequired: true,
    displayOrder: 10
  },
  {
    code: "un_sdg_alignment",
    name: "Alineación con ODS de la ONU",
    description: "Mapeo del proyecto contra Objetivos de Desarrollo Sostenible.",
    blockType: "impact",
    isRequired: true,
    displayOrder: 11
  },
  {
    code: "environmental_social_governance_impact",
    name: "Impacto ambiental, social y de gobernanza",
    description: "Evaluación del impacto ambiental, social y de gobernanza.",
    blockType: "impact",
    isRequired: true,
    displayOrder: 12
  }
];
