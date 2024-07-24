import { message } from "antd";
import axios from "axios";

export const userLogin = (reqObj, navigate) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login Successful");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      navigate("/");
    }, 500);
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data.message) {
      message.error(error.response.data.message);
    } else {
      message.error("Something went wrong. Please try again.");
    }
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj, navigate) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/users/register", reqObj);
    message.success("Registration Successful");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      navigate("/login");
    }, 500);
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data.message) {
      message.error(error.response.data.message);
    } else {
      message.error("Something went wrong. Please try again.");
    }
    dispatch({ type: "LOADING", payload: false });
  }
};
