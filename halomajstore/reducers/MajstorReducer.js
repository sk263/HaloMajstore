import {
    SET_CATEGORY,
    SET_LOCAL,
    SET_MAJSTOR,
  } from "../actions/types";
  
  const INITAL_STATE = {
    local: null,
    category: null,
    majstor: null,
  };
  
  export default (state = INITAL_STATE, action) => {
    switch (action.type) {
      case SET_CATEGORY:
        return { ...state, category: action.payload };
    case SET_LOCAL:
        return { ...state, local: action.payload };
    case SET_MAJSTOR:
        return { ...state, majstor: action.payload };
      default:
        return state;
    }
  };
  