// Valores compartidos entre el formulario, la acción y el listado.
// Deben coincidir con los CHECK de supabase/migrations/*_create_feedback.sql.

export const FEEDBACK_KINDS = {
  bug: "Problema",
  feature: "Funcionalidad",
  other: "Otro",
} as const;

export type FeedbackKind = keyof typeof FEEDBACK_KINDS;

export const FEEDBACK_STATUSES = {
  new: "Recibido",
  planned: "Planeado",
  in_progress: "En curso",
  done: "Hecho",
  declined: "Descartado",
} as const;

export type FeedbackStatus = keyof typeof FEEDBACK_STATUSES;

export const MESSAGE_MAX_LENGTH = 5000;

export type FeedbackFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export function isFeedbackKind(value: unknown): value is FeedbackKind {
  return typeof value === "string" && value in FEEDBACK_KINDS;
}
