import {
    CHANGE_LANG
  } from "../../actions/includes/general";
  const generalInitialState = {
    language: true
  };

  export default function(state = generalInitialState, action) {
    switch (action.type) {
      case CHANGE_LANG:
        return {
          ...state,
          language: action.lang
        };
      default:
        return state;
    }
  }
