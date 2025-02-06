import { z } from "zod";

export const BookATripSchema = z.object({
  from: z.string().min(1, "Very short from").max(60, "Very long from"),
  to: z.string().min(1, "Very short to").max(60, "Very long to"),
  date: z.string().min(1, "Very short date").max(60, "Very long date"),
  hour: z.string().min(1, "Very short hour").max(60, "Very long hour"),
  carClass: z
    .string()
    .min(1, "Very short carClass")
    .max(60, "Very long carClass"),
  bookingFor: z.enum(["myself", "someoneElse"], {
    required_error: "Please select an option",
  }),
  firstName: z
    .string()
    .min(1, "Very short FirstName")
    .max(60, "Very long FirstName"),
  lastName: z
    .string()
    .min(1, "Very short LastName")
    .max(60, "Very long LastName"),
  title: z.enum(["Mr", "Ms"], {
    required_error: "Please select an option",
  }),
  email: z.string().email("Invalid e-mail"),
  phone: z.string().min(1, "Very short phone").max(60, "Very long phone"),
  nameOnCard: z
    .string()
    .min(1, "Very short name on card")
    .max(50, "Very long name on card"),
  cardNumber: z
    .string()
    .nonempty("Card number is required")
    .max(19, "Very long card number"),
  expirationDate: z
    .string()
    .nonempty("Expiration date is required")
    .max(6, "Very long expiration date")
    .refine(
      (value) => {
        const [month] = value.split("/").map((item) => parseInt(item, 10));
        return month >= 1 && month <= 12;
      },
      {
        message: "Invalid month",
      }
    )
    .refine(
      (value) => {
        // Validação de data futura
        const currentDate = new Date();
        const [month, year] = value
          .split("/")
          .map((item) => parseInt(item, 10));
        const expiryDate = new Date(year + 2000, month, 1);
        return expiryDate > currentDate;
      },
      {
        message: "Expiration date must be in the future",
      }
    ),
  cvv: z
    .string()
    .regex(/^[0-9]{3,4}$/, "Invalid CVV")
    .nonempty("CVV is required"),
  additionalInformation: z
    .string()
    .max(400, "Very long Additional Information")
    .optional(),
});

export type BookATripSchemaType = z.infer<typeof BookATripSchema>;
