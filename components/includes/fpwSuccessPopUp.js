import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleSuccessStatus } from "../../actions/fpwPopUp/fpwActions";
export class FpwSuccessPopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.toggleSuccessStatus();
  }
  render() {
    return (
      <div className="messagePopup">
        <div className="messagePopup__content boxShadow">
          <div className="messagePopup__content__header">
            <div
              className="messagePopup__content__closeIcon"
              onClick={this.handleClick}
            >
              {" "}
              <span className="icon-close" />
            </div>
          </div>
          <div className="messagePopup__content__body">
            <img src={require('../../images/tick.png')} className="mx-auto d-block mb-3" />
            <p>{this.props.message}</p>
            <p>{this.props.content}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.forgetPwReducer.fpwMsg,
    content: state.forgetPwReducer.fpwContent
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSuccessStatus() {
      dispatch(toggleSuccessStatus());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FpwSuccessPopup);
