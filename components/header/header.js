import $ from "jquery";
import React, { Component } from "react";
import { getCookie, deleteCookie } from "../../scripts/getCookieFile";
import Link from "next/link";
import { resetPresentData } from "../../actions/includes/carouselActions";
// import Logo from "../includes/logo";
import { connect } from "react-redux";
// import Header from '../../components/header/header';
import {
  loginPopUpStatusToggle,
  signOut,
  updateSocialMediaMsg,
} from "../../actions/loginPopUp/loginActions";
import { getcategories } from "../../actions/header/categories";
import CartHeader from "./cartHeader";
import NProgress from "nprogress";
import Router from "next/router";
import { ActionCreators } from "redux-undo";
import { cartInit } from "../../actions/header/cartHeader";
import { getStringVal } from "../../scripts/multiLang";
import { changeLang } from "../../actions/includes/general";
import NewLogo from "../../components/includes/newLogo";
import { emailSignupPopUpToggle } from "../../actions/signupPopUp/signupActions";
import { twitterLoginSuccess } from "../../actions/socialMediaBtns/socialMediaActions";
import { clearCart } from "../../actions/myCart/myCartActions.js";
import { socialLogin } from "../../actions/socialMediaBtns/socialMediaActions";
import WhatsAppLogo from "./../includes/WhatsApp";
import { requestTailorPopupToggle } from "../../actions/requestTailor/requestTailorActions";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done())

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
  $(".lazyloaded")
    .removeClass("lazyloaded")
    .addClass("lazyload")
    .removeAttr("src");
});

class Header extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   profileIsClicked: false,
    //   cartIsClick: false
    // };

    this.props.getcategories(this.props.language === false ? 1 : 2);
    this.loginClick = this.loginClick.bind(this);
    this.onSignOutClick = this.onSignOutClick.bind(this);
    this.handleResetCustoms = this.handleResetCustoms.bind(this);

    // this.state = {
    //   loginStatus : true
    // }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.language !== prevProps.language) {
      this.props.getcategories(this.props.language === false ? 1 : 2);
    }
    // if (this.props.ithoobCookie !== prevProps.ithoobCookie){
    //   this.setState({loginStatus : !this.state.loginStatus})
    // }
  }
  handleResetCustoms() {
    if(
      getCookie("ithoobUser", "authenticationToken")
    ){
      this.props.requestTailorPopupToggle(true)
    }else{
    this.props.loginPopUpStatusToggle(true);
    }
    // this.props.clearPastFutureHistory();
  }
  onSignOutClick(e) {
    e.preventDefault();
    deleteCookie("ithoobUser");
    deleteCookie("socialtoken");
    this.props.signOut();
    // if(this.props.ithoobCookie === -1){
    this.props.cartInit();
    this.props.socialLogin(false);
    // }
    if (this.props.activeMenu === "/orders") {
      Router.push("/");
    }
    this.props.updateSocialMediaMsg();
    this.props.clearCart();
  }
  loginClick(e) {
    this.props.loginPopUpStatusToggle(true);
  }
  componentDidMount() {
    // require("../../node_modules/lazysizes/lazysizes");
    require("bootstrap/js/dist/dropdown");
    require("bootstrap/js/dist/collapse");

    window.onscroll = function () {
      // this.stickyHeader();

      // console.log(navbar);
      // console.log(sticky);
      // if ($("header").length > 0) {
      //   let navbar = document.getElementById("stickyNavbar");
      //   let sticky = navbar.offsetTop;
      //   if (window.pageYOffset > sticky) {
      //     navbar.classList.add("fixed");
      //   } else {
      //     navbar.classList.remove("fixed");
      //   }
      // }
      let navbar = document.getElementById("stickyNavbar");
      if (navbar) {
        var topHeight = $(".headerNav").outerHeight(true);
        var windowScrollTop = Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        );

        // console.log('windowScrollTop',windowScrollTop)
        // console.log('topHeight',topHeight)
        let sticky = navbar.offsetTop;
        if (windowScrollTop > topHeight) {
          navbar.classList.add("fixed");
        } else {
          navbar.classList.remove("fixed");
        }
        // if (window.pageYOffset > sticky) {
        //   navbar.classList.add("fixed");
        // } else {
        //   navbar.classList.remove("fixed");
        // }
      }
    };

    if (getCookie("twitterNewUser")) {
      deleteCookie("twitterNewUser");
      this.props.emailSignupPopUpToggle(true);
      this.props.twitterLoginSuccess(
        getCookie("twitterNewData", "data"),
        getCookie("twitterNewData", "accessToken"),
        getCookie("twitterNewData", "secret")
      );
    }

    /* Menu OnClick */
    // $(".nav-item.dropdown").on("show.bs.dropdown", function() {
    //   console.log("on click on dropdown");
    //
    //   $(".navbar-collapse").collapse("hide");
    // });

    $("header .headerNav nav .mainMenu li.nav-item a").on("click", function () {
      $("#navbar-toggler").click();
    });
    $(".upperHeader__ContactUs__internalLinks li a.navlink").on(
      "click",
      function () {
        $("#navbar-toggler").click();
      }
    );
  }

  handleClick = (e) => {
    let _this = $(e.target);
    let subMenu = _this.parents(".nav-item").children(".subMenu");
    let siblings = _this.parents(".nav-item").siblings().children(".subMenu");

    if (window.innerWidth < 768) {
      // console.log("mobile view");
      $(siblings).slideUp().removeClass("active");
      if (subMenu.hasClass(".active")) {
        subMenu.removeClass("active").slideUp();
      } else {
        subMenu.addClass("active").slideToggle();
      }
    }
  };
  // profileClickhandler = () => {
  //   // this.setState({
  //   //   profileIsClicked: !this.state.profileIsClicked,
  //   //   cartIsClick: false
  //   // });
  //   console.log("profileClickhandler");

  //   // $("#navbarContent").removeClass("show");
  //   $(".navbar-collapse").collapse("hide");
  // };

  // cartClickHandler = () => {
  //   // this.setState({
  //   //   cartIsClick: !this.state.cartIsClick,
  //   //   profileIsClicked: false
  //   // });
  //   console.log("cartClickHandler");

  //   // $("#navbarContent").removeClass("show");
  //   $(".navbar-collapse").collapse("hide");
  // };
  render() {
    let totalQuantity = 0;
    if (this.props.cartItems.length > 0) {
      this.props.cartItems.map((product) =>
        product.quantity ? (totalQuantity += parseInt(product.quantity)) : ""
      );
    }

    const menu =
      this.props.status === true
        ? this.props.categories.map((x) => (
          // x.slug != "winter-collection3" ?
            <li className="nav-item" key={x.categoryId}>
              <Link
                as={`/products-list/${x.slug}`}
                href={`/products-list?slug=${x.slug}`}
              >
                <a
                  className={
                    this.props.activeMenu === "/products-list?slug=" + x.slug ||
                    x.subCategory.find(
                      (z) =>
                        z.slug ==
                        this.props.activeMenu.replace(
                          "/products-list?slug=",
                          ""
                        )
                    )
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  {x.mainCategory}
                  <span className="activeArrow"></span>
                </a>
              </Link>
              <a
                className="navArrow icon-arrow"
                onClick={(e) => this.handleClick(e)}
              >
                {/* > */}
              </a>
              <ul className="subMenu list-unstyled">
                {/* <div className="container"> */}
                {x.subCategory.map((y) => (
                  <li key={y.categoryId}>
                    <Link
                      href={`/products-list/${y.slug}`}
                      as={`/products-list/${y.slug}`}
                    >
                      <a
                        className={
                          this.props.activeMenu ===
                          "/products-list?slug=" + y.slug
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        {y.name}
                      </a>
                    </Link>
                  </li>
                ))}
                {/* </div> */}
              </ul>
            </li>
          ))
        : "";
    return (
      <header>
        {/* <Categories /> */}
        <div className="headerNav" id="headerNav">
          {/* upper header  */}
          <div className="upperHeader">
            <div className="container">
              <div
                className=" d-none d-lg-flex justify-content-between align-items-stretch"
                id="upperHeader"
              >
                <ul className="d-flex align-items-center list-unstyled upperHeader__socialMedia">
                  <li>
                    <a href={process.env.facebook} target="_blank">
                      <span className="icon-Facebook" />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={process.env.twitter}>
                      <span className="icon-Twitter" />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={process.env.instagram}>
                      <span className="icon-Instagram" />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href={
                        "https://api.whatsapp.com/send?phone=" +
                        process.env.whatsAppNumber +
                        "&text=&source=&data=&app_absent="
                      }
                    >
                      <WhatsAppLogo />
                    </a>
                  </li>
                </ul>
                <div className="upperHeader__ContactUs d-flex">
                  <ul className="d-flex list-unstyled upperHeader__ContactUs__internalLinks">
                    <li>
                      <Link href="/about">
                        <a
                          className={
                            this.props.activeMenu == "/about"
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          {/* عن أى ثوب */}
                          {getStringVal(this.props.language, "ABOUT_JZL")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/measurement">
                        <a
                          className={
                            this.props.activeMenu == "/measurement"
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          {/* جدول المقاسات */}
                          {getStringVal(
                            this.props.language,
                            "MEASUREMENTS_TABLE"
                          )}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq">
                        <a
                          className={
                            this.props.activeMenu == "/faq"
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          {/* الأسئله الأكثر شيوعا */}
                          {getStringVal(this.props.language, "FAQ")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact">
                        <a
                          className={
                            this.props.activeMenu == "/contact"
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          {getStringVal(this.props.language, "CONNECT_WITH_US")}
                          {/* تواصل معنا */}
                        </a>
                      </Link>
                    </li>
                    <li className="lang">
                      {getStringVal(this.props.language, "FAV_LANG")}:
                      <button
                        className="button btn btn-link"
                        onClick={() =>
                          this.props.changeLang(!this.props.language)
                        }
                      >
                        {this.props.language ? "EN" : "AR"}
                      </button>
                    </li>
                  </ul>
                </div>
                <div />
              </div>
            </div>
          </div>
          {/* nav */}
          <nav
            className="navbar navbar-dark  navbar-expand-lg stickyNavbar"
            id="stickyNavbar"
          >
            <div className="container">
              <Link href="/">
                <a className="navbar-brand">
                  {/* <Logo /> */}
                  <NewLogo />
                </a>
              </Link>

              <ul className="navbar-nav dropdownNav ml-2 mr-auto d-flex d-lg-none flex-row d-flex align-items-center">
                {this.props.ithoobCookie === -1 ? (
                  <a className="login" onClick={(e) => this.loginClick(e)}>
                    {/* تسجيل الدخول */}

                    {getStringVal(this.props.language, "LOG_IN")}
                  </a>
                ) : (
                  ""
                )}
                {this.props.ithoobCookie !== -1 ? (
                  <li
                    className="nav-item dropdown"
                    // onClick={this.cartClickHandler}
                  >
                    <button
                      className="btn btn-link dropdown-toggle"
                      // onClick={this.cartClickHandler}
                      type="button"
                      id="cartDropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="icon-user-down" />
                    </button>
                    <div
                      className="dropdown-menu"
                      // className={
                      //   this.state.cartIsClick
                      //     ? "dropdown-menu d-block"
                      //     : "dropdown-menu "
                      // }
                      aria-labelledby="cartDropdown"
                    >
                      <Link href="/profile">
                        <a className="dropdown-item">
                          {/* معلوماتى الشخصيه */}
                          {getStringVal(
                            this.props.language,
                            "PERSONAL_INFORMATION"
                          )}
                        </a>
                      </Link>
                      <Link href="/my-measurments" as="/my-measurements">
                        <a className="dropdown-item">
                          {getStringVal(this.props.language, "MEASUREMENTS")}
                        </a>
                      </Link>
                      <Link href="/orders">
                        <a className="dropdown-item">
                          {/* طلباتى */}
                          {getStringVal(this.props.language, "MY_ORDERS")}
                        </a>
                      </Link>
                      <a
                        className="dropdown-item"
                        onClick={(e) => this.onSignOutClick(e)}
                        href="/"
                      >
                        {/* تسجيل خروج */}
                        {getStringVal(this.props.language, "LOG_OUT")}
                      </a>
                    </div>
                  </li>
                ) : (
                  ""
                )}
                <li
                  className="nav-item dropdown"
                  // onClick={this.profileClickhandler}
                >
                  <button
                    className="btn btn-link dropdown-toggle positionRelative"
                    // onClick={this.profileClickhandler}
                    type="button"
                    id="profileDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon-shopping-card-new" />
                    <div
                      className={
                        this.props.language === true
                          ? "cartHeader__count arabicNumber"
                          : "cartHeader__count"
                      }
                    >
                      {/* {this.props.cartCount}  */}
                      {totalQuantity}
                    </div>
                  </button>
                  <CartHeader />
                </li>
              </ul>

              <button
                className="navbar-toggler"
                id="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarContent"
                aria-controls="navbarContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav mainMenu">
                  <li className="nav-item" key="home">
                    <Link href="/">
                      <a
                        className={
                          this.props.activeMenu === "/" ||
                          this.props.activeMenu === " "
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        {/* الرئيسية */}

                        {getStringVal(this.props.language, "MAIN")}
                        {/* <span className="activeArrow"></span> */}
                      </a>
                    </Link>
                  </li>
                  {menu}
                </ul>

                <div className="menu-part">
                  {/* <Link href="/customizations"> */}
                    <a
                      className="btn button designYourThoobBtn"
                      onClick={this.handleResetCustoms}
                    >
                      {/* صمم ثوبك */}
                      {getStringVal(this.props.language, "DESIGNED_YOUR_DRESS")}
                    </a>
                  {/* </Link> */}
                  {this.props.ithoobCookie === -1 ? (
                    <a
                      className="login sub-menu-login"
                      onClick={(e) => this.loginClick(e)}
                    >
                      {/* تسجيل الدخول */}

                      {getStringVal(this.props.language, "LOG_IN")}
                    </a>
                  ) : (
                    ""
                  )}
                </div>

                <ul className="navbar-nav dropdownNav ml-0 mr-auto d-none d-lg-flex">
                  {this.props.ithoobCookie !== -1 ? (
                    <li
                      className="nav-item dropdown"
                      // onClick={this.cartClickHandler}
                    >
                      <button
                        className="btn btn-link dropdown-toggle"
                        // onClick={this.cartClickHandler}
                        type="button"
                        id="cartDropdown"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span className="icon-user-down" />
                      </button>
                      <div
                        className="dropdown-menu"
                        // className={
                        //   this.state.cartIsClick
                        //     ? "dropdown-menu d-block"
                        //     : "dropdown-menu "
                        // }
                        aria-labelledby="cartDropdown"
                      >
                        <Link href="/profile">
                          <a className="dropdown-item">
                            {/* معلوماتى الشخصيه */}
                            {getStringVal(
                              this.props.language,
                              "PERSONAL_INFORMATION"
                            )}
                          </a>
                        </Link>
                        <Link href="/my-measurments" as="/my-measurements">
                          <a className="dropdown-item">
                            {/* مقاساتي */}

                            {getStringVal(this.props.language, "MEASUREMENTS")}
                          </a>
                        </Link>

                        <Link href="/orders">
                          <a className="dropdown-item">
                            {/* طلباتى */}
                            {getStringVal(this.props.language, "MY_ORDERS")}
                          </a>
                        </Link>
                        <a
                          className="dropdown-item"
                          onClick={(e) => this.onSignOutClick(e)}
                          href="/"
                        >
                          {/* تسجيل خروج */}

                          {getStringVal(this.props.language, "LOG_OUT")}
                        </a>
                      </div>
                    </li>
                  ) : (
                    ""
                  )}
                  <li
                    className="nav-item dropdown"
                    // onClick={this.profileClickhandler}
                  >
                    <button
                      className="btn btn-link dropdown-toggle positionRelative"
                      // onClick={this.profileClickhandler}
                      type="button"
                      id="profileDropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {/* <span className="icon-shopping-card-new" /> */}
                      <span className="icon-shopping-cart1"></span>
                      <div
                        className={
                          this.props.language === true
                            ? "cartHeader__count arabicNumber"
                            : "cartHeader__count"
                        }
                      >
                        {/* {this.props.cartCount} */}
                        {totalQuantity}
                      </div>
                    </button>
                    <CartHeader />
                  </li>
                </ul>

                <ul className="d-flex d-lg-none list-unstyled upperHeader__ContactUs__internalLinks">
                  <li>
                    <Link href="/about">
                      <a
                        className={
                          this.props.activeMenu == "/about"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        {/* عن أى ثوب */}
                        {getStringVal(this.props.language, "ABOUT_JZL")}
                        <span className="activeArrow"></span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/measurement">
                      <a
                        className={
                          this.props.activeMenu == "/measurement"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        {/* جدول المقاسات */}
                        {getStringVal(
                          this.props.language,
                          "MEASUREMENTS_TABLE"
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq">
                      <a
                        className={
                          this.props.activeMenu == "/faq"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        {/* الأسئله الأكثر شيوعا */}
                        {getStringVal(this.props.language, "FAQ")}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <a
                        className={
                          this.props.activeMenu == "/contact"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        {/* تواصل معنا */}

                        {getStringVal(this.props.language, "CONNECT_WITH_US")}
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

const mapCategoriesStateToProps = (state) => ({
  language: state.generalReducer.language,
  categories: state.categories.categories,
  status: state.categories.status,
  message: state.categories.message,
  activeMenu: state.categories.activeMenu,
  ithoobCookie: state.loginReducer.ithoobCookie,
  cartCount: state.cartHeader.cartCount,
  cartItems: state.cartHeader.cartItems,
});

const mapCategoriesDispatchToProps = (dispatch) => ({
  getcategories: (language) => {
    dispatch(getcategories(language));
  },
  setActiveMenu: (url) => {
    dispatch(setActiveMenu(url));
  },
  loginPopUpStatusToggle(value) {
    dispatch(loginPopUpStatusToggle(value));
  },
  signOut() {
    dispatch(signOut());
  },
  cartInit() {
    dispatch(cartInit());
  },
  socialLogin(flag) {
    dispatch(socialLogin(flag));
  },
  changeLang: (lang) => {
    dispatch(changeLang(lang));
  },
  clearPastFutureHistory() {
    dispatch(ActionCreators.clearHistory());
    dispatch(resetPresentData());
  },
  emailSignupPopUpToggle(flag) {
    dispatch(emailSignupPopUpToggle(flag));
  },
  requestTailorPopupToggle(value){
    dispatch(requestTailorPopupToggle(value));
  },
  twitterLoginSuccess(data, accessToken, secret) {
    dispatch(twitterLoginSuccess(data, accessToken, secret));
  },
  updateSocialMediaMsg: () => {
    dispatch(updateSocialMediaMsg());
  },
  clearCart: () => {
    dispatch(clearCart());
  },
});

// export default Header;
export default connect(
  mapCategoriesStateToProps,
  mapCategoriesDispatchToProps
)(Header);
