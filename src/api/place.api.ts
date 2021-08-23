import axiosClient from "./axiousClient";

const PlaceAPI = {
	insert: (params: any) => {
		const url = "/ground/place/insert";
		return axiosClient.post(url, null, { params });
	},
};

export default PlaceAPI;
