import React from "react";
import { connectStyle } from "@shoutem/theme";
import {
  View,
  NavigationBar,
  Title,
  Text,
  Heading,
  Icon,
  TouchableOpacity
} from "@shoutem/ui";

import ScreenTypes from "../navigators/ScreenTypes";
import {
  toggleDrawer,
  navigateToMenuScreen
} from "../actions/NavigationAction";

export const Left = ({ icon, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name={icon} style={{ color: "#FFFFFF" }} />
  </TouchableOpacity>
);

export const Center = ({ title }) => (
  <Title styleName="bold" style={{ color: "#FFFFFF" }}>
    {title}
  </Title>
);

export const Right = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.dispatch(toggleDrawer())}>
    <Icon name="sidebar" style={{ color: "#FFFFFF" }} />
  </TouchableOpacity>
);

const CommonNavBar = ({ style, navigation, left, right, center }) => (
  <View style={style.container} styleName="sm-gutter-left sm-gutter-right">
    <View>{left}</View>
    <View style={style.itemCenter}>{center}</View>
    <View>{right}</View>
  </View>
);

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    maxHeight: 40,
    backgroundColor: "#252525"
  },
  itemCenter: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  title: {
    color: "#FFFFFF"
  },
  "shoutem.ui.Title": {
    color: "#FFFFFF"
  }
};

const CommonNavBarWithTheme = connectStyle("dota2app.CommonNavBar", styles)(
  CommonNavBar
);

export const DefaultNavigationBar = ({
  leftIcon,
  leftAction,
  navigation,
  title
}) => (
  <CommonNavBarWithTheme
    left={<Left icon={leftIcon} onPress={leftAction} />}
    right={<Right navigation={navigation} />}
    center={<Center title={title} />}
  />
);

export const NavigationBarWithMatchSearch = ({ navigation, title }) => (
  <CommonNavBarWithTheme
    left={
      <Left
      icon="search"
      onPress={() =>
          navigation.dispatch(navigateToMenuScreen(ScreenTypes.MatchSearch))
        }
      />
    }
    right={<Right navigation={navigation} />}
    center={<Center title={title} />}
  />
);

export default CommonNavBarWithTheme;
