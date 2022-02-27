import axios from "axios";
import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppURL from "../../../api/AppURL";
export class SuggestedProduct extends Component {
  constructor() {
    super();
    this.state = {
      ProductData: [],
    };
  }

  componentDidMount() {
    let subcategory = this.props.subcategory;
    axios
      .get(AppURL.SimilarProduct(subcategory))
      .then((response) => {
        this.setState({ ProductData: response.data });
      })
      .catch((error) => {});
  }
  render() {
    const MyList = this.state.ProductData;
    if (MyList.length > 0) {
      MyList.map((item, index) => {
        if (item.special_price === "na") {
          return (
            <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
              <Link className="text-link" to={"/productdetails/" + item.id}>
                <Card className="image-box card">
                  <img className="center" src={item.image} alt="something" />
                  <Card.Body>
                    <p className="product-name-on-card">{item.title}</p>
                    <p className="product-price-on-card">
                      Price : ${item.price}
                    </p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        } else {
          return (
            <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
              <Link className="text-link" to={"/productdetails/" + item.id}>
                <Card className="image-box card">
                  <img className="center" src={item.image} />
                  <Card.Body>
                    <p className="product-name-on-card">{item.title}</p>
                    <p className="product-price-on-card">
                      Price :{" "}
                      <strike className="text-secondary">${item.price}</strike>{" "}
                      ${item.special_price}
                    </p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        }
      });
    }
    return (
      <>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>You May also like</h2>
            <p>Some of our exclusive coleection, You may like it.</p>
          </div>
          <Row>{MyList}</Row>
        </Container>
      </>
    );
  }
}

export default SuggestedProduct;
