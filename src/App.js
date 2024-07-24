import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingCar from "./pages/BookingCar";
import "bootstrap/dist/css/bootstrap.min.css";
import UserBookings from "./pages/UserBookings";
import AddCar from "./pages/AddCar";
import AdminHome from "./pages/AdminHome";
import EditCar from "./pages/EditCar";
import AllBookings from "./pages/AllBookings";
import axios from "axios";

axios.defaults.baseURL = "https://aryan-api.onrender.com";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {user ? (
            user.role === "Admin" ? (
              <>
                <Route path="/" element={<Navigate to="/admin" />} />
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/addcar" element={<AddCar />} />
                <Route path="/editcar/:carid" element={<EditCar />} />
                <Route path="/allbookings" element={<AllBookings />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/bookcar/:carid" element={<BookingCar />} />
                <Route path="/userbookings" element={<UserBookings />} />
              </>
            )
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
