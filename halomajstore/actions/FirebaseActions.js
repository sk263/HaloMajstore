import {
    GET_MAJSTORS,
    FETCH_START,
    GET_LOCAL_MAJSTORS 
} from './types';

import firebase from "firebase";

export const getMajstors = () => {
    return dispatch => {
        dispatch({ type: FETCH_START });
        firebase
          .database()
          .ref(`/majstori`)
          .on("value", snapshot => {
              console.log(snapshot.val());
            dispatch({ type: GET_MAJSTORS, payload: snapshot.val() });
          });
      };
}
export const setLocalMajstor = (tmp) => {
    return {
        type: GET_LOCAL_MAJSTORS,
        payload: tmp,
      };
}
