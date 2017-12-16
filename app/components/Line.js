import React from "react";
import { View } from "react-native";
import { Li } from "@shoutem/ui/html";

export default (Line = ({ color = "#FFFFFF", width = 1, }) => (
  <View
    style={{
      borderBottomColor: color,
      borderBottomWidth: width,      
    }}
  />
));
