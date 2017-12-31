import React, { Component } from "react";
import ScreenTypes from "../navigators/ScreenTypes";
import { NavigationBarWithMatchSearch } from "../components/NavigationBar";
import { View, Text, Image, Icon, TouchableOpacity } from "@shoutem/ui";
import Pagination from "../components/Pagination";
import HeroStatRowPublicMatch, {
  HERO_STAT_ROW_HEIGHT
} from "../components/HeroStatRowPublicMatch";
import { FlatList, ScrollView, Dimensions, Picker } from "react-native";
import Loading from "../components/Loading";
import { Pages } from "react-native-pages";
import ModalDropdown from "react-native-modal-dropdown";
import Line from "../components/Line";

import { createGroupedArray, round } from "../utils/utilsFunction";
import * as heroStatActions from "../actions/HeroStatAction";
import { navigateToMenuScreen, setParams } from "../actions/NavigationAction";

import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getHeroImage } from "../utils/getHeroImage";
import { kFormatter } from "../utils/kFormatter";

class HeroStatPublic extends Component {
  constructor(props) {
    super(props);

    let screenHeight = Dimensions.get("window").height;

    this.state = {
      screenHeight,
      groupedHeroStats: [],
      totalPulicMatches: "",
      selectedRankIndex: 6,
      currentPageIndex: 0,
      refreshing: false,
      sortedColumn: "id",
      ascending: true,
      ranks: [
        {
          name: "Herald",
          value: 1,
          imgUrl: require("../assets/rank_icons/rank_icon_1.png")
        },
        {
          name: "Guardian",
          value: 2,
          imgUrl: require("../assets/rank_icons/rank_icon_2.png")
        },
        {
          name: "Crusader",
          value: 3,
          imgUrl: require("../assets/rank_icons/rank_icon_3.png")
        },
        {
          name: "Archon",
          value: 4,
          imgUrl: require("../assets/rank_icons/rank_icon_4.png")
        },
        {
          name: "Legend",
          value: 5,
          imgUrl: require("../assets/rank_icons/rank_icon_5.png")
        },
        {
          name: "Ancient",
          value: 6,
          imgUrl: require("../assets/rank_icons/rank_icon_6.png")
        },
        {
          name: "Divine",
          value: 7,
          imgUrl: require("../assets/rank_icons/rank_icon_7.png")
        }
      ]
    };

    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.renderRowDropdown = this.renderRowDropdown.bind(this);
    this.onOptionSelected = this.onOptionSelected.bind(this);
    this.renderSeparatorDropdown = this.renderSeparatorDropdown.bind(this);
    this.onPage = this.onPage.bind(this);
    this.sortHero = this.sortStat.bind(this, "name");
    this.sortPick = this.sortStat.bind(this, "pick");
    this.sortWin = this.sortStat.bind(this, "win");
    this.onPressRow = this.onPressRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.heroStats != nextProps.heroStats) {
      const matchCounts = this.calculateTotalPublicMatches(nextProps.heroStats);
      const heroStats = this.processHeroStatsPublicMatch(
        nextProps.heroStats,
        matchCounts
      );
      const groupedHeroStats = [];
      for (let i = 0; i < heroStats.length; i++) {
        groupedHeroStats.push(createGroupedArray(heroStats[i], 20));
      }
      const currentRankStatsDisplay = groupedHeroStats[0];
      const totalPulicMatches = kFormatter(matchCounts[0]);
      this.setState({
        groupedHeroStats,
        currentRankStatsDisplay,
        totalPulicMatches
      });
    }
  }

  componentDidMount() {}

  calculateTotalPublicMatches(heroStats) {
    let totalPulicMatchesForEachRank = [];
    let sum = (a, b) => a + b;

    const matchCount7 =
      heroStats.map(heroStat => heroStat["7_pick"] || 0).reduce(sum, 0) / 10;
    const matchCount6 =
      heroStats.map(heroStat => heroStat["6_pick"] || 0).reduce(sum, 0) / 10;
    const matchCount5 =
      heroStats.map(heroStat => heroStat["5_pick"] || 0).reduce(sum, 0) / 10;
    const matchCount4 =
      heroStats.map(heroStat => heroStat["4_pick"] || 0).reduce(sum, 0) / 10;
    const matchCount3 =
      heroStats.map(heroStat => heroStat["3_pick"] || 0).reduce(sum, 0) / 10;
    const matchCount2 =
      heroStats.map(heroStat => heroStat["2_pick"] || 0).reduce(sum, 0) / 10;
    const matchCount1 =
      heroStats.map(heroStat => heroStat["1_pick"] || 0).reduce(sum, 0) / 10;

    const matchCountPublic =
      matchCount7 +
      matchCount6 +
      matchCount5 +
      matchCount4 +
      matchCount3 +
      matchCount2 +
      matchCount1;

    totalPulicMatchesForEachRank.push(
      matchCountPublic,
      matchCount1,
      matchCount2,
      matchCount3,
      matchCount4,
      matchCount5,
      matchCount6,
      matchCount7
    );

    return totalPulicMatchesForEachRank;
  }

  processHeroStatsPublicMatch(heroStats, matchCounts) {
    let processedData = [];
    let heraldStats = [],
      guardianStats = [],
      crusaderStats = [],
      archonStats = [],
      legendStats = [],
      ancientStats = [],
      divineStats = [];

    for (let i = 0; i < heroStats.length; i++) {
      const heroStat = heroStats[i];
      const heroName = heroStat["localized_name"];
      const heroImg = getHeroImage(heroStat["id"]);

      let heraldStat = {},
        guardianStat = {},
        crusaderStat = {},
        archonStat = {},
        legendStat = {},
        ancientStat = {},
        divineStat = {};

      heraldStat.heroName = heroName;
      guardianStat.heroName = heroName;
      crusaderStat.heroName = heroName;
      archonStat.heroName = heroName;
      legendStat.heroName = heroName;
      ancientStat.heroName = heroName;
      divineStat.heroName = heroName;

      heraldStat.heroImg = heroImg;
      guardianStat.heroImg = heroImg;
      crusaderStat.heroImg = heroImg;
      archonStat.heroImg = heroImg;
      legendStat.heroImg = heroImg;
      ancientStat.heroImg = heroImg;
      divineStat.heroImg = heroImg;

      heraldStat.id = heroStat["id"];
      guardianStat.id = heroStat["id"];
      crusaderStat.id = heroStat["id"];
      archonStat.id = heroStat["id"];
      legendStat.id = heroStat["id"];
      ancientStat.id = heroStat["id"];
      divineStat.id = heroStat["id"];

      const heraldPick = heroStat["1_pick"] || 0;
      const heraldWin = heroStat["1_win"] || 0;
      heraldStat.winMatches = heraldWin;
      heraldStat.winRate = heraldPick
        ? round(heraldWin / heraldPick * 100, 1)
        : 0;
      heraldStat.pickRate = round(heraldPick / matchCounts[1] * 100, 1);
      heraldStat.pickMatches = heraldPick;
      heraldStats[i] = heraldStat;

      const guardianPick = heroStat["2_pick"] || 0;
      const guardianWin = heroStat["2_win"] || 0;
      guardianStat.winMatches = guardianWin;
      guardianStat.winRate = guardianPick
        ? round(guardianWin / guardianPick * 100, 1)
        : 0;
      guardianStat.pickRate = round(guardianPick / matchCounts[2] * 100, 1);
      guardianStat.pickMatches = heraldPick;
      guardianStats[i] = guardianStat;

      const crusaderPick = heroStat["3_pick"] || 0;
      const crusaderWin = heroStat["3_win"] || 0;
      crusaderStat.winMatches = crusaderWin;
      crusaderStat.winRate = crusaderPick
        ? round(crusaderWin / crusaderPick * 100, 1)
        : 0;
      crusaderStat.pickRate = round(crusaderPick / matchCounts[3] * 100, 1);
      crusaderStat.pickMatches = crusaderPick;
      crusaderStats[i] = crusaderStat;

      const archonPick = heroStat["4_pick"] || 0;
      const archonWin = heroStat["4_win"] || 0;
      archonStat.winMatches = archonWin;
      archonStat.winRate = archonPick
        ? round(archonWin / archonPick * 100, 1)
        : 0;
      archonStat.pickRate = round(archonPick / matchCounts[4] * 100, 1);
      archonStat.pickMatches = archonPick;
      archonStats[i] = archonStat;

      const legendPick = heroStat["5_pick"] || 0;
      const legendWin = heroStat["5_win"] || 0;
      legendStat.winMatches = legendWin;
      legendStat.winRate = legendPick
        ? round(legendWin / legendPick * 100, 1)
        : 0;
      legendStat.pickRate = round(legendPick / matchCounts[5] * 100, 1);
      legendStat.pickMatches = legendPick;
      legendStats[i] = legendStat;

      const ancientdPick = heroStat["6_pick"] || 0;
      const ancientWin = heroStat["6_win"] || 0;
      ancientStat.winMatches = ancientWin;
      ancientStat.winRate = ancientdPick
        ? round(ancientWin / ancientdPick * 100)
        : 0;
      ancientStat.pickRate = round(ancientdPick / matchCounts[6] * 100, 1);
      ancientStat.pickMatches = ancientdPick;
      ancientStats[i] = ancientStat;

      const divinePick = heroStat["7_pick"] || 0;
      const divineWin = heroStat["7_win"] || 0;
      divineStat.winMatches = divineWin;
      divineStat.winRate = divinePick
        ? round(divineWin / divinePick * 100, 1)
        : 0;
      divineStat.pickRate = round(divinePick / matchCounts[1] * 100, 1);
      divineStat.pickMatches = divinePick;
      divineStats[i] = divineStat;
    }

    processedData.push(
      heraldStats,
      guardianStats,
      crusaderStats,
      archonStats,
      legendStats,
      ancientStats,
      divineStats
    );

    return processedData;
  }

  onPressRow(heroId) {
    this.props.navigation.dispatch(
      navigateToMenuScreen(ScreenTypes.HeroOverview, { heroId })
    );

    this.props.navigation.dispatch(
      setParams({ heroId: heroId }, ScreenTypes.HeroRanking)
    );
  }

  renderItem({ item, index }) {
    return (
      <HeroStatRowPublicMatch
        heroStat={item}
        index={index}
        onPress={() => this.onPressRow(item.id)}
      />
    );
  }

  getItemLayout(data, index) {
    return {
      offset: HERO_STAT_ROW_HEIGHT * index,
      length: HERO_STAT_ROW_HEIGHT,
      index
    };
  }

  onRefresh() {}

  onPage(index) {
    this.setState({ currentPageIndex: index });
  }

  renderFooter() {
    const { currentPageIndex, selectedRankIndex } = this.state;
    const totalPages = this.state.groupedHeroStats[selectedRankIndex].length;

    return (
      <Pagination
        totalPages={totalPages}
        currentIndex={currentPageIndex}
        numberPagesShow={5}
        onPage={this.onPage}
      />
    );
  }

  keyExtractor(item, index) {
    return item.heroName;
  }

  onOptionSelected(index, value) {
    this.setState({
      selectedRankIndex: index,
      currentPageIndex: 0,
      sortedColumn: "id",
      ascending: true
    });
  }

  renderRowDropdown(rowData, rowId) {
    if (rowId == this.state.selectedRankIndex) {
      return (
        <View
          styleName="horizontal h-start v-center sm-gutter"
          style={{ backgroundColor: "rgb(46, 47, 64)" }}
        >
          <Text
            style={{
              marginRight: 5,
              color: themeColors.orange,
              fontWeight: "bold"
            }}
          >
            {rowData.name}
          </Text>
          <Image source={rowData.imgUrl} styleName="small-avatar" />
        </View>
      );
    } else {
      return (
        <View
          styleName="horizontal h-start v-center sm-gutter"
          style={{ backgroundColor: "rgb(46, 47, 64)" }}
        >
          <Text style={{ marginRight: 5, color: "#fff" }}>{rowData.name}</Text>
          <Image source={rowData.imgUrl} styleName="small-avatar" />
        </View>
      );
    }
  }

  renderSeparatorDropdown() {
    return <Line color={"rgb(46, 47, 64)"} />;
  }

  sortByHeroName(a, b) {
    var nameA = a.heroName.toUpperCase();
    var nameB = b.heroName.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  }

  sortByStat(field) {
    return (a, b) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > [field]) {
        return -1;
      } else {
        this.sortByHeroName(a, b);
      }
    };
  }

  sortStat(column) {
    const {
      ascending,
      sortedColumn,
      groupedHeroStats,
      selectedRankIndex
    } = this.state;

    let sortField = "",
      isAscending = true,
      sortedStat = [],
      sortCriteria = {};

    if (column == sortedColumn) {
      isAscending = !ascending;

      const currentRankStats = groupedHeroStats[selectedRankIndex];
      const flattened = currentRankStats.reduce((a, b) => {
        return a.concat(b);
      });
      const reverse = flattened.reverse();
      groupedHeroStats[selectedRankIndex] = createGroupedArray(reverse, 20);

      this.setState({ ascending: isAscending, groupedHeroStats });
    } else {
      if (column == "name") {
        sortField = "heroName ";
        sortCriteria = this.sortByHeroName;
      } else if (column == "pick") {
        sortField = "pickRate";
        sortCriteria = this.sortByStat(sortField);
      } else if (column == "win") {
        sortField = "winRate";
        sortCriteria = this.sortByStat(sortField);
      }

      const currentRankStats = groupedHeroStats[selectedRankIndex];
      const flattened = currentRankStats.reduce((a, b) => {
        return a.concat(b);
      });
      const sorted = createGroupedArray(flattened.sort(sortCriteria), 20);
      groupedHeroStats[selectedRankIndex] = sorted;

      this.setState({
        sortedColumn: column,
        groupedHeroStats
      });
    }
  }

  render() {
    const styles = this.props.style;
    const { navigation } = this.props;
    const { isLoadingHeroStats, heroStats } = this.props;
    const {
      currentPageIndex,
      selectedRankIndex,
      ranks,
      totalPulicMatches,
      screenHeight,
      groupedHeroStats
    } = this.state;

    let content = <View />;

    if (isLoadingHeroStats) {
      content = (
        <View styleName="fill-parent dota2">
          <Loading />
        </View>
      );
    } else if (groupedHeroStats.length > 0) {
      content = (
        <ScrollView styleName="fill-parent" style={styles.container}>
          <View styleName="vertical h-center v-center">
            <View styleName="vertical v-center h-center" style={{ flex: 1 }}>
              <Text style={{ color: "#fff" }}>
                {totalPulicMatches} matches in last 30 days
              </Text>
              <Line />
            </View>
            <ModalDropdown
              style={{ flex: 1 }}
              options={ranks}
              renderRow={this.renderRowDropdown}
              onSelect={this.onOptionSelected}
              renderSeparator={this.renderSeparatorDropdown}
              dropdownStyle={{
                borderWidth: 1,
                borderColor: "rgba(46, 47, 64, 0.6)"
              }}
            >
              <View styleName="horizontal h-center v-center">
                <Icon name="drop-down" style={{ color: "#fff" }} />
                <Text style={{ color: "#fff", marginLeft: 5, marginRight: 5 }}>
                  Stats for rank: {ranks[selectedRankIndex].name}
                </Text>
                <Image
                  source={ranks[selectedRankIndex].imgUrl}
                  styleName="small-avatar"
                />
              </View>
            </ModalDropdown>
          </View>
          <View style={{ flex: 1, height: screenHeight, paddingBottom: 10 }}>
            <View style={styles.header}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={this.sortHero}>
                  <Text style={{ color: "#fff", marginRight: 5 }}>HERO</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={this.sortPick}>
                  <Text style={{ color: "#fff", marginRight: 5 }}>PICK%</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={this.sortWin}>
                  <Text style={{ color: "#fff", marginRight: 5 }}>WIN%</Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={groupedHeroStats[selectedRankIndex][currentPageIndex]}
              renderItem={this.renderItem}
              getItemLayout={this.getItemLayout}
              ListFooterComponent={this.renderFooter}
              keyExtractor={this.keyExtractor}
              initialNumToRender={10}
            />
          </View>
        </ScrollView>
      );
    }

    return content;
  }
}

HeroStatPublic.navigationOptions = {
  title: "Stats Public Matches",
  tabBarLabel: "Public"
};

const styles = {
  container: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#2e2d45"
  },
  header: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 40,
    backgroundColor: "rgba(0,0,0,0.3)"
  }
};

function mapStateToProps(state) {
  return {
    isLoadingHeroStats: state.heroStatsState.isLoadingHeroStats,
    isEmptyHeroStats: state.heroStatsState.isEmptyHeroStats,
    heroStats: state.heroStatsState.heroStats
  };
}

function mapDispatchToprops(dispatch) {
  return {
    actions: bindActionCreators(heroStatActions, dispatch)
  };
}

export default connectStyle("dota2app.HeroStatPublic", styles)(
  connect(mapStateToProps, mapDispatchToprops)(HeroStatPublic)
);
