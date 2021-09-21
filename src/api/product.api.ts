import axiosClient from "./axiosClient";
import { ProductI } from '../types';

const prefix = "/product";

const productApi = {
  getProductList: (params: object) => {
    const url = `${prefix}`;
    return axiosClient.get(url, { params });
  },
  getProductById: (id: number) => {
    const url = `${prefix}/${id}`;
    return axiosClient.get(url);
  },
  addProduct: (data: ProductI) => {
    const url = `${prefix}`;
    return axiosClient.post(url, { ...data });
  },
  deleteProduct: (id: number) => {
    const url = `${prefix}/${id}`;
    const res = axiosClient.delete(url);
    return [res, id];
  },
  updateProduct: (id: number, data: ProductI) => {
    const url = `${prefix}/${id}`;
    return axiosClient.patch(url, { ...data });
  }
};

export default productApi;