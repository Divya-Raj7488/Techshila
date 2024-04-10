import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { supplierApi } from "../Links.js";

export const getSuppliers = createAsyncThunk("suppliers/get", async () => {
	return axios
		.get(supplierApi)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const getSupplier = createAsyncThunk("supplier/get", async (id) => {
	return axios
		.get(`${supplierApi}${id}/`)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const createSupplier = createAsyncThunk(
	"supplier/add",
	async (supplierData) => {
		return axios
			.post(supplierApi, supplierData)
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error("Invalid suppliername or password");
				}
			})
			.catch((error) => {
				throw new Error(
					error.response.data.message || "An error occurred"
				);
			});
	}
);

const supplierSlice = createSlice({
	name: "supplier",
	initialState: {
		loading: false,
		suppliersList: null,
		open: false,
		selectedSupplier: null,
		error: "",
	},
	reducers: {
		setSupplierID: (state, action) => {
			state.selectedSupplier = action.payload;
		},
		setDialogOpen: (state) => {
			state.open = !state.open;
		},
		resetSupplier: (state) => {
			state.selectedSupplier = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSupplier.pending, (state) => {
				state.loading = true;
			})
			.addCase(getSupplier.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedSupplier = action.payload;
				state.error = "";
			})
			.addCase(getSupplier.rejected, (state, action) => {
				state.loading = false;
				state.selectedSupplier = [];
				state.error = action.error.message;
			})
			.addCase(getSuppliers.pending, (state) => {
				state.loading = true;
			})
			.addCase(getSuppliers.fulfilled, (state, action) => {
				state.loading = false;
				state.suppliersList = action.payload;
				state.error = "";
			})
			.addCase(getSuppliers.rejected, (state, action) => {
				state.loading = false;
				state.suppliersList = [];
				state.error = action.error.message;
			})
			.addCase(createSupplier.pending, (state) => {
				state.loading = true;
			})
			.addCase(createSupplier.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedSupplier = [];
				state.error = "";
			})
			.addCase(createSupplier.rejected, (state, action) => {
				state.loading = false;
				state.selectedSupplier = [];
				state.error = action.error.message;
			});
	},
});

export default supplierSlice.reducer;
export const { setSupplierID, setDialogOpen, resetSupplier } =
	supplierSlice.actions;
