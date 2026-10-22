import { createClient } from "@/lib/supabase/server";

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
};

// Usuario de la sesión actual, verificado con las claves públicas del proyecto (JWKS).
// Devuelve null si no hay sesión.
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) return null;

  const metadata = (claims.user_metadata ?? {}) as Record<string, string | undefined>;
  const email = claims.email ?? "";

  return {
    id: claims.sub,
    email,
    name: metadata.full_name ?? metadata.name ?? email,
    avatarUrl: metadata.avatar_url ?? null,
  };
}
