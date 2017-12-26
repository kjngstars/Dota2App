import React, { Component } from "react";
import { View, Text, Caption, Subtitle, Icon, Title } from "@shoutem/ui";
import { Image } from "react-native";
import Ripple from "react-native-material-ripple";
import Header from "../components/Header";

import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";
import { getHeroImage } from "../utils/getHeroImage";
import { getItemImage } from "../utils/getItemImage";
import { reduceText } from "../utils/utilsFunction";

import { dimensionRelativeToIphone } from "@shoutem/ui/theme";
const DRTI = dimensionRelativeToIphone;

export const Item = ({ style, imgUrl, time = "" }) => {
  let TimePurchase = <View />;
  if (time != "")
    TimePurchase = (
      <Text style={style.timeItem} styleName="bold">
        {time}
      </Text>
    );

  return (
    <View styleName="vertical v-end" style={{ marginRight: 2 }}>
      <Image source={imgUrl} style={style.heroItem} />
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
      <Text styleName={styleName} style={style.stat}>
        {stat}
      </Text>
      <Text style={style.stat} styleName={styleName}>
        {value}
      </Text>
    </View>
  );
};

const PlayerStatsRowOld = ({ style, player, isOdd = false }) => {
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
            <Icon style={{ color: "#fff" }} name="right-arrow" />
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
            <Item
              style={{ item: { marginLeft: 7, marginTop: 1, marginBottom: 1 } }}
              imgUrl={backpackImage}
            />
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

const PlayerStatsRow = ({ style, player, index, showDetails, onPress }) => {
  let _styleName = "vertical v-center even";
  if (index % 2) {
    _styleName = "vertical v-center odd";
  }
  const heroAvatar = getHeroImage(player.hero);
  const kda = player.kills + "/" + player.deaths + "/" + player.assists;
  const backpackImage = require("../assets/backpack.png");

  return (
    <View
      styleName={_styleName}
      style={Object.assign({}, style.container, {
        borderLeftWidth: 1,
        borderColor: player.color
      })}
    >
      <Ripple onPress={onPress}>
        <View styleName="horizontal h-start v-center" style={style.mainContent}>
          <View style={style.statContainer}>
            <Image source={heroAvatar} style={style.heroImg} />
            <Text style={style.level} styleName="bold">
              {player.level}
            </Text>
          </View>
          <View style={style.statContainer}>
            <Text styleName="normal" style={style.stat}>
              {reduceText(player.player, 8)}
            </Text>
          </View>
          <View style={style.statContainer}>
            <Text styleName="normal" style={style.stat}>
              {kda}
            </Text>
          </View>
          <View style={style.statContainer}>
            <Text styleName="normal" style={style.stat}>
              {player.gpm}
            </Text>
          </View>
          <View style={style.statContainer}>
            <Text styleName="normal" style={style.stat}>
              {player.xpm}
            </Text>
          </View>
        </View>
      </Ripple>
      {showDetails && <Line color={themeColors.greyBorder} />}
      {showDetails && (
        <View
          styleName="horizontal v-center h-start"
          style={style.detailsContent}
        >
          <View styleName="vertical v-center h-start" style={{ flex: 2 }}>
            <View style={style.itemContainer}>
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
            <View style={style.itemContainer}>
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
              <View styleName="horizontal h-center v-end" style={{ flex: 1 }}>
                <Stat
                  stat="Gold: "
                  value={player.totalGold}
                  style={style}
                  styleName="gold"
                />
              </View>
            </View>
          </View>
          <View styleName="vertical" style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Header
                headers={["LH", "DN", "HD", "TD"]}
                fontSize={12}
                headerStyle={{ height: 25 }}
                contentStyle={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              />
            </View>
            <View styleName="horizontal" style={{ flex: 1 }}>
              <View style={style.statContainer}>
                <Text styleName="normal" style={style.stat}>
                  {player.lastHits}
                </Text>
              </View>
              <View style={style.statContainer}>
                <Text styleName="normal" style={style.stat}>
                  {player.denies}
                </Text>
              </View>
              <View style={style.statContainer}>
                <Text styleName="normal" style={style.stat}>
                  {player.heroDamage}
                </Text>
              </View>
              <View style={style.statContainer}>
                <Text styleName="normal" style={style.stat}>
                  {player.towerDamage}
                </Text>
              </View>
            </View>
          </View>
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
    }
  },
  mainContent: {
    height: 50
  },
  detailsContent: {
    height: 70,
    paddingLeft: 14,
    paddingRight: 14
  },
  itemContainer: {
    flexDirection: "row",
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
    backgroundColor: themeColors.backgroundTextImage,
    fontSize: 11
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
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
    fontSize: 9
  },
  item: {
    marginLeft: 5,
    borderWidth: 1,
    borderColor: themeColors.white
  },
  heroImg: {
    width: DRTI(40),
    height: DRTI(40),
    borderRadius: 20,
    borderWidth: 0
  },
  heroItem: {
    width: DRTI(33),
    height: DRTI(25)
  }
};

export default connectStyle("dota2app.PlayerStatsRow", styles)(PlayerStatsRow);
