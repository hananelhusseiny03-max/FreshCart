"use client";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { AppState } from "@/app/features/authen/store/store";

import { setCartInfo } from "@/app/features/authen/cart/store/cart.slice";

import {
  clearUserCart,
  getLoggedUserCart,
  removeProductFromCart,
  updateCartProductQuantity,
} from "@/app/features/authen/cart/server/cart.actions";

import CartSummary from "./cart.summary";

export default function CartScreen() {
  const dispatch = useDispatch();

  const { products, numOfCartItems, totalCartPrice } = useSelector(
    (appState: AppState) => appState.cart
  );

  const [showClearAlert, setShowClearAlert] = useState(false);

  const refreshCart = async () => {
    const cartResponse = await getLoggedUserCart();

    dispatch(
      setCartInfo({
        cartId: cartResponse.cartId,
        totalCartPrice: cartResponse.data.totalCartPrice,
        products: cartResponse.data.products,
        numOfCartItems: cartResponse.numOfCartItems,
        isLoading: false,
        error: null,
      })
    );
  };

  const handleIncrease = async (productId: string, count: number) => {
    await updateCartProductQuantity({
      productId,
      count: count + 1,
    });

    await refreshCart();
  };

  const handleDecrease = async (productId: string, count: number) => {
    if (count === 1) {
      await removeProductFromCart({
        productId,
      });
    } else {
      await updateCartProductQuantity({
        productId,
        count: count - 1,
      });
    }

    await refreshCart();
  };

  const handleDelete = async (productId: string) => {
    await removeProductFromCart({
      productId,
    });

    await refreshCart();
  };

  const handleClearCart = () => {
    setShowClearAlert(true);
  };

  const confirmClearCart = async () => {
    await clearUserCart();
    await refreshCart();
    setShowClearAlert(false);
  };

  if (products.length === 0) {
    return (
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex min-h-125 flex-col items-center justify-center rounded-2xl bg-white px-6 text-center shadow-sm">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <i className="fa-solid fa-cart-shopping text-4xl text-gray-400"></i>
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              Your cart is empty
            </h1>

            <p className="mt-3 max-w-lg text-gray-500">
              Looks like you haven't added anything to your cart yet. Start
              exploring our products!
            </p>

            <Link
              href="/"
              className="mt-7 rounded-xl bg-emerald-600 px-7 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Start Shopping →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl bg-emerald-50 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <i className="fa-solid fa-truck text-2xl text-emerald-600"></i>

              <h3 className="mt-2 font-semibold text-gray-800">
                Free Shipping
              </h3>

              <p className="text-sm text-gray-500">
                On orders over 500 EGP
              </p>
            </div>

            <div className="text-center">
              <i className="fa-solid fa-rotate-left text-2xl text-emerald-600"></i>

              <h3 className="mt-2 font-semibold text-gray-800">
                Easy Returns
              </h3>

              <p className="text-sm text-gray-500">
                14-day return policy
              </p>
            </div>

            <div className="text-center">
              <i className="fa-solid fa-lock text-2xl text-emerald-600"></i>

              <h3 className="mt-2 font-semibold text-gray-800">
                Secure Payment
              </h3>

              <p className="text-sm text-gray-500">
                100% secure checkout
              </p>
            </div>

            <div className="text-center">
              <i className="fa-solid fa-headset text-2xl text-emerald-600"></i>

              <h3 className="mt-2 font-semibold text-gray-800">
                24/7 Support
              </h3>

              <p className="text-sm text-gray-500">
                Contact us anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Cart Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.8"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.886 3.307m0 0 1.41 5.258a2.25 2.25 0 0 0 2.174 1.667h7.614a2.25 2.25 0 0 0 2.174-1.667l1.41-5.258H5.609Zm0 0h14.782M9 19.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm9 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  />
                </svg>
              </div>

              <h1 className="text-4xl font-bold text-slate-900">
                Shopping Cart
              </h1>
            </div>

            <p className="mt-3 text-lg text-gray-500">
              You have{" "}
              <span className="font-semibold text-emerald-600">
                {numOfCartItems}
              </span>{" "}
              items in your cart
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[7fr_3fr]">
            {/* Cart Products */}
            <div>
              <div className="space-y-5">
                {products.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-6">
                      {/* Product Image */}
                      <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex min-w-0 flex-1 flex-col self-stretch">
                        <div>
                          <h2 className="text-xl font-semibold text-slate-900">
                            {item.product.title}
                          </h2>

                          <span className="mt-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                            {item.product.category.name}
                          </span>

                          <p className="mt-4 text-xl font-bold text-emerald-600">
                            {item.price} EGP
                          </p>
                        </div>

                        {/* Bottom Controls */}
                        <div className="mt-auto flex items-end justify-between pt-6">
                          {/* Quantity */}
                          <div className="flex items-center rounded-xl border border-gray-200 p-1">
                            <button
                              onClick={() =>
                                handleDecrease(
                                  item.product.id,
                                  item.count
                                )
                              }
                              className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-lg text-gray-500 transition hover:bg-gray-200"
                            >
                              −
                            </button>

                            <span className="flex h-10 w-12 items-center justify-center font-semibold text-gray-800">
                              {item.count}
                            </span>

                            <button
                              onClick={() =>
                                handleIncrease(
                                  item.product.id,
                                  item.count
                                )
                              }
                              className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-lg text-white transition hover:bg-emerald-700"
                            >
                              +
                            </button>
                          </div>

                          {/* Total + Delete */}
                          <div className="flex items-end gap-5">
                            <div className="text-right">
                              <p className="text-sm text-gray-400">
                                Total
                              </p>

                              <p className="text-2xl font-bold text-slate-900">
                                {(item.price * item.count).toFixed(0)}{" "}
                                <span className="text-base font-normal text-gray-400">
                                  EGP
                                </span>
                              </p>
                            </div>

                            <button
                              onClick={() =>
                                handleDelete(item.product.id)
                              }
                              className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition hover:bg-red-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                fill="currentColor"
                                className="h-3 w-3"
                              >
                                <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="mt-7 flex items-center justify-between border-t border-gray-200 pt-6">
                <Link
                  href="/"
                  className="font-medium text-emerald-600 transition hover:text-emerald-700"
                >
                  ← Continue Shopping
                </Link>

                <button
                  onClick={handleClearCart}
                  className="flex items-center gap-2 text-gray-400 transition hover:text-gray-600"
                >
                  <i className="fa-solid fa-trash-can"></i>
                  Clear all items
                </button>
              </div>
            </div>

            {/* Summary */}
            <CartSummary
              numOfCartItems={numOfCartItems}
              totalCartPrice={totalCartPrice}
            />
          </div>
        </div>
      </section>

      {/* Clear Cart Alert */}
      {showClearAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-xl bg-white px-8 py-8 text-center shadow-2xl">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
              <i className="fa-solid fa-cart-shopping text-4xl text-red-500"></i>
            </div>

            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              Clear Your Cart?
            </h2>

            <p className="mx-auto mt-4 max-w-md text-lg leading-7 text-gray-500">
              All items will be removed from your cart. This action cannot be
              undone.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setShowClearAlert(false)}
                className="rounded-xl bg-gray-100 px-7 py-4 text-lg font-semibold text-slate-700 transition hover:bg-gray-200"
              >
                Keep Shopping
              </button>

              <button
                onClick={confirmClearCart}
                className="rounded-xl bg-red-500 px-7 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-red-600"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}