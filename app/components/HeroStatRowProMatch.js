import React, { Component } from "react";
import { View, Image, Text, Icon, Title, TouchableOpacity } from "@shoutem/ui";
import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";
import { dimensionRelativeToIphone } from "@shoutem/ui/theme";
import PercentStat from "../components/PercentStat";

const DRTI = dimensionRelativeToIphone;

export const HERO_STAT_ROW_HEIGHT = 50;

const HeroStatRowProMatch = ({ style, heroStat, index }) => {
  let style_name = "horizontal even";
  let content = <View />;
  if (index % 2) {
    style_name = "horizontal odd";
  }

  return (
    <View styleName={style_name} style={style.container}>
      <View style={style.hero}>
        <Image source={heroStat.heroImg} style={style.heroAvatar} />
        <View styleName="horizontal h-start">
          <Text style={{ fontSize: 12, color: themeColors.action }}>
            {heroStat.heroName}
          </Text>
          <Icon name="right-arrow" style={{ fontSize: 13, color: themeColors.action }}/>
        </View>
      </View>
      <View style={style.statContainer}>
        <View style={style.stat}>
          <Text style={{ color: "#fff", marginRight: 5 }}>
            {heroStat.proP_Percent}
          </Text>
          <Text style={{ fontSize: 13 }}>{heroStat.proP_Matches}</Text>
        </View>
        <PercentStat percent={heroStat.proP_Percent} />
      </View>
      <View style={style.statContainer}>
        <View style={style.stat}>
          <Text style={{ color: "#fff", marginRight: 5 }}>
            {heroStat.proB_Percent}
          </Text>
          <Text style={{ fontSize: 13 }}>{heroStat.proB_Matches}</Text>
        </View>
        <PercentStat percent={heroStat.proB_Percent} />
      </View>
      <View style={style.statContainer}>
        <View style={style.stat}>
          <Text style={{ color: "#fff", marginRight: 5 }}>
            {heroStat.proW_Percent}
          </Text>
          <Text style={{ fontSize: 13 }}>{heroStat.proW_Matches}</Text>
        </View>
        <PercentStat percent={heroStat.proW_Percent} />
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

export default connectStyle("dota2app.HeroStatRowProMatch", styles)(
  HeroStatRowProMatch
);
