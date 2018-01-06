import React, { Component } from "react";
import { ScrollView, ImageBackground, SectionList } from "react-native";
import { NavigationBarWithMatchSearch } from "../components/NavigationBar";
import {
  View,
  Image,
  Text,
  Caption,
  Row,
  Subtitle,
  Icon,
  Title,
  Heading
} from "@shoutem/ui";

import Loading from "../components/Loading";
import PlayerStatsRow, {
  Item,
  Stat,
  PLAYER_STAT_ROW_HEIGHT
} from "../components/PlayerStatsRow";
import Line from "../components/Line";
import Header from "../components/Header";
import SkillBuild, { CELL_SIZE } from "../containers/SkillBuild";
import SectionHeader from "../components/SectionHeader";

import { getHeroImage } from "../utils/getHeroImage";
import { getItemImage } from "../utils/getItemImage";
import { getSideImage, reduceText } from "../utils/utilsFunction";
import { kFormatter } from "../utils/kFormatter";

import regionsArray from "../json/regions_list.json";
import gameMode from "dotaconstants/build/game_mode.json";
import items from "dotaconstants/build/item_ids.json";
import playerColors from "dotaconstants/build/player_colors.json";

import ScreenTypes from "../navigators/ScreenTypes";
import themeColors from "../themes/colors";

import Modal from "react-native-modal";
import { StockLine } from "react-native-pathjs-charts";

import { connect } from "react-redux";
import { connectStyle } from "@shoutem/theme";
import { bindActionCreators } from "redux";
import moment from "moment";
import _ from "lodash";
import sectionListGetItemLayout from "react-native-section-list-get-item-layout";

import * as matchDetailsAction from "../actions/MatchDetailsAction";
import { navigateToMenuScreen } from "../actions/NavigationAction";

// components
const SideOverviewHeader = ({ side, imgUrl }) => {
  return (
    <View styleName="vertical">
      <View styleName="horizontal h-start">
        <Image source={imgUrl} styleName="extra-small" />
        <Title
          styleName="sm-gutter-left"
          style={{ color: themeColors.radiant }}
        >
          {side}
        </Title>
      </View>
      <Line color={themeColors.radiant} />
    </View>
  );
};

const RecapStat = ({ stat, value }) => (
  <View styleName="vertical h-end">
    <Text style={{ color: "#FFFFFF", fontSize: 13 }}>{stat}</Text>
    <Text style={{ color: "#FFFFFF" }} styleName="bold">
      {value}
    </Text>
  </View>
);

const SideOverview = ({ side, title }) => {
  const sideImage = getSideImage(side);

  return (
    <View styleName="horizontal v-center">
      <Image source={sideImage} styleName="extra-small" />
      <Title style={style.victory} styleName={side}>
        {title}
      </Title>
    </View>
  );
};

const MatchRecap = ({ matchRecap, height }) => {
  let sideVictoryImage = require("../assets/dire.png");
  let heading = (
    <Heading style={{ color: themeColors.dire }}>DIRE VICTORY</Heading>
  );

  if (matchRecap.radiantWin) {
    sideVictoryImage = require("../assets/radiant.png");
    heading = (
      <Heading style={{ color: themeColors.radiant, fontWeight: "bold" }}>
        RADIANT VICTORY
      </Heading>
    );
  }

  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.2)",
        padding: 10,
        marginBottom: 10,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        height: height,
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <View styleName="horizontal h-center v-center">
        <Image source={sideVictoryImage} styleName="side-avatar" />
        {heading}
      </View>
      <View
        styleName="horizontal space-between"
        style={{ alignItems: "center" }}
      >
        <Text
          style={{ color: themeColors.radiant, fontSize: 40 }}
          styleName="md-gutter-left"
        >
          {matchRecap.radiantKills}
        </Text>
        <View styleName="vertical">
          <Text styleName="h-center">{matchRecap.gameMode}</Text>
          <Text
            style={{ color: themeColors.white, fontSize: 28 }}
            styleName="bold h-center"
          >
            {matchRecap.formattedDuration}
          </Text>
          <Text styleName="h-center">ENDED {matchRecap.endedTime} AGO</Text>
        </View>
        <Text
          style={{ color: themeColors.dire, fontSize: 40 }}
          styleName="md-gutter-right"
        >
          {matchRecap.direKills}
        </Text>
      </View>
      <View styleName="horizontal space-between">
        <RecapStat stat="MATCH ID" value={matchRecap.matchId} />
        <RecapStat stat="REGION" value={reduceText(matchRecap.region, 9)} />
        <RecapStat stat="SKILL" value={matchRecap.skill} />
        <RecapStat stat="AVG MMR" value={matchRecap.averageMMR} />
      </View>
      {matchRecap.isWarning && (
        <Text
          style={{
            color: themeColors.orange,
            fontSize: 13,
            marginTop: 10,
            textAlign: "center"
          }}
        >
          The replay for this match has not yet been parsed. Not all data may be
          available.
        </Text>
      )}
    </View>
  );
};

// container - MatchOverview
class MatchOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radiantRow: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      },
      direRow: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      },
      sections: [],
      lastRowPressed: "",
      abilityDetailsModal: false
    };

    this.generateProcessedPlayers = this.generateProcessedPlayers.bind(this);
    this.getRegionIndex = this.getRegionIndex.bind(this);
    this.getItemName = this.getItemName.bind(this);
    this.findItemTiming = this.findItemTiming.bind(this);
    this.calculateAverageMMR = this.calculateAverageMMR.bind(this);
    this.onRadiantRowPressed = this.onRadiantRowPressed.bind(this);
    this.onDireRowPressed = this.onDireRowPressed.bind(this);
    this.normalizeGameMode = this.normalizeGameMode.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.toggleAbilityPopup = this.toggleAbilityPopup.bind(this);
    this.fetchingData = this.fetchingData.bind(this);
    this.onRefreshing = this.fetchingData.bind(this, true);
    this.onNamePress = this.onNamePress.bind(this);

    this.getItemLayout = sectionListGetItemLayout({
      getItemHeight: (rowData, sectionIndex, rowIndex) => {
        if (sectionIndex == 0) {
          return rowData.isWarning ? 200 : 180;
        } else if (sectionIndex == 1 || sectionIndex == 2) {
          if (rowIndex == 0) {
            return 40;
          } else {
            return PLAYER_STAT_ROW_HEIGHT;
          }
        } else if (sectionIndex == 3 || sectionIndex == 4) {
          return 40 + 5 * CELL_SIZE;
        } else if (sectionIndex == 5 || sectionIndex == 6) {
          return 380;
        }
      },

      // These four properties are optional
      getSectionHeaderHeight: () => 50 // The height of your section headers
    });
  }

  componentWillMount() {
    if (
      !_.isEmpty(this.props.matchDetails) &&
      this.props.matchDetails.players.length > 0
    ) {
      var sections = this.processRawData(this.props.matchDetails);
      //console.log(sections);
      this.setState({ sections: sections });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      "componentWillReceiveProps matchoverview " +
        JSON.stringify(nextProps.matchDetails)
    );
    if (
      !_.isEmpty(nextProps.matchDetails) &&
      nextProps.matchDetails.players.length > 0
    ) {
      var sections = this.processRawData(nextProps.matchDetails);
      this.setState({ sections: sections });
    }
  }

  componentDidMount() {
    this.fetchingData();
  }

  fetchingData(refreshing = false) {
    const { matchId } = this.props.navigation.state.params;
    if (matchId != 0) {
      this.props.actions.fetchMatchDetails(matchId, refreshing);
    }
  }

  onNamePress(accountId) {
    this.props.navigation.dispatch(
      navigateToMenuScreen(ScreenTypes.PlayerOverview, { accountId })
    );
  }

  onRadiantRowPressed(index) {
    const { radiantRow } = this.state;
    radiantRow[index] = !radiantRow[index];
    this.setState({
      radiantRow,
      lastRowPressed: "radiant" + index + radiantRow[index]
    });
  }

  onDireRowPressed(index) {
    const { direRow } = this.state;
    direRow[index] = !direRow[index];
    this.setState({ direRow });
    this.setState({ direRow, lastRowPressed: "dire" + index + direRow[index] });
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

  calculateAverageMMR(data) {
    var totalMMR = 0;
    var availablePlayers = 0;
    for (i = 0; i < data.length; i++) {
      if (data[i].solo_competitive_rank) {
        availablePlayers++;
        totalMMR += data[i].solo_competitive_rank;
      }
    }
    var averageMMR = Math.round(totalMMR / availablePlayers);
    return averageMMR;
  }

  getRegionIndex(regionId, regionsArray) {
    for (i = 0; i < regionsArray.length; i++) {
      if (regionId == regionsArray[i].id) {
        return i;
      }
    }
  }

  generateProcessedPlayers(unprocessedPlayersList) {
    var processedPlayersList = [];
    for (i = 0; i < unprocessedPlayersList.length; i++) {
      var currentUnprocessedPlayer = unprocessedPlayersList[i];

      var processedPlayer = {};
      processedPlayer.hero = currentUnprocessedPlayer.hero_id;
      if (currentUnprocessedPlayer.account_id) {
        processedPlayer.player = currentUnprocessedPlayer.personaname;
      } else {
        processedPlayer.player = "Anonymous";
      }
      processedPlayer.soloCompetitiveRank =
        currentUnprocessedPlayer.solo_competitive_rank;
      processedPlayer.level = currentUnprocessedPlayer.level;
      processedPlayer.kills = currentUnprocessedPlayer.kills;
      processedPlayer.deaths = currentUnprocessedPlayer.deaths;
      processedPlayer.assists = currentUnprocessedPlayer.assists;
      processedPlayer.gpm = currentUnprocessedPlayer.gold_per_min;
      processedPlayer.xpm = currentUnprocessedPlayer.xp_per_min;
      processedPlayer.lastHits = currentUnprocessedPlayer.last_hits;
      processedPlayer.denies = currentUnprocessedPlayer.denies;
      processedPlayer.heroDamage = kFormatter(
        currentUnprocessedPlayer.hero_damage
      );
      processedPlayer.heroHealing = kFormatter(
        currentUnprocessedPlayer.hero_healing
      );
      processedPlayer.towerDamage = kFormatter(
        currentUnprocessedPlayer.tower_damage
      );
      processedPlayer.totalGold = kFormatter(
        currentUnprocessedPlayer.total_gold
      );

      processedPlayer.color =
        playerColors[currentUnprocessedPlayer.player_slot];

      processedPlayer.backpack_0 = currentUnprocessedPlayer.backpack_0;
      var backpack_0_name = this.getItemName(processedPlayer.backpack_0);
      if (backpack_0_name) {
        var itemTiming = this.findItemTiming(
          currentUnprocessedPlayer.purchase_log,
          backpack_0_name
        );
        if (itemTiming) {
          processedPlayer.backpack_0_timing = moment("1900-01-01 00:00:00")
            .add(itemTiming, "seconds")
            .format("mm:ss");
        }
      }
      processedPlayer.backpack_1 = currentUnprocessedPlayer.backpack_1;
      var backpack_1_name = this.getItemName(processedPlayer.backpack_1);
      if (backpack_1_name) {
        var itemTiming = this.findItemTiming(
          currentUnprocessedPlayer.purchase_log,
          backpack_1_name
        );
        if (itemTiming) {
          processedPlayer.backpack_1_timing = moment("1900-01-01 00:00:00")
            .add(itemTiming, "seconds")
            .format("mm:ss");
        }
      }
      processedPlayer.backpack_2 = currentUnprocessedPlayer.backpack_2;
      var backpack_2_name = this.getItemName(processedPlayer.backpack_2);
      if (backpack_2_name) {
        var itemTiming = this.findItemTiming(
          currentUnprocessedPlayer.purchase_log,
          backpack_2_name
        );
        if (itemTiming) {
          processedPlayer.backpack_2_timing = moment("1900-01-01 00:00:00")
            .add(itemTiming, "seconds")
            .format("mm:ss");
        }
      }
      processedPlayer.item_0 = currentUnprocessedPlayer.item_0;
      var item_0_name = this.getItemName(processedPlayer.item_0);
      if (item_0_name) {
        var itemTiming = this.findItemTiming(
          currentUnprocessedPlayer.purchase_log,
          item_0_name
        );
        if (itemTiming) {
          processedPlayer.item_0_timing = moment("1900-01-01 00:00:00")
            .add(itemTiming, "seconds")
            .format("mm:ss");
        }
      }
      processedPlayer.item_1 = currentUnprocessedPlayer.item_1;
      var item_1_name = this.getItemName(processedPlayer.item_1);
      if (item_1_name) {
        var itemTiming = this.findItemTiming(
          currentUnprocessedPlayer.purchase_log,
          item_1_name
        );
        if (itemTiming) {
          processedPlayer.item_1_timing = moment("1900-01-01 00:00:00")
            .add(itemTiming, "seconds")
            .format("mm:ss");
        }
      }
      processedPlayer.item_2 = currentUnprocessedPlayer.item_2;
      var item_2_name = this.getItemName(processedPlayer.item_2);
      if (item_2_name) {
        var itemTiming = this.findItemTiming(
          currentUnprocessedPlayer.purchase_log,
          item_2_name
        );
        if (itemTiming) {
          processedPlayer.item_2_timing = moment("1900-01-01 00:00:00")
            .add(itemTiming, "seconds")
            .format("mm:ss");
        }
      }
      processedPlayer.item_3 = currentUnprocessedPlayer.item_3;
      var item_3_name = this.getItemName(processedPlayer.item_3);
      if (item_3_name) {
        var itemTiming = this.findItemTiming(
          currentUnprocessedPlayer.purchase_log,
          item_3_name
        );
        if (itemTiming) {
          processedPlayer.item_3_timing = moment("1900-01-01 00:00:00")
            .add(itemTiming, "seconds")
            .format("mm:ss");
        }
      }
      processedPlayer.item_4 = currentUnprocessedPlayer.item_4;
      var item_4_name = this.getItemName(processedPlayer.item_4);
      if (item_4_name) {
        var itemTiming = this.findItemTiming(
          currentUnprocessedPlayer.purchase_log,
          item_4_name
        );
        if (itemTiming) {
          processedPlayer.item_4_timing = moment("1900-01-01 00:00:00")
            .add(itemTiming, "seconds")
            .format("mm:ss");
        }
      }
      processedPlayer.item_5 = currentUnprocessedPlayer.item_5;
      var item_5_name = this.getItemName(processedPlayer.item_5);
      if (item_5_name) {
        var itemTiming = this.findItemTiming(
          currentUnprocessedPlayer.purchase_log,
          item_5_name
        );
        if (itemTiming) {
          processedPlayer.item_5_timing = moment("1900-01-01 00:00:00")
            .add(itemTiming, "seconds")
            .format("mm:ss");
        }
      }
      processedPlayer.backpack_0_uri = getItemImage(
        currentUnprocessedPlayer.backpack_0
      );
      processedPlayer.backpack_1_uri = getItemImage(
        currentUnprocessedPlayer.backpack_1
      );
      processedPlayer.backpack_2_uri = getItemImage(
        currentUnprocessedPlayer.backpack_2
      );
      processedPlayer.item_0_uri = getItemImage(
        currentUnprocessedPlayer.item_0
      );
      processedPlayer.item_1_uri = getItemImage(
        currentUnprocessedPlayer.item_1
      );
      processedPlayer.item_2_uri = getItemImage(
        currentUnprocessedPlayer.item_2
      );
      processedPlayer.item_3_uri = getItemImage(
        currentUnprocessedPlayer.item_3
      );
      processedPlayer.item_4_uri = getItemImage(
        currentUnprocessedPlayer.item_4
      );
      processedPlayer.item_5_uri = getItemImage(
        currentUnprocessedPlayer.item_5
      );

      processedPlayer.accountId = currentUnprocessedPlayer.account_id;
      processedPlayer.slot = i;

      //Ability Build
      processedPlayer.abilityUpgrades = currentUnprocessedPlayer.ability_upgrades_arr
        ? currentUnprocessedPlayer.ability_upgrades_arr
        : [];

      //use as key for sectionlist item
      processedPlayer.key = currentUnprocessedPlayer.player_slot;
      processedPlayersList[i] = processedPlayer;
    }
    return processedPlayersList;
  }

  getItemName(itemId) {
    for (var key in items) {
      if (items.hasOwnProperty(key)) {
        if (key == itemId) {
          return items[key];
        }
      }
    }
  }

  findItemTiming(purchaseLog, itemName) {
    for (var purchase in purchaseLog) {
      if (purchaseLog.hasOwnProperty(purchase)) {
        if (purchaseLog[purchase].key == itemName) {
          return purchaseLog[purchase].time;
        }
      }
    }
  }

  processRawData(data) {
    //#region Match Recap
    let matchRecap = {
      data: [],
      key: "1",
      renderItem: ({ item }) => (
        <MatchRecap matchRecap={item} height={item.isWarning ? 200 : 180} />
      )
    };
    let recap = {};
    recap.key = data.duration;
    var duration = moment("1900-01-01 00:00:00")
      .add(data.duration, "seconds")
      .format("HH:mm:ss");
    recap.formattedDuration = duration;
    recap.radiantScore = data.radiant_score;
    recap.direScore = data.dire_score;
    recap.radiantWin = data.radiant_win;
    recap.isWarning = data.radiant_gold_adv ? false : true;

    if (data.duration && data.start_time) {
      var endedTime = (data.start_time + data.duration) * 1000;
      var now = moment();
      friendlyEndedTime = moment.duration(now.diff(endedTime)).humanize();
      recap.endedTime = friendlyEndedTime.toUpperCase();
    }

    if (data.game_mode) {
      var localizedName = this.normalizeGameMode(gameMode[data.game_mode].name);
      recap.gameMode = localizedName;
    }
    if (data.match_id) {
      recap.matchId = data.match_id;
    }

    if (data.region) {
      var index = this.getRegionIndex(data.region, regionsArray);
      recap.region = regionsArray[index].localized_name;
    }

    if (data.players) {
      var players = data.players;
      recap.averageMMR = this.calculateAverageMMR(players);
    }

    if (data.skill) {
      if (data.skill == 1) {
        recap.skill = "Normal";
      } else if (data.skill == 2) {
        recap.skill = "High";
      } else if (data.skill == 3) {
        recap.skill = "Very High";
      }
    } else {
      recap.skill = "Unknown";
    }
    //#endregion Match Recap

    //#region Radiant Gold Adv
    let radiantGoldAdv = {
      data: [],
      key: "2",
      renderItem: ({ item }) => {
        return this.renderGoldGraph(item);
      }
    };

    let radiantGoldData = {};
    radiantGoldData.key = "radiant_gold_data";

    if (data.radiant_gold_adv) {
      let graphDataArray = [];
      let graphData = [];
      for (var point in data.radiant_gold_adv) {
        if (data.radiant_gold_adv.hasOwnProperty(point)) {
          var newPoint = {
            x: parseInt(point),
            y: data.radiant_gold_adv[point]
          };
          graphData.push(newPoint);
        }
      }
      graphDataArray.push(graphData);
      radiantGoldData.radiantGoldAdvantage = graphDataArray;
      radiantGoldAdv.data.push(radiantGoldData);
    }
    //#endregion Radiant Gold Adv

    //#region Radiant XP Adv
    let radiantXPAdv = {
      data: [],
      key: "3",
      renderItem: ({ item }) => {
        return this.renderXPGraph(item);
      }
    };

    let radiantXPData = {};
    radiantXPData.key = "radiant_xp_data";

    if (data.radiant_xp_adv) {
      let graphDataArray = [];
      let graphData = [];
      for (var point in data.radiant_xp_adv) {
        if (data.radiant_xp_adv.hasOwnProperty(point)) {
          var newPoint = { x: parseInt(point), y: data.radiant_xp_adv[point] };
          graphData.push(newPoint);
        }
      }
      graphDataArray.push(graphData);
      radiantXPData.radiantXpAdvantage = graphDataArray;
      radiantXPAdv.data.push(radiantXPData);
    }
    //#endregion Radiant XP Adv

    //#region Radiant Players Overview
    let radiantPlayers = {
      data: [],
      key: "4",
      renderItem: ({ item, index }) => {
        const func = item.accountId
          ? () => this.onNamePress(item.accountId)
          : () => {};
        return (
          <PlayerStatsRow
            player={item}
            index={index}
            showDetails={this.state.radiantRow[index]}
            onPress={() => this.onRadiantRowPressed(index)}
            onNamePress={func}
          />
        );
      }
    };

    let direPlayers = {
      data: [],
      key: "5",
      renderItem: ({ item, index }) => {
        const func = item.accountId
          ? () => this.onNamePress(item.accountId)
          : () => {};
        return (
          <PlayerStatsRow
            player={item}
            index={index}
            showDetails={this.state.direRow[index]}
            onPress={() => this.onDireRowPressed(index)}
            onNamePress={func}
          />
        );
      }
    };

    var players = data.players;
    var processedPlayersList = this.generateProcessedPlayers(players);

    var radiantPlayersList = processedPlayersList.slice(0, 5);
    radiantPlayers.data = radiantPlayersList.slice();
    radiantPlayers.data.unshift({ key: "radiant_header" });

    var direPlayersList = processedPlayersList.slice(5, 10);
    direPlayers.data = direPlayersList.slice();
    direPlayers.data.unshift({ key: "dire_header" });
    //#endregion Radiant Players Overview

    let radiantKills = 0;
    for (let player of radiantPlayersList) {
      radiantKills += player.kills;
    }
    let direKills = 0;
    for (let player of direPlayersList) {
      direKills += player.kills;
    }
    recap.radiantKills = radiantKills;
    recap.direKills = direKills;

    matchRecap.data.push(recap);

    //#region Radiant's ability build

    const radiantPlayersObject = radiantPlayersList.reduce((acc, cur, i) => {
      acc[i] = cur;
      return acc;
    }, {});

    let radiantAbilityBuild = {
      data: [],
      key: "6",
      renderItem: ({ item, index }) => {
        return (
          <SkillBuild data={item} onAbilityPress={this.toggleAbilityPopup} />
        );
      }
    };

    let radiantAbilityData = {};
    radiantAbilityData.key = "radiant_ability_build";
    radiantAbilityData.playersData = radiantPlayersObject;
    radiantAbilityBuild.data.push(radiantAbilityData);

    //#endregion Radiant's ability build

    //#region Dire's ability build

    const direPlayersObject = direPlayersList.reduce((acc, cur, i) => {
      acc[i] = cur;
      return acc;
    }, {});

    let direAbilityBuild = {
      data: [],
      key: "7",
      renderItem: ({ item, index }) => {
        return (
          <SkillBuild data={item} onAbilityPress={this.toggleAbilityPopup} />
        );
      }
    };

    let direAbilityData = {};
    direAbilityData.key = "dire_ability_build";
    direAbilityData.playersData = direPlayersObject;
    direAbilityBuild.data.push(direAbilityData);

    //#endregion Dire's ability build

    let result = [
      matchRecap,
      radiantPlayers,
      direPlayers,
      radiantAbilityBuild,
      direAbilityBuild
    ];

    if (data.radiant_gold_adv) {
      result.push(radiantGoldAdv);
    }

    if (data.radiant_xp_adv) {
      result.push(radiantXPAdv);
    }

    return result;
  }

  renderGoldGraph(item) {
    let goldGraph = <View />;
    if (item.radiantGoldAdvantage) {
      let options = {
        width: item.radiantGoldAdvantage[0].length * 10,
        height: 380,
        color: "#fd7f28",
        margin: {
          top: 18,
          left: 50,
          bottom: 40,
          right: 20
        },
        animate: {
          type: "delayed",
          duration: 200
        },
        axisX: {
          showAxis: false,
          showLines: true,
          showLabels: true,
          showTicks: true,
          zeroAxis: true,
          orient: "bottom",
          tickValues: [],
          gridColor: themeColors.greyBorder,
          hideGrid: true,
          label: {
            //fontFamily: "Arial",
            fontSize: 13,
            fill: themeColors.white
          }
        },
        axisY: {
          showAxis: false,
          showLines: true,
          showLabels: true,
          showTicks: true,
          zeroAxis: true,
          orient: "left",
          gridColor: themeColors.greyBorder,
          tickValues: [
            { value: -35000 },
            { value: -30000 },
            { value: -25000 },
            { value: -20000 },
            { value: -15000 },
            { value: -10000 },
            { value: -5000 },
            { value: 0 },
            { value: 5000 },
            { value: 10000 },
            { value: 15000 },
            { value: 20000 },
            { value: 25000 },
            { value: 30000 },
            { value: 35000 }
          ],
          label: {
            fontFamily: "Arial",
            fontSize: 14,
            fill: themeColors.white
          }
        }
      };
      goldGraph = (
        <View style={{ backgroundColor: themeColors.backgroundTableEven }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View style={{ flexDirection: "row" }}>
              <StockLine
                data={item.radiantGoldAdvantage}
                options={options}
                xKey="x"
                yKey="y"
              />
            </View>
          </ScrollView>
        </View>
      );
    }

    return goldGraph;
  }

  renderXPGraph(item) {
    let xpGraph = <View />;
    if (item.radiantXpAdvantage) {
      let options = {
        width: item.radiantXpAdvantage[0].length * 10,
        height: 380,
        color: "#2576b0",
        margin: {
          top: 18,
          left: 50,
          bottom: 40,
          right: 20
        },
        animate: {
          type: "delayed",
          duration: 200
        },
        axisX: {
          showAxis: false,
          showLines: true,
          showLabels: true,
          showTicks: true,
          zeroAxis: true,
          orient: "bottom",
          tickValues: [],
          gridColor: themeColors.greyBorder,
          hideGrid: true,
          label: {
            //fontFamily: "Arial",
            fontSize: 13,
            fill: themeColors.white
          }
        },
        axisY: {
          showAxis: false,
          showLines: true,
          showLabels: true,
          showTicks: true,
          zeroAxis: true,
          orient: "left",
          gridColor: themeColors.greyBorder,
          tickValues: [
            { value: -35000 },
            { value: -30000 },
            { value: -25000 },
            { value: -20000 },
            { value: -15000 },
            { value: -10000 },
            { value: -5000 },
            { value: 0 },
            { value: 5000 },
            { value: 10000 },
            { value: 15000 },
            { value: 20000 },
            { value: 25000 },
            { value: 30000 },
            { value: 35000 }
          ],
          label: {
            fontFamily: "Arial",
            fontSize: 13,
            fill: themeColors.white
          }
        }
      };
      xpGraph = (
        <View style={{ backgroundColor: themeColors.backgroundTableEven }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View style={{ flexDirection: "row" }}>
              <StockLine
                data={item.radiantXpAdvantage}
                options={options}
                xKey="x"
                yKey="y"
              />
            </View>
          </ScrollView>
        </View>
      );
    }
    return xpGraph;
  }

  renderSectionHeader({ section }) {
    if (section.key == 1) {
      return <View />;
    } else if (section.key == 2) {
      return (
        <SectionHeader
          title="Radiant Gold Advantage"
          imgUrl={require("../assets/stats_bar.png")}
        />
      );
    } else if (section.key == 3) {
      return (
        <SectionHeader
          title="Radiant XP Advantage"
          imgUrl={require("../assets/stats_bar.png")}
        />
      );
    } else if (section.key == 4) {
      return (
        <SectionHeader
          title="Radiant"
          imgUrl={require("../assets/radiant.png")}
        />
      );
    } else if (section.key == 5) {
      return (
        <SectionHeader title="Dire" imgUrl={require("../assets/dire.png")} />
      );
    } else if (section.key == 6) {
      return (
        <SectionHeader
          title="Radiant - Ability Build"
          imgUrl={require("../assets/radiant.png")}
        />
      );
    } else if (section.key == 7) {
      return (
        <SectionHeader
          title="Dire - Ability Build"
          imgUrl={require("../assets/dire.png")}
        />
      );
    }
  }

  toggleAbilityPopup() {
    this.setState({ abilityDetailsModal: !this.state.abilityDetailsModal });
  }

  render() {
    const styles = this.props.style;
    const { isLoadingMatchDetails, isRefreshingMatchDetails } = this.props;
    const { sections } = this.state;

    let content = <View />;
    if (isLoadingMatchDetails) {
      content = <Loading />;
    } else if (sections.length > 0) {
      content = (
        <SectionList
          style={styles.sectionListContainer}
          sections={this.state.sections}
          renderSectionHeader={this.renderSectionHeader}
          extraData={this.state.lastRowPressed}
          getItemLayout={this.getItemLayout}
          refreshing={isRefreshingMatchDetails}
          onRefresh={this.onRefreshing}
        />
      );
    }

    return (
      <View styleName="horizontal h-center v-center fill-parent dota2">
        {content}
        <Modal
          isVisible={this.state.abilityDetailsModal}
          onBackdropPress={this.toggleAbilityPopup}
        >
          <View style={styles.modalContent}>
            <Text>Hello!</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

MatchOverview.navigationOptions = {
  title: "Match Details",
  tabBarLabel: "Overview"
};

const styles = {
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  container: {
    ".odd": {
      backgroundColor: themeColors.backgroundTableOdd
    },
    ".even": {
      backgroundColor: themeColors.backgroundTableEven
    }
  },
  statContainer: {
    alignSelf: "center",
    flex: 1
  },
  playerContainer: {
    borderLeftWidth: 2,
    borderColor: "rgb(173, 0, 173)"
  },
  playerInfoContainer: {
    flex: 1
  },
  player: {
    backgroundColor: "transparent"
  },
  itemContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginBottom: 2
  },
  level: {
    position: "absolute",
    color: themeColors.white,
    alignSelf: "flex-end",
    backgroundColor: themeColors.backgroundTextImage
  },
  timeItem: {
    position: "absolute",
    color: themeColors.white,
    backgroundColor: themeColors.backgroundTextImage,
    alignSelf: "center",
    bottom: 1
  },
  item: {
    marginLeft: 5,
    borderWidth: 1,
    borderColor: themeColors.white
  },
  heroAvatarContainer: {
    alignSelf: "flex-start"
  },
  sectionListContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15
  },
  statRow: {
    flex: 1,
    justifyContent: "space-between"
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
  playerName: {
    color: themeColors.white
  },
  kills: {
    ".radiant": {
      color: themeColors.radiant
    },
    ".dire": {
      color: themeColors.dire
    },
    fontSize: 45
  },
  victoryContainer: {},
  victory: {
    ".radiant": {
      color: themeColors.radiant
    },
    ".dire": {
      color: themeColors.dire
    },
    marginLeft: 5
  },
  scoreContainer: {
    alignItems: "center"
  },
  duration: {
    color: themeColors.white,
    fontSize: 28
  }
};

function mapStateToProps(state) {
  return {
    isRefreshingMatchDetails: state.matchDetailsState.isRefreshingMatchDetails,
    matchDetails: state.matchDetailsState.matchDetails,
    isLoadingMatchDetails: state.matchDetailsState.isLoadingMatchDetails,
    isEmptyMatchDetails: state.matchDetailsState.isEmptyMatchDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(matchDetailsAction, dispatch)
  };
}

export default connectStyle("dota2app.MatchOverview", styles)(
  connect(mapStateToProps, mapDispatchToProps)(MatchOverview)
);
