import React, { Component } from "react";
import { View, Image, Text, Icon, Title, TouchableOpacity } from "@shoutem/ui";
import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";
import { dimensionRelativeToIphone } from "@shoutem/ui/theme";

const DRTI = dimensionRelativeToIphone;

export const PLAYER_ROW_HEIGHT = 50;

const PlayerRow = ({ style, player, index }) => {
  let style_name = "horizontal space-between v-center even";
  let content = <View />;
  if (index % 2) {
    style_name = "horizontal space-between v-center odd";
  }

  if (player.team_name) {
    content = (
      <View styleName={style_name} style={{ flex: 5 }}>
        <View styleName="horizontal h-start v-center">
          <Image
            source={{ uri: player.avatarfull }}
            style={style.playerAvatar}
          />
          <Text style={style.player}>{player.name}</Text>
        </View>
        <Text>{player.team_name}</Text>
      </View>
    );
  } else {
    content = (
      <View styleName="horizontal h-start v-center" style={{ flex: 5 }}>
        <Image source={{ uri: player.avatarfull }} style={style.playerAvatar} />
        <Text style={style.player}>{player.personaname}</Text>
      </View>
    );
  }

  return (
    <View styleName={style_name} style={style.container}>
      {content}
      <View styleName="horizontal h-end" style={{ flex: 1 }}>
        <TouchableOpacity>
          <Icon name="right-arrow" style={{ color: themeColors.white }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 5,
    height: PLAYER_ROW_HEIGHT,
    ".odd": {
      backgroundColor: themeColors.backgroundTableOdd
    },
    ".even": {
      backgroundColor: themeColors.backgroundTableEven
    }
  },
  player: {
    marginLeft: 5,
    color: themeColors.action,
    fontSize: 15
  },
  playerAvatar: {
    width: DRTI(35),
    height: DRTI(35)
  }
};

export default connectStyle("dota2app.PlayerRow", styles)(PlayerRow);
