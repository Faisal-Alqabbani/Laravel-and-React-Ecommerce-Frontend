import React, { Component, Fragment } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Forget from "../../assets/images/forget.jpg";
import axios from "axios";
import AppURL from "../../api/AppURL";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class ForgetPassword extends Component {
  state = {
    email: "",
    message: "",
    buttonDisabled: false,
  };

  formSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
    };
    this.setState({ buttonDisabled: true });
    axios
      .post(AppURL.ForgetPassword, data)
      .then((response) => {
        this.setState({ message: response.data.message });

        toast.success(this.state.message, {
          position: "top-right",
        });
      })
      .catch((error) => {
        this.setState({ buttonDisabled: false });
        toast.error("Please Write your name");
      });
  };
  render() {
    return (
      <Fragment>
        <Container>
          <Row className="p-2">
            <Col
              className="shadow-sm bg-white mt-2"
              md={12}
              lg={12}
              sm={12}
              xs={12}
            >
              <Row className="text-center">
                <Col
                  className="d-flex justify-content-center"
                  md={6}
                  lg={6}
                  sm={12}
                  xs={12}
                >
                  <Form className="onboardForm" onSubmit={this.formSubmit}>
                    <h4 className="section-title-login"> FORGET PASSWORD ? </h4>

                    <input
                      className="form-control m-2"
                      type="email"
                      placeholder="Enter Your Email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />

                    <Button
                      type="submit"
                      className="btn btn-block m-2 site-btn-login"
                      disabled={this.state.buttonDisabled}
                    >
                      {" "}
                      Reset Password{" "}
                    </Button>
                  </Form>
                </Col>

                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                  <img className="onboardBanner" src={Forget} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </Fragment>
    );
  }
}

export default ForgetPassword;
