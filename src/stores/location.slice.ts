import { AppState } from "./index";
import {
	createAsyncThunk,
	createSelector,
	createSlice,
	AnyAction,
} from "@reduxjs/toolkit";
import LocationAPI from "../api/location.api";

const INITIAL_STATE = {
	requesting: false,
	success: false,
	message: "null",
	provinces: [],
	districts: [],
	wards: [],
	roadaxises: [],
};

//------------------------ACTIONS------------------------
export const getprovinces = createAsyncThunk(
	"LOCATION_GETPROVINCES",
	async () => {
		const res = await LocationAPI.getprovices();
		return res;
	}
);
export const getdistricts = createAsyncThunk(
	"LOCATION_GETDISTRICTS",
	async (provinceid: any) => {
		const res = await LocationAPI.getdistricts({ provinceid });
		return res;
	}
);
export const getwards = createAsyncThunk(
	"LOCATION_GETWARDS",
	async (districtid: any) => {
		const res = await LocationAPI.getwards({ districtid });
		return res;
	}
);
export const getroadaxises = createAsyncThunk(
	"LOCATION_GETROADAXISES",
	async (params: any) => {
		const res = await LocationAPI.getroadaxises(params);
		return res;
	}
);

//------------------------UTILITIES------------------------
const isPendingAction = (action: AnyAction) =>
	action.type.endsWith("/pending") && action.type.includes("LOCATION");
const isRejectedAction = (action: AnyAction) =>
	action.type.endsWith("/rejected") && action.type.includes("LOCATION");

//------------------------SLICERS------------------------
const locationSlice = createSlice({
	name: "location",
	initialState: INITIAL_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getprovinces.fulfilled, (state, action: any) => {
				state.requesting = false;
				if (action.payload.Status === "Success") {
					state.success = true;
					state.provinces = action.payload.Data;
				} else {
					state.success = false;
					state.message = action.payload.Message;
				}
			})
			.addCase(getdistricts.fulfilled, (state, action: any) => {
				state.requesting = false;
				if (action.payload.Status === "Success") {
					state.success = true;
					state.districts = action.payload.Data;
				} else {
					state.success = false;
					state.message = action.payload.Message;
				}
			})
			.addCase(getwards.fulfilled, (state, action: any) => {
				state.requesting = false;
				if (action.payload.Status === "Success") {
					state.success = true;
					state.wards = action.payload.Data;
				} else {
					state.success = false;
					state.message = action.payload.Message;
				}
			})
			.addCase(getroadaxises.fulfilled, (state, action: any) => {
				state.requesting = false;
				if (action.payload.Status === "Success") {
					state.success = true;
					state.roadaxises = action.payload.Data;
				} else {
					state.success = false;
					state.message = action.payload.Message;
				}
			})
			.addMatcher(isPendingAction, (state) => {
				state.requesting = true;
			})
			.addMatcher(isRejectedAction, (state, action) => {
				state.requesting = state.success = false;
				state.message = action.error.message;
			});
	},
});

//------------------------SELECTORS------------------------
const selectLocation = (state: AppState) => state.location;
const getParams = (_: any, id: any) => id;

export const selectListProvinces = createSelector(
	[selectLocation],
	(location: any) => location.provinces
);
export const selectListDistricts = createSelector(
	[selectLocation, getParams],
	(location, provinceId) =>
		provinceId
			? location.districts.filter((dis: any) => dis.ProvinceID === provinceId)
			: location.districts
);
export const selectListWards = createSelector(
	[selectLocation, getParams],
	(location, districtId) =>
		districtId
			? location.wards.filter((ward: any) => ward.DistrictID === districtId)
			: location.wards
);
export const selectListRoads = createSelector(
	[selectLocation],
	(location) => location.roadaxises
);

export default locationSlice.reducer;
