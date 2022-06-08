import React, { Component } from "react";
import { connect } from "react-redux";
// import "bootstrap/js/dist/dropdown";
class Images extends Component {
  constructor(props) {
    super(props);
    this.state = { productMainImg: "" };
  }
  componentDidMount() {
    require("magnify/dist/js/jquery.magnify");
    if(document.documentElement.clientWidth > 600){
    
      let productMagnify = $("#productMainImg").magnify();
      const _this = this;
      this.setState({
        productMainImg: productMagnify
      });
    }
    [...document.querySelectorAll(".productImages__thumbs a")].forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault();

        document.querySelector(".productImages").classList.add("isLoading");

        let proImg = new Image();
        let oldSrc = document.querySelector("#productMainImg").src;
        let ordSrcLarge = document
          .querySelector("#productMainImg")
          .getAttribute("data-magnify-src");
        let ordSrcThumb = document
          .querySelector("#productMainImg")
          .getAttribute("data-thumb");
        proImg.src = item.childNodes[0].dataset.img;
        proImg.onload = function() {
          document
            .querySelector(".productImages")
            .classList.remove("isLoading");
          document.querySelector("#productMainImg").src =
            item.childNodes[0].dataset.img;

          document
            .querySelector("#productMainImg")
            .setAttribute(
              "data-magnify-src",
              item.childNodes[0].dataset.img_large
            );

          document
            .querySelector("#productMainImg")
            .setAttribute("data-thumb", item.childNodes[0].src);

          [...item.parentElement.childNodes].forEach(child =>
            child.classList.remove("active")
          );

          item.classList.add("active");
          if(document.documentElement.clientWidth > 600){

            _this.state.productMainImg.destroy();

            let productMagnify = $("#productMainImg").magnify();

            _this.setState({
              productMainImg: productMagnify
            });
          }
        };
      });
    });
  }
  render() {
    return (
      <div className="productImages">
        <div className="productImages__main">
          <img
            id="productMainImg"
            src={this.props.currentSectionImage}
            data-thumb={this.props.currentSectionImage}
            data-magnify-src={this.props.currentSectionImage}
            alt={this.props.productTitle}
            width="100%"
            height="100%"
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  productDetails: state.productDetails.productDetails,
  sizeType:
    state.productDetails.productDetails.sizeType ||
    state.customsReducer.sizeType,
  stockType:
    state.productDetails.productDetails.stockType ||
    state.customsReducer.stockType,
    currentSectionImage: state.customsReducer.currentSectionImage

});
export default connect(
  mapStateToProps,
  null
)(Images);
