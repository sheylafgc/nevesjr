import { api } from "@/src/api/api";

export type SocialMediaType = {
  icon: string;
  label: string;
  value: string;
};

async function getSocialMedia({ locale }: { locale: string }) {
  try {
    const { data } = await api.get<SocialMediaType[]>(
      `/content/social-media/?lang=${locale}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { getSocialMedia };
