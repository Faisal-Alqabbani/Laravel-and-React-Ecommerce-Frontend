import React, { Component, Fragment } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MegaMenuMobile from "../Home/MegaMenuMobile";

export class NabMenuMobile extends Component {
  constructor() {
    super();
    this.state = {
      sideNavState: "sideNavClose",
      contentOverState: "ContentOverlayClose",
    };
  }

  MenuBarClickHandler = () => {
    this.SideNavOpenClose();
  };

  ContentOverlayClickHandler = () => {
    this.SideNavOpenClose();
  };

  SideNavOpenClose = () => {
    console.log("working");
    let SideNaveState = this.state.sideNavState;
    let ContentOverState = this.state.contentOverState;
    if (SideNaveState === "sideNavOpen") {
      this.setState({
        sideNavState: "sideNavClose",
        contentOverState: "ContentOverlayClose",
      });
    } else {
      this.setState({
        sideNavState: "sideNavOpen",
        contentOverState: "ContentOverlayOpen",
      });
    }
  };
  render() {
    return (
      <Fragment>
        <div className="topSectionDown">
          <Container
            fluid={"true"}
            className="p-2 fixed-top shadow-sm mb-0 bg-white"
          >
            <Row>
              <Col lg={4} md={4} sm={12} xs={12}>
                <Button className="cart-btn" onClick={this.MenuBarClickHandler}>
                  <i className="fa fa-bars"></i>
                </Button>

                <Link to={"/"}>
                  {" "}
                  <span className="nav-logo">Shopping</span>
                </Link>
                <Button className="cart-btn">
                  <i className="fa fa-shopping-cart"></i> 3 Items
                </Button>
              </Col>
            </Row>
          </Container>
          <div className={this.state.sideNavState}>
            <MegaMenuMobile />
          </div>
          <div
            onClick={this.ContentOverlayClickHandler}
            className={this.state.contentOverState}
          ></div>
        </div>
      </Fragment>
    );
  }
}

export default NabMenuMobile;
