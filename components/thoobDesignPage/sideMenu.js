import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setOpenedSection } from '../../actions/customizationsPage/othersActions';
import { getStringVal } from "../../scripts/multiLang";

export class SideMenu extends Component {
  componentDidMount() {
  }

  _handleSelectedSection(section, image){
    this.props.setOpenedSection(section, image);
  }
  render() {
    return (
        <div className="sidebar">
            <div className={`sidebarOption ${this.props.openedSection === "size" && "selected"}`}
            onClick={() => this._handleSelectedSection("size", "komasha")}
            >
                <img src={require(`../../images/customization/size-${this.props.openedSection === "size"?"gold":"white"}.png`)} />
                <p>
                    {getStringVal(this.props.language, "MAIN")}
                </p>
            </div>
            <div className={`sidebarOption ${this.props.openedSection === "fabric" && "selected"}`}
            onClick={() => this._handleSelectedSection("fabric", "komasha")}
            >
                <img src={require(`../../images/customization/fabric-${this.props.openedSection === "fabric"?"gold":"white"}.png`)} />
                <p>
                    {getStringVal(this.props.language, "CLOTH")}
                </p>
            </div>
            <div className={`sidebarOption ${this.props.openedSection === "collar" && "selected"}`}
            onClick={() => this._handleSelectedSection("collar","yaka")}
            >
                <img src={require(`../../images/customization/yaqa-${this.props.openedSection === "collar"?"gold":"white"}.png`)} />
                <p>
                    {getStringVal(this.props.language, "COLLAR")}
                </p>
            </div>
            <div className={`sidebarOption ${this.props.openedSection === "sleeve" && "selected"}`}
            onClick={() => this._handleSelectedSection("sleeve", "sleeve")}
            >
                <img src={require(`../../images/customization/sleeve-${this.props.openedSection === "sleeve"?"gold":"white"}.png`)} />
                <p>
                    {getStringVal(this.props.language, "SLEEVES")}
                </p>
            </div>
            <div className={`sidebarOption ${this.props.openedSection === "starlings" && "selected"}`}
            onClick={() => this._handleSelectedSection("starlings", "starlings")}
            >
                <img src={require(`../../images/customization/yaqa-${this.props.openedSection === "starlings"?"gold":"white"}.png`)} />
                <p>
                    {getStringVal(this.props.language, "STARLINGS")}
                </p>
            </div>
            <div className={`sidebarOption ${this.props.openedSection === "additions" && "selected"}`}
            onClick={() => this._handleSelectedSection("additions", "komasha")}
            >
            <img src={require(`../../images/customization/clothes-${this.props.openedSection === "additions"?"gold":"white"}.png`)} />
                <p>
                    {getStringVal(this.props.language, "ADDITIONS")}
                </p>
            </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    language: state.generalReducer.language,
    openedSection: state.customsReducer.openedSection
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setOpenedSection(section, image){
        dispatch(setOpenedSection(section, image))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
