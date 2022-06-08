import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeNote } from '../../actions/customizationsPage/othersActions';

import {getStringVal} from "../../scripts/multiLang";
import AkmamCustom from '../customizationsPage/akmamcustom';
import  ClosePopup  from '../customizationsPage/closePopUp';
import OthersCustom from '../customizationsPage/otherscustom';
import SubmissionPopUp from '../customizationsPage/SubmissionPopUp';
import ZarzourCustom from '../customizationsPage/zarzourcustom';
import  ChangePwPopup from '../includes/changePwPopUp';
import ChangePwSuccessPopup from '../includes/changePwSuccessPopup';
import EmailSignupPopUp from '../includes/emailSignupPopUp';
import ForgetPwPopUp from '../includes/forgetPwPopUp';
import  LoginPopup  from '../includes/loginPopUp';
import SignupPopUp from '../includes/signupPopUp';
import  VerifyCodePopup from '../includes/verifyCodePopUp';
import AdditionCard from './additionCard';
import AddsCard from './addsCard';
import  FabricsCard  from './fabricsCard';
import SideMenu from "./sideMenu";
import SizeCard from './sizeCard';
import SleeveCard from './sleeveCard';
import StarlingCard from './starlingCard';
import YakaCard from './yakaCard';
//layout of customizations page
export class Customs extends Component {
  componentDidMount() {
  }

  constructor(props) {
    super(props);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleUndo(e) {
    // this.props.undoHandler() // undo the last action
  }
  handleRedo(e) {
    // this.props.redoHandler() // redo the last action
  }
  handleChange() {
    // var totalPrice=$('.sideBar__productImages__productDesc__cost p').text();
    var note = $(".notes__input__value").val();
    this.props.storeNote(note);
  }
  render() {
    return (
        <div className="customsPart">
          {this.props.changePwReqStatus === true ? <ChangePwSuccessPopup /> : ""}
          {this.props.queryString !== undefined && this.props.queryString !== null ? <ChangePwPopup queryString={this.props.queryString} /> : ""}
          {this.props.emailRequestStatus === true ? <SuccessFpwPopUp /> : ""}
          {this.props.fpwPopUpStatus === true ? <ForgetPwPopUp /> : ""}
          {this.props.loginPopUpStatus === true ? <LoginPopup queryValue={this.props.queryValue} /> : ""}
          {this.props.signupPopUpStatus === true ? <SignupPopUp /> : ""}
          {this.props.emailSignUpPopUp === true ? <EmailSignupPopUp queryValue={this.props.queryValue} /> : ""}
          {this.props.verifyCodePopUpwStatus === true ? <VerifyCodePopup queryValue={this.props.queryValue} /> : ""}
          {this.props.closePopupStatus === true ? <ClosePopup /> : ""}
          <SubmissionPopUp itemid={this.props.itemid} />
            <SideMenu />
            <div className="options card-body">
              <div className="requiredNote" style={{ display: "none" }}><span className="requiredNote__txt">{getStringVal(this.props.language, "YOU_DO_NOT_EXIT_SELECTIONS_AFTER_THE_CLOTH")}</span><span className="icon-warning"></span></div>

              {this.props.openedSection === "size" && <SizeCard  pathname={this.props.pathname} sizeType={this.props.sizeType} measurementsTable={this.props.measurementsTable} itemid={this.props.itemid}/>}
              {this.props.openedSection === "fabric" && <FabricsCard itemid={this.props.itemid} />}
              {this.props.openedSection === "collar" && <YakaCard itemid={this.props.itemid} />}
              {this.props.openedSection === "sleeve" && <SleeveCard itemid={this.props.itemid} />}
              {this.props.openedSection === "starlings" && <StarlingCard itemid={this.props.itemid} />}
              {this.props.openedSection === "additions" &&
              <>
                <AdditionCard itemid={this.props.itemid} />
                <div className="notes mt-2">
                  <label htmlFor="notes">{getStringVal(this.props.language, "NOTES")}</label>
                  <div className="notes__input">
                    {this.props.textNote !== "" ? <textarea rows="2" className="notes__input__value form-control" placeholder={getStringVal(this.props.language, "YOU_CAN_WRITE_ANY_NOTES_OR_ADDONS_HERE")} value={this.props.textNote} onFocus={this.onFocus} id="notes" onChange={this.handleChange}></textarea> :
                      <textarea rows="2" className="notes__input__value form-control" placeholder={getStringVal(this.props.language, "YOU_CAN_WRITE_ANY_NOTES_OR_ADDONS_HERE")} id="notes" onChange={this.handleChange}></textarea>}
                    {/* <p className="attach"><span className="icon-attachment" onClick={this.handleAttach}></span></p> */}
                  </div>
                </div>  
              </>            
              }
              {this.props.openedSection === "adds" && <AddsCard itemid={this.props.itemid} />}
            </div>
            <div className="actions">
                {/* <div className="actionsBtns">
                    <div className="actionBtn" onClick={(e) => this.handleUndo(e)}><img src={require("../../images/customization/redo-active.png")} width="30px"/>
                        <p>
                            {getStringVal(this.props.language, "UNDO")}
                        </p>
                    </div>
                    <div className="actionBtn" onClick={(e) => this.handleRedo(e)}><img src={require("../../images/customization/undo-inactive.png")} width="30px"/>
                        <p>
                            {getStringVal(this.props.language, "REDO")}
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    language: state.generalReducer.language,
    quantity:state.carouselReducer.present.quantity,
    sizeType:state.customsReducer.sizeType,
    measurementsTable: state.customsReducer.measurementsTable,
    openedSection: state.customsReducer.openedSection,
    fabricRequired: state.carouselReducer.present.fabricRequired,
    yakaRequired: state.carouselReducer.present.yakaRequired,
    zarzourRequired: state.carouselReducer.present.zarzourRequired,
    akmamRequired: state.carouselReducer.present.akmamRequired,
    othersRequired: state.carouselReducer.present.othersRequired,
    textNote: state.customsReducer.textNote,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    storeNote(note, totalPrice) {
      dispatch(storeNote(note, totalPrice));
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Customs);
