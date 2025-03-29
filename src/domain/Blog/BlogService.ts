import { api } from "@/src/api/api";

export type BlogProps = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  created_at: string;
  category: string;
};

async function getBlogs(params?: {
  id?: string;
  category?: string;
  locale?: string;
}) {
  try {
    if (params?.id) {
      const { data } = await api.get<BlogProps>(
        `/blog/${params.id}/?lang=${params.locale}`
      );
      return [data];
    }

    const url = params?.category
      ? `/blog/${encodeURIComponent(params.category)}/?lang=${params.locale}`
      : `/content/blog-page/?lang=${params?.locale}`;

    const { data } = await api.get<BlogProps[]>(url);
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

async function getBlogsForCarousel({ locale }: { locale: string }) {
  try {
    const { data } = await api.get<BlogProps[]>(
      `/content/blog-page-carousel/?lang=${locale}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching blogs for carousel:", error);
    throw error;
  }
}

export { getBlogs, getBlogsForCarousel };
