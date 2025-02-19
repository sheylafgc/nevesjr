import { z } from "zod";

export const SignUpSchema = z
  .object({
    first_name: z.string().min(1, "Required first name"),
    last_name: z.string().min(1, "Required first name"),
    email: z.string().email("Invalid e-mail"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    phone: z.string().min(1, "Very short phone").max(60, "Very long phone"),
    title: z.enum(["Mr", "Ms"], {
      required_error: "Please select an option",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords don't match.",
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
