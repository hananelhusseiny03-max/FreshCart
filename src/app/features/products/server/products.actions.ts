
"use server";

import axios, { AxiosRequestConfig } from "axios";
import {
  ProductsResponse,
  SingleProductResponse,
} from "../types/Products.types";

export async function getProducts(): Promise<ProductsResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById({
  id,
}: {
  id: string;
}): Promise<SingleProductResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductsByBrand({
  brandId,
}: {
  brandId: string;
}): Promise<ProductsResponse> {
  const { data } = await axios.get<ProductsResponse>(
    "https://ecommerce.routemisr.com/api/v1/products",
    {
      params: {
        brand: brandId,
      },
    }
  );

  return data;
}
