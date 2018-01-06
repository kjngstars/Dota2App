import React, { Component } from "react";
import { View, Text, Icon, Title } from "@shoutem/ui";
import { Image } from "react-native";

import Line from "../components/Line";

import Loading from "../components/Loading";
import themeColors from "../themes/colors";

import { connect } from "react-redux";
import { connectStyle } from "@shoutem/theme";
import { bindActionCreators } from "redux";
import _ from "lodash";

import { fetchPlayerInfo } from "../actions/PlayerInfoAction";
import { rankTierToString } from "../utils/utilsFunction";

class PlayerOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerInfo: {}
    };

    this.fetchingData = this.fetchingData.bind(this);
    this.onRefreshing = this.fetchingData.bind(this, true);
    this.processPlayerInfo = this.processPlayerInfo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps && nextProps.playerInfo.length > 0) {
      this.setState({
        playerInfo: this.processPlayerInfo(nextProps.playerInfo)
      });
    }
  }

  componentDidMount() {
    this.fetchingData();
  }

  processPlayerInfo(playerInfo) {
    processedPlayerInfo = {};

    if (playerInfo.length > 0) {
      const player = playerInfo[0];
      const wl = playerInfo[1];

      processedPlayerInfo.soloRank = player["solo_competitive_rank"]
        ? player["solo_competitive_rank"]
        : "N/A";
      processedPlayerInfo.partyRank = player["competitive_rank"]
        ? player["competitive_rank"]
        : "N/A";
      processedPlayerInfo.rankTier = rankTierToString(player["rank_tier"]);
      processedPlayerInfo.name = player.profile["name"]
        ? player.profile["name"]
        : player.profile["personaname"];
      processedPlayerInfo.accountId = player.profile["account_id"];
      processedPlayerInfo.avatar = player.profile["avatarfull"];
      processedPlayerInfo.leaderboardRank = player["leaderboard_rank"]
        ? player["leaderboard_rank"]
        : "N/A";
      processedPlayerInfo.wins = wl["win"];
      processedPlayerInfo.losses = wl["lose"];
      processedPlayerInfo.winRate = (
        wl["win"] /
        (wl["win"] + wl["lose"]) *
        100
      ).toFixed(2);
    }

    return processedPlayerInfo;
  }

  fetchingData(refreshing = false) {
    const { accountId } = this.props.navigation.state.params;
    this.props.actions.fetchPlayerInfo(accountId, refreshing);
  }

  render() {
    const { isLoadingPlayerInfo, style } = this.props;
    const { playerInfo } = this.state;
    let content = <View />;

    if (isLoadingPlayerInfo) {
      content = <Loading />;
    } else if (!_.isEmpty(playerInfo)) {
      content = (
        <View
          styleName="vertical h-start v-start"
          style={{
            backgroundColor: themeColors.backgroundTableEven,
            padding: 5
          }}
        >
          <View styleName="horizontal h-start v-center">
            <Image style={style.avatar} source={{ uri: playerInfo.avatar }} />
            <View styleName="vertical h-start v-center">
              <Text style={{ color: themeColors.action, fontSize: 20 }}>
                {playerInfo.name}
              </Text>
              <Text style={{ color: themeColors.white, fontSize: 20 }}>
                Rank tier: {playerInfo.rankTier}
              </Text>
            </View>            
          </View>
          <View
            styleName="horizontal h-start v-end"
            style={style.statContainer}
          >
            <Text style={style.stat}>WINS: </Text>
            <Text style={style.win}>{playerInfo.wins}</Text>
          </View>
          <View styleName="horizontal h-start v-end">
            <Text style={style.stat}>LOSSES: </Text>
            <Text style={style.lose}>{playerInfo.losses}</Text>
          </View>
          <View
            styleName="horizontal h-start v-end"
            style={style.statContainer}
          >
            <Text style={style.stat}>WINRATE: </Text>
            <Text style={style.value}>{playerInfo.winRate}%</Text>
          </View>
          <View
            styleName="horizontal h-start v-end"
            style={style.statContainer}
          >
            <Text style={style.stat}>SOLO MMR: </Text>
            <Text style={style.value}>{playerInfo.soloRank}</Text>
          </View>
          <View
            styleName="horizontal h-start v-end"
            style={style.statContainer}
          >
            <Text style={style.stat}>PARTY MMR: </Text>
            <Text style={style.value}>{playerInfo.partyRank}</Text>
          </View>
          <View
            styleName="horizontal h-start v-end"
            style={style.statContainer}
          >
            <Text style={style.stat}>LEADERBOARD RANK </Text>
            <Text style={style.value}>{playerInfo.partyRank}</Text>
          </View>
        </View>
      );
    }

    return (
      <View styleName="fill-parent dota2" style={styles.container}>
        {content}
      </View>
    );
  }
}

PlayerOverview.navigationOptions = {
    title: "Player Overview"
  };

function mapStateToProps(state, ownProps) {
  return {
    isLoadingPlayerInfo: state.playerInfoState.isLoadingPlayerInfo,
    isRefreshingPlayerInfo: state.playerInfoState.isRefreshingPlayerInfo,
    isEmptyPlayerInfo: state.playerInfoState.isEmptyPlayerInfo,
    playerInfo: state.playerInfoState.playerInfo
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchPlayerInfo }, dispatch)
  };
}

const styles = {
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  statContainer: {
    height: 40
  },
  stat: {
    fontSize: 22,
    color: "rgba(255,255,255,0.54)"
  },
  win: {
    fontSize: 26,
    color: themeColors.radiant
  },
  lose: {
    fontSize: 26,
    color: themeColors.dire
  },
  value: {
    fontSize: 26,
    color: themeColors.white
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 10
  }
};

export default connectStyle("dota2app.PlayerOverview", styles)(
  connect(mapStateToProps, mapDispatchToProps)(PlayerOverview)
);
