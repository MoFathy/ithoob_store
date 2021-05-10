import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleChangePwSuccessStatus } from "../../actions/fpwPopUp/fpwActions";
export class ChangeSuccessPopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.toggleChangePwSuccessStatus();
  }
  render() {
    return (
      <div className="messagePopup">
        <div className="messagePopup__content boxShadow">
          <div className="changePwPopup__content__header">
            <p
              className="messagePopup__content__closeIcon"
              onClick={this.handleClick}
            >
              {" "}
              <span className="icon-close" />
            </p>
          </div>
          <div className="signupPopup__content__body">
            <img src={require('../../images/tick.png')} className="mx-auto d-block mb-3" />
            <p className="text-center">{this.props.message}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.forgetPwReducer.changePwMsg
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleChangePwSuccessStatus() {
      dispatch(toggleChangePwSuccessStatus());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeSuccessPopup);
