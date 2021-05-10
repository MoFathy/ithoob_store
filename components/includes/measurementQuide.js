import React, { Component } from "react";
import { connect } from "react-redux";
import { measurementPopUpStatus } from "../../actions/includes/measurementsListActions";
export class MessagePopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.measurementPopUpStatus();
  }
  render() {
    const { measurementsTable } = this.props;
    return (
      <div
        className="measurementQuide"
        style={
          this.props.measurementPopupStatus === true
            ? { display: "flex" }
            : { display: "none" }
        }
      >
        <div
          className="measurementQuide__closeIcon"
          onClick={e => this.handleClick(e)}
        >
          <span>X</span>
        </div>
        <img
          src={measurementsTable}
          // src={measurmentQuide}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    measurementPopupStatus: state.measurementListReducer.measurementPopupStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    measurementPopUpStatus() {
      dispatch(measurementPopUpStatus());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagePopup);
