import { message } from "antd";
import axios from "axios";

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/cars/getallcars");
    dispatch({ type: "GET_ALL_CARS", payload: response.data.cars });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/cars/addcar", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("New car added successfully");
    dispatch({ type: "REDIRECT", payload: "/admin" });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Failed to add new car");
  }
};

export const deleteCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.delete(`/api/cars/deletecar/${reqObj.carid}`);

    dispatch({ type: "LOADING", payload: false });
    message.success("Car deleted successfully");
    dispatch({ type: "REFRESH_DATA" });
    // Dispatch an action to refresh the car list instead of reloading
    dispatch(getAllCars());
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Failed to delete car");
  }
};