import React, { Component } from "react";
import { View, Image, Text, Caption, Subtitle, Icon, Title } from "@shoutem/ui";
import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";


export const PRO_MATCH_ROW_HEIGHT = 90;

const ProMatchRow = ({ style, match, index }) => {

  let style_name = "horizontal h-end v-center even sm-gutter-left";
  if (index % 2) {
      style_name = "horizontal h-end v-center odd sm-gutter-left";
  }

  let radiant = (
    <Text
      style={{ fontSize: 13, fontWeight: "bold", color: themeColors.radiant }}
    >
      {match.radiantName}
    </Text>
  );
  let dire = (
    <Text style={{ fontSize: 13, fontWeight: "bold", color: themeColors.dire }}>
      {match.direName}
    </Text>
  );

  if (match.radiantWin) {
    radiant = (
      <View styleName="horizontal h-start v-center">
        <Text
          style={{
            fontSize: 13,
            color: themeColors.radiant,
            fontWeight: "bold"
          }}
        >
          {match.radiantName}
        </Text>
        <Icon
          name="trophy"
          style={{ marginLeft: 3, color: themeColors.gold, fontSize: 15 }}
        />
      </View>
    );
  } else {
    dire = (
      <View styleName="horizontal h-start v-center">
        <Text
          style={{ fontSize: 13, color: themeColors.dire, fontWeight: "bold" }}
        >
          {match.direName}
        </Text>
        <Icon
          name="trophy"
          style={{ marginLeft: 3, color: themeColors.gold, fontSize: 16 }}
        />
      </View>
    );
  }

  return (
    <View styleName={style_name} style={style.container}>
      <View styleName="vertical v-center" style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, color: "#fff", fontWeight: "bold" }}>
          {match.leagueName}
        </Text>
        <View styleName="horizontal v-center">
          <View styleName="vertical h-start" style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: "#6BF" }}>{match.matchId}</Text>
            <Text style={{ fontSize: 12, color: "#fff" }}>
              {match.formattedDuration}
            </Text>
            <Caption>{match.endedTime}</Caption>
          </View>
          <View styleName="vertical v-center" style={style.team}>
            {radiant}
            {dire}
          </View>
        </View>
      </View>
      <Icon name="right-arrow" style={{ color: "#fff", fontSize: 30 }} />
    </View>
  );
};

const styles = {
  container: {
    marginTop: 5,
    marginBottom: 5,
    height: PRO_MATCH_ROW_HEIGHT,
    ".odd": {
      backgroundColor: themeColors.backgroundTableOdd
    },
    ".even": {
      backgroundColor: themeColors.backgroundTableEven
    },
  },
  team: {
    flex: 1
  }
};

export default connectStyle("dota2app.ProMatchRow", styles)(ProMatchRow);
