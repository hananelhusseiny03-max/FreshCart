import { ReactNode } from "react";
import "../styles/globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ToastContainer, Bounce } from "react-toastify";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Exo } from "next/font/google";
import Providers from "./features/authen/components/providers/Providers";
import { verifyToken } from "./features/authen/server/auth.actions";
import { getLoggedUserCart } from "./features/authen/cart/server/cart.actions";
import { CartState } from "./features/authen/cart/store/cart.slice";

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});

const defaultCartState: CartState = {
  cartId: null,
  numOfCartItems: 0,
  totalCartPrice: 0,
  products: [],
  error: null,
  isLoading: false,
};

export default async function Rootlayout({
  children,
}: {
  children: ReactNode;
}) {
  const authValues = await verifyToken();

  let cartState: CartState = defaultCartState;

  if (authValues.isAuthenticated) {
    try {
      const cartResponse = await getLoggedUserCart();

      cartState = {
        cartId: cartResponse.cartId,
        totalCartPrice: cartResponse.data.totalCartPrice,
        products: cartResponse.data.products,
        numOfCartItems: cartResponse.numOfCartItems,
        isLoading: false,
        error: null,
      };
    } catch (error) {
      cartState = defaultCartState;
    }
  }

  return (
    <html lang="en">
      <body className={`${exo.className} font-normal`}>
        <Providers
          preloadedState={{
            auth: authValues,
            cart: cartState,
          }}
        >
          <Navbar />

          {children}

          <Footer />

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </Providers>
      </body>
    </html>
  );
}

