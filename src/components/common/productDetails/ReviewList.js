import axios from "axios";
import React, { Component } from "react";
import AppURL from "../../../api/AppURL";

export class ReviewList extends Component {
  constructor() {
    super();
    this.state = {
      ReviewData: [],
    };
  }
  componentDidMount() {
    axios
      .get(AppURL.ReviewList)
      .then((response) => {
        this.setState({ ReviewData: response.data });
      })
      .catch((error) => {
        console.log("something went wrong");
      });
  }
  render() {
    const MyList = this.state.ReviewData;
    if (MyList.length > 0) {
      var myView = MyList.map((ReviewList, i) => {
        if (ReviewList.reviewer_rating === "1") {
          return (
            <div>
              <p className=" p-0 m-0">
                <span className="Review-Title">{ReviewList.reviewer_name}</span>{" "}
                <span className="text-success">
                  <i className="fa fa-star"></i>{" "}
                </span>{" "}
              </p>
              <p>{ReviewList.reviewer_comments}</p>
            </div>
          );
        } else if (ReviewList.reviewer_rating === "2") {
          return (
            <div>
              <p className=" p-0 m-0">
                <span className="Review-Title">{ReviewList.reviewer_name}</span>{" "}
                <span className="text-success">
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                </span>{" "}
              </p>
              <p>{ReviewList.reviewer_comments}</p>
            </div>
          );
        } else if (ReviewList.reviewer_rating === "3") {
          return (
            <div>
              <p className=" p-0 m-0">
                <span className="Review-Title">{ReviewList.reviewer_name}</span>{" "}
                <span className="text-success">
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star"></i>{" "}
                </span>{" "}
              </p>
              <p>{ReviewList.reviewer_comments}</p>
            </div>
          );
        } else if (ReviewList.reviewer_rating === "4") {
          return (
            <div>
              <p className=" p-0 m-0">
                <span className="Review-Title">{ReviewList.reviewer_name}</span>{" "}
                <span className="text-success">
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                </span>{" "}
              </p>
              <p>{ReviewList.reviewer_comments}</p>
            </div>
          );
        } else if (ReviewList.reviewer_rating === "5") {
          return (
            <div>
              <p className=" p-0 m-0">
                <span className="Review-Title">{ReviewList.reviewer_name}</span>{" "}
                <span className="text-success">
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>{" "}
                </span>{" "}
              </p>
              <p>{ReviewList.reviewer_comments}</p>
            </div>
          );
        } // end else if
      }); // end map
    }
    return (
      <div>
        <h6 className="mt-2">REVIEWS</h6>

        {myView}
      </div>
    );
  }
}

export default ReviewList;
