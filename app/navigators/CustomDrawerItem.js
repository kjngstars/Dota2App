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

const CustomDrawerItem = ({ style, styleName, route, onPress }) => (
  <TouchableOpacity
    style={style.item}
    styleName={styleName}
    onPress={onPress}
  >
    <Title style={style.title} styleName={styleName}>
      {route.name}
    </Title>
  </TouchableOpacity>
);

export default CustomDrawerItem;
