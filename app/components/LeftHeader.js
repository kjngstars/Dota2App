import React, { Component } from "react";
import { Icon, TouchableOpacity } from "@shoutem/ui";
import { goBack } from "../actions/NavigationAction";

const LeftHeader = ({ navigation }) => {
  return (
    <TouchableOpacity      
      onPress={() => navigation.dispatch(goBack())}
    >
      <Icon name="left-arrow" style={{ color: "#fff" }} />
    </TouchableOpacity>
  );
};

export default LeftHeader;
