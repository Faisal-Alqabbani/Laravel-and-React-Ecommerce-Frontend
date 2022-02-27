import axios from "axios";
import React, { Component, Fragment } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import AppURL from "../../../api/AppURL";
import ReactHtmlParser from "html-react-parser";
import { Link } from "react-router-dom";
export class Privacy extends Component {
  constructor() {
    super();
    this.state = {
      privacy: "",
      loadingDiv: "",
      mainDiv: "d-none",
    };
  }
  componentDidMount() {
    axios
      .get(AppURL.AllSiteInfo)
      .then((response) => {
        let StatusCode = response.status;
        if (StatusCode === 200) {
          let JsonData = response.data[0]["privacy"];
          this.setState({
            privacy: JsonData,
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
        <Container>
          <div className="breadbody">
            <Breadcrumb>
              <Breadcrumb.Item>
                {" "}
                <Link to="/"> Home </Link>{" "}
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {" "}
                <Link to="/privacy"> Privacy </Link>{" "}
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
              {/* The page content! */}
              <div className={this.state.mainDiv}>
                <p className="section-title-contact p-3">
                  {ReactHtmlParser(this.state.privacy)}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
export default Privacy;
