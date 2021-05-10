import React, { Component } from "react";
import { connect } from "react-redux";
import cookies from "next-cookies";
import Router from "next/router";

//included components
import Layout from "../components/layouts/mainLayout.js";
import Breadcrumb from "../components/profile/breadcrumb";
import Form from "../components/profile/form";
import ChangePasswordPopup from "../components/profile/changePasswordPopup";
//actions
import { getProfileInfo } from "../actions/profile/profileActions";
import { setActiveMenu } from "../actions/header/categories.js";
import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import { socialLogin } from "../actions/socialMediaBtns/socialMediaActions";
import Helmet from "react-helmet";

class ProfilePage extends Component {
  static async getInitialProps({ reduxStore, query, pathname, req, res }) {
    reduxStore.dispatch(setActiveMenu(pathname));

    const { lang, socialtoken } = cookies({ req: req });
    const { ithoobUser } = cookies({ req: req });
    const ithoobUserObj = ithoobUser ? JSON.parse(ithoobUser) : null;
    const authToken = ithoobUser ? ithoobUserObj.authenticationToken : null;
    // console.log(ithoobUser ? JSON.parse(ithoobUser).authenticationToken : null);

    reduxStore.dispatch(
      changeLangWithoutCookie(lang === "false" ? false : true)
    );

    if (socialtoken && socialtoken != "") {
      reduxStore.dispatch(socialLogin(true));
    }

    if (ithoobUser) {
      reduxStore.dispatch(changeIthoobCookie(1));
    } else {
      if (res) {
        res.writeHead(302, { Location: "/" });
        res.end();
      } else {
        Router.push("/");
      }
    }

    await reduxStore.dispatch(
      getProfileInfo(lang === "false" ? 1 : 2, authToken)
    );

    // if(this.props.ithoobCookie !== -1){

    // } else{
    //
    // }
    return {
      profile: { ...reduxStore.getState().profile },
      authToken: authToken,
      lang: lang,
      queryString: query.code ? query.code : null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.props.dispatch(
        getProfileInfo(
          this.props.language === false ? 1 : 2,
          this.props.ithoobUser.authenticationToken
        )
      );
    }
    if (
      this.props.ithoobCookie !== prevProps.ithoobCookie &&
      this.props.ithoobCookie == -1
    ) {
      Router.push("/");
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <Layout
        queryString={this.props.queryString}
        classNameData="profilePage withInnerHeader"
      >
        <Helmet
          title={this.props.categories.siteTitle + " | Profile"}
          meta={[
            {
              property: "description",
              content: this.props.categories.siteDescription
            },
            {
              property: "og:locale",
              content: this.props.language === false ? "en_US" : "ar"
            },
            { property: "og:type", content: "website" },
            {
              property: "og:title",
              content: this.props.categories.siteTitle + " | Profile"
            },
            {
              property: "og:description",
              content: this.props.categories.siteDescription
            },
            {
              property: "og:site_name",
              content: this.props.categories.siteTitle + " | Profile"
            },
            {
              property: "twitter:title",
              content: this.props.categories.siteTitle + " | Profile"
            },
            {
              property: "twitter:description",
              content: this.props.categories.siteDescription
            }
          ]}
        />
        <div className="content">
          <div className="container">
            <Breadcrumb />
            <div className="row">
              <div className="col-lg-11">
                <Form />
              </div>
            </div>

            <ChangePasswordPopup />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapProfileStateToProps = state => ({
  language: state.generalReducer.language,
  ithoobUser: state.loginReducer.ithoobUser,
  categories: state.categories,
  ithoobCookie: state.loginReducer.ithoobCookie
});

export default connect(mapProfileStateToProps, null)(ProfilePage);
