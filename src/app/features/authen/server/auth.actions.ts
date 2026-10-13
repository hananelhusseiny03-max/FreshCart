"use server";

import { cookies } from "next/headers";
import axios, { AxiosRequestConfig } from "axios";
import { AuthState } from "../store/store.slice";

export async function setToken(
  token: string,
  rememberMe: boolean
): Promise<void> {
  const cookieStore = await cookies();

  if (rememberMe) {
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  } else {
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60,
      path: "/",
    });
  }
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  return token;
}

export async function clearToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function verifyToken(): Promise<AuthState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  console.log("TOKEN:", token ? "TOKEN EXISTS" : "NO TOKEN");

  if (!token) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      method: "GET",
      headers: {
        token,
      },
    };

    const { data } = await axios.request(options);
   console.log("VERIFY MESSAGE:", data.massage);
  console.log("VERIFY DATA:", JSON.stringify(data));

   if (data.message === "verified") {
      const { name, id, role } = data.decoded;

      return {
        isAuthenticated: true,
        userInfo: { name, id, role },
      };
    }

    return {
      isAuthenticated: false,
      userInfo: null,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }
}