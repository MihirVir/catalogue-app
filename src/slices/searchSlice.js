import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: null,
  },
  reducers: {
    searcher: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { searcher } = searchSlice.actions;
export const searchSelector = (state) => state.search.search;
export default searchSlice.reducer;
