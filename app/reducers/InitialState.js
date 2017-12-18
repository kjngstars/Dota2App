import RootNavigator from "../navigators/RootNavigator";
import ScreenTypes from "../navigators/ScreenTypes";
import { NavigationActions } from "react-navigation";

//RootNavigator.router.getActionForPathAndParams(ScreenTypes.Home)
export default {
  navigationState: RootNavigator.router.getStateForAction(
    NavigationActions.init()
  ),
  matchDetails: {
    isLoadingMatchDetails: false,
    isEmptyMatchDetails: false,
    matchDetails: {}
  },
  proMatches: {
    isLoadingProMatches: false,
    isEmptyProMatches: false,
    proMatches: {}
  },
  highMMRMatches: {
    isLoadingHighMMRMatches: false,
    isEmptyHighMMRMatches: false,
    highMMRMatches: {}
  },
  lowMMRMatches: {
    isLoadingLowMMRMatches: false,
    isEmptyLowMMRMatches: false,
    lowMMRMatches: {}
  },
  playerSearchResults: {
    isSearchingPlayers: false,
    isEmptyPlayerResults: false,
    playerResults: []
  },
  heroStats:{
    isLoadingHeroStats: false,
    isEmptyHeroStats: false,
    heroStats: []
  },
  heroData: {},
  heroRanking:{
    isLoadingHeroRanking: false,
    isEmptyHeroRanking: false,
    heroRanking: []
  },
  
};
