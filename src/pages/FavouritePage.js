import React, { Component } from "react";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import NabMenuMobile from "../components/common/NabMenuMobile";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import Favourite from "../components/Favourite/Favourite";

export class FavouritePage extends Component {
  render() {
    return (
      <>
        <div className="Desktop">
          <NavMenuDesktop />
        </div>
        <div className="Mobile">
          <NabMenuMobile />
        </div>

        <Favourite user={this.props.user} />

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

export default FavouritePage;
