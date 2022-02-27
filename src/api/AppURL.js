class AppURL {
  static BaseURL = "http://127.0.0.1:8000/api";
  static VisitorDetails = this.BaseURL + "/getvisitor";
  static PostContact = this.BaseURL + "/postcontact";
  static AllSiteInfo = this.BaseURL + "/allsiteinfo";
  static AllCategoryDetails = this.BaseURL + "/allcategories";
  static ProductListByRemark(Remark) {
    return this.BaseURL + "/productlistbyremark/" + Remark;
  }
  static ProductListByCategory(Category) {
    return this.BaseURL + "/productlistbycategory/" + Category;
  }
  static ProductListByCategoryAndSubCategory(Category, SubCategory) {
    return (
      this.BaseURL + "/productlistbysubcategory/" + Category + "/" + SubCategory
    );
  }
  static AllSlider = this.BaseURL + "/getallslider";
  static ProductDetails(product_id) {
    return this.BaseURL + "/productdetails/" + product_id;
  }
  // Notification App
  static NotificationHistory = this.BaseURL + "/getallnotification";
  // Search Routes
  static ProductBySearch(searchKey) {
    return this.BaseURL + "/search/" + searchKey;
  }
  // Login url
  static LoginUser = this.BaseURL + "/login";
  // Register api route
  static RegisterUser = this.BaseURL + "/register";
  // GET USER LOGGED IN USER

  static UserData = this.BaseURL + "/user";
  // Forget Password
  static ForgetPassword = this.BaseURL + "/forget-password";
  // Reset Password
  static ResetPassword = this.BaseURL + "/reset-password";

  // GET ALL THE SIMILAR PRODUCTS
  static SimilarProduct(code) {
    return this.BaseURL + "/similar/" + code;
  }

  static ReviewList(code) {
    return this.BaseURL + "/reviewlist/" + code;
  }
  static AddToCart = this.BaseURL + "/addtocart";
  // Get your count cart.
  static CartCount(product_code) {
    return this.BaseURL + "/cartcount/" + product_code;
  }

  // add Favourite route from backend routes
  static AddFavourite(product_code, email) {
    return this.BaseURL + "/favourite/" + product_code + "/" + email;
  }
  // GET FAVOURITE ROUTE
  static FavouriteList(email) {
    return this.BaseURL + "/favouritelist/" + email;
  }
  // Remove Favourite
  static FavouriteRemove(product_code, email) {
    return this.BaseURL + "/favouriteremove/" + product_code + "/" + email;
  }
  // get all cart list
  static CartList(email) {
    return this.BaseURL + "/cartlist/" + email;
  }
  // Remove Item from
  static RemoveCartList(id) {
    return this.BaseURL + "/removecartlist/" + id;
  }

  static CartItemPlus(id, quantity, price) {
    return this.BaseURL + "/cartitemplus/" + id + "/" + quantity + "/" + price;
  }

  static CartItemMinus(id, quantity, price) {
    return this.BaseURL + "/cartitemminus/" + id + "/" + quantity + "/" + price;
  }
  // order items
  static CartOrder = this.BaseURL + "/cartorder";
}

export default AppURL;
