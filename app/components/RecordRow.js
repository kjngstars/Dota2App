import React, { Component } from "react";
import { View, Image, Text, Icon, Title, Caption } from "@shoutem/ui";
import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";
import { dimensionRelativeToIphone } from "@shoutem/ui/theme";
import Line from "../components/Line";

const DRTI = dimensionRelativeToIphone;

export const RECORD_ROW_HEIGHT = 50;

const RecordRow = ({ style, index, record }) => {
  let style_name = "horizontal v-center even";
  if (index % 2) {
    style_name = "horizontal v-center odd";
  }

  return (
    <View styleName={style_name} style={style.container}>
      <View style={{ flex: 1 }} styleName="horizontal h-start v-center">
        <Text style={{color: themeColors.white}}>{record.rank}</Text>
      </View>
      <View style={{ flex: 1 }} styleName="horizontal h-start v-center">
        <Text style={{color: themeColors.white}}>{record.score}</Text>
      </View>
      <View style={{ flex: 1 }} styleName="vertical h-start v-center">
        <View styleName="horizontal h-start v-center">
          <Text style={{color:themeColors.action, fontSize: 13, marginRight: 3}}>{record.matchId}</Text>
          <Icon name="right-arrow" style={{color: themeColors.action, fontSize: 13}}/>
        </View>
        <Caption>{record.endedTime}</Caption>
      </View>
      {record.heroImg && (
        <View style={{ flex: 1 }} styleName="vertical v-center h-start">
          <Image source={record.heroImg} style={style.heroAvatar}/>
          <Text style={{color: themeColors.white, fontSize: 12}}>{record.heroName}</Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {   
    ".odd": {
      backgroundColor: themeColors.backgroundTableOdd
    },
    ".even": {
      backgroundColor: themeColors.backgroundTableEven
    },
    height: RECORD_ROW_HEIGHT
  },
  heroAvatar: {
    width: DRTI(50),
    height: DRTI(28)
  }
};

export default connectStyle("dota2app.RecordRow", styles)(RecordRow);
