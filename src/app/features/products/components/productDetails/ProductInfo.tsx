"use client";

import Link from "next/link";
import { useState } from "react";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faCartShopping,
  faMinus,
  faPlus,
  faShareNodes,
  faTruckFast,
  faBolt,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { Product } from "../../types/Products.types";

export default function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const isLowStock = product.quantity > 0 && product.quantity <= 5;

  const images = product.images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  const increaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <section id="product-detail" className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Product Images */}
          <div id="product-images" className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">

              <ImageGallery
                items={images}
                showPlayButton={true}
                showFullscreenButton={true}
                showNav={true}
                showBullets={false}
                thumbnailPosition="bottom"
                autoPlay={true}
                slideInterval={3000}
              />

            </div>
          </div>

          {/* Product Info */}
          <div id="product-info" className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6">

              {/* Category & Brand */}
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-emerald-50 text-emerald-600 px-3 py-2 rounded-full text-sm">
                  {product.category.name}
                </span>

                <span className="bg-gray-100 text-gray-600 px-3 py-2 rounded-full text-sm">
                  {product.brand.name}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-slate-900 mb-3">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-yellow-400 text-lg">
                  ★★★★★
                </div>

                <span className="text-gray-600">
                  {product.ratingsAverage} ({product.ratingsQuantity} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-slate-900 mb-5">
                {product.price} EGP
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.quantity > 0 ? (
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isLowStock ? "bg-yellow-600" : "bg-green-500"
                      }`}
                    ></span>

                    {isLowStock
                      ? `Only ${product.quantity} left - Order soon!`
                      : "In Stock"}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-700">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="border-t border-gray-100 pt-5">

                {/* Description */}
                <p className="text-gray-600 mb-5">
                  {product.description}
                </p>

                {/* Quantity */}
                <div className="mb-5">
                  <p className="text-gray-700 mb-2">
                    Quantity
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">

                      <button
                        onClick={decreaseQuantity}
                        disabled={quantity === 1}
                        className="h-11 w-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>

                      <span className="h-11 w-12 flex items-center justify-center border-x border-gray-200">
                        {quantity}
                      </span>

                      <button
                        onClick={increaseQuantity}
                        disabled={quantity === product.quantity}
                        className="h-11 w-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>

                    </div>

                    <span className="text-sm text-gray-400">
                      {product.quantity} available
                    </span>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-gray-50 rounded-lg px-4 py-4 flex items-center justify-between mb-5">
                  <span className="text-gray-600">
                    Total Price:
                  </span>

                  <span className="text-xl font-bold text-emerald-600">
                    {(product.price * quantity).toFixed(2)} EGP
                  </span>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">

                  <button className="h-12 rounded-lg bg-emerald-600 text-white flex items-center justify-center gap-2 hover:bg-emerald-700 transition">
                    <FontAwesomeIcon icon={faCartShopping} />
                    Add to Cart
                  </button>

                  <button className="h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center gap-2 hover:bg-slate-800 transition">
                    <FontAwesomeIcon icon={faBolt} />
                    Buy Now
                  </button>

                </div>

                {/* Wishlist & Share */}
                <div className="grid grid-cols-[1fr_auto] gap-3 mb-5">

                  <button className="h-11 rounded-lg border border-gray-200 text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50">
                    <FontAwesomeIcon icon={faHeart} />
                    Add to Wishlist
                  </button>

                  <button className="h-11 w-12 rounded-lg border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-50">
                    <FontAwesomeIcon icon={faShareNodes} />
                  </button>

                </div>

                {/* Features */}
                <div className="border-t border-gray-100 pt-5">

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faTruckFast} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Free Delivery
                        </p>

                        <p className="text-xs text-gray-400">
                          Orders over $50
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faArrowRotateLeft} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          30 Days Return
                        </p>

                        <p className="text-xs text-gray-400">
                          Money back
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faShieldHalved} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Secure Payment
                        </p>

                        <p className="text-xs text-gray-400">
                          100% Protected
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}