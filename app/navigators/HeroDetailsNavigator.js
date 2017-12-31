import { TabNavigator } from "react-navigation";
import HeroRankings from "../containers/HeroRankings";
import HeroOverview from "../containers/HeroOverview";
import tabConfig from "./TabConfig";
import ScreenTypes from "./ScreenTypes";

const HeroDetails = TabNavigator(
  {
    [ScreenTypes.HeroOverview]: {
      screen: HeroOverview
    },
    [ScreenTypes.HeroRanking]: {
      screen: HeroRankings
    }
  },
  Object.assign({}, tabConfig, {
    initialRouteName: ScreenTypes.HeroOverview
  })
);

export default HeroDetails;
