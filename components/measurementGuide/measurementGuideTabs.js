import React, { Component } from "react";
import { getStringVal } from "../../scripts/multiLang";
import { connect } from "react-redux";


class MeasurementGuideTabs extends Component {
  componentDidMount() {
    require("bootstrap/js/dist/tab");
  }

  render() {
    return (
      <div className="tabContainer">
        <h3 className="tabContainer__title">{getStringVal(this.props.language, "SIZES_TABLE")}</h3>
        {this.props.categories.length > 0 ? (
          <div>
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                {this.props.categories.map((item, index) =>
                  index == 0 ? (
                    <a
                      key={item.id}
                      className="nav-item nav-link active"
                      id={`nav-${item.id}-tab`}
                      data-toggle="tab"
                      href={`#nav-${item.id}`}
                      role="tab"
                      aria-controls={`nav-${item.id}`}
                      aria-selected="true"
                    >
                      {item.catTitle}
                    </a>
                  ) : (
                    <a
                      key={item.id}
                      className="nav-item nav-link"
                      id={`nav-${item.id}-tab`}
                      data-toggle="tab"
                      href={`#nav-${item.id}`}
                      role="tab"
                      aria-controls={`nav-${item.id}`}
                      aria-selected="false"
                    >
                      {item.catTitle}
                    </a>
                  )
                )}
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              {this.props.categories.map((item, index) =>
                index == 0 ? (
                  <div
                    key={item.id}
                    className="tab-pane fade show active"
                    id={`nav-${item.id}`}
                    role="tabpanel"
                    aria-labelledby={`nav-${item.id}-tab`}
                  >
                    <img src={item.img} alt={item.catTitle} />
                  </div>
                ) : (
                  <div
                    key={item.id}
                    className="tab-pane fade"
                    id={`nav-${item.id}`}
                    role="tabpanel"
                    aria-labelledby={`nav-${item.id}-tab`}
                  >
                    <img src={item.img} alt={item.catTitle} />
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          "test"
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  language: state.generalReducer.language,
  categories: state.measurementGuide.categories
});

export default connect(
  mapStateToProps,
  null
)(MeasurementGuideTabs);

