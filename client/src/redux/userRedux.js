import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		isFetching: false,
		error: false,
		errorMessage: "",
	},
	reducers: {
		logoutStart: (state) => {
			state.currentUser = null;
			state.errorMessage = "";
		},
		loginStart: (state) => {
			state.isFetching = true;
			state.error = false;
			state.errorMessage = "";
		},
		loginSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
			state.error = false;
			state.errorMessage = "";
		},
		loginFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		registerStart: (state) => {
			state.isFetching = true;
			state.error = false;
			state.errorMessage = "";
		},
		registerSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
			state.error = false;
			state.errorMessage = "";
		},
		registerFailure: (state, action) => {
			state.errorMessage = action.payload;
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {
	logoutStart,
	loginStart,
	loginSuccess,
	loginFailure,
	registerStart,
	registerSuccess,
	registerFailure,
} = userSlice.actions;
export default userSlice.reducer;
