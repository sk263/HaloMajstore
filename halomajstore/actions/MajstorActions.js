import { SET_CATEGORY, SET_LOCAL, SET_MAJSTOR } from './types';
import { Actions } from 'react-native-router-flux';

export const updateLocal = (cat, maj) => {
    return dispatch => {
        dispatch({ type: SET_CATEGORY, payload: cat });
        dispatch({ type: SET_LOCAL, payload: maj });
        Actions.list();
    };
}

export const setMajstor = (majstor) => {
    return dispatch => {
        dispatch({ type: SET_MAJSTOR, payload: majstor });
        Actions.info();
    };
}