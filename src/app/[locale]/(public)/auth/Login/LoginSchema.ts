import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid e-mail"),
  password: z.string().min(1, "Required password"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
