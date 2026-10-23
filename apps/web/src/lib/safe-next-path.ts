// Ruta a la que volver tras iniciar sesión. Solo se aceptan rutas internas ("/algo"),
// nunca "//otro-dominio.com" ni URLs absolutas, para evitar redirecciones abiertas.
export function safeNextPath(value: unknown): string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/";
}
