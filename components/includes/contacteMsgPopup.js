import React, { Component } from "react";
import { connect } from "react-redux";
import { resetMessageStatus } from "../../actions/contactPage/contactUsActions";
import { getStringVal } from "../../scripts/multiLang";
export class MessagePopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.resetMessageStatus(false);
  }
  render() {
    const { contactIthoob } = this.props;
    const { contactUsStatus } = this.props;
    return (
      <div className="messagePopup">
        <div className="messagePopup__content boxShadow">
          <div className="signupPopup__content__header">
            <p
              className="messagePopup__content__closeIcon"
              onClick={e => this.handleClick(e)}
            >
              {" "}
              <span className="icon-close" />
            </p>
          </div>
          <div className="signupPopup__content__body">
            <img src={require('../../images/tick.png')} className="mx-auto d-block mb-3" />
            <p className="text-center">{getStringVal(this.props.language, "CONTACTITHOOB_MESSAGE")}</p>
            <p className="text-center">{getStringVal(this.props.language, "CONTACTITHOOB_CONTENT")}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.generalReducer.language,
    contactIthoob: state.contactReducer.contactIthoob,
    contactUsStatus: state.contactReducer.contactUsStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetMessageStatus: value => {
      dispatch(resetMessageStatus(value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePopup);
