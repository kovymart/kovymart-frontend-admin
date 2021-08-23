import axiosClient from "./axiousClient";

const LocationAPI = {
	getprovices: () => {
		const url = "/ground/houseforrent/getprovinces";
		return axiosClient.get(url);
	},
	getdistricts: (params: any) => {
		const url = "/ground/houseforrent/getdistricts";
		return axiosClient.get(url, { params });
	},
	getwards: (params: any) => {
		const url = "/ground/houseforrent/getwards";
		return axiosClient.get(url, { params });
	},
	getroadaxises: (params: any) => {
		const url = "/ground/roadaxis/getlistselect";
		return axiosClient.get(url, { params });
	},
};

export default LocationAPI;
