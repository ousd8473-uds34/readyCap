import {
  deliverableCreateSchema,
  documentCreateSchema,
  projectBlockUpdateSchema,
  projectCreateSchema,
  projectUpdateSchema
} from "@readycap/shared";
import { Router } from "express";
import { requireSupabase } from "../db/supabase.js";
import { validateBody } from "../middleware/validate.js";
import { writeAudit } from "../services/auditService.js";
import { assertProjectAccess } from "../services/projectAccess.js";

export const projectsRouter = Router();

projectsRouter.get("/projects", async (req, res, next) => {
  try {
    const { data, error } = await requireSupabase()
      .from("projects")
      .select("*, clients(name)")
      .eq("organization_id", req.auth!.organizationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

projectsRouter.post("/projects", validateBody(projectCreateSchema), async (req, res, next) => {
  try {
    const { data, error } = await requireSupabase()
      .from("projects")
      .insert({
        organization_id: req.auth!.organizationId,
        client_id: req.body.clientId,
        name: req.body.name,
        sector: req.body.sector,
        funding_type: req.body.fundingType,
        amount_requested: req.body.amountRequested,
        currency: req.body.currency,
        created_by: req.auth!.userId
      })
      .select("*")
      .single();

    if (error) throw error;
    await writeAudit(req.auth!, "project.created", "project", data.id);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

projectsRouter.get("/projects/:id", async (req, res, next) => {
  try {
    await assertProjectAccess(req.auth!, req.params.id!);
    const { data, error } = await requireSupabase()
      .from("projects")
      .select("*, clients(*)")
      .eq("id", req.params.id!)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

projectsRouter.patch("/projects/:id", validateBody(projectUpdateSchema), async (req, res, next) => {
  try {
    await assertProjectAccess(req.auth!, req.params.id!);
    const { data, error } = await requireSupabase()
      .from("projects")
      .update({
        name: req.body.name,
        sector: req.body.sector,
        funding_type: req.body.fundingType,
        amount_requested: req.body.amountRequested,
        currency: req.body.currency,
        status: req.body.status
      })
      .eq("id", req.params.id!)
      .select("*")
      .single();

    if (error) throw error;
    await writeAudit(req.auth!, "project.updated", "project", data.id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

projectsRouter.get("/projects/:id/blocks", async (req, res, next) => {
  try {
    await assertProjectAccess(req.auth!, req.params.id!);
    const { data, error } = await requireSupabase()
      .from("project_block_status")
      .select("*, project_required_blocks(*)")
      .eq("project_id", req.params.id!);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

projectsRouter.patch(
  "/projects/:id/blocks/:blockId",
  validateBody(projectBlockUpdateSchema),
  async (req, res, next) => {
    try {
      await assertProjectAccess(req.auth!, req.params.id!);
      const { data, error } = await requireSupabase()
        .from("project_block_status")
        .update({
          status: req.body.status,
          progress_percentage: req.body.progressPercentage,
          notes: req.body.notes,
          updated_by: req.auth!.userId
        })
        .eq("project_id", req.params.id!)
        .eq("block_id", req.params.blockId!)
        .select("*")
        .single();

      if (error) throw error;
      await writeAudit(req.auth!, "project_block.updated", "project_block", data.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

projectsRouter.get("/projects/:id/documents", async (req, res, next) => {
  try {
    await assertProjectAccess(req.auth!, req.params.id!);
    const { data, error } = await requireSupabase()
      .from("source_documents")
      .select("*")
      .eq("project_id", req.params.id!)
      .eq("organization_id", req.auth!.organizationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

projectsRouter.post("/projects/:id/documents", validateBody(documentCreateSchema), async (req, res, next) => {
  try {
    await assertProjectAccess(req.auth!, req.params.id!);
    const { data: project } = await requireSupabase()
      .from("projects")
      .select("client_id")
      .eq("id", req.params.id!)
      .single();

    const { data, error } = await requireSupabase()
      .from("source_documents")
      .insert({
        organization_id: req.auth!.organizationId,
        client_id: project?.client_id,
        project_id: req.params.id!,
        block_id: req.body.blockId,
        document_type: req.body.documentType,
        file_name: req.body.fileName,
        storage_path: req.body.storagePath,
        mime_type: req.body.mimeType,
        file_size: req.body.fileSize,
        uploaded_by: req.auth!.userId
      })
      .select("*")
      .single();

    if (error) throw error;
    await writeAudit(req.auth!, "document.created", "source_document", data.id);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

projectsRouter.get("/projects/:id/deliverables", async (req, res, next) => {
  try {
    await assertProjectAccess(req.auth!, req.params.id!);
    const { data, error } = await requireSupabase()
      .from("deliverables")
      .select("*")
      .eq("project_id", req.params.id!)
      .eq("organization_id", req.auth!.organizationId);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

projectsRouter.post("/projects/:id/deliverables", validateBody(deliverableCreateSchema), async (req, res, next) => {
  try {
    await assertProjectAccess(req.auth!, req.params.id!);
    const { data, error } = await requireSupabase()
      .from("deliverables")
      .insert({
        organization_id: req.auth!.organizationId,
        project_id: req.params.id!,
        block_id: req.body.blockId,
        type: req.body.type,
        file_path: req.body.filePath,
        created_by: req.auth!.userId
      })
      .select("*")
      .single();

    if (error) throw error;
    await writeAudit(req.auth!, "deliverable.created", "deliverable", data.id);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

projectsRouter.get("/projects/:id/audit", async (req, res, next) => {
  try {
    await assertProjectAccess(req.auth!, req.params.id!);
    const { data, error } = await requireSupabase()
      .from("audit_logs")
      .select("*")
      .eq("organization_id", req.auth!.organizationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

projectsRouter.post("/projects/:id/generation-runs", async (req, res, next) => {
  try {
    await assertProjectAccess(req.auth!, req.params.id!);
    const { data, error } = await requireSupabase()
      .from("generation_runs")
      .insert({
        organization_id: req.auth!.organizationId,
        project_id: req.params.id!,
        engine: "simulated",
        status: "pending",
        created_by: req.auth!.userId
      })
      .select("*")
      .single();

    if (error) throw error;
    await writeAudit(req.auth!, "generation_run.created", "generation_run", data.id);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

projectsRouter.get("/projects/:id/generation-runs", async (req, res, next) => {
  try {
    await assertProjectAccess(req.auth!, req.params.id!);
    const { data, error } = await requireSupabase()
      .from("generation_runs")
      .select("*")
      .eq("project_id", req.params.id!)
      .eq("organization_id", req.auth!.organizationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

