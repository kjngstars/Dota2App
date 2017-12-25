import { TabNavigator } from "react-navigation";

import DurationRecord from "../containers/DurationRecord";
import KillsRecord from "../containers/KillsRecord";
import DeathsRecord from "../containers/DeathsRecord";
import AssistsRecord from "../containers/AssistsRecord";
import GPMRecord from "../containers/GPMRecord";
import XPMRecord from "../containers/XPMRecord";

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
    [ScreenTypes.DeathsRecord]: {
      screen: DeathsRecord
    },
    [ScreenTypes.AssistsRecord]: {
      screen: AssistsRecord
    },
    [ScreenTypes.GPMRecord]: {
      screen: GPMRecord
    },
    [ScreenTypes.XPMRecord]: {
      screen: XPMRecord
    }
  },
  Object.assign({}, tabConfig, {
    initialRouteName: ScreenTypes.DurationRecord,
    tabBarOptions: {
      activeTintColor: "#FFFFFF",
      style: {
        backgroundColor: "#192023"
      },
      labelStyle : {
        fontSize: 12
      }
    }
  })
);

export default Records;
