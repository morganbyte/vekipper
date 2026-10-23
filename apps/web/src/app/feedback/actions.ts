"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth";
import { safeNextPath } from "@/lib/safe-next-path";
import { createClient } from "@/lib/supabase/server";

import { type FeedbackFormState, isFeedbackKind, MESSAGE_MAX_LENGTH } from "./schema";

export async function submitFeedback(
  _prev: FeedbackFormState,
  formData: FormData,
): Promise<FeedbackFormState> {
  // Las server actions se pueden llamar directamente por POST: se verifica siempre la sesión.
  const user = await getCurrentUser();
  if (!user) return { status: "error", message: "Tu sesión expiró. Vuelve a iniciar sesión." };

  const kind = formData.get("kind");
  const message = String(formData.get("message") ?? "").trim();
  const page = formData.get("page");

  if (!isFeedbackKind(kind)) return { status: "error", message: "Elige un tipo de feedback." };
  if (!message) return { status: "error", message: "Escribe tu mensaje." };
  if (message.length > MESSAGE_MAX_LENGTH) {
    return { status: "error", message: `Máximo ${MESSAGE_MAX_LENGTH} caracteres.` };
  }

  const supabase = await createClient();
  // user_id lo pone la base de datos (default auth.uid()) y RLS comprueba que sea el tuyo.
  const { error } = await supabase.from("feedback").insert({
    kind,
    message,
    page: page ? safeNextPath(page) : null,
  });

  if (error) return { status: "error", message: "No se pudo enviar. Inténtalo de nuevo." };

  revalidatePath("/feedback");
  return { status: "success" };
}
