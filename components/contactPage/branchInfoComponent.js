import React, { Component } from "react";
import { connect } from "react-redux";
import { getStringVal } from "../../scripts/multiLang";
import WhatsAppLogo from "./../includes/WhatsApp";

class BranchInfo extends Component {
  render() {
    const { ithoobInfo } = this.props;
    if (ithoobInfo.workingHours) {
      return (
        <div className="contactPage__branchInfo">
          <p className="contactPage__branchInfo__branchName">
            {ithoobInfo.branchName}
          </p>
          <div className="contactPage__branchInfo__map">
            <iframe
              width="100%"
              height="415"
              src={ithoobInfo.iframeSrc}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h2>{getStringVal(this.props.language, "BRANCH_ADDRESS")}</h2>
          <p>{ithoobInfo.branchAddress}</p>
          <h2>{getStringVal(this.props.language, "BRANCH_NUMBER")}</h2>
          <p className={this.props.language === true ? "arabicNumber" : ""}>
            {ithoobInfo.branchNumber}
          </p>
          <h2>{getStringVal(this.props.language, "WORKING_HOURS_BRANCH")}</h2>
          <p className={this.props.language === true ? "arabicNumber" : ""}>
            {ithoobInfo.workingHours}
          </p>
          <h2>{getStringVal(this.props.language, "CUSTOMER_SERVICE_EMAIL")}</h2>
          <p className={this.props.language === true ? "arabicNumber" : ""}>
            {'Info@durra.tv'}
          </p>
          <div className="contactPage__branchInfo__logos d-flex align-item-start">
            <a href={process.env.facebook} target="_blank">
              {/* <img src={fblogo} alt="facebook"/> */}
              <span className="icon-Facebook"></span>
            </a>

            <a target="_blank" href={process.env.twitter}>
              {/* <img src={twitterlogo} alt="twitter"/> */}
              <span className="icon-Twitter"></span>
            </a>

            <a target="_blank" href={process.env.instagram}>
              {/* <img src={instalogo} alt="instagram"/> */}
              <span className="icon-Instagram"></span>
            </a>

            <a target="_blank" href={'https://api.whatsapp.com/send?phone=' + process.env.whatsAppNumber + '&text=&source=&data=&app_absent='}>
              <WhatsAppLogo />
            </a>

          </div>
        </div>
      );
    } else {
      return <div>{getStringVal(this.props.language, "LOADING")} ... </div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    ithoobInfo: state.contactReducer.ithoobInfo,
    language: state.generalReducer.language
  };
}

//binding actions with component
export default connect(mapStateToProps, null)(BranchInfo);
