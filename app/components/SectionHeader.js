import React, { Component } from "react";
import {
  View,
  Image,
  Title,
} from "@shoutem/ui";
import Line from "../components/Line";

import themeColors from "../themes/colors";

const SectionHeader = ({ imgUrl, title }) => {
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
        </View>
        <Line />
      </View>
    );
  };

  export default SectionHeader;