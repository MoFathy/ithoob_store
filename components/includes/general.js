import React, { Component } from "react";
import { connect } from "react-redux";

//actions
import { changeLang } from "../../actions/includes/general";

class General extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return "";
  }
}
const mapGeneralStateToProps = state => ({
  language: state.generalReducer.language,
});

const mapGeneralDispatchToProps = dispatch => ({
  changeLang: lang => {
    dispatch(changeLang(lang));
  }
});
export default connect(
  mapGeneralStateToProps,
  mapGeneralDispatchToProps
)(General);
