import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/cart.types";

export interface CartState {
  numOfCartItems: number;
  cartId: string | null;
  products: CartItem[];
  totalCartPrice: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  numOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartInfo: (state, action: PayloadAction<CartState>) => {
      state.numOfCartItems = action.payload.numOfCartItems;
      state.cartId = action.payload.cartId;
      state.products = action.payload.products;
      state.totalCartPrice = action.payload.totalCartPrice;
      state.isLoading = action.payload.isLoading;
      state.error = action.payload.error;
    },
  },
});

export const { setCartInfo } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;