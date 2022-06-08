import React, { Component } from "react";
import { connect } from "react-redux";
import { getStringVal } from "../../scripts/multiLang";
import { addToCart } from "../../actions/productDetails/addToCart";
import { updateShoesSizeStatus } from "../../actions/productDetails/productDetails";
class MoreProducts extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {}

  addToCart(e) {
    e.preventDefault();
    let hasCustomizationOptions =true;
    if(this.props.productdetails.customs.length == 0 && this.props.productdetails.colors.length == 0){
      hasCustomizationOptions =false;
    }
    if (this.props.sizeType == "shoes" && this.props.shoesSize.length > 0) {
      if (
        parseInt(this.props.shoesSize) >= 41 &&
        parseInt(this.props.shoesSize) <= 45
      ) {
        this.props.addToCart(
          this.props.language === "false" ? 1 : 2,
          this.props.slug,
          this.props.title_ar,
          this.props.title_en,
          this.props.img,
          this.props.productId,
          this.props.price,
          this.props.price_discount,
          this.props.discount,
          this.props.selectedColorId,
          this.props.selectedIds,
          this.props.quantity,
          this.props.sizeManFlag,
          this.props.size,
          this.props.shoesSize,
          this.props.sizeType,
          this.props.defaultIds,
          this.props.stockType,
          hasCustomizationOptions,
          this.props.quantityId,
          this.props.options_stock,
          this.props.stock
        );
      } else {
        this.props.updateShoesSizeStatus(false);
      }
    } else {
      var imgElem =  document.getElementById("productMainImg");
      var imgSrc= $(imgElem).attr("src");
      var imgthumbSrc=$(imgElem).attr("data-thumb");
      var imgMagnifySrc=$(imgElem).attr("data-magnify-src");
      var imgObj={
        img: imgSrc,
        thumbImg: imgthumbSrc,
        largeImg: imgMagnifySrc
      }
      this.props.addToCart(
        this.props.language === "false" ? 1 : 2,
        this.props.slug,
        this.props.title_ar,
        this.props.title_en,
        imgObj,
        this.props.productId,
        this.props.price,
        this.props.price_discount,
        this.props.discount,
        this.props.selectedColorId,
        this.props.selectedIds,
        this.props.quantity,
        this.props.sizeManFlag,
        this.props.size,
        this.props.shoesSize,
        this.props.sizeType,
        this.props.defaultIds,
        this.props.stockType,
        hasCustomizationOptions,
        this.props.quantityId,
        this.props.options_stock,
        this.props.stock
      );
    }

    // Cart Notification
    let addedToCartModal = document.querySelector('#cartNotification');
    if(addedToCartModal) {
      addedToCartModal.classList.add('active');
  
      setTimeout(() => {
        addedToCartModal.classList.remove('active');
      }, 2000)
    }
  }
  render() {
    return (
      <div className="productDetails__cart">
        <a href="#" onClick={e => this.addToCart(e)} className="button">
          {/* Add To Cart */}
          <span className="icon-shopping-cart1"></span>
          {getStringVal(this.props.language, "ADD_TO_CART")}
        </a>
      </div>
    );
  }
}

const mapCartStateToProps = state => ({
  language: state.generalReducer.language,
  productId: state.productDetails.productDetails.productId,
  title_ar: state.productDetails.productDetails.title_ar,
  slug: state.productDetails.productDetails.slug,
  title_en: state.productDetails.productDetails.title_en,
  // img: state.productDetails.SelectedColorId ? state.productDetails.productDetails.colors.find((item)=>item.id == state.productDetails.SelectedColorId) : state.productDetails.productDetails.images[0],
  img:
    state.productDetails.productDetails &&
    state.productDetails.productDetails.images
      ? state.productDetails.productDetails.images[0]
      : "",
  price: state.productDetails.productDetails.price,

  discount:
    state.productDetails.productDetails &&
    state.productDetails.productDetails.tags &&
    state.productDetails.productDetails.tags.discount
      ? state.productDetails.productDetails.tags.discount
      : "",

  selectedColorId: state.productDetails.SelectedColorId,
  selectedIds: state.productDetails.SelectedIds,
  quantity: state.productDetails.quantity,
  sizeManFlag: state.carouselReducer.present.sizeManStatus,
  size:
    state.carouselReducer.present.sizeId == ""
      ? parseInt(state.carouselReducer.present.measurementId)
      : state.carouselReducer.present.sizeId,
  shoesSize: state.carouselReducer.present.shoesSize,
  sizeType: state.productDetails.productDetails.sizeType,
  stockType:state.productDetails.productDetails.stockType,
  hasCustomizationOptions:state.productDetails.productDetails.hasCustomizationOptions,
  price_discount: state.productDetails.productDetails.price_discount,
  defaultIds: state.productDetails.defaultIds,
  productdetails:state.productDetails.productDetails,
  quantityId: state.carouselReducer.present.quantityId,
  options_stock: state.productDetails.productDetails.options_stock,
  stock: state.productDetails.productDetails.stock
});
//
const mapCartDispatchToProps = dispatch => ({
  addToCart: (
    language,
    slug,
    title,
    title_en,
    img,
    productId,
    price,
    price_discount,
    discount,
    selectedColorId,
    selectedIds,
    quantity,
    sizeManFlag,
    size,
    shoesSize,
    sizeType,
    defaultIds,
    stockType,
    hasCustomizationOptions,
    quantityId,
    options_stock,
    stock
  ) => {
    dispatch(
      addToCart(
        language,
        slug,
        title,
        title_en,
        img,
        productId,
        price,
        price_discount,
        discount,
        selectedColorId,
        selectedIds,
        quantity,
        sizeManFlag,
        size,
        shoesSize,
        sizeType,
        defaultIds,
        stockType,
        hasCustomizationOptions,
        quantityId,
        options_stock,
        stock
      )
    );
  },
  updateShoesSizeStatus: status => {
    dispatch(updateShoesSizeStatus(status));
  }
});

export default connect(
  mapCartStateToProps,
  mapCartDispatchToProps
)(MoreProducts);
