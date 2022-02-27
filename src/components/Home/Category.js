import React, { Component } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import axios from "axios";
import AppURL from "../../api/AppURL";
import { Link } from "react-router-dom";
import CategoryLoading from "../Placeholder/CategoryLoading";
export class Category extends Component {
  constructor() {
    super();
    this.state = {
      menuData: [],
      isLoading: "",
      mainDiv: "d-none",
    };
  }
  componentDidMount() {
    console.log("HomeTop");
    axios
      .get(AppURL.AllCategoryDetails)
      .then((response) => {
        console.log(response.data);
        this.setState({
          menuData: response.data,
          isLoading: "d-none",
          mainDiv: " ",
        });
      })
      .catch((err) => {});
  }

  render() {
    const CatList = this.state.menuData;
    const MyView = CatList.map((Catlist, i) => {
      return (
        <Col
          key={i.toString()}
          className="p-0"
          xl={2}
          lg={2}
          md={2}
          sm={6}
          xs={6}
        >
          <Link to={`/productcategory/${Catlist.category_name}`}>
            <Card className="h-100 w-100 text-center mx-2">
              <Card.Body>
                <img
                  className="center"
                  src={Catlist.category_image}
                  alt="FAISAL CATEGORY"
                />
                <h3 className="category-name my-2">{Catlist.category_name} </h3>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      );
    });
    return (
      <>
        <CategoryLoading isLoading={this.state.isLoading} />

        <div className={this.state.mainDiv}>
          <Container className="text-center" fluid={true}>
            <div className="section-title text-center mb-55">
              <h2> CATEGORIES</h2>
              <p>Some Of Our Exclusive Collection, You May Like</p>
            </div>

            <Row>{MyView}</Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Category;
