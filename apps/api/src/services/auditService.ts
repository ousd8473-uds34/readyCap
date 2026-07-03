import { requireSupabase } from "../db/supabase.js";
import type { AuthContext } from "../middleware/auth.js";

export async function writeAudit(
  auth: AuthContext,
  action: string,
  entityType: string,
  entityId?: string,
  metadata?: Record<string, unknown>
) {
  await requireSupabase().from("audit_logs").insert({
    organization_id: auth.organizationId,
    user_id: auth.userId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    metadata
  });
}
