import React, { Component } from "react";
import { View, Image, Text, Caption, Subtitle, Icon, Title } from "@shoutem/ui";
import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";
import { getHeroImage } from "../utils/getHeroImage";
import { getItemImage } from "../utils/getItemImage";

export const Item = ({ style, imgUrl, time = "" }) => {
  let TimePurchase = null;
  if (time != "")
    TimePurchase = (
      <Caption style={style.timeItem} styleName="bold">
        {time}
      </Caption>
    );

  return (
    <View styleName="vertical v-end" style={style.item}>
      <Image source={imgUrl} styleName="hero-item" />
      {TimePurchase}
    </View>
  );
};

export const Stat = ({
  stat,
  value,
  style,
  isColumn = false,
  styleName = "normal"
}) => {
  const finalStyle = "bold " + styleName;
  let layoutStyle = "horizontal v-start";
  if (isColumn) layoutStyle = "vertical v-start";
  return (
    <View styleName={layoutStyle}>
      <Text styleName={finalStyle} style={style.stat}>
        {stat}
      </Text>
      <Text style={style.stat} styleName={styleName}>
        {value}
      </Text>
    </View>
  );
};

const PlayerStatsRow = ({ style, player, isOdd = false }) => {
  const heroAvatar = getHeroImage(player.hero);
  const kda = player.kills + "/" + player.deaths + "/" + player.assists;
  const backpackImage = require("../assets/backpack.png");

  let style_name = "vertical even";
  if (isOdd) style_name = "vertical odd";

  return (
    <View styleName={style_name} style={style.container}>
      <View styleName="horizontal sm-gutter-bottom">
        <View styleName="vertical v-end" style={style.heroAvatarContainer}>
          <Image source={heroAvatar} styleName="hero-avatar" />
          <Text style={style.level} styleName="bold">
            {player.level}
          </Text>
        </View>
        <View style={style.playerInfoContainer} styleName="sm-gutter-left">
          <View styleName="horizontal">
            <Text style={style.playerName} styleName="bold">
              {player.player}
            </Text>
            <Icon style={{color: '#fff'}} name="right-arrow" />
          </View>
          <View styleName="horizontal space-between">
            <Stat
              stat="MMR: "
              value={player.soloCompetitiveRank}
              style={style}
            />
            <Stat stat="KDA: " value={kda} style={style} />
          </View>
        </View>
      </View>
      <View styleName="horizontal v-start">
        <View styleName="vertical" style={style.statContainer}>
          <View styleName="horizontal" style={style.statRow}>
            <Stat
              stat="GPM"
              value={player.gpm}
              style={style}
              isColumn={true}
              styleName="gold"
            />
            <Stat stat="XPM" value={player.xpm} style={style} isColumn={true} />
          </View>
          <View styleName="horizontal" style={style.statRow}>
            <Stat
              stat="LH"
              value={player.lastHits}
              style={style}
              isColumn={true}
            />
            <Stat
              stat="DN"
              value={player.denies}
              style={style}
              isColumn={true}
            />
          </View>
        </View>
        <View>
          <View styleName="horizontal" style={style.itemContainer}>
            <Item
              style={style}
              imgUrl={player.item_0_uri}
              time={player.item_0_timing}
            />
            <Item
              style={style}
              imgUrl={player.item_1_uri}
              time={player.item_1_timing}
            />
            <Item
              style={style}
              imgUrl={player.item_2_uri}
              time={player.item_2_timing}
            />
            <Item
              style={style}
              imgUrl={player.item_3_uri}
              time={player.item_3_timing}
            />
            <Item
              style={style}
              imgUrl={player.item_4_uri}
              time={player.item_4_timing}
            />
            <Item
              style={style}
              imgUrl={player.item_5_uri}
              time={player.item_5_timing}
            />
          </View>
          <View styleName="horizontal" style={style.itemContainer}>
            <Item style={{item: { marginLeft: 7, marginTop: 1, marginBottom: 1}}} imgUrl={backpackImage} />
            <Item
              style={style}
              imgUrl={player.backpack_0_uri}
              time={player.backpack_0_timing}
            />
            <Item
              style={style}
              imgUrl={player.backpack_1_uri}
              time={player.backpack_1_timing}
            />
            <Item
              style={style}
              imgUrl={player.backpack_2_uri}
              time={player.backpack_2_timing}
            />
          </View>
        </View>
      </View>
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
    marginTop: 5,
    marginBottom: 5
  },
  itemContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginBottom: 2
  },
  heroAvatarContainer: {
    alignSelf: "flex-start"
  },
  level: {
    position: "absolute",
    color: themeColors.white,
    alignSelf: "flex-end",
    backgroundColor: themeColors.backgroundTextImage
  },
  playerInfoContainer: {
    flex: 1
  },
  playerName: {
    color: themeColors.white,
    fontSize: 16
  },
  stat: {
    ".normal": {
      color: themeColors.white
    },
    ".gold": {
      color: themeColors.gold
    },
    fontSize: 13
  },
  statContainer: {
    alignSelf: "center",
    flex: 1
  },
  statRow: {
    flex: 1,
    justifyContent: "space-between"
  },

  statRow: {
    flex: 1,
    justifyContent: "space-between"
  },
  timeItem: {
    position: "absolute",
    color: themeColors.white,
    backgroundColor: themeColors.backgroundTextImage,
    alignSelf: "center",
    bottom: 1,
    fontSize: 9.5
  },
  item: {
    marginLeft: 5,
    borderWidth: 1,
    borderColor: themeColors.white
  }
};

export default connectStyle("dota2app.PlayerStatsRow", styles)(PlayerStatsRow);
