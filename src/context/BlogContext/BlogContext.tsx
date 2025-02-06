"use client";
import { api } from "@/api/api";
import { createContext, ReactNode, useState } from "react";

type BlogProviderProps = {
  children: ReactNode;
};

export type BlogProps = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  created_at: string;
  category: string;
};

interface editBlogProps extends BlogProps {
  id: number;
}

type addBlogProps = {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  category: string;
};

type BlogContextData = {
  blog: BlogProps[] | null;
  loading: boolean;
  getBlogs: (id?: string) => Promise<void>;
  addBlog: (data: addBlogProps) => Promise<void>;
  editBlog: (data: editBlogProps) => Promise<void>;
  removeBlog: (id: string) => Promise<void>;
};

export const BlogContext = createContext({} as BlogContextData);

export function BlogProvider({ children }: BlogProviderProps) {
  const [blog, setBlog] = useState<BlogProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getBlogs(id?: string) {
    try {
      setLoading(true);
      const { data } = await api.get<BlogProps[]>(`/blog${id && `/${id}`}`);
      setBlog(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addBlog(data: addBlogProps) {
    try {
      setLoading(true);
      await api.post("/blogs/create", {
        data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function editBlog(data: editBlogProps) {
    try {
      setLoading(true);
      await api.post(`/blog/update/${data.id}`, {
        data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeBlog(id: string) {
    try {
      setLoading(true);
      await api.delete(`/blog/delete/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BlogContext.Provider
      value={{
        loading,
        blog,
        getBlogs,
        addBlog,
        editBlog,
        removeBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
