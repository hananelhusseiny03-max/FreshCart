"use client";

import Link from "next/link";
import Image from "next/image";

import { useSelector } from "react-redux";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSearch,
  faHeart,
  faShoppingCart,
  faUser,
  faSignOutAlt,
  faIdCard,
  faUserPlus,
  faChevronDown,
  faHeadset,
  faBars,
  faTruck,
  faGift,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/images/freshcart-logo.svg";

import { AppState } from "@/app/features/authen/store/store";
import useLogout from "@/hooks/useLogout";

export default function Navbar() {
  const { logout } = useLogout();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { isAuthenticated } = useSelector(
    (appState: AppState) => appState.auth
  );

  const { numOfCartItems } = useSelector(
    (appState: AppState) => appState.cart
  );

  return (
    <>
      {/* Top Navbar */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="hidden lg:flex h-12 items-center justify-between text-sm text-gray-600">

            {/* Left Side */}
            <div className="flex items-center gap-8">

              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="text-primary-600"
                />

                <span>
                  Free Shipping on Orders 500 EGP
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faGift}
                  className="text-primary-600"
                />

                <span>
                  New Arrivals Daily
                </span>
              </div>

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5">

              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} />

                <a href="tel:+18001234567">
                  +1 (800) 123-4567
                </a>
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} />

                <a href="mailto:support@freshcart.com">
                  support@freshcart.com
                </a>
              </div>

              <div className="h-5 w-px bg-gray-200"></div>

              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />

                  <span>
                    Logout
                  </span>
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faUser} />

                    <span>
                      Sign In
                    </span>
                  </Link>

                  <Link
                    href="/signup"
                    className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faUserPlus} />

                    <span>
                      Sign Up
                    </span>
                  </Link>
                </>
              )}

            </div>
          </div>
        </div>
      </header>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">

        <div className="container mx-auto px-4">

          <div className="h-20 flex items-center gap-7">

            {/* Logo */}
            <Link href="/" className="shrink-0">

              <Image
                src={logo}
                alt="FreshCart"
                width={190}
                height={52}
                className="w-auto"
              />

            </Link>

            {/* Search */}
            <div className="relative flex-1 max-w-2xl hidden lg:block">

              <input
                type="text"
                className="w-full h-12 rounded-full border border-gray-200 bg-white pl-6 pr-14 outline-none focus:border-primary-500"
                placeholder="Search for products, brands and more..."
              />

              <button className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary-600 text-white flex items-center justify-center">

                <FontAwesomeIcon icon={faSearch} />

              </button>

            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 ml-auto whitespace-nowrap">

              <Link
                href="/"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Home
              </Link>

              <Link
                href="/products"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Shop
              </Link>

              <Link
                href="/categories"
                className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                Categories

                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-xs"
                />
              </Link>

              <Link
                href="/brands"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Brands
              </Link>

            </div>

            {/* Support */}
            <div className="hidden xl:flex items-center gap-3 border-r border-gray-200 pr-5">

              <div className="h-11 w-11 rounded-full bg-emerald-50 text-primary-600 flex items-center justify-center">

                <FontAwesomeIcon icon={faHeadset} />

              </div>

              <div className="leading-tight">

                <p className="text-xs text-gray-400">
                  Support
                </p>

                <p className="text-sm font-semibold text-gray-700">
                  24/7 Help
                </p>

              </div>

            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden lg:flex text-gray-500 hover:text-primary-600 transition-colors"
            >

              <FontAwesomeIcon
                icon={faHeart}
                className="text-xl"
              />

            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="hidden lg:flex relative text-gray-500 hover:text-primary-600 transition-colors"
            >

              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-xl"
              />

              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                {numOfCartItems}
              </span>

            </Link>

            {/* Auth */}
            {isAuthenticated ? (

              <button
                onClick={logout}
                className="hidden lg:flex h-11 px-6 rounded-full bg-primary-600 text-white items-center justify-center gap-2 hover:bg-primary-700 transition-colors"
              >

                <FontAwesomeIcon icon={faSignOutAlt} />

                Logout

              </button>

            ) : (

              <Link
                href="/login"
                className="hidden lg:flex h-11 px-6 rounded-full bg-primary-600 text-white items-center justify-center gap-2 hover:bg-primary-700 transition-colors"
              >

                <FontAwesomeIcon icon={faIdCard} />

                Sign In

              </Link>

            )}

            {/* Mobile Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden ml-auto h-10 w-10 rounded-lg bg-primary-600 text-white flex items-center justify-center"
            >

              <FontAwesomeIcon icon={faBars} />

            </button>

          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-4">

            <div className="relative">

              <input
                type="text"
                className="w-full h-11 rounded-full border border-gray-200 pl-5 pr-12 outline-none"
                placeholder="Search for products..."
              />

              <button className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center">

                <FontAwesomeIcon icon={faSearch} />

              </button>

            </div>

          </div>

        </div>

      </nav>
    </>
  );
}