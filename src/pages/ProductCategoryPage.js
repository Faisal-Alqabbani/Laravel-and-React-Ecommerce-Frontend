import React, { Component, useEffect, useState } from "react";
import ProductCategory from "../components/Category/ProductCategory";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import NabMenuMobile from "../components/common/NabMenuMobile";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppURL from "../api/AppURL";
const ProductCategoryPage = ({ match }) => {
  const params = useParams();
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.ProductListByCategory(params.category))
      .then((response) => {
        setProductData(response.data);
      })
      .catch((err) => {});
  }, [params.category]);
  return (
    <>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>
      <div className="Mobile">
        <NabMenuMobile />
      </div>
      <ProductCategory Category={params.category} ProductData={productData} />
      <div className="Desktop">
        <FooterDesktop />
      </div>
      <div className="Mobile">
        <FooterMobile />
      </div>
    </>
  );
};

export default ProductCategoryPage;
