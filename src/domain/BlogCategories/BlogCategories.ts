import { api } from "@/src/api/api";

export type BlogCategoriesProps = {
  label: string;
};

export async function getBlogCategories({ locale }: { locale: string }) {
  try {
    const { data } = await api.get<BlogCategoriesProps[]>(
      `/blog/categories/?lang=${locale}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
