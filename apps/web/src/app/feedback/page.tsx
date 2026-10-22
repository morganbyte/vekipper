import Link from "next/link";
import { Suspense } from "react";

import { FadeIn } from "@/components/dashboard/fade-in";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { safeNextPath } from "@/lib/safe-next-path";
import { createClient } from "@/lib/supabase/server";

import { FeedbackForm } from "./feedback-form";
import { FEEDBACK_KINDS, FEEDBACK_STATUSES, type FeedbackKind, type FeedbackStatus } from "./schema";

const dateFormat = new Intl.DateTimeFormat("es", { dateStyle: "medium", timeStyle: "short" });

export default function FeedbackPage(props: PageProps<"/feedback">) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-10 px-6 py-16">
      <FadeIn>
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Feedback</h1>
          <p className="text-sm text-muted-foreground">
            ¿Algo no funciona o echas algo en falta? Vekipper crece con lo que nos cuentas.
          </p>
        </header>
      </FadeIn>

      <Suspense fallback={<Card className="h-72 animate-pulse" />}>
        <FeedbackContent searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}

async function FeedbackContent({ searchParams }: Pick<PageProps<"/feedback">, "searchParams">) {
  const { from } = await searchParams;
  const fromPage = typeof from === "string" ? safeNextPath(from) : null;
  const user = await getCurrentUser();

  if (!user) {
    return (
      <FadeIn delay={0.08}>
        <Card>
          <CardHeader>
            <CardTitle>Inicia sesión para enviar feedback</CardTitle>
            <CardDescription>Así podemos avisarte cuando lo que pediste esté listo.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login?next=/feedback" className={buttonVariants({ variant: "outline" })}>
              Iniciar sesión
            </Link>
          </CardContent>
        </Card>
      </FadeIn>
    );
  }

  return (
    <>
      <FadeIn delay={0.08}>
        <Card>
          <CardContent>
            <FeedbackForm fromPage={fromPage} />
          </CardContent>
        </Card>
      </FadeIn>
      <MyFeedback />
    </>
  );
}

async function MyFeedback() {
  const supabase = await createClient();
  // RLS ya limita la consulta al feedback del usuario actual.
  const { data: items } = await supabase
    .from("feedback")
    .select("id, kind, message, status, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (!items?.length) return null;

  return (
    <FadeIn delay={0.16}>
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-muted-foreground">Lo que nos has enviado</h2>
        <ul className="flex flex-col divide-y divide-border/60">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col gap-2 py-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline">{FEEDBACK_KINDS[item.kind as FeedbackKind]}</Badge>
                <Badge variant="secondary">{FEEDBACK_STATUSES[item.status as FeedbackStatus]}</Badge>
                <span className="ml-auto">{dateFormat.format(new Date(item.created_at))}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{item.message}</p>
            </li>
          ))}
        </ul>
      </section>
    </FadeIn>
  );
}
