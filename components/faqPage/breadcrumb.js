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
            <li className="breadcrumb-item black">
                  {/* إعدادت الحساب */}
                  {getStringVal(this.props.language, "THE_MOST_COMMON_QUESTIONS")}

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
