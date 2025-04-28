"use client";
import { FaGlobe } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function LanguageSelector() {
  const t = useTranslations("LanguageSelector");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLanguageChange = (newLocale: string) => {
    // Cria uma nova URL mantendo os parâmetros de query existentes
    const params = new URLSearchParams(searchParams.toString());
    router.push(
      // Usa o mesmo pathname mas mantém os query params
      `${pathname}?${params.toString()}`,
      { locale: newLocale }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent shadow-none hover:bg-transparent">
          <FaGlobe size={18} className="text-gray2" />
          <span className="text-gray2">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("select_language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={handleLanguageChange}
        >
          <DropdownMenuRadioItem value="en">
            {t("english")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pt">
            {t("portuguese")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="es">
            {t("spanish")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
