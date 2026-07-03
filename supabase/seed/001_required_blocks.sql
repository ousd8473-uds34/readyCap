insert into public.project_required_blocks (code, name, description, block_type, is_required, display_order)
values
  ('business_plan', 'Plan de negocios', 'Estructura estratégica, comercial, operativa y financiera del proyecto.', 'business', true, 1),
  ('feasibility_study', 'Estudio de viabilidad', 'Evaluación técnica, comercial, operativa y financiera de factibilidad.', 'analysis', true, 2),
  ('market_marketing', 'Estudio de mercado y marketing', 'Análisis de demanda, competencia, posicionamiento y estrategia comercial.', 'market', true, 3),
  ('risk_management', 'Marco de gestión de riesgos', 'Identificación, mitigación y seguimiento de riesgos clave.', 'risk', true, 4),
  ('financial_model', 'Modelo financiero y proyecciones', 'Supuestos, escenarios y proyecciones financieras del proyecto.', 'financial', true, 5),
  ('corporate_documents', 'Documentación corporativa', 'Actas, poderes, identificaciones y documentos legales corporativos.', 'legal', true, 6),
  ('kyc_compliance', 'Documentación KYC y de cumplimiento', 'Elementos de identificación, cumplimiento y debida diligencia.', 'compliance', true, 7),
  ('financial_viability_review', 'Revisión de viabilidad financiera', 'Validación de capacidad de pago, estructura de capital y sensibilidad.', 'financial', true, 8),
  ('documentary_transparency', 'Transparencia documental', 'Trazabilidad, integridad y estado de revisión de documentos fuente.', 'documents', true, 9),
  ('esg_impact_financing', 'Apartado ESG & Impact Financing', 'Información ESG útil para estructuras de impacto o financiamiento sostenible.', 'impact', true, 10),
  ('un_sdg_alignment', 'Alineación con ODS de la ONU', 'Mapeo del proyecto contra Objetivos de Desarrollo Sostenible.', 'impact', true, 11),
  ('environmental_social_governance_impact', 'Impacto ambiental, social y de gobernanza', 'Evaluación del impacto ambiental, social y de gobernanza.', 'impact', true, 12)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  block_type = excluded.block_type,
  is_required = excluded.is_required,
  display_order = excluded.display_order;
