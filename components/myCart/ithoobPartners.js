import React, { Component } from "react";
import { connect } from "react-redux";
//actions
import {
  getCode,
  getDiscount,
  addPartnerDiscountIDToLocalStorage,
  getPartnerDiscountFromLocalStorage,
  updateGetCodeStatusAndGetCodeMessage,
  updateDiscountStatusAndDiscountMessage,
} from "../../actions/myCart/getCode";
import {
  updatePartnersTableDisplayStatus,
  getPartners,
} from "../../actions/myCart/partnersTableActions";
import { getCookie } from "../../scripts/getCookieFile";
import { getStringVal } from "../../scripts/multiLang";

class IthoobPartners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeIsGotten: false,
    };
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    require("jquery");
    if (
      this.props.getCodeStatus !== prevProps.getCodeStatus &&
      this.props.getCodeStatus
    ) {
      this.setState({ codeIsGotten: true });
    }
    // $("#code").val(" ");
  }
  componentDidMount() {
    require("bootstrap/js/dist/collapse");
    const $ = require("jquery");
    //console.log("IthoobPartners");
    //console.log(this.props);
    if (localStorage.getItem("pd")) {
      //console.log("getPartnerDiscountFromLocalStorage");
      this.props.getPartnerDiscountFromLocalStorage();
    }
  }

  showPartnersTable = (e) => {
    e.preventDefault();
    //console.log("showPartnersTable");
    this.props.updatePartnersTableDisplayStatus(true);

    if (this.props.ithoobCookie == -1) {
      //console.log("showPartnersTable inside if");
      this.props.getPartners();
    }
  };

  getCode = (e) => {
    e.preventDefault();

    if (this.state.codeIsGotten) {
      this.props.getDiscount(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken"),
        $("#code").val()
      );

      //console.log("add partner code id to local storage");
      // this.props.addPartnerDiscountIDToLocalStorage(this.props.partnerCodeId)
    } else {
      this.props.getCode(
        this.props.language === false ? 1 : 2,
        $("#email").val()
      );
    }
  };
  componentWillUnmount() {
    this.props.updateGetCodeStatusAndGetCodeMessage(false, "");
    this.props.updateDiscountStatusAndDiscountMessage(false, "");
  }
  render() {
    return this.props.items.length > 0 ? (
      <div className="ithoobPartnersContainer">
        <div id="accordion">
          <div className="card ithoobPartners">
            <div
              className="card-header d-flex justify-content-between align-items-center"
              id="headingOne"
            >
              <div className="mb-0">
                <h5
                  className="card-title collapsed"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  {getStringVal(this.props.language, "ANY_TOP_PARTNERS")}
                </h5>
                <a href="#" onClick={this.showPartnersTable}>
                  {getStringVal(this.props.language, "PARTNERS_SCHEDULE")}
                </a>
              </div>
              <span
                className="card-title collapsed"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <span className="icon-arrow-right"></span>
              </span>
            </div>

            <div
              id="collapseOne"
              className="collapse "
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="card-body">
                {this.props.getCodeStatus &&
                this.props.getCodeMessage.length > 0 &&
                !(
                  this.props.discountMessage &&
                  this.props.discountMessage.length > 0
                ) ? (
                  <div className="alert alert-success" role="alert">
                    {this.props.getCodeMessage}
                  </div>
                ) : (
                  ""
                )}

                {this.props.getCodeStatus == false &&
                this.props.getCodeMessage &&
                this.props.getCodeMessage.length > 0 &&
                !(
                  this.props.discountMessage &&
                  this.props.discountMessage.length > 0
                ) ? (
                  <div className="alert alert-danger" role="alert">
                    {this.props.getCodeMessage}
                  </div>
                ) : (
                  ""
                )}

                {this.props.discountStatus &&
                this.props.discountMessage &&
                this.props.discountMessage.length > 0 ? (
                  <div className="alert alert-success" role="alert">
                    {this.props.discountMessage}
                  </div>
                ) : (
                  ""
                )}

                {this.props.discountStatus == false &&
                this.props.discountMessage &&
                this.props.discountMessage.length > 0 ? (
                  <div className="alert alert-danger" role="alert">
                    {this.props.discountMessage}
                  </div>
                ) : (
                  ""
                )}

                <form className="form-inline">
                  <div className="form-group">
                    {this.props.discountStatus &&
                    this.props.discountMessage &&
                    this.props.discountMessage.length > 0 ? (
                      ""
                    ) : (
                      <input
                        type="text"
                        className={
                          this.state.codeIsGotten
                            ? "form-control d-block"
                            : "form-control d-none"
                        }
                        id="code"
                        placeholder="code"
                      />
                    )}

                    <input
                      type="email"
                      className={
                        this.state.codeIsGotten
                          ? "form-control d-none"
                          : "form-control d-block"
                      }
                      id="email"
                      placeholder={getStringVal(this.props.language, "E_MAIL")}
                    />
                  </div>
                  {this.props.discountStatus &&
                  this.props.discountMessage &&
                  this.props.discountMessage.length > 0 ? (
                    ""
                  ) : (
                    <button
                      type="submit"
                      className="btn button"
                      onClick={this.getCode}
                    >
                      {getStringVal(this.props.language, "ENTER")}
                    </button>
                  )}

                  {/* Show helper message if the user didn't write the email yet */}
                  {!this.props.getCodeStatus ? (
                    <p class="mt-3 small">
                      {getStringVal(
                        this.props.language,
                        "USE_YOUR_COMPANY_EMAIL_TO_GET_PARTNER_DISCOUNT"
                      )}
                    </p>
                  ) : (
                    ""
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}

const mapIthoobPartnersStateToProps = (state) => ({
  language: state.generalReducer.language,
  getCodeStatus: state.myCart.getCodeStatus,
  getCodeMessage: state.myCart.getCodeMessage,
  discountStatus: state.myCart.discountStatus,
  discountMessage: state.myCart.discountMessage,
  ithoobCookie: state.loginReducer.ithoobCookie,
  partnerTableStatus: state.myCart.partnerTableStatus,
  partnerTable: state.myCart.partnerTable,
  partnerTableMessage: state.myCart.partnerTableMessage,
  items: state.myCart.items,
  partnerCodeId: state.myCart.partnerCodeId,
});

const mapIthoobRartnerDispatchToProps = (dispatch) => ({
  getCode: (language, email) => {
    dispatch(getCode(language, email));
  },
  updatePartnersTableDisplayStatus: (payload) => {
    dispatch(updatePartnersTableDisplayStatus(payload));
  },
  getDiscount: (language, authorization, PartnerCode) => {
    dispatch(getDiscount(language, authorization, PartnerCode));
  },
  getPartners: () => {
    dispatch(getPartners());
  },
  addPartnerDiscountIDToLocalStorage: (id) => {
    dispatch(addPartnerDiscountIDToLocalStorage(id));
  },
  getPartnerDiscountFromLocalStorage: () => {
    dispatch(getPartnerDiscountFromLocalStorage());
  },
  updateGetCodeStatusAndGetCodeMessage: (status, message) => {
    dispatch(updateGetCodeStatusAndGetCodeMessage(status, message));
  },
  updateDiscountStatusAndDiscountMessage: (status, message) => {
    dispatch(updateDiscountStatusAndDiscountMessage(status, message));
  },
});

export default connect(
  mapIthoobPartnersStateToProps,
  mapIthoobRartnerDispatchToProps
)(IthoobPartners);
