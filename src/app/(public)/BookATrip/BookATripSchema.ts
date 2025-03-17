import { z } from "zod";

export const BookATripSchema = z.object({
  from_route: z.string().min(1, "Very short from").max(60, "Very long from"),
  to_route: z.string().optional(),
  date: z.string().min(1, "Very short date"),
  hour: z.string().min(1, "Very short hour"),
  duration: z.string().optional(),
  estimated_time: z.string().optional(),
  distance_km: z.number().optional(),
  vehicle: z.number(),
  booking_for: z.enum(["myself", "someone_else"], {
    required_error: "Please select an option",
  }),
  first_name: z
    .string()
    .min(1, "Very short FirstName")
    .max(60, "Very long FirstName"),
  last_name: z
    .string()
    .min(1, "Very short LastName")
    .max(60, "Very long LastName"),
  email: z.string().email("Invalid e-mail"),
  title: z.enum(["Mr", "Ms"], {
    required_error: "Please select an option",
  }),
  phone_number: z
    .string()
    .min(1, "Very short phone")
    .max(60, "Very long phone"),
  notes: z.string().max(400, "Very long Additional Information").optional(),
});

export type BookATripSchemaType = z.infer<typeof BookATripSchema>;
