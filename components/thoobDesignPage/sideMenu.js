import React, { Component } from "react";
import { connect } from "react-redux";
import { setOpenedSection } from "../../actions/customizationsPage/othersActions";
import { getStringVal } from "../../scripts/multiLang";

export class SideMenu extends Component {
  componentDidMount() {}

  _handleSelectedSection(section, image) {
    this.props.setOpenedSection(section, image);
  }
  render() {
    return (
      <div className="sidebar">
        <div
          className={`sidebarOption ${
            this.props.openedSection === "size" && "selected"
          }`}
          onClick={() =>
            this._handleSelectedSection(
              "size",
              "https://ithoob.com/_next/static/files/images/customization/komasha.jpg"
            )
          }
        >
          <div className="image-container">
            <img
              src={require(`../../images/customization/circle-size-${
                this.props.openedSection === "size" ? "gold" : "white"
              }.png`)}
            />
          </div>
          <p>{getStringVal(this.props.language, "SIZE")}</p>
        </div>
        <div
          className={`sidebarOption ${
            this.props.openedSection === "fabric" && "selected"
          }`}
          onClick={() =>
            this._handleSelectedSection(
              "fabric",
              "https://ithoob.com/_next/static/files/images/customization/komasha.jpg"
            )
          }
        >
          <div className="image-container">
            <img
              src={require(`../../images/customization/circle-fabric-${
                this.props.openedSection === "fabric" ? "gold" : "white"
              }.png`)}
            />
          </div>
          <p>{getStringVal(this.props.language, "CLOTH")}</p>
        </div>
        <div
          className={`sidebarOption ${
            this.props.openedSection === "collar" && "selected"
          }`}
          onClick={() =>
            this._handleSelectedSection(
              "collar",
              "https://ithoob.com/_next/static/files/images/customization/yaka.jpg"
            )
          }
        >
          <div className="image-container">
            <img
              src={require(`../../images/customization/circle-yaqa-${
                this.props.openedSection === "collar" ? "gold" : "white"
              }.png`)}
            />
          </div>
          <p>{getStringVal(this.props.language, "COLLAR")}</p>
        </div>
        <div
          className={`sidebarOption ${
            this.props.openedSection === "sleeve" && "selected"
          }`}
          onClick={() =>
            this._handleSelectedSection(
              "sleeve",
              "https://ithoob.com/_next/static/files/images/customization/sleeve.jpg"
            )
          }
        >
          <div className="image-container">
            <img
              src={require(`../../images/customization/circle-sleeve-${
                this.props.openedSection === "sleeve" ? "gold" : "white"
              }.png`)}
            />
          </div>
          <p>{getStringVal(this.props.language, "SLEEVES")}</p>
        </div>
        <div
          className={`sidebarOption ${
            this.props.openedSection === "starlings" && "selected"
          }`}
          onClick={() =>
            this._handleSelectedSection(
              "starlings",
              "https://ithoob.com/_next/static/files/images/customization/starlings.jpg"
            )
          }
        >
          <div className="image-container">
            <img
              src={require(`../../images/customization/circle-yaqa-${
                this.props.openedSection === "starlings" ? "gold" : "white"
              }.png`)}
            />
          </div>
          <p style={{ fontSize: ".8em" }}>
            {getStringVal(this.props.language, "GABZOURANDGAIB")}
          </p>
        </div>
        <div
          className={`sidebarOption ${
            this.props.openedSection === "additions" && "selected"
          }`}
          onClick={() =>
            this._handleSelectedSection(
              "additions",
              "https://ithoob.com/_next/static/files/images/customization/starlings.jpg"
            )
          }
        >
          <div className="image-container">
            <img
              src={require(`../../images/customization/circle-clothes-${
                this.props.openedSection === "additions" ? "gold" : "white"
              }.png`)}
            />
          </div>
          <p>{getStringVal(this.props.language, "ADDITIONS")}</p>
        </div>
        <div
          className={`sidebarOption ${
            this.props.openedSection === "adds" && "selected"
          }`}
          onClick={() =>
            this._handleSelectedSection(
              "adds",
              "https://ithoob.com/_next/static/files/images/customization/starlings.jpg"
            )
          }
        >
          <div className="image-container">
            <img
              src={require(`../../images/customization/circle-adds-${
                this.props.openedSection === "adds" ? "gold" : "white"
              }.png`)}
            />
          </div>
          <p>{getStringVal(this.props.language, "ADDS")}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.generalReducer.language,
    openedSection: state.customsReducer.openedSection,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setOpenedSection(section, image) {
      dispatch(setOpenedSection(section, image));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
