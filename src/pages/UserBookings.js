import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Pagination, Popconfirm, Row, message } from "antd";
import dayjs from "dayjs";
import Spinner from "../components/Spinner";
import axios from "axios";
import moment from "moment";
import { useNavigate } from 'react-router-dom';


function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  const { loading } = useSelector((state) => state.alertsReducer);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  //Get the array length of the filtered cars
  const carsLength = bookings.filter(
    (booking) => booking.user._id === user._id
  ).length;

  //Pagination
  const handlePaginationChange = (value) => {
    if (value === 1) {
      setPage(1);
    } else {
      setPage(value);
    }
  };

  const deleteHandler = (id) => {
    axios
      .delete(`/api/bookings/deletebooking/${id}`)
      .then((res) => {
        message.success("Booking Deleted Successfully");
        setTimeout(() => {
          navigate('/userbookings');
        }, 500);
      })
      .catch((err) => {
        message.error("Something went wrong");
      });
  };

  return (
    <DefaultLayout>
  {loading && <Spinner />}

  <h3 className="text-center mt-4 mb-4">My Bookings</h3>

  <Row justify={"center"} gutter={16}>
    <Col
      lg={24}
      sm={24}
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      {bookings.filter((booking) => booking.user._id === user._id).length === 0 ? (
        <h6 className="text-center mt-4 mb-4">
          You have not booked any cars yet
        </h6>
      ) : (
        bookings
          .filter((booking) => booking.user._id === user._id)
          .slice((page - 1) * 4, page * 4)
          .map((booking) => {
            const car = booking.car || {}; // Fallback to an empty object if booking.car is null/undefined
            return (
              <div
                key={booking._id}
                style={{
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                  borderRadius: "20px",
                  width: "600px",
                  display: "flex",
                  flexDirection: "row",
                  height: "200px",
                }}
              >
                <div
                  style={{
                    width: "250px",
                    height: "200px",
                  }}
                >
                  {car.image ? (
                    <img
                      src={car.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "20px 0px 0px 20px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "20px 0px 0px 20px",
                      }}
                    >
                      <p>No Image Available</p>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    padding: "10px 20px",
                    fontSize: "12px",
                  }}
                >
                  <h5>{car.name || "Unnamed Car"}</h5>
                  <p>
                    From :{" "}
                    <b>
                      {moment(booking.bookedTimeSlots.from).format(
                        "MMM DD YYYY HH:mm A"
                      )}
                    </b>
                  </p>
                  <p>
                    To :{" "}
                    <b>
                      {" "}
                      {moment(booking.bookedTimeSlots.to).format(
                        "MMM DD YYYY HH:mm A"
                      )}
                    </b>
                  </p>
                  <p>
                    Booked Date :{" "}
                    <b>{dayjs(booking.createdAt).format("MMM DD YYYY")}</b>
                  </p>
                  <p>
                    <b>Total Amount : </b>
                    {booking.totalAmount} LKR
                  </p>

                  {booking.bookingStatus === "Pending" ? (
                    <div className="d-flex align-items-center">
                      <p style={{ color: "#ffc107" }}>
                        <b>Booking Status : </b>
                        {booking.bookingStatus}
                      </p>
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this Vehicle?"
                        onConfirm={() => {
                          deleteHandler(booking._id);
                        }}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button
                          style={{
                            width: "100px",
                            height: "25px",
                            borderRadius: "5px",
                            backgroundColor: "#ff4d4f",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            marginLeft: "10px",
                          }}
                        >
                          Cancel Booking
                        </button>
                      </Popconfirm>
                    </div>
                  ) : booking.bookingStatus === "Confirmed" ? (
                    <p style={{ color: "green" }}>
                      <b>Booking Status : </b>
                      {booking.bookingStatus}
                    </p>
                  ) : (
                    <p style={{ color: "red" }}>
                      <b>Booking Status : </b>
                      {booking.bookingStatus}
                    </p>
                  )}
                </div>
              </div>
            );
          })
      )}
    </Col>
  </Row>
  <Pagination
    style={{
      marginTop: "50px",
    }}
    defaultCurrent={1}
    total={carsLength}
    defaultPageSize={4}
    onChange={handlePaginationChange}
  />
</DefaultLayout>


  );
}

export default UserBookings;
