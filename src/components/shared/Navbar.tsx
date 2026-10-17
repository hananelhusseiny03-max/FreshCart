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
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const { isAuthenticated } = useSelector(
    (appState: AppState) => appState.auth
  );

  const { numOfCartItems } = useSelector(
    (appState: AppState) => appState.cart
  );

  const categories = [
    { name: "All Categories", href: "/categories" },
    { name: "Electronics", href: "/categories/electronics" },
    { name: "Women's Fashion", href: "/categories/womens-fashion" },
    { name: "Men's Fashion", href: "/categories/mens-fashion" },
    { name: "Beauty & Health", href: "/categories/beauty-health" },
  ];

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
                <span>Free Shipping on Orders 500 EGP</span>
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faGift}
                  className="text-primary-600"
                />
                <span>New Arrivals Daily</span>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+18001234567">+1 (800) 123-4567</a>
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:support@freshcart.com">
                  support@freshcart.com
                </a>
              </div>

              <div className="h-5 w-px bg-gray-200" />

              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span>Sign In</span>
                  </Link>

                  <Link
                    href="/signup"
                    className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>Sign Up</span>
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

              <button
                type="button"
                aria-label="Search"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary-600 text-white flex items-center justify-center"
              >
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
                href="/shop"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Shop
              </Link>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setIsCategoriesOpen((prev) => !prev)
                  }
                  aria-expanded={isCategoriesOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-2 transition-colors ${
                    isCategoriesOpen
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                  }`}
                >
                  Categories

                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-xs transition-transform duration-200 ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCategoriesOpen && (
                  <div className="absolute left-0 top-full mt-5 w-250px rounded-2xl border border-gray-100 bg-white py-2 shadow-lg z-60">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={() => setIsCategoriesOpen(false)}
                        className="block px-5 py-3 text-[17px] text-gray-600 transition-colors hover:bg-emerald-50 hover:text-primary-600"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

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
                <p className="text-xs text-gray-400">Support</p>
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
              <FontAwesomeIcon icon={faHeart} className="text-xl" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="hidden lg:flex relative text-gray-500 hover:text-primary-600 transition-colors"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />

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
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
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

              <button
                type="button"
                aria-label="Search"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4 space-y-4">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-primary-600"
              >
                Home
              </Link>

              <Link
                href="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-primary-600"
              >
                Shop
              </Link>

              <div>
                <button
                  type="button"
                  onClick={() =>
                    setIsCategoriesOpen((prev) => !prev)
                  }
                  aria-expanded={isCategoriesOpen}
                  className="flex w-full items-center justify-between text-gray-700 hover:text-primary-600"
                >
                  Categories
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-xs transition-transform duration-200 ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCategoriesOpen && (
                  <div className="mt-3 ml-3 border-l-2 border-emerald-100 pl-3 space-y-1">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={() => {
                          setIsCategoriesOpen(false);
                          setIsMenuOpen(false);
                        }}
                        className="block rounded-lg px-3 py-2 text-gray-600 hover:bg-emerald-50 hover:text-primary-600"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/brands"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-primary-600"
              >
                Brands
              </Link>

              <Link
                href="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-primary-600"
              >
                Wishlist
              </Link>

              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-primary-600"
              >
                Cart ({numOfCartItems})
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}