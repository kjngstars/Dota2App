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
  durationRecord: {
    isLoadingDurationRecord: false,
    isEmptyDurationRecord: false,
    durationRecords: []
  },
  killsRecord: {
    isLoadingKillsRecord: false,
    isEmptyKillsRecord: false,
    killsRecords: []
  },
  deathsRecord: {
    isLoadingDeathsRecord: false,
    isEmptyDeathsRecord: false,
    deathsRecords: []
  },
  assistsRecord: {
    isLoadingAssistsRecord: false,
    isEmptyAssistsRecord: false,
    assistsRecords: []
  },
  gpmRecord: {
    isLoadingGPMRecord: false,
    isEmptyGPMRecord: false,
    gpmRecords: []
  },
  xpmRecord: {
    isLoadingXPMRecord: false,
    isEmptyXPMRecord: false,
    xpmRecords: []
  },
  lhRecord: {
    isLoadingLHRecord: false,
    isEmptyLHRecord: false,
    lhRecords: []
  },
  dnRecord: {
    isLoadingDNRecord: false,
    isEmptyDNRecord: false,
    dnRecords: []
  },
  hdRecord: {
    isLoadingHDRecord: false,
    isEmptyHDRecord: false,
    hdRecords: []
  },
  tdRecord: {
    isLoadingTDRecord: false,
    isEmptyTDRecord: false,
    tdRecords: []
  },
  hhRecord: {
    isLoadingHHRecord: false,
    isEmptyHHRecord: false,
    hhRecords: []
  },
};
