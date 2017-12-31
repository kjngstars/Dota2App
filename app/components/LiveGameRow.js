import React, { Component } from "react";
import { Title, Text, View, Image } from "@shoutem/ui";

import { connectStyle } from "@shoutem/theme";
import { connect } from "react-redux";

import { getHeroImage } from "../utils/getHeroImage";
import { reduceText } from "../utils/utilsFunction";
import themeColors from "../themes/colors";

import { dimensionRelativeToIphone } from "@shoutem/ui/theme";
const DRTI = dimensionRelativeToIphone;

import PlayerHeroInfo from "../components/PlayerHeroInfo";
import LiveGameRecap from "../components/LiveGameRecap";

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
          <LiveGameRecap data={liveGame} />
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
              return <PlayerHeroInfo player={player} key={player.accountId} />;
            })}
          </View>
          <LiveGameRecap data={liveGame} />
          <View styleName="vertical h-end v-center" style={{ flex: 1.5 }}>
            {liveGame.direPlayers.map(player => {
              return (
                <PlayerHeroInfo right player={player} key={player.accountId} />
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
            return <PlayerHeroInfo player={player} key={player.accountId} />;
          })}
        </View>
        <LiveGameRecap data={liveGame} />
        <View styleName="vertical h-end v-center" style={{ flex: 1.5 }}>
          {liveGame.direPlayers.map(player => {
            return (
              <PlayerHeroInfo right player={player} key={player.accountId} />
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
  }
};

export default connectStyle("dota2app.LiveGameRow", styles)(LiveGameRow);
