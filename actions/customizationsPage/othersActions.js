import fetch from "isomorphic-unfetch";
export const GET_OTHERS_SUCCESS = 'GET_OTHERS_SUCCESS';
export const GET_OTHERS_FAIL = 'GET_OTHERS_FAIL';
export const IMAGES_POPUP ='IMAGES_POPUP';
export const IMAGES_POPDOWN = 'IMAGES_POPDOWN';
export const TOGGLE_HASHWA_POPUP = 'TOGGLE_HASHWA_POPUP';
export const STORE_ATTACHEMENTS_NAMES= 'STORE_ATTACHEMENTS_NAMES';
export const DELETE_ATTACHEMENT= 'DELETE_ATTACHEMENT';
export const GET_DEFAULT_SUCCESS ='GET_DEFAULT_SUCCESS';
export const GET_DEFAULT_FAIL ='GET_DEFAULT_FAIL';
export const UPDATE_DEFAULTS_LOCALLY='UPDATE_DEFAULTS_LOCALLY';
export const STORE_NOTE='STORE_NOTE';
export const SET_OPENED_SECTION = 'SET_OPENED_SECTION'; 

export const storeNote=(note)=>{
  return{
    type:STORE_NOTE,
    note
  }
}

export const setOpenedSection=(section, image)=> dispatch => {
  dispatch({
    type:SET_OPENED_SECTION,
    payload: {section, image}
  });
}

export const updateDefaultsLocally=(defaults)=>{
  // console.log("def in action");
  return{
    type:UPDATE_DEFAULTS_LOCALLY,
    defaults
  }
}
export const getDefaultValues= (lang,productId,token) => dispatch =>{
  return fetch(process.env.endpoint + "/api/item-edits-customized",{
    method:  "POST",
    headers:{
       'Content-Type': 'application/json',
        'Authorization': token
    },
    body: JSON.stringify({
      language: lang,
      productId:parseInt(productId)
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === true) {
      console.log(data);
      dispatch(getDefaultSuccess(data));
    } else {
      dispatch(getDefaultFail(data));
    }
  })
}
export const getDefaultSuccess = (data) => {
  var images=[];
  if(data.note !== undefined){
    if(data.note.images.length !== 0){
      data.note.images.map(image => {
        var lastslashindex = image.lastIndexOf('/');
        var result= image.substring(lastslashindex  + 1);
        //.replace(".png","").replace(".jpg","")
        images.push(result);
      })
    }
  }
  return{
    type: GET_DEFAULT_SUCCESS,
    data,
    images
  }
}

export const getDefaultFail = (data) => ({
    type: GET_DEFAULT_FAIL,
    data
})

export const deleteAttachment =(attachName) => {
  return{
    type:DELETE_ATTACHEMENT,
    attachName
  }
}
export const storeAttachNames = (attachNames) =>{
  return{
    type:STORE_ATTACHEMENTS_NAMES,
    attachNames
  }
}
export const toggleHashwaPopUp = () =>{
  return{
    type:TOGGLE_HASHWA_POPUP
  }
}
export const togglePopUpStatus = ()=>{
  return{
    type:IMAGES_POPDOWN
  }
}
export const showPopUp = (images,cost,title) =>{
  return{
    type:IMAGES_POPUP,
    images,
    cost,
    title
  }
}
//send post request
export const getOthers = (language) => dispatch => {
    return fetch(process.env.endpoint + "/api/others",{
      method:  "POST",
      headers:{
          'Content-Type': 'application/json',
          // 'JsonStub-User-Key': '3a323f5e-e6ee-4554-ba9c-6213cf6272d1',
          // 'JsonStub-Project-Key': '495ea768-7e38-409f-9b22-d571a8b24c9e'
      },
      body: JSON.stringify({
        language: language
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getOthersSuccess(data));
      } else {
        dispatch(getOthersFail(data));
      }
    })
}


export const getOthersSuccess = (payload) => {
  return{
    type: GET_OTHERS_SUCCESS,
    payload
  }
}

export const getOthersFail = (payload) => ({
    type: GET_OTHERS_FAIL,
    payload
})
