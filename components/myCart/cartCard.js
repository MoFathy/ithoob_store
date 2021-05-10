import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
// actions
import { getCookie } from "../../scripts/getCookieFile";
import { getStringVal } from "../../scripts/multiLang";
import Stock from "../productDetails/stock";
import {
  updateQuantity,
  deleteItemFromLocalStorage,
  updateQuantityFromLocalStorage,
  updateDeletedItemId,
  updateDeletedItemIndex,
  updateDeletedItemTitle
} from "../../actions/myCart/updateQuantity";

import {
  getCartItems,
  getCartItemsFromLocalStorage,
  deleteCartItemsFromLocalStorage,
  updateErrMsgStatus,
  updateMeasurementsIsComplateStatus
} from "../../actions/myCart/myCartActions";

import {
  getEdits,
  updateSelectedColorId,
  updateSelectedId,
  updateCustoms,
  getDefaultIdsFromLocalStorage,
  updateItemsInLocalStorage,
  updateCustomsStatusAction
} from "../../actions/myCart/edits";

import {
  updateSize,
  updateSizeFromLocalStorage,
  updateSizeStatus
} from "../../actions/myCart/editSizeActions";

import {
  getProductDetails,
  getDefaultIds,
  updateFromProductDetails
} from "../../actions/productDetails/productDetails";

import {
  storeSizeID,
  userMeasureId,
  updateSizeMan
} from "../../actions/includes/carouselActions";

import { getPartnerDiscountFromLocalStorage } from "../../actions/myCart/getCode";
// components
import QuantitySection from "../includes/quantityPart";
import EditSize from "./editSize";
// import Colors from "../productDetails/colors";
// import Costums from "../productDetails/costums";
import CustomsContainer from "./customsContainer";
import { updateMeasurementErrMsg } from "../../actions/myCart/editSizeActions";
class CartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getMeasurmentsIsCalled: false
      // shoesSizeIsValid: false
    };
    this.props.updateSizeStatus(true);
  }

  componentDidMount() {
    require("bootstrap/js/dist/collapse");
    const $ = require("jquery");
    if (this.props.ithoobCookie == -1) {
      this.props.getCartItemsFromLocalStorage();
      this.props.getPartnerDiscountFromLocalStorage();
      this.defaultIds =
        this.props.productDetails.customs &&
          this.props.productDetails.customs.length > 0
          ? this.props.productDetails.customs.map(
            custom => custom.images.find(img => img.default == true).id
          )
          : "";
      this.props.getDefaultIds(this.defaultIds);
    }
    // $('.itemsPart').height($('.sideBarPart').outerHeight(true));
    $(".orderSummaryContainer").css(
      "min-height",
      $(".orderSammury").outerHeight() + 400 + "px"
    );


  }

  handlePlusClick = (id, quantity, index) => {
    const newQuantity = quantity + 1;
    if (this.props.ithoobCookie !== -1) {
      this.props.updateQuantity(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken"),
        id,
        newQuantity
      );
    } else {
      this.props.updateQuantityFromLocalStorage(index, newQuantity);
    }
  };

  handleMinusClick = (id, quantity, index) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      if (this.props.ithoobCookie !== -1) {
        this.props.updateQuantity(
          this.props.language === false ? 1 : 2,
          getCookie("ithoobUser", "authenticationToken"),
          id,
          newQuantity
        );
        this.props.getCartItems(
          this.props.language === false ? 1 : 2,
          getCookie("ithoobUser", "authenticationToken")
        );
      } else {
        // handleMinusClick from local storage
        this.props.updateQuantityFromLocalStorage(index, newQuantity);
      }
    }
  };

  deleteItem = (e, id, index, title) => {
    e.preventDefault();
    if (this.props.ithoobCookie !== -1) {
      // //console.log("deleteItem");
      // //console.log("language");
      // //console.log(this.props.language === false ? 1 : 2);
      // //console.log("id");
      // //console.log(id);
      // //console.log(getCookie("ithoobUser", "authenticationToken"));
      // const newQuantity = 0;
      // this.props.updateQuantity(
      //   this.props.language === false ? 1 : 2,
      //   getCookie("ithoobUser", "authenticationToken"),
      //   id,
      //   newQuantity
      // );
      // this.props.getCartItems(
      //   this.props.language === false ? 1 : 2,
      //   getCookie("ithoobUser", "authenticationToken")
      // );
      this.props.updateDeletedItemId(id);
    } else {
      // this.props.deleteItemFromLocalStorage(index);
      this.props.updateDeletedItemIndex(index);
    }

    // this.props.updateDeletedItemId(id)
    // this.props.updateDeletedItemIndex(index)
    this.props.updateDeletedItemTitle(title);
    $("#deleteItemModel").modal("show");
  };

  chooseSize = (e, id, selectedSize, sizeManFlag) => {
    e.preventDefault();

    $(".editSizeContainer")
      .removeClass("d-block")
      .addClass("d-none");
    $(e.target)
      .parents(".cardContainer")
      .children(".editSizeContainer")
      .removeClass("d-none")
      .addClass("d-block");

    this.props.updateSizeStatus(false);
    if (selectedSize.id && selectedSize.name) {
      this.props.userMeasureId(selectedSize.id);
    } else if (selectedSize.name) {
      this.props.storeSizeID(selectedSize.name);
      this.props.updateMeasurementErrMsg("");
    } else {
      this.props.storeSizeID("");
      this.props.updateSizeMan(sizeManFlag);
    }
    this.props.updateMeasurementErrMsg("");

    // let defaultSize;
    // this.props.measurementsitems.items.map(item =>
    //   item.default === true ? (defaultSize = item.id) : ""
    // );

    // this.props.userMeasureId(defaultSize);
  };

  editItem = (e, id, slug, index) => {
    e.preventDefault();
    this.props.updateCustomsStatusAction(false);
    if (this.props.ithoobCookie !== -1) {
      this.props.getEdits(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken"),
        id
      );
    } else {
      // editItem from local storage
      this.props.getProductDetails(this.props.language === false ? 1 : 2, slug);
      this.props.getDefaultIdsFromLocalStorage(index);
    }
    $(".customsContainer")
      .removeClass("d-block")
      .addClass("d-none");
    $(e.target)
      .parents(".cardContainer")
      .children(".customsContainer")
      .removeClass("d-none")
      .addClass("d-block");
  };

  closeCustoms = () => {
    $(".customsContainer")
      .removeClass("d-block")
      .addClass("d-none");
  };

  changeSize = (e, id) => {
    e.preventDefault();
  };

  handleColorClick = id => {
    //console.log(id);
    // if (this.props.ithoobCookie !== -1) {
    //console.log("handleColorClick");

    this.props.updateSelectedColorId(id);
    // } else {
    //   //console.log("handleColorClick from local storage");
    // }
  };

  handleImgClick = (e, imgId) => {
    // if(this.props.ithoobCookie !== -1){
    //console.log("handleImgClick");
    let customs =
      this.props.ithoobCookie !== -1
        ? this.props.customs
        : this.props.productDetails.customs;
    let clickedCustomIdsArray = customs
      .find(custom => custom.images.find(img => img.id == imgId))
      .images.map(img => img.id);

    let deletedArray = [];
    this.props.selectedIds.forEach(defaultId =>
      clickedCustomIdsArray.forEach(customId =>
        defaultId === customId ? deletedArray.push(defaultId) : ""
      )
    );

    let deletedId = deletedArray.join("");

    let filteredDefaultIds = [
      ...this.props.selectedIds.filter(id => !(id == deletedId)),
      imgId
    ];

    // this.props.getDefaultIds(filteredDefaultIds);
    this.props.updateSelectedId(filteredDefaultIds);
    // }else{
    //   //console.log("handleImgClick from local storage");
    //   // this.props.updateSelectedId(filteredDefaultIds);
    // }
  };

  updateCustoms = (id, index) => {
    if (this.props.ithoobCookie !== -1) {
      this.props.updateCustoms(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken"),
        id,
        this.props.selectedIds,
        this.props.selectedColorId
      );
    } else {
      // updateItems In Local Storage
      this.props.updateItemsInLocalStorage(
        index,
        this.props.selectedColorId,
        this.props.selectedIds
      );
      if (this.props.ithoobCookie == -1) {
        this.props.getCartItemsFromLocalStorage();
        this.defaultIds =
          this.props.productDetails.customs &&
            this.props.productDetails.customs.length > 0
            ? this.props.productDetails.customs.map(
              custom => custom.images.find(img => img.default == true).id
            )
            : "";
        this.props.getDefaultIds(this.defaultIds);
      }
      this.closeCustoms();
    }
  };

  updateSize = (e, id, index, sizeType, quantity_id) => {
    // var value = parseFloat($(e.target).val());
    var value = e;
    if (value !== 0) { // If we change the size to anything except 0


      // Disable checkout button - It will be enabled once the size gets updated by api call at 'getCartItems'
      let checkoutBtn = document.querySelector('.checkout-btn');
      if (checkoutBtn) {
        checkoutBtn.classList.add('disabled');
      }

      // Hide "Complete Measurement" error message
      this.props.updateErrMsgStatus(false);


      if (this.props.ithoobCookie !== -1) {
        if (sizeType != "shoes") {
          this.props.updateSize(
            this.props.language === false ? 1 : 2,
            getCookie("ithoobUser", "authenticationToken"),
            id,
            false,
            value,
            quantity_id,
            false
          );
        } else {
          //if shoes need validation here for shoe size
          this.props.updateSize(
            this.props.language === false ? 1 : 2,
            getCookie("ithoobUser", "authenticationToken"),
            id,
            false,
            value,
            quantity_id,
            true
          )
          // this.setState({ shoesSizeIsValid: true });
        }
      } else {
        // updateSize from local storage");
        //console.log("index");
        //console.log(index);
        this.props.updateSizeFromLocalStorage(index, value);
      }

    } else {
      // If no appropriate size selected, show error message
      this.props.updateErrMsgStatus(true);
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.sizeStatus !== prevProps.sizeStatus &&
      this.props.sizeStatus
    ) {
      $(".editSizeContainer")
        .removeClass("d-block")
        .addClass("d-none");
    }
    if (
      this.props.updateCustomsStatus !== prevProps.updateCustomsStatus &&
      this.props.updateCustomsStatus
    ) {
      this.closeCustoms();
    }
    if (this.props.items.length !== prevProps.items.length) {
      $(".orderSummaryContainer").css(
        "min-height",
        $(".orderSammury").outerHeight() + 400 + "px"
      );
    }
  }

  componentWillUnmount() {
    this.props.storeSizeID("");
  }

  checkQuery = () => {
    if (this.props.pathname.includes("myCart")) {
      this.props.updateFromProductDetails(false, "", true);
    }
  };

  render() {
    console.log('====================================');
    console.log(this.props.items);
    console.log('====================================');
    return this.props.isLoading ? (
      <div className="alert alert-info text-center" role="alert">
        {getStringVal(this.props.language, "LOADING")}
      </div>
    ) : !this.props.isLoading &&
      this.props.items &&
      this.props.items.length > 0 ? (
          this.props.items.map((item, index) => !item.notAvailableAnymore ? (
            <div className="cardContainer" key={index}>
              <div className="productCard card d-flex flex-md-row flex-column">
                <div className="productImgContainer">
                  {/* tags */}
                  {item.tags ? (
                    <ul className="productTags">
                      {item.tags.discount ? (
                        item.tags.discount !== 0 ? (
                          <li
                            className={
                              this.props.language === true
                                ? "tagSpan discount"
                                : "tagSpan discount"
                            }
                          >
                            {item.tags.discount}-
                          </li>
                        ) : (
                            ""
                          )
                      ) : (
                          ""
                        )}
                      {item.tags.isRecommended ? (
                        <li className="tagSpan">
                          {getStringVal(this.props.language, "RECOMMENDED")}
                        </li>
                      ) : (
                          ""
                        )}
                      {item.tags.isBestSeller ? (
                        <li className="tagSpan">
                          {getStringVal(this.props.language, "BEST_SELLER")}
                        </li>
                      ) : (
                          ""
                        )}
                    </ul>
                  ) : item.discount ? (
                    <ul className="productTags">
                      <li
                        className={
                          this.props.language === true
                            ? "tagSpan discount"
                            : "tagSpan discount"
                        }
                      >
                        {`% ${item.discount}`}-
                  </li>
                    </ul>
                  ) : (
                        ""
                      )}

                  {/* productImg */}
                  <img
                    // className="card-img-top"
                    className="productImg"

                    /*
                     * LoggedIn user gets "img" value with naked image URL
                     * While LoggedOut user gets "img" object contains 3 images
                     */
                    src={
                      this.props.ithoobCookie !== -1
                        ? item.img
                        : item.img.img || item.img
                    }
                    alt={
                      this.props.ithoobCookie !== -1
                        ? item.title
                        : this.props.language
                          ? item.title_ar
                          : item.title_en
                    }
                  />
                </div>

                <div className="card-body d-flex row">
                  <div className="productSammery col-7">
                    {/* product title */}
                    {item.designed ||
                      item.fabrics ||
                      item.yaka ||
                      item.zarzour ||
                      item.akmam ||
                      item.others ||
                      item.attachments ||
                      item.notes ? (
                        <Link
                          href={
                            this.props.ithoobCookie !== -1
                              ? `/customizations/${item.productId}`
                              : `/customizations/${index}`
                          }
                          // href={`/customizations?itemid=${item.productId}`}
                          as={
                            this.props.ithoobCookie !== -1
                              ? `/customizations/${item.productId}`
                              : `/customizations/${index}`
                          }
                        >
                          <h5 className="card-title">
                            {this.props.ithoobCookie !== -1
                              ? item.title
                              : this.props.language
                                ? item.title_ar
                                : item.title_en}

                            {item.stockType == "fabric" ||
                              (item.selectedColorId && item.selectedColorId !== null) ||
                              (item.selectedIds && item.selectedIds.length > 0) ? (
                                <span>
                                  ({getStringVal(this.props.language, "RATE")})
                                </span>
                              ) : (
                                ""
                              )}

                            {item.designed ||
                              item.fabrics ||
                              item.yaka ||
                              item.zarzour ||
                              item.akmam ||
                              item.others ||
                              item.attachments ||
                              item.notes ? (
                                <span>
                                <br></br>
                                  ({getStringVal(this.props.language, "DRESS_DESIGNER")}
                          )
                                </span>
                              ) : (
                                ""
                              )}
                          </h5>
                        </Link>
                      ) : (
                        <Link
                          href={`/product-details?slug=${item.slug}`}
                          as={`/product-details/${item.slug}`}
                        >
                          <h5 className="card-title">
                            {this.props.ithoobCookie !== -1
                              ? item.title
                              : this.props.language
                                ? item.title_ar
                                : item.title_en}

                            {item.stockType == "fabric" ||
                              (item.selectedColorId && item.selectedColorId !== null) ||
                              (item.selectedIds && item.selectedIds.length > 0) ? (
                                <span>
                                  ({getStringVal(this.props.language, "RATE")})
                                </span>
                              ) : (
                                ""
                              )}

                            {item.designed ||
                              item.fabrics ||
                              item.yaka ||
                              item.zarzour ||
                              item.akmam ||
                              item.others ||
                              item.attachments ||
                              item.notes ? (
                                <span>
                                <br></br>
                                  ({getStringVal(this.props.language, "DRESS_DESIGNER")}
                          )
                                </span>
                              ) : (
                                ""
                              )}
                          </h5>
                        </Link>
                      )}

                    {/* size part */}
                    {this.props.ithoobCookie == -1 ? (
                      item.sizeType == "sizeable" ? (
                        <Link href="/addMeasurement" as="/add-measurement">
                          <button
                            className="button sizeBtn"
                            onClick={() => this.checkQuery()}
                          >
                            {getStringVal(this.props.language, "ADD_FILE_FORMAT")}
                          </button>
                        </Link>
                      ) : (
                          ""
                        )
                    ) 
                    // : item.sizeType !== "accessories" ? (
                    //   ""
                    // ) 
                    : (
                      item.options_stock && item.options_stock.length > 0 ||
                      (item.shoesSize && item.shoesSize.length > 0) ?
                      (
                        this.props.sizeStatus ?
                          (
                            <div>
                              {/* Shoes Sizes */}
                              <Stock 
                                stock={item.options_stock} 
                                quantity_id={item.quantity_id.quanity_id}
                                selectStock={(value)=>this.updateSize(
                                  value.size,
                                  item.productId,
                                  index,
                                  "shoes",
                                  value.quantity_id
                                )}/>

                              {/* <select
                                className="form-control mb-2"
                                onChange={e => this.updateSize(
                                  e,
                                  item.productId,
                                  index,
                                  item.sizeType,
                                  value.quantity_id
                                )}
                                value={item.selectedSize.name}
                              >
                                <option value="0"> </option>
                                <option value="41">41</option>
                                <option value="42">42</option>
                                <option value="43">43</option>
                                <option value="44">44</option>
                                <option value="45">45</option>
                              </select> */}
                            </div>
                          ) : (
                            <div>
                              <Stock stock={item.options_stock} 
                                quantity_id={item.quantity_id.quanity_id}
                                selectStock={(value)=>this.updateSize(
                                  value.size,
                                  item.productId,
                                  index,
                                  "shoes",
                                  value.quantity_id
                                )}/>

                              {/* <select
                                className="form-control mb-2"
                                onChange={e => this.updateSize(
                                  e,
                                  item.productId,
                                  index,
                                  item.sizeType
                                )}
                                value={
                                  item.selectedSize.name
                                }
                              >
                                <option value="41">41</option>
                                <option value="42">42</option>
                                <option value="43">43</option>
                                <option value="44">44</option>
                                <option value="45">45</option>
                              </select> */}
                            </div>
                          )
                      ) : (
                        <p className="card-text">
                          {(item.selectedSize && item.selectedSize.name) ||
                            item.size ? (
                              item.selectedSize ? (
                                <span className="sizeSelected">
                                  {item.selectedSize.name == "sizeMan" ? (
                                    <span>
                                      <span>
                                        {getStringVal(
                                          this.props.language,
                                          "SPECIAL_SIZE"
                                        )}
                                :
                              </span>
                                      <span>
                                        {getStringVal(
                                          this.props.language,
                                          "I_WANT_TO_TARZI"
                                        )}
                                      </span>
                                    </span>
                                  ) : item.selectedSize.name &&
                                    item.selectedSize.id ? (
                                        <span>
                                          <span>
                                            {getStringVal(
                                              this.props.language,
                                              "SPECIAL_SIZE"
                                            )}
                                :
                              </span>
                                          <span>{item.selectedSize.name}</span>
                                        
                                        <span className="productSize">
                                            

                                            {item.selectedSize.name == "s" ||
                                              item.selectedSize.name == "m" ||
                                              item.selectedSize.name == "l" ? (
                                                ""
                                              ) : item.selectedSize.complete ? (
                                                ""
                                              ) : (
                                                  <p className="incompleteSizeLabel">
                                                    {getStringVal(
                                                      this.props.language,
                                                      "THIS_FILE_IS_INCOMPLETE_MUST_COMPLETE_THE_FILE_BEFORE_PURCHASE"
                                                    )}
                                                  </p>
                                                )}
                                          </span>
                                          </span>
                                      ) : (
                                        <span>
                                          <span>
                                            {getStringVal(this.props.language, "SIZE")}:
                              </span>
                                          <span className="productSize">
                                            {item.selectedSize.name}

                                            {item.selectedSize.name == "s" ||
                                              item.selectedSize.name == "m" ||
                                              item.selectedSize.name == "l" ? (
                                                ""
                                              ) : item.selectedSize.complete ? (
                                                ""
                                              ) : (
                                                  <p className="incompleteSizeLabel">
                                                    {getStringVal(
                                                      this.props.language,
                                                      "THIS_FILE_IS_INCOMPLETE_MUST_COMPLETE_THE_FILE_BEFORE_PURCHASE"
                                                    )}
                                                  </p>
                                                )}
                                          </span>
                                        </span>
                                      )}
                                </span>
                              ) : item.size == "m" ||
                                item.size == "s" ||
                                item.size == "l" ? (
                                    <span className="sizeSelected">
                                      {getStringVal(this.props.language, "SIZE")}:
                                      <span>
                                        {item.size == "m"
                                          ? getStringVal(this.props.language, "MEDUIM")
                                          : ""}
                                      </span>
                                      <span>
                                        {item.size == "s"
                                          ? getStringVal(this.props.language, "SMALL")
                                          : ""}
                                      </span>
                                      <span>
                                        {item.size == "l"
                                          ? getStringVal(this.props.language, "LARGE")
                                          : ""}
                                      </span>
                                    </span>
                                  ) : (
                                    <span className="sizeSelected">
                                      {getStringVal(this.props.language, "SPECIAL_SIZE")}:
                                      {this.props.measurementsitems.items &&
                                        this.props.measurementsitems.items.length > 0 ? (
                                          <span>
                                            {
                                              this.props.measurementsitems.items.filter(
                                                sizeItem =>
                                                  parseFloat(sizeItem.id) == item.size
                                              )[0].title
                                            }
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                    </span>
                                  )
                            ) : item.sizeManFlag == true && this.props.ithoobCookie !== -1 ? (
                              <span className="sizeSelected">
                                {getStringVal(this.props.language, "I_WANT_TO_TARZI")}
                              </span>
                            ) : (item.sizeType !== "accessories" || (item.sizeType === "accessories" && item.subCategory && (item.subCategory === "all-rings" || item.subCategory === "ring2")) ?
                                <span className="noSizeselected">
                                  {getStringVal(
                                    this.props.language,
                                    "DO_NOT_CHOOSE_SIZE"
                                  )}{" "}
                                  <br></br>
                                  <a
                                    href="#"
                                    onClick={e =>
                                      this.chooseSize(
                                        e,
                                        item.productId,
                                        item.selectedSize,
                                        item.sizeManFlag
                                      )
                                    }
                                  >
                                    {getStringVal(this.props.language, "CHOOSE_SIZE")}
                                  </a>
                                </span> : ""
                              )}
                        </p>
                      )
                        )}



                    {/* edit product part     */}
                    <ul className="editProduct">
                      <li>
                        {item.designed ||
                          item.fabrics ||
                          item.yaka ||
                          item.zarzour ||
                          item.akmam ||
                          item.others ||
                          item.attachments ||
                          item.notes ? (
                            <Link
                              href={
                                this.props.ithoobCookie !== -1
                                  ? `/customizations/${item.productId}`
                                  : `/customizations/${index}`
                              }
                            >
                              <a className="card-link modify">
                                {getStringVal(this.props.language, "MODIFY")}
                              </a>
                            </Link>
                          ) : item.sizeType == "sizeable" &&
                            item.stockType == "fabric" &&
                            item.hasCustomizationOptions == true ? (
                              <a
                                href="#"
                                className="card-link modify"
                                onClick={e =>
                                  this.editItem(e, item.productId, item.slug, index)
                                }
                              >
                                {getStringVal(this.props.language, "MODIFY")}{" "}
                              </a>
                            ) : (
                              ""
                            )}
                      </li>

                      {/* {item.sizeType == "sizeable" ? ( */}
                      {item.sizeType == "sizeable" &&
                        ((item.selectedSize && item.selectedSize.name) ||
                          (item.size && item.size !== null && item.size.length > 0) ||
                          item.sizeManFlag) ? (
                          <li>
                            <a
                              href="#"
                              className="card-link change-measurement"
                              onClick={e =>
                                this.chooseSize(
                                  e,
                                  item.productId,
                                  item.selectedSize,
                                  item.sizeManFlag
                                )
                              }
                            >
                              {getStringVal(this.props.language, "CHANGING_THE_SIZE")}
                            </a>
                          </li>
                        ) : (
                          ""
                        )}

                      <li>
                        <a
                          href="#"
                          className="card-link"
                          onClick={e =>
                            this.deleteItem(
                              e,
                              item.productId,
                              index,
                              this.props.ithoobCookie !== -1
                                ? item.title
                                : this.props.language
                                  ? item.title_ar
                                  : item.title_en
                            )
                          }
                        >
                          {getStringVal(this.props.language, "DELETE")}
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* priceAndquantity */}
                  <div className="priceAndquantity col-4">
                    <p className="totalPrice">
                      {this.props.ithoobCookie !== -1 ? (
                        item.price_discount ? (
                          <span>{item.price_discount * item.quantity}</span>
                        ) : (
                            <span>
                              {/* testt */}
                              {item.price * item.quantity}
                            </span>
                          )
                      ) : item.discount && item.discount !== 0 ? (
                        <span>
                          {/* testtt */}
                          {/* {parseFloat(item.price) -
                        (parseFloat(item.price) *
                          parseFloat(item.quantity) *
                          parseFloat(item.discount)) /
                          100} */}
                          {item.price_discount * item.quantity}
                        </span>
                      ) : (
                            <span>
                              {/* testttt */}
                              {item.price * item.quantity}
                            </span>
                          )}

                      {getStringVal(this.props.language, "SR")}
                    </p>

                    <p className="price">
                      {item.price_discount
                        ? getStringVal(this.props.language, "AFTER_DISCOUNT_APIECE")
                        : getStringVal(this.props.language, "ONE_PIECE")}
                      <span>
                        {item.price_discount ? item.price_discount : item.price}
                      </span>
                      {getStringVal(this.props.language, "SR")}
                    </p>

                    <QuantitySection
                      quantity={item.quantity}
                      handlePlusClick={() =>
                        this.handlePlusClick(item.productId, item.quantity, index)
                      }
                      handleMinusClick={() =>
                        this.handleMinusClick(item.productId, item.quantity, index)
                      }
                    />
                  </div>
                </div>
              </div>

              <EditSize
                id={item.productId}
                key={item.productId}
                title={
                  this.props.ithoobCookie !== -1
                    ? item.title
                    : this.props.language
                      ? item.title_ar
                      : item.title_en
                }
                sizeType={item.sizeType}
                measurementsTable={item.measurementsTable}
                currentItemSize={
                  item.selectedSize &&
                    item.selectedSize.name &&
                    item.selectedSize.name != "m" &&
                    item.selectedSize.name != "s" &&
                    item.selectedSize.name != "l" &&
                    this.props.ithoobCookie !== -1
                    ? item.selectedSize.name
                    : this.props.ithoobCookie !== -1 &&
                      this.props.measurementsitems &&
                      this.props.measurementsitems.items &&
                      this.props.measurementsitems.items.length > 0
                      ? this.props.measurementsitems.items.map(item =>
                        item.default === true ? item.title : ""
                      ).title
                      : ""
                }
                sizeManStatus={
                  (this.props.ithoobCookie !== -1 && item.sizeManFlag) ||
                  (item.selectedSize &&
                    item.selectedSize.name &&
                    item.selectedSize.name == "sizeMan" &&
                    this.props.ithoobCookie !== -1)
                }
                pathname={this.props.pathname}
                dataCategorySlug={this.props.dataCategorySlug}
              />

              <CustomsContainer
                index={index}
                closeBtnIsShown={this.props.closeBtnIsShown}
                title={
                  this.props.ithoobCookie !== -1
                    ? item.title
                    : this.props.language
                      ? item.title_ar
                      : item.title_en
                }
                handleColorClick={this.handleColorClick}
                colors={
                  this.props.ithoobCookie !== -1
                    ? this.props.colors
                    : this.props.productDetails.colors
                }
                getEidtsIsLoading={
                  this.props.ithoobCookie !== -1
                    ? this.props.getEidtsIsLoading
                    : this.props.productDetailsIsLoading
                }
                selectedColorId={this.props.selectedColorId}
                customs={
                  this.props.ithoobCookie !== -1
                    ? this.props.customs
                    : this.props.productDetails.customs
                }
                handleImgClick={this.handleImgClick}
                defaultIds={
                  this.props.ithoobCookie !== -1
                    ? this.props.selectedIds
                    : this.props.selectedIds
                }
                realDefaults={this.props.defaultIds}
                closeCustoms={this.closeCustoms}
                id={item.productId}
                updateCustoms={this.updateCustoms}
              />
            </div>
          ) : <div className="cardContainer not-available-card" key={index}>
              <div className="overlay">
                <div className="not-available"> {getStringVal(this.props.language, "NOT_AVAILABLE_ITEM")}<a
                  href="#"
                  className="card-link"
                  onClick={e =>
                    this.deleteItem(
                      e,
                      item.productId,
                      index,
                      this.props.ithoobCookie !== -1
                        ? item.title
                        : this.props.language
                          ? item.title_ar
                          : item.title_en
                    )
                  }
                >
                  {getStringVal(this.props.language, "DELETE")}
                </a>
                </div>
              </div>
              <div className="productCard card d-flex flex-md-row flex-column">
                <div className="productImgContainer">
                  {/* tags */}
                  {item.tags ? (
                    <ul className="productTags">
                      {item.tags.discount ? (
                        item.tags.discount !== 0 ? (
                          <li
                            className={
                              this.props.language === true
                                ? "tagSpan discount"
                                : "tagSpan discount"
                            }
                          >
                            {item.tags.discount}-
                          </li>
                        ) : (
                            ""
                          )
                      ) : (
                          ""
                        )}
                      {item.tags.isRecommended ? (
                        <li className="tagSpan">
                          {getStringVal(this.props.language, "RECOMMENDED")}
                        </li>
                      ) : (
                          ""
                        )}
                      {item.tags.isBestSeller ? (
                        <li className="tagSpan">
                          {getStringVal(this.props.language, "BEST_SELLER")}
                        </li>
                      ) : (
                          ""
                        )}
                    </ul>
                  ) : item.discount ? (
                    <ul className="productTags">
                      <li
                        className={
                          this.props.language === true
                            ? "tagSpan discount"
                            : "tagSpan discount"
                        }
                      >
                        {`% ${item.discount}`}-
                    </li>
                    </ul>
                  ) : (
                        ""
                      )}

                  {/* productImg */}
                  <img
                    // className="card-img-top"
                    className="productImg"
                    src={
                      this.props.ithoobCookie !== -1
                        ? item.img
                        : item.img.img || item.img
                    }
                    alt={
                      this.props.ithoobCookie !== -1
                        ? item.title
                        : this.props.language
                          ? item.title_ar
                          : item.title_en
                    }
                  />
                </div>

                <div className="card-body d-flex row">
                  <div className="productSammery col-7">
                    {/* product title */}
                    {item.designed ||
                      item.fabrics ||
                      item.yaka ||
                      item.zarzour ||
                      item.akmam ||
                      item.others ||
                      item.attachments ||
                      item.notes ? (
                        <Link
                          href={
                            this.props.ithoobCookie !== -1
                              ? `/customizations/${item.productId}`
                              : `/customizations/${index}`
                          }
                          // href={`/customizations?itemid=${item.productId}`}
                          as={
                            this.props.ithoobCookie !== -1
                              ? `/customizations/${item.productId}`
                              : `/customizations/${index}`
                          }
                        >
                          <h5 className="card-title">
                            {this.props.ithoobCookie !== -1
                              ? item.title
                              : this.props.language
                                ? item.title_ar
                                : item.title_en}

                            {item.stockType == "fabric" ||
                              (item.selectedColorId && item.selectedColorId !== null) ||
                              (item.selectedIds && item.selectedIds.length > 0) ? (
                                <span>
                                  ({getStringVal(this.props.language, "RATE")})
                                </span>
                              ) : (
                                ""
                              )}

                            {item.designed ||
                              item.fabrics ||
                              item.yaka ||
                              item.zarzour ||
                              item.akmam ||
                              item.others ||
                              item.attachments ||
                              item.notes ? (
                                <span>
                                <br></br>
                                  ({getStringVal(this.props.language, "DRESS_DESIGNER")}
                            )
                                </span>
                              ) : (
                                ""
                              )}
                          </h5>
                        </Link>
                      ) : (
                        <Link
                          href={`/product-details?slug=${item.slug}`}
                          as={`/product-details/${item.slug}`}
                        >
                          <h5 className="card-title">
                            {this.props.ithoobCookie !== -1
                              ? item.title
                              : this.props.language
                                ? item.title_ar
                                : item.title_en}

                            {item.stockType == "fabric" ||
                              (item.selectedColorId && item.selectedColorId !== null) ||
                              (item.selectedIds && item.selectedIds.length > 0) ? (
                                <span>
                                  ({getStringVal(this.props.language, "RATE")})
                                </span>
                              ) : (
                                ""
                              )}

                            {item.designed ||
                              item.fabrics ||
                              item.yaka ||
                              item.zarzour ||
                              item.akmam ||
                              item.others ||
                              item.attachments ||
                              item.notes ? (
                                <span>
                                <br></br>
                                  ({getStringVal(this.props.language, "DRESS_DESIGNER")}
                            )
                                </span>
                              ) : (
                                ""
                              )}
                          </h5>
                        </Link>
                      )}

                    {/* size part */}
                    {this.props.ithoobCookie == -1 ? (
                      item.sizeType == "sizeable" ? (
                        <Link href="/addMeasurement" as="/add-measurement">
                          <button
                            className="button sizeBtn"
                            onClick={() => this.checkQuery()}
                          >
                            {getStringVal(this.props.language, "ADD_FILE_FORMAT")}
                          </button>
                        </Link>
                      ) : (
                          ""
                        )
                    ) : item.sizeType !== "accessories" ? (
                      item.sizeType == "shoes" ||
                        (item.shoesSize && item.shoesSize.length > 0) ? (
                          this.props.sizeStatus ? (
                            <div>
                              <input
                                onBlur={e =>
                                  this.updateSize(
                                    e,
                                    item.productId,
                                    index,
                                    item.sizeType
                                  )
                                }
                                className="form-control mb-2"
                                // className={
                                //   this.state.shoesSizeIsValid
                                //     ? "form-control mb-2 is-invalid"
                                //     : "form-control mb-2"
                                // }
                                type="number"
                                placeholder=""
                                min="30"
                                max="64"
                                defaultValue={
                                  this.props.ithoobCookie !== -1 &&
                                    item.selectedSize &&
                                    item.selectedSize.name
                                    ? item.selectedSize.name
                                    : item.shoesSize
                                }
                              />
                              {/* {this.state.shoesSizeIsValid ? (
                            ""
                          ) : (
                            <div className="invalid-feedback">
                              Please choose a username.
                            </div>
                          )} */}
                            </div>
                          ) : (
                              <div>
                                <input
                                  onBlur={e =>
                                    this.updateSize(
                                      e,
                                      item.productId,
                                      index,
                                      item.sizeType
                                    )
                                  }
                                  // className={
                                  //   this.state.shoesSizeIsValid
                                  //     ? "form-control mb-2"
                                  //     : "form-control mb-2 is-invalid"
                                  // }
                                  className="form-control mb-2"
                                  type="number"
                                  placeholder=""
                                  min="30"
                                  max="64"
                                  defaultValue={
                                    this.props.ithoobCookie !== -1 &&
                                      item.selectedSize &&
                                      item.selectedSize.name
                                      ? item.selectedSize.name
                                      : item.shoesSize
                                  }
                                  disabled={true}
                                />
                                {/* {this.state.shoesSizeIsValid ? (
                            ""
                          ) : (
                            <div className="invalid-feedback">
                              Please choose a username.
                            </div>
                          )} */}
                              </div>
                            )
                        ) : item.sizeManFlag !== true ? (
                          <p className="card-text">
                            {(item.selectedSize && item.selectedSize.name) ||
                              item.size ? (
                                item.selectedSize ? (
                                  <span className="sizeSelected">
                                    {item.selectedSize.name == "sizeMan" ? (
                                      <span>
                                        <span>
                                          {getStringVal(
                                            this.props.language,
                                            "SPECIAL_SIZE"
                                          )}
                                    :
                                  </span>
                                        <span>
                                          {getStringVal(
                                            this.props.language,
                                            "I_WANT_TO_TARZI"
                                          )}
                                        </span>
                                      </span>
                                    ) : item.selectedSize.name &&
                                      item.selectedSize.id ? (
                                          <span>
                                            <span>
                                              {getStringVal(
                                                this.props.language,
                                                "SPECIAL_SIZE"
                                              )}
                                    :
                                  </span>
                                            <span>{item.selectedSize.name}</span>
                                            <span className="productSize">
                                              

                                              {item.selectedSize.name == "s" ||
                                                item.selectedSize.name == "m" ||
                                                item.selectedSize.name == "l" ? (
                                                  ""
                                                ) : item.selectedSize.complete ? (
                                                  ""
                                                ) : (
                                                    <p className="incompleteSizeLabel">
                                                      {getStringVal(
                                                        this.props.language,
                                                        "THIS_FILE_IS_INCOMPLETE_MUST_COMPLETE_THE_FILE_BEFORE_PURCHASE"
                                                      )}
                                                    </p>
                                                  )}
                                            </span>
                                          </span>
                                        ) : (
                                          <span>
                                            <span>
                                              {getStringVal(this.props.language, "SIZE")}:
                                  </span>
                                            <span className="productSize">
                                              {item.selectedSize.name}

                                              {item.selectedSize.name == "s" ||
                                                item.selectedSize.name == "m" ||
                                                item.selectedSize.name == "l" ? (
                                                  ""
                                                ) : item.selectedSize.complete ? (
                                                  ""
                                                ) : (
                                                    <p className="incompleteSizeLabel">
                                                      {getStringVal(
                                                        this.props.language,
                                                        "THIS_FILE_IS_INCOMPLETE_MUST_COMPLETE_THE_FILE_BEFORE_PURCHASE"
                                                      )}
                                                    </p>
                                                  )}
                                            </span>
                                          </span>
                                        )}
                                  </span>
                                ) : item.size == "m" ||
                                  item.size == "s" ||
                                  item.size == "l" ? (
                                      <span className="sizeSelected">
                                        {getStringVal(this.props.language, "SIZE")}:
                                        <span>
                                          {item.size == "m"
                                            ? getStringVal(this.props.language, "MEDUIM")
                                            : ""}
                                        </span>
                                        <span>
                                          {item.size == "s"
                                            ? getStringVal(this.props.language, "SMALL")
                                            : ""}
                                        </span>
                                        <span>
                                          {item.size == "l"
                                            ? getStringVal(this.props.language, "LARGE")
                                            : ""}
                                        </span>
                                      </span>
                                    ) : (
                                      <span className="sizeSelected">
                                        {getStringVal(this.props.language, "SPECIAL_SIZE")}:
                                        {this.props.measurementsitems.items &&
                                          this.props.measurementsitems.items.length > 0 ? (
                                            <span>
                                              {
                                                this.props.measurementsitems.items.filter(
                                                  sizeItem =>
                                                    parseFloat(sizeItem.id) == item.size
                                                )[0].title
                                              }
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                      </span>
                                    )
                              ) : (
                                <span className="noSizeselected">
                                  {getStringVal(
                                    this.props.language,
                                    "DO_NOT_CHOOSE_SIZE"
                                  )}{" "}
                                  <a
                                    href="#"
                                    onClick={e =>
                                      this.chooseSize(
                                        e,
                                        item.productId,
                                        item.selectedSize,
                                        item.sizeManFlag
                                      )
                                    }
                                  >
                                    {getStringVal(this.props.language, "CHOOSE_SIZE")}
                                  </a>
                                </span>
                              )}
                          </p>
                        ) : (
                            ""
                          )
                    ) : (
                          ""
                        )}

                    {item.sizeManFlag == true && this.props.ithoobCookie !== -1 ? (
                      <p className="card-text">
                        <span className="sizeSelected">
                          {getStringVal(this.props.language, "I_WANT_TO_TARZI")}
                        </span>
                      </p>
                    ) : (
                        ""
                      )}

                    {/* edit product part     */}
                    <ul className="editProduct">
                      <li>
                        {item.designed ||
                          item.fabrics ||
                          item.yaka ||
                          item.zarzour ||
                          item.akmam ||
                          item.others ||
                          item.attachments ||
                          item.notes ? (
                            <Link
                              href={
                                this.props.ithoobCookie !== -1
                                  ? `/customizations/${item.productId}`
                                  : `/customizations/${index}`
                              }
                            >
                              <a className="card-link modify">
                                {getStringVal(this.props.language, "MODIFY")}
                              </a>
                            </Link>
                          ) : item.sizeType == "sizeable" &&
                            item.stockType == "fabric" &&
                            item.hasCustomizationOptions == true ? (
                              <a
                                href="#"
                                className="card-link modify"
                                onClick={e =>
                                  this.editItem(e, item.productId, item.slug, index)
                                }
                              >
                                {getStringVal(this.props.language, "MODIFY")}{" "}
                              </a>
                            ) : (
                              ""
                            )}
                      </li>

                      {/* {item.sizeType == "sizeable" ? ( */}
                      {item.sizeType == "sizeable" &&
                        ((item.selectedSize && item.selectedSize.name) ||
                          (item.size && item.size !== null && item.size.length > 0) ||
                          item.sizeManFlag) ? (
                          <li>
                            <a
                              href="#"
                              className="card-link change-measurement"
                              onClick={e =>
                                this.chooseSize(
                                  e,
                                  item.productId,
                                  item.selectedSize,
                                  item.sizeManFlag
                                )
                              }
                            >
                              {getStringVal(this.props.language, "CHANGING_THE_SIZE")}
                            </a>
                          </li>
                        ) : (
                          ""
                        )}

                      <li>
                        <a
                          href="#"
                          className="card-link"
                          onClick={e =>
                            this.deleteItem(
                              e,
                              item.productId,
                              index,
                              this.props.ithoobCookie !== -1
                                ? item.title
                                : this.props.language
                                  ? item.title_ar
                                  : item.title_en
                            )
                          }
                        >
                          {getStringVal(this.props.language, "DELETE")}
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* priceAndquantity */}
                  <div className="priceAndquantity col-4">
                    <p className="totalPrice">
                      {this.props.ithoobCookie !== -1 ? (
                        item.price_discount ? (
                          <span>{item.price_discount * item.quantity}</span>
                        ) : (
                            <span>
                              {/* testt */}
                              {item.price * item.quantity}
                            </span>
                          )
                      ) : item.discount && item.discount !== 0 ? (
                        <span>
                          {/* testtt */}
                          {/* {parseFloat(item.price) -
                          (parseFloat(item.price) *
                            parseFloat(item.quantity) *
                            parseFloat(item.discount)) /
                            100} */}
                          {item.price_discount * item.quantity}
                        </span>
                      ) : (
                            <span>
                              {/* testttt */}
                              {item.price * item.quantity}
                            </span>
                          )}

                      {getStringVal(this.props.language, "SR")}
                    </p>

                    <p className="price">
                      {item.price_discount
                        ? getStringVal(this.props.language, "AFTER_DISCOUNT_APIECE")
                        : getStringVal(this.props.language, "ONE_PIECE")}
                      <span>
                        {item.price_discount ? item.price_discount : item.price}
                      </span>
                      {getStringVal(this.props.language, "SR")}
                    </p>

                    <QuantitySection
                      quantity={item.quantity}
                      handlePlusClick={() =>
                        this.handlePlusClick(item.productId, item.quantity, index)
                      }
                      handleMinusClick={() =>
                        this.handleMinusClick(item.productId, item.quantity, index)
                      }
                    />
                  </div>
                </div>
              </div>

              <EditSize
                id={item.productId}
                key={item.productId}
                title={
                  this.props.ithoobCookie !== -1
                    ? item.title
                    : this.props.language
                      ? item.title_ar
                      : item.title_en
                }
                sizeType={item.sizeType}
                measurementsTable={item.measurementsTable}
                currentItemSize={
                  item.selectedSize &&
                    item.selectedSize.name &&
                    item.selectedSize.name != "m" &&
                    item.selectedSize.name != "s" &&
                    item.selectedSize.name != "l" &&
                    this.props.ithoobCookie !== -1
                    ? item.selectedSize.name
                    : this.props.ithoobCookie !== -1 &&
                      this.props.measurementsitems.items &&
                      this.props.measurementsitems.items.length > 0
                      ? this.props.measurementsitems.items.map(item =>
                        item.default === true ? item.title : ""
                      ).title
                      : ""
                }
                sizeManStatus={
                  (this.props.ithoobCookie !== -1 && item.sizeManFlag) ||
                  (item.selectedSize &&
                    item.selectedSize.name &&
                    item.selectedSize.name == "sizeMan" &&
                    this.props.ithoobCookie !== -1)
                }
                pathname={this.props.pathname}
                dataCategorySlug={this.props.dataCategorySlug}
              />

              <CustomsContainer
                index={index}
                closeBtnIsShown={this.props.closeBtnIsShown}
                title={
                  this.props.ithoobCookie !== -1
                    ? item.title
                    : this.props.language
                      ? item.title_ar
                      : item.title_en
                }
                handleColorClick={this.handleColorClick}
                colors={
                  this.props.ithoobCookie !== -1
                    ? this.props.colors
                    : this.props.productDetails.colors
                }
                getEidtsIsLoading={
                  this.props.ithoobCookie !== -1
                    ? this.props.getEidtsIsLoading
                    : this.props.productDetailsIsLoading
                }
                selectedColorId={this.props.selectedColorId}
                customs={
                  this.props.ithoobCookie !== -1
                    ? this.props.customs
                    : this.props.productDetails.customs
                }
                handleImgClick={this.handleImgClick}
                defaultIds={
                  this.props.ithoobCookie !== -1
                    ? this.props.selectedIds
                    : this.props.selectedIds
                }
                realDefaults={this.props.defaultIds}
                closeCustoms={this.closeCustoms}
                id={item.productId}
                updateCustoms={this.updateCustoms}
              />
            </div>

          )
        ) : !this.props.isLoading &&
          this.props.items &&
          this.props.items.length == 0 ? (
            <div className="alert alert-info text-center" role="alert">
              {getStringVal(
                this.props.language,
                "THERE_ARE_NO_PRODUCTS_IN_THE_SHOPPING_CART"
              )}
            </div>
          ) : (
            ""
          );
  }
}

const mapMyCartStateToProps = state => ({
  language: state.generalReducer.language,
  ithoobUser: state.loginReducer.ithoobUser,
  ithoobCookie: state.loginReducer.ithoobCookie,
  status: state.myCart.status,
  message: state.myCart.message,
  orderSummary: state.myCart.orderSummary,
  items: state.myCart.items,
  partnerTable: state.myCart.partnerTable,
  colors: state.myCart.colors,
  customs: state.myCart.customs,
  getEidtsIsLoading: state.myCart.getEidtsIsLoading,
  selectedIds: state.myCart.selectedIds,
  selectedColorId: state.myCart.selectedColorId,
  quantityStatus: state.myCart.quantityStatus,
  sizeStatus: state.myCart.sizeStatus,
  updateCustomsStatus: state.myCart.updateCustomsStatus,
  productDetails: state.productDetails.productDetails,
  productDetailsIsLoading: state.productDetails.isLoading,
  defaultIds: state.productDetails.defaultIds,
  measurementsitems: state.customsReducer.measurementsitems,
  closeBtnIsShown: state.myCart.closeBtnIsShown,
  allSizesComplete: state.myCart.allSizesComplete,
  isLoading: state.myCart.isLoading
});

const mapMyCartDispatchToProps = dispatch => ({
  updateQuantity: (language, authorization, productId, quantity) => {
    dispatch(updateQuantity(language, authorization, productId, quantity));
  },
  getCartItems: (lang, authToken) => {
    dispatch(getCartItems(lang, authToken));
  },
  getEdits: (language, authorization, productId) => {
    dispatch(getEdits(language, authorization, productId));
  },
  updateSelectedColorId: id => {
    dispatch(updateSelectedColorId(id));
  },
  updateSelectedId: payload => {
    dispatch(updateSelectedId(payload));
  },
  updateCustoms: (
    language,
    authorization,
    productId,
    selectedIds,
    selectedColorId
  ) => {
    dispatch(
      updateCustoms(
        language,
        authorization,
        productId,
        selectedIds,
        selectedColorId
      )
    );
  },
  updateSize: (language, authorization, productId, sizeManFlag, size, quantity_id, stockUpdate) => {
    dispatch(updateSize(language, authorization, productId, sizeManFlag, size, quantity_id, stockUpdate));
  },
  getCartItemsFromLocalStorage: () => {
    dispatch(getCartItemsFromLocalStorage());
  },
  deleteItemFromLocalStorage: index => {
    dispatch(deleteItemFromLocalStorage(index));
  },
  updateQuantityFromLocalStorage: (index, newQuantity) => {
    dispatch(updateQuantityFromLocalStorage(index, newQuantity));
  },
  getProductDetails: (language, slug) => {
    dispatch(getProductDetails(language, slug));
  },
  getDefaultIds: arrayOfIds => {
    dispatch(getDefaultIds(arrayOfIds));
  },
  getDefaultIdsFromLocalStorage: index => {
    dispatch(getDefaultIdsFromLocalStorage(index));
  },
  updateItemsInLocalStorage: (index, selectedColorId, selectedIds) => {
    dispatch(updateItemsInLocalStorage(index, selectedColorId, selectedIds));
  },
  updateCustomsStatusAction: payload => {
    dispatch(updateCustomsStatusAction(payload));
  },
  updateSizeFromLocalStorage: (index, newSize) => {
    dispatch(updateSizeFromLocalStorage(index, newSize));
  },
  updateDeletedItemId: id => {
    dispatch(updateDeletedItemId(id));
  },
  updateDeletedItemIndex: index => {
    dispatch(updateDeletedItemIndex(index));
  },
  updateDeletedItemTitle: title => {
    dispatch(updateDeletedItemTitle(title));
  },
  updateSizeStatus: status => {
    dispatch(updateSizeStatus(status));
  },
  deleteCartItemsFromLocalStorage: () => {
    dispatch(deleteCartItemsFromLocalStorage());
  },
  storeSizeID: sizeId => {
    dispatch(storeSizeID(sizeId));
  },
  updateErrMsgStatus: status => {
    dispatch(updateErrMsgStatus(status));
  },
  updateMeasurementsIsComplateStatus: status => {
    dispatch(updateMeasurementsIsComplateStatus(status));
  },
  userMeasureId: measureId => {
    dispatch(userMeasureId(measureId));
  },
  getPartnerDiscountFromLocalStorage: () => {
    dispatch(getPartnerDiscountFromLocalStorage());
  },
  updateMeasurementErrMsg: msg => {
    dispatch(updateMeasurementErrMsg(msg));
  },
  updateSizeMan: status => {
    dispatch(updateSizeMan(status));
  },
  updateFromProductDetails: (status, query, fromMyCartStatus) => {
    dispatch(updateFromProductDetails(status, query, fromMyCartStatus));
  }
});

export default connect(
  mapMyCartStateToProps,
  mapMyCartDispatchToProps
)(CartCard);
