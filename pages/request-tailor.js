import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from "../components/layouts/mainLayout.js";
import AboutIthoobPart from '../components/aboutPage/aboutIthoobComponent';
import WhyIthoobPart from '../components/aboutPage/whyIthoobComponent';
import { getAboutIthoob } from "../actions/aboutPage/aboutGetDataActions";
import {setActiveMenu} from "../actions/header/categories.js";

import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import cookies from "next-cookies"
import Helmet from 'react-helmet'
import RequestTailorPart from '../components/customizationsPage/requestTailorPart.js';
//layout of about page
 class RequestTailorLayout extends React.Component {
   static async getInitialProps({ reduxStore, query, pathname, req }) {
    reduxStore.dispatch(setActiveMenu(pathname));

		const { lang } = cookies({req:req})
    const { ithoobUser } = cookies({req:req})
    const ithoobUserObj = ithoobUser ? JSON.parse(ithoobUser) : null;
    const authToken = ithoobUser ? ithoobUserObj.authenticationToken : null;

    reduxStore.dispatch(changeLangWithoutCookie(lang==="false" ? false : true))

		if(ithoobUser){
			reduxStore.dispatch(changeIthoobCookie(1))
		}

     await reduxStore.dispatch(
       getAboutIthoob(lang==="false" ? 1 : 2)
     );
     return {
			 aboutIthoob: { ...reduxStore.getState().aboutReducer.aboutIthoob},
			 authToken: authToken,
			 lang: lang,
       queryString: query.code ? query.code : null
     };
   }
	 componentDidUpdate(prevProps){
		if(this.props.language !== prevProps.language){
			this.props.dispatch(
				 getAboutIthoob(this.props.language===false ? 1 : 2)
			 );
		}
	 }
  render() {
    return (
        <Layout queryString={this.props.queryString} classNameData="aboutPage withInnerHeader">
		<Helmet
  		  title={this.props.categories.siteTitle + " | About" }
  		  meta={[
  			  { property: 'description', content: this.props.categories.siteDescription },
  			  { property: 'og:locale', content: this.props.language === false ? "en_US" : "ar"  },
  			  { property: 'og:type', content: "website"  },
  			{ property: 'og:title', content: this.props.categories.siteTitle + " | About"  },
  			{ property: 'og:description', content: this.props.categories.siteDescription },
  			 { property: 'og:site_name', content: this.props.categories.siteTitle + " | About"  },
  			 { property: 'twitter:title', content: this.props.categories.siteTitle  + " | About" },
  			{ property: 'twitter:description', content: this.props.categories.siteDescription },
  		  ]}
  		/>
        <div className="aboutPage__aboutIthoob">
          <div className="aboutPage__aboutIthoob__video">
            <img src={this.props.aboutIthoob.videoSrc} className="w-100" />

          </div>
          <RequestTailorPart />
        </div>
        </Layout>
    )
  }
}
const mapGeneralStateToProps = state => ({
  language: state.generalReducer.language,
  categories: state.categories,
  aboutIthoob: state.aboutReducer.aboutIthoob,

});
export default connect(mapGeneralStateToProps,null)(RequestTailorLayout);
