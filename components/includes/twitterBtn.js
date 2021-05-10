import React, { Component } from 'react';
import { connect } from 'react-redux';
import { twitterLoginRequest,twitterRequestToken } from '../../actions/socialMediaBtns/socialMediaActions';
import { getStringVal } from "../../scripts/multiLang";
export class TwitterBtn extends Component {
  constructor(props) {
   super(props);
   this.handleTwitterClick=this.handleTwitterClick.bind(this);
 }
  componentDidMount(){
    // const oauthScript = document.createElement("script");
    //   oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

    //   document.body.appendChild(oauthScript);
  }
handleTwitterClick(){

  this.props.twitterRequestToken()

//   // Initialize with your OAuth.io app public key
// // Use popup for oauth
// // Initialize with your OAuth.io app public key
//   OAuth.initialize('fF2gEDEWTFXjRIJwu8ieIN0qc38');
//   // Use popup for OAuth
//   OAuth.popup('twitter').then(twitter => {
//     console.log('first')
//     // Retrieves user data from oauth provider
//     if(twitter){
//     console.log(twitter)
//     }
//     twitter.me().then(data => {
//       console.log('me data:', data);
//       console.log("twitter token");
//       console.log(twitter.oauth_token);
//         this.props.twitterLoginRequest(twitter.oauth_token,twitter.oauth_token_secret,data.raw.id,this.props.queryValue)

//       // alert('Facebook says your email is:' + data.email + ".\nView browser 'Console Log' for more details");
//     })
//     twitter.get('/1.1/account/verify_credentials.json?include_email=true').then(data => {
//                console.log('self data:', data);
//              })
//     //returned oauth_token
//   });
}
  render() {
    return (
              <a id="twitter-button" onClick={this.handleTwitterClick} className="btn btn-block btn-social btn-twitter">
                {/* <i className="fa fa-twitter"></i>  */}
                <span className="icon-Twitter"></span>
                {/* Sign in with Twitter */}
                {getStringVal(this.props.language, "SIGN_IN_WITH_TWITTER")}
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
    twitterLoginRequest(accessToken,secret,id,query){
      dispatch(twitterLoginRequest(accessToken,secret,id,query))
    },
    twitterRequestToken(){
      dispatch(twitterRequestToken())
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(TwitterBtn);
