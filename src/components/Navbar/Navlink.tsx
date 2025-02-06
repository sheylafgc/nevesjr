"use client";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps } from "react";

interface NavlinkProps extends ComponentProps<"button"> {
  title: string;
  href: string;
  isFooter?: boolean;
}

export default function NavLink({ title, isFooter, href }: NavlinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <button
      onClick={() => {
        router.push(href);
      }}
      className={`${
        isFooter ? "text-gray1/75 font-light text-sm" : "text-gray2"
      } ${isActive && "font-bold"}`}
    >
      {title}
    </button>
  );
}
