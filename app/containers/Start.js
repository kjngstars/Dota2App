import React, { Component } from "react";
import {
  Screen,
  Title,
  Button,
  Text,
  View,
  Heading,
  Overlay,
  Subtitle,
  Caption,
  Card,
  Image
} from "@shoutem/ui";
import { ScrollView } from "react-native";

import SectionHeader from "../components/SectionHeader";
import LeftHeader from "../components/LeftHeader";
import PercentStat from "../components/PercentStat";
import Loading from "../components/Loading";
import LiveGameRow from "../components/LiveGameRow";

import moment from "moment";
import { bindActionCreators } from "redux";
import { connectStyle } from "@shoutem/theme";
import { connect } from "react-redux";
import { navigateToMenuScreen } from "../actions/NavigationAction";
import ScreenTypes from "../navigators/ScreenTypes";

import * as navigationAction from "../actions/NavigationAction";
import { fetchTopStreamer } from "../actions/TopStreamerAction";
import { testFetchTopLiveGame } from "../actions/TopLiveGameAction";
import { reduceText } from "../utils/utilsFunction";
import themeColors from "../themes/colors";

import gameMode from "dotaconstants/build/game_mode.json";
import lobbyType from "dotaconstants/build/lobby_type.json";

class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topStreamers: [],
      topLiveGames: []
    };

    this.navigateToMatchScreen = this.navigateToMatchScreen.bind(this);
    this.processTopLiveGameData = this.processTopLiveGameData.bind(this);
    this.normalizeGameMode = this.normalizeGameMode.bind(this);
    this.setPlayerInfo = this.setPlayerInfo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.topStreamers != nextProps.topStreamers) {
      this.setState({ topStreamers: nextProps.topStreamers.streams });
    }

    if (
      nextProps.topLiveGames.length > 0 &&
      this.props.topLiveGames != nextProps.topLiveGames
    ) {
      this.setState({
        topLiveGames: this.processTopLiveGameData(nextProps.topLiveGames)
      });
    }
  }

  componentDidMount() {
    this.props.actions.fetchTopStreamer();
    this.props.actions.testFetchTopLiveGame();
  }

  navigateToMatchScreen() {
    this.props.navigation.dispatch(
      navigationAction.navigateToMenuScreen("MatchSearch")
    );
  }

  normalizeGameMode(gameMode) {
    var trimmed = gameMode.replace("game_mode_", "");
    var split = trimmed.split("_");
    var normalized = "";
    for (var i = 0; i < split.length; i++) {
      split[i][0].toUpperCase();
      normalized += split[i].charAt(0).toUpperCase() + split[i].slice(1) + " ";
    }
    return normalized;
  }

  setPlayerInfo(index, isRadiant = true) {
    const endpoint = "https://api.opendota.com/api/players/" + playerId;
    fetch(endpoint)
      .then(response => {
        return response.json();
      })
      .then(json => {
        player.personaname = json["personaname"];
      })
      .catch(error => {
        player.personaname = "Anonymous";
        console.log("Action - FETCH PLAYER INFO ERROR - " + error);
      });
  }

  processTopLiveGameData(topLiveGames) {
    let processedTopLiveGames = [];
    let uniqueLiveGames = [],
      countUnique = 0;

    let first = topLiveGames[0];
    uniqueLiveGames[countUnique] = first;

    for (let i = 1; i < topLiveGames.length; i++) {
      const next = topLiveGames[i];

      if (next["lobby_id"] == first["lobby_id"]) {
        uniqueLiveGames[countUnique] = next;
      } else {
        countUnique++;
        uniqueLiveGames[countUnique] = next;
        first = next;
      }
    }

    for (let i = 0; i < uniqueLiveGames.length; i++) {
      const liveGame = uniqueLiveGames[i];
      let processLiveGame = {
        radiantPlayers: [],
        direPlayers: []
      };

      if (liveGame["league_id"] != 0) {
        processLiveGame.leagueId = liveGame["league_id"];
        processLiveGame.teamNameRadiant = liveGame["team_name_radiant"];
        processLiveGame.teamNameDire = liveGame["team_name_dire"];

        const gameModeNormalized = this.normalizeGameMode(
          gameMode[liveGame["game_mode"]].name
        );

        processLiveGame.gameMode = gameModeNormalized;
        processLiveGame.radiantScore = liveGame["radiant_score"];
        processLiveGame.direScore = liveGame["dire_score"];
        const gameTime = moment("1900-01-01 00:00:00")
          .add(liveGame["game_time"], "seconds")
          .format("HH:mm:ss");

        if (
          liveGame.players.findIndex(player => player["hero_id"] == 0) != -1
        ) {
          processLiveGame.isBanPick = true;
        } else {
          const radiantPlayersList = liveGame.players.slice(0, 5);
          const direPlayersList = liveGame.players.slice(5, 10);          

          for (let player of radiantPlayersList) {
            let processPlayer = {};
            processPlayer.accountId = player["account_id"];
            processPlayer.heroId = player["hero_id"];
            processPlayer.name = player["name"];
            processPlayer.teamTag = player["team_tag"];

            processLiveGame.radiantPlayers.push(processPlayer);
          }

          for (let player of direPlayersList) {
            let processPlayer = {};
            processPlayer.accountId = player["account_id"];
            processPlayer.heroId = player["hero_id"];
            0;
            processPlayer.name = player["name"];
            processPlayer.teamTag = player["team_tag"];

            processLiveGame.direPlayers.push(processPlayer);
          }
        }
      } else {
        const radiantPlayersList = liveGame.players.slice(0, 5);
        const direPlayersList = liveGame.players.slice(5, 10);
        const gameModeNormalized = this.normalizeGameMode(
          gameMode[liveGame["game_mode"]].name
        );

        processLiveGame.gameMode = gameModeNormalized;
        processLiveGame.averageMMR = liveGame["average_mmr"];
        processLiveGame.radiantScore = liveGame["radiant_score"];
        processLiveGame.direScore = liveGame["dire_score"];
        const gameTime = moment("1900-01-01 00:00:00")
          .add(liveGame["game_time"], "seconds")
          .format("HH:mm:ss");

        processLiveGame.gameTime = gameTime;

        for (let player of radiantPlayersList) {
          let processPlayer = {};
          processPlayer.accountId = player["account_id"];
          processPlayer.heroId = player["hero_id"];

          if (player["name"]) {
            processPlayer.name = player["name"];
            processPlayer.teamTag = player["team_tag"];
          }

          processLiveGame.radiantPlayers.push(processPlayer);
        }

        for (let player of direPlayersList) {
          let processPlayer = {};
          processPlayer.accountId = player["account_id"];
          processPlayer.heroId = player["hero_id"];

          if (player["name"]) {
            processPlayer.name = player["name"];
            processPlayer.teamTag = player["team_tag"];
          }

          processLiveGame.direPlayers.push(processPlayer);
        }
      }

      processedTopLiveGames[i] = processLiveGame;
    }

    console.log(
      "process top live game: " + JSON.stringify(processedTopLiveGames)
    );

    return processedTopLiveGames;
  }

  render() {
    const styles = this.props.style;
    const { topStreamers, topLiveGames } = this.state;
    const { isLoadingTopStreamer, isLoadingTopLiveGame } = this.props;

    let topStreamer = <View />,
      topLiveGame = <View />;

    if (isLoadingTopStreamer) {
      topStreamer = <Loading type="Wave" />;
    } else if (topStreamers.length > 0) {
      topStreamer = topStreamers.map(stream => {
        //this is a workaround for: Cache never expires for the same uri on Image
        let url = stream.preview.large;
        let randomKey = new Date().getTime();
        url += "?random_number=" + randomKey;

        return (
          <View
            key={stream.channel.display_name}
            styleName="vertical h-start v-center"
            style={{ marginBottom: 10 }}
          >
            <Image
              styleName="large-banner"
              source={{
                uri: url
              }}
            />
            <View styleName="vertical h-start v-center">
              <Subtitle style={{ color: themeColors.white }}>
                {reduceText(stream.channel.description, 45)}
              </Subtitle>
              <View styleName="horizontal h-start v-center">
                <Caption
                  style={{ color: themeColors.white }}
                  styleName="sm-gutter-right"
                >
                  @ {stream.channel.display_name}
                </Caption>
                <View styleName="horizontal">
                  <Image
                    source={require("../assets/view.png")}
                    style={{ width: 16, height: 16, marginRight: 3 }}
                  />
                  <Caption style={{ color: themeColors.white }}>
                    {stream.viewers}
                  </Caption>
                </View>
              </View>
            </View>
          </View>
        );
      });
    }

    if (isLoadingTopLiveGame) {
      topLiveGame = <Loading type="Wave" />;
    } else if (topLiveGames.length > 0) {
      topLiveGame = topLiveGames.map((game, index) => {
        return <LiveGameRow key={index} liveGame={game} index={index} />;
      });
    }

    return (
      <View styleName="fill-parent dota2" style={styles.container}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <SectionHeader
              title="Top Livestreams"
              imgUrl={require("../assets/twitch.png")}
            />
            {topStreamer}
          </View>
          <View style={{ flex: 1 }}>
            <SectionHeader
              title="Top Live Games"
              imgUrl={require("../assets/dota2.png")}
            />
            {topLiveGame}
          </View>
        </ScrollView>
      </View>
    );
  }
}

Start.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
    title: "Home"
    //headerLeft:
    //  params.stackCounts > 2 ? <LeftHeader navigation={navigation} /> : null
  };
};

const styles = {
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "column",
    justifyContent: "flex-end"
  }
};

function mapStateToProps(state) {
  return {
    isLoadingTopStreamer: state.topStreamerState.isLoadingTopStreamer,
    isEmptyMatchDetails: state.topStreamerState.isEmptyTopStreamer,
    topStreamers: state.topStreamerState.topStreamers,
    isLoadingTopLiveGame: state.topLiveGameState.isLoadingTopLiveGame,
    isEmptyTopLiveGame: state.topLiveGameState.isEmptyTopLiveGame,
    topLiveGames: state.topLiveGameState.topLiveGames
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { fetchTopStreamer, testFetchTopLiveGame },
      dispatch
    )
  };
}

export default connectStyle("dota2app.StartScreen", styles)(
  connect(mapStateToProps, mapDispatchToProps)(Start)
);
