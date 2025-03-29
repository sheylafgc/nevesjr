"use client";

import { useTranslations } from "next-intl";
import { FiCheckCircle } from "react-icons/fi";
import { IoCarOutline } from "react-icons/io5";
import { MdOutlineLogin, MdOutlinePayment } from "react-icons/md";

export default function useStepTranslations() {
  const t = useTranslations("Book_a_trip");

  return [
    {
      id: "Step 1",
      name: t("service"),
      icon: (active: boolean) => (
        <IoCarOutline
          className={active ? "text-white" : "text-gray2"}
          size={20}
        />
      ),
    },
    {
      id: "Step 2",
      name: t("log_in"),
      icon: (active: boolean) => (
        <MdOutlineLogin
          className={active ? "text-white" : "text-gray2"}
          size={20}
        />
      ),
    },
    {
      id: "Step 3",
      name: t("details"),
      icon: (active: boolean) => (
        <FiCheckCircle
          className={active ? "text-white" : "text-gray2"}
          size={20}
        />
      ),
    },
    {
      id: "Step 4",
      name: t("checkout"),
      icon: (active: boolean) => (
        <MdOutlinePayment
          className={active ? "text-white" : "text-gray2"}
          size={20}
        />
      ),
    },
  ];
}
