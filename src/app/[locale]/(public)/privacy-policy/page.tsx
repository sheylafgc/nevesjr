/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { api } from "@/src/api/api";
import HtmlRerender from "@/src/components/HtmlRerender/HtmlRerender";
import Loading from "@/src/components/Loading/Loading";
import { useLocale, useTranslations } from "next-intl";
import { Suspense, useEffect, useState } from "react";

type PrivacyPolicyPageProps = {
  content: string;
};

function PrivacyPolicyContent() {
  const t = useTranslations("privacy-policy");
  const locale = useLocale();
  const [pageData, setPageData] = useState<PrivacyPolicyPageProps | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<PrivacyPolicyPageProps>(
        `/content/privacy-policy-page/?lang=${locale}`
      );
      console.log(data);
      setPageData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-40">
      <div className="lg:w-[80%] w-[90%] h-auto py-40 px-20 flex flex-col gap-10 justify-center items-center bg-white2 rounded-xl shadow-md">
        <h1 className="font-ppMonument text-3xl">{t("title")}</h1>
        <HtmlRerender htmlString={pageData?.content ?? ""} />
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PrivacyPolicyContent />
    </Suspense>
  );
}
