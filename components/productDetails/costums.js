import React, { Component } from "react";
import { getStringVal } from "../../scripts/multiLang";
import { connect } from "react-redux";

class Costums extends Component {
  componentDidMount() {
  };
  render() {
    return (
      <div className="costums">
        <h4> {getStringVal(this.props.language, "DRESS_ACCESSORIES")}</h4>
        {this.props.customs.map((item, index) => {
          var isInDefault = false;
          this.props.defaultIds && this.props.defaultIds.length > 0 ? console.log("isInDefault", item.images.some((x) => this.props.defaultIds.includes(x.id))) : ""
          this.props.defaultIds && this.props.defaultIds.length > 0 ? isInDefault = item.images.some((x) => this.props.defaultIds.includes(x.id)) : ""
          //  item.images.map((img, index) => (
          //   this.props.defaultIds.includes(img.id) ? isInDefault = true : ""
          //  )): "";
          if (isInDefault) {
            return <div className="customsBlock" key={index}>
            {item.images.length > 0 && item.title ? <label>{item.title}</label> : ""}
            <div className="images">
              {item.images.map((img, index) => (
                <div
                  key={index}
                  className="image"
                  onClick={
                    this.props.closeBtnIsShown
                      ? $event => this.props.handleImgClick($event, img.id)
                      : ""
                  }
                >
                  <img
                    // src={img.imgPath}
                    img-id={img.id}
                    src={img.imgPath}
                    alt={item.title ? item.title : ""}
                    className={isInDefault === true ? (this.props.defaultIds.includes(img.id) ? "active" : "") : img.default === true ? "active" : ""}
                  />

                  {isInDefault === true ? (this.props.defaultIds.includes(img.id) ?
                    <div className="tickCircle">
                      <span className="icon-tick">
                        <span className="path1" /> <span className="path2" />
                      </span>
                    </div> : "") :
                    img.default === true ? <div className="tickCircle">
                      <span className="icon-tick">
                        <span className="path1" /> <span className="path2" />
                      </span>
                    </div> : ""

                  }

                  {/* {this.props.customs.map((item, index) =>
                    item.images.map((img, index) => img.default == true? "true" : "false"


                    )
                  )} */}
                </div>
              ))}
            </div>
          </div>
          }
          
        })}
      </div>
    );
  }
}
const mapCartHeaderStateToProps = state => ({
  language: state.generalReducer.language,
});
export default connect(
  mapCartHeaderStateToProps,
  null
)(Costums);

