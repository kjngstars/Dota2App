import React, { Component } from "react";
import {
  Screen,
  View,
  ListView,
  Title,
  Heading,
  Divider,
  TouchableOpacity,
  Text
} from "@shoutem/ui";

import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";
import Ripple from "react-native-material-ripple";

const CustomDrawerItem = ({ isActive, route, onPress, style }) => (
  <View style={style.container}>
    <Ripple
      onPress={onPress}
      style={isActive ? style.activeMenuItem : style.menuItem}
    >
      <Title style={isActive ? style.activeTitle : style.title}>
        {route.name}
      </Title>
    </Ripple>
  </View>
);

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  menuItem: {
    flex: 1,
    maxHeight: 50,
    justifyContent: "center",
    paddingLeft: 10
  },
  activeMenuItem: {
    flex: 1,
    maxHeight: 50,
    justifyContent: "center",
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderColor: themeColors.action
  },
  title: {
    fontSize: 20,
    color: "#fff"
  },
  activeTitle: {
    fontSize: 20,
    color: themeColors.action
  }
};

export default connectStyle("dota2app.CustomDrawerItem", styles)(
  CustomDrawerItem
);
