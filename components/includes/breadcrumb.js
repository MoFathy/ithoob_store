import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import Link from "next/link";
import { connect } from "react-redux";
import { getStringVal } from "../../scripts/multiLang";
class Breadcrumb extends Component {
  render() {
    return (
      <nav aria-label="breadcrumb">
        {/* {breadcrumb} */}
        {this.props.breadcrumbNew ? (
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">
                <a>
                  {/* الرئيسية */}
                  {getStringVal(this.props.language, "MAIN")}
                </a>
              </Link>
            </li>
            {this.props.breadcrumbNew
              ? this.props.breadcrumbNew.map(
                  (link, index) => (
                    <li key={index} className="breadcrumb-item">
                      <Link
                        as={`/products-list/${link.slug}`}
                        href={`/productsList?slug=${link.slug}`}
                      >
                        <a>{link.title}</a>
                      </Link>
                    </li>
                  )

                )
              : ""}
            {this.props.title ? (
              <li className="breadcrumb-item active" aria-current="page">
                {this.props.title}
              </li>
            ) : (
              ""
            )}
          </ol>
        ) : (
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">
                <a>
                  {/* الرئيسية */}
                  {getStringVal(this.props.language, "MAIN")}
                </a>
              </Link>
            </li>
            {this.props.categories.map(x =>
              x.slug === this.props.dataCategorySlug.slug ||
              x.subCategory.find(
                y => y.slug === this.props.dataCategorySlug.slug
              ) ? (
                <li className="breadcrumb-item" key={x.slug}>
                  {x.mainCategory}
                </li>
              ) : (
                ""
              )
            )}
          </ol>
        )}
      </nav>
    );
  }
}

const mapBreadcrumbStateToProps = state => ({
  breadcrumbNew: state.breadcrumb.breadcrumbNew,
  categories: state.categories.categories,
  language: state.generalReducer.language
});

export default connect(
  mapBreadcrumbStateToProps,
  null
)(Breadcrumb);
// export default Breadcrumb;
