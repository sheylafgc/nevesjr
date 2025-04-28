"use client";
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
import Link from "next/link";
import { SignUpSchema, SignUpSchemaType } from "./SignUpSchema";
import { useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { useLocale, useTranslations } from "next-intl";
import { PhoneInput } from "react-international-phone";
import { ClipLoader } from "react-spinners";

export default function SignUpPage() {
  const t = useTranslations("LoginAndSignUp");
  const locale = useLocale();
  const { signUp, loading } = useContext(AuthContext);
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      title: "Mr",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpSchemaType> = async ({
    first_name,
    last_name,
    email,
    password,
    phone,
    title,
  }) => {
    try {
      await signUp(
        {
          first_name,
          last_name,
          email,
          password,
          phone,
          title,
        },
        locale
      );
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-auto py-32 flex justify-center items-center lg:bg-white bg-white2">
      <div className=" lg:w-auto w-full justify-center items-center flex flex-col lg:bg-white2 px-40 py-10 rounded-xl lg:shadow-md">
        <div className="flex flex-col justify-between items-center gap-10 ">
          <h1 className="font-ppMonument text-3xl text-black">
            {t("sign_up")}
          </h1>
          <div className="w-full h-[2px] bg-gray1" />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mx-28 flex justify-center items-center"
            >
              <div className="space-y-8 w-full ">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={t("first_name")}
                          className="bg-white lg:py-0 py-7"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={t("last_name")}
                          className="bg-white lg:py-0 py-7"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl {...field}>
                        <PhoneInput
                          defaultCountry="gb"
                          inputClassName="react-international-phone-button"
                          countrySelectorStyleProps={{
                            buttonClassName: "react-international-phone-button",
                          }}
                          placeholder={t("phone_number")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl {...field}>
                        <Select
                          onValueChange={(value) => {
                            form.setValue("title", value as "Mr" | "Ms");
                          }}
                        >
                          <SelectTrigger className="bg-white lg:py-0 py-7">
                            <SelectValue placeholder={t("title")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mr">Mr.</SelectItem>
                            <SelectItem value="Ms">Ms.</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={t("email")}
                          className="bg-white lg:py-0 py-7"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PasswordInput
                          placeholder={t("password")}
                          className="bg-white lg:py-0 py-7"
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
                    <FormItem>
                      <FormControl>
                        <PasswordInput
                          placeholder={t("confirm_password")}
                          className="bg-white lg:py-0 py-7"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={!form.formState.isValid}
                  className="rounded-full w-full lg:py-0 py-7"
                  type="submit"
                >
                  {loading ? (
                    <ClipLoader size={20} color="white" />
                  ) : (
                    t("sign_up")
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex flex-col items-center justify-between gap-8">
            <Link
              href={`/${locale}/auth/Login`}
              className="underline text-gray2"
            >
              {t("log_in")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
