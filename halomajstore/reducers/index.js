import { combineReducers } from "redux";
import LocationReducer from './LocationReducer';
import MajstorsReducer from "./MajstorsReducer";
import MajstorReducer from "./MajstorReducer";
export default combineReducers({
  location: LocationReducer,
  majstori: MajstorsReducer,
  majstor: MajstorReducer,
});
