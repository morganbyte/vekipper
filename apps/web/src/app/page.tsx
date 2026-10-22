import { CalendarDays, CheckSquare, Mail } from "lucide-react";

import { FadeIn } from "@/components/dashboard/fade-in";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const sections = [
  {
    title: "Hoy",
    description: "Tus eventos de Google Calendar",
    icon: CalendarDays,
    milestone: "v0.2",
  },
  {
    title: "Tareas",
    description: "Google Tasks y Todoist en un solo lugar",
    icon: CheckSquare,
    milestone: "v0.3",
  },
  {
    title: "Correo",
    description: "Bandeja principal, últimas 24 horas",
    icon: Mail,
    milestone: "v0.4",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 py-16">
      <FadeIn>
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Vekipper</h1>
          <p className="text-muted-foreground">
            Tu día, en un solo vistazo.
          </p>
        </header>
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-3">
        {sections.map(({ title, description, icon: Icon, milestone }, i) => (
          <FadeIn key={title} delay={0.1 + i * 0.08}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-muted-foreground" />
                  <Badge variant="secondary">{milestone}</Badge>
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Próximamente.
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
