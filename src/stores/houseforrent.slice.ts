import { AppState } from "./index"
import {
	createAsyncThunk,
	createSelector,
	createSlice,
	AnyAction,
} from "@reduxjs/toolkit"
import { NotifyHelper } from "../helpers/NotifyHelper/notify-helper"
import HouseForRentApi from "../api/houseForRent.api"
const tempList = [{
	Acreage: 0,
	Address: "Bình Dương",
	AssignDate: "0001-01-01T00:00:00",
	AssignFullName: "",
	AssignUser: "",
	AtHere: false,
	CreatedDate: "2021-08-20T17:07:01.633272",
	CreatedFullname: "",
	CreatedUser: "",
	DistrictID: 0,
	DistrictName: "",
	Email: "",
	Frontline: 0,
	HouseForRentID: 341,
	IP: null,
	Images: "2021/8/08b53fa7-3541-4e8a-8c27-926e64a0b755.png",
	LandOwnerID: 77,
	LandOwnerName: "Sang test đăng ký",
	Lat: 0,
	Length: 0,
	Lng: 0,
	MainOwnerName: "",
	MainOwnerPhone: "",
	MapLink: "",
	Note: "",
	Pavement: 0,
	Phone: "0908007006",
	ProvinceID: 0,
	ProvinceName: "",
	RoadAxisID: 0,
	RoadAxisName: "",
	Status: 0,
	StatusQuo: 0,
	WardID: -1,
	WardName: "",
	Width: 0,
}]
const INITIAL_STATE = {
	requesting: false,
	success: false,
	message: "",
	object: {} as any,
	list: tempList,
	pagination: {} as any,
}

//------------------------ACTIONS------------------------
export const houseforrent_getlist = createAsyncThunk(
	"HOUSEFORRENT_GETLIST",
	async (data: any) => {
		const res = await HouseForRentApi.getlist(data.params)
		return [res, data.params, data.loadmore]
	}
)
export const houseforrent_getbyid = createAsyncThunk(
	"HOUSEFORRENT_GETBYID",
	async (houseforrentid: number) => {
		return await HouseForRentApi.getbyid({ houseforrentid })
	}
)
export const houseforrent_insert = createAsyncThunk(
	"HOUSEFORRENT_INSERT",
	async (params: any) => {
		let Images = await HouseForRentApi.uploadImage(params.images_params)
		return await HouseForRentApi.insert({
			...params.insert_params,
			Images,
		})
	}
)
export const houseforrent_update = createAsyncThunk(
	"HOUSEFORRENT_UPDATE",
	async (params: any) => {
		let { insert_params, images_params, id } = params
		const resNewUpload = await HouseForRentApi.uploadImage(images_params)
		await HouseForRentApi.update({
			HouseForRentID: id,
			LandOwnerID: 0,
			Images: resNewUpload,
			...insert_params,
		})
		return await HouseForRentApi.getbyid({
			houseforrentid: id,
		})
	}
)
export const houseforrent_delete = createAsyncThunk(
	"HOUSEFORRENT_DELETE",
	async (data: any) => {
		const res = await HouseForRentApi.delete(data)
		return [res, data.houseforrentid]
	}
)
export const houseforrent_pagination = createAsyncThunk(
	"HOUSEFORRENT_PAGINATION",
	async () => { }
)
export const houseforrent_assign = createAsyncThunk(
	"HOUSEFORRENT_ASSIGN",
	async (houseforrentid: number | undefined) => {
		return await HouseForRentApi.getbyid({ houseforrentid })
	}
)
export const houseforrent_refresh = createAsyncThunk(
	"HOUSEFORRENT_REFRESH",
	async (data: any) => {
		const params = { ...data, pagesize: data.offset + 9, offset: 0 }
		return await HouseForRentApi.getlist(params)
	}
)
//------------------------UTILITIES------------------------
const isPendingAction = (action: AnyAction) =>
	action.type.endsWith("/pending") && action.type.includes("HOUSEFORRENT")
const isRejectedAction = (action: AnyAction) =>
	action.type.endsWith("/rejected") && action.type.includes("HOUSEFORRENT")

//------------------------SLICERS------------------------
const houseforrentSlice = createSlice({
	name: "house",
	initialState: INITIAL_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(houseforrent_getbyid.fulfilled, (state, action: any) => {
				state.requesting = false
				state.success = true
				state.object = action.payload.Data
			})
			.addCase(houseforrent_getlist.fulfilled, (state, action: any) => {
				state.requesting = false
				state.success = true
				state.pagination = action.payload[1]
				console.log(action.payload)
				if (action.payload[2] === false) {
					state.list = action.payload[0].Data
				} else {
					//handle loadmore pagination
					state.list = state.list.concat(action.payload[0].Data)
				}
				if (action.payload[0].Data.length === 0) {
					NotifyHelper.error("Dữ liệu trống", "Tìm kiếm thất bại!")
				}
			})
			.addCase(houseforrent_pagination.fulfilled, (state) => {
				state.pagination.offset += 10
			})
			.addCase(houseforrent_assign.fulfilled, (state, action: any) => {
				let index = state.list.findIndex(
					(element: any) =>
						element.HouseForRentID === action.payload.Data.HouseForRentID
				)
				state.list[index].Status = action.payload.Data.Status
			})
			.addCase(houseforrent_insert.fulfilled, (state, action: any) => {
				state.requesting = false
				if (action.payload.Status === "Success") {
					NotifyHelper.success("", "Thêm thành công")
					state.success = true
				} else {
					NotifyHelper.error(action.payload.Message, "Thêm thất bại!")
					state.success = false
					state.message = action.payload.Message
				}
			})
			.addCase(houseforrent_update.fulfilled, (state, action: any) => {
				state.requesting = false
				if (action.payload.Status === "Success") {
					NotifyHelper.success("", "Chỉnh sửa thành công")
					state.success = true
					state.object = action.payload.Data
				} else {
					NotifyHelper.error(action.payload.Message, "Chỉnh sửa thất bại!")
					state.success = false
					state.message = action.payload.Message
				}
			})
			.addCase(houseforrent_delete.fulfilled, (state, action: any) => {
				state.requesting = false
				state.success = true
				if (action.payload[0].Status === "Success") {
					state.list = state.list.filter(
						(item: any) => item.HouseForRentID !== action.payload[1]
					)
					state.pagination.offset--
					NotifyHelper.success(action.payload[0].Message, `Xóa thành công`)
				}
			})
			.addCase(houseforrent_refresh.fulfilled, (state, action: any) => {
				state.requesting = false
				state.success = true
				state.list = action.payload.Data
				if (action.payload.Data.length === 0) {
					NotifyHelper.error("Dữ liệu trống", "Tìm kiếm thất bại!")
				}
			})
			.addMatcher(isPendingAction, (state) => {
				state.requesting = true
			})
			.addMatcher(isRejectedAction, (state, action) => {
				state.requesting = state.success = false
				state.message = action.error.message
				NotifyHelper.error(action.error.message, "Yêu cầu thất bại!")
			})
	},
})

//------------------------SELECTORS------------------------
const selectHouse = (state: AppState) => state.house
export const selectHouseForRent = createSelector(
	[selectHouse],
	(house: any) => house.object
)

export const selectHouseIsRequesting = createSelector(
	[selectHouse],
	(house) => house.requesting
)

export default houseforrentSlice.reducer
