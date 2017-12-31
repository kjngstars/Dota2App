import React, { PureComponent } from "react";
import { Title, Text, View, Image } from "@shoutem/ui";

import Loading from "../components/Loading";

import { connectStyle } from "@shoutem/theme";
import { connect } from "react-redux";

import { fetchAPI } from "../utils/fetch";
import { getHeroImage } from "../utils/getHeroImage";
import { reduceText } from "../utils/utilsFunction";
import themeColors from "../themes/colors";

import { fetchPlayerInfo } from "../actions/PlayerInfoAction";

import { dimensionRelativeToIphone } from "@shoutem/ui/theme";
const DRTI = dimensionRelativeToIphone;

const PlayerHero = ({ right = false, playerName, teamTag, heroImg, style }) => {
  let content = <View />;
  let finalName = reduceText(playerName, 14);
  let playerNameContent = <Text style={style.playerInfo}>{finalName}</Text>;

  if (teamTag) {
    finalName = reduceText(teamTag + "." + playerName, 14);
    playerNameContent = <Text style={style.proPlayerInfo}>{finalName}</Text>;
  }

  if (right) {
    content = (
      <View styleName="horizontal v-center">
        {playerNameContent}
        <Image source={heroImg} style={style.heroAvatar} styleName="right" />
      </View>
    );
  } else {
    content = (
      <View styleName="horizontal v-center">
        <Image source={heroImg} style={style.heroAvatar} styleName="left" />
        {playerNameContent}
      </View>
    );
  }
  return content;
};

class PlayerHeroInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerName: "",
      isLoadingPlayerInfo: this.props.player.name ? false : true
    };

    this.fetchPlayerInfo = this.fetchPlayerInfo.bind(this);
  }

  componentDidMount() {
    if (!this.props.player.name) {
      this.fetchPlayerInfo(this.props.player.accountId);
    }
  }

  fetchPlayerInfo(accountId) {
    var endpoint = "players/" + accountId;

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        this.setState({
          isLoadingPlayerInfo: false,
          playerName: json.profile ? json.profile.personaname : "Unknown"
        });
      })
      .catch(error => {
        console.log(accountId + " Action - FETCH PLAYER INFO ERROR - " + error);
        this.setState({ isLoadingPlayerInfo: false, playerName: "Unknown" });
      });
  }

  render() {
    const { right, player, style } = this.props;
    const { playerName, isLoadingPlayerInfo } = this.state;
    const heroImg = getHeroImage(player.heroId);

    let content = <View />;

    if (player.name) {
      content = (
        <PlayerHero
          right={right}
          playerName={player.name}
          teamTag={player.teamTag}
          heroImg={heroImg}
          style={style}
        />
      );
    } else if (isLoadingPlayerInfo) {
      content = <Loading type="ThreeBounce" size={25} />;
    } else if (playerName != "") {
      content = (
        <PlayerHero
          right={right}
          playerName={playerName}
          heroImg={heroImg}
          style={style}
        />
      );
    }

    return content;
  }
}

const styles = {
  playerInfo: {
    fontSize: 12,
    color: themeColors.action
  },
  proPlayerInfo: {
    fontSize: 12,
    color: themeColors.orange
  },
  heroAvatar: {
    width: DRTI(35),
    height: DRTI(20),
    ".left": {
      marginRight: 5
    },
    ".right": {
      marginLeft: 5
    }
  }
};

export default connectStyle("dota2app.PlayerHeroInfo", styles)(PlayerHeroInfo);
