import React, { Component, Fragment } from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MegaMenuAll from "../Home/NavMenuAll";
import Bars from "../../assets/images/bars.png";
import { Redirect } from "react-router-dom";
import AppURL from "../../api/AppURL";
import axios from "axios";
export class NavMenuDesktop extends Component {
  constructor() {
    super();
    this.state = {
      SideNavState: "sideNavClose",
      ContentOverState: "ContentOverlayClose",
      Searchkey: "",
      SearchRedirectStatus: false,
      cartCount: 0,
    };
    this.SearchOnChange = this.SearchOnChange.bind(this);
    this.SearchClick = this.SearchClick.bind(this);
    this.SearchRedirect = this.SearchRedirect.bind(this);
  }
  componentDidMount() {
    let product_code = this.props.product_code;
    axios.get(AppURL.CartCount(product_code)).then((response) => {
      this.setState({ cartCount: response.data });
    });
  }

  SearchOnChange = (e) => {
    let Searchkey = e.target.value;
    this.setState({ Searchkey: Searchkey });
  };

  // Search on click
  SearchClick = (e) => {
    if (this.state.Searchkey.length >= 2) {
      this.setState({ SearchRedirectStatus: true });
    }
  };

  // Search Redirect
  SearchRedirect() {
    if (this.state.SearchRedirectStatus === true) {
      return <Redirect to={`/productbysearch/${this.state.Searchkey}`} />;
    }
  }

  MenuBarClickHandler = () => {
    this.SideNavOpenClose();
  };

  ContentOverlayClickHandler = () => {
    this.SideNavOpenClose();
  };

  SideNavOpenClose = () => {
    let SideNavState = this.state.SideNavState;
    let ContentOverState = this.state.ContentOverState;
    if (SideNavState === "sideNavOpen") {
      this.setState({
        SideNavState: "sideNavClose",
        ContentOverState: "ContentOverlayClose",
      });
    } else {
      this.setState({
        SideNavState: "sideNavOpen",
        ContentOverState: "ContentOverlayOpen",
      });
    }
  };

  // Logout function or method
  logout = () => {
    localStorage.clear();
  };
  render() {
    let buttons;
    if (localStorage.getItem("token")) {
      buttons = (
        <div>
          <Link to="/favourite" className="btn">
            <i className="fa h4 fa-heart"></i>
            <sup>
              <span className="badge text-white bg-danger">3</span>
            </sup>
          </Link>

          <Link to="/notification" className="btn">
            <i className="fa h4 fa-bell"></i>
            <sup>
              <span className="badge text-white bg-danger">5</span>
            </sup>
          </Link>

          <Link to="/profile" className="h4 btn">
            PROFILE
          </Link>
          <Link to="/" onClick={this.logout} className="h4 btn">
            LOGOUT
          </Link>

          <Link to="/cart" className="cart-btn">
            <i className="fa fa-shopping-cart"></i> {this.state.cartCount} Items{" "}
          </Link>
        </div>
      );
    } else {
      buttons = (
        <div>
          <Link to="/favourite" className="btn">
            <i className="fa h4 fa-heart"></i>
            <sup>
              <span className="badge text-white bg-danger">3</span>
            </sup>
          </Link>

          <Link to="/notification" className="btn">
            <i className="fa h4 fa-bell"></i>
            <sup>
              <span className="badge text-white bg-danger">5</span>
            </sup>
          </Link>

          <Link to="/login" className="h4 btn">
            LOGIN
          </Link>
          <Link to="/register" className="h4 btn">
            REGISTER
          </Link>

          <Link to="/cart" className="cart-btn">
            <i className="fa fa-shopping-cart"></i> 0 Items{" "}
          </Link>
        </div>
      );
    }

    return (
      <Fragment>
        <div className="topSectionDown">
          <Navbar fixed={"top"} bg="light" className="navbar">
            <Container
              fluid={"true"}
              className="p-2 fixed-top shadow-sm mb-0 bg-white"
            >
              <Row>
                <Col lg={4} md={4} sm={12} xs={12}>
                  <img
                    onClick={this.MenuBarClickHandler}
                    className="bar-img mr-4"
                    src={Bars}
                    alt="true"
                  />

                  <Link to={"/"}>
                    {" "}
                    <span className="nav-logo ml-3">Shopping</span>
                  </Link>
                </Col>
                <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                  <div className="input-group w-100">
                    <input
                      onChange={this.SearchOnChange}
                      type="text"
                      className="form-control"
                    />
                    <Button
                      type="button"
                      onClick={this.SearchClick}
                      className="btn site-btn"
                    >
                      <i className="fa fa-search"></i>
                    </Button>
                  </div>
                </Col>
                <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                  {buttons}
                </Col>
              </Row>
              {this.SearchRedirect()}
            </Container>
          </Navbar>
          {/*  Buttton */}
          <div className={this.state.SideNavState}>
            <MegaMenuAll />
          </div>

          <div
            onClick={this.ContentOverlayClickHandler}
            className={this.state.ContentOverState}
          ></div>
        </div>
      </Fragment>
    );
  }
}

export default NavMenuDesktop;
