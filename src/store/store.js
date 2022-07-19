import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./slices/authSlice/AuthSlice";
import CartSliceReducer from "./slices/cartSlice/CartSlice";
import DataSliceReducer from "./slices/dataSlice/DataSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    cart: CartSliceReducer,
    data: DataSliceReducer,
  },
});
