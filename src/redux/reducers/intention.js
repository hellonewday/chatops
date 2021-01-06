import { INTENT_DETECTION_RECEIVED } from "../actions/constants";

let initialState = {
  intention: {},
};

const intentReducer = (state = initialState, action) => {
  switch (action.type) {
    case INTENT_DETECTION_RECEIVED:
      return { ...state, intention: action.response };

    default:
      return state;
  }
};

export default intentReducer;
