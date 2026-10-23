"use client";

import { useActionState, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { submitFeedback } from "./actions";
import {
  FEEDBACK_KINDS,
  type FeedbackFormState,
  type FeedbackKind,
  MESSAGE_MAX_LENGTH,
} from "./schema";

const placeholders: Record<FeedbackKind, string> = {
  bug: "¿Qué pasó y qué esperabas que pasara?",
  feature: "¿Qué problema te gustaría resolver con Vekipper?",
  other: "Cuéntanos lo que quieras.",
};

export function FeedbackForm({ fromPage }: { fromPage: string | null }) {
  const [kind, setKind] = useState<FeedbackKind>("feature");
  const [message, setMessage] = useState("");

  // Los avisos y el reset se hacen al terminar la acción, no en un efecto.
  const [, formAction, pending] = useActionState<FeedbackFormState, FormData>(
    async (prev, formData) => {
      const result = await submitFeedback(prev, formData);
      if (result.status === "success") {
        toast.success("¡Gracias! Recibimos tu feedback.");
        setMessage("");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
      return result;
    },
    { status: "idle" },
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="kind" value={kind} />
      {fromPage && <input type="hidden" name="page" value={fromPage} />}

      <div className="flex flex-col gap-2">
        <Label>Tipo</Label>
        <ToggleGroup
          variant="outline"
          size="sm"
          value={[kind]}
          // Base UI permite deseleccionar; ignoramos ese caso para que siempre haya un tipo.
          onValueChange={(value) => value[0] && setKind(value[0] as FeedbackKind)}
        >
          {Object.entries(FEEDBACK_KINDS).map(([value, label]) => (
            <ToggleGroupItem key={value} value={value}>
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={MESSAGE_MAX_LENGTH}
          placeholder={placeholders[kind]}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none"
        />
        <span className="self-end text-xs text-muted-foreground tabular-nums">
          {message.length}/{MESSAGE_MAX_LENGTH}
        </span>
      </div>

      <Button type="submit" disabled={pending || !message.trim()} className="self-start">
        {pending ? "Enviando…" : "Enviar feedback"}
      </Button>
    </form>
  );
}
