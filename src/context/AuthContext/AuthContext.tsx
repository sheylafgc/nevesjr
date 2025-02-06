/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { api } from "@/api/api";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type AuthProviderProps = {
  children: ReactNode;
};

type UserProps = {
  id: string;
  name?: string;
  email: string;
  phone: string;
};

type SignUpProps = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: UserProps | null;
  signIn: (data: SignInProps) => Promise<void>;
  signUp: (data: SignUpProps) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(true);
  const router = useRouter();

  const token = Cookies.get("NEVESJR_TOKEN");
  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    getMyUser();
  }, [refresh, token]);

  async function signIn({ email, password }: SignInProps) {
    setLoading(true);
    try {
      const { data } = await api.post("/login", { email, password });
      api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
      Cookies.set("SEGUROBET_TOKEN", data.accessToken, { expires: 1 });
      setRefresh(!refresh);
      router.push("/");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function signUp({ name, email, password, phone }: SignUpProps) {
    try {
      await api.patch("/users/register", {
        name,
        email,
        password,
        phone,
      });
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function getMyUser() {
    try {
      if (token) {
        const { data } = await api.get<UserProps>("/users/profile");
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
      router.push("auth/login");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
