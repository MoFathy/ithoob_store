import React, { Component } from "react";
import { connect } from "react-redux";
import { getStringVal } from "../../scripts/multiLang";
class PullBack extends Component {
  render() {
    const { privacyPolicy } = this.props;
    function createMarkup() {
        return {__html: privacyPolicy.policies[0].pull_back_policy};
      }
      const btnStyle = {
        background: '#b78b1e',
        color: 'white',
      };
    if (privacyPolicy.policies.length) {
      return (
        <div className="aboutPage__aboutIthoob">
          <div className="aboutPage__aboutIthoob__video">
            <img src={"https://assets.ithoob.com/about-banner.jpg"} className="w-100" />
          </div>

          <div className="container">
            <div className="privacy_policy mt-3 mb-3">
                <button className="btn w-100 text-center mt-3 mb-3" style={btnStyle}>
                    {getStringVal(this.props.language, "PULL_BACK_POLICY")}
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
    language: state.generalReducer.language
  };
}
//
// function mapDispatchToProps(dispatch) {
//   return {
//   };
// }

//binding actions with component
export default connect(
  mapStateToProps,
  null
)(PullBack);
