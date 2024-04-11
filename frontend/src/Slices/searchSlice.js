import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MedicineApi } from "../Links.js";

export const getSuppliers = createAsyncThunk("medicine/get", async () => {
	return axios
		.get(MedicineApi)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const getSupplier = createAsyncThunk("medicine/get", async (id) => {
	return axios
		.get(`${MedicineApi}${id}/`)
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
	"medicine/add",
	async (medicineData) => {
		return axios
			.post(MedicineApi, medicineData)
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
	name: "medicine",
	initialState: {
		loading: false,
		medicineList: null,
		open: false,
		selectedMedicine: null,
		error: "",
	},
	reducers: {
		setMedicineID: (state, action) => {
			state.selectedMedicine = action.payload;
		},
		setDialogOpen: (state) => {
			state.open = !state.open;
		},
		resetMedicine: (state) => {
			state.selectedMedicine = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMedicine.pending, (state) => {
				state.loading = true;
			})
			.addCase(getMedicine.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedMedicine = action.payload;
				state.error = "";
			})
			.addCase(getMedicine.rejected, (state, action) => {
				state.loading = false;
				state.selectedMedicine = [];
				state.error = action.error.message;
			})
			.addCase(getMedicine.pending, (state) => {
				state.loading = true;
			})
			.addCase(getMedicine.fulfilled, (state, action) => {
				state.loading = false;
				state.medicineList = action.payload;
				state.error = "";
			})
			.addCase(getMedicine.rejected, (state, action) => {
				state.loading = false;
				state.medicineList = [];
				state.error = action.error.message;
			})
			.addCase(createMedicine.pending, (state) => {
				state.loading = true;
			})
			.addCase(createMedicine.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedMedicine =action.payload;
				state.error = "";
			})
			.addCase(createMedicine.rejected, (state, action) => {
				state.loading = false;
				state.selectedMedicine = [];
				state.error = action.error.message;
			});
	},
});

export default medicineSlice.reducer;
export const { setMedicineID, setDialogOpen, resetMedicine } =
	medicineSlice.actions;
