import {
  GET_HOME_SECTIONS_SUCCESS,
  GET_HOME_SECTIONS_FAIL
} from "../../actions/actions-types";

const sectionsInitialState = {
  language: 2,
  firstSection: {},
  secondSection: {},
  thirdSection: {},
  fourthSection: {},
  sectionsOrder:[],
  status: null,
  message: null
};

export default function(state = sectionsInitialState, action) {
  switch (action.type) {
    case GET_HOME_SECTIONS_SUCCESS:
      return {
        ...state,
        firstSection: action.payload.firstSection,
        secondSection: action.payload.secondSection,
        thirdSection: action.payload.thirdSection,
        fourthSection: action.payload.fourthSection,
        sectionsOrder: action.payload.sectionsOrder,
        status: action.payload.status
      };
    case GET_HOME_SECTIONS_FAIL:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message
      };

    default:
      return state;
  }
}
