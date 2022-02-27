import React, { Component, Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import cogoToast from "cogo-toast";
import axios from "axios";
import AppURL from "../../../api/AppURL";
import { Redirect } from "react-router-dom";
import SuggestedProduct from "./SuggestedProduct";
export class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      previewImg: "0",
      isSize: null,
      isColor: null,
      color: "",
      size: "",
      quantity: "",
      productCode: null,
      addToCart: "Add to Cart",
      PageRefreshStatus: false,
      addToFav: "Favourite",
    };
  }
  imgOnClick = (event) => {
    let imgSrc = event.target.getAttribute("src");
    this.setState({ previewImg: imgSrc });
  };
  // add to cart functions
  addToCart = (e) => {
    e.preventDefault();

    const color = this.state.color;
    const size = this.state.size;
    const quantity = this.state.quantity;
    const isSize = this.state.isSize;
    const isColor = this.state.isColor;
    const productCode = this.state.productCode;
    //FIXME: the problem is here'
    const email = this.props.user.email;

    if (isColor === "YES" && color.length === 0) {
      cogoToast.error("You have to provide a product color", {
        position: "top-right",
      });
    } else if (isSize === "YES" && size.length === 0) {
      cogoToast.error("You have to provide a prodcut size", {
        position: "top-right",
      });
    } else if (quantity.length === 0) {
      cogoToast.error("You have to provide how many product you want!", {
        position: "top-right",
      });
    } else if (!localStorage.getItem("token")) {
      cogoToast.warn("You have to log in first!", { position: "top-right" });
    } else {
      this.setState({ addToCart: "Add To Cart.." });
      const myFormData = new FormData();
      myFormData.append("color", color);
      myFormData.append("size", size);
      myFormData.append("quantity", quantity);
      myFormData.append("product_code", productCode);
      myFormData.append("email", email);
      axios
        .post(AppURL.AddToCart, myFormData)
        .then((response) => {
          if (response.data === 1) {
            cogoToast.success("Product Added Successfully", {
              position: "top-right",
            });
            this.setState({ addToCart: "Add To Cart" });
            this.setState({ PageRefreshStatus: true });
          } else {
            cogoToast.error("Your Request is not done ! Try Aagain", {
              position: "top-right",
            });
            this.setState({ addToCart: "Add To Cart" });
          }
        })
        .catch((error) => {
          cogoToast.error("Your Request is not done ! Try Aagain", {
            position: "top-right",
          });
          this.setState({ addToCart: "Add To Cart" });
        });
    }
  }; // end of add to cart method

  // Add to Favouraite method
  addToFav = () => {
    this.setState({ addToFav: "Adding..." });
    let productCode = this.state.productCode;
    let email = this.props.user.email;

    if (!localStorage.getItem("token")) {
      cogoToast.warn("Please You have to Login First", {
        position: "top-right",
      });
    } else {
      axios
        .get(AppURL.AddFavourite(productCode, email))
        .then((response) => {
          if (response.data === 1) {
            cogoToast.success("Product has added successfully in Fav", {
              position: "top-right",
            });
            this.setState({ addToFav: "Favourite" });
          } else {
            cogoToast.error("Your Request is not done ! Try Aagain", {
              position: "top-right",
            });
            this.setState({ addToFav: "Favourite" });
          }
        })
        .catch((error) => {
          cogoToast.error("Your Request is not done ! Try Aagain", {
            position: "top-right",
          });
          this.setState({ addToFav: "Favourite" });
        });
    }
  }; // end ADD TO FAV
  // on change buttons
  sizeOnChange = (e) => {
    let size = e.target.value;
    this.setState({ size: size });
  };
  colorOnChange = (e) => {
    let color = e.target.value;
    this.setState({ color: color });
  };
  quantityOnChange = (e) => {
    let quantity = e.target.value;
    this.setState({ quantity: quantity });
  };
  PageRefresh = () => {
    if (this.state.PageRefreshStatus === true) {
      let URL = window.location;
      return <Redirect to={URL} />;
    }
  };
  render() {
    let ProductAllData = this.props.data;
    let title = ProductAllData["productList"][0]["title"];
    let shortDescription =
      ProductAllData["productDetails"][0]["short_description"];
    let longDescription =
      ProductAllData["productDetails"][0]["long_description"];
    let brand = ProductAllData["productList"][0]["brand"];
    let category = ProductAllData["productList"][0]["category"];
    let subcategory = ProductAllData["productList"][0]["subcategory"];
    let productImage = ProductAllData["productList"][0]["image"];
    if (this.state.previewImg === "0") {
      this.setState({ previewImg: productImage });
    }
    let product_code = ProductAllData["productList"][0]["product_code"];
    let remark = ProductAllData["productList"][0]["remark"];
    let special_price = ProductAllData["productList"][0]["special_price"];
    let star = ProductAllData["productList"][0]["star"];
    let price = ProductAllData["productList"][0]["price"];

    let productImage1 = ProductAllData["productDetails"][0]["image_one"];
    let productImage2 = ProductAllData["productDetails"][0]["image_two"];
    let productImage3 = ProductAllData["productDetails"][0]["image_three"];
    let productImage4 = ProductAllData["productDetails"][0]["image_four"];
    let color = ProductAllData["productDetails"][0]["color"];
    let size = ProductAllData["productDetails"][0]["size"];
    let product_id = ProductAllData["productDetails"][0]["product_id"];

    // some functions
    var ColorDiv = "d-none";
    if (color !== "na") {
      let ColorArray = color.split(",");
      var ColorOption = ColorArray.map((ColorList, i) => {
        return <option value={ColorList}> {ColorList} </option>;
      });
      ColorDiv = "";
    } else {
      ColorDiv = "d-none";
    }

    var SizeDiv = "d-none";
    if (size !== "na") {
      let SizeArray = size.split(",");
      var SizeOption = SizeArray.map((SizeList, i) => {
        return (
          <option key={i} value={SizeList}>
            {" "}
            {SizeList}{" "}
          </option>
        );
      });
      SizeDiv = "";
    } else {
      SizeDiv = "d-none";
    }

    // buttons stuff if isSize equal null something will happend and vis varsa
    // console.log(color);
    // console.log(this.state.isColor);
    if (this.state.isSize === null) {
      if (size !== "na") {
        this.setState({ isSize: "YES" });
      } else {
        this.setState({ isSize: "NO" });
      }
    }

    if (this.state.isColor === null) {
      if (color !== "na") {
        this.setState({ isColor: "YES" });
      } else {
        this.setState({ isColor: "NO" });
      }
    }

    if (this.state.productCode === null) {
      this.setState({ productCode: product_code });
    }

    return (
      <Fragment>
        <Container className="BetweenTwoSection">
          <Row className="p-2">
            <Col
              className="shadow-sm bg-white pb-3 mt-4"
              md={12}
              lg={12}
              sm={12}
              xs={12}
            >
              <Row>
                <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                  {/* <img
                    className="bigimage"
                    src={productImage}
                    alt="something"
                    id="previewImg"
                  /> */}

                  <InnerImageZoom
                    src={this.state.previewImg}
                    zoomSrc={this.state.previewImg}
                    id="previewImg"
                    zoomScale={1.3}
                    zoomType={"hover"}
                    className="detailimage"
                  />

                  <Container className="my-3">
                    <Row>
                      <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                        <img
                          className="w-100 smallimage product-sm-img"
                          src={productImage1}
                          alt="something"
                          onClick={this.imgOnClick}
                        />
                      </Col>
                      <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                        <img
                          className="w-100 smallimage product-sm-img"
                          src={productImage2}
                          alt="something"
                          onClick={this.imgOnClick}
                        />
                      </Col>
                      <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                        <img
                          className="w-100 smallimage product-sm-img"
                          src={productImage3}
                          alt="something"
                          onClick={this.imgOnClick}
                        />
                      </Col>
                      <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                        <img
                          className="w-100 smallimage product-sm-img"
                          src={productImage4}
                          alt="something"
                          onClick={this.imgOnClick}
                        />
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col className="p-3 " md={6} lg={6} sm={12} xs={12}>
                  <h5 className="Product-Name">{title}</h5>
                  <h6 className="section-sub-title">{shortDescription}</h6>
                  <div className="input-group">
                    {special_price !== "na" ? (
                      <>
                        <p className=" Product-price-card product-price-on-card">
                          Price :{" "}
                          <strike className="text-secondary">{price}$ </strike>{" "}
                          {special_price}$
                        </p>
                        <div className="Product-price-card d-inline ">
                          50% Discount
                        </div>
                        <div className="Product-price-card d-inline ">
                          New Price ${special_price}
                        </div>
                      </>
                    ) : (
                      <div className="Product-price-card d-inline ">
                        Reguler Price ${price}
                      </div>
                    )}
                  </div>
                  <h6 className="mt-2">
                    Category : <b>{category}</b>{" "}
                  </h6>
                  {/* <h6 className="mt-2">Choose Color</h6> */}
                  {/* <div className="input-group">
                    <div className="form-check mx-1">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Black
                      </label>
                    </div>
                    <div className="form-check mx-1">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Green
                      </label>
                    </div>
                    <div className="form-check mx-1">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Red
                      </label>
                    </div>
                  </div> */}

                  {/* second radio button ================== Size stuff*/}
                  {/* <h6 className="mt-2">Choose Size</h6>
                  <div className="input-group">
                    <div className="form-check mx-1">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        X
                      </label>
                    </div>
                    <div className="form-check mx-1">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        XX
                      </label>
                    </div>
                    <div className="form-check mx-1">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        XXXX
                      </label>
                    </div>
                  </div> */}
                  <h6 className="mt-2">
                    SubCategory: <b>{subcategory}</b>
                  </h6>

                  <h6 className="mt-2">
                    Brand: <b>{brand}</b>
                  </h6>

                  <h6 className="mt-2">
                    Product Code : <b>#{product_code}</b>
                  </h6>
                  {/* display the inputs */}
                  <div className={ColorDiv}>
                    <h6 className="mt-2"> Choose Color </h6>
                    <select
                      onChange={this.colorOnChange}
                      className="form-control form-select"
                    >
                      <option>Choose Color</option>
                      {ColorOption}
                    </select>
                  </div>

                  <div className={SizeDiv}>
                    <h6 className="mt-2"> Choose Size </h6>
                    <select
                      onChange={this.sizeOnChange}
                      className="form-control form-select"
                    >
                      <option>Choose Size</option>
                      {SizeOption}
                    </select>
                  </div>

                  <div className="">
                    <h6 className="mt-2"> Choose Quantity </h6>
                    <select
                      onChange={this.quantityOnChange}
                      className="form-control form-select"
                    >
                      <option>Choose Quantity</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                    </select>
                  </div>

                  <div className="input-group mt-3">
                    <button
                      onClick={this.addToCart}
                      className="btn site-btn m-1"
                    >
                      {" "}
                      <i className="fa fa-shopping-cart"></i>{" "}
                      {this.state.addToCart}
                    </button>
                    <button className="btn btn-primary m-1">
                      {" "}
                      <i className="fa fa-car"></i> Order Now
                    </button>
                    <button
                      onClick={this.addToFav}
                      className="btn btn-primary m-1"
                    >
                      {" "}
                      <i className="fa fa-heart"></i> {this.state.addToFav}
                    </button>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col className="" md={6} lg={6} sm={12} xs={12}>
                  <h6 className="mt-2">DETAILS</h6>
                  <p>{longDescription}</p>
                </Col>

                <Col className="" md={6} lg={6} sm={12} xs={12}>
                  <h6 className="mt-2">REVIEWS</h6>
                  <p className=" p-0 m-0">
                    <span className="Review-Title">Faisal Alqabbani</span>{" "}
                    <span className="text-success">
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>{" "}
                    </span>{" "}
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat.
                  </p>

                  <p className=" p-0 m-0">
                    <span className="Review-Title">Faisal Alqabbani</span>{" "}
                    <span className="text-success">
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>{" "}
                    </span>{" "}
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat.
                  </p>

                  <p className=" p-0 m-0">
                    <span className="Review-Title">Faisal Alqabbani</span>{" "}
                    <span className="text-success">
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>{" "}
                    </span>{" "}
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat.
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          {this.PageRefresh()}
          {/* <SuggestedProduct subcategory/> */}
        </Container>
      </Fragment>
    );
  }
}

export default ProductDetails;
