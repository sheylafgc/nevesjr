import Loading from "@/components/Loading/Loading";
import ServicePageComponent from "@/components/ServicePageComponent.tsx/ServicePageComponent";
import { getOurServices } from "@/src/domain/OurServices.ts/OurServices";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const locales = ["en", "pt", "es"];
  const allServices = await Promise.all(
    locales.map((locale) => getOurServices({ locale }))
  );

  return locales.flatMap(
    (locale, index) =>
      allServices[index]?.map((service: { id: number }) => ({
        locale,
        serviceId: service.id.toString(),
      })) || []
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; serviceId: string }>;
}) {
  const { locale, serviceId } = await params;
  const service = await getOurServices({ locale: locale }).then((service) =>
    service?.find((s) => s.id.toString() === serviceId)
  );

  if (!service) {
    return notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <ServicePageComponent />
    </Suspense>
  );
}
