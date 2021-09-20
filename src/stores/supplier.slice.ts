import { AppState } from "./index"
import {
    createAsyncThunk,
    createSelector,
    createSlice,
    AnyAction,
} from "@reduxjs/toolkit"
import { NotifyHelper } from "../helpers/NotifyHelper/notify-helper"
import supplierApi from "../api/supplier.api"
import { MessageStatus } from '../constants/message-status'
import { SupplierI } from "../types"

interface InitialStateI {
    requesting: boolean,
    success?: boolean,
    message?: string,
    list?: Array<SupplierI> | null,
    object?: SupplierI | null,
}

const initialState: InitialStateI = {
    requesting: false,
    list: [],
    object: null
}

//------------------------ACTIONS------------------------

export const getSupplierList = createAsyncThunk(
    "supplier/getSupplierList",
    async () => {
        return await supplierApi.getSupplierList()
    }
)

export const getSupplierById = createAsyncThunk(
    "supplier/getsupplierById",
    async (id: number) => {
        return await supplierApi.getSupplierById(id)
    }
)

export const addSupplier = createAsyncThunk(
    "supplier/addSupplier",
    async (data: SupplierI) => {
        return await supplierApi.addSupplier(data)
    }
)

export const updateSupplier = createAsyncThunk(
    "supplier/updateSupplier",
    async (data: any) => {
        return await supplierApi.updateSupplier(data.id, data.data)
    }
)

export const deleteSupplier = createAsyncThunk(
    "supplier/deleteSupplier",
    async (id: number) => {
        return await supplierApi.deleteSupplier(id)
    }
)

//------------------------UTILITIES------------------------
const isPendingAction = (action: AnyAction) =>
    action.type.endsWith("/pending") && action.type.includes("supplier")
const isRejectedAction = (action: AnyAction) =>
    action.type.endsWith("/rejected") && action.type.includes("supplier")


//------------------------SLICERS------------------------
const supplierSlice = createSlice({
    name: "supplier",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSupplierList.fulfilled, (state, action: any) => {
                state.requesting = false
                state.success = true
                state.list = action.payload.data
            })
            .addCase(addSupplier.fulfilled, (state) => {
                state.requesting = false
                state.success = true
                NotifyHelper.success('Thêm thành công !', MessageStatus.SUCCESS)
            })
            .addCase(getSupplierById.fulfilled, (state, action: any) => {
                state.requesting = false
                state.success = true
                state.object = action.payload
            })
            .addCase(deleteSupplier.fulfilled, (state, action: any) => {
                state.requesting = false
                state.success = true
                NotifyHelper.success('Xóa thành công !', MessageStatus.SUCCESS)
                state.list = state.list!.filter(c => c.id! !== action.payload[1])
            })
            .addCase(updateSupplier.fulfilled, (state) => {
                state.requesting = false
                state.success = true
                NotifyHelper.success('Cập nhật thành công !', MessageStatus.SUCCESS)
            })

            // utilities for  pending, rejected
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
const selectSupplier = (state: AppState) => state.supplier

export const selectSupplierList = createSelector(
    [selectSupplier],
    (state: any) => state.list
)

export const selectRequesting = createSelector(
    [selectSupplier],
    (state: any) => state.requesting
)

export const selectsupplierById = createSelector(
    [selectSupplier],
    (supplier: any) => supplier.object
)

export default supplierSlice.reducer;