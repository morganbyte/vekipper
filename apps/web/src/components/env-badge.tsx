import { Badge } from "@/components/ui/badge";

// Indica en qué entorno estás para no confundir staging con producción.
// En producción no se muestra nada.
export function EnvBadge() {
  const env = process.env.NEXT_PUBLIC_APP_ENV ?? "development";

  if (env === "production") return null;

  return (
    <Badge variant="outline" className="fixed right-4 bottom-4 bg-background">
      {env}
    </Badge>
  );
}
