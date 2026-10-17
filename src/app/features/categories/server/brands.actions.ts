
"use server";

import axios from "axios";
import type { BrandsResponse, Brand } from "../types/brands.Types";

export async function getAllBrands(): Promise<BrandsResponse> {
  const { data } = await axios.get<BrandsResponse>(
    "https://ecommerce.routemisr.com/api/v1/brands"
  );

  return data;
}

export async function getBrandById({
  id,
}: {
  id: string;
}): Promise<{ data: Brand }> {
  const { data } = await axios.get<{ data: Brand }>(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`
  );

  return data;
}

