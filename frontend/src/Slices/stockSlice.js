import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { stockApi } from "../Links.js";

export const getStocks = createAsyncThunk("stocks/get", async () => {
	return axios
		.get(stockApi)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const createStock = createAsyncThunk("stock/add", async (stockData) => {
	return axios
		.post(stockApi, stockData)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error("Invalid stockname or password");
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

const stockSlice = createSlice({
	name: "stock",
	initialState: {
		loading: false,
		stocksList: null,
		open: false,
		selectedStock: null,
		error: "",
	},
	reducers: {
		setStockID: (state, action) => {
			state.selectedStock = action.payload;
		},
		setDialogOpen: (state) => {
			state.open = !state.open;
		},
		resetStock: (state) => {
			state.selectedStock = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getStocks.pending, (state) => {
				state.loading = true;
			})
			.addCase(getStocks.fulfilled, (state, action) => {
				state.loading = false;
				state.stocksList = action.payload;
				state.error = "";
			})
			.addCase(getStocks.rejected, (state, action) => {
				state.loading = false;
				state.stocksList = [];
				state.error = action.error.message;
			})
			.addCase(createStock.pending, (state) => {
				state.loading = true;
			})
			.addCase(createStock.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedStock = [];
				state.error = "";
			})
			.addCase(createStock.rejected, (state, action) => {
				state.loading = false;
				state.selectedStock = [];
				state.error = action.error.message;
			});
	},
});

export default stockSlice.reducer;
export const { setStockID, setDialogOpen, resetStock } = stockSlice.actions;
