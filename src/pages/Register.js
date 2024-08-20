import React from "react";
import { Row, Col, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useNavigate } from 'react-router-dom';
// ..
AOS.init();

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.alertsReducer);

  const onFinish = async (values) => {
    try {
      const success = await dispatch(userRegister(values));
      if (success) {
        setTimeout(() => {
          navigate('/login');
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="login"
      style={{
        overflowX: "hidden",
      }}
    >
      {loading && <Spinner />}

      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <h1 className="login-logo">Aryen rent a car and tours</h1>
          <img
            data-aos="slide-right"
            data-aos-duration="1500"
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80"
            className="loginimg"
          />
        </Col>

        <Col lg={8} className="text-start p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
            style={{
              borderRadius: "20px",
            }}
          >
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="contact"
              label="Contact Number"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="drivenln"
              label="Driven License Number"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>



            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>

            <button
              style={{
                backgroundColor: "#FF0000",
                width: "100%",
                color: "white",
                borderRadius: "10px",
                padding: "10px",
                border: "none",
                marginBottom: "10px",
              }}
            >
              Register
            </button>
            <br />
            <Link to={"/login"}>Click Here To Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
