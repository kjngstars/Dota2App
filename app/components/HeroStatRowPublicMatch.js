import React, { Component } from "react";
import { View, Image, Text, Icon, Title, TouchableOpacity } from "@shoutem/ui";
import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";
import PercentStat from "../components/PercentStat";

import { dimensionRelativeToIphone } from "@shoutem/ui/theme";
const DRTI = dimensionRelativeToIphone;

export const HERO_STAT_ROW_HEIGHT = 50;

const HeroStatRowPublicMatch = ({ style, heroStat, index }) => {
  let style_name = "horizontal even";
  let content = <View />;
  if (index % 2) {
    style_name = "horizontal odd";
  }

  return (
    <View styleName={style_name} style={style.container}>
      <View style={style.hero}>
        <Image source={heroStat.heroImg} style={style.heroAvatar} />
        <View styleName="horizontal h-start v-center">
          <Text style={{ fontSize: 12, color: themeColors.action }}>
            {heroStat.heroName}
          </Text>
          <Icon
            name="right-arrow"
            style={{ fontSize: 14, color: themeColors.action }}
          />
        </View>
      </View>
      <View style={style.statContainer}>
        <View style={style.stat}>
          <Text style={{ color: "#fff", marginRight: 5 }}>
            {heroStat.pickRate}
          </Text>
          <Text style={{ fontSize: 13 }}>{heroStat.pickMatches}</Text>
        </View>
        <PercentStat percent={heroStat.pickRate} />
      </View>
      <View style={style.statContainer}>
        <View style={style.stat}>
          <Text style={{ color: "#fff", marginRight: 5 }}>
            {heroStat.winRate}
          </Text>
          <Text style={{ fontSize: 13 }}>{heroStat.winMatches}</Text>
        </View>
        <PercentStat percent={heroStat.winRate} />
      </View>      
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    height: HERO_STAT_ROW_HEIGHT,
    ".odd": {
      backgroundColor: themeColors.backgroundTableOdd
    },
    ".even": {
      backgroundColor: themeColors.backgroundTableEven
    }
  },
  hero: {
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  statContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingRight: 5
  },
  stat: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  heroAvatar: {
    width: DRTI(50),
    height: DRTI(28)
  }
};

export default connectStyle("dota2app.HeroStatRowPublicMatch", styles)(
  HeroStatRowPublicMatch
);
