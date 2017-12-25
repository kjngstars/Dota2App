import React, { Component } from "react";
import { View, Text, Title, Image, TouchableOpacity } from "@shoutem/ui";

import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";

const Header = ({ headers, style }) => {
  return (
    <View style={style.header}>
      {headers.map(header => {
        return (
          <View key={header} style={{ flex: 1 }}>
            <TouchableOpacity>
              <Text style={{ color: "#fff", marginRight: 5 }}>{header}</Text>
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
    }
  };

export default connectStyle("dota2app.Header", styles)(Header);
