import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .transform((val) => val.trim())
    .refine((val) => val[0] === val[0]?.toUpperCase(), {
      message: "First letter must be uppercase",
    }),

  email: z
    .string()
    .min(1, "Email is required")
    .refine((val) => {
      const parts = val.split("@");
      if (parts.length !== 2) return false;

      const [local, domain] = parts;
      return !!local && domain.includes(".");
    }, {
      message: "Invalid email",
    }),

  age: z
    .number()
    .min(0, "Age cannot be negative"),
});

export type FormValues = z.infer<typeof formSchema>;