"use client";
import Link from "next/link";
import { Suspense, useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { api } from "@/src/api/api";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/i18n/navigation";

function ValidateCodeItem() {
  const t = useTranslations("LoginAndSignUp");
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const email = searchParams.get("email");

  useEffect(() => {
    const validateCode = async () => {
      if (!code || !email) {
        return;
      }

      try {
        const { data } = await api.get(
          `validate/forgot-password/?code=${code}&email=${email}`
        );
        console.log(data);

        if (data.detail === "Valid code.") {
          const expirationTime = new Date(
            new Date().getTime() + 10 * 60 * 1000
          );
          Cookies.set("code-validation", "valid", { expires: expirationTime });
          router.push(`/auth/NewPassword?email=${email}`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    validateCode();
  }, [code, email, router]);
  return (
    <div className="w-full flex flex-col justify-center items-center py-40">
      <div className="lg:w-[700px] md:w-[700px] w-full flex flex-col justify-center items-center py-40 gap-5 lg:bg-white2 md:bg-white2 rounded-xl">
        <div className="flex flex-col justify-center items-center gap-3 lg:p-0">
          <MdErrorOutline size={80} className="text-red-800 mb-3" />
          <h1 className="font-ppMonument text-2xl">{t("invalid_code")}</h1>
          <span className="text-gray2 text-center text-sm">
            {t("invalid_code_detail")}
          </span>
        </div>
        <Link
          href={"/auth/RecoverPassword"}
          className="bg-black px-5 py-3 rounded-full text-white shadow-md text-sm hover:opacity-85 flex items-center gap-2"
        >
          <IoArrowBack size={18} />
          {t("return_to_recover")}
        </Link>
      </div>
    </div>
  );
}

function LoadingComponent() {
  const t = useTranslations("LoginAndSignUp");
  return (
    <div className="w-full flex flex-col justify-center items-center py-40">
      <div className="lg:w-[700px] md:w-[700px] w-full flex flex-col justify-center items-center py-40 gap-5 lg:bg-white2 md:bg-white2 rounded-xl">
        <span className="text-gray2 text-center text-sm">
          {t("validating_code")}
        </span>
      </div>
    </div>
  );
}

export default function ValidateCode() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <ValidateCodeItem />
    </Suspense>
  );
}
