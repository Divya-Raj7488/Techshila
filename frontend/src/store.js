import { configureStore } from "@reduxjs/toolkit";
import supplierReducer from "./Slices/supplierSlice";
import cartReducer from "./Slices/cartSlice";

const store = configureStore({
	reducer: {
		supplier: supplierReducer,
		cart: cartReducer,
	},
});

export default store;
