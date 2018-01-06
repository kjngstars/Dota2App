import RootNavigator from "../navigators/RootNavigator";
import ScreenTypes from "../navigators/ScreenTypes";
import { NavigationActions } from "react-navigation";

//RootNavigator.router.getActionForPathAndParams(ScreenTypes.Home)
export default {
  navigationState: RootNavigator.router.getStateForAction(
    NavigationActions.init()
  ),
  matchDetails: {
    isRefreshingMatchDetails: false,
    isLoadingMatchDetails: false,
    isEmptyMatchDetails: false,
    matchDetails: {}
  },
  proMatches: {
    isRefreshingProMatches: false,
    isLoadingProMatches: false,
    isEmptyProMatches: false,
    proMatches: {}
  },
  highMMRMatches: {
    isRefreshingHighMMRMatches: false,
    isLoadingHighMMRMatches: false,
    isEmptyHighMMRMatches: false,
    highMMRMatches: {}
  },
  lowMMRMatches: {
    isRefreshingLowMMRMatches: false,
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
    isRefreshingHeroStats: false,
    isLoadingHeroStats: false,
    isEmptyHeroStats: false,
    heroStats: []
  },
  heroData: {},
  heroRanking:{
    isRefreshingHeroRanking: false,
    isLoadingHeroRanking: false,
    isEmptyHeroRanking: false,
    heroRanking: []
  },
  durationRecord: {
    isRefreshingDurationRecord: false,
    isLoadingDurationRecord: false,
    isEmptyDurationRecord: false,
    durationRecords: []
  },
  killsRecord: {
    isRefreshingKillsRecord: false,
    isLoadingKillsRecord: false,
    isEmptyKillsRecord: false,
    killsRecords: []
  },
  deathsRecord: {
    isRefreshingDeathsRecord: false,
    isLoadingDeathsRecord: false,
    isEmptyDeathsRecord: false,
    deathsRecords: []
  },
  assistsRecord: {
    isRefreshingAssistsRecord: false,
    isLoadingAssistsRecord: false,
    isEmptyAssistsRecord: false,
    assistsRecords: []
  },
  gpmRecord: {
    isRefreshingGPMRecord: false,
    isLoadingGPMRecord: false,
    isEmptyGPMRecord: false,
    gpmRecords: []
  },
  xpmRecord: {
    isRefreshingXPMRecord: false,
    isLoadingXPMRecord: false,
    isEmptyXPMRecord: false,
    xpmRecords: []
  },
  lhRecord: {
    isRefreshingLHRecord: false,
    isLoadingLHRecord: false,
    isEmptyLHRecord: false,
    lhRecords: []
  },
  dnRecord: {
    isRefreshingDNRecord: false,
    isLoadingDNRecord: false,
    isEmptyDNRecord: false,
    dnRecords: []
  },
  hdRecord: {
    isRefreshingHDRecord: false,
    isLoadingHDRecord: false,
    isEmptyHDRecord: false,
    hdRecords: []
  },
  tdRecord: {
    isRefreshingTDRecord: false,
    isLoadingTDRecord: false,
    isEmptyTDRecord: false,
    tdRecords: []
  },
  hhRecord: {
    isRefreshingHHRecord: false,
    isLoadingHHRecord: false,
    isEmptyHHRecord: false,
    hhRecords: []
  },
  topStreamer: {
    isRefreshingTopStreamer: false,
    isLoadingTopStreamer: false,
    isEmptyTopStreamer: false,
    topStreamers: {}
  },
  topLiveGame: {
    isRefreshingTopLiveGame: false,
    isLoadingTopLiveGame: false,
    isEmptyTopLiveGame: false,
    topLiveGames: []
  },
  playerInfo: {
    isRefreshingPlayerInfo: false,
    isLoadingPlayerInfo: false,
    isEmptyPlayerInfo: false,
    playerInfo: []
  },
};
