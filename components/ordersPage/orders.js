import React, { Component } from "react";
import { connect } from "react-redux";
import { myModule } from "../../scripts/collapsersModule.js";
import { getCookie } from "../../scripts/getCookieFile";
import {
  cancelOrderPopUp,
  orderItemsEdit,
  modificationsPopup,
  paymentResponse,
  tabbyResponse
} from "../../actions/ordersPage/ordersActions";
import $ from "jquery";
import Link from "next/link";
import { getStringVal } from "../../scripts/multiLang";
import AvailableDiscounts from "../includes/AvailableDiscounts";

export class Orders extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.cancelPopup = this.cancelPopup.bind(this);
    this.modificationsPopup = this.modificationsPopup.bind(this);
    this.msgAppear = this.msgAppear.bind(this);
    this.msgDisappear = this.msgDisappear.bind(this);
  }

  msgAppear(e) {
    $(e.target)
      .parent()
      .find("span.desc")
      .css("display", "block");
  }
  msgDisappear(e) {
    $(e.target)
      .parent()
      .find("span.desc")
      .css("display", "none");
  }
  cancelPopup(value, orderStatus, orderNum) {
    this.props.cancelOrderPopUp(value, orderStatus, orderNum);
  }
  modificationsPopup(e, productId, designed, edited, title) {
    e.preventDefault();
    this.props.orderItemsEdit(
      productId,
      this.props.language === false ? 1 : 2,
      getCookie("ithoobUser", "authenticationToken")
    );
    this.props.modificationsPopup(true, designed, edited, title);
  }

  handleClick(e, value, ordersLength) {
    $(e.target)
      .siblings()
      .removeClass("active");
    $(e.target).addClass("active");
    if (value === "all") {
      $(e.target)
        .parents(".ordersPage")
        .find(".card")
        .css("display", "flex");
      $(e.target)
        .parents(".ordersPage")
        .find(".card:first .collapse")
        .collapse("show");
      // if($(e.target).parents(".ordersPage").find(".card").length === 0){
      //   $(".ordersPage .emptyOrdersMsg p").text( getStringVal(this.props.language, "YOU_DO_NOT_HAVE_ORDERS"));
      //   $(".ordersPage .emptyOrdersMsg").css('display','block');
      // }else{
      //       $(".ordersPage .emptyOrdersMsg").css('display','none');
      // }
      if (ordersLength > 0) {
        $(".ordersPage .emptyOrdersMsg").css("display", "none");
      }
    } else if (value === "current") {
      $(e.target)
        .parents(".ordersPage")
        .find(".card")
        .css("display", "none");
      $(e.target)
        .parents(".ordersPage")
        .find(".card#current")
        .css("display", "flex");
      $(e.target)
        .parents(".ordersPage")
        .find(".card#current:first .collapse")
        .collapse("show");
      if (
        $(e.target)
          .parents(".ordersPage")
          .find(".card#current").length === 0
      ) {
        if (ordersLength > 0) {
          $(".ordersPage .emptyOrdersMsg p").text(
            getStringVal(this.props.language, "YOU_DO_NOT_HAVE_CURRENT_ORDERS")
          );
          $(".ordersPage .emptyOrdersMsg").css("display", "block");
        }
      } else {
        $(".ordersPage .emptyOrdersMsg").css("display", "none");
      }
    } else if (value === "delivered") {
      $(e.target)
        .parents(".ordersPage")
        .find(".card")
        .css("display", "none");
      $(e.target)
        .parents(".ordersPage")
        .find(".card#delivered")
        .css("display", "flex");
      $(e.target)
        .parents(".ordersPage")
        .find(".card#delivered:first .collapse")
        .collapse("show");
      if (
        $(e.target)
          .parents(".ordersPage")
          .find(".card#delivered").length === 0
      ) {
        if (ordersLength > 0) {
          $(".ordersPage .emptyOrdersMsg p").text(
            getStringVal(this.props.language, "YOU_DO_NOT_HAVE_PREVIOUS_ORDERS")
          );
          $(".ordersPage .emptyOrdersMsg").css("display", "block");
        }
      } else {
        $(".ordersPage .emptyOrdersMsg").css("display", "none");
      }
    } else {
      $(e.target)
        .parents(".ordersPage")
        .find(".card")
        .css("display", "none");
      $(e.target)
        .parents(".ordersPage")
        .find(".card#cancelled")
        .css("display", "flex");
      $(e.target)
        .parents(".ordersPage")
        .find(".card#cancelled:first .collapse")
        .collapse("show");
      if (
        $(e.target)
          .parents(".ordersPage")
          .find(".card#cancelled").length === 0
      ) {
        if (ordersLength > 0) {
          $(".ordersPage .emptyOrdersMsg p").text(
            getStringVal(this.props.language, "YOU_DO_NOT_HAVE_CANCELED_ORDERS")
          );
          $(".ordersPage .emptyOrdersMsg").css("display", "block");
        }
      } else {
        $(".ordersPage .emptyOrdersMsg").css("display", "none");
      }
    }
  }
  componentDidMount() {
    require("bootstrap/js/dist/collapse.js");
    console.log('====================================');
    console.log(this.props);
    console.log('====================================');
    if(this.props.pathname && this.props.pathname.tap_id){
      this.props.paymentResponse(this.props.pathname.tap_id,this.props.language ==="false" ? 1 : 2,getCookie("ithoobUser", "authenticationToken"))
    }

    if(this.props.pathname && this.props.pathname.payment_id){
      this.props.tabbyResponse(this.props.pathname.payment_id,this.props.language ==="false" ? 1 : 2,getCookie("ithoobUser", "authenticationToken"))
    }
  }
  componentDidUpdate() {
    if ($(".ordersPage__filters li.active").attr("id") === "cancelled") {
      $(".ordersPage")
        .find(".card")
        .css("display", "none");
      $(".ordersPage")
        .find(".card#cancelled")
        .css("display", "flex");
    } else if ($(".ordersPage__filters li.active").attr("id") === "delivered") {
      $(".ordersPage")
        .find(".card")
        .css("display", "none");
      $(".ordersPage")
        .find(".card#delivered")
        .css("display", "flex");
    } else if ($(".ordersPage__filters li.active").attr("id") === "current") {
      $(".ordersPage")
        .find(".card")
        .css("display", "none");
      $(".ordersPage")
        .find(".card#current")
        .css("display", "flex");
    } else {
      $(".ordersPage")
        .find(".card")
        .css("display", "flex");
    }
  }
  isFloat = n => {
    return Number(n) === n && n % 1 !== 0 ? n.toFixed(2) : n.toFixed();
  };

  render() {
    return (
      <div className="ordersPage">
        <h2>{getStringVal(this.props.language, "MY_REQUESTS")}</h2>
        <h3>
          {getStringVal(
            this.props.language,
            "YOU_CAN_FOLLOW_YOUR_ORDERS_FROM_HERE"
          )}
        </h3>
        <div>
          <div className="ordersPage__filters">
            <ul>
              <li
                className="active"
                id="all"
                onClick={e =>
                  this.handleClick(e, "all", this.props.orders.length)
                }
              >
                {getStringVal(this.props.language, "ALL_APPLICATIONS")}
              </li>
              <li
                id="current"
                onClick={e =>
                  this.handleClick(e, "current", this.props.orders.length)
                }
              >
                {getStringVal(this.props.language, "CURRENT_APPLICATIONS")}
              </li>
              <li
                id="delivered"
                onClick={e =>
                  this.handleClick(e, "delivered", this.props.orders.length)
                }
              >
                {getStringVal(this.props.language, "PREVIOUS_APPLICATIONS")}
              </li>
              <li
                id="cancelled"
                onClick={e =>
                  this.handleClick(e, "cancelled", this.props.orders.length)
                }
              >
                {getStringVal(this.props.language, "ORDERS_CANCELED")}
              </li>
            </ul>
          </div>
          <div className="emptyOrdersMsg mb-5 mt-5">
            <p className="text-center"></p>
          </div>
          <div className="mb-5">
            {this.props.orders.length > 0 ? (
              this.props.orders.map((orderItem, index) => {
                return (
                  <div
                    className={index === 0 ? "card active" : "card"}
                    id={
                      orderItem.orderStatus === "cancelled"
                        ? "cancelled"
                        : orderItem.orderStatus === "delivered"
                        ? "delivered"
                        : "current"
                    }
                    key={"question" + index}
                  >
                    <div
                      className="card-header collapserBtn"
                      data-toggle="collapse"
                      data-target={"#collapse" + index}
                      aria-expanded={index === 0 ? "true" : "false"}
                      aria-controls={"collapse" + index}
                      id={"heading" + index}
                    >
                      <h5 className="mb-0 d-flex justify-content-between">
                        <button className="btn btn-link">
                          <p className="collapserTitle">
                            <span className="icon-arrow"></span>
                            <span className="question">
                              {getStringVal(
                                this.props.language,
                                "APPLICATION_NO"
                              )}{": "}
                              {orderItem.orderNo}
                            </span>
                          </p>
                        </button>
                        {orderItem.orderStatus === "cancelled" ? (
                          <p className="redP">
                            {getStringVal(
                              this.props.language,
                              "ORDER_CANCELED"
                            )}
                          </p>
                        ) : orderItem.orderStatus === "delivered" ? (
                          <p className="greenP">
                            {getStringVal(this.props.language, "RECEIVED")}
                          </p>
                        ) : orderItem.orderStatus === "charged" ? (
                          <p className="greenP">
                            {getStringVal(this.props.language, "CHARGED")}
                          </p>
                        ) : orderItem.orderStatus === "production" ? (
                          <p className="yellowP">
                            {getStringVal(
                              this.props.language,
                              "PRODUCTION_STAGE"
                            )}
                          </p>
                        ) : orderItem.orderStatus === "pickable" ? (
                          <p className="greenP">
                            {getStringVal(
                              this.props.language,
                              "READY_FOR_PICK_UP"
                            )}
                          </p>
                        ) : orderItem.orderStatus === "new" ? (
                          <p className="yellowP">
                            {getStringVal(this.props.language, "NEW_ORDER")}
                          </p>
                        ) : orderItem.orderStatus === "pending_payment" ? (
                          <p className="yellowP">
                            {getStringVal(
                              this.props.language,
                              "IN_AANTZAR_HAWALA"
                            )}
                          </p>
                        ) : (
                          ""
                        )}
                      </h5>
                    </div>

                    <div
                      id={"collapse" + index}
                      className={index === 0 ? "collapse show" : "collapse"}
                      aria-labelledby={"heading" + index}
                    >
                      <div className="card-body">
                        {orderItem.orderStatus !== "pending_payment" ? (
                          orderItem.orderStatus === "cancelled" ? (
                            <div className="ordersPage__cycle cancelled">
                              <div className="iconBox rightIcon redIconLine">
                                <span className="icon-whiteTick iconGreenBg"></span>
                                <p>
                                  {getStringVal(
                                    this.props.language,
                                    "NEW_ORDER"
                                  )}
                                  <br />{" "}
                                  {orderItem.newOrderDate !== "" ? (
                                    <span>{orderItem.newOrderDate}</span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                              <div className="redLine"></div>
                              <div className="iconBox leftIcon redIconLine">
                                <span className="icon-close iconRedBg"></span>
                                <p>
                                  {getStringVal(
                                    this.props.language,
                                    "ORDER_CANCELED"
                                  )}
                                  <br />{" "}
                                  {orderItem.cancellationDate !== "" &&
                                  orderItem.orderStatus == "cancelled" ? (
                                    <span>{orderItem.cancellationDate}</span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                            </div>
                          ) : orderItem.deliveryAndPayment.deliveryMethod ===
                            "home delivery" ? (
                            <div className="ordersPage__cycle homeDelivery">
                              <div className="iconBox rightIcon greenIconLine">
                                <span className="icon-whiteTick iconGreenBg"></span>
                                <p>
                                  {getStringVal(
                                    this.props.language,
                                    "NEW_ORDER"
                                  )}
                                  <br />{" "}
                                  {orderItem.newOrderDate !== "" ? (
                                    <span>{orderItem.newOrderDate}</span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                              <div
                                className={
                                  orderItem.orderStatus === "production" ||
                                  orderItem.orderStatus === "delivered"  ||
                                  orderItem.orderStatus === "charged"
                                    ? "greenLine"
                                    : "greyLine"
                                }
                              ></div>
                              <div
                                className={
                                  orderItem.orderStatus === "production" ||
                                  orderItem.orderStatus === "delivered"  ||
                                  orderItem.orderStatus === "charged"
                                    ? "iconBox midIcon greenIconLine"
                                    : " iconBox midIcon greyIconLine"
                                }
                              >
                                <span
                                  className={
                                    orderItem.orderStatus === "production" ||
                                    orderItem.orderStatus === "delivered" ||
                                    orderItem.orderStatus === "charged"
                                      ? "icon-sewmachine iconGreen greyBg iconPadding"
                                      : "icon-sewmachine iconGrey greyBg iconPadding"
                                  }
                                ></span>
                                <p
                                  className={
                                    orderItem.orderStatus === "production" ||
                                    orderItem.orderStatus === "delivered" ||
                                    orderItem.orderStatus === "charged"
                                      ? ""
                                      : "bahijFont"
                                  }
                                >
                                  {getStringVal(
                                    this.props.language,
                                    "PRODUCTION_STAGE"
                                  )}
                                  <br />

                                  {orderItem.productionDate !== "" &&
                                  (orderItem.orderStatus === "production" ||
                                    orderItem.orderStatus === "delivered" ||
                                    orderItem.orderStatus === "pickable" ||
                                    orderItem.orderStatus === "charged") ? (
                                    <span>{orderItem.productionDate}</span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                              <div
                                className={
                                  orderItem.orderStatus === "delivered"
                                    ? "greenLine"
                                    : "greyLine"
                                }
                              ></div>
                              <div
                                className={
                                  orderItem.orderStatus === "delivered"
                                    ? "iconBox leftIcon greenIconLine"
                                    : "iconBox leftIcon greyIconLine"
                                }
                              >
                                <span
                                  className={
                                    orderItem.orderStatus === "delivered"
                                      ? "icon-delivery iconGreen greyBg iconPadding"
                                      : "icon-delivery iconGrey greyBg iconPadding"
                                  }
                                ></span>
                                <p
                                  className={
                                    orderItem.orderStatus === "delivered"
                                      ? ""
                                      : "bahijFont"
                                  }
                                >
                                  {getStringVal(
                                    this.props.language,
                                    "DELIVERY"
                                  )}
                                  <br />{" "}
                                  {orderItem.orderStatus === "delivered" &&
                                  orderItem.deliveryDate !== "" ? (
                                    <span>{orderItem.deliveryDate}</span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="ordersPage__cycle branchDelivery">
                              <div className="iconBox rightIcon greenIconLine">
                                <span className="icon-whiteTick iconGreenBg"></span>
                                <p>
                                  {getStringVal(
                                    this.props.language,
                                    "NEW_ORDER"
                                  )}
                                  <br />{" "}
                                  {orderItem.newOrderDate !== "" ? (
                                    <span>{orderItem.newOrderDate}</span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                              <div
                                className={
                                  orderItem.orderStatus === "production" ||
                                  orderItem.orderStatus === "pickable" ||
                                  orderItem.orderStatus === "delivered"
                                    ? "greenLine"
                                    : "greyLine"
                                }
                              ></div>
                              <div
                                className={
                                  orderItem.orderStatus === "production" ||
                                  orderItem.orderStatus === "pickable" ||
                                  orderItem.orderStatus === "delivered"
                                    ? "iconBox midIcon greenIconLine"
                                    : "iconBox midIcon greyIconLine"
                                }
                              >
                                <span
                                  className={
                                    orderItem.orderStatus === "production" ||
                                    orderItem.orderStatus === "pickable" ||
                                    orderItem.orderStatus === "delivered"
                                      ? "icon-sewmachine iconGreen greyBg iconPadding"
                                      : "icon-sewmachine iconGrey greyBg iconPadding"
                                  }
                                ></span>

                                <p
                                  className={
                                    orderItem.orderStatus === "production" ||
                                    orderItem.orderStatus === "pickable" ||
                                    orderItem.orderStatus === "delivered"
                                      ? ""
                                      : "bahijFont"
                                  }
                                >
                                  {getStringVal(
                                    this.props.language,
                                    "PRODUCTION_STAGE"
                                  )}
                                  <br />
                                  {orderItem.productionDate !== "" &&
                                  (orderItem.orderStatus === "production" ||
                                    orderItem.orderStatus === "delivered" ||
                                    orderItem.orderStatus === "pickable") ? (
                                    <span>{orderItem.productionDate}</span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>

                              <div
                                className={
                                  orderItem.orderStatus === "pickable" ||
                                  orderItem.orderStatus === "delivered"
                                    ? "greenLine"
                                    : "greyLine"
                                }
                              ></div>
                              <div
                                className={
                                  orderItem.orderStatus === "pickable" ||
                                  orderItem.orderStatus === "delivered"
                                    ? "iconBox midIcon greenIconLine"
                                    : "iconBox midIcon greyIconLine"
                                }
                              >
                                <span
                                  className={
                                    orderItem.orderStatus === "pickable" ||
                                    orderItem.orderStatus === "delivered"
                                      ? "icon-branch iconGreen greyBg iconPadding"
                                      : "icon-branch iconGrey greyBg iconPadding"
                                  }
                                ></span>

                                <p
                                  className={
                                    orderItem.orderStatus === "pickable" ||
                                    orderItem.orderStatus === "delivered"
                                      ? ""
                                      : "bahijFont"
                                  }
                                >
                                  {getStringVal(
                                    this.props.language,
                                    "READY_BRANCH"
                                  )}
                                  <br />
                                  {orderItem.pickableDate !== "" &&
                                  orderItem.orderStatus != "production" &&
                                  (orderItem.orderStatus == "pickable" ||
                                    orderItem.orderStatus === "delivered") ? (
                                    <span>{orderItem.pickableDate}</span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>

                              <div
                                className={
                                  orderItem.orderStatus === "delivered"
                                    ? "greenLine"
                                    : "greyLine"
                                }
                              ></div>
                              <div
                                className={
                                  orderItem.orderStatus === "delivered"
                                    ? "iconBox leftIcon greenIconLine"
                                    : "iconBox leftIcon greyIconLine"
                                }
                              >
                                <span
                                  className={
                                    orderItem.orderStatus === "delivered"
                                      ? "icon-delivery iconGreen greyBg iconPadding"
                                      : "icon-delivery iconGrey greyBg iconPadding"
                                  }
                                ></span>

                                <p
                                  className={
                                    orderItem.orderStatus === "delivered"
                                      ? ""
                                      : "bahijFont"
                                  }
                                >
                                  {getStringVal(
                                    this.props.language,
                                    "RECEIVED"
                                  )}
                                  <br />
                                  {orderItem.deliveryDate !== "" &&
                                  orderItem.orderStatus != "production" &&
                                  orderItem.orderStatus == "delivered" ? (
                                    <span>{orderItem.deliveryDate}</span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                            </div>
                          )
                        ) : (
                          ""
                        )}
                        <h5>{getStringVal(this.props.language, "DETAILS")}</h5>
                        <div className="row">
                          <div className="col-12 col-md-7  ordersPage__orders">
                            {orderItem.orderDetails.itemsOfOrders.map(order => {
                              console.log(order);
                              return (
                                <div
                                  key={"product" + order.productId}
                                  className="ordersPage__orders__orderItem  d-flex justify-content-between"
                                >
                                  <div className="ordersPage__orders__orderItem__details d-flex justify-content-start  align-items-start flex-md-nowrap">
                                    <div className="ordersPage__orders__orderItem__details__image">
                                      {parseFloat(order.discount) > 0 ? (
                                        <div className="discountTag">
                                          <span>{order.discount}</span>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      <img src={order.itemImg} />
                                    </div>
                                    <div className="ordersPage__orders__orderItem__details__info d-flex flex-column">
                                      <h4>
                                        {order.itemTitle}{" "}
                                        {order.designed === true ? (
                                          <span>
                                            (
                                            {getStringVal(
                                              this.props.language,
                                              "DRESS_DESIGNER"
                                            )}
                                            )
                                          </span>
                                        ) : (
                                          ""
                                        )}{" "}
                                        {order.stockType == "fabric" ? (
                                          <span>
                                            (
                                            {getStringVal(
                                              this.props.language,
                                              "RATE"
                                            )}
                                            )
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </h4>
                                      {order.selectedSize.name !== undefined ? (
                                        <h5>
                                          <span className="bahijFont">
                                            {order.selectedSize.name !== "s" &&
                                            order.selectedSize.name !== "m" &&
                                            order.selectedSize.name !== "l"
                                              ? getStringVal(
                                                  this.props.language,
                                                  "SPECIAL_SIZE"
                                                )
                                              : getStringVal(
                                                  this.props.language,
                                                  "SIZE"
                                                )}
                                            :
                                          </span>
                                          {order.selectedSize.name === "s"
                                            ? getStringVal(
                                                this.props.language,
                                                "SMALL"
                                              )
                                            : order.selectedSize.name === "m"
                                            ? getStringVal(
                                                this.props.language,
                                                "MEDUIM"
                                              )
                                            : order.selectedSize.name === "l"
                                            ? getStringVal(
                                                this.props.language,
                                                "LARGE"
                                              )
                                            : order.selectedSize.name}
                                        </h5>
                                      ) : (
                                        ""
                                      )}
                                      {order.sizeManFlag !== undefined &&
                                      order.sizeManFlag === true ? (
                                        <h5>
                                          <span className="bahijFont">
                                            {getStringVal(
                                              this.props.language,
                                              "I_WANT_TO_TARZI"
                                            )}
                                          </span>
                                        </h5>
                                      ) : (
                                        ""
                                      )}
                                      {order.stockType == "fabric" ||
                                      order.designed === true ? (
                                        <a
                                          onClick={e =>
                                            this.modificationsPopup(
                                              e,
                                              order.productId,
                                              order.designed,
                                              order.edited,
                                              order.itemTitle
                                            )
                                          }
                                        >
                                          {getStringVal(
                                            this.props.language,
                                            "DISPLAY_ADJUSTMENTS"
                                          )}
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                      <p className="mt-3"><strong>{getStringVal(
                                            this.props.language,
                                            "NOTES"
                                          )}</strong></p>
                                      {order.notes && <p>{order.notes}</p>}
                                      <div className="ordersPage__orders__orderItem__price price">
                                        {parseInt(order.quantity) > 1 &&
                                        parseFloat(order.discount) > 0 ? (
                                          <div>
                                            <p>
                                              <span>
                                                {/* {parseInt(order.price)*parseInt(order.quantity)*parseFloat(order.discount)/100}  */}

                                                {parseInt(order.price) *
                                                  parseInt(order.quantity)}
                                              </span>

                                              {getStringVal(
                                                this.props.language,
                                                "SR"
                                              )}
                                              <p className="onePiece">
                                                {getStringVal(
                                                  this.props.language,
                                                  "AFTER_DISCOUNT"
                                                )}
                                              </p>
                                            </p>
                                            <p
                                              className={
                                                this.props.language === true
                                                  ? "onePiece arabicNumber"
                                                  : "onePiece"
                                              }
                                            >
                                              {order.quantity}
                                              <span className="d-inline-flex">
                                                &nbsp;
                                                <span>x</span>&nbsp;&nbsp;
                                                {getStringVal(
                                                  this.props.language,
                                                  "ONE_PIECE"
                                                )}{" "}
                                                {order.price}{" "}
                                                {getStringVal(
                                                  this.props.language,
                                                  "SR"
                                                )}{" "}
                                              </span>
                                            </p>
                                          </div>
                                        ) : parseInt(order.quantity) == 1 &&
                                          parseFloat(order.discount) > 0 ? (
                                          <div>
                                            <p>
                                              {/* {parseInt(order.price) - ( parseInt(order.price)*parseFloat(order.discount)/100)}  */}
                                              {parseInt(order.price)}
                                              {getStringVal(
                                                this.props.language,
                                                "SR"
                                              )}{" "}
                                              <p className="onePiece">
                                                {getStringVal(
                                                  this.props.language,
                                                  "AFTER_DISCOUNT"
                                                )}
                                              </p>
                                            </p>
                                          </div>
                                        ) : parseInt(order.quantity) == 1 &&
                                          parseFloat(order.discount) == 0 ? (
                                          <div>
                                            <p>
                                              {" "}
                                              {parseInt(order.price)}{" "}
                                              {getStringVal(
                                                this.props.language,
                                                "SR"
                                              )}
                                            </p>
                                          </div>
                                        ) : (
                                          <div>
                                            <p>
                                              <span>
                                                {parseInt(order.price) *
                                                  parseInt(order.quantity)}{" "}
                                              </span>
                                              {getStringVal(
                                                this.props.language,
                                                "SR"
                                              )}
                                            </p>
                                            <p
                                              className={
                                                this.props.language === true
                                                  ? "onePiece arabicNumber"
                                                  : "onePiece"
                                              }
                                            >
                                              {" "}
                                              {order.quantity}
                                              <span className="d-inline-flex">
                                                &nbsp;<span>x</span>&nbsp;&nbsp;{" "}
                                                {getStringVal(
                                                  this.props.language,
                                                  "ONE_PIECE"
                                                )}{" "}
                                                {order.price}{" "}
                                                {getStringVal(
                                                  this.props.language,
                                                  "SR"
                                                )}{" "}
                                              </span>{" "}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="col-12 col-md-5 ordersPage__details">
                            {orderItem.orderStatus !== "cancelled" ? (
                              <div className="ordersPage__details__payment">
                                <h3>
                                  {getStringVal(
                                    this.props.language,
                                    "SHIPPING__PAYMENT"
                                  )}
                                </h3>
                                {orderItem.deliveryAndPayment.paymentMethod &&
                                orderItem.deliveryAndPayment.paymentMethod !==
                                  "" ? (
                                  <div className="ordersPage__details__payment__paymentWay d-flex justify-content-between align-items-center mb-2">
                                    <p>
                                      {getStringVal(
                                        this.props.language,
                                        "PAYMENT_METHOD"
                                      )}
                                    </p>
                                    <p className="bahijFont">
                                      {
                                        orderItem.deliveryAndPayment
                                          .paymentMethod
                                      }
                                    </p>
                                  </div>
                                ) : (
                                  ""
                                )}
                                <div className="ordersPage__details__payment__deliveryWay d-flex justify-content-between align-items-center mb-2">
                                  <p>
                                    {getStringVal(
                                      this.props.language,
                                      "SHIPPING_METHOD"
                                    )}
                                  </p>
                                  <p className="bahijFont">
                                    {
                                      orderItem.deliveryAndPayment
                                        .deliveryMethod
                                    }
                                  </p>
                                </div>
                                {orderItem.deliveryAndPayment.address.trim() !==
                                "" ? (
                                  <div className="ordersPage__details__payment__address d-flex justify-content-between align-items-start mb-2">
                                    <p>
                                      {getStringVal(
                                        this.props.language,
                                        "ADDRESS"
                                      )}
                                    </p>
                                    <p className="bahijFont">
                                      {orderItem.deliveryAndPayment.address}
                                    </p>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {orderItem.orderStatus === "pickable" ||
                                orderItem.orderStatus === "cancelled" ||
                                orderItem.orderStatus === "delivered" ? (
                                  ""
                                ) : (
                                  <div className="ordersPage__cancelation">
                                    <p
                                      onClick={() =>
                                        this.cancelPopup(
                                          true,
                                          orderItem.orderStatus,
                                          orderItem.orderNo
                                        )
                                      }
                                    >
                                      {getStringVal(
                                        this.props.language,
                                        "CANCELLING_ORDER"
                                      )}{" "}
                                    </p>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="ordersPage__details__payment">
                                <h3>
                                  {getStringVal(
                                    this.props.language,
                                    "SHIPPING__PAYMENT"
                                  )}
                                </h3>
                                {orderItem.deliveryAndPayment.paymentMethod &&
                                orderItem.deliveryAndPayment.paymentMethod !==
                                  "" ? (
                                  <div className="ordersPage__details__payment__paymentWay d-flex justify-content-between align-items-center mb-2">
                                    <p>
                                      {getStringVal(
                                        this.props.language,
                                        "PAYMENT_METHOD"
                                      )}
                                    </p>
                                    <p className="bahijFont">
                                      {
                                        orderItem.deliveryAndPayment
                                          .paymentMethod
                                      }
                                    </p>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            )}
                            <div className="ordersPage__details__summery">
                              <h3>
                                {getStringVal(
                                  this.props.language,
                                  "ORDER_SUMMARY"
                                )}
                              </h3>
                              <div className="ordersPage__details__summery__total d-flex justify-content-between align-items-center">
                                <p>
                                  {getStringVal(
                                    this.props.language,
                                    "TOTAL_PRODUCTS"
                                  )}
                                </p>
                                <p>
                                  {orderItem.orderSummary.total}{" "}
                                  {getStringVal(this.props.language, "SR")}
                                </p>
                              </div>
                              {parseInt(orderItem.orderSummary.coupon_discount) !== 0 ? (
                                <div className="ordersPage__details__summery__delivery d-flex justify-content-between align-items-center">  
                                  <p>
                                    {" "}
                                    {getStringVal(
                                      this.props.language,
                                      "COUPON_DISCOUNT"
                                    )}{" "}
                                  </p>
                                  <p>
                                    {orderItem.orderSummary.coupon_discount}{" "}
                                    {orderItem.orderSummary.coupon_discount_type === "percent" ? "%" : getStringVal(this.props.language, "SR")}
                                  </p>
                                </div>
                              ) : (
                                ""
                              ) }
                              {parseInt(orderItem.orderSummary.coupon_discount) !== 0 && orderItem.orderSummary.coupon_discount_type !== "money" ? (
                                <div className="ordersPage__details__summery__delivery d-flex justify-content-between align-items-center">  
                                  <p>
                                    {" "}
                                    {getStringVal(
                                      this.props.language,
                                      "COUPON_DISCOUNT_VALUE"
                                    )}{" "}
                                  </p>
                                  <p>
                                    {orderItem.orderSummary.total * (orderItem.orderSummary.coupon_discount / 100)}{" "}
                                    {getStringVal(this.props.language, "SR")}
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}
                              {parseInt(orderItem.orderSummary.delivery) !==
                              0 ? (
                                <div className="ordersPage__details__summery__delivery d-flex justify-content-between align-items-center">  
                                  <p>
                                    {" "}
                                    {getStringVal(
                                      this.props.language,
                                      "SHIPPING"
                                    )}{" "}
                                    <span
                                      className="icon-round-error-symbol"
                                      onMouseEnter={e => this.msgAppear(e)}
                                      onMouseLeave={e => this.msgDisappear(e)}
                                    ></span>
                                    <span className="desc">
                                      {getStringVal(
                                        this.props.language,
                                        "YOU_WILL_DETERMINE_THE_COST_OF_SHIPPING_BASED_ON_YOUR_AREA_AND_YOUR_ADDRESS"
                                      )}
                                    </span>
                                  </p>
                                  <p>
                                    {/* <span>{getStringVal(this.props.language, "STARTS_FROM")}</span>  */}
                                    {orderItem.orderSummary.delivery}{" "}
                                    {getStringVal(this.props.language, "SR")}
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}
                              {orderItem.sizeManFlag !== false &&
                              orderItem.orderSummary.costOfsizeMan !== "" ? (
                                <div className="ordersPage__details__summery__costSizeMan d-flex justify-content-between align-items-center">
                                  <p>
                                    {" "}
                                    {getStringVal(
                                      this.props.language,
                                      "THE_COST_TAILOR"
                                    )}{" "}
                                    <span
                                      className="icon-round-error-symbol"
                                      onMouseEnter={e => this.msgAppear(e)}
                                      onMouseLeave={e => this.msgDisappear(e)}
                                    ></span>
                                    <span className="desc">
                                      {getStringVal(
                                        this.props.language,
                                        "YOU_WILL_DETERMINE_THE_COST_TARAZI_BASED_ON_YOUR_AREA_AND_YOUR_ADDRESS"
                                      )}
                                    </span>
                                  </p>
                                  <p>
                                    {/* <span>{getStringVal(this.props.language, "STARTS_FROM")}</span>   */}
                                    {orderItem.orderSummary.costOfsizeMan}{" "}
                                    {getStringVal(this.props.language, "SR")}
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}

                              <div className="orderSammury">
                                <AvailableDiscounts 
                                  msgAppear={this.msgAppear} 
                                  msgDisappear={this.msgDisappear}
                                  userDiscount={orderItem.orderSummary.userDiscount}
                                  partnerDiscount={parseFloat(orderItem.orderSummary.partnerDiscount)}
                                  total={orderItem.orderSummary.total}
                                  language={this.props.language}
                                />
                              </div>
                              {Number(orderItem.orderSummary.quantity_discount) ?
                              (<div className="ordersPage__details__summery__expectedTotal d-flex justify-content-between  align-items-center">
                                <p>
                                  {getStringVal(this.props.language, "quantity_discount")}
                                </p>
                                <div>
                                        <p>
                                        {this.isFloat(
                                          parseFloat(
                                            orderItem.orderSummary.quantity_discount
                                          )
                                        )} {" "}{getStringVal(this.props.language, "SR")}
                                        </p>
                                    
                                </div>
                              </div>) : ""}
                              <div className="ordersPage__details__summery__expectedTotal d-flex justify-content-between align-items-center">
                                <p>
                                  {getStringVal(
                                    this.props.language,
                                    "THE_TOTAL_EXPECTED"
                                  )}
                                </p>
                                <p>
                                  {/* {orderItem.orderSummary.expectTotal} */}
                                  {this.isFloat(
                                    parseFloat(
                                      orderItem.orderSummary.expectTotal
                                    )
                                  )}
                                  {getStringVal(this.props.language, "SR")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="ordersPage__emptyOrders">
                <h2 className="text-center">
                  {getStringVal(
                    this.props.language,
                    "NOT_ANY_REQUESTS_YET_SHOP_NOW_AND_ASK_FOR_YOUR_FIRST_ORDER"
                  )}
                </h2>
                <div className="ordersPage__btns d-flex justify-content-center">
                  <div className="button btnVersa">
                    <Link href="/thoob-design">
                      {getStringVal(this.props.language, "DESIGNED_YOUR_DRESS")}
                    </Link>
                  </div>
                  <div className="buttonVersa">
                    <Link href="/products-list/athoob1">
                      {getStringVal(this.props.language, "SHOPPING_DRESSES")}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    language: state.generalReducer.language,
    orders: state.ordersReducer.ordersArray,
    ordersObject: state.ordersReducer.ordersObject,
    language: state.generalReducer.language,
    cancelStatus: state.ordersReducer.cancelStatus
    // noSizeMan:state.ordersReducer.noSizeMan
  };
}
function mapDispatchToProps(dispatch) {
  return {
    cancelOrderPopUp(value, orderStatus, orderNum) {
      dispatch(cancelOrderPopUp(value, orderStatus, orderNum));
    },
    orderItemsEdit(productId, lang, auth) {
      dispatch(orderItemsEdit(productId, lang, auth));
    },
    modificationsPopup(value, designed, edited, title) {
      dispatch(modificationsPopup(value, designed, edited, title));
    },
    paymentResponse(query,language,token){
     dispatch(paymentResponse(query,language,token));
    },
    tabbyResponse(query,language,token){
      dispatch(tabbyResponse(query,language,token));
     }
  };
}

//binding actions with component
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
