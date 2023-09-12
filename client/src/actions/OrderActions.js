export const OrderPlacePending = () => async (dispatch) => {
  dispatch({ type: "ORDER_PENDING" });
};
export const OrderPlace = () => async (dispatch) => {
  dispatch({ type: "ORDER_START" });
};
export const OrderSuccess = (navigate) => async (dispatch) => {
  dispatch({ type: "ORDER_SUCCESS" });
  navigate("../", { replace: true });
};
export const OrderFail = () => async (dispatch) => {
  dispatch({ type: "ORDER_FAIL" });
};

export const AddToOrder = (productId, navigate) => async (dispatch) => {
  dispatch({ type: "ORDER_ADD", data: productId });
  navigate("../order", { replace: true });
};
