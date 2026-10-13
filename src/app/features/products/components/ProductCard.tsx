"use client";

import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsRotate,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { Product } from "../types/Products.types";
import {
  addProductToCart,
  getLoggedUserCart,
} from "@/app/features/authen/cart/server/cart.actions";
import { setCartInfo } from "@/app/features/authen/cart/store/cart.slice";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const discount =
    product.priceAfterDiscount &&
    Math.round(
      ((product.price - product.priceAfterDiscount) / product.price) * 100
    );

  const handleAddToCart = async () => {
    try {
      const response = await addProductToCart({ productId: product.id });

      console.log(response);

      if (response.status === "success") {
        toast.success(response.message);

        const cartResponse = await getLoggedUserCart();

        dispatch(
          setCartInfo({
            numOfCartItems: cartResponse.numOfCartItems,
            cartId: cartResponse.cartId,
            products: cartResponse.data.products,
            totalCartPrice: cartResponse.data.totalCartPrice,
            isLoading: false,
            error: null,
          })
        );
      }
    } catch (error) {}
  };

  return (
    <div
      id="product-card"
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
    >
      <div className="relative">
        <img
          className="w-full h-60 object-contain bg-white"
          src={product.imageCover}
          alt={product.title}
        />

        {discount && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white text-xs px-2 py-2 rounded">
              -{discount}%
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button className="bg-white h-10 w-10 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600 shadow-sm">
            <FontAwesomeIcon icon={faHeart} />
          </button>

          <button className="bg-white h-10 w-10 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600 shadow-sm">
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>

          <Link
            href={`/products/${product.id}`}
            className="bg-white h-10 w-10 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600 shadow-sm"
          >
            <FontAwesomeIcon icon={faEye} />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">
          {product.category.name}
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="text-yellow-400">
            {"★".repeat(Math.round(product.ratingsAverage))}
          </div>

          <span className="text-sm text-gray-500">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-emerald-600">
              {product.priceAfterDiscount ?? product.price} EGP
            </span>

            {product.priceAfterDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {product.price} EGP
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-emerald-600 text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-emerald-700"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
}