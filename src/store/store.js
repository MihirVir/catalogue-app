import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import categoryReducer from "../slices/categorySlice";
import productReducer from "../slices/productSlice";
import searchReducer from "../slices/searchSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    search: searchReducer,
  },
});
