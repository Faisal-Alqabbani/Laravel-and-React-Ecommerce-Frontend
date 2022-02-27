import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class MegaMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  MegaMenu() {
    var acc = document.getElementsByClassName("accordion");
    var accNum = acc.length;
    for (let i = 0; i < accNum; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
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
    const CatList = this.props.data;
    const MyView = CatList.map((CatList, i) => {
      return (
        <div key={i.toString()}>
          <button onClick={this.MenuItemClick} className="accordionMobile">
            <img
              className="accordionMenuIconMobile"
              src={CatList.category_image}
              alt="FAISAL CATEOGRY"
            />
            &nbsp; {CatList.category_name}
          </button>
          <div className="panel">
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
      <div className="accordionMenuDivMobile">
        <div className="accordionMenuDivInsideMobile">{MyView}</div>
      </div>
    );
  }
}

export default MegaMenu;
