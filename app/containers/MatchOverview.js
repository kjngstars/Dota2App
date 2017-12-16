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
  Title
} from "@shoutem/ui";
import PlayerStatsRow, { Item, Stat } from "../components/PlayerStatsRow";
import { connectStyle } from "@shoutem/theme";
import ScreenTypes from "../navigators/ScreenTypes";
import { getHeroImage } from "../utils/getHeroImage";
import { getItemImage } from "../utils/getItemImage";
import { kFormatter } from "../utils/kFormatter";
import regionsArray from "../json/regions_list.json";
import gameMode from "dotaconstants/build/game_mode.json";
import items from "dotaconstants/build/item_ids.json";
import moment from "moment";
import themeColors from "../themes/colors";
import { Heading } from "@shoutem/ui/components/Text";
import Line from "../components/Line";
import { StockLine } from "react-native-pathjs-charts";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as matchDetailsAction from "../actions/MatchDetailsAction";

// components
const RecapStat = ({ stat, value }) => (
  <View styleName="vertical h-end">
    <Text style={{ color: "#FFFFFF", fontSize: 13 }}>{stat}</Text>
    <Text style={{ color: "#FFFFFF" }} styleName="bold">
      {value}
    </Text>
  </View>
);

function getRadiantDireImage(side) {
  let sideImage = (sideImage = require("../assets/radiant.png"));
  if (side == "dire") sideImage = require("../assets/dire.png");
  return sideImage;
}

const SideOverview = ({ side, title }) => {
  const sideImage = getRadiantDireImage(side);

  return (
    <View styleName="horizontal v-center">
      <Image source={sideImage} styleName="extra-small" />
      <Title style={style.victory} styleName={side}>
        {title}
      </Title>
    </View>
  );
};

const MatchRecap = ({ matchRecap }) => {
  let sideVictoryImage = require("../assets/dire.png");
  let heading = (
    <Heading style={{ color: themeColors.dire }}>DIRE VICTORY</Heading>
  );

  if (matchRecap.radiantWin) {
    sideVictoryImage = require("../assets/radiant.png");
    heading = (
      <Heading style={{ color: themeColors.radiant, fontWeight: 'bold' }}>RADIANT VICTORY</Heading>
    );
  }  

  return (
    <View style={{backgroundColor: 'rgba(255,255,255,0.109)', marginBottom: 10}}>
      <View styleName="horizontal h-center v-center">
        <Image source={sideVictoryImage} styleName="side-avatar" />
        {heading}
      </View>
      <View
        styleName="horizontal space-between"
        style={{ alignItems: "center" }}
      >
        <Text style={{ color: themeColors.radiant, fontSize: 40 }} styleName="md-gutter-left">
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
        <Text style={{ color: themeColors.dire, fontSize: 40 }} styleName="md-gutter-right">
          {matchRecap.direKills}
        </Text>
      </View>
      <View styleName="horizontal space-between">
        <RecapStat stat="MATCH ID" value={matchRecap.matchId} />
        <RecapStat stat="REGION" value={matchRecap.region} />
        <RecapStat stat="SKILL" value={matchRecap.skill} />
        <RecapStat stat="AVG MMR" value={matchRecap.averageMMR} />
      </View>
      
    </View>
  );
};

// container - MatchOverview
class MatchOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: []
    };

    this.generateProcessedPlayers = this.generateProcessedPlayers.bind(this);
    this.generateProcessedData = this.generateProcessedData.bind(this);
    this.getRegionIndex = this.getRegionIndex.bind(this);
    this.getItemName = this.getItemName.bind(this);
    this.findItemTiming = this.findItemTiming.bind(this);
    this.calculateAverageMMR = this.calculateAverageMMR.bind(this);
    // this.onRowPressed = this.onRowPressed.bind(this);
    // this.onNamePressed = this.onNamePressed.bind(this);
    this.normalizeGameMode = this.normalizeGameMode.bind(this);
    //this.sortPlayers = this.sortPlayers.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
  }

  componentWillMount() {
    if (this.props.matchDetails && this.props.matchDetails.players.length > 0) {
      var sections = this.processRawData(this.props.matchDetails);
      //console.log(sections);
      this.setState({ sections: sections });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.matchDetails && nextProps.matchDetails.players.length > 0) {
      var sections = this.processRawData(nextProps.matchDetails);
      //console.log(sections);
      this.setState(sections);
    }
  }

  generateProcessedData(data) {
    var duration = moment("1900-01-01 00:00:00")
      .add(data.duration, "seconds")
      .format("HH:mm:ss");
    this.setState({ formattedDuration: duration });
    this.setState({ radiantScore: data.radiant_score });
    this.setState({ direScore: data.dire_score });
    this.setState({ radiantWin: data.radiant_win });

    if (data.duration && data.start_time) {
      var endedTime = (data.start_time + data.duration) * 1000;
      var now = moment();
      friendlyEndedTime = moment.duration(now.diff(endedTime)).humanize();
      this.setState({ endedTime: friendlyEndedTime.toUpperCase() });
    }
    if (data.game_mode) {
      var localizedName = this.normalizeGameMode(gameMode[data.game_mode].name);
      this.setState({ gameMode: localizedName });
    }
    if (data.match_id) {
      this.setState({ matchId: data.match_id });
    }

    if (data.region) {
      var index = this.getRegionIndex(data.region, regionsArray);
      this.setState({ region: regionsArray[index].localized_name });
    }

    if (data.players) {
      var players = data.players;
      this.calculateAverageMMR(players);
    }

    if (data.skill) {
      if (data.skill == 1) {
        this.setState({ skill: "Normal" });
      } else if (data.skill == 2) {
        this.setState({ skill: "High" });
      } else if (data.skill == 3) {
        this.setState({ skill: "Very High" });
      }
    }

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
      this.setState({ radiantGoldAdvantage: graphDataArray });
    }

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
      this.setState({ radiantXpAdvantage: graphDataArray });
    }
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
      renderItem: ({ item }) => <MatchRecap matchRecap={item} />
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
    }
    else{
      recap.skill = "Unknown";
    }  
    //#endregion Match Recap

    //#region Radiant Gold Adv
    let radiantGoldAdv = {
      data: [],
      key: "2",
      renderItem: ""
    };

    let radiantGoldData = {};

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
      renderItem: ""
    };

    let radiantXPData = {};

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

    //#region  Radiant Players Overview
    let radiantPlayers = {
      data: [],
      key: "4",
      renderItem: ({ item, index }) => {
        if (index % 2) {
          return (<PlayerStatsRow player={item} isOdd/>);
        }
        return (<PlayerStatsRow player={item} />);
      }
    };

    let direPlayers = {
      data: [],
      key: "5",
      renderItem: ({ item, index }) => {
        if (index % 2) {
          return (<PlayerStatsRow player={item} isOdd/>);
        }
        return (<PlayerStatsRow player={item} />);
      }
    };

    var players = data.players;
    var processedPlayersList = this.generateProcessedPlayers(players);

    var radiantPlayersList = processedPlayersList.slice(0, 5);
    radiantPlayers.data = radiantPlayersList;

    var direPlayersList = processedPlayersList.slice(5, 10);
    direPlayers.data = direPlayersList;
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

    return [matchRecap, radiantPlayers, direPlayers];
  }

  renderGoldGraph(item) {
    let goldGraph = <View />;
    if (item.radiantXpAdvantage) {
      let options = {
        width: item.radiantGoldAdvantage[0].length * 10,
        height: 380,
        color: "#fd7f28",
        margin: {
          top: 18,
          left: 50,
          bottom: 18,
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
          gridColor: this.props.secondLegend,
          hideGrid: true,
          label: {
            fontFamily: "Arial",
            fontSize: 14,
            fill: this.props.secondLegend
          }
        },
        axisY: {
          showAxis: false,
          showLines: true,
          showLabels: true,
          showTicks: true,
          zeroAxis: true,
          orient: "left",
          gridColor: this.props.secondLegend,
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
            fill: this.props.secondLegend
          }
        }
      };
      goldGraph = (
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
              marginHorizontal: 10
            }}
          >
            <Text>Radiant Gold Advantage</Text>
          </View>
          <View />
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
        width: this.state.radiantXpAdvantage[0].length * 10,
        height: 380,
        color: "#2576b0",
        margin: {
          top: 18,
          left: 50,
          bottom: 18,
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
          gridColor: this.props.secondLegend,
          hideGrid: true,
          label: {
            fontFamily: "Arial",
            fontSize: 14,
            fill: this.props.secondLegend
          }
        },
        axisY: {
          showAxis: false,
          showLines: true,
          showLabels: true,
          showTicks: true,
          zeroAxis: true,
          orient: "left",
          gridColor: this.props.secondLegend,
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
            fill: this.props.secondLegend
          }
        }
      };
      xpGraph = (
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
              marginHorizontal: 10
            }}
          >
            <Text
              style={[styles.titleText, { color: this.props.secondLegend }]}
            >
              Radiant XP Advantage
            </Text>
          </View>
          <View />
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View style={{ flexDirection: "row" }}>
              <StockLine
                data={this.state.radiantXpAdvantage}
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

  renderSectionHeader({section}){
    if(section.key==1){
      return <View />
    }
    else if(section.key==2){
      return <View/> 
    }
    else if(section.key==3){
      return <View/> 
    }
    else if(section.key==4){
      return (
        <View styleName="vertical">
        <View styleName="horizontal h-start">
          <Image source={require('../assets/radiant.png')} styleName="extra-small"/>
          <Title styleName="sm-gutter-left" style={{color:themeColors.radiant}}>Radiant - Overview</Title>
        </View>
        <Line color={themeColors.greyBorder}/>
        </View>
      ) 
    }
    else if(section.key==5){
      return (
        <View styleName="vertical">
        <View styleName="horizontal h-start">
          <Image source={require('../assets/dire.png')} styleName="extra-small"/>
          <Title styleName="sm-gutter-left" style={{color:themeColors.dire}}>Dire - Overview</Title>
        </View>
        <Line color={themeColors.greyBorder}/>
        </View>
      )
    }
  }

  render() {
    const styles = this.props.style;
    const { navigation } = this.props;
    let parsedWarning = <View />;
    // if (!this.props.matchDetails.radiant_gold_adv) {
    //   parsedWarning = (
    //     <View>
    //       <View style={{ flex: 7 }}>
    //         <Text style={{ color: this.props.secondLegend, fontSize: 16 }}>
    //           The replay for this match has not yet been parsed. Not all data
    //           may be available.
    //         </Text>
    //       </View>
    //     </View>
    //   );
    //   goldGraph = <View />;
    // }

    return (
      <View styleName="fill-parent dota2">
        <NavigationBarWithMatchSearch
          navigation={navigation}
          title="Overview"
        />
        <SectionList
          style={styles.sectionListContainer}
          sections={this.state.sections}
          renderSectionHeader = {this.renderSectionHeader}
        />
      </View>
    );
  }
}

MatchOverview.navigationOptions = {};

const styles = {
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
    marginRight: 15,    
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

export default connectStyle("dota2app.Overview", styles)(
  connect(mapStateToProps, mapDispatchToProps)(MatchOverview)
);
