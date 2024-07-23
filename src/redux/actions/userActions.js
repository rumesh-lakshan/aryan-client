// redux/actions/userActions.js

import { message } from "antd";
import axios from "axios";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login Successful");
    dispatch({ type: "LOADING", payload: false });
    return response; // Return the response to allow chaining
  } catch (error) {
    console.log(error);
    error.response.data.message && message.error(error.response.data.message);
    dispatch({ type: "LOADING", payload: false });
    throw error; // Rethrow the error to allow chaining
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/register", reqObj);
    message.success("Registration Successful");
    dispatch({ type: "LOADING", payload: false });
    return response; // Return the response to allow chaining
  } catch (error) {
    console.log(error);
    error.response.data.message && message.error(error.response.data.message);
    dispatch({ type: "LOADING", payload: false });
    throw error; // Rethrow the error to allow chaining
  }
};
