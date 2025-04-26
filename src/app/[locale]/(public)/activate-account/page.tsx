"use client";
import { Suspense, useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { api } from "@/src/api/api";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/i18n/navigation";
import { CiCircleCheck } from "react-icons/ci";

function LoadingComponent() {
  const t = useTranslations("LoginAndSignUp");
  return (
    <div className="w-full flex flex-col justify-center items-center py-40">
      <div className="lg:w-[700px] md:w-[700px] w-full flex flex-col justify-center items-center py-40 gap-5 lg:bg-white2 md:bg-white2 rounded-xl">
        <span className="text-gray2 text-center text-sm">
          {t("activating_account")}
        </span>
      </div>
    </div>
  );
}

function ActiveAccountItem() {
  const t = useTranslations("LoginAndSignUp");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateCode = async () => {
      if (!email) {
        return router.push("/auth/Login");
      }

      try {
        setLoading(true);
        const { data } = await api.get(`user/activate/${email}/`);
        console.log(data);

        if (data.detail === "User successfully activated.") {
          setIsActive(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    validateCode();
  }, [email, router]);
  return isActive ? (
    loading ? (
      <LoadingComponent />
    ) : (
      <div className="w-full flex flex-col justify-center items-center py-40">
        <div className="lg:w-[700px] md:w-[700px] w-full flex flex-col justify-center items-center py-40 gap-5 lg:bg-white2 md:bg-white2 rounded-xl">
          <div className="flex flex-col justify-center items-center gap-3 lg:p-0">
            <CiCircleCheck size={80} className="text-green-700 mb-3" />
            <h1 className="font-ppMonument text-2xl">
              {t("activated_account")}
            </h1>
          </div>
          <button
            onClick={() => router.push("/auth/Login")}
            className="bg-black px-5 py-3 rounded-full text-white shadow-md text-sm hover:opacity-85 flex items-center gap-2"
          >
            <IoArrowBack size={18} />
            {t("log_in")}
          </button>
        </div>
      </div>
    )
  ) : (
    <div className="w-full flex flex-col justify-center items-center py-40">
      <div className="lg:w-[700px] md:w-[700px] w-full flex flex-col justify-center items-center py-40 gap-5 lg:bg-white2 md:bg-white2 rounded-xl">
        <div className="flex flex-col justify-center items-center gap-3 lg:p-0">
          <MdErrorOutline size={80} className="text-red-800 mb-3" />
          <h1 className="font-ppMonument text-2xl">{t("account_not_found")}</h1>
        </div>
        <button
          onClick={() => router.push("/auth/SignUp")}
          className="bg-black px-5 py-3 rounded-full text-white shadow-md text-sm hover:opacity-85 flex items-center gap-2"
        >
          <IoArrowBack size={18} />
          {t("create_account")}
        </button>
      </div>
    </div>
  );
}

export default function ValidateCode() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <ActiveAccountItem />
    </Suspense>
  );
}
