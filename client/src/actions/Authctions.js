import * as AuthApi from "../api/AuthRequest";
import * as UserApi from "../api/UserRequest";
export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    await dispatch({ type: "AUTH_SUCCESS", data: data });
    const data2 = await UserApi.GetCart(data.token);
    await dispatch({
      type: "Get_From_Cart_SUCCESS",
      data: data2.data.cartItem,
    });
    navigate("../", { replace: true });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
    throw new Error(error.response.data.message);
  }
};
export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await AuthApi.signUp(formData);
    return data
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
export const UpdateUser = (formData,token) => async (dispatch) => {
  dispatch({ type: "AUTH_UPDATE_START" });
  try {
    const { data } = await AuthApi.UpdateUser(formData,token);
    await dispatch({ type: "AUTH_UPDATE_SUCCESS", data: data.myobj });
  } catch (error) {
    dispatch({ type: "AUTH_UPDATE_FAIL" });
    throw new Error(error.response.data.message);
  }
};
export const UpdatePic = (formData,token) => async (dispatch) => {
  dispatch({ type: "AUTH_UPDATEPIC_START" });
  try {
    const { data } = await AuthApi.UpdatePic(formData,token);
    await dispatch({ type: "AUTH_UPDATEPIC_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "AUTH_UPDATEPIC_FAIL" });
    throw new Error(error.response);
  }
};
