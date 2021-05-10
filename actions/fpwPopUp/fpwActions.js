import fetch from "isomorphic-unfetch";
export const TOGGLE_FPW_POPUP = 'TOGGLE_FPW_POPUP';
export const FPW__REQUEST ='FPW__REQUEST';
export const FPW_REQUEST_SUCCESS='FPW_REQUEST_SUCCESS';
export const FPW_REQUEST_FAIL='FPW_REQUEST_FAIL';
export const TOGGLE_SUCCESS_POPUP='TOGGLE_SUCCESS_POPUP';
export const TOGGLE_CHANGEPW_POPUP='TOGGLE_CHANGEPW_POPUP';
export const CHANGEPW_SUCCESS='CHANGEPW_SUCCESS';
export const CHANGEPW_FAIL='CHANGEPW_FAIL';
export const TOGGLE_CHANGEPW_STATUS='TOGGLE_CHANGEPW_STATUS';
import Router from "next/router";


export const toggleChangePwSuccessStatus=()=>{
  return{
    type:TOGGLE_CHANGEPW_STATUS
  }
}
export const changePwRequest= (lang,pw,code)=>dispatch=>{
  return fetch(process.env.endpoint + "/api/changePassword",{
    method:  "POST",
    headers:{
        'Content-Type': 'application/json',
        // 'JsonStub-User-Key': '3a323f5e-e6ee-4554-ba9c-6213cf6272d1',
        // 'JsonStub-Project-Key': '495ea768-7e38-409f-9b22-d571a8b24c9e'
    },
    body: JSON.stringify({
    language: lang,
      newPassword : pw,
      code:code
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === true) {
      dispatch(getChangepwSuccess(data));
        Router.push('/')
      // dispatch(changePwPopUpStatusToggle())
    } else {
      dispatch(getChangepwFail(data));
    }
  })
}
export const getChangepwSuccess=(data)=>{
  return{
    type:CHANGEPW_SUCCESS,
    data
  }
}
export const getChangepwFail=(data)=>{
  return{
    type:CHANGEPW_FAIL,
    data
  }
}
export const changePwPopUpStatusToggle=()=>{
  Router.push('/')
  return{
    type:TOGGLE_CHANGEPW_POPUP
  }
}

export const toggleSuccessStatus=()=>{
  return{
    type:TOGGLE_SUCCESS_POPUP
  }
}
export const getFpwSuccess=(data)=>{
  return{
    type:FPW_REQUEST_SUCCESS,
    data
  }
}
export const getFpwFail=(data)=>{
  return{
    type:FPW_REQUEST_FAIL,
    data
  }
}
export const fpwRequest= (lang,email,url)=>dispatch=>{
  return fetch(process.env.endpoint + "/api/restorePassword",{
    method:  "POST",
    headers:{
        'Content-Type': 'application/json',
        // 'JsonStub-User-Key': '3a323f5e-e6ee-4554-ba9c-6213cf6272d1',
        // 'JsonStub-Project-Key': '495ea768-7e38-409f-9b22-d571a8b24c9e'
    },
    body: JSON.stringify({
    language: lang,
      email: email,
      url:url
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === true) {
    dispatch(fpwPopUpStatusToggle(false));
      dispatch(getFpwSuccess(data));
    //   setTimeout(function(){
    //   dispatch(toggleSuccessStatus())
    //   dispatch(changePwPopUpStatusToggle())
    // }, 2000);
    } else {
      dispatch(getFpwFail(data));
    }
  })
}
export const fpwPopUpStatusToggle=(value)=>{
  return{
    type:TOGGLE_FPW_POPUP,
    value
  }
}
