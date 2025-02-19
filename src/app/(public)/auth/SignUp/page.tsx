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
import { AuthContext } from "@/context/AuthContext/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";

export default function SignUpPage() {
  const { signUp } = useContext(AuthContext);
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
  const formValues = form.watch();

  const onSubmit: SubmitHandler<SignUpSchemaType> = async ({
    first_name,
    last_name,
    email,
    password,
    phone,
    title,
  }) => {
    console.log({
      first_name,
      last_name,
      email,
      password,
      phone,
      title,
    });
    await signUp({
      first_name,
      last_name,
      email,
      password,
      phone,
      title,
    });
    form.reset();
  };
  return (
    <div className="w-full lg:h-screen flex justify-center items-center lg:bg-white bg-white2 py-10">
      <div className=" lg:w-auto w-full justify-center items-center flex flex-col lg:bg-white2 px-40 py-10 rounded-xl lg:shadow-md">
        <div className="flex flex-col justify-between items-center gap-10 ">
          <h1 className="font-ppMonument text-3xl text-black">Sign Up</h1>
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
                          placeholder="First name"
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
                          placeholder="Last name"
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
                      <FormControl>
                        <Input
                          placeholder="Phone"
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
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl {...field}>
                        <Select
                          onValueChange={(value) => {
                            form.setValue("title", value as "Mr" | "Ms");
                            console.log("console watch:", form.watch("title"));
                            console.log(value);
                            console.log("Form: ", formValues.title);
                          }}
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Title" />
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
                          placeholder="Email address"
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
                          placeholder="Password"
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
                          placeholder="Confirm password"
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
                  Register
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex flex-col items-center justify-between gap-8">
            <Link href={"/auth/Login"} className="underline text-gray2">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
