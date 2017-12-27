import React, { Component } from "react";
import { View, Text, Title, Image, TouchableOpacity } from "@shoutem/ui";

import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";

import { dimensionRelativeToIphone } from "@shoutem/ui/theme";
const DRTI = dimensionRelativeToIphone;

const Header = ({
  headers,
  style,
  contentStyle,
  headerStyle,
  fontSize = 13
}) => {
  return (
    <View style={Object.assign({}, style.headerContainer, headerStyle)}>
      {headers.map(header => {
        let img = <View />;

        if (header.image) {
          img = (
            <Image
              source={header.image}
              style={{ width: DRTI(17), height: DRTI(12), marginRight: 2 }}
            />
          );
        }

        return (
          <View
            key={header.title}
            style={contentStyle ? contentStyle : style.content}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              {img}
              <Text
                style={Object.assign({}, style.headerText, {
                  fontSize: fontSize,
                  ...header.style
                })}
              >
                {header.title}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = {
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  content: {
    flex: 1
  },
  headerText: {
    color: "#fff",
    marginRight: 5
  }
};

export default connectStyle("dota2app.Header", styles)(Header);
