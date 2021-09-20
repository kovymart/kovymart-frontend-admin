import axiosClient from "./axiosClient";
import { SupplierI } from '../types';

const prefix = "/supplier"

const supplierApi = {
    getSupplierList: () => {
        const url = `${prefix}`
        return axiosClient.get(url)
    },
    getSupplierById: (id: number) => {
        const url = `${prefix}/${id}`
        return axiosClient.get(url)
    },
    addSupplier: (data: SupplierI) => {
        const url = `${prefix}`
        return axiosClient.post(url, { ...data })
    },
    deleteSupplier: (id: number) => {
        const url = `${prefix}/${id}`
        const res = axiosClient.delete(url)
        return [res, id]
    },
    updateSupplier: (id: number, data: SupplierI) => {
        const url = `${prefix}/${id}`
        return axiosClient.patch(url, { ...data })
    }
}

export default supplierApi;