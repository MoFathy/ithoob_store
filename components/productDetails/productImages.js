import React, { Component } from "react";
import { connect } from "react-redux";
// import "bootstrap/js/dist/dropdown";
class ProductImagesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { productMainImg: "" };
  }
  componentDidMount() {
    console.log('====================================');
    console.log(document.documentElement.clientWidth,document.documentElement.clientWidth > 600);
    console.log('====================================');
    // if window is bigger than 600px 
    const _this = this;
    
    if(document.documentElement.clientWidth > 600){
      require("magnify/dist/js/jquery.magnify");
      let productMagnify = $("#productMainImg").magnify();
      _this.setState({
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
            src={this.props.productImages[0].img}
            data-thumb={this.props.productImages[0].thumbImg}
            data-magnify-src={this.props.productImages[0].largeImg}
            alt={this.props.productTitle}
          />
{/* 
          {this.props.sizeType == "sizeable" &&
          this.props.stockType == "fabric" ? (
            <img
              id="productMainImg"
              src={this.props.productImages[0].img}
              data-thumb={this.props.productImages[0].thumbImg}
              data-magnify-src={this.props.productImages[0].largeImg}
              alt={this.props.productTitle}
            />
          ) : (
            <img
              src={this.props.productImages[0].img}
              alt={this.props.productTitle}
            />
          )} */}
        </div>

        {this.props.sizeType == "sizeable" &&
        this.props.stockType == "fabric" ? (
          <div className="productImages__thumbs">
            {this.props.productImages.map((item, index) =>
              item.img == null ? (
                ""
              ) : index !== 0 ? (
                <a href="#" data-img={index} key={index}>
                  <img
                    className={"thumb" + index}
                    src={item.thumbImg}
                    data-img={item.img}
                    data-img_large={item.largeImg}
                    alt={this.props.productTitle}
                  />
                </a>
              ) : item.thumbImg == "" ? (
                ""
              ) : (
                <a className="active" data-img={index} href="#" key={index}>
                  <img
                    className={"thumb" + index}
                    src={item.thumbImg}
                    data-img={item.img}
                    data-img_large={item.largeImg}
                    alt={this.props.productTitle}
                  />
                </a>
              )
            )}
          </div>
        ) : (
          ""
        )}
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
    state.customsReducer.stockType
});
export default connect(
  mapStateToProps,
  null
)(ProductImagesComponent);
