import React, { Component } from "react";
import { View, Text, Title, Image, TouchableOpacity } from "@shoutem/ui";

import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";

const Header = ({ headers, style, contentStyle, headerStyle, fontSize = 13 }) => {
  return (
    <View style={Object.assign({},style.header, headerStyle)}>
      {headers.map(header => {
        return (
          <View key={header} style={contentStyle ? contentStyle : style.content}>
            <TouchableOpacity>
              <Text style={{ color: "#fff", marginRight: 5, fontSize: fontSize }}>{header}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = {    
    header: {       
      flexDirection: "row",
      alignItems: "center",
      height: 40,
      backgroundColor: "rgba(0,0,0,0.3)"
    },
    content: {
      flex: 1
    }
  };

export default connectStyle("dota2app.Header", styles)(Header);
