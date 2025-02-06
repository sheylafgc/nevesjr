// import { api } from "@/api/api";

import { blogsData } from "@/app/constants/Blogs";

export type BlogProps = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  created_at: string;
  category: string;
};

export async function getBlogs(): Promise<BlogProps[]> {
  //   try {
  //     const { data } = await api.get<BlogProps[]>("/blog");
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return blogsData;
}
