import React, { Component } from "react";
import defaultHeaderStyle from "../components/defaultHeaderStyle";
import LeftHeader from "../components/LeftHeader";
import RightHeader from "../components/RightHeader";


const headerTitleStyle = {
  alignSelf: "center", 
  color: "#fff",
}


export default {
  headerMode: "screen",
  navigationOptions: ({ navigation }) => ({
    headerStyle: defaultHeaderStyle,
    headerTitleStyle: headerTitleStyle,
    //headerLeft: <LeftHeader navigation={navigation} />,
    headerRight: <RightHeader navigation={navigation} />,
    headerTintColor: "#fff",    
  })
};
