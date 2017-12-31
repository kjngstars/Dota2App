import React, { Component } from "react";
import { View, Image, Title, Icon } from "@shoutem/ui";
import Ripple from "react-native-material-ripple";

import Line from "../components/Line";
import themeColors from "../themes/colors";

const SectionHeader = ({ imgUrl, title, rightIcon, rightIconOnPress }) => {
  return (
    <View styleName="vertical" style={{ height: 50 }}>
      <View
        styleName="horizontal h-start v-end"
        style={{ marginTop: 10, marginBottom: 5 }}
      >
        <Image source={imgUrl} styleName="extra-small" />
        <Title styleName="sm-gutter-left" style={{ color: themeColors.white }}>
          {title}
        </Title>
        {rightIcon && (
          <View style={{ flex: 1 }} styleName="horizontal h-end v-center">
            <Ripple onPress={rightIconOnPress}>
              <Icon name={rightIcon} style={{ color: themeColors.white }} />
            </Ripple>
          </View>
        )}
      </View>
      <Line />
    </View>
  );
};

export default SectionHeader;
