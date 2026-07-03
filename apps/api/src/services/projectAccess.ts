import { requireSupabase } from "../db/supabase.js";
import type { AuthContext } from "../middleware/auth.js";

export async function assertProjectAccess(auth: AuthContext, projectId: string) {
  const query = requireSupabase()
    .from("projects")
    .select("id, organization_id")
    .eq("id", projectId)
    .eq("organization_id", auth.organizationId)
    .single();

  const { data, error } = await query;
  if (error || !data) throw new Error("Project not found or inaccessible");

  if (auth.role === "owner" || auth.role === "admin") return;

  const { data: member } = await requireSupabase()
    .from("project_members")
    .select("id")
    .eq("project_id", projectId)
    .eq("user_id", auth.userId)
    .single();

  if (!member) throw new Error("Project not found or inaccessible");
}
