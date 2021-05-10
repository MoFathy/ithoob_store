import React, { Component } from "react";
import { connect } from "react-redux";
import HomeSection from "../includes/homeSection";

class ThirdSection extends Component {
  render() {
    const { thirdSection } = this.props;
    return <HomeSection dataSection={thirdSection}  dataClassName="thirdSection"/>;
  }
}
const mapHomeSectionsStateToProps = state => ({
  status: state.homeSections.status,
  message: state.homeSections.message,
  language: state.homeSections.language,
  thirdSection: state.homeSections.thirdSection
});
export default connect(
  mapHomeSectionsStateToProps,
  null
)(ThirdSection);
