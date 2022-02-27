import React, { Component } from "react";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import ForgetPassword from "../components/common/ForgetPassword";
import NabMenuMobile from "../components/common/NabMenuMobile";
import NavMenuDesktop from "../components/common/NavMenuDesktop";

export class ForgetPasswordPage extends Component {
  render() {
    return (
      <>
        <div className="Desktop">
          <NavMenuDesktop />
        </div>
        <div className="Mobile">
          <NabMenuMobile />
        </div>

        <ForgetPassword />

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

export default ForgetPasswordPage;
