import { z } from "zod";

export const RecoverSchema = z.object({
  email: z.string().min(1, { message: "Required" }).email("Invalid email."),
});

export type RecoverSchemaType = z.infer<typeof RecoverSchema>;
