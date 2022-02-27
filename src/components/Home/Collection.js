import axios from "axios";
import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppURL from "../../api/AppURL";
import CollectionLoading from "../Placeholder/CollectionLoading";

export default class Collection extends Component {
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
      .get(AppURL.ProductListByRemark("COLLECTION"))
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
    const collectionList = this.state.productData;
    const MyView = collectionList.map((item, i) => {
      if (item.special_price === "na") {
        return (
          <Col className="p-0" xl={3} key={i} lg={3} md={3} sm={6} xs={6}>
            <Link className="text-link" to={"/productdetails/" + item.id}>
              <Card className="image-box card w-100">
                <img className="center w-75" src={item.image} alt="card-1" />
                <Card.Body>
                  <p className="product-name-on-card">{item.title}</p>
                  <p className="product-price-on-card">Price : ${item.price}</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      } else {
        return (
          <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
            <Link className="text-link" to={"/productdetails/" + item.id}>
              <Card className="image-box card w-100">
                <img className="center w-75" src={item.image} alt="card-1" />
                <Card.Body>
                  <p className="product-name-on-card">{item.title}</p>
                  <p className="product-price-on-card">
                    Price :
                    <strike className="text-secondary">${item.price}</strike> $
                    {item.special_price}
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
        <CollectionLoading isLoading={this.state.isLoading} />

        <div className={this.state.mainDiv}>
          <Container className="text-center" fluid={true}>
            <div className="section-title text-center mb-55">
              <h2> PRODUCT COLLECTION</h2>
              <p>Some Of Our Exclusive Collection, You May Like</p>
            </div>
            <Row>
              {MyView}
              {/*  */}

              {/*  */}
              <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
                <Card className="image-box card">
                  <img
                    className="center"
                    src="https://rukminim1.flixcart.com/image/660/792/krayqa80/jacket/g/9/i/m-asaajk4740-arrow-sport-original-imag54gxntfb2swa.jpeg?q=50"
                    alt="card-1"
                  />
                  <Card.Body>
                    <p className="product-name-on-card">
                      Realme C21 (Cross Black, 64 GB)
                    </p>
                    <p className="product-price-on-card">Price : $120</p>
                  </Card.Body>
                </Card>
              </Col>
              {/*  */}
              <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
                <Card className="image-box card">
                  <img
                    className="center"
                    src="https://rukminim1.flixcart.com/image/660/792/keykscw0-0/t-shirt/i/3/k/l-bnvgyrnful-z12-blive-original-imafvgzkq2hhpguh.jpeg?q=50"
                    alt="card-1"
                  />
                  <Card.Body>
                    <p className="product-name-on-card">
                      Realme C21 (Cross Black, 64 GB)
                    </p>
                    <p className="product-price-on-card">Price : $120</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
