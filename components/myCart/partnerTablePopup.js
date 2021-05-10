import React, { Component } from "react";
import { connect } from "react-redux";
//actions
import { updatePartnersTableDisplayStatus } from "../../actions/myCart/partnersTableActions";
import { getStringVal } from "../../scripts/multiLang";

class PartnerTablePopup extends Component {
  componentDidMount() {
    require("bootstrap/js/dist/modal");
    //console.log("test from PartnerTablePopup ");
    // if (this.props.ithoobCookie == -1) {
    //   //console.log("test from PartnerTablePopup inside if");
    // }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.partnersTableDisplayStatus !==
        prevProps.partnersTableDisplayStatus &&
      this.props.partnersTableDisplayStatus === true
    ) {
      //   this.fetchData(this.props.userID);
      $("#partnersModel").modal("show");
    } else if (
      this.props.partnersTableDisplayStatus !==
      prevProps.partnersTableDisplayStatus
    ) {
      $("#partnersModel").modal("hide");
    }
  }
  hideModal = () => {
    this.props.updatePartnersTableDisplayStatus(false);
  };
  render() {
    return (
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        id="partnersModel"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content boxShadow">
            <div className="modal-header">
              <h5 className="modal-title">
                {getStringVal(this.props.language, "ANY_TOP_PARTNERS")}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.hideModal}
              >
                <span aria-hidden="true">
                  {" "}
                  <span className="icon-close" />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">
                      {getStringVal(this.props.language, "DISCOUNT_PERCENTAGE")}
                    </th>
                    <th scope="col">
                      {getStringVal(this.props.language, "PARTNERS")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.partnerTable.length > 0
                    ? this.props.partnerTable.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{item.percentage}</th>
                          <td>{item.name}</td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapPartnerTableStateToProps = state => ({
  ithoobCookie: state.loginReducer.ithoobCookie,
  language: state.generalReducer.language,
  partnerTable: state.myCart.partnerTable,
  partnersTableDisplayStatus: state.myCart.partnersTableDisplayStatus
});

const mapPartnerTableDispatchToProps = dispatch => ({
  updatePartnersTableDisplayStatus: payload => {
    dispatch(updatePartnersTableDisplayStatus(payload));
  }
});

export default connect(
  mapPartnerTableStateToProps,
  mapPartnerTableDispatchToProps
)(PartnerTablePopup);
