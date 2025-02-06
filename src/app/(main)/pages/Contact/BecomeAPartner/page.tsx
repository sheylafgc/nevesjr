"use client";
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
import {
  BecomeAPartnerSchema,
  BecomeAPartnerSchemaType,
} from "./BecomeAPartnerSchema";

export default function Contact() {
  const form = useForm<BecomeAPartnerSchemaType>({
    resolver: zodResolver(BecomeAPartnerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      carModel: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: BecomeAPartnerSchemaType) {
    console.log(data);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center bg-gradient-to-l from-black to-gray4">
      <div className="lg:w-[80%] w-[90%] lg:h-screen flex flex-col lg:flex-row items-center py-40 gap-4">
        <div className="flex-[6] h-full flex flex-col justify-center items-center">
          <div className="bg-smileyWoman rounded-xl w-full h-[600px] lg:h-full bg-cover bg-center">
            <div className="bg-gradient-to-tr via-60% via-transparent from-black to-transparent rounded-xl w-full h-full flex flex-col justify-end items-start p-10">
              <h1 className="font-ppMonument text-3xl text-white leading-s50">
                Join Forces <br /> with Neves Jr
              </h1>
              <p className="font-light text-xs text-white mt-4">
                Discover a partnership built on trust, innovation, and{" "}
                <br className="lg:block hidden" />
                shared success. Neves Jr invites you to be part of a{" "}
                <br className="lg:block hidden" />
                journey that drives excellence and opens doors to new{" "}
                <br className="lg:block hidden" />
                opportunities. Together, we can achieve more.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-[4] w-full h-full bg-gray4 rounded-xl gap-10 p-14 flex flex-col justify-center">
          <h1 className="font-ppMonument text-3xl text-white leading-s50">
            Let’s Grow <br /> Together!
          </h1>
          <span className="text-xs text-white font-light">
            Fill in the details below, and we <br /> will get in touch with you.
          </span>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant="underlined"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Container para Email e Phone */}
              <div className="flex flex-col lg:flex-row gap-8 lg:justify-between w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2 lg:mr-2">
                      <FormControl>
                        <Input
                          variant="underlined"
                          placeholder="Email"
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
                    <FormItem className="w-full lg:w-1/2 lg:ml-2">
                      <FormControl>
                        <Input
                          variant="underlined"
                          placeholder="Phone"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="carModel"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant="underlined"
                        placeholder="Car model"
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
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
