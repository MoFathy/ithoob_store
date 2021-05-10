import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from "next/link";
import $ from "jquery";
import FabricsCustom from '../../components/customizationsPage/fabricscustom';
import YakaCustom from '../../components/customizationsPage/yakacustom';
import ZarzourCustom from '../../components/customizationsPage/zarzourcustom';
import AkmamCustom from '../../components/customizationsPage/akmamcustom';
import OthersCustom from '../../components/customizationsPage/otherscustom';
import MeasuementsCustom from '../../components/customizationsPage/measurmentscustom';
import { getCookie } from '../../scripts/getCookieFile';
import { myModule } from '../../scripts/collapsersModule.js';
import LoginPopUp from '../includes/loginPopUp';
import ForgetPwPopUp from '../includes/forgetPwPopUp';
import SuccessFpwPopUp from '../includes/fpwSuccessPopUp';
import ChangePwPopUp from '../includes/changePwPopUp';
import ChangePwSuccessPopup from '../includes/changePwSuccessPopup';
import SignupPopUp from '../includes/signupPopUp';
import EmailSignupPopUp from '../includes/emailSignupPopUp';
import VerifyCodePopUp from '../includes/verifyCodePopUp';
import { ActionCreators } from 'redux-undo';
import ImagesPopUp from './imagesPopUp';
import SubmissionPopUp from './SubmissionPopUp';
import ClosePopUp from './closePopUp'
import { getStringVal } from "../../scripts/multiLang";

import { fromCartToEditcustomsState } from "../../actions/myCart/myCartActions";
import { showPopUp, storeAttachNames, deleteAttachment, getDefaultValues, updateDefaultsLocally } from '../../actions/customizationsPage/othersActions';
import { storeFabricImages, storeHeaderFabricImages, storeHeaderYakaImages, storeHeaderZarzourImages, storeHeaderAkmamImages, storeHeaderOthersImages, resetPresentData } from '../../actions/includes/carouselActions';
import { loginPopUpStatusToggle, toggleClosePopup } from '../../actions/loginPopUp/loginActions';
//layout of customizations page
export class CustomizationsContent extends Component {
  componentDidMount() {
    const collapse = require('bootstrap/js/dist/collapse.js');
    //patams language
    myModule.init();
    // [...$(e.target).find('.custom__items .fabricChildrens > div')].forEach((x) => {
    //   console.log("enter items");
    //     if($(x).find('.contentItem').html()){
    //            console.log('x in',x)
    //           if($(x).find('.item-selected').html()){
    //            $(x).show();
    //           }
    //       }
    // });
    if (this.props.itemid !== undefined) {
      //if loged in user  else not loged in user
      if (this.props.ithoobCookie !== -1) {
        this.props.fromCartToEditcustomsState();
        this.props.getDefaultValues(this.props.language === false ? 1 : 2, this.props.itemid, getCookie('ithoobUser', 'authenticationToken'));
      }
    }
    if (window.location.pathname === "/customizations") {
      if (this.props.language === false) {
        $('body').addClass('page_en');
      }
    }
    var width = window.outerWidth;
    if (width <= 991.98) {
      window.onscroll = function () {
        if (window.pageYOffset > 400) {
          $(".sideBar__productImages__productDesc").addClass("onScroll");
        } else {
          $(".sideBar__productImages__productDesc").removeClass("onScroll");
        }
      };
    } else {
      $(".sideBar__productImages__productDesc").removeClass("onScroll");
    }

  }

  constructor(props) {
    super(props);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.showPopUp = this.showPopUp.bind(this);
    this.handleAttach = this.handleAttach.bind(this);
    this.processSelectedFiles = this.processSelectedFiles.bind(this);
    this.deleteAttach = this.deleteAttach.bind(this);
    this.loginPopup = this.loginPopup.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.updateFromMyCartstatus = this.updateFromMyCartstatus.bind(this);
  }
  updateFromMyCartstatus() {
    if (this.props.fromCartStatus === true) {
      this.props.fromCartToEditcustomsState();
    }
  }
  onFocus() {
    $('.notes__input__value').val('');
  }
  loginPopup() {
    this.props.loginPopUpStatusToggle(true);
  }
  handleAttach() {
    if (this.props.ithoobCookie !== -1) {
      $("#attach").click();
    } else {
      $("p.notLoggedIn").css('display', 'block')
    }
  }
  componentDidUpdate(prevProps) {
    // if(prevProps.itemPresent !== this.props.itemPresent){
    //   myModule.reinitSlickers();
    // }
    if (this.props.ithoobCookie == -1) {
      if ("uc" in localStorage) {
        var index = this.props.itemid;
        let productsObject = JSON.parse(localStorage.getItem("uc"));
        var productCustoms = productsObject.products[index];
        if (prevProps.fabricsObject.length == 0 || prevProps.yakaObject.length == 0 || prevProps.zarzourObject.length == 0 || prevProps.akmamObject.length == 0 || prevProps.othersObject.length == 0) {
          if (this.props.fabricsObject && this.props.fabricsObject.length > 0 && this.props.yakaObject && this.props.yakaObject.length > 0 && this.props.zarzourObject && this.props.zarzourObject.length > 0 && this.props.akmamObject && this.props.akmamObject.length > 0 && this.props.othersObject && this.props.othersObject.length > 0) {
            if (this.props.itemid !== undefined && productCustoms) {
              this.props.updateDefaultsLocally(productCustoms);
            } else {
              // dispatch show popup
            }
          }
        }
      }
    }
    // if(prevProps.loadImagesNow !== this.props.itemPresent.loadImagesNow && this.props.itemPresent.loadImagesNow === true){
    // var fabricsImages,yakaImages,zarzourImages,akmamImages,othersImages;
    // var fabricArray =$("#fabrics").find(".contentItem:has(img)");
    //   [...fabricArray].forEach(item => {
    //     var imgSrc,imgId;
    //     console.log("enter fir weach");
    //     console.log($(item).attr('class'))
    //     console.log($(item).hasClass("item-selected"));
    //     if($(item).hasClass("item-selected")){
    //     console.log("has class");
    //       console.log("itis item selected");
    //       imgId=$(item).attr("data-id");
    //       imgSrc=$(item).find('img').attr("src");
    //       console.log("img pro");
    //       console.log(imgId);
    //       console.log(imgSrc);
    //       fabricsImages.push({id:imgId,imgSrc:imgSrc});
    //     }
    //   })
    //
    //   console.log(fabricsImages);
    //   // this.props.storeFabricImages(fabricsImages)
    // }
  }
  showPopUp(e, images, cost) {
    var title = $(e.target).parents('.card-header').find('p.collapserTitle').text();
    this.props.showPopUp(images, cost, title)
  }
  handleUndo(e) {
    this.props.undoHandler() // undo the last action
  }
  handleRedo(e) {
    this.props.redoHandler() // redo the last action
  }
  processSelectedFiles(e) {
    var attachNames = [];
    var allAttachments = this.props.attachementsNames;
    [...e.target.files].forEach((item, index) => { attachNames.push(item.name); });
    attachNames = attachNames.concat(allAttachments);
    // let dataImg = new FormData();
    // [...e.target.files].forEach((item,index)=> {attachNames.push(item.name);
    // 	dataImg.append('images', item);
    // 	if(index == e.target.files.length-1)
    // 	this.props.uploadFiles(dataImg)
    // });
    this.props.storeAttachNames(attachNames);
  }
  deleteAttach(itemName) {
    this.props.deleteAttachment(itemName)
  }
  render() {
    var fabricsCount = 0,
      yakaCount = 0,
      zarzourCount = 0,
      akmamCount = 0,
      othersCount = 0,
      fabricsCost = 0,
      yakaCost = 0,
      zarzourCost = 0,
      akmamCost = 0,
      othersCost = 0;
    var fabricLastchilds = [],
      yakaLastchilds = [],
      zarzourLastChilds = [],
      akmamLastchilds = [],
      othersLastchilds = [];
    return (
      <div className="customizationsContent">
        {this.props.changePwReqStatus === true ? <ChangePwSuccessPopup /> : ""}
        {this.props.queryString !== undefined && this.props.queryString !== null ? <ChangePwPopUp queryString={this.props.queryString} /> : ""}
        {this.props.emailRequestStatus === true ? <SuccessFpwPopUp /> : ""}
        {this.props.fpwPopUpStatus === true ? <ForgetPwPopUp /> : ""}
        {this.props.loginPopUpStatus === true ? <LoginPopUp queryValue={this.props.queryValue} /> : ""}
        {this.props.signupPopUpStatus === true ? <SignupPopUp /> : ""}
        {this.props.emailSignUpPopUp === true ? <EmailSignupPopUp queryValue={this.props.queryValue} /> : ""}
        {this.props.verifyCodePopUpwStatus === true ? <VerifyCodePopUp queryValue={this.props.queryValue} /> : ""}
        {this.props.closePopupStatus === true ? <ClosePopUp /> : ""}
        <SubmissionPopUp itemid={this.props.itemid} />
        <ImagesPopUp />
        <div className="customizationsContent__actionBar d-none d-md-block">
          {this.props.language === false ?
            <ul className="d-flex justify-content-end">
              <li onClick={(e) => this.handleUndo(e)}><span className={this.props.pastArray.length >= 1 ? "icon-undo1 active" : "icon-undo1"}></span></li>
              <li onClick={(e) => this.handleRedo(e)}><span className={this.props.futureArray.length >= 1 ? "icon-redo1 active" : "icon-redo1"}></span></li>
              <li>{this.props.pastArray.length >= 1 || this.props.futureArray.length >= 1 ? <div className="close" onClick={() => this.props.toggleClosePopup(true)}><span className="icon-close"></span></div> : <div className="close" onClick={() => this.props.clearPastFutureHistory()}><Link href={this.props.fromCartStatus === true ? "/my-cart" : "/"}><a onClick={this.updateFromMyCartstatus}><span className="icon-close"></span></a></Link></div>}</li>
            </ul> :
            <ul className="d-flex justify-content-end">
              <li onClick={(e) => this.handleRedo(e)}><span className={this.props.futureArray.length >= 1 ? "icon-redo1 active" : "icon-redo1"}></span></li>
              <li onClick={(e) => this.handleUndo(e)}><span className={this.props.pastArray.length >= 1 ? "icon-undo1 active" : "icon-undo1"}></span></li>
              <li>{this.props.pastArray.length >= 1 || this.props.futureArray.length >= 1 ? <div className="close" onClick={() => this.props.toggleClosePopup(true)}><span className="icon-close"></span></div> : <div className="close" onClick={() => this.props.clearPastFutureHistory()}><Link href={this.props.fromCartStatus === true ? "/my-cart" : "/"}><a onClick={this.updateFromMyCartstatus}><span className="icon-close"></span></a></Link></div>}</li>
            </ul>}
        </div>
        <div id="accordion">

          {/* Measurements / Size / Sizeman */}
          {/* Hide measurements section when user edit item from cart */}
          {!this.props.itemid ? (
            <div className="card active">
              <div className="card-header collapserBtn" data-img="0" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix" id="headingSix">
                <h5 className="mb-0 d-flex justify-content-between">
                  <button className="btn btn-link" >
                    <p className="collapserTitle"><span className="icon-arrow"></span>{getStringVal(this.props.language, "SIZES")} </p>
                  </button>
                </h5>
              </div>
              <div id="collapseSix" className="collapse show" aria-labelledby="headingSix" data-parent="#accordion">
                <div className="card-body">
                  <MeasuementsCustom pathname={this.props.pathname} />
                </div>
              </div>
            </div>
          ) : ("")
          }

          {/* Fabric, Yaka, Zarzor, Akmam, Extras */}
          <div className="other-options">
            { // User must have a measurement || size || sizeMan selected
              this.props.itemPresent.sizeManStatus || this.props.itemPresent.measurementId !== "" || this.props.itemPresent.sizeId !== "" ?
                ""
                : <div className="overlay">
                  <div className="not-available">{getStringVal(this.props.language, "CHOOSE_MEASUREMENT_BEFORE_OTHER_OPTIONS")}</div>
                </div>
            }
            <div className="card">
              <div className="card-header collapsed collapserBtn" data-toggle="collapse" data-img="0" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="headingOne">
                <h5 className="mb-0 d-flex justify-content-between">
                  <button className="btn btn-link">
                    <p className="collapserTitle"><span className="icon-arrow"></span>{getStringVal(this.props.language, "CLOTH")}</p>
                  </button>
                  {/* this.props.fabricImages.length >0 ?<div className="card-header-items d-flex">
                      {
                        this.props.fabricImages.length > 4 ? <div className="d-flex align-items-center">{
                            this.props.fabricImages.map((item,index) => {
                              return(
                              <div style={index>3 ? {display:"none"}: {display:"block"}}>
                                  <img  src={item.imgSrc} className={"image"+item.id}/>
                                </div>
                              )
                            })
                          }<p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-none d-md-block" :"moreItems  mr-3 ml-3 d-none d-md-block"} onClick={(e) => this.showPopUp(e,this.props.fabricImages,this.props.fabricCost)}>+{this.props.fabricImages.length-4}</p>
                        </div> :
                        <div>{
                            this.props.fabricImages.map((item,index) => {
                              return(
                              <img  src={item.imgSrc} className={"image"+item.id}/>
                              )
                            })
                        }
                        </div>
                      }
                      </div>: ""
                    */}
                  {
                    this.props.fabricArray.length > 0 && this.props.fabricsObject && this.props.fabricsObject.length > 0 ? <div className="card-header-items d-flex">
                      {
                        this.props.fabricsObject.map((x) => {
                          if (this.props.fabricArray.includes(x.id)) { if (x.cost) fabricCost += parseInt(x.cost); }
                          if (x.items && Array.isArray(x.items)) {
                            return x.items.map(y => {
                              if (this.props.fabricArray.includes(y.id)) { if (y.cost) fabricsCost += parseInt(y.cost); }
                              if (y.sub && Array.isArray(y.sub.subItems)) {
                                return y.sub.subItems.map(w => {
                                  if (this.props.fabricArray.includes(w.id)) { if (w.cost) fabricsCost += parseInt(w.cost); }
                                  if (w.sub && Array.isArray(w.sub.color)) {
                                    return w.sub.color.map(u => {
                                      if (this.props.fabricArray.includes(u.id)) {
                                        fabricsCount++;
                                        if (u.cost) fabricsCost += parseInt(u.cost);
                                        fabricLastchilds.push({ id: u.id, imgSrc: u.image, label: `<label className=${'label' + u.id}>${u.name}</label>` });
                                        if (this.props.fabricImages.length == 0) this.props.storeHeaderFabricImages(fabricLastchilds, fabricsCost, false);
                                        if (fabricsCount <= 4) return u.image ? <div><img src={u.image} /></div> : <div><label className={"label" + u.id}>{u.name}</label></div>;
                                      }
                                    })
                                  } else {
                                    if (this.props.fabricArray.includes(w.id)) {
                                      fabricsCount++;
                                      fabricLastchilds.push({ id: w.id, imgSrc: w.image, label: `<label className=${'label' + w.id}>${w.name}</label>` });
                                      if (this.props.fabricImages.length == 0) this.props.storeHeaderFabricImages(fabricLastchilds, fabricsCost, false);
                                      if (fabricsCount <= 4) return w.image ? <img src={w.image} /> : <div><label className={"label" + w.id}>{w.name}</label></div>;
                                    }
                                  }
                                })

                              } else {
                                if (this.props.fabricArray.includes(y.id)) {
                                  fabricsCount++;
                                  fabricLastchilds.push({ id: y.id, imgSrc: y.image, label: `<label className=${'label' + y.id}>${y.name}</label>` });
                                  if (this.props.fabricImages.length == 0) this.props.storeHeaderFabricImages(fabricLastchilds, fabricsCost, false);
                                  if (fabricsCount <= 4) return y.image ? <div><img src={y.image} /></div> : <div><label className={"label" + y.id}>{y.name}</label></div>;
                                }
                              }
                            })
                          } else {
                            if (this.props.fabricArray.includes(x.id)) {
                              fabricsCount++;
                              fabricLastchilds.push({ id: x.id, imgSrc: x.image, label: `<label className=${'label' + x.id}>${x.name}</label>` });
                              if (this.props.fabricImages.length == 0) this.props.storeHeaderFabricImages(fabricLastchilds, fabricsCost, false);
                              if (fabricsCount <= 4) return x.image ? <div><img src={x.image} /></div> : <div><label className={"label" + x.id}>{x.name}</label></div>;
                            }
                          }
                        })}{fabricsCount > 0 ? fabricsCount > 4 ? <p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-none d-md-block" : "moreItems  mr-3 ml-3 d-none d-md-block"} onClick={(e) => this.showPopUp(e, this.props.fabricImages, this.props.fabricCost)}>+{fabricsCount - 4}</p> : "" : ""}
                      {fabricsCount > 0 ? fabricsCount > 1 ? <p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-block d-md-none" : "moreItems  mr-3 ml-3 d-block d-md-none"} onClick={(e) => this.showPopUp(e, this.props.fabricImages, this.props.fabricCost)}>+{fabricsCount - 1}</p> : "" : ""}
                    </div> : ""}
                  {this.props.fabricCost !== 0 ? <p className="align-self-center cost"><span>{this.props.fabricCost}</span><span>{getStringVal(this.props.language, "SR")}</span></p> : ""}
                  {this.props.fabricRequired ? <div className="requiredNote" style={{ display: "none" }}><span className="requiredNote__txt">{getStringVal(this.props.language, "YOU_DO_NOT_EXIT_SELECTIONS_AFTER_THE_CLOTH")}</span><span className="icon-warning"></span></div> : ""}
                </h5>
              </div>
              <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body">
                  <FabricsCustom itemid={this.props.itemid} />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header collapsed collapserBtn" data-img="1" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" id="headingTwo">
                <h5 className="mb-0 d-flex justify-content-between">
                  <button className="btn btn-link"  >
                    <p className="collapserTitle"><span className="icon-arrow"></span>{getStringVal(this.props.language, "COLLAR")}</p>
                  </button>
                  {/* this.props.yakaImages.length >0 ?<div className="card-header-items d-flex">
                      {
                        this.props.yakaImages.length > 4 ? <div className="d-flex align-items-center">{
                            this.props.yakaImages.map((item,index) => {
                              return(
                              <div style={index>3 ? {display:"none"}: {display:"block"}}>
                                <img  src={item.imgSrc} className={"image"+item.id}/>
                              </div>
                              )
                            })
                          }<p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-none d-md-block" :"moreItems  mr-3 ml-3 d-none d-md-block"} onClick={(e) => this.showPopUp(e,this.props.yakaImages,this.props.yakaCost)}>+{this.props.yakaImages.length-4}</p>
                        </div> :
                        <div>{
                            this.props.yakaImages.map((item,index) => {
                              return(
                              <img  src={item.imgSrc} className={"image"+item.id}/>
                              )
                            })
                        }
                        </div>
                      }
                      </div>: ""
                    */}
                  {
                    this.props.yakaArray.length > 0 && this.props.yakaObject && this.props.yakaObject.length > 0 ? <div className="card-header-items d-flex">
                      {
                        this.props.yakaObject.map((x) => {
                          if (this.props.yakaArray.includes(x.id)) { if (x.cost) yakaCost += parseInt(x.cost); }
                          if (x.items && Array.isArray(x.items)) {
                            return x.items.map(y => {
                              if (this.props.yakaArray.includes(y.id)) { if (y.cost) yakaCost += parseInt(y.cost); }
                              if (y.sub && Array.isArray(y.sub.subItems)) {
                                return y.sub.subItems.map(w => {
                                  if (this.props.yakaArray.includes(w.id)) { if (w.cost) yakaCost += parseInt(w.cost); }
                                  if (w.sub && Array.isArray(w.sub.color)) {
                                    return w.sub.color.map(u => {
                                      if (this.props.yakaArray.includes(u.id)) {
                                        yakaCount++;
                                        if (u.cost) yakaCost += parseInt(u.cost);
                                        yakaLastchilds.push({ id: u.id, imgSrc: u.image, label: `<label className=${'label' + u.id}>${u.name}</label>` });
                                        if (this.props.yakaImages.length == 0) this.props.storeHeaderYakaImages(yakaLastchilds, yakaCost, false);
                                        if (yakaCount <= 4) return u.image ? <div><img src={u.image} /></div> : <div><label className={"label" + u.id}>{u.name}</label></div>;
                                      }
                                    })
                                  } else {
                                    if (this.props.yakaArray.includes(w.id)) {
                                      yakaCount++;
                                      yakaLastchilds.push({ id: w.id, imgSrc: w.image, label: `<label className=${'label' + w.id}>${w.name}</label>` });
                                      if (this.props.yakaImages.length == 0) this.props.storeHeaderYakaImages(yakaLastchilds, yakaCost, false);
                                      if (yakaCount <= 4) return w.image ? <div><img src={w.image} /></div> : <div><label className={"label" + w.id}>{w.name}</label></div>;
                                    }
                                  }
                                })

                              } else {
                                if (this.props.yakaArray.includes(y.id)) {
                                  yakaCount++;
                                  yakaLastchilds.push({ id: y.id, imgSrc: y.image, label: `<label className=${'label' + y.id}>${y.name}</label>` });
                                  if (this.props.yakaImages.length == 0) this.props.storeHeaderYakaImages(yakaLastchilds, yakaCost, false);
                                  if (yakaCount <= 4) return y.image ? <div><img src={y.image} /></div> : <div><label className={"label" + y.id}>{y.name}</label></div>;
                                }
                              }
                            })
                          } else {
                            if (this.props.yakaArray.includes(x.id)) {
                              yakaCount++;
                              yakaLastchilds.push({ id: x.id, imgSrc: x.image, label: `<label className=${'label' + x.id}>${x.name}</label>` });
                              if (this.props.yakaImages.length == 0) this.props.storeHeaderYakaImages(yakaLastchilds, yakaCost, false);
                              if (yakaCount <= 4) return x.image ? <div><img src={x.image} /></div> : <div><label className={"label" + x.id}>{x.name}</label></div>;
                            }
                          }
                        })}{yakaCount > 0 ? yakaCount > 4 ? <p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-none d-md-block" : "moreItems  mr-3 ml-3 d-none d-md-block"} onClick={(e) => this.showPopUp(e, this.props.yakaImages, this.props.yakaCost)}>+{yakaCount - 4}</p> : "" : ""}
                      {yakaCount > 0 ? yakaCount > 1 ? <p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-block d-md-none" : "moreItems  mr-3 ml-3 d-block d-md-none"} onClick={(e) => this.showPopUp(e, this.props.yakaImages, this.props.yakaCost)}>+{yakaCount - 1}</p> : "" : ""}
                    </div> : ""}
                  {this.props.yakaCost !== 0 ? <p className="align-self-center cost"><span>{this.props.yakaCost}</span><span>{getStringVal(this.props.language, "SR")} </span></p> : ""}
                  {this.props.yakaRequired ? <div className="requiredNote" style={{ display: "none" }}><span className="requiredNote__txt">{getStringVal(this.props.language, "YOU_DO_NOT_EXIT_SELECTIONS_AFTER_COLLAR")}</span><span className="icon-warning"></span></div> : ""}
                </h5>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                <div className="card-body">
                  <YakaCustom itemid={this.props.itemid} />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header  collapsed collapserBtn" data-img="2" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" id="headingThree">
                <h5 className="mb-0 d-flex justify-content-between">
                  <button className="btn btn-link" >
                    <p className="collapserTitle"><span className="icon-arrow"></span>{getStringVal(this.props.language, "STARLINGS")}</p>
                  </button>
                  {/* this.props.zarzourImages.length >0 ?<div className="card-header-items d-flex">
                      {
                        this.props.zarzourImages.length > 4 ? <div className="d-flex align-items-center">{
                            this.props.zarzourImages.map((item,index) => {
                              return(
                              <div style={index>3 ? {display:"none"}: {display:"block"}}>
                                <img  src={item.imgSrc} className={"image"+item.id}/>
                              </div>
                              )
                            })
                          }<p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-none d-md-block" :"moreItems  mr-3 ml-3 d-none d-md-block"} onClick={(e) => this.showPopUp(e,this.props.zarzourImages,this.props.zarzourCost)}>+{this.props.zarzourImages.length-4}</p>
                        </div> :
                        <div>{
                            this.props.zarzourImages.map((item,index) => {
                              return(
                              <img  src={item.imgSrc} className={"image"+item.id}/>
                              )
                            })
                        }
                        </div>
                      }
                      </div>: ""
                  */  }
                  {
                    this.props.zarzourArray.length > 0 && this.props.zarzourObject && this.props.zarzourObject.length > 0 ? <div className="card-header-items d-flex">
                      {
                        this.props.zarzourObject.map((x) => {
                          if (this.props.zarzourArray.includes(x.id)) { if (x.cost) zarzourCost += parseInt(x.cost); }
                          if (x.items && Array.isArray(x.items)) {
                            return x.items.map(y => {
                              if (this.props.zarzourArray.includes(y.id)) { if (y.cost) zarzourCost += parseInt(y.cost); }
                              if (y.sub && Array.isArray(y.sub.subItems)) {
                                return y.sub.subItems.map(w => {
                                  if (this.props.zarzourArray.includes(w.id)) { if (w.cost) zarzourCost += parseInt(w.cost); }
                                  if (w.sub && Array.isArray(w.sub.color)) {
                                    return w.sub.color.map(u => {
                                      if (this.props.zarzourArray.includes(u.id)) {
                                        zarzourCount++;
                                        if (u.cost) zarzourCost += parseInt(u.cost);
                                        zarzourLastChilds.push({ id: u.id, imgSrc: u.image, label: `<label className=${'label' + u.id}>${u.name}</label>` });
                                        if (this.props.zarzourImages.length == 0) this.props.storeHeaderZarzourImages(zarzourLastChilds, zarzourCost, false);
                                        if (zarzourCount <= 4) return u.image ? <div><img src={u.image} /></div> : <div><label className={"label" + u.id}>{u.name}</label></div>;
                                      }
                                    })
                                  } else {
                                    if (this.props.zarzourArray.includes(w.id)) {
                                      zarzourCount++;
                                      zarzourLastChilds.push({ id: w.id, imgSrc: w.image, label: `<label className=${'label' + w.id}>${w.name}</label>` });
                                      if (this.props.zarzourImages.length == 0) this.props.storeHeaderZarzourImages(zarzourLastChilds, zarzourCost, false);
                                      if (zarzourCount <= 4) return w.image ? <div><img src={w.image} /></div> : <div><label className={"label" + w.id}>{w.name}</label></div>;
                                    }
                                  }
                                })

                              } else {
                                if (this.props.zarzourArray.includes(y.id)) {
                                  zarzourCount++;
                                  zarzourLastChilds.push({ id: y.id, imgSrc: y.image, label: `<label className=${'label' + y.id}>${y.name}</label>` });
                                  if (this.props.zarzourImages.length == 0) this.props.storeHeaderZarzourImages(zarzourLastChilds, zarzourCost, false);
                                  if (zarzourCount <= 4) return y.image ? <div><img src={y.image} /></div> : <div><label className={"label" + y.id}>{y.name}</label></div>;
                                }
                              }
                            })
                          } else {
                            if (this.props.zarzourArray.includes(x.id)) {
                              zarzourCount++;
                              zarzourLastChilds.push({ id: x.id, imgSrc: x.image, label: `<label className=${'label' + x.id}>${x.name}</label>` });
                              if (this.props.zarzourImages.length == 0) this.props.storeHeaderZarzourImages(zarzourLastChilds, zarzourCost, false);
                              if (zarzourCount <= 4) return x.image ? <div><img src={x.image} /></div> : <div><label className={"label" + x.id}>{x.name}</label></div>;
                            }
                          }
                        })}{zarzourCount > 0 ? zarzourCount > 4 ? <p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-none d-md-block" : "moreItems  mr-3 ml-3 d-none d-md-block"} onClick={(e) => this.showPopUp(e, this.props.zarzourImages, this.props.zarzourCost)}>+{zarzourCount - 4}</p> : "" : ""}
                      {zarzourCount > 0 ? zarzourCount > 1 ? <p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-block d-md-none" : "moreItems  mr-3 ml-3 d-block d-md-none"} onClick={(e) => this.showPopUp(e, this.props.zarzourImages, this.props.zarzourCost)}>+{zarzourCount - 1}</p> : "" : ""}
                    </div> : ""}
                  {this.props.zarzourCost !== 0 ? <p className="align-self-center cost"><span>{this.props.zarzourCost}</span><span>{getStringVal(this.props.language, "SR")} </span></p> : ""}
                  {this.props.zarzourRequired ? <div className="requiredNote" style={{ display: "none" }}><span className="requiredNote__txt">{getStringVal(this.props.language, "YOU_DO_NOT_EXIT_SELECTIONS_AFTER_STARLINGS")}</span><span className="icon-warning"></span></div> : ""}
                </h5>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                <div className="card-body">
                  <ZarzourCustom itemid={this.props.itemid} />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header  collapsed collapserBtn" data-img="3" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" id="headingFour">
                <h5 className="mb-0 d-flex justify-content-between">
                  <button className="btn btn-link" >
                    <p className="collapserTitle"><span className="icon-arrow"></span>{getStringVal(this.props.language, "SLEEVES")}</p>
                  </button>
                  {/* this.props.akmamImages.length >0 ?<div className="card-header-items d-flex">
                      {
                        this.props.akmamImages.length > 4 ? <div className="d-flex align-items-center">{
                            this.props.akmamImages.map((item,index) => {
                              return(
                              <div style={index>3 ? {display:"none"}: {display:"block"}}>
                                <img  src={item.imgSrc} className={"image"+item.id}/>
                              </div>
                              )
                            })
                          }<p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-none d-md-block" :"moreItems  mr-3 ml-3 d-none d-md-block"} onClick={(e) => this.showPopUp(e,this.props.akmamImages,this.props.akmamCost)}>+{this.props.akmamImages.length-4}</p>
                        </div> :
                        <div>{
                            this.props.akmamImages.map((item,index) => {
                              return(
                              <img  src={item.imgSrc} className={"image"+item.id}/>
                              )
                            })
                        }
                        </div>
                      }
                      </div>: ""
                    */}
                  {
                    this.props.akmamArray.length > 0 && this.props.akmamObject && this.props.akmamObject.length > 0 ? <div className="card-header-items d-flex">
                      {
                        this.props.akmamObject.map((x) => {
                          if (this.props.akmamArray.includes(x.id)) { if (x.cost) akmamCost += parseInt(x.cost); }
                          if (x.items && Array.isArray(x.items)) {
                            return x.items.map(y => {
                              if (this.props.akmamArray.includes(y.id)) { if (y.cost) akmamCost += parseInt(y.cost); }
                              if (y.sub && Array.isArray(y.sub.subItems)) {
                                return y.sub.subItems.map(w => {
                                  if (this.props.akmamArray.includes(w.id)) { if (w.cost) akmamCost += parseInt(w.cost); }
                                  if (w.sub && Array.isArray(w.sub.color)) {
                                    return w.sub.color.map(u => {
                                      if (this.props.akmamArray.includes(u.id)) {
                                        akmamCount++;
                                        if (u.cost) akmamCost += parseInt(u.cost);
                                        akmamLastchilds.push({ id: u.id, imgSrc: u.image, label: `<label className=${'label' + u.id}>${u.name}</label>` });
                                        if (this.props.akmamImages.length == 0) this.props.storeHeaderAkmamImages(akmamLastchilds, akmamCost, false);
                                        if (akmamCount <= 4) return u.image ? <div><img src={u.image} /></div> : <div><label className={"label" + u.id}>{u.name}</label></div>;
                                      }
                                    })
                                  } else if (w.subSubItems && Array.isArray(w.subSubItems)) {
                                    if (this.props.akmamArray.includes(w.id)) {
                                      akmamCount++;
                                      if (w.cost) akmamCost += parseInt(w.cost);
                                      akmamLastchilds.push({ id: w.id, imgSrc: w.image, label: `<label className=${'label' + w.id}>${w.name}</label>` });
                                      if (this.props.akmamImages.length == 0) this.props.storeHeaderAkmamImages(akmamLastchilds, akmamCost, false);
                                      if (akmamCount <= 4 && w.subSubItems.every(s => s.items.every((x) => !this.props.akmamArray.includes(x.id)))) return w.image ? <div><img src={w.image} /></div> : <div><label className={"label" + w.id}>{w.name}</label></div>;
                                      return w.subSubItems.map(s => {
                                        return s.items.map(u => {
                                          if (this.props.akmamArray.includes(u.id)) {
                                            akmamCount++;
                                            if (u.cost) akmamCost += parseInt(u.cost);
                                            akmamLastchilds.push({ id: u.id, imgSrc: u.image, label: `<label className=${'label' + u.id}>${u.name}</label>` });
                                            if (this.props.akmamImages.length == 0) this.props.storeHeaderAkmamImages(akmamLastchilds, akmamCost, false);
                                            if (akmamCount <= 4 && akmamCount == 2) {
                                              if (u.image && w.image) {
                                                return <React.Fragment><div><img src={w.image} /></div><div><img src={u.image} /></div></React.Fragment>
                                              } else if (u.image && !w.image) {
                                                return <React.Fragment><div><label className={"label" + w.id}>{w.name}</label></div><div><img src={u.image} /></div></React.Fragment>
                                              } else if (!u.image && w.image) {
                                                return <React.Fragment><div><img src={w.image} /></div><div><label className={"label" + u.id}>{u.name}</label></div></React.Fragment>
                                              } else {
                                                return <React.Fragment><div><label className={"label" + w.id}>{w.name}</label></div><div><label className={"label" + u.id}>{u.name}</label></div></React.Fragment>
                                              }
                                            }
                                            else if (akmamCount <= 4) return u.image ? <div><img src={u.image} /></div> : <div><label className={"label" + u.id}>{u.name}</label></div>;
                                          }
                                        })
                                      })
                                      // if(akmamCount <=4)return w.image ? <div><img src={w.image}/></div> : <div><label className={"label"+w.id}>{w.name}</label></div>;
                                    }

                                  }
                                  else {
                                    if (this.props.akmamArray.includes(w.id)) {
                                      akmamCount++;
                                      akmamLastchilds.push({ id: w.id, imgSrc: w.image, label: `<label className=${'label' + w.id}>${w.name}</label>` });
                                      if (this.props.akmamImages.length == 0) this.props.storeHeaderAkmamImages(akmamLastchilds, akmamCost, false);
                                      if (akmamCount <= 4) return w.image ? <div><img src={w.image} /></div> : <div><label className={"label" + w.id}>{w.name}</label></div>;
                                    }
                                  }

                                })

                              } else {
                                if (this.props.akmamArray.includes(y.id)) {
                                  akmamCount++;
                                  akmamLastchilds.push({ id: y.id, imgSrc: y.image, label: `<label className=${'label' + y.id}>${y.name}</label>` });
                                  if (this.props.akmamImages.length == 0) this.props.storeHeaderAkmamImages(akmamLastchilds, akmamCost, false);
                                  if (akmamCount <= 4) return y.image ? <div><img src={y.image} /></div> : <div><label className={"label" + y.id}>{y.name}</label></div>;
                                }
                              }
                            })
                          } else {
                            if (this.props.akmamArray.includes(x.id)) {
                              akmamCount++;
                              akmamLastchilds.push({ id: x.id, imgSrc: x.image, label: `<label className=${'label' + x.id}>${x.name}</label>` });
                              if (this.props.akmamImages.length == 0) this.props.storeHeaderAkmamImages(akmamLastchilds, akmamCost, false);
                              if (akmamCount <= 4) return x.image ? <div><img src={x.image} /></div> : <div><label className={"label" + x.id}>{x.name}</label></div>;
                            }
                          }
                        })}{akmamCount > 0 ? akmamCount > 4 ? <p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-none d-md-block" : "moreItems  mr-3 ml-3 d-none d-md-block"} onClick={(e) => this.showPopUp(e, this.props.akmamImages, this.props.akmamCost)}>+{akmamCount - 4}</p> : "" : ""}
                      {akmamCount > 0 ? akmamCount > 1 ? <p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-block d-md-none" : "moreItems  mr-3 ml-3 d-block d-md-none"} onClick={(e) => this.showPopUp(e, this.props.akmamImages, this.props.akmamCost)}>+{akmamCount - 1}</p> : "" : ""}
                    </div> : ""}
                  {this.props.akmamCost !== 0 ? <p className="align-self-center cost"><span>{this.props.akmamCost}</span><span>{getStringVal(this.props.language, "SR")} </span></p> : ""}
                  {this.props.akmamRequired ? <div className="requiredNote" style={{ display: "none" }}><span className="requiredNote__txt">{getStringVal(this.props.language, "YOU_DO_NOT_EXIT_SELECTIONS_SLEEVES_AFTER")}</span><span className="icon-warning"></span></div> : ""}
                </h5>
              </div>
              <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                <div className="card-body">
                  <AkmamCustom itemid={this.props.itemid} />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header collapsed collapserBtn" data-img="0" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" id="headingFive">
                <h5 className="mb-0 d-flex justify-content-between">
                  <button className="btn btn-link" >
                    <p className="collapserTitle"><span className="icon-arrow"></span>{getStringVal(this.props.language, "ADDITIONS")} </p>
                  </button>
                  {/* this.props.othersImages.length >0 ?<div className="card-header-items d-flex">
                        {
                          this.props.othersImages.length > 4 ? <div className="d-flex align-items-center">{
                              this.props.othersImages.map((item,index) => {
                                return(
                                  item.image !== undefined? <div style={index>3 ? {display:"none"}: {display:"block"}}>
                                  <img  src={item.imgSrc} className={"image"+item.id}/>
                                </div>:<label className={"label"+item.id}>{item.label}</label>
                                )
                              })
                            }<p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-none d-md-block" :"moreItems  mr-3 ml-3 d-none d-md-block"} onClick={(e) => this.showPopUp(e,this.props.othersImages,this.props.othersCost)}>+{this.props.othersImages.length-4}</p>
                          </div> :
                          <div>{
                              this.props.othersImages.map((item,index) => {
                                return(
                                item.image !== undefined? <img  src={item.imgSrc} className={"image"+item.id}/> : <label className={"label"+item.id}>{item.label}</label>
                                )
                              })
                          }
                          </div>
                        }
                        </div>: ""
                      */}
                  {
                    this.props.othersArray.length > 0 && this.props.othersObject && this.props.othersObject.length > 0 ? <div className="card-header-items d-flex">
                      {
                        this.props.othersObject.map((x) => {
                          if (this.props.othersArray.includes(x.id)) { if (x.cost) othersCost += parseInt(x.cost); }
                          if (x.items && Array.isArray(x.items)) {
                            return x.items.map(y => {
                              if (this.props.othersArray.includes(y.id)) { if (y.cost) othersCost += parseInt(y.cost); }
                              if (y.sub && Array.isArray(y.sub.subItems)) {
                                return y.sub.subItems.map(w => {
                                  if (this.props.othersArray.includes(w.id)) { if (w.cost) othersCost += parseInt(w.cost); }
                                  if (w.sub && Array.isArray(w.sub.color)) {
                                    return w.sub.color.map(u => {
                                      if (this.props.othersArray.includes(u.id)) {
                                        othersCount++;
                                        if (u.cost) othersCost += parseInt(u.cost);
                                        othersLastchilds.push({ id: u.id, imgSrc: u.image, label: `<label className=${'label' + u.id}>${u.name}</label>` });
                                        if (this.props.othersImages.length == 0) this.props.storeHeaderOthersImages(othersLastchilds, othersCost, false);
                                        if (othersCount <= 4) return u.image ? <div><img src={u.image} /></div> : <div><label className={"label" + u.id}>{u.name}</label></div>;
                                      }
                                    })
                                  } else {
                                    if (this.props.othersArray.includes(w.id)) {
                                      othersCount++;
                                      othersLastchilds.push({ id: w.id, imgSrc: w.image, label: `<label className=${'label' + w.id}>${w.name}</label>` });
                                      if (this.props.othersImages.length == 0) this.props.storeHeaderOthersImages(othersLastchilds, othersCost, false);
                                      if (othersCount <= 4) return w.image ? <div><img src={w.image} /></div> : <div><label className={"label" + w.id}>{w.name}</label></div>;
                                    }
                                  }
                                })

                              } else {
                                if (this.props.othersArray.includes(y.id)) {
                                  othersCount++;
                                  othersLastchilds.push({ id: y.id, imgSrc: y.image, label: `<label className=${'label' + y.id}>${y.name}</label>` });
                                  if (this.props.othersImages.length == 0) this.props.storeHeaderOthersImages(othersLastchilds, othersCost, false);
                                  if (othersCount <= 4) return y.image ? <div><img src={y.image} /></div> : <div><label className={"label" + y.id}>{y.name}</label></div>;
                                }
                              }
                            })
                          } else {
                            if (this.props.othersArray.includes(x.id)) {
                              othersCount++;
                              othersLastchilds.push({ id: x.id, imgSrc: x.image, label: `<label className=${'label' + x.id}>${x.name}</label>` });
                              if (this.props.othersImages.length == 0) this.props.storeHeaderOthersImages(othersLastchilds, othersCost, false);
                              if (othersCount <= 4) return x.image ? <div><img src={x.image} /></div> : <div><label className={"label" + x.id}>{x.name}</label></div>;
                            }
                          }
                        })}{othersCount > 0 ? othersCount > 4 ? <p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-none d-md-block" : "moreItems  mr-3 ml-3 d-none d-md-block"} onClick={(e) => this.showPopUp(e, this.props.othersImages, this.props.othersCost)}>+{othersCount - 4}</p> : "" : ""}
                      {othersCount > 0 ? othersCount > 1 ? <p className={this.props.language === true ? "moreItems  mr-3 ml-3 arabicNumber d-block d-md-none" : "moreItems  mr-3 ml-3 d-block d-md-none"} onClick={(e) => this.showPopUp(e, this.props.othersImages, this.props.othersCost)}>+{othersCount - 1}</p> : "" : ""}
                    </div> : ""}
                  {this.props.othersCost !== 0 ? <p className="align-self-center cost"><span>{this.props.othersCost}</span><span>{getStringVal(this.props.language, "SR")} </span></p> : ""}
                  {this.props.othersRequired ? <div className="requiredNote" style={{ display: "none" }}><span className="requiredNote__txt">{getStringVal(this.props.language, "YOU_DO_NOT_EXIT_OPTIONS_ADDITIONS_AFTER")}</span><span className="icon-warning"></span></div> : ""}
                </h5>
              </div>
              <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordion">
                <div className="card-body">
                  <OthersCustom itemid={this.props.itemid} />
                  <div className="notes pr-5 d-none">
                    <label htmlFor="notes">{getStringVal(this.props.language, "NOTES")}</label>
                    <div className="notes__input">
                      {this.props.textNote !== "" ? <textarea rows="2" className="notes__input__value" placeholder={getStringVal(this.props.language, "YOU_CAN_WRITE_ANY_NOTES_OR_ADDONS_HERE")} value={this.props.textNote} onFocus={this.onFocus} id="notes"></textarea> :
                        <textarea rows="2" className="notes__input__value" placeholder={getStringVal(this.props.language, "YOU_CAN_WRITE_ANY_NOTES_OR_ADDONS_HERE")} id="notes"></textarea>}
                      <p className="attach"><span className="icon-attachment" onClick={this.handleAttach}></span></p>
                    </div>
                  </div>
                  {this.props.ithoobCookie === -1 ? <p class="notLoggedIn pr-5">{getStringVal(this.props.language, "PLEASE")}  <span onClick={this.loginPopup}>{getStringVal(this.props.language, "LOG_IN")}</span> {getStringVal(this.props.language, "TO_BE_ABLE_TO_ATTACH_FILES")}</p> : ""}
                  <div className="attachments pr-5">
                    <input type="file" multiple id="attach" onChange={($event) => this.processSelectedFiles($event)} />
                  </div>
                  {this.props.attachementsNames.length !== 0 ? <div className="attachmentsList pt-3 pr-5">
                    {this.props.attachementsNames.map((item) => {
                      return (
                        <p>{item} <span onClick={() => this.deleteAttach(item)}>({getStringVal(this.props.language, "DELETE")})</span></p>
                      )
                    })
                    }</div> : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    itemPresent: state.carouselReducer.present,
    pastArray: state.carouselReducer.past,
    futureArray: state.carouselReducer.future,
    fabricCost: state.carouselReducer.present.fabricCost,
    yakaCost: state.carouselReducer.present.yakaCost,
    zarzourCost: state.carouselReducer.present.zarzourCost,
    akmamCost: state.carouselReducer.present.akmamCost,
    othersCost: state.carouselReducer.present.othersCost,
    fabricImages: state.carouselReducer.present.fabricSelectedImages,
    yakaImages: state.carouselReducer.present.yakaSelectedImages,
    zarzourImages: state.carouselReducer.present.zarzourSelectedImages,
    akmamImages: state.carouselReducer.present.akmamSelectedImages,
    othersImages: state.carouselReducer.present.othersSelectedImages,
    attachementsNames: state.customsReducer.attachementsNames,
    fabricRequired: state.carouselReducer.present.fabricRequired,
    yakaRequired: state.carouselReducer.present.yakaRequired,
    zarzourRequired: state.carouselReducer.present.zarzourRequired,
    akmamRequired: state.carouselReducer.present.akmamRequired,
    othersRequired: state.carouselReducer.present.othersRequired,
    ithoobCookie: state.loginReducer.ithoobCookie,
    loginPopUpStatus: state.loginReducer.loginPopUpStatus,
    changePwReqStatus: state.forgetPwReducer.changePwReqStatus,
    emailRequestStatus: state.forgetPwReducer.emailRequestStatus,
    fpwPopUpStatus: state.forgetPwReducer.fpwPopUpStatus,
    signupPopUpStatus: state.signupReducer.signupPopUpStatus,
    emailSignUpPopUp: state.signupReducer.emailSignUpPopUp,
    verifyCodePopUpwStatus: state.loginReducer.verifyCodePopUpwStatus,
    loadImagesNow: state.carouselReducer.present.loadImagesNow,
    fabricArray: state.carouselReducer.present.fabricArray,
    fabricsObject: state.customsReducer.generalitems,
    yakaArray: state.carouselReducer.present.yakaArray,
    yakaObject: state.customsReducer.yakaobject,
    zarzourObject: state.customsReducer.zarzourobject,
    zarzourArray: state.carouselReducer.present.zarzourArray,
    akmamObject: state.customsReducer.akmamobject,
    akmamArray: state.carouselReducer.present.akmamArray,
    othersObject: state.customsReducer.othersobject,
    othersArray: state.carouselReducer.present.othersArray,
    ithoobCookie: state.loginReducer.ithoobCookie,
    language: state.generalReducer.language,
    closePopupStatus: state.customsReducer.closePopupStatus,
    textNote: state.customsReducer.textNote,
    fromCartStatus: state.myCart.fromCartToEditCustomsStatus

  }
}
function mapDispatchToProps(dispatch) {
  return {
    toggleClosePopup(value) {
      dispatch(toggleClosePopup(value))
    },
    showPopUp(images, cost, title) {
      dispatch(showPopUp(images, cost, title))
    },
    storeAttachNames(attachNames) {
      dispatch(storeAttachNames(attachNames))
    },
    deleteAttachment(attachName) {
      dispatch(deleteAttachment(attachName))
    },
    undoHandler() {
      dispatch(ActionCreators.undo())
    },
    redoHandler() {
      dispatch(ActionCreators.redo())
    },
    uploadFiles(images) {
      dispatch(uploadFiles(images))
    },
    getDefaultValues(lang, productId, token) {
      dispatch(getDefaultValues(lang, productId, token));
    },
    loginPopUpStatusToggle(value) {
      dispatch(loginPopUpStatusToggle(value))
    },
    storeFabricImages(fimages) {
      dispatch(storeFabricImages(fimages))
    },
    storeHeaderFabricImages(images, customCost, required) {
      dispatch(storeHeaderFabricImages(images, customCost, required))
    },
    storeHeaderYakaImages(images, customCost, required) {
      dispatch(storeHeaderYakaImages(images, customCost, required))
    },
    storeHeaderZarzourImages(images, customCost, required) {
      dispatch(storeHeaderZarzourImages(images, customCost, required))
    },
    storeHeaderAkmamImages(images, customCost, required) {
      dispatch(storeHeaderAkmamImages(images, customCost, required))
    },
    storeHeaderOthersImages(images, customCost, required) {
      dispatch(storeHeaderOthersImages(images, customCost, required))
    },
    updateDefaultsLocally(defaults) {
      dispatch(updateDefaultsLocally(defaults))
    },
    clearPastFutureHistory() {
      dispatch(resetPresentData());
      dispatch(ActionCreators.clearHistory());
    },
    fromCartToEditcustomsState() {
      dispatch(fromCartToEditcustomsState())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomizationsContent);
