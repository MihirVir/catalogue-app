import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: "",
  },
  reducers: {
    options: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { options } = categorySlice.actions;
export const categorySelector = (state) => state.category.category;
export default categorySlice.reducer;
