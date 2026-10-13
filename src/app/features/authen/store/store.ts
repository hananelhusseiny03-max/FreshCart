import { cartReducer, CartState } from './../cart/store/cart.slice';
import { authReducer, AuthState } from "@/app/features/authen/store/store.slice";
import { configureStore } from "@reduxjs/toolkit";

export type PreloadedState = {
  auth: AuthState;
  cart: CartState;
};

export function createStore(preloadedState: PreloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer
      
    },

    preloadedState,
  });

  return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;