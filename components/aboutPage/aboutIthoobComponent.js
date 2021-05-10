import React, { Component } from "react";
import { connect } from "react-redux";
import { getStringVal } from "../../scripts/multiLang";
class AboutIthoob extends Component {
  render() {
    const { aboutIthoob } = this.props;
    if (aboutIthoob.items) {
      return (
        <div className="aboutPage__aboutIthoob">
          <div className="aboutPage__aboutIthoob__video">
            <img src={aboutIthoob.videoSrc} className="w-100" />

          </div>

          <div className="container">
            {aboutIthoob.items.map((item, index) => {
              return (
                <div
                  className="aboutPage__aboutIthoob__content align-items-center row"
                  key={index}
                >
                  <div className=" col-12 col-md-6 aboutContent">
                    <h2>{item.title}</h2>
                    <p>{item.content}</p>
                  </div>
                  <div
                    className={
                      index % 2 == 0
                        ? " col-12 col-md-6 img pr-md-0"
                        : " col-12 col-md-6 img" || !(index % 2 == 0)
                          ? " col-12 col-md-6 img pl-md-0"
                          : " col-12 col-md-6 img"
                    }
                  >
                    <img src={item.imgSrc} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {getStringVal(this.props.language, "LOADING")}
          ...{" "}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    aboutIthoob: state.aboutReducer.aboutIthoob,
    language: state.generalReducer.language
  };
}
//
// function mapDispatchToProps(dispatch) {
//   return {
//   };
// }

//binding actions with component
export default connect(
  mapStateToProps,
  null
)(AboutIthoob);
