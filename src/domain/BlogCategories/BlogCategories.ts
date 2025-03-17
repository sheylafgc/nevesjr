import { api } from "@/api/api";

export type BlogCategoriesProps = {
  label: string;
  value: string;
};

export async function getBlogCategories() {
  try {
    const { data } = await api.get<BlogCategoriesProps[]>("/blog/categories");
    return data;
  } catch (error) {
    console.error(error);
  }
}
