import React, { Component } from "react";
import { connect } from "react-redux";
import { getCountries } from "../../actions/signupPopUp/signupActions";
import { getStringVal } from "../../scripts/multiLang";

class CitiesDropdown extends Component {
  componentDidMount() {
    this.props.getCountries(this.props.language === false ? 1 : 2);
  }

  onItemClick(e) {
    e.preventDefault();
    var selectedItem = $(e.target).html();
    var selectedItemID = $(e.target).attr("data-id");
    $(e.target)
      .closest(".dropdown")
      .find(".country-name")
      .text(selectedItem);
    $(e.target)
      .closest(".dropdown")
      .find(".btn")
      .attr("data-id", selectedItemID);
    if ($(e.target).hasClass("country")) {
      // countyID=selectedItemID
      var firstAreaOfCountry = $(e.target)
        .parents(".placeComponent")
        .find(".area[data-country='" + selectedItemID + "']:first")
        .text();
      var firstAreaOfCountryID = $(e.target)
        .parents(".placeComponent")
        .find(".area[data-country='" + selectedItemID + "']:first")
        .attr("data-id");
      $("#dropdownMenuButton2")
        .attr("data-id", firstAreaOfCountryID)
        .find(".country-name")
        .text(firstAreaOfCountry);
      //hide all areas
      $(e.target)
        .parents(".placeComponent")
        .find(".area")
        .hide();
      //areas of slected countrty
      var areas = $(e.target)
        .parents(".placeComponent")
        .find(".area[data-country='" + selectedItemID + "']");
      //show areas of selected country only
      [...areas].forEach(item => $(item).show());
    }
    if ($("#submit").length > 0) {
      $("#submit").attr("disabled", false);
    }
  }
  render() {
    return (
      <div className="d-flex justify-content-between placeComponent">
        <div className="dropdown">
          <label>
            {/* الدوله */}
            {getStringVal(this.props.language, "COUNTRY")}
          </label>
          <button
            className="btn dropdown-toggle"
            type="button"
            data-id={
              this.props.countries.length > 0
                ? this.props.defaultAreaID
                  ? this.props.countries.find(country =>
                      country.areas.find(x => x.id === this.props.defaultAreaID)
                    ).id
                  : this.props.countries[0].id
                : ""
            }
            id="dropdownMenuButton1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="country-name">
              {this.props.countries.length > 0
                ? this.props.defaultAreaName
                  ? this.props.countries.find(country =>
                      country.areas.find(
                        area => area.name == this.props.defaultAreaName
                      )
                    ).name
                  : this.props.defaultCountry
                  ? this.props.defaultCountry
                  : this.props.countries[0].name
                : ""}
            </span>
            <span className="icon-arrow"></span>
          </button>
          {this.props.countries.length > 0 ? (
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
            >
              {this.props.countries.map(item => {
                return (
                  <a
                    className="dropdown-item country"
                    key={item.id}
                    data-id={item.id}
                    href="#"
                    onClick={e => this.onItemClick(e)}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="dropdown">
          <label>
            {/* المنطقه */}
            {getStringVal(this.props.language, "REGION")}
          </label>
          <button
            className="btn dropdown-toggle"
            type="button"
            data-id={
              this.props.defaultAreaID
                ? this.props.defaultAreaID
                : this.props.countries.length > 0
                ? this.props.countries[0].areas[0].id
                : ""
            }
            id="dropdownMenuButton2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="country-name">
              {this.props.defaultAreaName
                ? this.props.defaultAreaName
                : this.props.defaultCity
                ? this.props.defaultCity
                : this.props.countries.length > 0
                ? this.props.countries[0].areas[0].name
                : ""}
            </span>
            <span className="icon-arrow"></span>
          </button>
          {this.props.countries.length > 0 ? (
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton2"
            >
              {this.props.countries.map((item, index) => {
                return item.areas.map(area => {
                  return this.props.fromSignUpForm // Fix 'countries/cities' dropdown not opening in "Signup Popup" and keep it working as it is on "My Profile" page
                  ? (<a
                      className="dropdown-item area"
                      key={area.id}
                      data-id={area.id}
                      data-country={item.id}
                      href="#"
                      onClick={e => this.onItemClick(e)}
                      style={{ display: index == 0 ? "block" : "none" }}
                    >
                      {area.name}
                    </a>) 
                  : (<a
                      className="dropdown-item area"
                      key={area.id}
                      data-id={area.id}
                      data-country={item.id}
                      href="#"
                      onClick={e => this.onItemClick(e)}
                      style={{ display: item.name == this.props.defaultCountry ? "block" : "none" }}
                    >
                      {area.name}
                    </a>)
                });
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    countries: state.signupReducer.countries,
    language: state.generalReducer.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCountries(lang) {
      dispatch(getCountries(lang));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CitiesDropdown);
