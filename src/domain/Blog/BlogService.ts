import { api } from "@/api/api";
import { BlogProps } from "@/context/BlogContext/BlogContext";

export async function getBlogs(id?: string) {
  try {
    const { data } = await api.get<BlogProps[]>(`/blog${id ? `/${id}` : ""}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}
