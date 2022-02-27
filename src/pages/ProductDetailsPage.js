import React, { useEffect, useState } from "react";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import NabMenuMobile from "../components/common/NabMenuMobile";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import ProductDetails from "../components/common/productDetails/ProductDetails";
import SuggestedProduct from "../components/common/productDetails/SuggestedProduct";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppURL from "../api/AppURL";
import SliderLoading from "../components/Placeholder/SliderLoading";
const ProductDetailsPage = ({ user }) => {
  const params = useParams();
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [minDiv, setMinDiv] = useState("d-none");
  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.ProductDetails(params.code))
      .then((response) => {
        setProductData(response.data);
        setIsLoading("d-none");
        setMinDiv("");
      })
      .catch((err) => {});
  }, [params.code]);

  return (
    <>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>
      <div className="Mobile">
        <NabMenuMobile />
      </div>
      {minDiv === "d-none" ? (
        <SliderLoading isLoading={isLoading} />
      ) : (
        <>
          <ProductDetails data={productData} user={user} />
          {/* <SuggestedProduct /> */}
        </>
      )}

      <div className="Desktop">
        <FooterDesktop />
      </div>
      <div className="Mobile">
        <FooterMobile />
      </div>
    </>
  );
};

export default ProductDetailsPage;
