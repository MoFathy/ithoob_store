import React, { Component } from "react";
import Link from "next/link";

import { connect } from "react-redux";

import { getStringVal } from "../../scripts/multiLang";

class Breadcrumb extends Component {
  render() {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">
                <a>{getStringVal(this.props.language, "MAIN")}</a>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
            {getStringVal(this.props.language, "SHOPPING_CART")}
            </li>
          </ol>
        </nav>
      </div>
    );
  }
}
// export default Breadcrumb;
const mapStateToProps = state => ({
  language: state.generalReducer.language,
});
export default connect(
  mapStateToProps,
  null
)(Breadcrumb);
