import React, { Component } from "react";
import Link from "next/link";
import { getStringVal } from "../../scripts/multiLang";
import { connect } from "react-redux";

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
            <li className="breadcrumb-item">
              <Link href="/my-cart">
                <a>{getStringVal(this.props.language, "SHOPPING_CART")}</a>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {getStringVal(this.props.language, "PAYMENT")}
            </li>
          </ol>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  language: state.generalReducer.language
});

// export default Breadcrumb;
export default connect(
  mapStateToProps,
  null
)(Breadcrumb);
