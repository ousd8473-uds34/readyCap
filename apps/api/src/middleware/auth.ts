import type { NextFunction, Request, Response } from "express";
import { requireSupabase } from "../db/supabase.js";

export interface AuthContext {
  userId: string;
  organizationId: string;
  role: "owner" | "admin" | "analyst" | "reviewer" | "viewer";
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}

export async function attachAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Missing bearer token" });
    return;
  }

  try {
    const client = requireSupabase();
    const { data: userData, error: userError } = await client.auth.getUser(token);

    if (userError || !userData.user) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    const { data: profile, error: profileError } = await client
      .from("users_profile")
      .select("organization_id, role")
      .eq("id", userData.user.id)
      .single();

    if (profileError || !profile?.organization_id) {
      res.status(403).json({ error: "User profile or organization is missing" });
      return;
    }

    req.auth = {
      userId: userData.user.id,
      organizationId: profile.organization_id,
      role: profile.role
    };

    next();
  } catch (error) {
    next(error);
  }
}
