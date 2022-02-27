import axios from "axios";
import React, { Component, Fragment } from "react";
import AppURL from "../api/AppURL";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import NabMenuMobile from "../components/common/NabMenuMobile";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import Category from "../components/Home/Category";
import Collection from "../components/Home/Collection";
import FeaturedProduct from "../components/Home/FeaturedProduct";
import HomeTop from "../components/Home/HomeTop";
import HomeTopMobile from "../components/Home/HomeTopMobile";
import NewArrival from "../components/Home/NewArrival";

export class HomePage extends Component {
  componentDidMount() {
    window.scroll(0, 0);
    this.GetVisitorDetails();
  }
  GetVisitorDetails = () => {
    axios
      .get(AppURL.VisitorDetails)
      .then((response) => {})
      .catch((error) => {});
  };
  render() {
    return (
      <>
        <div className="Desktop">
          <NavMenuDesktop />
          <HomeTop />
        </div>
        <div className="Mobile">
          <NabMenuMobile />
          <HomeTopMobile />
        </div>

        {/* <NavMenuDesktop /> */}

        <FeaturedProduct />
        <NewArrival />
        <Category />
        <Collection />
        <div className="Desktop">
          <FooterDesktop />
        </div>
        <div className="Mobile">
          <FooterMobile />
        </div>
      </>
    );
  }
}

export default HomePage;
