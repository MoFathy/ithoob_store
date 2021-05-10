import React, { Component } from "react";
import { connect } from "react-redux";
import HomeSection from "../includes/homeSection";

class SecondSection extends Component {
  render() {
    const { secondSection } = this.props;
    return <HomeSection dataSection={secondSection}  dataClassName="secondSection" />;
  }
}
const mapHomeSectionsStateToProps = state => ({
  status: state.homeSections.status,
  message: state.homeSections.message,
  language: state.homeSections.language,
  secondSection: state.homeSections.secondSection
});
export default connect(
  mapHomeSectionsStateToProps,
  null
)(SecondSection);
