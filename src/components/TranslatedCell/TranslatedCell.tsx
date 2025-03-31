"use client";

import { useTranslations } from "next-intl";

export function TranslatedCell({
  value,
  fallbackKey,
}: {
  value: string | null;
  fallbackKey: string;
}) {
  const t = useTranslations("Common");

  return <div>{value === "" ? t(fallbackKey) : value}</div>;
}
