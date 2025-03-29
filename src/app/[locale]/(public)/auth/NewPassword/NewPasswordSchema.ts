import { z } from "zod";

export const NewPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords don't match.",
  });

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;
