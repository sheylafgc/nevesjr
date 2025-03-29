"use client";
import { useTranslations } from "next-intl";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocationSearching } from "react-icons/md";

export function FromHeader() {
  const t = useTranslations("InternalPage");
  return (
    <div className="flex justify-center items-center gap-2">
      {t("from")}
      <IoLocationSharp size={18} className="text-gray2" />
    </div>
  );
}

export function ToHeader() {
  const t = useTranslations("InternalPage");
  return (
    <div className="flex justify-center items-center gap-2">
      <MdLocationSearching size={18} className="text-gray2" />
      {t("to")}
    </div>
  );
}

export function DateHeader() {
  const t = useTranslations("InternalPage");
  return t("date");
}

export function HourHeader() {
  const t = useTranslations("InternalPage");
  return t("hour");
}

export function PriceHeader() {
  const t = useTranslations("InternalPage");
  return t("price");
}

export function PaymentHeader() {
  const t = useTranslations("InternalPage");
  return t("payment");
}

export function PaymentStatusHeader() {
  const t = useTranslations("InternalPage");
  return t("payment_status");
}

export function InvoiceHeader() {
  const t = useTranslations("InternalPage");
  return t("invoice");
}
