const orderReducer = (
  state = { Products: null, cartId: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "ORDER_ADD":
      return {
        ...state,
        Products: action.data.productId,
        cartId: action.data.cartId,
        loading: false,
        error: false,
      };
    case "ORDER_PENDING":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "ORDER_START":
      return {
        ...state,
        loading: false,
        error: false,
      };
    case "ORDER_SUCCESS":
      return {
        ...state,
        Products: null,
        cartId: null,
        loading: false,
        error: false,
      };
      case "ORDER_FAIL":
        return {
          ...state,
          loading: false,
          error: false,
        };
    default:
      return state;
  }
};
export default orderReducer;
