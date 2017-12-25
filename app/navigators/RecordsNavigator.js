import { TabNavigator } from "react-navigation";

import DurationRecord from "../containers/DurationRecord";

import tabConfig from "./TabConfig";
import ScreenTypes from "./ScreenTypes";

const Records = TabNavigator(
  {
    [ScreenTypes.DurationRecord]: {
      screen: DurationRecord
    },    
  },
  Object.assign({}, tabConfig, { initialRouteName: ScreenTypes.DurationRecord })
);

export default Records;
