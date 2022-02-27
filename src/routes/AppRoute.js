import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import CartPage from "../pages/CartPage";

import ContactPage from "../pages/ContactPage";
import FavouritePage from "../pages/FavouritePage";
import HomePage from "../pages/HomePage";
import NotificationPage from "../pages/NotificationPage";
import PrivacyPage from "../pages/PrivacyPage";
import ProductCategoryPage from "../pages/ProductCategoryPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductSubCategoryPage from "../pages/ProductSubCategoryPage";
import PurchasePage from "../pages/PurchasePage";
import RefundPage from "../pages/RefundPage";
import SearchPage from "../pages/SearchPage";
import UserLoginPage from "../pages/UserLoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ProfilePage from "../pages/ProfilePage";
import axios from "axios";
import AppURL from "../api/AppURL";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
export class AppRoute extends Component {
  // FIXME: fragment method
  // TODO: all the routes which the app needed
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    axios.get(AppURL.UserData).then((response) => {
      this.setUser(response.data);
    });
  }

  setUser = (user) => {
    this.setState({ user: user });
  };
  render() {
    return (
      <Fragment>
        <NavMenuDesktop user={this.state.user} setUser={this.setUser} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <HomePage {...props} key={Date.now()} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <UserLoginPage
                user={this.state.user}
                setUser={this.setUser}
                {...props}
                key={Date.now()}
              />
            )}
          />
          <Route
            exact
            path="/register"
            render={(props) => (
              <RegisterPage
                user={this.state.user}
                setUser={this.setUser}
                {...props}
                key={Date.now()}
              />
            )}
          />
          <Route
            exact
            path="/forget"
            render={(props) => (
              <ForgetPasswordPage {...props} key={Date.now()} />
            )}
          />
          {/* Profile */}
          <Route
            exact
            path="/profile"
            render={(props) => (
              <ProfilePage
                user={this.state.user}
                setUser={this.setUser}
                {...props}
                key={Date.now()}
              />
            )}
          />
          {/* reset password page */}
          <Route
            exact
            path="/reset-password/:token"
            render={(props) => (
              <ResetPasswordPage {...props} key={Date.now()} />
            )}
          />

          <Route
            exact
            path="/contact"
            render={(props) => <ContactPage {...props} key={Date.now()} />}
          />
          <Route
            exact
            path="/purchase"
            render={(props) => <PurchasePage {...props} key={Date.now()} />}
          />
          <Route
            exact
            path="/privacy"
            render={(props) => <PrivacyPage {...props} key={Date.now()} />}
          />
          <Route
            exact
            path="/productdetails/:code"
            render={(props) => (
              <ProductDetailsPage
                {...props}
                key={Date.now()}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/notification"
            render={(props) => <NotificationPage {...props} key={Date.now()} />}
          />
          <Route
            exact
            path="/favourite"
            render={(props) => (
              <FavouritePage
                {...props}
                key={Date.now()}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/cart"
            render={(props) => (
              <CartPage {...props} key={Date.now()} user={this.state.user} />
            )}
          />
          <Route
            exact
            path="/about"
            render={(props) => <AboutPage {...props} key={Date.now()} />}
          />
          <Route
            exact
            path="/refund"
            render={(props) => <RefundPage {...props} key={Date.now()} />}
          />
          <Route
            exact
            path="/productcategory/:category"
            render={(props) => (
              <ProductCategoryPage {...props} key={Date.now()} />
            )}
          />
          <Route
            exact
            path="/productsubcategory/:category/:subcategory"
            render={(props) => (
              <ProductSubCategoryPage {...props} key={Date.now()} />
            )}
          />
          {/* prodcutbysearch  */}
          <Route
            exact
            path="/productbysearch/:searchkey"
            render={(props) => <SearchPage {...props} key={Date.now()} />}
          />
          {/* App URL  */}
        </Switch>
      </Fragment>
    );
  }
}

export default AppRoute;
