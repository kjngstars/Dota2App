import { TabNavigator} from "react-navigation";
import HeroStatProfessional from "../containers/HeroStatProfessional";
import HeroStatPublic from "../containers/HeroStatPublic";
import tabConfig from "./TabConfig";
import ScreenTypes from "./ScreenTypes";

const HeroStats = TabNavigator(
  {
    [ScreenTypes.HeroStatPro]: {
      screen: HeroStatProfessional
    },  
    [ScreenTypes.HeroStatPublic]: {
      screen: HeroStatPublic
    } 
  },
  Object.assign({}, tabConfig, { initialRouteName: ScreenTypes.HeroStatPro, lazy: false })
);

export default HeroStats;
