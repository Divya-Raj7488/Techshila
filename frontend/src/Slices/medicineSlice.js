import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { medicineApi } from "../Links";

// Define your initial state
const initialState = {
  medicineList: [],
  status: "idle",
  error: null,
};
 

export const addMedicine = createAsyncThunk(
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

// Define the medicine slice
const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
        .addCase(addMedicine.pending, (state) => {
            state.loading = true;
        })
        .addCase(addMedicine.fulfilled, (state, action) => {
            state.loading = false;
            state.medicineList = action.payload;
            state.error = "";
        })
        .addCase(addMedicine.rejected, (state, action) => {
            state.loading = false;
            state.medicineList = [];
            state.error = action.error.message;
        })
}});

export default medicineSlice.reducer;
