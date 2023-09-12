import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
export const OrderPlace = async (productId,token) => {
  const config = {
    method: "post",
    url: "/order/orderplace",
    data:productId,
    headers: {
      "Authorization": token,
    },
  };
  const data = await API(config);
  return data;
}