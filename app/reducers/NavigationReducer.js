import initialState from "./InitialState";
import * as ActionTypes from "../actions/ActionTypes";
import RootNavigator from "../navigators/RootNavigator";
import { NavigationActions } from "react-navigation";

const navigationReducer = (state = initialState.navigationState, action) => {
  //console.log("received action: " + JSON.stringify(action));
  //console.log("initial state: " + JSON.stringify(state));

  if (action.type === ActionTypes.REDUX_INIT) {
    return state;
  }

  let newState = RootNavigator.router.getStateForAction(action, state);
  //console.log("new state reducer: " + JSON.stringify(newState));
  return newState || state;
};

export default navigationReducer;
