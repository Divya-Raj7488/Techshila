import { configureStore } from "@reduxjs/toolkit";
import supplierReducer from "./Slices/supplierSlice";
import cartReducer from "./Slices/cartSlice";
import stockReducer from "./Slices/stockSlice";

const store = configureStore({
	reducer: {
		supplier: supplierReducer,
		cart: cartReducer,
		stock: stockReducer,
	},
});

export default store;
