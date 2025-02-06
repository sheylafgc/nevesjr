import { z } from "zod";

export const BecomeAPartnerSchema = z.object({
  name: z.string().min(1, "Very short name").max(60, "Very long name"),
  phone: z
    .string()
    .min(1, "Very short phone number")
    .max(60, "Very long phone number"),
  email: z.string().email("Invalid e-mail"),
  carModel: z.string().min(1, "Required field"),
});

export type BecomeAPartnerSchemaType = z.infer<typeof BecomeAPartnerSchema>;
