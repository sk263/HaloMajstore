import {
    GET_LOCATION,
  } from "../actions/types";
  
  const INITAL_STATE = {
    location: null,
  };
  
  export default (state = INITAL_STATE, action) => {
    switch (action.type) {
      case GET_LOCATION:
        return { ...state, location: action.payload };
      default:
        return state;
    }
  };
  