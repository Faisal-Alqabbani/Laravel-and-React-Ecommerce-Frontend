import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppURL from "../../api/AppURL";

class MegaMenuAll extends Component {
  constructor() {
    super();
    this.state = {
      CatList: [],
    };
  }
  componentDidMount() {
    axios
      .get(AppURL.AllCategoryDetails)
      .then((response) => {
        console.log(response.data);
        this.setState({ CatList: response.data });
      })
      .catch((err) => {});
  }

  MenuItemClick = (e) => {
    e.target.classList.toggle("active");
    var panel = e.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  };

  render() {
    const CatList = this.state.CatList;
    const MyView = CatList.map((CatList, i) => {
      return (
        <div key={i.toString()}>
          <button onClick={this.MenuItemClick} className="accordionAll">
            <img
              className="accordionMenuIconMobile"
              src={CatList.category_image}
              alt="FAISAL CATEOGRY"
            />
            &nbsp; {CatList.category_name}
          </button>
          <div className="panelAll">
            <ul>
              {CatList.subcategory_name.map((item, i) => (
                <li key={i}>
                  <Link
                    to={
                      "productsubcategory/" +
                      CatList.category_name +
                      "/" +
                      item.subcategory_name
                    }
                    className="accordionItemMobile"
                  >
                    {" "}
                    {item.subcategory_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    });

    return (
      <div className="accordionMenuDivAll">
        <div className="accordionMenuDivInsideAll">{MyView}</div>
      </div>
    );
  }
}

export default MegaMenuAll;
