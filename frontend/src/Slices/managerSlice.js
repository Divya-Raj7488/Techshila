import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { managerApi } from "../Links";

export const getManagers = createAsyncThunk("managers/get", () => {
	return axios
		.get(managerApi)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const getManager = createAsyncThunk("manager/get", (id) => {
	return axios
		.get(`${managerApi}${id}/`)
		.then((response) => {
			if (response.status === 200) {
				return {
					managerID: id,
					manager: response.data,
				};
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const createManager = createAsyncThunk("manager/add", (managerData) => {
	return axios
		.post(managerApi, managerData)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error("Invalid managername or password");
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

const managerSlice = createSlice({
	name: "manager",
	initialState: {
		loading: false,
		managersList: null,
		selectedID: null,
		selectedManager: null,
		imageDataUrl: null,
		error: "",
	},
	reducers: {
		setManagerID: (state, action) => {
			state.selectedID = action.payload["managerID"];
			state.selectedManager = action.payload["manager"];
		},
		resetManager: (state) => {
			state.selectedID = null;
			state.selectedManager = null;
		},
		setImage: (state, action) => {
			state.imageDataUrl = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getManager.pending, (state) => {
				state.loading = true;
			})
			.addCase(getManager.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedID = action.payload["managerID"];
				state.selectedManager = action.payload["manager"];
				state.error = "";
			})
			.addCase(getManager.rejected, (state, action) => {
				state.loading = false;
				state.selectedID = [];
				state.selectedManager = null;
				state.error = action.error.message;
			})
			.addCase(getManagers.pending, (state) => {
				state.loading = true;
			})
			.addCase(getManagers.fulfilled, (state, action) => {
				state.loading = false;
				state.managersList = action.payload;
				state.error = "";
			})
			.addCase(getManagers.rejected, (state, action) => {
				state.loading = false;
				state.managersList = [];
				state.error = action.error.message;
			})
			.addCase(createManager.pending, (state) => {
				state.loading = true;
			})
			.addCase(createManager.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedID = [];
				state.error = "";
			})
			.addCase(createManager.rejected, (state, action) => {
				state.loading = false;
				state.selectedID = [];
				state.error = action.error.message;
			});
	},
});

export default managerSlice.reducer;
export const { setManagerID, resetManager, setImage } = managerSlice.actions;
