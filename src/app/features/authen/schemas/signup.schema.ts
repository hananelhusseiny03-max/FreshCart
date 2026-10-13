
import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .nonempty("Name Is Required")
    .min(1, "name is required")
    .min(3, "name must be at least 3 characters long")
    .max(25, "name must be at most 25 characters long"),

  email: z
    .string()
    .nonempty("Email Is Required")
    .pipe(z.email("Invalid Email Address")),

  password: z
    .string()
    .nonempty("Password Is Required")
    .min(8, "password must be at least 8 characters long")
    .regex(
      /[A-Z]/,
      "Password must contain at least one uppercase letter"
    )
    .regex(
      /[a-z]/,
      "Password must contain at least one lowercase letter"
    )
    .regex(
      /[0-9]/,
      "Password must contain at least one number"
    )
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),

  repassword: z
    .string()
    .nonempty("RePassword Is Required"),

  phone: z
    .string()
    .nonempty("Phone Is Required")
    .regex(
      /^(\+2)?01[0125][0-9]{8}$/,
      "only Egyptian phone numbers are allowed"
    ),

  terms: z.boolean().refine((value) => value === true, {
    error: "you must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.repassword, {
  error: "password and confirm password must match",
  path: ["repassword"],
});

export type SignupFormValues = z.infer<typeof signupSchema>;