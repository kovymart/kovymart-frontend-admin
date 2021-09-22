import axiosClient from "./axiosClient";

const prefix = "/order";

const orderApi = {
  getOrderList(data: object) {
    const url = `${prefix}/list`;
    return axiosClient.get(url, { data });
  },

  getOrderDetails(id: number) {
    const url = `${prefix}/detail/${id}`;
    return axiosClient.post(url);
  },

  updateOrderStatus(id: number, status: number) {
    const url = `${prefix}/update-status/${id}`;
    return axiosClient.patch(url, { status });
  }
};

export default orderApi;
