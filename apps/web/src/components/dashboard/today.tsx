"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("es", { weekday: "long", day: "numeric", month: "long" });
const noop = () => () => {};

// La fecha se calcula en el navegador para usar la zona horaria del usuario,
// no la del servidor (en Vercel, UTC).
export function Today() {
  const today = useSyncExternalStore(
    noop,
    () => format.format(new Date()),
    () => "",
  );

  return <>{today || " "}</>;
}
