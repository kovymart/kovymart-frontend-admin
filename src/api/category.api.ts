import axiosClient from "./axiousClient"

const prefix = "/category"
const url = `${prefix}`
const categoryApi = {
    getCategoryList: () => {
        const url = `${prefix}`
        return axiosClient.get(url)
    },
    getCategoryById: (id: number) => {
        const url = `${prefix}/${id}`
        return axiosClient.get(url)
    },
    addCategory: (data: object) => {
        const url = `${prefix}`
        return axiosClient.post(url, { ...data })
    },
    deleteCategory: (id: number) => {
        const url = `${prefix}/${id}`
        return axiosClient.delete(url)
    },
    updateCategory: ( id: number, data: object) => {
        const url = `${prefix}/ ${id}`
        return axiosClient.patch(url, {...data})    
    }
}

export default categoryApi