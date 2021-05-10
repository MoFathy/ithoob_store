import React, { Component } from "react";
import { connect } from "react-redux";
//actions
import { updatePartnersTableDisplayStatus } from "../../actions/myCart/partnersTableActions";
import { getCookie } from "../../scripts/getCookieFile";
import { getStringVal } from "../../scripts/multiLang";

import {
  updateQuantity,
  deleteItemFromLocalStorage,
  updateDeleteConfirmedModalDisplay
} from "../../actions/myCart/updateQuantity";

import {
  getCartItems,
  getCartItemsFromLocalStorage
} from "../../actions/myCart/myCartActions";

class DeleteItemPopup extends Component {
  componentDidMount() {
    require("bootstrap/js/dist/modal");
    //console.log("test from DeleteItemPopup ");
  }
  deleteItem = () => {
    if (this.props.ithoobCookie !== -1) {
      const newQuantity = 0;
      this.props.updateQuantity(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken"),
        this.props.deletedItemId,
        newQuantity
      );
      this.props.getCartItems(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken")
      );
      // this.props.updateDeleteConfirmedModalDisplay(true);
    } else {
      this.props.deleteItemFromLocalStorage(this.props.deletedItemIndex);
      this.props.updateDeleteConfirmedModalDisplay(true);
    }
    this.closeModal();
  };
  closeModal = () => {
    $("#deleteItemModel").modal("hide");
  };
  render() {
    return (
      <div
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        id="deleteItemModel"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content boxShadow">
            <div className="modal-header">
              <h5 className="modal-title">
                {getStringVal(this.props.language, "DELETE")}{" "}
                <strong>{this.props.deletedItemTitle}</strong>
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.closeModal}
              >
                <span aria-hidden="true">
                  <span className="icon-close" />
                </span>
              </button>
            </div>
            <div className="modal-body text-center">
              {getStringVal(
                this.props.language,
                "ARE_YOU_SURE_YOU_WANT_TO_DELETE"
              )}{" "}
              <strong>{this.props.deletedItemTitle}{" "}</strong>
              {getStringVal(this.props.language, "OF_YOUR_SHOPPING_CART")}
            </div>
            <div className="modal-footer ">
              <button
                type="button"
                className="btn button w-100 ml-3"
                data-dismiss="modal"
                onClick={this.closeModal}
              >
                {getStringVal(this.props.language, "NO")}
              </button>

              <button
                type="button"
                className="btn button w-100 whiteBg"
                onClick={this.deleteItem}
              >
                {getStringVal(this.props.language, "DELETE")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDeleteItemPopupStateToProps = state => ({
  language: state.generalReducer.language,
  ithoobCookie: state.loginReducer.ithoobCookie,
  deletedItemId: state.myCart.deletedItemId,
  deletedItemIndex: state.myCart.deletedItemIndex,
  deletedItemTitle: state.myCart.deletedItemTitle
});

const mapDeleteItemPopupDispatchToProps = dispatch => ({
  updateQuantity: (language, authorization, productId, quantity) => {
    dispatch(updateQuantity(language, authorization, productId, quantity));
  },
  getCartItems: (lang, authToken) => {
    dispatch(getCartItems(lang, authToken));
  },
  deleteItemFromLocalStorage: index => {
    dispatch(deleteItemFromLocalStorage(index));
  },
  updateDeleteConfirmedModalDisplay: payload => {
    dispatch(updateDeleteConfirmedModalDisplay(payload));
  }
});

export default connect(
  mapDeleteItemPopupStateToProps,
  mapDeleteItemPopupDispatchToProps
)(DeleteItemPopup);
