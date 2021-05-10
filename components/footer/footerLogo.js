import React, { Component } from "react";
export default class FooterLogo extends Component {
  render() {
    return (
      <div className="footerLogo">
        <img src={require('../../images/ithoob.png')} />
      </div>
    );
  }
}
