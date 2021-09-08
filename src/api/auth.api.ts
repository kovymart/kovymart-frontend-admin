import axiosClient from "./axiosClient"
import { AccountI } from '../types'
const prefix = "/auth"

const authApi = {
    signUp(data: AccountI) {
        const url = `${prefix}/sign-up`
        return axiosClient.post(url, data)
    },

    signIn(data: AccountI) {
        const url = `${prefix}/sign-in`
        return axiosClient.post(url, data)
    },
}

export default authApi
