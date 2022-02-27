import axios from "axios";
import React, { Component, Fragment } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import AppURL from "../../../api/AppURL";
import ReactHtmlParser from "html-react-parser";
import { Link } from "react-router-dom";
export class Refund extends Component {
  constructor() {
    super();
    this.state = {
      refund: "",
    };
  }
  componentDidMount() {
    axios
      .get(AppURL.AllSiteInfo)
      .then((response) => {
        let StatusCode = response.status;
        if (StatusCode === 200) {
          let JsonData = response.data[0]["refund"];
          this.setState({ refund: JsonData });
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
                <Link to="/refund"> Refund </Link>{" "}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Row className="p-2">
            <Col className="shadow-sm bg-white" md={12} lg={12} sm={12} xs={12}>
              <h4 className="section-title-login">Refund</h4>
              <p className="section-title-contact">
                {ReactHtmlParser(this.state.refund)}
              </p>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Refund;
