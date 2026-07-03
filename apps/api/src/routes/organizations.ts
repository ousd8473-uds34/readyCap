import { Router } from "express";
import { requireSupabase } from "../db/supabase.js";

export const organizationsRouter = Router();

organizationsRouter.get("/organizations/current", async (req, res, next) => {
  try {
    const { data, error } = await requireSupabase()
      .from("organizations")
      .select("*")
      .eq("id", req.auth!.organizationId)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});
