import React, { Component } from "react";
import { Card, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import AppURL from "../../api/AppURL";
import NewArrivalLoading from "../Placeholder/NewArrivalLoading";
import { Link } from "react-router-dom";
export class NewArrival extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.state = {
      productData: [],
      isLoading: "",
      mainDiv: "d-none",
    };
  }

  componentDidMount() {
    axios
      .get(AppURL.ProductListByRemark("NEW"))
      .then((response) => {
        console.log("new stuff");
        this.setState({
          productData: response.data,
          isLoading: "d-none",
          mainDiv: "",
        });
      })
      .catch((err) => {});
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplayspeed: 3000,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    const NewArrival = this.state.productData;
    const MyView = NewArrival.map((item, i) => {
      if (item.special_price === "na") {
        return (
          <div>
            <Link className="text-link" to={"/productdetails/" + item.id}>
              <Card key={i} className="image-box card">
                <img className="center" src={item.image} alt="card-1" />
                <Card.Body>
                  <p className="product-name-on-card">{item.title}</p>
                  <p className="product-price-on-card">Price : ${item.price}</p>
                </Card.Body>
              </Card>
            </Link>
          </div>
        );
      } else {
        return (
          <div>
            <Link className="text-link" to={"/productdetails/" + item.id}>
              <Card key={i} className="image-box card">
                <img className="center" src={item.image} alt="card-1" />
                <Card.Body>
                  <p className="product-name-on-card">{item.title}</p>
                  <p className="product-price-on-card">
                    Price : $
                    <strike className="text-secondary">{item.price}</strike> $
                    {item.special_price}
                  </p>
                </Card.Body>
              </Card>
            </Link>
          </div>
        );
      }
    });
    return (
      <>
        <NewArrivalLoading isLoading={this.state.isLoading} />

        <div className={this.state.mainDiv}>
          <Container className="text-center" fluid={true}>
            <div className="section-title text-center mb-55">
              <h2>
                {" "}
                NEW ARRIVAL &nbsp;
                <a className="btn btn-sm ml-3 site-btn" onClick={this.previous}>
                  <i className="fa fa-angle-left"></i>
                </a>
                &nbsp;
                <a className="btn btn-sm ml-2 site-btn" onClick={this.next}>
                  <i className="fa fa-angle-right"></i>
                </a>
              </h2>

              <p>Some Of Our Exclusive Collection, You May Like</p>
            </div>
            <Row>
              <Slider ref={(c) => (this.slider = c)} {...settings}>
                {MyView}
              </Slider>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default NewArrival;
