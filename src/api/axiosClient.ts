import axios from "axios";
import queryString from "querystring";
import { getAccessTokenFromLocalStorage } from "../helpers/auth";

const axiosClient = axios.create({
	baseURL: 'https://kovy-mart-api.herokuapp.com/api/',
	headers: {
		"Content-Type": "application/json",
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
	function (config) {
		// return config;
		// Do something before request is sent
		const accessToken = getAccessTokenFromLocalStorage();

		config.headers.Authorization = accessToken
			? `Bearer ${accessToken}`
			: undefined;

		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

axiosClient.interceptors.response.use(
	async (response) => {
		if (response && response.data) {
			return response.data;
		}
		return response.data;
	},
	(error) => {
		throw error;
	}
);

export default axiosClient;
