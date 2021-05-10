import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import Link from "next/link";
import { connect } from "react-redux";

//actions
import { updateLoader } from "../../actions/productList/productList";
class Filter extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  handleFilterClick = () => {
    this.props.updateLoader(true);
  };
  render() {
    const filter =
      this.props.categories && this.props.categories.length > 0
        ? this.props.categories.map(x =>
            x.slug === this.props.dataCategorySlug.slug ||
            x.subCategory.find(
              y => y.slug === this.props.dataCategorySlug.slug
            ) ? (
              <li
                key={x.slug}
                className="sideFilterContainer__sideFilter__mainMenu"
              >
                <ul className="sideFilterContainer__sideFilter__mainMenu__subMenu list-unstyled">
                  {this.props.activeMenu === "/products-list?slug=" + x.slug ? (
                    <li className="active sideFilterContainer__sideFilter__mainMenu__subMenu__link">
                      {x.filterTitle}
                    </li>
                  ) : (
                    <li>
                      <Link
                        // to={`/${x.slug}`}
                        as={`/products-list/${x.slug}`}
                        href={`/products-list?slug=${x.slug}`}
                      >
                        <a onClick={this.handleFilterClick}>{x.filterTitle}</a>
                      </Link>
                    </li>
                  )}

                  {x.subCategory.map(y =>
                    this.props.activeMenu === "/products-list?slug=" + y.slug ? (
                      <li
                        key={y.slug}
                        className="active sideFilterContainer__sideFilter__mainMenu__subMenu__link "
                      >
                        {y.name}
                      </li>
                    ) : (
                      <li key={y.slug}>
                        <Link
                          // to={`/${y.slug}`}
                          as={`/products-list/${y.slug}`}
                          href={`/products-list?slug=${y.slug}`}
                        >
                          <a onClick={this.handleFilterClick}>{y.name}</a>
                        </Link>
                      </li>
                    )
                  )}
                  {this.props.loading ? <div className="loader" /> : ""}
                </ul>
              </li>
            ) : (
              ""
            )
          )
        : "";
    return (
      <div className="sideFilterContainer">
        <ul className="sideFilterContainer__sideFilter list-unstyled">
          {filter}
        </ul>
      </div>
    );
  }
}
const mapFilterStateToProps = state => ({
  language: state.generalReducer.language,
  categories: state.categories.categories,
  status: state.categories.status,
  message: state.categories.message,
  loading: state.productList.loading,
  activeMenu: state.categories.activeMenu
});

const mapFilterDispatchToProps = dispatch => ({
  updateLoader: loading => {
    dispatch(updateLoader(loading));
  }
});
export default connect(
  mapFilterStateToProps,
  mapFilterDispatchToProps
)(Filter);
// export default Filter;
