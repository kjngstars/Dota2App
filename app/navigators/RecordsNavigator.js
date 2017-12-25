import { TabNavigator } from "react-navigation";

import DurationRecord from "../containers/DurationRecord";
import KillsRecord from "../containers/KillsRecord";

import tabConfig from "./TabConfig";
import ScreenTypes from "./ScreenTypes";

const Records = TabNavigator(
  {
    [ScreenTypes.DurationRecord]: {
      screen: DurationRecord
    },    
    [ScreenTypes.KillsRecord]: {
      screen: KillsRecord
    },  
  },
  Object.assign({}, tabConfig, { initialRouteName: ScreenTypes.DurationRecord })
);

export default Records;
