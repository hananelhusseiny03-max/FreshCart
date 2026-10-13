"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

import { AppState } from "@/app/features/authen/store/store";

type CartSummaryProps = {
  numOfCartItems: number;
  totalCartPrice: number;
};

export default function CartSummary({
  numOfCartItems,
  totalCartPrice,
}: CartSummaryProps) {
  const { isAuthenticated } = useSelector(
    (appState: AppState) => appState.auth
  );

  const shipping = totalCartPrice >= 500 ? 0 : 60;
  const total = totalCartPrice + shipping;

  return (
    <div className="h-fit overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {isAuthenticated ? (
        <>
          {/* Header */}
          <div className="bg-emerald-600 px-5 py-4">
            <h2 className="flex items-center gap-3 text-xl font-bold text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 8.5V7a6 6 0 0 1 12 0v1.5M4 8.5h16l-1 11H5l-1-11Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 8.5V7a3 3 0 0 1 6 0v1.5"
                />
              </svg>

              Order Summary
            </h2>

            <p className="mt-1 text-base text-white">
              {numOfCartItems} items in your cart
            </p>
          </div>

          <div className="p-5">
            {/* Shipping */}
            <div className="rounded-2xl bg-emerald-50 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 640 512"
  fill="currentColor"
  className="h-5 w-5 text-emerald-600"
>
  <path d="M624 352h-16V275.2c0-15.9-5.8-31.3-16.3-43.2L537.6 207H464V144c0-26.5-21.5-48-48-48H48C21.5 96 0 117.5 0 144v208c0 26.5 21.5 48 48 48h16a80 80 0 1 0 160 0h192a80 80 0 1 0 160 0h48c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16zM144 432a32 32 0 1 1 0-64 32 32 0 0 1 0 64zm320 0a32 32 0 1 1 0-64 32 32 0 0 1 0 64zm96-128h-96v-64h56.6l39.4 48.5V304z" />
</svg>                </div>

                <div>
                  <h3 className="font-semibold text-emerald-700">
                    {shipping === 0 ? "Free Shipping!" : "Shipping Fee"}
                  </h3>

                  <p className="text-sm text-emerald-600">
                    {shipping === 0
                      ? "You qualify for free delivery"
                      : "Shipping fee is 60 EGP"}
                  </p>
                </div>
              </div>
            </div>

            {/* Prices */}
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between text-base text-gray-600">
                <span>Subtotal</span>

                <span className="font-semibold text-gray-800">
                  {totalCartPrice} EGP
                </span>
              </div>

              <div className="flex items-center justify-between text-base text-gray-600">
                <span>Shipping</span>

                <span className="text-emerald-600">
                  {shipping === 0 ? "FREE" : `${shipping} EGP`}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-dashed border-gray-300 pt-4">
                <span className="text-lg font-bold text-slate-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-slate-900">
                  {total}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    EGP
                  </span>
                </span>
              </div>
            </div>

            {/* Promo */}
            <button className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 py-3 text-base text-gray-600 transition hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M21.41 11.58 12.42 2.59A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7c0 .53.21 1.04.59 1.41l9 9a2 2 0 0 0 2.82 0l7-7a2 2 0 0 0 0-2.83ZM6.5 8A1.5 1.5 0 1 1 6.5 5a1.5 1.5 0 0 1 0 3Z" />
              </svg>

              Apply Promo Code
            </button>

            {/* Checkout */}
            <Link
              href="/checkout"
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
            >
              <i className="fa-solid fa-lock"></i>
              Secure Checkout
            </Link>

            {/* Benefits */}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
              <span>
                <i className="fa-solid fa-shield-halved mr-2 text-emerald-600"></i>
                Secure Payment
              </span>

              <span className="h-5 w-px bg-gray-300"></span>

              <span>
                <i className="fa-solid fa-truck mr-2 text-blue-500"></i>
                Fast Delivery
              </span>
            </div>

            {/* Continue Shopping */}
            <Link
              href="/"
              className="mt-6 block text-center text-base text-emerald-600 transition hover:text-emerald-700"
            >
              ← Continue Shopping
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* Logged Out */}
          <div className="bg-slate-900 px-6 py-5">
            <h2 className="text-xl font-bold text-white">
              Order Summary
            </h2>
          </div>

          <div className="p-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal ({numOfCartItems} items)</span>

                <span className="font-semibold text-gray-700">
                  {totalCartPrice} EGP
                </span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span>Shipping</span>

                <span className="text-emerald-600">
                  Calculated at checkout
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-5">
                <span className="font-bold text-gray-700">
                  Estimated Total
                </span>

                <span className="text-xl font-bold text-emerald-600">
                  {totalCartPrice} EGP
                </span>
              </div>
            </div>

            <Link
              href="/login"
              className="mt-7 block w-full rounded-xl bg-emerald-600 py-3.5 text-center font-semibold text-white transition hover:bg-emerald-700"
            >
              Login to Checkout
            </Link>

            <p className="mt-4 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Sign up
              </Link>
            </p>

            <div className="mt-5 space-y-2 border-t border-gray-200 pt-4 text-sm text-gray-500">
              <p>✓ Your cart items will be saved</p>
              <p>✓ Track your orders easily</p>
              <p>✓ Access exclusive member deals</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}