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
                <a>
                  {/* الرئيسية */}
                  {getStringVal(this.props.language, "MAIN")}
                </a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/profile">
                <a>
                  {/* إعدادت الحساب */}
                  {getStringVal(this.props.language, "ACCOUNT_SETTINGS")}
                </a>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {/* مقاساتى */}

              {getStringVal(this.props.language, "MY_MEASUREMENTS")}
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

export default connect(
  mapStateToProps,
  null
)(Breadcrumb);
// export default Breadcrumb;
