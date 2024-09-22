"use client";

import { NextUIProvider } from "@nextui-org/react";

export function NextUIWrapper({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
