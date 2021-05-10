import fetch from "isomorphic-unfetch";

import {
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_FAIL,
  GET_CART_ITEMS_FROM_LOCAL_STORAGE,
  UPDSTE_ERR_MSG_STATUS,
  UPDATE_MEASUREMENTS_IS_COMPLATE_STATUS,
  DELETE_CART_ITEMS_FROM_LOCAL_STORAGE,
  FROM_CART_TO_EDITCUSTOMS_STATUS,
  UPDATE_IS_LOADING_STATUS,
  UPDATE_REDIRECT_TO_CHECKOUT,
  CLEAR_CART
} from "../actions-types";
import { updateCartHeader } from "../header/cartHeader";

//getCartItemsSuccess func that takes the payload of getCartItems request as a param
//and return action type (GET_CART_ITEMS_SUCCESS) and this payload
export const getCartItemsSuccess = payload => dispatch => {
  return dispatch({
    type: GET_CART_ITEMS_SUCCESS,
    payload
  });
};

export const fromCartToEditcustomsState = () => dispatch => {
  return dispatch({
    type: FROM_CART_TO_EDITCUSTOMS_STATUS
  });
};

//getCartItemsFail func that takes the payload of getCartItems request as a param
//and return action type (GET_CART_ITEMS_FAIL) and this payload
export const getCartItemsFail = payload => dispatch => {
  return dispatch({
    type: GET_CART_ITEMS_FAIL,
    payload
  });
};

//send post request to profile API with language as params
export const getCartItems = (language, authorization) => dispatch => {
  return fetch(process.env.endpoint + "/api/cart-items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization
    },
    body: JSON.stringify({ language: language })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getCartItemsSuccess(data));
        dispatch(updateCartHeader(data));
        // dispatch(checkMeasurments(data.items))

        // Enable checkout button after updating the size
        let checkoutBtn = document.querySelector('.checkout-btn');
        if(checkoutBtn) {
          checkoutBtn.classList.remove('disabled');
        }
      } else {
        dispatch(getCartItemsFail(data));
      }
    })
    .catch(err => {
      dispatch(
        getCartItemsFail({
          status: false,
          message: "Error in loading cart items from catch"
        })
      );
    });
};

export const getCartItemsFromLocalStorage = () => dispatch => {
  let localCartItems = { products: [] };

  if (localStorage.getItem("uc")) {
    localCartItems = JSON.parse(localStorage.getItem("uc"));
    // dispatch(updateCartHeader(localCartItems.products))
  } else {
    localStorage.setItem("uc", JSON.stringify({ products: [] }));
  }

  return dispatch({
    type: GET_CART_ITEMS_FROM_LOCAL_STORAGE,
    payload: localCartItems
  });
};

export const deleteCartItemsFromLocalStorage = () => dispatch => {
  let localCartItems = { products: [] };

  if (localStorage.getItem("uc")) {
    localStorage.setItem("uc", JSON.stringify({ products: [] }));
  } else {
    localStorage.setItem("uc", JSON.stringify({ products: [] }));
  }

  return dispatch({
    type: DELETE_CART_ITEMS_FROM_LOCAL_STORAGE,
    payload: localCartItems
  });
};

export const updateErrMsgStatus = status => dispatch => {
  return dispatch({
    type: UPDSTE_ERR_MSG_STATUS,
    status
  });
};

export const updateMeasurementsIsComplateStatus = status => dispatch => {
  return dispatch({
    type: UPDATE_MEASUREMENTS_IS_COMPLATE_STATUS,
    status
  });
};

// export const checkMeasurments = items => dispatch => {
//     console.log("checkMeasurments");
//     if (items.length > 0) {
//       console.log("inside if");
//       console.log("items.length > 0");
//       // items.some(item => {
//         // console.log("item.selectedSize ")
//         // console.log(item.selectedSize);
//         // console.log("item.sizeType " + item.sizeType)
//         // console.log("item.sizeManFlag " + item.sizeManFlag)
//         // if (
//         //   item.sizeType == "sizeable" &&
//         //   item.selectedSize.name &&
//         //   item.sizeManFlag == true
//         // ) {
//         //   console.log(
//         //     "item.sizeType=='sizeable' && item.selectedSize.name == undefined && item.sizeManFlag == true"
//         //   );
//         //   dispatch(updateMeasurementsIsComplateStatus(true));
//         // } else if (
//         //   item.sizeType == "sizeable" &&
//         //   item.selectedSize.name != undefined &&
//         //   item.sizeManFlag == false &&
//         //   item.selectedSize.complete == true
//         // ) {
//         //   console.log(
//         //     "item.sizeType=='sizeable' && item.selectedSize.name != undefined && item.sizeManFlag == false && item.selectedSize.complete == true"
//         //   );
//         //   dispatch(updateMeasurementsIsComplateStatus(true));
//         // } else if (item.sizeType == "accessories") {
//         //   console.log("item.sizeType == 'accessories'");
//         //   dispatch(updateMeasurementsIsComplateStatus(true));
//         // } else if (
//         //   item.sizeType == "shoes" &&
//         //   item.selectedSize.name != undefined
//         // ) {
//         //   console.log("item.sizeType == 'shoes' && item.selectedSize.name != undefined");
//         //   dispatch(updateMeasurementsIsComplateStatus(true));
//         // } else if (
//         //   item.sizeType == "shoes" &&
//         //   item.selectedSize.name == undefined
//         // ) {
//         //   console.log(
//         //     "item.sizeType == 'shoes' && item.selectedSize.name == undefined"
//         //   );
//         //   dispatch(updateMeasurementsIsComplateStatus(false));
//         //   return true;
//         // } else if (
//         //   item.sizeType == "sizeable" &&
//         //   item.selectedSize.name == undefined &&
//         //   item.sizeManFlag == false
//         // ) {
//         //   console.log(
//         //     "item.sizeType=='sizeable' && item.selectedSize.name == undefined && item.sizeManFlag == false"
//         //   );
//         //   dispatch(updateMeasurementsIsComplateStatus(false));
//         //   return true;
//         // } else if (
//         //   item.sizeType == "sizeable" &&
//         //   item.selectedSize.name != undefined &&
//         //   item.sizeManFlag == false &&
//         //   item.selectedSize.complete == false
//         // ) {
//         //   console.log(
//         //     "item.sizeType=='sizeable' && item.selectedSize.name != undefined && item.sizeManFlag == false && item.selectedSize.complete == false"
//         //   );
//         //   dispatch(updateMeasurementsIsComplateStatus(false));
//         //   return true;
//         // }
//       // });

//       for(var i = 0; i < items.length; i++){
//         console.log("item.selectedSize")
//         console.log(items[i].selectedSize);
//         console.log("item.sizeType " + items[i].sizeType)
//         console.log("item.sizeManFlag " + items[i].sizeManFlag)
//         if (items[i].sizeType == "sizeable" && items[i].selectedSize.name && items[i].sizeManFlag == true) {
//           console.log(i);

//           console.log("item.sizeType=='sizeable' && item.selectedSize.name == undefined && item.sizeManFlag == true");
//           dispatch(updateMeasurementsIsComplateStatus(true));
//         } else if (items[i].sizeType == "sizeable" && items[i].selectedSize.name != undefined && items[i].sizeManFlag == false && items[i].selectedSize.complete == true) {
//           console.log(i);
//           console.log("item.sizeType=='sizeable' && item.selectedSize.name != undefined && item.sizeManFlag == false && item.selectedSize.complete == true");
//           dispatch(updateMeasurementsIsComplateStatus(true));
//         } else if (items[i].sizeType == "accessories") {
//           console.log(i);
//           console.log("item.sizeType == 'accessories'");
//           dispatch(updateMeasurementsIsComplateStatus(true));
//         } else if (items[i].sizeType == "shoes" && items[i].selectedSize.name != undefined) {
//           console.log(i);
//           console.log("item.sizeType == 'shoes' && item.selectedSize.name != undefined");
//           dispatch(updateMeasurementsIsComplateStatus(true));
//         } else if (items[i].sizeType == "shoes" && items[i].selectedSize.name == undefined) {
//           console.log(i);
//           console.log("item.sizeType == 'shoes' && item.selectedSize.name == undefined");
//           dispatch(updateMeasurementsIsComplateStatus(false));
//           // break;
//         } else if (items[i].sizeType == "sizeable" && items[i].selectedSize.name == undefined && items[i].sizeManFlag == false) {
//           console.log(i);
//           console.log("item.sizeType=='sizeable' && item.selectedSize.name == undefined && item.sizeManFlag == false");
//           dispatch(updateMeasurementsIsComplateStatus(false));
//           // break;
//         } else if (items[i].sizeType == "sizeable" && items[i].selectedSize.name != undefined && items[i].sizeManFlag == false && items[i].selectedSize.complete == false) {
//           console.log(i);
//           console.log("item.sizeType=='sizeable' && item.selectedSize.name != undefined && item.sizeManFlag == false && item.selectedSize.complete == false");
//           dispatch(updateMeasurementsIsComplateStatus(false));
//           // break;
//         }else{
//           console.log(i);
//           console.log("else");
//         }
//       }
//     }
//   };

export const updateIsLoadingStatus = status => dispatch => {
  return dispatch({
    type: UPDATE_IS_LOADING_STATUS,
    status
  });
};

export const updateRedirectToChechout = status => dispatch => {
  return dispatch({
    type: UPDATE_REDIRECT_TO_CHECKOUT,
    status
  });
};

export const clearCart = () => dispatch => {
  return dispatch({
    type: CLEAR_CART
  });
};
