"use client";
import { useRouter } from "@/src/i18n/navigation";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

interface NavlinkProps extends ComponentProps<"button"> {
  title: string;
  href?: string;
  isFooter?: boolean;
  closeMobile?: () => void;
}

export default function NavLink({
  title,
  isFooter,
  href,
  closeMobile,
}: NavlinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const pathWithoutLocale = pathname.replace(new RegExp(`^/(${locale})`), "");
  const isHome = pathWithoutLocale === "" || pathWithoutLocale === "/";
  const isActive = isHome ? href === "/" : pathWithoutLocale === href;
  return (
    <button
      onClick={
        closeMobile
          ? closeMobile
          : () => {
              if (href) {
                router.push(href);
              }
            }
      }
      className={`${
        isFooter ? "text-gray1/75 font-light text-sm" : "text-gray2"
      } ${isActive && "font-bold"}`}
    >
      {title}
    </button>
  );
}
