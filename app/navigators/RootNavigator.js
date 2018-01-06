import React from "react";
import Start from "../containers/Start";

import screenTypes from "./ScreenTypes";
import { DrawerNavigator, StackNavigator } from "react-navigation";

import stackConfig from "./StackConfig";

import CustomDrawer from "./CustomDrawer";
import MatchNavigator, { MatchDetails } from "./MatchNavigator";
import SearchForMatch from "../containers/SearchForMatch";
import PlayerSearch from "../containers/PlayerSearch";
import HeroStatNavigator from "../navigators/HeroStatNavigator";
import HeroDetailsNavigator from "../navigators/HeroDetailsNavigator";
import RecordsNavigator from "../navigators/RecordsNavigator";
import PlayerOverview from "../containers/PlayerOverview";
import ScreenTypes from "./ScreenTypes";

const RootStack = StackNavigator(
  {
    Home: {
      screen: Start
    },
    Matches: {
      screen: MatchNavigator
    },
    MatchSearch: {
      screen: SearchForMatch
    },
    PlayerSearch: {
      screen: PlayerSearch
    },
    [screenTypes.HeroStats]: {
      screen: HeroStatNavigator
    },
    [screenTypes.HeroDetails]: {
      screen: HeroDetailsNavigator
    },
    [screenTypes.Records]: {
      screen: RecordsNavigator
    },
    [ScreenTypes.MatchDetail]: {
      screen: MatchDetails
    },
    [ScreenTypes.PlayerOverview]: {
      screen: PlayerOverview
    }
  },
  Object.assign({}, stackConfig, {
    initialRouteName: screenTypes.Home,
    initialRouteParams: {
      stackCounts: 1
    }
  })
);

const RootNavigator = DrawerNavigator(
  {
    App: {
      screen: RootStack
    }
  },
  {
    contentComponent: props => <CustomDrawer {...props} />
  }
);

export default RootNavigator;
