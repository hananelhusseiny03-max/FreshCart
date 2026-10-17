"use server";

import axios from "axios";
import type { CategoriesResponse } from "../types/categoriesTypes";

export async function getAllCategories(): Promise<CategoriesResponse> {
  const { data } = await axios.get<CategoriesResponse>(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );

  return data;
}
