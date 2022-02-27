import axios from "axios";
import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppURL from "../../api/AppURL";
import FeaturedLoading from "../Placeholder/FeaturedLoading";
class FeaturedProduct extends Component {
  constructor() {
    super();
    this.state = {
      productData: [],
      isLoading: "",
      mainDiv: "d-none",
    };
  }
  componentDidMount() {
    axios
      .get(AppURL.ProductListByRemark("FEATURED"))
      .then((response) => {
        this.setState({
          productData: response.data,
          isLoading: "d-none",
          mainDiv: "",
        });
      })
      .catch((err) => {});
  }
  render() {
    const CatList = this.state.productData;
    const MyView = CatList.map((Catlist, i) => {
      if (Catlist.special_price === "na") {
        return (
          <Col className="p-1" key={i} xl={2} lg={2} md={2} sm={4} xs={6}>
            <Link to={`/productdetails/${Catlist.id}`}>
              <Card className="image-box card">
                <img className="center" src={Catlist.image} alt="card-1" />
                <Card.Body>
                  <p className="product-name-on-card">{Catlist.title}</p>
                  <p className="product-price-on-card">
                    Price : ${Catlist.price}
                  </p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      } else {
        return (
          <Col className="p-1" key={i} xl={2} lg={2} md={2} sm={4} xs={6}>
            <Link to={`/productdetails/${Catlist.id}`}>
              <Card className="image-box card">
                <img className="center" src={Catlist.image} alt="card-1" />
                <Card.Body>
                  <p className="product-name-on-card">{Catlist.title}</p>
                  <p className="product-price-on-card">
                    Price :
                    <strike className="text-secondary">${Catlist.price}</strike>{" "}
                    ${Catlist.special_price}
                  </p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      }
    });
    return (
      <>
        <FeaturedLoading isLoading={this.state.isLoading} />
        <div className={this.state.mainDiv}>
          <Container className="text-center" fluid={true}>
            <div className="section-title text-center mb-55">
              <h2>FEATURED PRODUCTS</h2>
              <p>Some of our exclusive coleection, You may like it.</p>
            </div>
            <Row>{MyView}</Row>
          </Container>
        </div>
      </>
    );
  }
}

export default FeaturedProduct;
