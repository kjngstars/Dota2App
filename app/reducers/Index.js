import { combineReducers } from "redux";
import nav from "./NavigationReducer";
import matchDetailsState from './MatchDetailsReducer';
import proMatchesState from './ProMatchReducer';
import highMMRMatchesState from "./HighMMRMatchReducer";
import lowMMRMatchesState from "./LowMMRMatchReducer";
import playerResultsState from "./PlayerSearchReducer";
import heroStatsState from "./HeroStatReducer";
import heroRankingState from "./HeroRankingReducer";
import heroOverviewState from "./HeroOverviewReducer";
import durationRecordsState from "./DurationRecordReducer";
import killsRecordsState from "./KillsRecordReducer";
import deathsRecordState from "./DeathsRecordReducer";
import assistsRecordState from "./AssistsRecordReducer";
import gpmRecordState from "./GPMRecordReducer";
import xpmRecordState from "./XPMRecordReducer";

const rootReducer = combineReducers({
  nav,
  matchDetailsState,
  proMatchesState,
  highMMRMatchesState,
  lowMMRMatchesState,
  playerResultsState,
  heroStatsState,
  heroRankingState,
  heroOverviewState,
  durationRecordsState,
  killsRecordsState,
  deathsRecordState,
  assistsRecordState,
  gpmRecordState,
  xpmRecordState,
});

export default rootReducer;
