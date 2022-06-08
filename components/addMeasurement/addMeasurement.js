import React, { Component } from "react";
import { connect } from "react-redux";
//scripts
import { getStringVal } from "../../scripts/multiLang";

//actions
import { updateActiveItemId } from "../../actions/addMeasurement/getAddMeasurement";
import { getFromProductDetailsSatus } from "../../actions/productDetails/productDetails";
class AddMeasurement extends Component {
  // state = {
  //   images: [img1, img2, img3, img4, img5, img1, img2]
  // };
  componentDidMount() {
    this.props.getFromProductDetailsSatus();
  }
  render() {
    const { status, message, items, activeItemId, activeImg } = this.props;
    // const { images } = this.state;
    return status ? (
      <div className="container">
        <div className="AddMeasurementPart">
          {/* sidebar */}
          <ul className="sidebar">
            {items && items.length > 0
              ? items.map((item, index) => (
                  <li
                    key={index}
                    id={index}
                    className={index == activeItemId ? "active" : ""}
                  >
                    <div
                      className="title"
                      onClick={() => this.props.updateActiveItemId(index)}
                    >
                      <span
                        className={
                          this.props.language === true ? "arabicNumber" : ""
                        }
                      >
                        {items.length}/{index + 1}
                      </span>
                      {item.imgTitle}
                    </div>

                    {/* <img src={hIndicator} alt="" /> */}

                    <div className="minAndMax">
                      <p className="minAndMax__minValue">
                        {getStringVal(this.props.language, "LESS_SIZE")}:
                        <span
                          className={
                            this.props.language === true ? "arabicNumber" : ""
                          }
                        >
                          {item.min}
                          {getStringVal(this.props.language, "CM")}
                        </span>
                      </p>
                      <p className="minAndMax__maxValue">
                        {getStringVal(this.props.language, "TOP_SIZE")}:
                        <span
                          className={
                            this.props.language === true ? "arabicNumber" : ""
                          }
                        >
                          {item.max}
                          {getStringVal(this.props.language, "CM")}
                        </span>
                      </p>
                    </div>
                    <div className="measureSteps">
                      <p className="measureSteps__title">
                        {getStringVal(
                          this.props.language,
                          "STEPS_TAKEN_SIZE"
                        )}
                        :
                      </p>
                      <p className="measureSteps__text">
                        {item.adviceContent}
                      </p>
                    </div>
                    <div className="measureTip">
                      <strong>
                        {getStringVal(this.props.language, "ADVICE")}:
                      </strong> 
                      <span className="mx-1">
                        {getStringVal(
                          this.props.language,
                          "SOME_CUSTOMERS_PREFER_TO_INCREASE_1_CM_LENGTH_DRESS_MORE_COMFORTABLE"
                        )}
                      </span>
                    </div>
                  </li>
                ))
              : ""}
          </ul>
          {/* imageContainer */}
          <div className="imageContainer">
            {items && items.length > 0 ? 
              items.map((item, index) => (
                // item.video && item.video != null ?
                // <video 
                //   alt={item.imgTitle}
                //   id={index}
                //   key={index}
                //   className={activeImg == index ? "active" : ""}
                //   autoPlay loop muted playsInline
                // >
                //   <source 
                //     src={item.video}
                //     type="video/mp4"
                //   />
                //   Your browser does not support the video tag. Please try a different browser!
                // </video> :
                <img src={item.image} alt={item.imgTitle} 
                className={activeImg == index ? "active" : ""}
                />
              ))
            : (
              ""
            )}
          </div>
        </div>
      </div>
    ) : (
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  language: state.generalReducer.language,
  status: state.addMeasurement.status,
  message: state.addMeasurement.message,
  items: state.addMeasurement.items,
  name: state.addMeasurement.name,
  activeItemId: state.addMeasurement.activeItemId,
  activeImg: state.addMeasurement.activeImg,

  measurementDetailsStatus: state.addMeasurement.measurementDetailsStatus,
  profileDetails: state.addMeasurement.profileDetails,
  profileId: state.addMeasurement.profileId,
  value1: state.addMeasurement.value1,
  value2: state.addMeasurement.value2,
  value3: state.addMeasurement.value3,
  value4: state.addMeasurement.value4,
  value5: state.addMeasurement.value5,
  value6: state.addMeasurement.value6,
  value7: state.addMeasurement.value7,
  value8: state.addMeasurement.value8,
  value9: state.addMeasurement.value9,
  value10: state.addMeasurement.value10,
  value11: state.addMeasurement.value11,
  value12: state.addMeasurement.value12,
});

const mapDispatchToProps = dispatch => ({
  updateActiveItemId: id => {
    dispatch(updateActiveItemId(id));
  },
  getFromProductDetailsSatus: () => {
    dispatch(getFromProductDetailsSatus());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddMeasurement);
