import {
    GET_MAJSTORS,
    FETCH_START,
    GET_LOCAL_MAJSTORS,
  } from "../actions/types";
  
  const INITAL_STATE = {
    majstori: [],
    local: [],
    loading: true,
  };
  
  export default (state = INITAL_STATE, action) => {
    switch (action.type) {
      case GET_MAJSTORS:
        return { ...state, majstori: action.payload, loading: false };
    case FETCH_START:
        return { ...state, loading: true };
    case GET_LOCAL_MAJSTORS:
        return { ...state, local: action.payload };
      default:
        return state;
    }
  };
  