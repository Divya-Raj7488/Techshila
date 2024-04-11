import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginApi, signupApi, userApi } from "../Links";

export const getUser = createAsyncThunk("user/get", (id) => {
	return axios
		.get(`${userApi}${id}/`)
		.then((response) => {
			if (response.status === 200) {
				return {
					userID: id,
					user: response.data,
				};
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const login = createAsyncThunk("user/login", async (userData) => {
	return axios
		.post(loginApi, userData)
		.then((response) => {
			if (response.status === 200) {
				localStorage.setItem(
					"user",
					JSON.stringify(response.data.user)
				);
				return response.data.user;
			} else {
				throw new Error("Invalid username or password");
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const createUser = createAsyncThunk("user/add", async (userData) => {
	return axios
		.post(signupApi, userData)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error("Invalid username or password");
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

const userSlice = createSlice({
	name: "user",
	initialState: {
		loading: false,
		selectedID: null,
		userLoggedIn: null,
		imageDataUrl: null,
		error: "",
	},
	reducers: {
		setUserLoggedIn: (state, action) => {
			state.userLoggedIn = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedID = action.payload["userID"];
				state.userLoggedIn = action.payload["user"];
				state.error = "";
			})
			.addCase(getUser.rejected, (state, action) => {
				state.loading = false;
				state.selectedID = [];
				state.userLoggedIn = null;
				state.error = action.error.message;
			})
			.addCase(createUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.loading = false;
				state.error = "";
			})
			.addCase(createUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.userLoggedIn = action.payload;
				state.error = "";
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;
export const { setUserLoggedIn } = userSlice.actions;
