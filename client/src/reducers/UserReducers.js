const userReducer = (
  state = { cartData: [], cartLength: 0, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "Add_to_Cart_START":
      return { ...state, loading: true, error: false };
    case "Add_to_Cart_SUCCESS":
      localStorage.setItem("cart", JSON.stringify([...action?.data]));
      return {
        ...state,
        cartData: action.data,
        cartLength: action.data.length,
        loading: false,
        error: false,
      };
    case "Add_to_Cart_FAIL":
      return { ...state, loading: false, error: true };
    case "Get_From_Cart_START":
      return { ...state, loading: true, error: false };
    case "Get_From_Cart_SUCCESS":
      localStorage.setItem("cart", JSON.stringify([...action?.data]));
      return {
        ...state,
        cartData: action.data,
        cartLength: action.data.length,
        loading: false,
        error: false,
      };
    case "Get_From_Cart_FAIL":
      return { ...state, loading: false, error: true };
    case "REMOVE_CARTS_SUCCESS":
      return {
        ...state,
        cartData: [],
        cartLength: 0,
        loading: false,
        error: true,
      };
    case "LOG_OUT":
      localStorage.clear();
      return {
        ...state,
        cartData: [],
        cartLength: 0,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default userReducer;
