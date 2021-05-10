import React, { Component } from "react";
import PropTypes from "prop-types";
// import { NavLink } from "react-router-dom";
import { Link } from "next/link";
import Logo from "./logo";
import ScrollMagic from "scrollmagic";
// import logo from "../../assets/Logo.svg";
import { getStringVal } from "../../scripts/multiLang";
class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileIsClicked: false,
      cartIsClick: false
    };
    this.props.getCategories(this.props.language === false ? 1 : 2);
    // init scrollmagic
    this.controller = new ScrollMagic.Controller();

    window.onscroll = function() {
      // this.stickyHeader();
      let navbar = document.getElementById("stickyNavbar");
      let sticky = navbar.offsetTop;
      if (window.pageYOffset > sticky) {
        navbar.classList.add("fixed");
      } else {
        navbar.classList.remove("fixed");
      }
    };
  }

  componentDidMount() {
    //   // build scene
    // let header = document.getElementById("stickyNavbar");
    new ScrollMagic.Scene({
      triggerElement: "#headerNav",
      duration: 0,
      offset: 40
    }).setClassToggle("#stickyNavbar", "active");
    //     .on("start", function() {
    //       // trigger animation by changing inline style.
    //       header.style.backgroundColor = "grey";
    //     })
    //     .on("end", function() {
    //       // reset style
    //       header.style.backgroundColor = "red";
    //     })
    //     .addTo(this.controller);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.language !== prevProps.language) {
      this.props.getCategories(this.props.language === false ? 1 : 2);
    }
  }
  profileClickhandler = () => {
    this.setState({
      profileIsClicked: !this.state.profileIsClicked,
      cartIsClick: false
    });
  };
  cartClickHandler = () => {
    this.setState({
      cartIsClick: !this.state.cartIsClick,
      profileIsClicked: false
    });
  };


  render() {
    const menu =
      this.props.status === true
        ? this.props.categories.map(x => (
            <li className="nav-item" key={x.categoryId}>
              <Link href={`/${x.slug}`}>
                <a className="nav-link">{x.mainCategory}</a>
              </Link>
              <ul className="subMenu list-unstyled">
                {x.subCategory.map(y => (
                  <li key={y.categoryId}>
                    <Link href={`/${y.slug}`}>
                      <a className="nav-link">{y.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))
        : "";

    return (
      <div className="headerNav" id="headerNav">
        {/* upper header  */}
        <div className="container">
          <div
            className="upperHeader d-flex justify-content-between align-items-center"
            id="upperHeader"
          >
            <div className="upperHeader__ContactUs d-flex">
              <ul className="d-flex list-unstyled upperHeader__ContactUs__socialMedia">
                <li>
                  <a target="_blank" href="#">
                    <span className="icon-facebook" />
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    <span className="icon-twitter" />
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    <span className="icon-instagram" />
                  </a>
                </li>
              </ul>
              <ul className="d-flex list-unstyled upperHeader__ContactUs__internalLinks">
                <li>
                  <a href="#">
                    {/* تواصل معنا */}
                    
                    {getStringVal(this.props.language, "CONNECT_WITH_US")}
                    
                    </a>
                </li>
                <li>
                  <a href="#">
                    {/* عن أى ثوب */}
                    {getStringVal(this.props.language, "ABOUT_JZL")}
                    </a>
                </li>
                <li>
                  <a href="#">
                    {/* جدول المقاسات */}
                    {getStringVal(this.props.language, "MEASUREMENTS_TABLE")}
                    
                    </a>
                </li>
                <li>
                  <a href="#">
                  {getStringVal(this.props.language, "FAQ")}
                  
                  </a>
                </li>
              </ul>
            </div>
            <button
              className={
                this.props.language === 2
                  ? "upperHeader__langBtn d-block button btn-link mr-0 ml-auto"
                  : "langBtn d-block  button btn-link mr-auto ml-0"
              }
            >
              {this.props.language === 2 ? "EN" : "AR"}
            </button>
            <div />
          </div>
        </div>

        {/* nav */}
        <nav className="navbar navbar-expand-md stickyNavbar" id="stickyNavbar">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarContent">
              <ul className="navbar-nav ml-0">
                <li className="nav-item dropdown">
                  <button
                    className="button btn-link dropdown-toggle"
                    onClick={this.cartClickHandler}
                    type="button"
                    id="cartDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon-user-down" />
                  </button>
                  <div
                    className={
                      this.state.cartIsClick
                        ? "dropdown-menu d-block"
                        : "dropdown-menu "
                    }
                    aria-labelledby="cartDropdown"
                  >
                    <a className="dropdown-item" href="/Action">
                      Action
                    </a>
                    <a className="dropdown-item" href="/Action">
                      Another action
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="/Action">
                      Something else here
                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="button btn-link dropdown-toggle"
                    onClick={this.profileClickhandler}
                    type="button"
                    id="profileDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon-shopping-card-new" />
                  </button>
                  <div
                    className={
                      this.state.profileIsClicked
                        ? "dropdown-menu  d-block"
                        : "dropdown-menu"
                    }
                    aria-labelledby="profileDropdown"
                  >
                    <a className="dropdown-item" href="/Action">
                      Action
                    </a>
                    <a className="dropdown-item" href="/Action">
                      Another action
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="/Action">
                      Something else here
                    </a>
                  </div>
                </li>
              </ul>

              <ul className="navbar-nav ml-auto mr-0 mainMenu">
                <li className="nav-item" key="home">
                  <Link href="/">
                    <a className="nav-link">
                    {getStringVal(this.props.language, "MAIN")}
                      {/* الرئيسية */}
                      
                      </a>
                  </Link>
                </li>
                {menu}
              </ul>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <Link to="/">
              <a className="navbar-brand">
                <Logo />
              </a>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

Categories.protoTypes = {
  getCategories: PropTypes.func.isRequiered,
  language: state.generalReducer.language
};
export default Categories;
