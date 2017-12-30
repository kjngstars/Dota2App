import React, { Component } from "react";
import { View } from "@shoutem/ui";
import Spinner from "react-native-spinkit";

const Loading = ({ type = "9CubeGrid" }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Spinner size={45} type={type} color="#fff" />
  </View>
);

export default Loading;
