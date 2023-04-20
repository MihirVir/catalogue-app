import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    list: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { list } = productSlice.actions;
export const productSelector = (state) => state.products.products;
export default productSlice.reducer;
