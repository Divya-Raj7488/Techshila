import { configureStore } from "@reduxjs/toolkit";
import supplierReducer from "./Slices/supplierSlice";
import cartReducer from "./Slices/cartSlice";
import stockReducer from "./Slices/stockSlice";
import managerReducer from "./Slices/managerSlice";
import inventoryReducer from "./Slices/inventorySlice";

const store = configureStore({
	reducer: {
		supplier: supplierReducer,
		cart: cartReducer,
		stock: stockReducer,
		manager: managerReducer,
		inventory: inventoryReducer,
	},
});

export default store;
