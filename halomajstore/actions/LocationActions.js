import {
    GET_LOCATION,
} from './types';


export const setLocation = (location) => {
    return {
        type: GET_LOCATION,
        payload: location,
      };
}
