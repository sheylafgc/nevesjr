/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewPasswordSchema, NewPasswordSchemaType } from "./NewPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { api } from "@/api/api";
import Cookies from "js-cookie";
import { Bounce, toast } from "react-toastify";
import Loading from "@/components/Loading/Loading";

function NewPasswordItem() {
  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      router.push("/auth/Login");
    }
    const getUserId = async () => {
      try {
        const { data } = await api.get(`/user/id/${email}/`);
        setUserId(data.id);
      } catch (error) {
        console.log(error);
      }
    };
    getUserId();
  }, []);

  async function changePassword(password: string) {
    setLoading(true);
    try {
      await api.put(`/new-password/${userId}/`, { password });
      toast.success("Password changed successfully", {
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
      console.error(error);
    } finally {
      setLoading(false);
      Cookies.remove("code-validation");
    }
  }
  const onSubmit: SubmitHandler<NewPasswordSchemaType> = async ({
    password,
  }) => {
    await changePassword(password);
  };

  return (
    <div className="w-full flex justify-center items-center py-40">
      <div className="flex flex-col items-center justify-center lg:w-[700px] h-[400px] lg:border p-10 rounded-xl lg:shadow-md">
        <h1 className="text-3xl font-ppMonument">New Password</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center w-full mt-8 gap-5"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <PasswordInput
                      placeholder="Password"
                      className="border lg:py-0 py-7"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <PasswordInput
                      placeholder="Confirm password"
                      className="border lg:py-0 py-7"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-between items-center mt-8">
              <button
                className="border border-black rounded-full p-3 hover:bg-black hover:text-white"
                type="button"
                onClick={() => router.push("/auth/Login")}
              >
                <FaArrowLeft size={18} />
              </button>
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                className="text-white py-5 px-8  rounded-full"
              >
                {loading ? "Loading..." : "Change password"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function NewPassword() {
  return (
    <Suspense fallback={<Loading />}>
      <NewPasswordItem />
    </Suspense>
  );
}
