import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
//actions
import {
  updateDefaultMeasurement,
  resetDefaultMeasurementStatus
} from "../../actions/myMeasurement/makeMeasurementDefault";
import { getMeasurementList } from "../../actions/myMeasurement/getMyMeasurement";
// scripts
import { getStringVal } from "../../scripts/multiLang";
import { getCookie } from "../../scripts/getCookieFile";
class MeasurementListComponent extends Component {
  editSize = () => {
    
  };

  makeDefault = id => {
    // rest state to false
    this.props.resetDefaultMeasurementStatus(false);
    if (this.props.ithoobCookie !== -1) {
      this.props.updateDefaultMeasurement(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken"),
        id
      );
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.makeDefaultState !== prevProps.makeDefaultState &&
      this.props.makeDefaultState &&
      this.props.ithoobCookie !== -1
    ) {
      this.props.getMeasurementList(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken")
      );
    }
  }

  render() {
    const { generalItems, language } = this.props;
    return this.props.status ? (
      <div className="row">
        <div className="col-lg-8">
          <h3 className="title">
            {/* {generalItems.title && generalItems.title.length > 0
              ? generalItems.title
              : ""} */}
            {getStringVal(language, "MY_MEASUREMENTS")}
          </h3>

          <p className="subTitle">
            {generalItems.subtitle && generalItems.title.subtitle > 0
              ? generalItems.subtitle
              : ""}
          </p>
          <Link href="/addMeasurement" as="/add-measurement">
            <a className="button toAddMeasurement">
              {getStringVal(language, "ADD_NEW_MEASUREMENT_FILE")}
            </a>
          </Link>

          <div className="measurementList">
            <ul>
              {generalItems && generalItems.items && generalItems.items.length > 0 ? (
                generalItems.items
                  .slice(0)
                  .reverse()
                  .map((item, index) => (
                    <li className="d-flex flex-row" key={index}>
                      <img src={require('../../images/measurement-img.png')} alt={item.title} />

                      <div className="sizeTitle">
                        <p>{item.title}</p>
                        {item.percentage == "100%" ? (
                          <Link
                            href={`/add-measurement/${item.id}`}
                            // as={`/add-measurement/${item.id}`}
                          >
                            <a>{getStringVal(language, "MODIFY")}</a>
                          </Link>
                        ) : (
                          <Link
                            href={`/add-measurement/${item.id}`}
                            // as={`/add-measurement/${item.id}`}
                          >
                            <a>{getStringVal(language, "COMPLETE")}</a>
                          </Link>
                        )}

                        {/* <span>تعديل</span>
                        <span>استكمال </span> */}

                        {item.default ? (
                          ""
                        ) : (
                          <span onClick={() => this.makeDefault(item.id)}>
                            {" "}
                            {getStringVal(language, "SET_AS_BASIC")}
                          </span>
                        )}
                        {/* <span> اجعله الاساسي</span> */}
                      </div>

                      <div className="progressSize">
                        <div className="progressBar">
                          <span style={{ width: item.percentage }} />
                        </div>
                        <span
                          className={
                            language ? "amount arabicNumber" : "amount"
                          }
                        >
                          {item.percentage}
                        </span>
                      </div>

                      <p className="lastUpdate">
                        {/* اخر تحديث */}
                        {getStringVal(language, "LAST_UPDATE")}

                        <span> ({item.lastUpdateDate})</span>
                      </p>

                      {item.default ? (
                        <span className="defaultSize">
                          {getStringVal(language, "BASIC_SIZE")}
                        </span>
                      ) : (
                        ""
                      )}
                    </li>
                  ))
              ) : (
                <li>
                  {getStringVal(
                    language,
                    "YOU_DO_NOT_HAVE_ANY_SIZES_I_ADD_YOUR_SIZE_NOW"
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    ) : (
      "test"
    );
  }
}

const mapStateToProps = state => ({
  language: state.generalReducer.language,
  status: state.measurementList.status,
  message: state.measurementList.message,
  generalItems: state.measurementList.generalItems,
  ithoobUser: state.loginReducer.ithoobUser,
  ithoobCookie: state.loginReducer.ithoobCookie,
  makeDefaultState: state.measurementList.makeDefaultState,
  makeDefaultMessage: state.measurementList.makeDefaultMessage
});

const mapDispatchToProps = dispatch => ({
  updateDefaultMeasurement: (lang, author, id) => {
    dispatch(updateDefaultMeasurement(lang, author, id));
  },
  getMeasurementList: (lang, author) => {
    dispatch(getMeasurementList(lang, author));
  },
  resetDefaultMeasurementStatus: flag => {
    dispatch(resetDefaultMeasurementStatus(flag));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeasurementListComponent);
