import React, { Component, Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MegaMenu from "./MegaMenu";
import HomeSlider from "./HomeSlider";
import MegaMenuMobile from "./MegaMenuMobile";
import axios from "axios";
import AppURL from "../../api/AppURL";
import SliderLoading from "../Placeholder/SliderLoading";
export class HomeTop extends Component {
  constructor() {
    super();
    this.state = {
      menuData: [],
      SliderData: [],
      isLoading: "",
      mainDiv: "d-none",
    };
  }
  componentDidMount() {
    axios
      .get(AppURL.AllCategoryDetails)
      .then((response) => {
        this.setState({
          menuData: response.data,
          isLoading: "d-none",
          mainDiv: "",
        });
      })
      .catch((err) => {});
  }

  render() {
    return (
      <Fragment>
        <SliderLoading isLoading={this.state.isLoading} />
        <div className={this.state.mainDiv}>
          <Container className="p-0 m-0 overflow-hidden" fluid={true}>
            <Row>
              {/*  Load Mega Menu  */}
              <Col lg={3} md={3} sm={12}>
                <MegaMenu data={this.state.menuData} />
              </Col>
              {/* Slider */}
              <Col lg={9} md={9} sm={12}>
                <HomeSlider />
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default HomeTop;
