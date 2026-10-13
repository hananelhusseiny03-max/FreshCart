"use client";

import { useSelector } from "react-redux";
import { AppState } from "@/app/features/authen/store/store";

export default function CheckOutSummary() {
  const { products, numOfCartItems, totalCartPrice } = useSelector(
    (appState: AppState) => appState.cart
  );

  const shipping = totalCartPrice >= 500 ? 0 : 60;
  const total = totalCartPrice + shipping;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="bg-emerald-600 px-6 py-5">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M6 7V6a6 6 0 0 1 12 0v1h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1Zm2 0h8V6a4 4 0 0 0-8 0v1Z" />
          </svg>

          Order Summary
        </h2>

        <p className="mt-1 text-lg text-white">
          {numOfCartItems} item{numOfCartItems !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {products.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white">
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-medium text-slate-900">
                  {item.product.title}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {item.count} × {item.price} EGP
                </p>
              </div>

              <p className="text-lg font-bold text-slate-900">
                {(item.price * item.count).toFixed(0)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-200 pt-5">
          <div className="flex items-center justify-between text-lg text-gray-600">
            <span>Subtotal</span>
            <span>{totalCartPrice} EGP</span>
          </div>

          <div className="mt-5 flex items-center justify-between text-lg text-gray-600">
            <span className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-gray-400"
              >
                <path d="M3 6h11v10H3Zm11 3h4l3 3v4h-7Zm-7 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
              </svg>

              Shipping
            </span>

            <span className="font-medium text-emerald-600">
              {shipping === 0 ? "FREE" : `${shipping} EGP`}
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">
            <span className="text-2xl font-bold text-slate-900">
              Total
            </span>

            <span className="text-3xl font-bold text-emerald-600">
              {total}{" "}
              <span className="text-base font-normal text-gray-500">
                EGP
              </span>
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-6 py-4 text-xl font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M6 7V6a6 6 0 0 1 12 0v1h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1Zm2 0h8V6a4 4 0 0 0-8 0v1Z" />
          </svg>

          Place Order
        </button>
      </div>
    </div>
  );
}