import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
//included components
import Layout from "../components/layouts/mainLayout.js";
import Breadcrumb from "../components/measurementList/breadcrumb";
import MeasurementListComponent from "../components/measurementList/measurementListComponent";

//actions
import { getMeasurementList } from "../actions/myMeasurement/getMyMeasurement";
import { setActiveMenu } from "../actions/header/categories.js";
import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import cookies from "next-cookies";

class MyMeasurement extends Component {
  static async getInitialProps({ reduxStore, query, pathname, req, res  }) {
    reduxStore.dispatch(setActiveMenu(pathname + "?slug=" + query.slug));

    const { lang } = cookies({ req: req });
    const { ithoobUser } = cookies({ req: req });
    const ithoobUserObj = ithoobUser ? JSON.parse(ithoobUser) : null;
    const authToken = ithoobUser ? ithoobUserObj.authenticationToken : null;
    reduxStore.dispatch(
      changeLangWithoutCookie(lang === "false" ? false : true)
    );
    if (ithoobUser) {
      reduxStore.dispatch(changeIthoobCookie(1));
      await reduxStore.dispatch(
        getMeasurementList(lang === "false" ? 1 : 2, authToken)
      );
    }else{
      if(res){
        res.writeHead(302, {Location: "/"})
        res.end()
      } else {
        Router.push('/')
      }
    }
    return {
      measurementList: { ...reduxStore.getState().measurementList },
      authToken: authToken,
      queryString: query.code ? query.code : null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.props.dispatch(
        getMeasurementList(
          this.props.language === false ? 1 : 2,
          this.props.authToken
        )
      );
    }
    if(this.props.ithoobCookie !== prevProps.ithoobCookie && this.props.ithoobCookie == -1){
      Router.push('/')
    }
  }

  
  render() {
    return (
      <Layout queryString={this.props.queryString} classNameData="measurementsGuidePage withInnerHeader">
        <div className="content">
          <div className="container">
            <Breadcrumb />
            <MeasurementListComponent />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapMeasurmentGuideStateToProps = state => ({
  language: state.generalReducer.language,
  categories: state.categories,
  ithoobCookie: state.loginReducer.ithoobCookie
});

export default connect(
  mapMeasurmentGuideStateToProps,
  null
)(MyMeasurement);
