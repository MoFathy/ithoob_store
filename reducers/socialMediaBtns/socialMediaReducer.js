import { FACEBOOK_LOGIN_SUCCESS,FACEBOOK_LOGIN_FAIL,TWITTER_LOGIN_SUCCESS,
        TWITTER_LOGIN_FAIL,GOOGLE_LOGIN_SUCCESS,GOOGLE_LOGIN_FAIL,SOCIAL_LOGIN } from '../../actions/socialMediaBtns/socialMediaActions'
import { RESET_ANY_USERDATA} from '../../actions/signupPopUp/signupActions';
import { RESET_RESPONSE_MSGS } from '../../actions/loginPopUp/loginActions';
        const socialBtnsInitialState= {
          fbStatus:false,
          twiStatus:false,
          gooStatus:false,
          fbErrorMessage:"",
          twiErrorMessage:"",
          gooErrorMessage:"",
          fbToken:"",
          twiToken:"",
          twiSecret:"",
          gooToken:"",
          socialEmail:"",
          socialName:"",
          socialMobile:""

        }

        export default function (state= socialBtnsInitialState, action){
            switch (action.type) {
                case FACEBOOK_LOGIN_SUCCESS:
                if(action.data.access_token){
                  document.cookie = "ithoobUser=" + JSON.stringify({
                        authenticationToken: action.data.access_token
                    })+";path=/"
                }
                document.cookie = "socialtoken=" + JSON.stringify({
                      authenticationToken: action.accessToken
                  })+";path=/"
                    return {...state,fbStatus:action.data.status,fbToken:action.accessToken,socialEmail:action.data.email,
                            socialName:action.data.name,socialMobile:action.data.mobile}
                case TWITTER_LOGIN_SUCCESS:
                // twitter success reducer
                if(action.data.access_token){
                  document.cookie = "ithoobUser=" + JSON.stringify({
                        authenticationToken: action.data.access_token
                    })+";path=/"
                }
                document.cookie = "socialtoken=" + JSON.stringify({
                      authenticationToken: action.accessToken
                  })+";path=/"
                    return {...state,twiStatus:action.data.status,twiToken:action.accessToken,twiSecret:action.secret,socialEmail:action.data.email,
                            socialName:action.data.name,socialMobile:action.data.mobile}
                case GOOGLE_LOGIN_SUCCESS:
                if(action.data.access_token){
                  document.cookie = "ithoobUser=" + JSON.stringify({
                        authenticationToken: action.data.access_token
                    })+";path=/"
                }
                document.cookie = "socialtoken=" + JSON.stringify({
                      authenticationToken: action.accessToken
                  })+";path=/"
                    return {...state,gooStatus:action.data.status,gooToken:action.accessToken,socialEmail:action.data.email,
                            socialName:action.data.name,socialMobile:action.data.mobile}
              case FACEBOOK_LOGIN_FAIL:
                  return {...state,fbStatus:action.data.status,fbErrorMessage:action.data.message}
            case SOCIAL_LOGIN:
            if(!action.flag)document.cookie = "socialtoken=;path=/"
                return {...state,fbStatus:action.flag,twiStatus:action.flag,gooStatus:action.flag}
              case TWITTER_LOGIN_FAIL:
                  return {...state,twiStatus:action.data.status,twiErrorMessage:action.data.message}
              case GOOGLE_LOGIN_FAIL:
                  return {...state,gooStatus:action.data.status,gooErrorMessage:action.data.message}
            case RESET_ANY_USERDATA:
             return{...state,socialEmail:"", socialName:"", socialMobile:""}
             case RESET_RESPONSE_MSGS:
               return{...state,gooErrorMessage:"",twiErrorMessage:"",fbErrorMessage:"",gooStatus:false,twiStatus:false,fbStatus:false}
                default:
                    return state
            }
        }
