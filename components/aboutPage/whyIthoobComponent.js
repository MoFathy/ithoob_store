import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getWhyIthoob,
  getWhyIthoobSuccess
} from "../../actions/aboutPage/aboutGetDataActions";
import Link from "next/link";
import { getStringVal } from "../../scripts/multiLang";
import { getCookie } from "../../scripts/getCookieFile";
export class WhyIthoob extends Component {
  componentDidMount() {
    this.props.getWhyIthoob(
      this.props.language === false ? 1 : 2
      // getCookie("ithoobUser", "authenticationToken")
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      //  this.props.dispatch(
      //     getWhyIthoob(this.props.language===false ? 1 : 2)
      //   );
      this.props.getWhyIthoob(
        this.props.language === false ? 1 : 2
        // getCookie("ithoobUser", "authenticationToken")
      );
    }
  }
  render() {
    const { whyIthoob } = this.props;
    if (whyIthoob.items) {
      return (
        <div className="aboutPage__whyIthoob text-center">
          <div className="container">
            <h2>{whyIthoob.title}</h2>
            <div className="aboutPage__whyIthoob__items row">
              {whyIthoob.items.map((item, index) => {
                return (
                  <div
                    className="aboutPage__whyIthoob__items__item text-center col-md-4"
                    key={index}
                  >
                    <div className="aboutPage__whyIthoob__items__item__img">
                      <img src={item.imgSrc} />
                    </div>
                    <h3>{item.title}</h3>
                    <div className="aboutPage__whyIthoob__items__item__content">
                      <p>{item.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {this.props.page == "about" ? (
              <div className="aboutPage__whyIthoob__btnLink btnStyle">
                <Link href="/customizations">
                  <a className="button">
                    {getStringVal(
                      this.props.language,
                      "THE_FIRST_DESIGNED_YOUR_DRESS"
                    )}
                  </a>
                </Link>
              </div>
            ) : (
              <div className="aboutPage__whyIthoob__btnLink btnStyle">
                <Link href="/about">
                  <a className="button">
                    {getStringVal(this.props.language, "ABOUT_JZL")}
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return <div>loading ... </div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    whyIthoob: state.aboutReducer.whyIthoob,
    language: state.generalReducer.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWhyIthoob: language => {
      dispatch(getWhyIthoob(language));
    }
  };
}

//binding actions with component
export default connect(mapStateToProps, mapDispatchToProps)(WhyIthoob);
