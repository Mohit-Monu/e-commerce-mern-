const authReducer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };
    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };
    case "AUTH_UPDATEPIC_START":
      return { ...state, loading: true, error: false };
    case "AUTH_UPDATEPIC_SUCCESS":
      const data = state.authData;
      data.user.profilePic = action.data.fileURl;
      localStorage.setItem("profile", JSON.stringify({ ...data }));
      return { ...state, authData: data, loading: false, error: false };
    case "AUTH_UPDATEPIC_FAIL":
      return { ...state, loading: false, error: true };
    case "AUTH_UPDATE_START":
      return { ...state, loading: true, error: false };
    case "AUTH_UPDATE_SUCCESS":
      const data2 = state.authData;
      data2.user.name = action.data.name;
      data2.user.Country = action.data.Country;
      data2.user.pincode = action.data.pincode;
      data2.user.Address = action.data.Address;
      data2.user.Phone = action.data.Phone;
      console.log(action.data)
      localStorage.setItem("profile", JSON.stringify({ ...data2 }));
      return { ...state, authData: data2, loading: false, error: false };
    case "AUTH_UPDATE_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
export default authReducer;
