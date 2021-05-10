import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from "../components/layouts/mainLayout.js";
import { twitterAuthToken } from "../actions/socialMediaBtns/socialMediaActions";
import {setActiveMenu} from "../actions/header/categories.js";
import Link from "next/link";

import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import cookies from "next-cookies"
 class TwitterPage extends React.Component {
   static async getInitialProps({ reduxStore, query, pathname, req }) {
    reduxStore.dispatch(setActiveMenu(pathname));

		const { lang } = cookies({req:req})
    const { ithoobUser } = cookies({req:req})

    reduxStore.dispatch(changeLangWithoutCookie(lang==="false" ? false : true))

		if(ithoobUser){
			reduxStore.dispatch(changeIthoobCookie(1))
		}
//oauth_token=67254371-o9zaujcBNKYpYu0g8zBu8q0jLR5UszRoG8UBV7eqN&oauth_token_secret=6hXNFLAL3sTEjtX8q0QKGZDVpreuhhZfITndf5Rct62Rw&user_id=67254371&screen_name=marwanaguib
     return {
			oauth_token: query.oauth_token,
			oauth_verifier: query.oauth_verifier
		 };
	 }
	 componentDidMount(){
     // did mouint of twitter small screen
		this.props.dispatch(twitterAuthToken(this.props.oauth_token,this.props.oauth_verifier))
	 }
	   render() {
    return (
        <Layout classNameData="isLoading">
        </Layout>
    )
  }
}

export default connect()(TwitterPage);
