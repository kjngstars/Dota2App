import React from "react";
import { connectStyle } from "@shoutem/theme";
import { View, Icon, TouchableOpacity} from "@shoutem/ui";

import ScreenTypes from "../navigators/ScreenTypes";
import {
  toggleDrawer,
  navigateToMenuScreen
} from "../actions/NavigationAction";

const RightHeader = ({ navigation }) => (
  <View styleName="horizontal space-between">
    <TouchableOpacity onPress={() => navigation.dispatch(navigateToMenuScreen(ScreenTypes.MatchSearch))} style={{marginRight: 5}}>
      <Icon name="search" style={{ color: "#FFFFFF" }} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.dispatch(toggleDrawer())}>
      <Icon name="sidebar" style={{ color: "#FFFFFF" }} />
    </TouchableOpacity>
  </View>
);

export default RightHeader;
