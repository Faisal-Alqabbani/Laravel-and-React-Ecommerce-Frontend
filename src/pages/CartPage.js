import React from "react";
import Cart from "../components/Cart/Cart";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import NabMenuMobile from "../components/common/NabMenuMobile";
import NavMenuDesktop from "../components/common/NavMenuDesktop";

function CartPage(props) {
  return (
    <>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>
      <div className="Mobile">
        <NabMenuMobile />
      </div>

      <Cart user={props.user} />

      <div className="Desktop">
        <FooterDesktop />
      </div>
      <div className="Mobile">
        <FooterMobile />
      </div>
    </>
  );
}

export default CartPage;
