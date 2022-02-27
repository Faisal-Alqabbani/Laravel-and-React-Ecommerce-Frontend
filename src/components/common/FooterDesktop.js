import axios from "axios";
import React, { Component, Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppURL from "../../api/AppURL";
import Apple from "../../assets/images/apple.png";
import Google from "../../assets/images/google.png";
export class FooterDesktop extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
      android_app_link: "",
      ios_app_link: "",
      instagram_link: "",
      facebook_link: "",
      twitter_link: "",
      loadingDiv: "",
      copyright_text: "",
      mainDiv: "d-none",
    };
  }
  componentDidMount() {
    axios
      .get(AppURL.AllSiteInfo)
      .then((response) => {
        let StatusCode = response.status;
        if (StatusCode === 200) {
          // let JsonData = response.data[0]["about"];
          let address = response.data[0]["address"];
          let android_app_link = response.data[0]["android_app_link"];
          let instagram_link = response.data[0]["instagram_link"];
          let twitter_link = response.data[0]["twitter_link"];
          let facebook_link = response.data[0]["facebook_link"];
          let copyright_text = response.data[0]["copyright_text"];
          this.setState({
            address,
            android_app_link,
            twitter_link,
            facebook_link,
            instagram_link,
            copyright_text,
            loadingDiv: "d-none",
            mainDiv: "",
          });
        }
      })
      .catch((err) => {});
  }

  render() {
    return (
      <Fragment>
        {/* loader section started here */}
        <div className={this.state.loadingDiv}>
          <div class="ph-item">
            <div class="ph-col-12">
              <div class="ph-row">
                <div class="ph-col-6 big"></div>

                <div class="ph-col-4"></div>
                <div class="ph-col-12"></div>
                <div class="ph-col-12"></div>
                <div class="ph-col-12"></div>
                <div class="ph-col-12"></div>
                <div class="ph-col-12"></div>
                <div class="ph-col-12"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Loader section ended here */}
        <div className={this.state.mainDiv}>
          <div className="footerback m-0 mt-5 p-3 shadow-sm">
            <Container>
              <Row className="px-0 my-5">
                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                  <h5 className="footer-menu-title">OFFICE ADDRESS</h5>
                  <p>{this.state.address} </p>
                </Col>
                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                  <h5 className="footer-menu-title">THE COMPANY</h5>
                  <Link to="/about" className="footer-link">
                    About Us
                  </Link>{" "}
                  <br />
                  <Link to="/" className="footer-link">
                    Company Profile
                  </Link>{" "}
                  <br />
                  <Link to="/contact" className="footer-link">
                    Contact Us
                  </Link>{" "}
                </Col>
                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                  <h5 className="footer-menu-title">MORE INFO</h5>
                  <Link to="/purchase" className="footer-link">
                    How to Purchase
                  </Link>{" "}
                  <br />
                  <Link to="/privacy" className="footer-link">
                    Privacy Policy
                  </Link>{" "}
                  <br />
                  <Link to="/refund" className="footer-link">
                    Refund Policy
                  </Link>{" "}
                </Col>
                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                  <h5 className="footer-menu-title">DOWNLOAD APP</h5>
                  <a href={this.state.android_app_link}>
                    <img src={Google} alt="something" />
                  </a>
                  <br></br>
                  <a href={this.state.ios_app_link}>
                    <img className="mt-2" src={Apple} alt="Something" />
                  </a>
                  <br></br>
                  Change Your Language <br></br>
                  <div id="google_translate_element"> </div>
                </Col>

                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                  <h5 className="footer-menu-title">SOCIAL LINK</h5>
                  <a href={this.state.facebook_link}>
                    <i className="fab m-1 h4 fa-facebook"></i>
                  </a>
                  <a href={this.state.instagram_link}>
                    <i className="fab m-1 h4 fa-instagram"></i>
                  </a>
                  <a href={this.state.twitter_link}>
                    <i className="fab m-1 h4 fa-twitter"></i>
                  </a>
                </Col>
              </Row>
            </Container>
            <Container
              fluid={true}
              className="text-center m-0 pt-3 pb-1 bg-dark"
            >
              <Container>
                <Row>
                  <h6 className="text-white">{this.state.copyright_text}</h6>
                </Row>
              </Container>
            </Container>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FooterDesktop;
