import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stockApi, summaryApi } from "../Links";
import axios from "axios";

export const getSummary = createAsyncThunk(
	"stockOrder/getSummary",
	async (stockOrderData) => {
		return axios
			.post(summaryApi, stockOrderData)
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error("Invalid stock order name or password");
				}
			})
			.catch((error) => {
				throw new Error(
					error.response?.data.message || "An error occurred"
				);
			});
	}
);

export const createOrder = createAsyncThunk(
	"stockOrder/add",
	async (stockOrderData) => {
		console.log(stockOrderData);
		return axios
			.post(stockApi, stockOrderData)
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error("Invalid stockOrdername or password");
				}
			})
			.catch((error) => {
				throw new Error(
					error.response.data.message || "An error occurred"
				);
			});
	}
);

const initialState = {
	items: [],
	snackbarOpen: false,
	snackbarMsg: "",
	summary: [],
	open: false,
	totalPrice: 0,
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
		buyMedicines: (state, action) => {
			const { medicineId, inventoryId, quantity, name, price } =
				action.payload;
			console.log(price);
			const existingItem = state.items.find(
				(item) =>
					item.medicineId === medicineId &&
					item.inventoryId === inventoryId
			);

			if (existingItem) {
				existingItem.quantity = quantity;
			} else {
				state.items.push({
					medicineId,
					inventoryId,
					quantity,
					price,
					name,
				});
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
		setOrderDialog: (state) => {
			state.open = !state.open;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSummary.pending, (state) => {
				state.loading = true;
			})
			.addCase(getSummary.fulfilled, (state, action) => {
				state.loading = false;
				state.summary = action.payload.orderedMedicines;
				state.totalPrice = action.payload.totalPrice;
				state.error = "";
			})
			.addCase(getSummary.rejected, (state, action) => {
				state.loading = false;
				state.summary = [];
				state.error = action.error.message;
			})
			.addCase(createOrder.pending, (state) => {
				state.loading = true;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.items = [];
				state.error = "";
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const {
	addOneToCart,
	removeOneFromCart,
	addQuantity,
	removeItem,
	clearCart,
	closeSnackbar,
	setOrderDialog,
	buyMedicines,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectMedicines = (state, selectedOrderId) =>
	state.cart.items.filter((item) => item.supplierId === selectedSupplierId);
export const selectCartTotal = (state) =>
	state.cart.items.reduce((total, item) => total + item.price, 0);

export default cartSlice.reducer;
