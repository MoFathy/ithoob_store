import React, { Component } from "react";
import { connect } from "react-redux";
import { facebookLoginRequest } from "../../actions/socialMediaBtns/socialMediaActions";
import { getStringVal } from "../../scripts/multiLang";
import FacebookLogin from 'react-facebook-login';
export class FacebookBtn extends Component {
  constructor(props) {
    super(props);
    this.handleFacebookClick = this.handleFacebookClick.bind(this);
  }
  componentDidMount() {
    // const oauthScript = document.createElement("script");
    //   oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

    //   document.body.appendChild(oauthScript);

    const facebookScript = document.createElement("script");
    facebookScript.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=477479046731131&autoLogAppEvents=1";
    document.body.appendChild(facebookScript);
  }
  handleFacebookClick() {
    const _this = this;
    FB.login(
      function (response) {
        if (response.authResponse) {
          // Welcome!  Fetching your information....
          _this.props.facebookLoginRequest(
            response.authResponse.accessToken,
            _this.props.queryValue
          );
        } else {
          // User cancelled login or did not fully authorize.
        }
      },
      { scope: "email" }
    );

    //   // Initialize with your OAuth.io app public key
    // OAuth.initialize('fF2gEDEWTFXjRIJwu8ieIN0qc38');
    // // Use popup for oauth
    // OAuth.popup('facebook').then(facebook => {
    //   console.log('facebook:',facebook);
    //   if(facebook){
    //     this.props.facebookLoginRequest(facebook.access_token,this.props.queryValue)
    //   }
    //   // Prompts 'welcome' message with User's email on successful login
    //   // #me() is a convenient method to retrieve user data without requiring you
    //   // to know which OAuth provider url to call
    //   // facebook.me().then(data => {
    //   //   console.log('me data:', data);
    //   //   alert('Facebook says your email is:' + data.email + ".\nView browser 'Console Log' for more details");
    //   // })
    //   // Retrieves user data from OAuth provider by using #get() and
    //   // OAuth provider url
    //   // facebook.get('/v2.5/me?fields=name,first_name,last_name,email,gender,location,locale,work,languages,birthday,relationship_status,hometown,picture').then(data => {
    //   //   console.log('self data:', data);
    //   // })
    // });
  }
  responseFacebook = (response) => {
    console.log(response)
  }
  componentClicked = (response) => {
    console.log(response)
  }
  
  render() {
    return (
      // <FacebookLogin
      //   appId="750954715304923"
      //   autoLoad={true}
      //   fields="name,email,picture"
      //   onClick={this.componentClicked}
      //   callback={this.responseFacebook}
      // />
      <a
        id="facebook-button"
        onClick={this.handleFacebookClick}
        className="btn btn-block btn-social btn-facebook"
      >
        {/* <i className="fa fa-facebook"></i> */}
        <span className="icon-Facebook"></span>

        {getStringVal(this.props.language, "SIGN_IN_WITH_FACEBOOK")}
      </a>
    );
  }
}
function mapStateToProps(state) {
  return {
    language: state.generalReducer.language,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    facebookLoginRequest(accessToken, query) {
      dispatch(facebookLoginRequest(accessToken, query));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookBtn);
