import React, { Component } from "react";
export default class DesignLogo extends Component {
  render() {
    return (
      <div className="footerLogo">
        <img src={require('../../../images/designBrand.png')} />
      </div>
    );
  }
}
