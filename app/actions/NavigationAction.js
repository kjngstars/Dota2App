import { NavigationActions } from "react-navigation";
import * as ActionType from "./ActionTypes";
import ScreenTypes from "../navigators/ScreenTypes";

export function navigateToMatchScreen(params) {
  const action = NavigationActions.navigate({
    routeName: ScreenTypes.Match,
    params: params
  });

  return action;
}

export function navigateToMenuScreen(routeName, params, subAction) {
  const action = NavigationActions.navigate({
    routeName: routeName,
    params: params,
    action: subAction
  });

  return action;
}

export function goBack(routeName){
  const action = NavigationActions.back({
    key: routeName,    
  });

  return action;
}

export function toggleDrawer(){
  const action = NavigationActions.navigate({routeName:'DrawerToggle'});
  return action;
}
