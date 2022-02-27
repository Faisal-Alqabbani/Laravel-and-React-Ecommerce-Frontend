import React, { useEffect, useState } from "react";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import NabMenuMobile from "../components/common/NabMenuMobile";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import axios from "axios";
import AppURL from "../api/AppURL";
import { useParams } from "react-router-dom";
import SearchList from "../components/Search/SearchList";
const SearchPage = () => {
  const params = useParams();
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.ProductBySearch(params.searchkey))
      .then((response) => {
        setProductData(response.data);
      })
      .catch((err) => {});
  }, [params.searchkey]);
  return (
    <>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>
      <div className="Mobile">
        <NabMenuMobile />
      </div>
      <SearchList productData={productData} searchkey={params.searchkey} />
      <div className="Desktop">
        <FooterDesktop />
      </div>
      <div className="Mobile">
        <FooterMobile />
      </div>
    </>
  );
};

export default SearchPage;
