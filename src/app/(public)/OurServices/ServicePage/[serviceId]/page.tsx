import ServicePageComponent from "@/components/ServicePageComponent.tsx/ServicePageComponent";
import { getOurServices } from "@/domain/OurServices.ts/OurServices";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const res = await getOurServices();
  if (!res) return [];
  return res.map((service: { id: number }) => ({
    serviceId: service.id.toString(),
  }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  if (!serviceId) {
    return notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicePageComponent />
    </Suspense>
  );
}
