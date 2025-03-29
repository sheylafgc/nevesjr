import { api } from "@/src/api/api";

export type OurServicesDataProps = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
};

export async function getOurServices(params?: { locale?: string }) {
  try {
    const { data } = await api.get<OurServicesDataProps[]>(
      `/our-service/?lang=${params?.locale}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
