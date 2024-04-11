import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { inventoryApi } from "../Links.js";

export const getInventories = createAsyncThunk("inventorys/get", async () => {
	return axios
		.get(inventoryApi)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const getInventory = createAsyncThunk("inventory/get", async (id) => {
	return axios
		.get(`${inventoryApi}${id}/`)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const createInventory = createAsyncThunk(
	"inventory/add",
	async (inventoryData) => {
		return axios
			.post(inventoryApi, inventoryData)
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error("Invalid inventoryname or password");
				}
			})
			.catch((error) => {
				throw new Error(
					error.response.data.message || "An error occurred"
				);
			});
	}
);

const inventorySlice = createSlice({
	name: "inventory",
	initialState: {
		loading: false,
		inventorysList: null,
		open: false,
		selectedInventory: null,
		error: "",
	},
	reducers: {
		setInventory: (state, action) => {
			state.selectedInventory = action.payload;
		},
		setDialogOpen: (state) => {
			state.open = !state.open;
		},
		resetInventory: (state) => {
			state.selectedInventory = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getInventory.pending, (state) => {
				state.loading = true;
			})
			.addCase(getInventory.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedInventory = action.payload;
				state.error = "";
			})
			.addCase(getInventory.rejected, (state, action) => {
				state.loading = false;
				state.selectedInventory = [];
				state.error = action.error.message;
			})
			.addCase(getInventories.pending, (state) => {
				state.loading = true;
			})
			.addCase(getInventories.fulfilled, (state, action) => {
				state.loading = false;
				state.inventorysList = action.payload;
				state.error = "";
			})
			.addCase(getInventories.rejected, (state, action) => {
				state.loading = false;
				state.inventorysList = [];
				state.error = action.error.message;
			})
			.addCase(createInventory.pending, (state) => {
				state.loading = true;
			})
			.addCase(createInventory.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedInventory = [];
				state.error = "";
			})
			.addCase(createInventory.rejected, (state, action) => {
				state.loading = false;
				state.selectedInventory = [];
				state.error = action.error.message;
			});
	},
});

export default inventorySlice.reducer;
export const { setInventory, setDialogOpen, resetInventory } =
	inventorySlice.actions;
