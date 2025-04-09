import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItem: [] };

const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItem.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItem = state.cartItem.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItem = [...state.cartItem, item];
      }

      //calculate items price
      state.itemsPrice = addDecimal(
        state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      //calculate shipping price
      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10); //free shipping for orders over $100
      //calculate tax price
      state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2))); //15% tax
      //calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2); //total price
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },
  },
});
export const { addtoCart } = cartSlice.actions;

export default cartSlice.reducer;
