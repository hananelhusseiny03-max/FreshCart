import lightLogo from "../../assets/images/freshcart-logo.svg";
import miniLogo from "../../assets/images/mini-logo.png";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-[#111827] border-t border-gray-800 pt-10 text-gray-400"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src={lightLogo}
                alt="FreshCart Logo"
                width={180}
                height={50}
                className="w-auto"
              />
            </Link>

            <p className="text-gray-400 mb-4">
              FreshCart is a versatile e-commerce platform offering a wide
              range of products, from clothing to electronics. It provides a
              user-friendly experience for seamless shopping across diverse
              categories.
            </p>

            <div className="flex space-x-4">
              <span className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                <FontAwesomeIcon icon={faFacebook} />
              </span>

              <span className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                <FontAwesomeIcon icon={faTwitter} />
              </span>

              <span className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                <FontAwesomeIcon icon={faInstagram} />
              </span>

              <span className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                <FontAwesomeIcon icon={faPinterest} />
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">
              Categories
            </h3>

            <ul className="space-y-3">
              <li className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                Men&apos;s Fashion
              </li>
              <li className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                Women&apos;s Fashion
              </li>
              <li className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                Baby &amp; Toys
              </li>
              <li className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                Beauty &amp; Health
              </li>
              <li className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                Electronics
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                About Us
              </li>
              <li className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                Contact Us
              </li>
              <li className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                Privacy Policy
              </li>
              <li className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                Terms of Service
              </li>
              <li className="text-gray-400 hover:text-emerald-500 cursor-pointer transition">
                Shipping Policy
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">
              Customer Service
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/account"
                  className="text-gray-400 hover:text-emerald-500 transition"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-gray-400 hover:text-emerald-500 transition"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-gray-400 hover:text-emerald-500 transition"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-400 hover:text-emerald-500 transition"
                >
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-gray-400 hover:text-emerald-500 transition"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} FreshCart. All rights reserved.
            </p>

            <div className="flex items-center space-x-4">
              <Image
                src={miniLogo}
                alt="FreshCart Mini Logo"
                className="size-6"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}