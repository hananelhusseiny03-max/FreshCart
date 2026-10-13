"use server";

import { SignupFormValues, signupSchema } from "../schemas/signup.schema";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export async function SignupAction(value: SignupFormValues) {
  const ValidationResult = signupSchema.safeParse(value);

  if (!ValidationResult.success) {
    const errors: Record<string, string> = {};

    if (ValidationResult.error) {
      ValidationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        const message = issue.message;

        if (!errors[field]) {
          errors[field] = message;
        }
      });
    }

    return {
      success: false,
      message: "validation errors",
      errors,
    };
  }

  try {
    const payload = {
      name: value.name,
      email: value.email,
      password: value.password,
      rePassword: value.repassword,
      phone: value.phone,
    };

    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      method: "POST",
      data: payload,
    };

    const { data } = await axios.request(options);

    if (data.message === "success") {
      return {
        success: true,
        message: "Account Create Successfuly",
        data,
      };
    }

    return {
      success: false,
      message: data.message || "something went wrong",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;

      if (errorMessage === "Account Already Exists") {
        return {
          success: false,
          message: "account exists",
          errors: {
            email: "an account with this email already exists",
          },
        };
      }
    }

    return {
      success: false,
      message: "something went wrong",
    };
  }
}