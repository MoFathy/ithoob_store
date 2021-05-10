import React, { Component } from "react";
import { connect } from "react-redux";
import { getStringVal } from "../../scripts/multiLang";
class Privacy extends Component {
  render() {
    const { privacyPolicy } = this.props;
    const btnStyle = {
      background: "#b78b1e",
      color: "white",
    };
    function createMarkup() {
      return { __html: privacyPolicy.policies[0].privacy_policy };
    }
    if (privacyPolicy.policies.length) {
      return (
        <div className="aboutPage__aboutIthoob">
          <div className="aboutPage__aboutIthoob__video">
            <img
              src={"https://assets.ithoob.com/about-banner.jpg"}
              className="w-100"
            />
          </div>

          <div className="container">
            <div className="privacy_policy mt-3 mb-3">
              <button
                className="btn w-100 text-center mt-3 mb-3"
                style={btnStyle}
              >
                {getStringVal(this.props.language, "PRIVACY_POLICY")}
              </button>
              <div dangerouslySetInnerHTML={createMarkup()}></div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {getStringVal(this.props.language, "LOADING")}
          ...{" "}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    privacyPolicy: state.policiesReducer.privacyPolicy,
    language: state.generalReducer.language,
  };
}
//
// function mapDispatchToProps(dispatch) {
//   return {
//   };
// }

//binding actions with component
export default connect(mapStateToProps, null)(Privacy);
