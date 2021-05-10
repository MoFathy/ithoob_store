import React, { Component } from "react";
import Colors from "../productDetails/colors";
import Costums from "../productDetails/costums";
import { getStringVal } from "../../scripts/multiLang";
import { connect } from "react-redux";


 class CustomsContainer extends Component {
  render() {
    //console.log("CustomsContainer");
    //console.log("this.props.getEidtsIsLoading");
    //console.log(this.props.getEidtsIsLoading);
    //console.log(this.props.defaultIds);
    //console.log(this.props.realDefaults);
    
    return (
      <div className="customsContainer d-none">
        <div className="customsDiv">
          <div className="header mainTitle d-flex justify-content-between align-items-center">
            <h5 className="card-title">{this.props.title}</h5>
            {this.props.closeBtnIsShown ? (
              <span onClick={this.props.closeCustoms}>X</span>
            ) : (
              ""
            )}
          </div>
<div className="colorsAndCustoms">
          {this.props.colors && this.props.colors.length > 0 ? (
            <Colors
            closeBtnIsShown={this.props.closeBtnIsShown}
              handleColorClick={this.props.handleColorClick}
              colors={this.props.colors}
              getEidtsIsLoading={this.props.getEidtsIsLoading}
              selectedColorId={this.props.selectedColorId}
            />
          ) : (
            ""
          )}
          {this.props.customs && this.props.customs.length > 0 ? (
            <Costums
            closeBtnIsShown={this.props.closeBtnIsShown}
              customs={this.props.customs}
              handleImgClick={this.props.handleImgClick}
              defaultIds={this.props.defaultIds}
            realDefaults={this.props.defaultIds}

            />
          ) : (
            ""
          )}
</div>
          {this.props.closeBtnIsShown ? (
            <button
              type="submit"
              className="button d-block w-100"
              onClick={() =>
                this.props.updateCustoms(this.props.id, this.props.index)
              }
            >
              {getStringVal(this.props.language, "EDIT_THE_DRESS")}
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="overlay" />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  language: state.generalReducer.language,

});
export default connect(
  mapStateToProps,
null
)(CustomsContainer);
