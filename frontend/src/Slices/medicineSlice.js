import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";
import { medicineApi } from "../Links.js";

export const getMedicines = createAsyncThunk("medicines/get", async () => {
	return axios
		.get(medicineApi)
		.then((response) => {
			if (response.status === 200) {
				return response.data.medicines;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const getMedicine = createAsyncThunk("medicine/get", async (id) => {
	return axios
		.get(`${medicineApi}${id}/`)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const createMedicine = createAsyncThunk(
	"medicine/add",
	async (medicineData) => {
		return axios
			.post(medicineApi, medicineData)
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error("Invalid medicinename or password");
				}
			})
			.catch((error) => {
				throw new Error(
					error.response.data.message || "An error occurred"
				);
			});
	}
);

const medicineSlice = createSlice({
	name: "medicine",
	initialState: {
		loading: false,
		medicinesList: null,
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
			.addCase(getMedicines.pending, (state) => {
				state.loading = true;
			})
			.addCase(getMedicines.fulfilled, (state, action) => {
				state.loading = false;
				state.medicinesList = action.payload;
				state.error = "";
			})
			.addCase(getMedicines.rejected, (state, action) => {
				state.loading = false;
				state.medicinesList = [];
				state.error = action.error.message;
			})
			.addCase(createMedicine.pending, (state) => {
				state.loading = true;
			})
			.addCase(createMedicine.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedMedicine = [];
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
