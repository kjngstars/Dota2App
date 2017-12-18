import React, { Component } from "react";
import { View, Text, Image, Icon, TouchableOpacity } from "@shoutem/ui";

import { connectStyle } from "@shoutem/theme";
import PercentStat from "../components/PercentStat";
import themeColors from "../themes/colors";

import { dimensionRelativeToIphone } from "@shoutem/ui/theme";

const DRTI = dimensionRelativeToIphone;

export const HERO_RANKING_ROW_HEIGHT = 50;

const HeroRankingRow = ({ playerRank, style, index }) => {
  let style_name = "horizontal h-start v-center even";
  let content = <View />;
  if (index % 2) {
    style_name = "horizontal h-start v-center odd";
  }

  return (
    <View styleName={style_name} style={style.container}>
      <Text style={{ flex: 1.5, color: themeColors.white }}>
        {playerRank.ranking}
      </Text>
      <View styleName="horizontal v-center" style={{ flex: 5 }}>
        <Image source={{ uri: playerRank.avatar }} style={style.playerAvatar} />
        <View styleName="vertical v-center h-start">
          <View styleName="horizontal h-start">
            <Text style={{color: themeColors.action, marginRight: 3, fontSize: 13}}>
              {playerRank.name ? playerRank.name : playerRank.personaname}
            </Text>
            <Icon name="right-arrow" style={{color: themeColors.action, fontSize: 13}}/>
          </View>
          <Text>{playerRank.rankTier}</Text>
        </View>
      </View>
      <View style={style.statContainer}>
        <View style={style.stat}>
          <Text style={{ color: "#fff", marginRight: 5 }}>
            {playerRank.score}
          </Text>
        </View>
        <PercentStat percent={playerRank.scorePercent} />
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
    flex: 3.5,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingRight: 5
  },
  stat: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  playerAvatar: {
    width: DRTI(35),
    height: DRTI(35),
    marginRight: 5
  }
};

export default connectStyle("dota2app.HeroRankingRow", styles)(HeroRankingRow);
