import React, { Component } from "react";
import { connect } from "react-redux";
import { getStringVal } from "../../scripts/multiLang";

//actions
import { updateDeleteConfirmedModalDisplay } from "../../actions/myCart/updateQuantity";
class DeleteConfirmedPopup extends Component {
  componentDidMount() {
    require("bootstrap/js/dist/modal");
    //console.log("test from DeleteConfirmedPopup ");
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (
      this.props.deleteConfirmedStatus !== prevProps.deleteConfirmedStatus &&
      this.props.deleteConfirmedStatus
    ) {
      // this.fetchData(this.props.userID);
      $("#deleteConfirmedmModel").modal("show");
      setTimeout(() => {
        this.hideModal();
      }, 1000);
    } else {
      $("#deleteConfirmedmModel").modal("hide");
    }
  }

  hideModal = () => {
    this.props.updateDeleteConfirmedModalDisplay(false);
  };
  render() {
    return (
      <div
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        id="deleteConfirmedmModel"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content boxShadow">
            <div className="modal-body text-center">
              <div className="alert alert-success text-center mb-0">
                <img src={require('../../images/tick.png')} alt="password changed" className="mb-3" />
                <p className="text-center">  
                  {getStringVal(this.props.language, "YOU_HAVE_DELETED")}
                  <strong>{" "}{this.props.deletedItemTitle}{" "}</strong>
                  {getStringVal(this.props.language, "SUCCESSFULLY")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDeleteConfirmedPopupStateToProps = state => ({
  language: state.generalReducer.language,
  ithoobCookie: state.loginReducer.ithoobCookie,
  deletedItemTitle: state.myCart.deletedItemTitle,
  deleteConfirmedStatus: state.myCart.deleteConfirmedStatus
});

const mapDeleteConfirmedPopupDispatchToProps = dispatch => ({
  updateDeleteConfirmedModalDisplay: payload => {
    dispatch(updateDeleteConfirmedModalDisplay(payload));
  }
});

export default connect(
  mapDeleteConfirmedPopupStateToProps,
  mapDeleteConfirmedPopupDispatchToProps
)(DeleteConfirmedPopup);
