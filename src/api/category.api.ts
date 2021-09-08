import axiosClient from "./axiosClient"
import { CategoryI } from '../types'

const prefix = "/category"

const categoryApi = {
    getCategoryList: () => {
        const url = `${prefix}`
        return axiosClient.get(url)
    },
    getCategoryById: (id: number) => {
        const url = `${prefix}/${id}`
        return axiosClient.get(url)
    },
    addCategory: (data: CategoryI) => {
        const url = `${prefix}`
        return axiosClient.post(url, { ...data })
    },
    deleteCategory: (id: number) => {
        const url = `${prefix}/${id}`
        const res = axiosClient.delete(url)
        return [res, id]
    },
    updateCategory: (id: number, data: CategoryI) => {
        const url = `${prefix}/${id}`
        return axiosClient.patch(url, { ...data })
    }
}

export default categoryApi