import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const logIn = (formData) => API.post("/user/login", formData);

export const signUp = (formData) => API.post("/user/signup", formData);

export const UpdateUser = async (formData, token) => {
  try {
    const config = {
      method: "patch",
      url: "/user/updateProfile",
      data: formData,
      headers: {
        Authorization: token,
      },
    };
    const data = await API(config);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const UpdatePic = async (formData, token) => {
  try {
    const config = {
      method: "post",
      url: "/user/uploadPic",
      data: formData,
      headers: {
        Authorization: token,
      },
    };
    const data = await API(config);
    return data;
  } catch (err) {
    console.log(err);
  }
};
