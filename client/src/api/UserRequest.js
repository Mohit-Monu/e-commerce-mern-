import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
export const AddToCart = async (product) => {
  const config = {
    method: "post",
    url: "/features/addToCart",
    data: {
      productId: product.productId,
    },
    headers: {
      "Authorization": product.token,
    },
  };
  const data = await API(config);
  return data;
};
export const GetCart = async (userId) => {
  try{
    const config = {
      method: "get",
      url: "/features/getCartItem",
      headers: {
        "Authorization": userId,
      },
    };
    const data = await API(config);
    return data;
  }catch(err){
    console.log(err)
  }
};
export const RemoveFromCart = async (userId) => {
  try{
    const config = {
      method: "DELETE",
      url: "/features/removeCartItem",
      data:{
        cartId:userId.cartId
      },
      headers: {
        "Authorization": userId.token,
      },
    };
    await API(config);
  }catch(err){
    console.log(err)
  }
};
