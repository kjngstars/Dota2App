import { StackNavigator, TabNavigator } from "react-navigation";
import HighMMR from "../containers/HighMMR";
import LowMMR from "../containers/LowMMR";
import Professional from "../containers/Professional";
import MatchOverview from "../containers/MatchOverview";
import tabConfig from "./TabConfig";
import stackConfig from "./StackConfig";
import ScreenTypes from "./ScreenTypes";

const MatchCategory = TabNavigator(
  {
    Professional: {
      screen: Professional
    },
    HighMMR: {
      screen: HighMMR
    },
    LowMMR: {
      screen: LowMMR
    }
  },
  Object.assign({}, tabConfig, { initialRouteName: ScreenTypes.Professional })
);

const MatchDetails = TabNavigator(
  {
    [ScreenTypes.MatchOverview.screen]: {
      screen: MatchOverview
    }
  },
  tabConfig
);

const MatchNavigator = StackNavigator(
  {
    MatchCategory: {
      screen: MatchCategory,
      navigationOptions:  ({ navigation }) => ({
        
      })
    },
    MatchDetail: {
      screen: MatchDetails
    }
  },
  Object.assign({}, stackConfig, {
    initialRouteName: ScreenTypes.MatchCategory,
    headerMode: "none"
  })
);

export default MatchNavigator;
