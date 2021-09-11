import axios from "axios";
import queryString from "querystring";

const axiosClient = axios.create({
	baseURL:  'https://kovy-mart-api.herokuapp.com/api/',
	headers: {
		"Content-Type": "application/json",
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
	return config;
});

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
