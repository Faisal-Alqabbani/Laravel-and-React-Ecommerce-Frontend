import axios from "axios";
import React, { Component, Fragment } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import AppURL from "../../../api/AppURL";
import ReactHtmlParser from "html-react-parser";
import { Link } from "react-router-dom";
export class About extends Component {
  constructor() {
    super();
    this.state = {
      about: "",
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
          let JsonData = response.data[0]["about"];
          this.setState({ about: JsonData, loadingDiv: "d-none", mainDiv: "" });
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
                <Link to="/about"> About </Link>{" "}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <Row className="p-4">
            <Col
              className="shadow-sm bg-white p-4"
              md={12}
              lg={12}
              sm={12}
              xs={12}
            >
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
                <p className="section-title-contact">
                  {ReactHtmlParser(this.state.about)}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default About;
