"use client";

import { FormEvent, useState } from "react";
import CheckOutSummary from "./checkOut.summary";

export default function CheckOutScreen() {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");

  const [errors, setErrors] = useState({
    city: "",
    address: "",
    phone: "",
    paymentMethod: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      city: "",
      address: "",
      phone: "",
      paymentMethod: "",
    };

    if (!city) {
      newErrors.city = "City is required";
    } else if (!/^[A-Za-z\s]+$/.test(city)) {
      newErrors.city = "City must contain letters only";
    } else if (city.length < 4) {
      newErrors.city = "City must be at least 4 characters";
    } else if (city.length > 12) {
      newErrors.city = "City must not exceed 12 characters";
    }

    if (!address) {
      newErrors.address = "Address is required";
    } else if (!/^[A-Za-z0-9\s]+$/.test(address)) {
      newErrors.address =
        "Address must contain letters and numbers only";
    } else if (address.length !== 20) {
      newErrors.address = "Address must be 20 characters";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(010|011|012|015)\d{8}$/.test(phone)) {
      newErrors.phone = "Enter a valid Egyptian phone number";
    }

    if (!paymentMethod) {
      newErrors.paymentMethod = "Payment method is required";
    }

    setErrors(newErrors);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 3h12v18H6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 7h6M9 11h6M9 15h4"
                  />
                </svg>
              </div>

              <h1 className="text-4xl font-bold text-slate-900">
                Complete Your Order
              </h1>
            </div>

            <p className="mt-2 text-lg text-gray-500">
              Review your items and complete your purchase
            </p>
          </div>

          <a
            href="/cart"
            className="mt-8 flex items-center gap-2 text-lg font-medium text-emerald-600 transition hover:text-emerald-700"
          >
            <span className="text-2xl">←</span>
            Back to Cart
          </a>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
            {/* Left Side */}
            <div className="space-y-8">
              {/* Shipping Address */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="bg-emerald-600 px-7 py-5">
                  <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M12 2 3 9v11a2 2 0 0 0 2 2h5v-6h4v6h5a2 2 0 0 0 2-2V9l-9-7Z" />
                    </svg>

                    Shipping Address
                  </h2>

                  <p className="mt-2 text-lg text-white">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="p-7">
                  {/* Delivery Information */}
                  <div className="mb-7 flex items-center gap-4 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-blue-600"
                      >
                        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z" />
                      </svg>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-blue-700">
                        Delivery Information
                      </p>

                      <p className="mt-1 text-sm text-blue-600">
                        Please ensure your address is accurate for smooth
                        delivery
                      </p>
                    </div>
                  </div>

                  {/* City */}
                  <div className="mb-6">
                    <label className="mb-2 block text-base font-semibold text-slate-800">
                      City <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-gray-500"
                        >
                          <path d="M4 22h16v-2H4Zm2-4h12V4H6Zm3-9h2v2H9Zm4 0h2v2h-2ZM9 5h2v2H9Zm4 0h2v2h-2Z" />
                        </svg>
                      </div>

                      <input
                        type="text"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        placeholder="e.g. Cairo, Alexandria, Giza"
                        className={`h-16 w-full rounded-xl border bg-white pl-16 pr-4 text-lg text-slate-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 ${
                          errors.city
                            ? "border-red-400"
                            : "border-gray-300"
                        }`}
                      />
                    </div>

                    {errors.city && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="mb-6">
                    <label className="mb-2 block text-base font-semibold text-slate-800">
                      Street Address <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-gray-500"
                        >
                          <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
                        </svg>
                      </div>

                      <textarea
                        value={address}
                        onChange={(event) =>
                          setAddress(event.target.value)
                        }
                        placeholder="Street name, building number, floor, apartment..."
                        className={`min-h-30 w-full resize-none rounded-xl border bg-white py-5 pl-16 pr-4 text-lg text-slate-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 ${
                          errors.address
                            ? "border-red-400"
                            : "border-gray-300"
                        }`}
                      />
                    </div>

                    {errors.address && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-2 block text-base font-semibold text-slate-800">
                      Phone Number <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-gray-500"
                        >
                          <path d="M6.6 2.5 9.1 2a1 1 0 0 1 1.1.6l1.5 3.6a1 1 0 0 1-.3 1.1L9.9 8.7a13.5 13.5 0 0 0 5.4 5.4l1.4-1.5a1 1 0 0 1 1.1-.3l3.6 1.5a1 1 0 0 1 .6 1.1l-.5 2.5a2 2 0 0 1-2 1.6A16.5 16.5 0 0 1 4.9 4.5a2 2 0 0 1 1.7-2Z" />
                        </svg>
                      </div>

                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={11}
                        value={phone}
                        onChange={(event) => {
                          const value = event.target.value;

                          if (/^\d*$/.test(value)) {
                            setPhone(value);
                          }
                        }}
                        placeholder="01xxxxxxxxx"
                        className={`h-16 w-full rounded-xl border bg-white pl-16 pr-44 text-lg text-slate-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 ${
                          errors.phone
                            ? "border-red-400"
                            : "border-gray-300"
                        }`}
                      />

                      <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        Egyptian numbers only
                      </span>
                    </div>

                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="bg-emerald-600 px-7 py-5">
                  <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm2 2v3h14V8Zm2 6v2h4v-2Z" />
                    </svg>

                    Payment Method
                  </h2>

                  <p className="mt-2 text-lg text-white">
                    Choose how you'd like to pay
                  </p>
                </div>

                <div className="space-y-5 p-7">
                  {/* Cash on Delivery */}
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-6 transition ${
                      paymentMethod === "cash"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-emerald-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`flex h-20 w-20 items-center justify-center rounded-2xl ${
                          paymentMethod === "cash"
                            ? "bg-emerald-500"
                            : "bg-gray-100"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`h-8 w-8 ${
                            paymentMethod === "cash"
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        >
                          <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                          />
                          <circle cx="12" cy="12" r="3" />
                          <path d="M7 9h.01M17 15h.01" />
                        </svg>
                      </div>

                      <div>
                        <p className="text-xl font-bold text-emerald-700">
                          Cash on Delivery
                        </p>

                        <p className="mt-1 text-lg text-gray-500">
                          Pay when your order arrives at your doorstep
                        </p>
                      </div>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m5 12 4 4L19 6"
                        />
                      </svg>
                    </div>

                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                      className="sr-only"
                    />
                  </label>

                  {/* Pay Online */}
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-6 transition ${
                      paymentMethod === "card"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-emerald-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`flex h-20 w-20 items-center justify-center rounded-2xl ${
                          paymentMethod === "card"
                            ? "bg-emerald-500"
                            : "bg-gray-100"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`h-8 w-8 ${
                            paymentMethod === "card"
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        >
                          <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                          />
                          <path d="M3 10h18M7 15h4" />
                        </svg>
                      </div>

                      <div>
                        <p className="text-xl font-bold text-slate-900">
                          Pay Online
                        </p>

                        <p className="mt-1 text-lg text-gray-500">
                          Secure payment with Credit/Debit Card via Stripe
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <span className="rounded bg-blue-700 px-1.5 py-0.5 text-[9px] font-bold text-white">
                            VISA
                          </span>

                          <span className="rounded bg-yellow-400 px-1.5 py-0.5 text-[9px] font-bold text-red-600">
                            MC
                          </span>

                          <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                            AMEX
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        paymentMethod === "card"
                          ? "border-emerald-600 bg-emerald-600"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      {paymentMethod === "card" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2.5"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m5 12 4 4L19 6"
                          />
                        </svg>
                      )}
                    </div>

                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="sr-only"
                    />
                  </label>

                  {errors.paymentMethod && (
                    <p className="text-sm text-red-500">
                      {errors.paymentMethod}
                    </p>
                  )}

                  {/* Secure & Encrypted */}
                  <div className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6 text-emerald-600"
                      >
                        <path d="M12 2 4 5v6c0 5.1 3.4 9.8 8 11 4.6-1.2 8-5.9 8-11V5Zm0 4 5 1.9V11c0 3.7-2.2 7.2-5 8.2C9.2 18.2 7 14.7 7 11V7.9Z" />
                      </svg>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-emerald-700">
                        Secure & Encrypted
                      </p>

                      <p className="mt-1 text-sm text-emerald-600">
                        Your payment info is protected with 256-bit SSL
                        encryption
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <CheckOutSummary />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}