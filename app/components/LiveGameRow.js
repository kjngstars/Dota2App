import React, { Component } from "react";
import { Title, Text, View, Image } from "@shoutem/ui";

import { connectStyle } from "@shoutem/theme";
import { connect } from "react-redux";

import { getHeroImage } from "../utils/getHeroImage";
import { reduceText } from "../utils/utilsFunction";
import themeColors from "../themes/colors";

import { dimensionRelativeToIphone } from "@shoutem/ui/theme";
const DRTI = dimensionRelativeToIphone;

const LiveGameRow = ({ liveGame, style, index }) => {
  let _styleName = "horizontal v-center odd";
  let content = <View />;
  if (index % 2) {
    _styleName = "horizontal v-center even";
  }

  if (liveGame.leagueId) {
    if (liveGame.isBanPick) {
      content = (
        <View styleName={_styleName} style={style.container}>
          <View styleName="vertical h-start v-center" style={{ flex: 1.5 }}>
            <Text style={{ color: themeColors.radiant }}>
              {liveGame.teamNameRadiant}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              styleName="vertical h-center v-center"
              style={{ color: themeColors.white, fontSize: 12 }}
            >
              B/P Phase
            </Text>
          </View>
          <View styleName="vertical h-end v-center" style={{ flex: 1.5 }}>
            <Text style={{ color: themeColors.dire }}>
              {liveGame.teamNameDire}
            </Text>
          </View>
        </View>
      );
    } else {
      content = (
        <View styleName={_styleName} style={style.container}>
          <View styleName="vertical h-start v-center" style={{ flex: 1.5 }}>
            {liveGame.radiantPlayers.map(player => {
              const heroImg = getHeroImage(player.heroId);
              return (
                <View
                  styleName="horizontal h-start v-center"
                  key={player.accountId}
                >
                  <Image source={heroImg} style={style.heroAvatar} />
                  <Text style={style.playerName}>
                    {reduceText(player.teamTag + "." + player.name, 12)}
                  </Text>
                </View>
              );
            })}
          </View>
          <View styleName="vertical h-center v-center" style={{ flex: 1 }}>
            <View styleName="horizontal h-center">
              <Text style={style.radiantScore}>{liveGame.radiantScore}</Text>
              <Text> | </Text>
              <Text style={style.direScore}>{liveGame.direScore}</Text>
            </View>
            <Text style={{ color: themeColors.white, fontSize: 13 }}>
              {liveGame.gameTime}
            </Text>
          </View>
          <View styleName="vertical h-end v-center" style={{ flex: 1.5 }}>
            {liveGame.direPlayers.map(player => {
              const heroImg = getHeroImage(player.heroId);
              return (
                <View
                  styleName="horizontal h-start v-center"
                  key={player.accountId}
                >
                  <Text style={style.playerName}>
                    {reduceText(player.teamTag + "." + player.name, 12)}
                  </Text>
                  <Image source={heroImg} style={style.heroAvatar} />
                </View>
              );
            })}
          </View>
        </View>
      );
    }
  } else {
    content = (
      <View styleName={_styleName} style={style.container}>
        <View styleName="vertical h-start v-center" style={{ flex: 1.5 }}>
          {liveGame.radiantPlayers.map(player => {
            const heroImg = getHeroImage(player.heroId);
            return (
              <View
                styleName="horizontal h-start v-center"
                key={player.accountId}
              >
                <Image source={heroImg} style={style.heroAvatar} />
                <Text style={style.playerName}>
                  {player.name
                    ? player.teamTag + "." + player.name
                    : "Anonymous"}
                </Text>
              </View>
            );
          })}
        </View>
        <View styleName="vertical h-center v-center" style={{ flex: 1 }}>
          <View styleName="horizontal h-center">
            <Text style={style.radiantScore}>{liveGame.radiantScore}</Text>
            <Text> | </Text>
            <Text style={style.direScore}>{liveGame.direScore}</Text>
          </View>
          <Text style={{ color: themeColors.white, fontSize: 13 }}>
            {liveGame.gameTime}
          </Text>
          <Text style={{ color: themeColors.white, fontSize: 12 }}>
            {liveGame.averageMMR} MMR
          </Text>
        </View>
        <View styleName="vertical h-end v-center" style={{ flex: 1.5 }}>
          {liveGame.direPlayers.map(player => {
            const heroImg = getHeroImage(player.heroId);
            return (
              <View
                styleName="horizontal h-start v-center"
                key={player.accountId}
              >
                <Text style={style.playerName}>
                  {player.name
                    ? player.teamTag + "." + player.name
                    : "Anonymous"}
                </Text>
                <Image source={heroImg} style={style.heroAvatar} />
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  return content;
};

const styles = {
  container: {
    flex: 1,
    padding: 5,
    ".odd": {
      backgroundColor: themeColors.backgroundTableOdd
    },
    ".even": {
      backgroundColor: themeColors.backgroundTableEven
    }
  },

  playerName: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 12,
    color: themeColors.white
  },
  heroAvatar: {
    width: DRTI(35),
    height: DRTI(20)
  },
  radiantScore: {
    fontSize: 13,
    color: themeColors.radiant,
    fontWeight: "bold"
  },
  direScore: {
    fontSize: 13,
    color: themeColors.dire,
    fontWeight: "bold"
  }
};

export default connectStyle("dota2app.LiveGameRow", styles)(LiveGameRow);
