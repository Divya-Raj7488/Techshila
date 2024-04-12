import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createOrderApi, orderApi } from "../Links.js";

export const getOrders = createAsyncThunk("orders/get", async () => {
	return axios
		.get(orderApi)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const sendOrder = createAsyncThunk("order/add", async (orderData) => {
	return axios
		.post(createOrderApi, orderData)
		.then((response) => {
			if (response.status === 201) {
				return response.data;
			} else {
				throw new Error("Invalid ordername or password");
			}
		})
		.catch((error) => {
			throw new Error(
				error.response?.data?.message || "An error occurred"
			);
		});
});

const orderSlice = createSlice({
	name: "order",
	initialState: {
		loading: false,
		ordersList: null,
		open: false,
		selectedOrder: null,
		error: "",
	},
	reducers: {
		setOrderID: (state, action) => {
			state.selectedOrder = action.payload;
		},
		setDialogOpen: (state) => {
			state.open = !state.open;
		},
		resetOrder: (state) => {
			state.selectedOrder = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOrders.pending, (state) => {
				state.loading = true;
			})
			.addCase(getOrders.fulfilled, (state, action) => {
				state.loading = false;
				state.ordersList = action.payload;
				state.error = "";
			})
			.addCase(getOrders.rejected, (state, action) => {
				state.loading = false;
				state.ordersList = [];
				state.error = action.error.message;
			})
			.addCase(sendOrder.pending, (state) => {
				state.loading = true;
			})
			.addCase(sendOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedOrder = action.payload["order"];
				state.error = "";
			})
			.addCase(sendOrder.rejected, (state, action) => {
				state.loading = false;
				state.selectedOrder = [];
				state.error = action.error.message;
			});
	},
});

export default orderSlice.reducer;
export const { setOrderID, setDialogOpen, resetOrder } = orderSlice.actions;
