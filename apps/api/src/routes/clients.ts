import { clientCreateSchema } from "@readycap/shared";
import { Router } from "express";
import { requireSupabase } from "../db/supabase.js";
import { writeAudit } from "../services/auditService.js";
import { validateBody } from "../middleware/validate.js";

export const clientsRouter = Router();

clientsRouter.get("/clients", async (req, res, next) => {
  try {
    const { data, error } = await requireSupabase()
      .from("clients")
      .select("*")
      .eq("organization_id", req.auth!.organizationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

clientsRouter.post("/clients", validateBody(clientCreateSchema), async (req, res, next) => {
  try {
    const { data, error } = await requireSupabase()
      .from("clients")
      .insert({
        organization_id: req.auth!.organizationId,
        name: req.body.name,
        type: req.body.type,
        tax_id: req.body.taxId,
        country: req.body.country
      })
      .select("*")
      .single();

    if (error) throw error;
    await writeAudit(req.auth!, "client.created", "client", data.id);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

clientsRouter.get("/clients/:id", async (req, res, next) => {
  try {
    const { data, error } = await requireSupabase()
      .from("clients")
      .select("*")
      .eq("id", req.params.id)
      .eq("organization_id", req.auth!.organizationId)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});
