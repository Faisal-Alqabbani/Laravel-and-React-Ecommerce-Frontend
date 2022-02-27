import React, { Component } from "react";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import NabMenuMobile from "../components/common/NabMenuMobile";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import UserLogin from "../components/common/UserLogin";

export class UserLoginPage extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }
  render() {
    const setUser = this.props.setUser;
    const user = this.props.user;
    return (
      <>
        <div className="Desktop">
          <NavMenuDesktop />
        </div>
        <div className="Mobile">
          <NabMenuMobile />
        </div>

        <UserLogin setUser={setUser} user={user} />

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

export default UserLoginPage;
