import React, { Component } from "react";
// import $ from "jquery";
import { connect } from "react-redux";
import { getStringVal } from "../../scripts/multiLang";
export class SubContent extends Component {
  render() {
    const { item } = this.props;
    const { index } = this.props;
    const { parentitemId } = this.props;
    const { multiSelect } = this.props;
    if (item.cost || item.description) {
      // console.log("item with accesorry");
      // console.log(item.withAccessory);
      // console.log(item.name);
      return (
        <div
          data-itemid={parentitemId}
          key={item.id}
          data-withaccessory={
            item.withAccessory !== "" ? item.withAccessory : ""
          }
          data-subitemid={parentitemId}
          className={
            item.name || item.description
              ? this.props.itemPresent[this.props.type].includes(item.id)
                ? "item hoverEffect contentItem item-selected"
                : "item hoverEffect contentItem"
              : this.props.itemPresent[this.props.type].includes(item.id)
              ? "item contentItem item-selected"
              : "item contentItem"
          }
          data-id={item.id}
          onClick={$event =>
            this.props.onhandleClick(
              $event,
              parentitemId,
              item.id,
              multiSelect,
              item.cost
            )
          }
          data-cost={item.cost}
        >
          <div className="image image__with__desc">
            <div className="image__img">
              <img src={item.image} className="w-100" />
            </div>
            {/*this.props.itemPresent.recomBetana == item.id ? (
              <div className="image__recommend">
                <span>
                  {getStringVal(this.props.language, "RECOMMENDED")}
                  </span>
              </div>
            ) : (
              ""
            )*/}
            {item.description ? (
              <div className="image__desc">
                <div className="text d-flex justify-content-between">
                  <div className="desc">{item.name}</div>
                  <div className="cost">
                    {item.cost}
                    <span>
                      {/* ريال */}
                      {getStringVal(this.props.language, "SR")}
                    </span>
                  </div>
                </div>
                <div className="description">
                  {item.description ? (
                    <div className="desc">{item.description}</div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <div className="image__no-desc text d-flex justify-content-between">
                <div className="cost">{item.cost}<span>{getStringVal(this.props.language, "SR")}</span></div>
              </div>
            )}

          </div>
          <p
            className="tickCircle text-center tick"
            style={
              this.props.itemPresent[this.props.type].includes(item.id)
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          >
            <span className="icon-tick">
              <span className="path1" />
              <span className="path2" />
            </span>
          </p>
        </div>
      );
    } else if (item.image) {
      // console.log("item with accesorry");
      // console.log(item.withAccessory);
      // console.log(item.name);
      return (
        <div
          data-subitemid={parentitemId}
          key={item.id}
          data-withaccessory={
            item.withAccessory !== "" ? item.withAccessory : ""
          }
          data-id={item.id}
          className={
            this.props.itemPresent[this.props.type].includes(item.id)
              ? "contentItem item-selected"
              : "contentItem"
          }
          onClick={$event =>
            this.props.onhandleClick($event, parentitemId, item.id)
          }
        >
          <img src={item.image} alt={"image" + item.id} />
          <p
            className="tickCircle text-center"
            style={
              this.props.itemPresent[this.props.type].includes(item.id)
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          >
            <span className="icon-tick">
              <span className="path1" />
              <span className="path2" />
            </span>
          </p>
        </div>
      );
    } else if (item.name) {
      // console.log("item with accesorry");
      // console.log(item.withAccessory);
      // console.log(item.name);
      return (
        <div
          data-subitemid={parentitemId}
          key={item.id}
          data-withaccessory={
            item.withAccessory !== "" ? item.withAccessory : ""
          }
          data-id={item.id}
          className={
            this.props.itemPresent[this.props.type].includes(item.id)
              ? "contentItem item-selected"
              : "contentItem"
          }
          onClick={$event =>
            this.props.onhandleClick($event, parentitemId, item.id, multiSelect)
          }
        >
          <label>{item.name}</label>
          <p
            className="tickCircle text-center"
            style={
              this.props.itemPresent[this.props.type].includes(item.id)
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          >
            <span className="icon-tick">
              <span className="path1" />
              <span className="path2" />
            </span>
          </p>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
function mapStateToProps(state) {
  return {
    itemPresent: state.carouselReducer.present,
    language: state.generalReducer.language
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

//binding actions with component
export default connect(mapStateToProps, mapDispatchToProps)(SubContent);
