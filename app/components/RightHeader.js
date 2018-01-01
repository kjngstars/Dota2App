import React from "react";
import { connectStyle } from "@shoutem/theme";
import { View, Icon, TouchableOpacity } from "@shoutem/ui";

import Ripple from "react-native-material-ripple";

import ScreenTypes from "../navigators/ScreenTypes";
import {
  toggleDrawer,
  navigateToMenuScreen
} from "../actions/NavigationAction";

const RightHeader = ({ navigation }) => (
  <View styleName="horizontal space-between">
    <Ripple
      rippleContainerBorderRadius={15}
      onPress={() =>
        navigation.dispatch(navigateToMenuScreen(ScreenTypes.MatchSearch))
      }
      style={{ marginRight: 5 }}
    >
      <View
        styleName="horizontal h-center v-center"
        style={{ width: 30, height: 30 }}
      >
        <Icon name="search" style={{ color: "#FFFFFF" }} />
      </View>
    </Ripple>
    <Ripple
      rippleContainerBorderRadius={15}
      onPress={() => navigation.dispatch(toggleDrawer())}
    >
      <View
        styleName="horizontal h-center v-center"
        style={{ width: 30, height: 30 }}
      >
        <Icon name="sidebar" style={{ color: "#FFFFFF" }} />
      </View>
    </Ripple>
  </View>
);

export default RightHeader;
