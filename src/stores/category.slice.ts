import { AppState } from "./index"
import {
    createAsyncThunk,
    createSelector,
    createSlice,
    AnyAction,
} from "@reduxjs/toolkit"
import { NotifyHelper } from "../helpers/NotifyHelper/notify-helper"
import categoryApi from "../api/category.api"
import { MessageStatus } from '../constants/message-status'

interface InitialStateI {
    requesting: boolean,
    success?: boolean,
    message?: string,
    list?: Array<object> | null | undefined,
    object?: object | null
}

const initialState: InitialStateI = {
    requesting: false,
    list: [],
    object: null
}

//------------------------ACTIONS------------------------

export const getCategoryList = createAsyncThunk(
    "category/getCategoryList",
    async () => {
        return await categoryApi.getCategoryList()
    }
)

export const getCategoryById = createAsyncThunk(
    "category/getCategoryById",
    async (id: number) => {
        return await categoryApi.getCategoryById(id)
    }
)

export const addCategory = createAsyncThunk(
    "category/addCategory",
    async (data: object) => {
        return await categoryApi.addCategory(data)
    }
)

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (data: object) => {

    }
)

//------------------------UTILITIES------------------------
const isPendingAction = (action: AnyAction) =>
    action.type.endsWith("/pending") && action.type.includes("category")
const isRejectedAction = (action: AnyAction) =>
    action.type.endsWith("/rejected") && action.type.includes("category")


//------------------------SLICERS------------------------
const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryList.fulfilled, (state, action: any) => {
                state.requesting = false
                state.success = true
                state.list = action.payload.data
            })
            .addCase(addCategory.fulfilled, (state) => {
                state.requesting = false
                state.success = true
                NotifyHelper.success('Thêm thành công !', MessageStatus.SUCCESS)
            })
            .addCase(getCategoryById.fulfilled, (state, action: any) => {
                state.requesting = false
                state.success = true
                state.object = action.payload
            })
            

            // Pending and rejected 
            .addMatcher(isPendingAction, (state) => {
                state.requesting = true
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.requesting = state.success = false
                state.message = action.error.message

                NotifyHelper.error(action.error.message, MessageStatus.ERROR)
            })
    },
})


//------------------------SELECTORS------------------------
const selectCategory = (state: AppState) => state.category

export const selectCategoryList = createSelector(
    [selectCategory],
    (category: any) => category.list
)

export const selectRequesting = createSelector(
    [selectCategory],
    (category: any) => category.requesting
)

export const selectCategoryById = createSelector(
    [selectCategory],
    (category: any) => category.object
)

export default categorySlice.reducer