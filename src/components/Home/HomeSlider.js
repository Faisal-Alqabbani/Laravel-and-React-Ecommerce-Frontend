import axios from "axios";
import React, { Component } from "react";
import Slider from "react-slick";
import AppURL from "../../api/AppURL";

class HomeSlider extends Component {
  constructor() {
    super();
    this.state = {
      Sliders: [],
    };
  }
  componentDidMount() {
    axios
      .get(AppURL.AllSlider)
      .then((response) => {
        this.setState({ Sliders: response.data });
      })
      .catch(() => {});
  }
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
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
    const ourSlider = this.state.Sliders;
    const ViewData = ourSlider.map((item, index) => {
      return (
        <div key={index}>
          <img className="slider-img" src={item.slider_image} alt="slider1" />
        </div>
      );
    });
    return (
      <div>
        <Slider {...settings}>{ViewData}</Slider>
      </div>
    );
  }
}

export default HomeSlider;
