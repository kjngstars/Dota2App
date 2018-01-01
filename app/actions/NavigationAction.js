import { NavigationActions } from "react-navigation";
import * as ActionType from "./ActionTypes";
import ScreenTypes from "../navigators/ScreenTypes";

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

export function setParams(data, routeKey){
  const action = NavigationActions.setParams({
    params: data,
    key: routeKey
  });

  return action;
}