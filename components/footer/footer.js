import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
// import Logo from "../includes/logo";
import { changeLang } from "../../actions/includes/general";
import { getStringVal } from "../../scripts/multiLang";
import FooterLogo from "./footerLogo";
import WhatsAppLogo from "./../includes/WhatsApp";
import Modal from "react-modal";
import { getNewsCookie } from "../../scripts/getCookieFile";
import {subscripeNewsLetter} from "../../actions/signupPopUp/signupActions";
// content: {
//   // top: "50%",
//   // left: "50%",
//   // right: "auto",
//   // bottom: "auto",
//   // marginRight: "-50%",
//   // transform: "translate(-50%, -50%)",
//   position: 'absolute',
//   inset: '50% auto auto 50%',
//   border: '1px solid rgb(204, 204, 204)',
//   background: 'rgb(255, 255, 255)',
//   overflow: 'auto',
//   'border-radius': '20px',
//   outline: 'none',
//   padding: '20px 25px',
//   transform: 'translate(-50%, -50%)',
//   // bottom: "25px",
//   // right: "53%",
// }
const customStyles = {
  content: {
    position: "absolute",
    border: "1px solid rgb(204, 204, 204)",
    background: "rgb(255, 255, 255)",
    overflow: "auto",
    borderRadius: "20px",
    outline: "none",
    padding: "20px 25px",
    bottom: "20px",
    right: "5px",
    width: "450px",
    maxWidth: "97%"
  },
  overlay: {
    position: 'fixed',
    inset: '0px',
    zIndex: '100',
    backgroundColor: 'unset'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
class Footer extends Component {
//   componentWillMount(){
//   Modal.setAppElement("#footer");
// }
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount(){
  Modal.setAppElement("#footer");

    if(getNewsCookie("subscripeNews") === "canceled" || localStorage.getItem("isSubscripedToNewsletter") ){
      this.setState({ modalIsOpen: false });
    }else{
      this.setState({ modalIsOpen: true });
    }
  }
  btnStyle = {
    color: '#000',
    cursor: 'pointer',
    background: '#fff',
    margin: '20px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed red',
    padding: '10px',
    fontSize: '1em'
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
    document.cookie = "subscripeNews=canceled"
  }

  onFocusHandle = (e) => {
    Array.from($(".formInput")).forEach((input) => {
      if (!(input.value.length > 0)) {
        $(input)
          .parent(".signupPopup__content__form__field")
          .addClass("notFocused");
      } else {
        $(input)
          .parent(".signupPopup__content__form__field")
          .removeClass("notFocused");
      }
    });

    $(e.target)
      .parent(".signupPopup__content__form__field")
      .removeClass("notFocused");
  };

  onBlurHandle = (e) => {
    if (!(e.target.value.length > 0)) {
      $(e.target)
        .parent(".signupPopup__content__form__field")
        .addClass("notFocused");
    }
  };

  subscripeNewsletter = () => {
    let email = this.refs.email.value;
    let mobile = this.refs.mobile.value;
    var isEmail = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(
      email
    );
    var isnum = /^[0-9 +]+$/.test(mobile);

    if (!email || !isEmail ) {
      console.log(email);
      $(".invalidInput__email").text(
        getStringVal(
          this.props.language,
          "EMAIL_SEEMS_SHORT_PLEASE_ENTER_A_VALID_EMAIL"
        )
      );
      return;
    }else{
      $(".invalidInput__email").text("")
    }

    if (!mobile || !isnum) {
      console.log(email);
      $(".invalidInput__mobile").text(
        getStringVal(this.props.language, "PLEASE_ENTER_YOUR_PHONE_NUMBER")
      );
      return;
    }else{
      $(".invalidInput__mobile").text("")
    }
    subscripeNewsLetter({mobile, email})
    let subscriptionStatus = getNewsCookie("subscripeNews");
    console.log(subscriptionStatus);
    this.setState({ modalIsOpen: false });
    document.cookie = "subscripeNews=canceled"
  };
  changeLang(x) {
    this.props.changeLang(x);
  }
  render() {
    const linksStyle = {
      color: "#b78b1e",
      fontSize: ".8em",
      padding: "2px !important",
    };
    return (
      <footer id="footer">
        <div className="innerFooter">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex align-items-center footerAbout">
                  <div className="logo">
                    <Link href="/">
                      <a>
                        {/* <Logo /> */}

                        <FooterLogo />
                      </a>
                    </Link>
                  </div>
                  <div className="">
                    <p className="about">
                      {/*
                      أى ثوب هو براند سعودى يتيح لك ناك حقيقة مثبتة منذ زمن طويل
                      وهي أن المحتوى المقروء لصفحة ما سيلهي طبيعياَ */}

                      {getStringVal(
                        this.props.language,
                        "ANY_DRESS_IS_A_SAUDI_BRAND_GIVES_YOU_A_PROVEN_FACT_NAK_LONG_TIME_AGO_IS_THAT_THE_READABLE_CONTENT_OF_A_PAGE_SILAA_NATURALLY"
                      )}
                    </p>
                    <div className="about mt-2">
                      <Link href="/terms-and-conditions">
                        <a className="p-2" style={linksStyle}>
                          {getStringVal(
                            this.props.language,
                            "TERMS_AND_CONDITIONS"
                          )}
                          {/* تواصل معنا */}
                        </a>
                      </Link>
                      <Link href="/privacy-policy">
                        <a className="p-2" style={linksStyle}>
                          {getStringVal(this.props.language, "PRIVACY_POLICY")}
                          {/* تواصل معنا */}
                        </a>
                      </Link>
                      <Link href="/pull-back-policy">
                        <a className="p-2" style={linksStyle}>
                          {getStringVal(
                            this.props.language,
                            "PULL_BACK_POLICY"
                          )}
                          {/* تواصل معنا */}
                        </a>
                      </Link>
                      <Link href="/delivery-policy">
                        <a className="p-2" style={linksStyle}>
                          {getStringVal(this.props.language, "DELIVERY_POLICY")}
                        </a>
                      </Link>
                    </div>
                    <div>
                      <a
                        onClick={this.openModal}
                        className="p-2 pt-4 newsBtn"
                      >
                        <span className="icon-envelope"></span>
                        {getStringVal(
                          this.props.language,
                          "SUBSCRIPE_TO_OUR_NEWS_LETTER"
                        )}
                      </a>
                      <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        className="newsletterModal"
                      >
                        <p onClick={this.closeModal}>
                          <span className="icon-close"></span>
                        </p>
                        <h4
                          ref={(subtitle) => (this.subtitle = subtitle)}
                          className="text-center newsTitle"
                        >
                          {getStringVal(
                            this.props.language,
                            "SUBSCRIPE_TO_OUR_NEWS_LETTER_TO_RECIEVE_EVERY_NEW"
                          )}
                        </h4>
                        <div className="text-center newsSubTitle">
                          {getStringVal(
                            this.props.language,
                            "ENTER_YOUR_EMAIL_AND_PHONE_AND_WE_WILL_CONTACT_YOU"
                          )}
                        </div>
                        <form>
                          <div className="signupPopup__content__form__field notFocused  email">
                            <label htmlFor="email" style={{transform: 'translateY(25px)'}}>
                              {getStringVal(this.props.language, "E_MAIL")}
                            </label>
                            <input
                              type="email"
                              ref="email"
                              defaultValue={""}
                              className="emailInput formInput"
                              maxLength="50"
                              id="email"
                              onFocus={(e) => this.onFocusHandle(e)}
                              onBlur={(e) => this.onBlurHandle(e)}
                            />
                            <p className="invalidInput__email text-danger" />
                          </div>

                          <div className="signupPopup__content__form__field notFocused mobile">
                            <label htmlFor="mobile" style={{transform: 'translateY(25px)'}}>
                              {getStringVal(this.props.language, "MOBILE")} (
                              {getStringVal(this.props.language, "MOBILE_HINT")}
                              )
                            </label>
                            <input
                              type="text"
                              ref="mobile"
                              maxLength="15"
                              className="formInput"
                              defaultValue={""}
                              id="mobile"
                              onFocus={(e) => this.onFocusHandle(e)}
                              onBlur={(e) => this.onBlurHandle(e)}
                            />
                            <p className="invalidInput__mobile text-danger" />
                          </div>
                          <div className="btnStyle signup mt-3">
                            <button
                              type="button"
                              onClick={this.subscripeNewsletter}
                            >
                              {getStringVal(
                                this.props.language,
                                "SUBSCRIPE_NOW"
                              )}
                            </button>
                          </div>
                        </form>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <ul className="d-flex list-unstyled footerList">
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

                  <li className="lang d-flex align-items-center">
                    {getStringVal(this.props.language, "FAV_LANGUAGE")}:
                    <button
                      className="button btn btn-link"
                      onClick={() => this.changeLang(!this.props.language)}
                    >
                      {this.props.language ? "EN" : "AR"}
                    </button>
                  </li>
                </ul>
                <p className="about d-flex mt-2 footerList">
                  <Link href="#">
                    <a className="p-1">
                      <img
                        src={require("../../images/masterCard.jpg")}
                        style={{ width: "50px", height: "30px" }}
                      />
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="p-1">
                      <img
                        src={require("../../images/visa.jpg")}
                        style={{ width: "50px", height: "30px" }}
                      />
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="p-1">
                      <img
                        src={require("../../images/mada.jpg")}
                        style={{ width: "50px", height: "30px" }}
                      />
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="p-1">
                      <img
                        src={require("../../images/stc.jpg")}
                        style={{ width: "50px", height: "30px" }}
                      />
                    </a>
                  </Link>
                </p>
                <div className="about d-flex mt-2 footerList">
                    <a className="p-1" href="https://maroof.sa/180502" target="_blank">
                      <img
                        src={require("../../images/maroofSa.png")}
                        style={{ width: "100px" }}
                      />
                    </a>
                  {/* <iframe
                    src="http://maroof.sa/Business/GetStamp?bid=180502"
                    style={{
                      width: "auto",
                      height: "150px",
                      overflow: "hidden",
                    }}
                    frameBorder="0"
                    seamless="seamless"
                    scrollable="no"
                  ></iframe> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p className={this.props.language === true ? "arabicNumber" : ""}>
            {/* © 2018 iThoob Rights Rreserved. */}
            {getStringVal(this.props.language, "JZL_RIGHTS_RESERVED")}
          </p>
        </div>
      </footer>
    );
  }
}
const mapFooterStateToProps = (state) => ({
  language: state.generalReducer.language,
});

const mapFooterDispatchToProps = (dispatch) => ({
  changeLang: (lang) => {
    dispatch(changeLang(lang));
  },
});

// import Footer from '../../components/footer/footer';

export default connect(mapFooterStateToProps, mapFooterDispatchToProps)(Footer);
// export default Footer;
