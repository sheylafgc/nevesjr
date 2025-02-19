import { api } from "@/api/api";

export type OurServicesDataProps = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
};

export async function getOurServices() {
  try {
    const { data } = await api.get<OurServicesDataProps[]>(`/our-service`);
    return data;
  } catch (error) {
    console.error(error);
  }
}
