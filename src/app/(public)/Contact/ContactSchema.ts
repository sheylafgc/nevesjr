import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(1, "Very short name").max(60, "Very long name"),
  email: z.string().email("Invalid e-mail"),
  message: z
    .string()
    .min(1, "Very short message")
    .max(200, "Very long message"),
});

export type ContactSchemaType = z.infer<typeof ContactSchema>;
