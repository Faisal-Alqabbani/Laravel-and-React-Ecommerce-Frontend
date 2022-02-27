import axios from "axios";
import React, { Component, Fragment } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import AppURL from "../../../api/AppURL";
import ReactHtmlParser from "html-react-parser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
export class Purchase extends Component {
  constructor() {
    super();
    this.state = {
      purchase: "",
      loadingDiv: "",
      mainDiv: "d-none",
    };
  }
  componentDidMount() {
    let SiteInfoPurchase = sessionStorage.getItem("AllSiteInfo");
    if (SiteInfoPurchase === null) {
      axios
        .get(AppURL.AllSiteInfo)
        .then((response) => {
          let StatusCode = response.status;
          if (StatusCode === 200) {
            let JsonData = response.data[0]["purchase_guid"];
            this.setState({
              purchase: JsonData,
              loadingDiv: "d-none",
              mainDiv: "",
            });
            sessionStorage.setItem("AllSiteInfo", JsonData);
          } else {
            toast.error("Something went wrong with this page", {
              position: "bottom-center",
            });
          }
        })

        .catch((err) => {
          toast.error("Something went wrong with this page", {
            position: "bottom-center",
          });
        });
    } // end if condition
    else {
      this.setState({
        purchase: SiteInfoPurchase,
        loadingDiv: "d-none",
        mainDiv: "",
      });
    }
  }
  render() {
    return (
      <Fragment>
        <Container>
          <div className="breadbody">
            <Breadcrumb>
              <Breadcrumb.Item>
                {" "}
                <Link to="/"> Home </Link>{" "}
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {" "}
                <Link to="/purchase"> Purchase </Link>{" "}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <Row className="p-2">
            <Col className="shadow-sm bg-white" md={12} lg={12} sm={12} xs={12}>
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
              <div className={this.mainDiv}>
                <h4 className="section-title-login">Privacy</h4>
                <p className="section-title-contact">
                  {ReactHtmlParser(this.state.purchase)}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </Fragment>
    );
  }
}

export default Purchase;
