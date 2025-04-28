"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { RecoverSchema, RecoverSchemaType } from "./RecoverSchema";
import { api } from "@/src/api/api";
import { useRouter } from "@/src/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function RecoverPasswordPage() {
  const t = useTranslations("LoginAndSignUp");
  const locale = useLocale();
  const form = useForm<RecoverSchemaType>({
    resolver: zodResolver(RecoverSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const router = useRouter();

  async function sendCode(email: string) {
    setLoading(true);
    try {
      await api.post(`create/forgot-password/?email=${email}&lang=${locale}`);
      setIsEmailSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      form.reset();
    }
  }

  const onSubmit: SubmitHandler<RecoverSchemaType> = async (data) => {
    await sendCode(data.email);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-40">
      <div className="flex flex-col items-center justify-center lg:w-[700px] h-[400px] lg:border p-10 rounded-xl lg:shadow-md">
        {isEmailSent ? (
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-ppMonument">{t("email_sent")}</h1>
            <p className="text-black/50 text-sm mt-4">
              {t("email_sent_detail")}
            </p>
            <button
              className="border border-black rounded-full p-3 hover:bg-black hover:text-white mt-8"
              type="button"
              onClick={() => router.push("/auth/Login")}
            >
              <FaArrowLeft size={18} />
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-ppMonument">
              {t("recover_password")}
            </h1>
            <p className="text-black/50 text-sm mt-4">
              {t("recover_password_detail")}
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-center w-full mt-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder={t("email")}
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
                    className="text-white py-5 px-8 rounded-full"
                  >
                    {loading ? t("loading") : t("send_email")}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}
