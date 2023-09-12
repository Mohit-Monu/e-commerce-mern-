import * as UserApi from "../api/UserRequest";
export const AddToCart = (productId) => async (dispatch) => {
  dispatch({ type: "Add_to_Cart_START" });
  try {
    const { data } = await UserApi.AddToCart(productId);
    productId.cart.push(data.addedItem);
    dispatch({ type: "Add_to_Cart_SUCCESS", data: productId.cart });
  } catch (error) {
    console.log(error);
    dispatch({ type: "Add_to_Cart_FAIL" });
    throw new Error(error.response.data.message);
  }
};
export const GetCart = () => async (dispatch) => {
  dispatch({ type: "Get_From_Cart_START" });
  try {
    const { data } = await UserApi.GetCart();
    dispatch({ type: "Get_From_Cart_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "Get_From_Cart_FAIL" });
    throw new Error(error.response.data.message);
  }
};
export const RemoveFromCart = (productId) => async (dispatch) => {
  dispatch({ type: "Add_to_Cart_START" });
  try {
    console.log(productId);
    await UserApi.RemoveFromCart(productId);
    const cart = productId.cart.filter((item) => item._id !== productId.cartId);
    dispatch({ type: "Add_to_Cart_SUCCESS", data: cart });
  } catch (error) {
    dispatch({ type: "Add_to_Cart_FAIL" });
    throw new Error(error.response.data.message);
  }
};
export const RemoveFromCarts = () => async (dispatch) => {
  dispatch({ type: "REMOVE_CARTS_SUCCESS"});
};
