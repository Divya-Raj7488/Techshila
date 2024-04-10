import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	snackbarOpen: false,
	snackbarMsg: "",
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addOneToCart: (state, action) => {
			const { medicineId, supplierId } = action.payload;
			const existingItem = state.items.find(
				(item) =>
					item.medicineId === medicineId &&
					item.supplierId === supplierId
			);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({ medicineId, supplierId, quantity: 1 });
			}
		},
		removeOneFromCart: (state, action) => {
			const { medicineId, supplierId } = action.payload;
			const existingItem = state.items.find(
				(item) =>
					item.medicineId === medicineId &&
					item.supplierId === supplierId
			);
			if (existingItem) {
				if (existingItem.quantity === 1) {
					state.items = state.items.filter(
						(item) =>
							item.medicineId !== medicineId ||
							item.supplierId !== supplierId
					);
				} else {
					existingItem.quantity -= 1;
				}
			}
		},
		addQuantity: (state, action) => {
			const { medicineId, supplierId, quantity, name } = action.payload;
			const existingItem = state.items.find(
				(item) =>
					item.medicineId === medicineId &&
					item.supplierId === supplierId
			);

			if (existingItem) {
				existingItem.quantity = quantity;
			} else {
				state.items.push({ medicineId, supplierId, quantity });
			}
			state.snackbarMsg = `${name} added to cart`;
			state.snackbarOpen = true;
		},
		removeItem: (state, action) => {
			const { medicineId, supplierId } = action.payload;
			state.items = state.items.filter(
				(item) =>
					item.medicineId !== medicineId ||
					item.supplierId !== supplierId
			);
		},
		clearCart: (state) => {
			state.items = [];
		},
		closeSnackbar: (state) => {
			state.snackbarOpen = false;
		},
	},
});

export const {
	addOneToCart,
	removeOneFromCart,
	addQuantity,
	removeItem,
	clearCart,
	closeSnackbar,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectMedicines = (state, selectedSupplierId) =>
	state.cart.items.filter((item) => item.supplierId === selectedSupplierId);
export const selectCartTotal = (state) =>
	state.cart.items.reduce((total, item) => total + item.price, 0);

export default cartSlice.reducer;
