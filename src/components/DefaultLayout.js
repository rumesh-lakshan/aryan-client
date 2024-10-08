import React from "react";
import { Dropdown, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import  logo  from '../assets/aryanLogo.png'

function DefaultLayout(props) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const items = [
    {
      key: "1",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "2",
      label: <Link to="/userbookings">My Bookings</Link>,
    },
    {
      key: "4",
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
            window.location.reload();
          }}
        >
          Logout
        </span>
      ),
    },
  ];

  const adminItems = [
    {
      key: "1",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "2",
      label: <Link to="/allbookings">All Bookings</Link>,
    },
    {
      key: "3",
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
            window.location.reload();
          }}
        >
          Logout
        </span>
      ),
    },
  ];
  return (
    <div
      style={{
        overflowX: "hidden",
      }}
    >
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>
                <b>
                  <Link
                    to="/"
                    style={{
                      color: "darkslategray",
                      letterSpacing: "1.5px",
                      fontSize: "30px",
                      fontFamily: "serif",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <img
                      src={logo}
                      alt="logo"
                      style={{
                        width: "60px",
                        height: "100%",
                        marginRight: "10px",
                      }}
                    />
                    ARYAN RENT A CAR AND TOURS
                  </Link>
                </b>
              </h1>

              <Dropdown
                menu={{
                  items: user.role === "Admin" ? adminItems : items,
                }}
                placement="bottom"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",

                    cursor: "pointer",
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/desnqqj6a/image/upload/v1683887268/User-Profile-PNG-High-Quality-Image_mwetdc.png"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  {user.username}
                </div>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
      <Footer style={{ textAlign: "center" }}>
  ARYAN RENT A CAR AND TOURS ©2024 {" "}
  <span
    style={{
      color: "darkslategray",
      letterSpacing: "1.5px",
      fontSize: "14px",
      fontWeight: "bold",
    }}
  >
    | <a href="https://www.facebook.com/profile.php?id=100093625762062" target="_blank" rel="noopener noreferrer">TriniphiX</a>
  </span>
</Footer>
    </div>
  );
}

export default DefaultLayout;