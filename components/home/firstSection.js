import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import {
  getHomeSections,
  //   getHomeSectionsSuccess,
  //   getHomeSectionsFail
} from "../../actions/home/homeSections";
import { Img } from "react-image";
class FirstSection extends Component {
  render() {
    const { firstSection, status } = this.props;
    const Steps =
      status &&
      firstSection &&
      firstSection.steps &&
      firstSection.steps.length > 0 ? (
        <ul>
          {firstSection.steps.map((step, index) => (
            <li key={index}>
              <span
                className={this.props.language === true ? "arabicNumber" : ""}
              >
                {index + 1}
              </span>
              <div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        ""
      );

    return status && firstSection ? (
      <div className="homeSections firstSection">
        <div className="firstSectionInner">
          <div className="rightContent">
            {firstSection.title && firstSection.title.length > 0 ? (
              <h2>{firstSection.title}</h2>
            ) : (
              ""
            )}
            {firstSection.desc && firstSection.desc.length > 0 ? (
              <p>{firstSection.desc}</p>
            ) : (
              ""
            )}

            {Steps}

            {firstSection.linkPath &&
            firstSection.linkPath.length > 0 &&
            firstSection.linkTitle &&
            firstSection.linkTitle.length > 0 ? (
              <Link href={`/${firstSection.linkPath}`}>
                <a className="button">{firstSection.linkTitle}</a>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="leftContent">
            {firstSection.title &&
            firstSection.title.length > 0 &&
            firstSection.imgSrc &&
            firstSection.imgSrc.length > 0 ? (
              <Img
                src={[firstSection.imgSrc, require("../../images/FsMtu.gif")]}
                className="lazyload image-responsive"
                alt={firstSection.title}
              />
            ) : (
              // <img
              //   className="lazyload image-responsive"
              //   // src={firstSection.img}
              //   alt={firstSection.title}
              //   data-src={firstSection.imgSrc}
              // />
              ""
            )}
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}

const mapHomeSectionsStateToProps = (state) => ({
  status: state.homeSections.status,
  message: state.homeSections.message,
  language: state.generalReducer.language,
  firstSection: state.homeSections.firstSection,
});

const mapHomeSectionsDispatchToProps = (dispatch) => ({
  getHomeSections: (language) => {
    dispatch(getHomeSections(language));
  },
  //       .then(res => {
  //         if (res.data.status === true) {
  //           dispatch(getHomeSectionsSuccess(res.data));
  //         } else {
  //           dispatch(getHomeSectionsFail(res.data));
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         dispatch(
  //           getHomeSectionsFail({
  //             status: false,
  //             message: "Error in home Sections from catch"
  //           })
  //         );
  //       });
  //   }
});
export default connect(
  mapHomeSectionsStateToProps,
  mapHomeSectionsDispatchToProps
)(FirstSection);
