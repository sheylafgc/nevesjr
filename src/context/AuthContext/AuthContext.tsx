/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { api } from "@/api/api";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LoginSchemaType } from "@/app/(public)/auth/Login/LoginSchema";
import { SignUpSchemaType } from "@/app/(public)/auth/SignUp/SignUpSchema";
import { Bounce, toast } from "react-toastify";

type AuthProviderProps = {
  children: ReactNode;
};

type UserProps = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  title: "Mr" | "Ms";
};

export type SignUpProps = Pick<
  SignUpSchemaType,
  "first_name" | "last_name" | "email" | "password" | "phone" | "title"
>;

type AuthContextData = {
  user: UserProps | null;
  signIn: (data: LoginSchemaType) => Promise<void>;
  signUp: (data: SignUpProps) => Promise<void>;
  signOut: () => void;
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(true);
  const router = useRouter();

  const token = Cookies.get("NEVESJR_TOKEN");
  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      getMyUser();
    }
  }, [refresh, token]);

  async function signIn(form: LoginSchemaType) {
    setLoading(true);
    try {
      const { data } = await api.post("/login/", form);
      api.defaults.headers.Authorization = `Bearer ${data.access}`;
      Cookies.set("NEVESJR_TOKEN", data.access, { expires: 1 });
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setRefresh(!refresh);
      router.push("/Internal");
    } catch (error) {
      let errorMessage = "Ocorreu um erro inesperado.";

      if (
        error instanceof Error &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response
      ) {
        errorMessage =
          (error.response as { data: { detail?: string } }).data.detail ||
          errorMessage;
      } else {
        if (error instanceof Error) {
          errorMessage = error.message;
        }
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  }

  async function signUp(form: SignUpProps) {
    try {
      await api.post("/user/create", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("account successfully created", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.push("/auth/Login");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  async function getMyUser() {
    try {
      if (token) {
        const { data } = await api.get<UserProps>("/user/profile");
        console.log(data);
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function signOut() {
    try {
      setUser(null);
      Cookies.remove("NEVESJR_TOKEN");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
