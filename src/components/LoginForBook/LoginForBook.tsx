import {
  loginSchema,
  LoginSchemaType,
} from "@/app/(full-page)/auth/Login/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
export default function LoginForBook() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: LoginSchemaType) {
    console.log(data);
  }
  return (
    <div className="w-full justify-center items-center flex flex-col bg-white2 px-16 py-10 rounded-xl">
      <div className="flex flex-col justify-between items-center gap-10">
        <h1 className="font-ppMonument text-3xl text-black">
          Log in to continue
        </h1>
        <div className="w-full h-[2px] bg-gray1" />

        <Form {...form}>
          <div className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email address"
                      className="bg-white"
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
                    <Input
                      placeholder="Password"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!form.formState.isValid}
              className="rounded-full w-full"
              type="submit"
              onClick={() => form.handleSubmit(onSubmit)}
            >
              Log in
            </Button>
          </div>
        </Form>
        <div className="flex flex-col items-center justify-between gap-8">
          <Link href={"#"} className="underline text-gray2">
            Forgot Password?
          </Link>
          <Link href={"#"} className="underline text-gray2">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
