import React, { Component } from "react";
import { View, Text, Image, Icon, TouchableOpacity } from "@shoutem/ui";

import { connectStyle } from "@shoutem/theme";
import PercentStat from "../components/PercentStat";
import themeColors from "../themes/colors";

export const HERO_RANKING_ROW_HEIGHT = 50; 

const HeroRankingRow = ({ playerRank, style }) => {
  return (
    <View styleName="horizontal">
      <Text>{playerRank.ranking}</Text>
      <View styleName="horizontal">
        <Image source={playerRank.avatar} />
        <View>
          <Text>{playerRank.name ? playerRank.name : playerRank.personaname}</Text>
          <Text>{playerRank.rankTier}</Text>
        </View>
      </View>
      <View style={style.statContainer}>
        <View style={style.stat}>
          <Text style={{ color: "#fff", marginRight: 5 }}>{playerRank.score}</Text>
        </View>
        <PercentStat percent={heroStat.scorePercent} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    height: HERO_RANKING_ROW_HEIGHT,
    ".odd": {
      backgroundColor: themeColors.backgroundTableOdd
    },
    ".even": {
      backgroundColor: themeColors.backgroundTableEven
    }
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
  }
};

export default connectStyle("dota2app.HeroRankingRow", styles)(HeroRankingRow);
