import React, { Component } from "react";
import { View, Image, Text, Caption, Subtitle, Icon, Title } from "@shoutem/ui";
import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";
import { dimensionRelativeToIphone } from "@shoutem/ui/theme";
import Line from "../components/Line";

const DRTI = dimensionRelativeToIphone;

export const PUBLIC_MATCH_ROW_HEIGHT = 135;

const PublicMatchRow = ({ style, match, index }) => {
  let style_name = "vertical h-center v-center even";
  if (index % 2) {
    style_name = "vertical h-center v-center odd";
  }

  return (
    <View styleName={style_name} style={style.container}>
      <View styleName="vertical">
        <View styleName="horizontal">
          <Text style={{ color: "#6BF", fontSize: 14, marginRight: 1 }}>
            {match.matchId}
          </Text>
          <Icon name="right-arrow" style={{ color: "#fff", fontSize: 20 }} />
        </View>
        <Text style={{ fontSize: 12 }}>{match.endedTime}</Text>
      </View>
      <View>
        <View
          styleName="horizontal space-between"
          style={{
            marginBottom: 5
          }}
        >
          <Text style={{ color: "#fff", fontSize: 12 }}>
            {match.lobbyType} - {match.gameMode}
          </Text>
          <Text style={{ color: "#fff", fontSize: 12 }}>
            {match.averageMMR} MMR
          </Text>
          <Text style={{ color: "#fff", fontSize: 12 }}>
            {match.formattedDuration}
          </Text>
        </View>
        <View
          styleName="horizontal v-center"
          style={{
            marginBottom: 3,
            borderTopWidth: match.radiantWin ? 2 : 0,
            borderColor: themeColors.radiant
          }}
        >
          <Image source={match.radiantSlot_0} style={style.hero} />
          <Image source={match.radiantSlot_1} style={style.hero} />
          <Image source={match.radiantSlot_2} style={style.hero} />
          <Image source={match.radiantSlot_3} style={style.hero} />
          <Image source={match.radiantSlot_4} style={style.hero} />
        </View>
        <Line color={themeColors.greyBorder} />
        <View
          styleName="horizontal v-center"
          style={{
            marginTop: 3,
            borderBottomWidth: match.radiantWin ? 0 : 2,
            borderColor: themeColors.dire
          }}
        >
          <Image source={match.direSlot_0} style={style.hero} />
          <Image source={match.direSlot_1} style={style.hero} />
          <Image source={match.direSlot_2} style={style.hero} />
          <Image source={match.direSlot_3} style={style.hero} />
          <Image source={match.direSlot_4} style={style.hero} />
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginTop: 5,
    marginBottom: 5,
    //borderWidth: 1,
    //borderColor: '#fff',
    ".odd": {
      backgroundColor: themeColors.backgroundTableOdd
    },
    ".even": {
      backgroundColor: themeColors.backgroundTableEven
    },
    height: PUBLIC_MATCH_ROW_HEIGHT
  },
  hero: {
    width: DRTI(62),
    height: DRTI(35)
  }
};

export default connectStyle("dota2app.PublicMatchRow", styles)(PublicMatchRow);
