import {
    UPDATE_BREADCRUMB_SUCCESS
  } from "../../actions/actions-types";
  
  const breadcrumbtInitialState = {
    breadcrumbNew: []
  };
  
  export default function(state = breadcrumbtInitialState, action) {
    switch (action.type) {

      case UPDATE_BREADCRUMB_SUCCESS:
        return {
          ...state,
          breadcrumbNew: action.breadcrumbNew
        };
      default:
        return state;
    }
  }
  