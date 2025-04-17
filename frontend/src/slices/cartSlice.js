// src/slices/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cart.utils";

const initialState = {
  cartItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

// Hydrate from localStorage if available
const storedCart = localStorage.getItem("cart");
if (storedCart) {
  try {
    const parsed = JSON.parse(storedCart);
    if (Array.isArray(parsed.cartItems)) {
      Object.assign(initialState, parsed);
    }
  } catch (e) {
    console.warn("Failed to parse cart from localStorage:", e);
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }

      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
