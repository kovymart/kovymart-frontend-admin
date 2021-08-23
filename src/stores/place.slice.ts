import { createSlice, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import { NotifyHelper } from "../helpers/NotifyHelper/notify-helper";
import PlaceAPI from "../api/place.api";
const INITIAL_STATE = {
	requesting: false,
	success: false,
	data: null,
	message: null,
} as any;

//------------------------ACTIONS------------------------
export const place_insert = createAsyncThunk(
	"PLACE_INSERT",
	async (params: any) => {
		return await PlaceAPI.insert(params);
	}
);

//------------------------UTILITIES------------------------
const isPendingAction = (action: AnyAction) =>
	action.type.endsWith("/pending") && action.type.includes("PLACE");
const isRejectedAction = (action: AnyAction) =>
	action.type.endsWith("/rejected") && action.type.includes("PLACE");

//------------------------SLICERS------------------------
const placeSlice = createSlice({
	name: "place",
	initialState: INITIAL_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(place_insert.fulfilled, (state, action: any) => {
				state.requesting = false;
				state.message = action.payload.Message;
				if (action.payload.Status === "Success") {
					state.success = true;
					NotifyHelper.success(state.message, "Phân công thành công");
				}
				if (action.payload.Status === "Error") {
					state.success = false;
					NotifyHelper.error(state.message, "Phân công thất bại");
				}
			})
			.addMatcher(isPendingAction, (state) => {
				state.requesting = true;
			})
			.addMatcher(isRejectedAction, (state, action) => {
				state.requesting = state.success = false;
				state.message = action.error.message;
				NotifyHelper.error(action.error.message, "Yêu cầu thất bại!");
			});
	},
});

export default placeSlice.reducer;
