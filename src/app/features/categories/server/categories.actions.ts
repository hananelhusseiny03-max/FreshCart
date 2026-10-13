"use server";

import axios, { AxiosRequestConfig } from "axios";
import { promises } from "dns";
import { CategoriesResponse } from "../types/categoriesTypes";

export async function getAllCategories(): Promise<CategoriesResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };

    const { data } = await axios.request(options);

    return data;
  } catch (error) {
    throw error;
  }
}

