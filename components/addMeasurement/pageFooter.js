import React, { Component } from "react";
import { connect } from "react-redux";
//actions
import { updateActiveItemId } from "../../actions/addMeasurement/getAddMeasurement";
import {
  updateDataIsChangedStatus,
  updateCurrentValues
} from "../../actions/addMeasurement/saveMeasurement";
//scripts
import { getStringVal } from "../../scripts/multiLang";

class PageFooter extends Component {
  componentDidMount() {
    if (this.props.items.length > 0) {
      this.props.updateCurrentValues(
        parseFloat($(".active.innerFooter input").val()),
        this.props.items[0].min,
        this.props.items[0].max
      );
    }
  }

  updateActiveItemId = (id, minVal, maxVal) => {
    this.props.updateCurrentValues(
      $(".active.innerFooter input").val(),
      minVal,
      maxVal
    );

    //
    if ($(".active.innerFooter input").val().length > 0) {
      if (
        $(".active.innerFooter input").val() >= minVal &&
        $(".active.innerFooter input").val() <= maxVal
      ) {
        this.props.updateActiveItemId(id);
        this.hideErrMsg();
      } else {
        //show error msg
        $(".PageFooter__errMsg.active p").css({ opacity: 1 });
      }
    } else {
      this.props.updateActiveItemId(id);
      this.hideErrMsg();
    }
  };

  hideErrMsg = () => {
    $(".PageFooter__errMsg p").css({ opacity: 0 });
  };

  onChangeHandle = (e, minVal, maxVal) => {
    this.props.updateDataIsChangedStatus(true);
    this.hideErrMsg();
    this.props.updateCurrentValues(
      $(".active.innerFooter input").val(),
      minVal,
      maxVal
    );
  };

  onChangeMeasurement = (changeType) => {
    let measurementInput = document.querySelector('.active.innerFooter input');
    let measurementMinVal = parseFloat(measurementInput.getAttribute('min'));
    let measurementMaxVal = parseFloat(measurementInput.getAttribute('max'));

    // It will be manipulated based on the `changeType`, then sent as `props`
    if(changeType == 'plus') {
      // Increment & Don't exceed the `max` value
      if(measurementInput.value < measurementMaxVal) {
        // If empty, start from the `min` value
        if(measurementInput.value == "") {
          measurementInput.value = measurementMinVal;
        } else {
          measurementInput.value++;
        }
      }
    } else {
      // Decrease & Don't decrease than `min` value
      if(measurementInput.value > measurementMinVal) {
        measurementInput.value--;
      }
    }

    this.props.updateCurrentValues(
      measurementInput.value,
      measurementMinVal,
      measurementMaxVal
    );    
    this.props.updateDataIsChangedStatus(true);
  };

  render() {
    const { items, activeFooter } = this.props;
    return (
      <div className="PageFooter">
        {items && items.length > 0
          ? items.map((item, index) => (
              <div
                key={index}
                className={
                  index == activeFooter
                    ? "PageFooter__errMsg active"
                    : "PageFooter__errMsg"
                }
              >
                <p>
                  {getStringVal(this.props.language, "PLEASE_ENTER_A_VALUE_OF")}
                  <span
                    className={
                      this.props.language === true ? "arabicNumber" : ""
                    }
                  >
                    {item.min}
                  </span>
                  {getStringVal(this.props.language, "TO")}

                  <span
                    className={
                      this.props.language === true ? "arabicNumber" : ""
                    }
                  >
                    {item.max}
                  </span>
                </p>
              </div>
            ))
          : ""}
        <div className="container">
          {items && items.length > 0
            ? items.map((item, index) => (
                <div
                  key={index}
                  id={index}
                  className={
                    index == activeFooter ? "active innerFooter" : "innerFooter"
                  }
                >
                  {/* <div className="p-2">{item.adviceContent}</div> */}
                  {/* prev */}
                  {index == 0 ? (
                    <div className="prev disabled d-none d-xl-flex">
                      <span className="icon-arrow-right" />
                    </div>
                  ) : (
                    <div
                      className="prev d-none d-xl-flex"
                      onClick={() =>
                        this.updateActiveItemId(index - 1, item.min, item.max)
                      }
                    >
                      <span className="icon-arrow-right" />
                      <span className="title">{items[index - 1].imgTitle}</span>
                    </div>
                  )}

                  {/* values */}
                  <div className="measurementPartContainer">
                    <div className="label">
                      <label>{items[index].imgTitle}:</label>
                    </div>
                    <div className="inputContainer">
                      <input
                        type="number"
                        id={`val${index + 1}`}
                        // pattern="[0-9]+"
                        // pattern="\d*"

                        className={
                          this.props.language === true ? "arabicNumber" : ""
                        }
                        min={item.min}
                        max={item.max}
                        defaultValue={this.props[`value${index + 1}`]}
                        onChange={e =>
                          this.onChangeHandle(e, item.min, item.max)
                        }
                        name="shoeSize"
                        maxLength="3"
                        // onChange={e => this.isNumber(e)}
                      />
                      <button className="plus" onClick={e => this.onChangeMeasurement('plus')}><img src={require('../../images/chevron-up.png')}/></button>
                      <button className="minus" onClick={e => this.onChangeMeasurement('minus')}><img src={require('../../images/chevron-down.png')}/></button>
                      <span className="cm">
                        {getStringVal(this.props.language, "CM")}
                      </span>
                    </div>
                  </div>

                  {/* next */}
                  {index == items.length - 1 ? (
                    //  <div className="next">{items[items.length-1].imgTitle}</div>
                    <div className="next disabled d-none d-xl-flex">
                      <span className="icon-arrow-left" />
                    </div>
                  ) : (
                    <div
                      className="next d-none d-xl-flex"
                      onClick={() =>
                        this.updateActiveItemId(index + 1, item.min, item.max)
                      }
                    >
                      <span className="title">
                        {" "}
                        {items[index + 1].imgTitle}
                      </span>
                      <span className="icon-arrow-left" />
                    </div>
                  )}
                  {/* arrows div mobile */}
                  <div className="d-flex d-xl-none  w-100 justify-content-between">
                    {/* prev */}
                    {index == 0 ? (
                      <div className="prev disabled ">
                        <span className="icon-arrow-right" />
                      </div>
                    ) : (
                      <div
                        className="prev"
                        onClick={() =>
                          this.updateActiveItemId(index - 1, item.min, item.max)
                        }
                      >
                        <span className="icon-arrow-right" />
                        <span className="title">
                          {" "}
                          {items[index - 1].imgTitle}
                        </span>
                      </div>
                    )}

                    {/* next */}
                    {index == items.length - 1 ? (
                      //  <div className="next">{items[items.length-1].imgTitle}</div>
                      <div className="next disabled ">
                        <span className="icon-arrow-left" />
                      </div>
                    ) : (
                      <div
                        className="next "
                        onClick={() =>
                          this.updateActiveItemId(index + 1, item.min, item.max)
                        }
                      >
                        <span className="title">
                          {items[index + 1].imgTitle}
                        </span>
                        <span className="icon-arrow-left" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  language: state.generalReducer.language,
  status: state.addMeasurement.status,
  message: state.addMeasurement.message,
  items: state.addMeasurement.items,
  activeFooter: state.addMeasurement.activeFooter,

  measurementDetailsStatus: state.addMeasurement.measurementDetailsStatus,
  profileDetails: state.addMeasurement.profileDetails,
  profileId: state.addMeasurement.profileId,
  value1: state.addMeasurement.value1,
  value2: state.addMeasurement.value2,
  value3: state.addMeasurement.value3,
  value4: state.addMeasurement.value4,
  value5: state.addMeasurement.value5,
  value6: state.addMeasurement.value6,
  value7: state.addMeasurement.value7
});

const mapDispatchToProps = dispatch => ({
  updateActiveItemId: id => {
    dispatch(updateActiveItemId(id));
  },
  updateDataIsChangedStatus: status => {
    dispatch(updateDataIsChangedStatus(status));
  },
  updateCurrentValues: (val, minVal, maxVal) => {
    dispatch(updateCurrentValues(val, minVal, maxVal));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(PageFooter);
