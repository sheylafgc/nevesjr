/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { api } from "@/src/api/api";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { LoginSchemaType } from "@/src/app/[locale]/(public)/auth/Login/LoginSchema";
import { SignUpSchemaType } from "@/src/app/[locale]/(public)/auth/SignUp/SignUpSchema";
import { Bounce, toast } from "react-toastify";
import { BookingProps } from "@/src/domain/Bookings/Bookings";
import { useRouter } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";

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
  bookings: BookingProps[] | null;
  getUserBookings: () => Promise<void>;
  signIn: (data: LoginSchemaType, isOnBookATrip?: boolean) => Promise<void>;
  signInForBook: (data: LoginSchemaType) => Promise<void>;
  signUp: (data: SignUpProps) => Promise<void>;
  signOut: () => void;
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [bookings, setBookings] = useState<BookingProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(true);
  const router = useRouter();
  const tToast = useTranslations("Toasts");

  const token = Cookies.get("NEVESJR_TOKEN");
  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      getMyUser();
    }
  }, [refresh, token]);

  async function signIn(form: LoginSchemaType, isOnBookATrip?: boolean) {
    setLoading(true);
    try {
      const { data } = await api.post("/login/", form);
      api.defaults.headers.Authorization = `Bearer ${data.access}`;
      Cookies.set("NEVESJR_TOKEN", data.access, { expires: 1 });
      toast.success(tToast("login_successful"), {
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

      if (isOnBookATrip) {
        router.push("/BookATrip");
      } else {
        router.push("/Internal");
      }
    } catch (error) {
      let errorMessage = tToast("an_error_occurred");

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

  async function signInForBook(form: LoginSchemaType) {
    setLoading(true);
    try {
      const { data } = await api.post("/login/", form);
      api.defaults.headers.Authorization = `Bearer ${data.access}`;
      Cookies.set("NEVESJR_TOKEN", data.access, { expires: 1 });
      toast.success(tToast("login_successful"), {
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
    } catch (error) {
      let errorMessage = tToast("an_error_occurred");

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
      toast.success(tToast("account_created"), {
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
      toast.error(tToast("an_error_occurred"), {
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
      toast.error(tToast("an_error_occurred"), {
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

  async function getUserBookings() {
    try {
      const { data } = await api.get<BookingProps[]>(
        `/booking/user/${user?.id}/`
      );
      setBookings(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        bookings,
        getUserBookings,
        signIn,
        signInForBook,
        signUp,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
