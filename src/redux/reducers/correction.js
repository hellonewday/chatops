import { SPELL_CORRECTION_RECEIVED } from "../actions/constants";

let initialState = {
  correction: {},
};

const correctReducer = (state = initialState, action) => {
  switch (action.type) {
    case SPELL_CORRECTION_RECEIVED:
      return { ...state, correction: action.response };

    default:
      return state;
  }
};

export default correctReducer;
