import { getOurServices } from "@/src/domain/OurServices.ts/OurServices";
import { useRouter } from "@/src/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { FaArrowRight } from "react-icons/fa6";
import { useTranslations } from "use-intl";

export default function MoreServices() {
  const t = useTranslations("MoreServices");
  const router = useRouter();
  const locale = useLocale();
  const ourServices = useQuery({
    queryKey: ["getOurServices", locale],
    queryFn: async () => {
      const data = await getOurServices({ locale });
      return data;
    },
  });

  return (
    <div className="w-full bg-gray1 flex flex-col justify-center items-center h-[800px]">
      <div className="lg:w-[80%] w-[90%] flex flex-col justify-between items-center ">
        <div className="w-full flex flex-row justify-between items-center mb-16">
          <h1 className="text-black text-3xl font-ppMonument">
            {t("more_services")}
          </h1>
          <button
            onClick={() => router.push("/OurServices")}
            className="hidden lg:flex justify-center items-center px-4 py-2 font-light text-sm bg-black hover:opacity-80 text-gray1 rounded-full"
          >
            {t("see_all_services")}
          </button>
        </div>

        <div className="w-full flex flex-col justify-center items-center divide-y divide-gray2/50">
          {ourServices.data?.map((service, index) => (
            <div
              key={index}
              className="w-full flex flex-row justify-between items-center"
            >
              <h1 className="text-2xl font-bold text-black my-8">
                {service.title}
              </h1>
              <button
                onClick={() =>
                  router.push(`/OurServices/ServicePage/${service.id}`)
                }
              >
                <FaArrowRight className="w-10 h-10 text-gray2 p-2 border border-black rounded-full hover:bg-black hover:text-gray1" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => router.push("/OurServices")}
          className="lg:hidden flex justify-center items-center px-4 py-3 font-light text-sm bg-black hover:opacity-80 text-gray1 rounded-full"
        >
          {t("see_all_services")}
        </button>
      </div>
    </div>
  );
}
