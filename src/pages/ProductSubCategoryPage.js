import React, { useEffect, useState } from "react";
import ProductSubCategory from "../components/Category/ProductSubCategory";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import NabMenuMobile from "../components/common/NabMenuMobile";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppURL from "../api/AppURL";
const ProductSubCategoryPage = () => {
  const params = useParams();

  const [productData, setProductData] = useState([]);
  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(
        AppURL.ProductListByCategoryAndSubCategory(
          params.category,
          params.subcategory
        )
      )
      .then((response) => {
        console.log(response.data);
        setProductData(response.data);
      })
      .catch((err) => {});
  }, [params.category, params.subcategory]);
  return (
    <>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>
      <div className="Mobile">
        <NabMenuMobile />
      </div>
      <ProductSubCategory
        SubCategory={params.subcategory}
        Category={params.category}
        ProductData={productData}
      />
      <div className="Desktop">
        <FooterDesktop />
      </div>
      <div className="Mobile">
        <FooterMobile />
      </div>
    </>
  );
};

export default ProductSubCategoryPage;
