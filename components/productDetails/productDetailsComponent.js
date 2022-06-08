import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
// components
import ProductImages from "./productImages";
import SizeSection from "../includes/measurementPart";
import QuantitySection from "../includes/quantityPart";
import Policies from "../productDetails/policies";
import Colors from "./colors";
import Costums from "./costums";
import { getStringVal } from "../../scripts/multiLang";
import AddtoCart from "./addToCart";

//actions
import {
  updateQuantity,
  getDefaultIds,
  addSelectedIds,
  updateMaxQuantity,
  updateColor,
} from "../../actions/productDetails/productDetails";
import { initialProductList } from "../../actions/productList/productList";
import Stock from "./stock";
import { storeQuantityID } from "../../actions/includes/carouselActions";
class ProductDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { url: "" };
    this.openShareScreen = this.openShareScreen.bind(this);
  }

  componentDidMount() {
    // this.props.initialProductList();
    const { productDetails } = this.props;

    this.defaultIds =
      productDetails &&
      productDetails.customs &&
      productDetails.customs.length > 0
        ? productDetails.customs.map(
            (custom) => custom.images.find((img) => img.default == true).id
          )
        : "";

    this.maxQuantity =
      productDetails &&
      productDetails.colors &&
      productDetails.colors.length > 0
        ? productDetails.colors
            .map((color) => (color.Default ? color.maxQuantity : ""))
            .join("")
        : "";

    this.props.getDefaultIds(this.defaultIds);
    this.props.updateMaxQuantity(this.maxQuantity);
    // require("../../node_modules/lazysizes/lazysizes");
    require("bootstrap/js/dist/dropdown");
    require("magnify/dist/js/jquery.magnify");
    this.setState({ url: window.location.href });

    // Select default color
    if (productDetails.colors && productDetails.colors.length > 0) {
      this.props.updateColor(
        productDetails.colors.filter((color) => color.default === true).length >
          0
          ? productDetails.colors.filter((color) => color.default === true)[0]
              .id
          : productDetails.colors[0].id
      );
    }
  }

  componentDidUpdate() {
    if(document.documentElement.clientWidth > 600){
      $("#productMainImg").magnify();
    }
  }

  openShareScreen(e) {
    e.preventDefault();
    window.open(
      $(e.currentTarget).attr("href"),
      "test",
      "height=450, width=550, top=" +
        ($(window).height() / 2 - 275) +
        ", left=" +
        ($(window).width() / 2 - 225) +
        ", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0"
    );
  }

  handleColorClick = (id) => {
    let selectedColor = this.props.productDetails.colors.filter(
      (color) => color.id == id
    );
    let img = selectedColor[0].productImg;
    let largeImg = selectedColor[0].productLargeImg;

    // When click on different color, the photo changes + magnifier image
    document.querySelector("#productMainImg").src = img;
    document
      .querySelector("#productMainImg")
      .setAttribute("data-magnify-src", largeImg);
    [
      ...document.querySelectorAll(".productImages__thumbs")[0].childNodes,
    ].forEach((child) => child.classList.remove("active"));
    document
      .querySelectorAll(".productImages__thumbs")[0]
      .childNodes[0].classList.add("active");
    if(document.documentElement.clientWidth > 600){

     $("#productMainImg").magnify();
    }
    let maxQuantity = selectedColor[0].maxQuantity;
    this.props.updateMaxQuantity(maxQuantity);

    this.props.updateColor(selectedColor[0].id);
  };

  handlePlusClick = () => {
    let oldQuantity = this.props.quantity;
    let newQuantity = oldQuantity + 1;
    this.props.updateQuantity(newQuantity);
  };
  handleMinusClick = () => {
    let oldQuantity = this.props.quantity;
    let newQuantity = oldQuantity - 1;
    if (this.props.quantity > 1) {
      this.props.updateQuantity(newQuantity);
    }
  };

  handleImgClick = (e, imgId) => {
    let clickedCustomIdsArray = this.props.productDetails.customs
      .find((custom) => custom.images.find((img) => img.id == imgId))
      .images.map((img) => img.id);

    let otherCustoms = [...clickedCustomIdsArray];
    otherCustoms.splice(otherCustoms.indexOf(imgId), 1);

    let deletedArray = [];
    this.props.defaultIds.forEach((defaultId) =>
      clickedCustomIdsArray.forEach((customId) =>
        defaultId === customId ? deletedArray.push(defaultId) : ""
      )
    );

    let deletedId = deletedArray.join("");

    let filteredDefaultIds = [
      ...this.props.defaultIds.filter((id) => !(id == deletedId)),
      imgId,
    ];

    this.props.getDefaultIds(filteredDefaultIds);
    this.props.addSelectedIds(imgId, otherCustoms);
  };

  // componentWillUnmount() {
  //   console.log("initialProductList1");
  //   this.props.initialProductList();
  // }

  render() {
    return this.props.productDetails && this.props.status ? (
      <div className="row">
        {/* If a product was "fabric", keep the height auto - Otherwise, restrict height to 200px */}
        <div
          className={
            this.props.productDetails.stockType == "fabric"
              ? "col-12 col-md-3 fabric-main-img"
              : "col-12 col-md-3"
          }
        >
          <div className="positionRelative">
            {this.props.productDetails.tags ? (
              <ul className="productTags">
                {this.props.productDetails.tags.discount !== 0 ? (
                  <li
                    className={
                      this.props.language === true
                        ? "tagSpan discount"
                        : "tagSpan discount"
                    }
                  >
                    {this.props.productDetails.tags.discount}%
                  </li>
                ) : (
                  ""
                )}
                {this.props.productDetails.tags.isRecommended ? (
                  <li className="tagSpan recommended">
                    {getStringVal(this.props.language, "RECOMMENDED")}
                  </li>
                ) : (
                  ""
                )}
                {this.props.productDetails.tags.isBestSeller ? (
                  <li className="tagSpan">
                    {getStringVal(this.props.language, "BEST_SELLER")}
                  </li>
                ) : (
                  ""
                )}
              </ul>
            ) : (
              ""
            )}
            <div className="productShare">
              <div className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  id="shareDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="icon-compass" />
                </a>
                <div className="dropdown-menu" aria-labelledby="shareDropdown">
                  <a
                    className="dropdown-item"
                    onClick={(e) => this.openShareScreen(e)}
                    href={
                      "https://twitter.com/intent/tweet?text=" +
                      this.props.productDetails.title +
                      this.state.url
                    }
                  >
                    <i className="icon-Twitter" />
                  </a>
                  {/* <a
                    className="dropdown-item"
                    onClick={e => this.openShareScreen(e)}
                    href={"https://plus.google.com/share?url=" + this.state.url}
                  >
                    <i className="icon-google-plus" />
                  </a>
                   */}
                  <a
                    className="dropdown-item"
                    onClick={(e) => this.openShareScreen(e)}
                    href={
                      "https://www.facebook.com/share.php?u=" +
                      this.state.url +
                      "&title=" +
                      this.props.productDetails.title
                    }
                  >
                    <i className="icon-Facebook" />
                  </a>
                </div>
              </div>
            </div>

            <ProductImages
              productImages={this.props.productDetails.images}
              productTitle={this.props.productDetails.title}
            />
          </div>
          {this.props.productDetails.stock > 0 ? (
            <AddtoCart />
          ) : this.props.productDetails.stock == null ? ( // Handle "Fabric", which doesn't have a stock
            <AddtoCart />
          ) : (
            <p className="message-danger">
              {getStringVal(this.props.language, "THIS_PRODUCT_IS_SOLD_OUT")}
            </p>
          )}
        </div>

        <div className="col-12 col-md-8">
          <div className="productTitle d-flex justify-content-between align-items-start mt-3">
            <div className="title" style={{flex:'2'}}>
              <h3>{this.props.productDetails.title}</h3>
              <p>{this.props.productDetails.subTitle}</p>
            </div>
            <div
              style={{flex:'4'}}
              style={{
                display: "flex",
                "align-items": "flex-end",
                "flex-direction": "column",
              }}
            >
              {this.props.productDetails.price_discount > 0 ? (
                <div className="price d-flex justify-content-between align-items-center">
                  <p
                    className={
                      this.props.language === true
                        ? "priceBeforeDiscount"
                        : "priceBeforeDiscount"
                    }
                  >
                    {this.props.productDetails.price}
                    <span>
                      {/* {getStringVal(this.props.language, "SR")} */}
                    </span>
                  </p>

                  <p>
                    {this.props.productDetails.price_discount}
                    <span>{getStringVal(this.props.language, "SR")}</span>
                  </p>
                </div>
              ) : (
                <div className="price d-flex justify-content-between align-items-center">
                  <p>
                    {this.props.productDetails.price}
                    <span>{getStringVal(this.props.language, "SR")}</span>
                  </p>
                </div>
              )}
              <br />
              {/* <div id="tabbyPromo" className="d-flex">
                <p style={{flex: 4}}>
                  أو اختار الدفع على 4 دفعات شهرية متساوية
                  <a
                    href="https://checkout.tabby.ai/promos/product-page/installments/ar/"
                    target="blank"
                  >
                    للمذيد
                  </a>
                  ` `
                </p>
                <p style={{flex: 1}}>
                  <img src={require("../../images/tabby.png")} style={{width: '80px'}}/>
                </p>
              </div> */}
            </div>
          </div>
          <div className="orderDetails form">
            <Stock
              stock={this.props.productDetails.options_stock}
              quantity_id={this.props.quantityId}
              selectStock={(value) => this.props.storeQuantityID(value.quantity_id)}
            />
            {this.props.quantity && this.props.quantity > 0 ? (
              <QuantitySection
                title={this.props.productDetails.title}
                quantity={this.props.quantity}
                handlePlusClick={this.handlePlusClick}
                handleMinusClick={this.handleMinusClick}
                stock={this.props.productDetails.stock}
                productId={this.props.productDetails.productId}
              />
            ) : (
              ""
            )}

            {this.props.productDetails.colors &&
            this.props.productDetails.colors.length > 0 ? (
              <Colors
                closeBtnIsShown={this.props.closeBtnIsShown}
                handleColorClick={this.handleColorClick}
                colors={this.props.productDetails.colors}
                getEidtsIsLoading={this.props.isLoading}
                selectedColorId={this.props.SelectedColorId}
              />
            ) : (
              ""
            )}
            {this.props.sizeType !== "accessories" &&
            this.props.productDetails.stockType &&
            this.props.productDetails.stockType != "product" &&
            this.props.measurementsTable ? (
              <SizeSection
                pathname={this.props.pathname}
                dataCategorySlug={this.props.dataCategorySlug}
                sizeType={this.props.sizeType}
                measurementsTable={this.props.measurementsTable}
              />
            ) : (
              ""
            )}

            {this.props.productDetails.customs.length > 0 ? (
              <Costums
                closeBtnIsShown={this.props.closeBtnIsShown}
                customs={this.props.productDetails.customs}
                handleImgClick={this.handleImgClick}
                defaultIds={this.props.defaultIds}
              />
            ) : (
              ""
            )}

            <Policies />
          </div>
        </div>
      </div>
    ) : (
      <div className="alert alert-info error">{this.props.message}</div>
    );
  }
}
const mapProductDetailsStateToProps = (state) => ({
  language: state.generalReducer.language,
  status: state.productDetails.status,
  message: state.productDetails.message,
  isLoading: state.productDetails.isLoading,
  productDetails: state.productDetails.productDetails,

  quantity: state.productDetails.quantity,
  SelectedIds: state.productDetails.SelectedIds,
  SelectedColorId: state.productDetails.SelectedColorId,

  defaultIds: state.productDetails.defaultIds,
  maxQuantity: state.productDetails.maxQuantity,
  sizeType: state.productDetails.productDetails.sizeType,
  measurementsTable: state.productDetails.productDetails.measurementsTable,
  closeBtnIsShown: state.myCart.closeBtnIsShown,
  quantityId: state.carouselReducer.present.quantityId
});

const mapProductDetailsDispatchToProps = (dispatch) => ({
  // updateSizeManState: () => {
  //   dispatch(updateSizeManState());
  // },
  // updateSizeIdState: id => {
  //   dispatch(updateSizeIdState(id));
  // },
  storeQuantityID(quantityId) {
    dispatch(storeQuantityID(quantityId));
  },
  updateQuantity: (newQuantity) => {
    dispatch(updateQuantity(newQuantity));
  },
  updateColor: (colorId) => {
    dispatch(updateColor(colorId));
  },
  getDefaultIds: (arrayOfIds) => {
    dispatch(getDefaultIds(arrayOfIds));
  },
  addSelectedIds: (id, others) => {
    dispatch(addSelectedIds(id, others));
  },
  updateMaxQuantity: (maxQuantity) => {
    dispatch(updateMaxQuantity(maxQuantity));
  },
  initialProductList: () => {
    dispatch(initialProductList());
  },
});

export default connect(
  mapProductDetailsStateToProps,
  mapProductDetailsDispatchToProps
)(ProductDetailsComponent);
