import axiosClient from "./axiousClient";

const HouseForRentApi = {
	getlist: (params: any) => {
		const url = "/ground/houseforrent/getlist";
		return axiosClient.get(url, { params });
	},
	getbyid: (params: any) => {
		const url = "/ground/houseforrent/getbyid/";
		return axiosClient.get(url, { params });
	},
	insert: (params: any) => {
		const url = "/ground/houseforrent/insert";
		return axiosClient.post(url, {
			LandOwnerID: 0,
			...params,
		});
	},
	delete: (params: any) => {
		const url = `/ground/houseforrent/delete`;
		return axiosClient.post(url, null, { params: params });
	},
	update: (params: any) => {
		const url = "/ground/houseforrent/update/";
		return axiosClient.post(url, {
			...params,
		});
	},
	uploadImage: async (params: any) => {
		const url = "/ground/upload/";
		const res: any = await axiosClient.post(url, {
			imageList: params
				.filter((file: any) => !file.from)
				.map((file: any) => ({
					filename: file.name,
					base64: file.thumbUrl.split(",").pop(),
				})),
			type: "HouseForRent",
		});
		let new_images = res.Data;
		let old_images = params
			.filter((file: any) => file.from)
			.map((file: any) => file.uid)
			.join(";");
		return [new_images, old_images].filter((val) => val).join(";");
	},
};

export default HouseForRentApi;
