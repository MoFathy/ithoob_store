import React, { Component } from 'react';
import { connect } from 'react-redux';
import { googleLoginRequest } from '../../actions/socialMediaBtns/socialMediaActions';
import { getStringVal } from "../../scripts/multiLang";

export class GoogleBtn extends Component {
  constructor(props) {
   super(props);
   this.handleGoogleClick=this.handleGoogleClick.bind(this);
 }
  componentDidMount(){
    // const oauthScript = document.createElement("script");
    //     oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

		const googleScript = document.createElement("script");
		  googleScript.src = "https://apis.google.com/js/api:client.js";

      document.body.appendChild(googleScript);
	  const _this = this;
	  googleScript.onload=function(){_this.loadGoogle()}
  }
  loadGoogle(){
	  const _this = this;
	  gapi.load('auth2', function(){
	  var auth2 = gapi.auth2.init({
		client_id: '1080585770342-cjqgkebfrc2oi1pikv6mapiv8ripijtk.apps.googleusercontent.com',
		cookiepolicy: 'single_host_origin',
	  });
    _this.handleGoogleClick(document.getElementById('google-button'),auth2);
	});
  }
handleGoogleClick(element,auth){

  const _this = this;
	auth.attachClickHandler(element, {},
        function(googleUser) {
          _this.props.googleLoginRequest(googleUser.getAuthResponse(true).access_token,_this.props.queryValue)
        });

  // // Initialize with your OAuth.io app public key
  //  OAuth.initialize('fF2gEDEWTFXjRIJwu8ieIN0qc38');
  //  // Use popup for OAuth
  //  OAuth.popup('google').then(google => {
  //    console.log(google);
  //    // Retrieves user data from oauth provider
  //    //return access_token
  //    console.log(google.me());
  //    if(google){
  //      console.log("google token");
  //      console.log(google.access_token);
  //      this.props.googleLoginRequest(google.access_token,this.props.queryValue)
  //    }
  //  });
}
  render() {
    return (
      <a id="google-button"  className="btn btn-block btn-social btn-google">
        {/* <i className="fa fa-google"></i> */}
        <span className="icon-google-plus"></span>
         {/* Sign in with Google */}
         {getStringVal(this.props.language, "SIGN_IN_WITH_GOOGLE")}
      </a>

    )
  }
}
function mapStateToProps(state) {
  return {
    language: state.generalReducer.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    googleLoginRequest(accessToken,query){
      dispatch(googleLoginRequest(accessToken,query))
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(GoogleBtn);
