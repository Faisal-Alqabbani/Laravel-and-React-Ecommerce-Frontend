import React, { Component, Fragment } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import cogoToast from "cogo-toast";
import { Redirect } from "react-router-dom";
import axios from "axios";
import AppURL from "../../api/AppURL";
export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      isLoading: "",
      mainDiv: "d-none",
      confirmBtn: "Confirm Order",
      city: "",
      payment: "",
      name: "",
      address: "",
    };
  }

  componentDidMount() {
    axios
      .get(AppURL.CartList(this.props.user.email))
      .then((response) => {
        this.setState({
          productData: response.data,
          isLoading: "d-none ",
          mainDiv: "",
        });
      })
      .catch((error) => {
        console.log("something went wrong ");
      });
  }

  removeItem = (id) => {
    axios
      .get(AppURL.RemoveCartList(id))
      .then((response) => {
        console.log(response.data, id);
        if (response.data === id) {
          cogoToast.success("Cart Item Remove", { position: "top-right" });
          const updateData = this.state.productData.filter(
            (item) => item.id !== response.data
          );
          this.setState({ productData: updateData });
        } else {
          cogoToast.error("Your Request is not done! Try Again", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        cogoToast.error("Your Request is not done! Try Again", {
          position: "top-right",
        });
      });
  };

  ItemPlus = (id, quantity, price) => {
    axios
      .get(AppURL.CartItemPlus(id, quantity, price))
      .then((response) => {
        console.log("hi there");
        if (response.data === 1) {
          cogoToast.success("Item Quantity Increased", {
            position: "top-right",
          });
          this.setState({ PageRefreshStatus: true });
        } else {
          cogoToast.error("Your Request is not done ! Try Aagain", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        cogoToast.error("Your Request is not done ! Try Aagain", {
          position: "top-right",
        });
      });
  }; // End ItemPlus Mehtod

  ItemMinus = (id, quantity, price) => {
    axios
      .get(AppURL.CartItemMinus(id, quantity, price))
      .then((response) => {
        if (response.data === 1) {
          cogoToast.success("Item Quantity Decreased", {
            position: "top-right",
          });
          this.setState({ PageRefreshStatus: true });
        } else {
          cogoToast.error("Your Request is not done ! Try Aagain", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        cogoToast.error("Your Request is not done ! Try Aagain", {
          position: "top-right",
        });
      });
  }; // End ItemMinus Mehtod
  // onChange methods
  // city input onChange
  cityOnChange = (e) => {
    const city = e.target.value;
    this.setState({ city: city });
  };

  paymentMethodOnChange = (e) => {
    const payment = e.target.value;
    this.setState({ payment: payment });
  };

  nameOnChange = (e) => {
    const name = e.target.value;
    this.setState({ name: name });
  };

  addressOnChange = (e) => {
    const address = e.target.value;
    this.setState({ address: address });
  };

  // confirm the product:
  confirmOnClick = (e) => {
    let city = this.state.city;
    let payment = this.state.payment;
    let name = this.state.name;
    let address = this.state.address;
    if (city.length === 0) {
      cogoToast.error("please Select a city", { position: "top-right" });
    } else if (payment.length === 0) {
      cogoToast.error("please Select payment Method", {
        position: "top-right",
      });
    } else if (name.length === 0) {
      cogoToast.error("please provide your name", { position: "top-right" });
    } else if (address.length === 0) {
      cogoToast.erorr("please provide your address", {
        position: "top-right",
      });
    }
  };
  render() {
    const MyList = this.state.productData;
    let totalPriceSum = 0;
    const MyView = MyList.map((ProductList, i) => {
      totalPriceSum = totalPriceSum + parseInt(ProductList.total_price);
      return (
        <Col key={i} className="p-1" lg={12} md={12} sm={12} xs={12}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={3} lg={3} sm={6} xs={6}>
                  <img
                    alt="something"
                    className="cart-product-img"
                    src={ProductList.image}
                  />
                </Col>

                <Col md={6} lg={6} sm={6} xs={6}>
                  <h5 className="product-name">{ProductList.product_name}</h5>
                  <h6> Quantity = {ProductList.quantity} </h6>
                  <p>
                    {ProductList.size} | {ProductList.color}
                  </p>
                  <h6>
                    Price = {ProductList.unit_price} x {ProductList.qantity} ={" "}
                    {ProductList.total_price}${" "}
                  </h6>
                </Col>

                <Col md={3} lg={3} sm={12} xs={12}>
                  <Button
                    onClick={() => this.removeItem(ProductList.id)}
                    className="btn mt-2 mx-1 btn-lg site-btn"
                  >
                    <i className="fa fa-trash-alt"></i>{" "}
                  </Button>

                  <Button
                    onClick={() =>
                      this.ItemPlus(
                        ProductList.id,
                        ProductList.quantity,
                        ProductList.unit_price
                      )
                    }
                    className="btn mt-2 mx-1 btn-lg site-btn"
                  >
                    <i className="fa fa-plus"></i>{" "}
                  </Button>

                  <Button
                    onClick={() =>
                      this.ItemMinus(
                        ProductList.id,
                        ProductList.quantity,
                        ProductList.unit_price
                      )
                    }
                    className="btn mt-2 mx-1 btn-lg site-btn"
                  >
                    <i className="fa fa-minus"></i>{" "}
                  </Button>
                  {/* <Button
                    onClick={() => this.removeItem(ProductList.id)}
                    className="btn btn-block w-100 mt-3 site-btn"
                  >
                    <i className="fa fa-trash-alt"></i> Remove{" "}
                  </Button> */}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return (
      <Fragment>
        <Container fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>Product Cart List</h2>
          </div>

          <Row>
            <Col className="p-1" lg={7} md={7} sm={12} xs={12}>
              {MyView}
            </Col>
            <Col className="p-1" lg={5} md={5} sm={12} xs={12}>
              <div className="card p-2">
                <div className="card-body">
                  <div className="container-fluid ">
                    <div className="row">
                      <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                        <h5 className="Product-Name text-danger">
                          Total Due: {totalPriceSum} $
                        </h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                        <label className="form-label">Choose City</label>
                        <select
                          className="form-control"
                          onChange={this.cityOnChange}
                        >
                          <option value="">Choose</option>
                          <option value="Riyadh">Assam</option>
                          <option value="Riyadh">Bihar </option>
                          <option value="Riyadh">Goa </option>
                          <option value="Riyadh">Gujarat </option>
                          <option value="Riyadh">Himachal Pradesh </option>
                          <option value="Riyadh">Punjab </option>
                        </select>
                      </div>
                      <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                        <label className="form-label">
                          Choose Payment Method
                        </label>
                        <select
                          className="form-control"
                          onChange={this.paymentMethodOnChange}
                        >
                          <option value="">Choose</option>
                          <option value="Cash On Delivery">
                            Cash On Delivery
                          </option>
                          <option value="Cash On Delivery">Stripe</option>
                        </select>
                      </div>
                      <div
                        className="col-md-12 p-1 col-lg-12 col-sm-12 col-12"
                        onChange={this.nameOnChange}
                      >
                        <label className="form-label">Your Name</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                        />
                      </div>

                      <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                        <label className="form-label">Delivery Address</label>
                        <textarea
                          rows={2}
                          className="form-control"
                          type="text"
                          placeholder=""
                          onChange={this.addressOnChange}
                        />
                      </div>
                      <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                        <button
                          className="btn  site-btn"
                          onClick={this.confirmOnClick}
                        >
                          Confirm Order{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Cart;
