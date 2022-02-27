import React, { Component, Fragment } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import login from "../../assets/images/login.png";
import axios from "axios";
import AppURL from "../../api/AppURL";
import { Redirect } from "react-router-dom";
export class UserLogin extends Component {
  state = {
    email: "",
    password: "",
    message: "",
    loggedIn: false,
  };
  //  login form submit method
  formSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(AppURL.LoginUser, data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        this.setState({ loggedIn: true });
        this.props.setUser(response.data.user);
      })
      .catch((err) => {});
  };
  render() {
    // After login redierct to profile
    if (this.state.loggedIn) {
      return <Redirect to={"/profile"} />;
    }
    // protect the router
    if (localStorage.getItem("token")) {
      return <Redirect to="/profile" />;
    }

    return (
      <Fragment>
        <Container>
          <Row className="p-2">
            <Col className="shadow-sm bg-white" md={12} lg={12} sm={12} xs={12}>
              <Row className="text-center">
                <Col
                  className="d-flex justify-content-center"
                  md={6}
                  lg={6}
                  sm={6}
                  xs={6}
                >
                  <Form className="onboardForm" onSubmit={this.formSubmit}>
                    <h4 className="section-title-login">USER SIGN IN</h4>
                    <h6 className="section-sub-title">
                      Please Enter Your Mobile Number
                    </h6>
                    <input
                      className="form-control m-2"
                      type="email"
                      placeholder="Enter Your Email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    <input
                      className="form-control m-2"
                      type="password"
                      placeholder="Enter Your Password"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                    <Button
                      type="submit"
                      className="btn btn-block m-2 site-btn-login"
                    >
                      {" "}
                      Login{" "}
                    </Button>
                    <br></br> <br></br>
                    <hr />
                    <p>
                      {" "}
                      <b> Forget My Password? </b>
                      <Link>
                        <b> Froget Password </b>{" "}
                      </Link>{" "}
                    </p>
                    <p>
                      {" "}
                      <b> Don't Have An Account ? </b>
                      <Link to="/register">
                        <b> Register </b>{" "}
                      </Link>{" "}
                    </p>
                  </Form>
                </Col>
                <Col md={6} lg={6} sm={6} xs={6}>
                  <img
                    className="onboardBanner Desktop p-0 m-0"
                    src={login}
                    alt="Login-banner"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default UserLogin;
