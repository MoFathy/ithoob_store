import React, { Component } from "react";
import { connect } from "react-redux";
import { getCookie } from "../../scripts/getCookieFile";
import {
  modificationsPopup,
  storeDefaultIds
} from "../../actions/ordersPage/ordersActions";
import CustomModifyItem from "./customModifyItem";
import Colors from "../productDetails/colors";
import Costums from "../productDetails/costums";
import { getStringVal } from "../../scripts/multiLang";

export class ModificationsPopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      fabric_cost: 0,
      yaka_cost: 0,
      zarzour_cost: 0,
      akmam_cost: 0,
      others_cost: 0
    }
  }

  handleClick() {
    this.props.modificationsPopup(false);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orderEdits !== this.props.orderEdits) {
      this.calculateEditedItemsCost();
    }
  }

  /**
   * This is temporary solution. API should return the cost calculation
   */
  calculateEditedItemsCost() {
    let fabricCost = 0,
      yakaCost = 0,
      zarzourCost = 0,
      akmamCost = 0,
      othersCost = 0;

    // Fabric
    if (this.props.orderEdits.fabric_custom) {
      this.props.orderEdits.fabric_custom.filter(type => type.cost !== undefined && type.cost !== "").map(item => fabricCost += parseFloat(item.cost));
    }

    // Yaka
    if (this.props.orderEdits.yaka_custom) {
      this.props.orderEdits.yaka_custom.filter(type => type.cost !== undefined && type.cost !== "").map(item => yakaCost += parseFloat(item.cost));
    }

    // Zarzour
    if (this.props.orderEdits.zarzour_custom) {
      this.props.orderEdits.zarzour_custom.filter(type => type.cost !== undefined && type.cost !== "").map(item => zarzourCost += parseFloat(item.cost));
    }

    // Akmam
    if (this.props.orderEdits.akmam_custom) {
      this.props.orderEdits.akmam_custom.filter(type => type.cost !== undefined && type.cost !== "").map(item => akmamCost += parseFloat(item.cost));
    }

    // Others
    if (this.props.orderEdits.others_cost) {
      this.props.orderEdits.others_cost.filter(type => type.cost !== undefined && type.cost !== "").map(item => othersCost += parseFloat(item.cost));
    }

    // Update State
    this.setState({
      fabric_cost: fabricCost,
      yaka_cost: yakaCost,
      zarzour_cost: zarzourCost,
      akmam_cost: akmamCost,
      others_cost: othersCost
    })

  }

  render() {
    const flag = false;
    return (
      <div className="messagePopup">
        <div className="messagePopup__content orderModify boxShadow">
          <div className="messagePopup__content__header">
            <p>
              {this.props.orderTitle}
              {this.props.orderDesigned === true ? (
                <span>({getStringVal(this.props.language, "DESIGNER")})</span>
              ) : (
                  ""
                )}
              {this.props.orderEdited === true ? (
                <span>({getStringVal(this.props.language, "RATE")})</span>
              ) : (
                  ""
                )}
            </p>
            <p onClick={this.handleClick}>
              <span className="icon-close" />
            </p>
          </div>

          <div className="messagePopup__content__body">
            {this.props.orderEdits ? (
              this.props.orderEdited === true ? (
                <div className="w-100">
                  {this.props.orderEdits.colors &&
                    this.props.orderEdits.colors.length !== 0 ? (
                      <Colors
                        closeBtnIsShown={flag}
                        colors={this.props.orderEdits.colors}
                        selectedColorId={this.props.orderEdits.selectedColorId}
                      />
                    ) : (
                      ""
                    )}
                  {this.props.orderEdits.customs &&
                    this.props.orderEdits.customs.length !== 0 ? (
                      <Costums
                        closeBtnIsShown={flag}
                        customs={this.props.orderEdits.customs}
                        defaultIds={this.props.defaultIds}
                      />
                    ) : (
                      ""
                    )}
                </div>
              ) : (
                  <div className="w-100">
                    {this.props.orderEdits.fabric_custom &&
                      this.props.orderEdits.fabric_custom.length !== 0 ? (
                        <CustomModifyItem
                          title={getStringVal(this.props.language, "CLOTH")}
                          cost={this.state.fabric_cost}
                          customArray={this.props.orderEdits.fabric_custom}
                        />
                      ) : (
                        ""
                      )}
                    {this.props.orderEdits.yaka_custom &&
                      this.props.orderEdits.yaka_custom.length !== 0 ? (
                        <CustomModifyItem
                          title={getStringVal(this.props.language, "COLLAR")}
                          cost={this.state.yaka_cost}
                          customArray={this.props.orderEdits.yaka_custom}
                        />
                      ) : (
                        ""
                      )}
                    {this.props.orderEdits.zarzour_custom &&
                      this.props.orderEdits.zarzour_custom.length !== 0 ? (
                        <CustomModifyItem
                          title={getStringVal(this.props.language, "STARLINGS")}
                          cost={this.state.zarzour_cost}
                          customArray={this.props.orderEdits.zarzour_custom}
                        />
                      ) : (
                        ""
                      )}
                    {this.props.orderEdits.akmam_custom &&
                      this.props.orderEdits.akmam_custom.length !== 0 ? (
                        <CustomModifyItem
                          title={getStringVal(this.props.language, "SLEEVES")}
                          cost={this.state.akmam_cost}
                          customArray={this.props.orderEdits.akmam_custom}
                        />
                      ) : (
                        ""
                      )}
                    {this.props.orderEdits.others_custom &&
                      this.props.orderEdits.others_custom.length !== 0 ? (
                        <CustomModifyItem
                          title={getStringVal(this.props.language, "ADDITIONS")}
                          cost={this.state.others_cost}
                          customArray={this.props.orderEdits.others_custom}
                        />
                      ) : (
                        ""
                      )}
                    {this.props.orderEdits.measurement_custom &&
                      this.props.orderEdits.measurement_custom.length !== 0 ? (
                        <CustomModifyItem
                          title={getStringVal(this.props.language, "SIZES")}
                          cost={this.props.orderEdits.measurement_cost}
                          customArray={this.props.orderEdits.measurement_custom}
                        />
                      ) : (
                        ""
                      )}
                    {this.props.orderEdits.measurement_custom &&
                      this.props.orderEdits.measurement_custom.length !== 0 ? (
                        <CustomModifyItem
                          title={getStringVal(this.props.language, "ADDS")}
                          cost={this.props.orderEdits.adds_cost}
                          customArray={this.props.orderEdits.adds_custom}
                        />
                      ) : (
                        ""
                      )}
                  </div>
                )
            ) : (
                ""
              )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orderTitle: state.ordersReducer.orderTitle,
    orderDesigned: state.ordersReducer.orderDesigned,
    orderEdited: state.ordersReducer.orderEdited,
    language: state.generalReducer.language,
    orderEdits: state.ordersReducer.orderEdits,
    defaultIds: state.ordersReducer.defaultIds
  };
}
function mapDispatchToProps(dispatch) {
  return {
    modificationsPopup(value) {
      dispatch(modificationsPopup(value));
    },
    storeDefaultIds(defaults) {
      dispatch(storeDefaultIds(defaults));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModificationsPopup);
