import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.items.push(action.payload);
		},
		removeFromCart: (state, action) => {
			state.items = state.items.filter(
				(item) => item.id !== action.payload.id
			);
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectMedicines = (state, selectedSupplierId) =>
	state.cart.items.filter((item) => item.supplierId === selectedSupplierId);
export const selectCartTotal = (state) =>
	state.cart.items.reduce((total, item) => total + item.price, 0);

export default cartSlice.reducer;
