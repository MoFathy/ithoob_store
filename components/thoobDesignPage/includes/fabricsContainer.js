// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import 'slick-carousel/slick/slick.js';
import { connect } from "react-redux";
import {
  storeFabrics,
  storeYaka,
  storeZarzour,
  storeAkmam,
  storeOthers
} from "../../../actions/includes/carouselActions";
import { setOpenedSection, toggleHashwaPopUp } from "../../../actions/customizationsPage/othersActions";
import $ from "jquery";
import React, { Component } from "react";
import { clickModule } from "../../../scripts/clickHandlerModule.js";
import { myModule } from "../../../scripts/collapsersModule.js";
import { getStringVal } from "../../../scripts/multiLang";
import HashwaPopup from "../../customizationsPage/hashwaPopUp";
import Item from "./item";

export class FabricsContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.hashwaPopUp = this.hashwaPopUp.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
  }

  handleDisplay(divToHide){
    $(divToHide).css("display", "none")
  }
  _handleSelectedSection(section, image){
    this.props.setOpenedSection(section, image);
  }
  handleClick(e, itemId, subItemId, multiSelect, cost) {
    let output = clickModule.handleClick(
      e,
      itemId,
      subItemId,
      multiSelect,
      this.props.itemid
    );
    if (output.type === "fabrics") {
      this.props.storeFabrics(
        output.items,
        output.cost,
        output.lastChild,
        output.required
      );
    } else if (output.type === "yaka") {
      this.props.storeYaka(
        output.items,
        output.cost,
        output.lastChild,
        output.required,
        output.recomBetana,
        output.type
      );
    } else if (output.type === "zarzour") {
      this.props.storeZarzour(
        output.items,
        output.cost,
        output.lastChild,
        output.required,
        output.recomBetana,
        output.type
      );
    } else if (output.type === "akmam") {
      this.props.storeAkmam(
        output.items,
        output.cost,
        output.lastChild,
        output.required,
        output.recomBetana,
        output.type
      );
    } else if (output.type === "others") {
      this.props.storeOthers(
        output.items,
        output.cost,
        output.lastChild,
        output.required
      );
    } else {
      //mesaurement
    }
  }
  componentDidMount() {
    const slick = require("slick-carousel/slick/slick.js");
    myModule.initiateSlickers();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.fabricRequired !== this.props.fabricRequired ||
      prevProps.yakaRequired !== this.props.yakaRequired ||
      prevProps.zarzourRequired !== this.props.zarzourRequired ||
      prevProps.akmamRequired !== this.props.akmamRequired ||
      prevProps.othersRequired !== this.props.othersRequired
    ) {
      if (
        $("#accordion").find(".fabricChildrens[data-required=true]").length ===
        0
      ) {
        $(".sideBar__productImages__productDesc__btn")
          .find("button")
          .addClass("active");
        if ($(".warningNote").css("display") == "block") {
          $(".warningNote").css("display", "none");
        }
      } else {
        $(".sideBar__productImages__productDesc__btn")
          .find("button")
          .removeClass("active");
      }
    }
    if (prevProps.itemPresent !== this.props.itemPresent) {
      myModule.reinitSlickers();
    }
  }
  hashwaPopUp() {
    this.props.toggleHashwaPopUp();
  }
  state = {
    currentView : "main"
  }
  render() {
    const { customObject } = this.props;
    const { type } = this.props;
    const { Id } = this.props;
    if (customObject) {
      return (
        <div
          className={"fabricChildrens " + customObject.type + " " + type}
          data-id={Id}
          data-required={
            type === "yakaArray"
              ? this.props.yakaRequired
              : type === "akmamArray"
              ? this.props.akmamRequired
              : type === "zarzourArray"
              ? this.props.zarzourRequired
              : type === "fabricArray"
              ? this.props.fabricRequired
              : this.props.othersRequired
          }
        >
          {customObject.info ? (
            <HashwaPopup
              hashwaObject={customObject.info}
              hashwaTitle={customObject.title}
            />
          ) : (
            ""
          )}
          <div className="firstChild fabricChildrens__sub"
            style={{display: `${this.state.currentView === "main" ? "block" : "none"}`}}
          >
            {customObject.type !== "betana" ? (
              <p className="title">
                {customObject.title}
                {customObject.info ? (
                  <span className="moreinfo" onClick={this.hashwaPopUp}>
                    !
                  </span>
                ) : (
                  ""
                )}
              </p>
            ) : (
              <p className="title">
                {customObject.title}{" "}
                {type === "yakaArray"
                  ? getStringVal(this.props.language, "COLLAR")
                  : type === "akmamArray"
                  ? getStringVal(this.props.language, "SLEEVES")
                  : getStringVal(this.props.language, "STARLINGS")}
              </p>
            )}
            <div className="items-container images">
              {customObject.items.map((item, iIndex) => {
                return (
                  <div className="slideItem" onClick={() =>{
                    if(item.sub && item.sub.subItems){
                      console.log("#####################",item.id);
                      this.setState({currentView: "subItem"})
                      if(item.image){
                        this._handleSelectedSection("fabric",  item.image)
                      }
                    }
                  }}>
                    <Item
                      key={item.id}
                      item={item}
                      image={require('../../../images/customization/fabric-white.png')}
                      type={this.props.type}
                      parentitemId={item.id}
                      index={iIndex}
                      multiSelect={item.multiSelect}
                      onhandleClick={this.handleClick}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="secondChild fabricChildrens__sub firstSub"
          style={{display: `${this.state.currentView === "subItem" ? "block" : "none"}`}}
          >
            {customObject.items.map((item, index) => {
              if (item.sub && item.sub.subItems) {
                return (
                  <div
                    data-childof={item.id}
                    style={
                      this.props.itemPresent[this.props.type].includes(item.id)
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    className="items"
                  >
                    <p className="title">{item.sub.subtitle}</p>
                    <div className="images" >
                      {item.sub.subItems.map((shape, fIndex) => {
                        return (
                          <div className="slideItem"  onClick={() =>{
                            if(shape.sub && shape.sub.color && shape.sub.color.length > 0){
                              console.log("***********************",shape.id)
                              this.setState({currentView: "subItemSub"})
                              if(shape.image){
                                this._handleSelectedSection("fabric",  shape.image)
                              }
                            }
                          }}
                            >
                            <Item
                              key={shape.id}
                              type={this.props.type}
                              item={shape}
                              image={require('../../../images/customization/fabric-white.png')}
                              multiSelect={shape.multiSelect}
                              index={fIndex}
                              parentitemId={item.id}
                              onhandleClick={this.handleClick}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            })}
            <button className="cartBtn px-5" 
              onClick={()=> {
                this.setState({currentView: "main"})
              }
            }>{getStringVal(this.props.language, "BACK")}</button>
          </div>
          <div className="secondChild__Sub fabricChildrens__sub">
            {customObject.items.map((item, index) => {
              if (item.sub) {
                if (item.sub.subItems) {
                  return (
                    <div
                      className="secondChild__Sub__content"
                      data-childof={item.id}
                      style={
                        this.props.itemPresent[this.props.type].includes(
                          item.id
                        )
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      {item.sub.subItems.map((shape, fIndex) => {
                        if (shape.subSubItems) {
                          return (
                            <div
                              className="subShape"
                              data-secondchildof={item.id}
                              data-childof={shape.id}
                              style={
                                this.props.itemPresent[
                                  this.props.type
                                ].includes(item.id) &&
                                this.props.itemPresent[
                                  this.props.type
                                ].includes(shape.id)
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            >
                              {shape.subSubItems.map((subDetail, dindex) => {
                                return (
                                  <div
                                    className="subDetail"
                                    data-id={subDetail.id}
                                  >
                                    <p className="title">{subDetail.name}</p>
                                    <div
                                      className={"images"}
                                    >
                                      {subDetail.items.map((image, sIndex) => {
                                        return (
                                          <div className="slideItem" onClick={
                                            ()=> {
                                              if(image.image){
                                                this._handleSelectedSection("fabric",  image.image)
                                                document.getElementsByClassName("productMainImg").style.height = document.getElementsByClassName("magnify").style.height;
                                                console.log(document.getElementsByClassName("productMainImg").style.height);
                                              }
                                            }
                                          }>
                                            <Item
                                              key={image.id}
                                              type={this.props.type}
                                              item={image}
                                              image={require('../../../images/customization/fabric-white.png')}
                                              index={sIndex}
                                              parentitemId={shape.id}
                                              onhandleClick={this.handleClick}
                                            />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                }
              }
            })}
          </div>
          <div className="thirdChild fabricChildrens__sub"
            style={{display: `${this.state.currentView === "main" || this.state.currentView === "subItem" ? "none" : "block"}`}}
          >
            {customObject.items.map((item, index) => {
              if (item.sub && item.sub.subItems) {
                return (
                  <div
                    data-childof={item.id}
                    className="items"
                    style={
                      this.props.itemPresent[this.props.type].includes(item.id)
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {item.sub.subItems.map((fabric, colorindex) => {
                      if (fabric.sub) {
                        if (fabric.sub.color.length > 0) {
                          return (
                            <div
                              data-childof={fabric.id}
                              data-secondchildof={item.id}
                              className="subitems"
                              style={
                                this.props.itemPresent[
                                  this.props.type
                                ].includes(item.id) &&
                                this.props.itemPresent[
                                  this.props.type
                                ].includes(fabric.id)
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            >
                              <p className="title">{fabric.sub.subtitle}</p>
                              <div
                                className="images items-container"
                              >
                                {fabric.sub.color.map((color, cIndex) => {
                                  return (
                                    <div className="slideItem" onClick={
                                      ()=> {
                                        if(color.image){
                                          this._handleSelectedSection("fabric",  color.image)
                                        }
                                      }
                                    }>
                                      <Item
                                        key={color.id}
                                        type={this.props.type}
                                        item={color}
                                        image={require('../../../images/customization/fabric-white.png')}
                                        index={cIndex}
                                        parentitemId={fabric.id}
                                        onhandleClick={this.handleClick}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                      }
                    })}
                    

                  </div>
                );
              }
            })}
            <button className="cartBtn px-5" 
              onClick={()=> {
                this.setState({currentView: "subItem"})
              }
            }>{getStringVal(this.props.language, "BACK")}</button>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    itemPresent: state.carouselReducer.present,
    totalCost: state.carouselReducer.present.totalCost,
    fabricRequired: state.carouselReducer.present.fabricRequired,
    yakaRequired: state.carouselReducer.present.yakaRequired,
    zarzourRequired: state.carouselReducer.present.zarzourRequired,
    akmamRequired: state.carouselReducer.present.akmamRequired,
    othersRequired: state.carouselReducer.present.othersRequired,
    language: state.generalReducer.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    storeFabrics: (fabricsArray, cost, lastChild, required) => {
      dispatch(storeFabrics(fabricsArray, cost, lastChild, required));
    },
    storeYaka: (
      yakaArray,
      cost,
      lastChild,
      required,
      recomBetana,
      customtype
    ) => {
      dispatch(
        storeYaka(yakaArray, cost, lastChild, required, recomBetana, customtype)
      );
    },
    storeZarzour: (
      zarzourArray,
      cost,
      lastChild,
      required,
      recomBetana,
      customtype
    ) => {
      dispatch(
        storeZarzour(
          zarzourArray,
          cost,
          lastChild,
          required,
          recomBetana,
          customtype
        )
      );
    },
    storeAkmam: (
      akmamArray,
      cost,
      lastChild,
      required,
      recomBetana,
      customtype
    ) => {
      dispatch(
        storeAkmam(
          akmamArray,
          cost,
          lastChild,
          required,
          recomBetana,
          customtype
        )
      );
    },
    storeOthers: (othersArray, cost, lastChild, required) => {
      dispatch(storeOthers(othersArray, cost, lastChild, required));
    },
    toggleHashwaPopUp() {
      dispatch(toggleHashwaPopUp());
    },
    setOpenedSection(section, image){
        dispatch(setOpenedSection(section, image))
    }
  };
}

//binding actions with component
export default connect(mapStateToProps, mapDispatchToProps)(FabricsContainer);
