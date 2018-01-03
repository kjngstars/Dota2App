import React, { Component } from "react";
import ScreenTypes from "../navigators/ScreenTypes";
import { View, Text, Image, TouchableOpacity } from "@shoutem/ui";
import Pagination from "../components/Pagination";
import { FlatList, ScrollView, Dimensions } from "react-native";
import Loading from "../components/Loading";
import { Pages } from "react-native-pages";
import HeroStatRowProMatch, {
  HERO_STAT_ROW_HEIGHT
} from "../components/HeroStatRowProMatch";
import SortableHeaderItem from "../components/SortableHeaderItem";

import { createGroupedArray, round } from "../utils/utilsFunction";

import themeColors from "../themes/colors";
import * as heroStatActions from "../actions/HeroStatAction";
import { navigateToMenuScreen, setParams } from "../actions/NavigationAction";
import { sendHeroData } from "../actions/HeroOverviewActions";
import { connectStyle } from "@shoutem/theme";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getHeroImage } from "../utils/getHeroImage";
import kFormatter from "../utils/kFormatter";

class HeroStatProfessional extends Component {
  constructor(props) {
    super(props);

    let screenHeight = Dimensions.get("window").height;

    this.state = {
      screenHeight,
      heroStats: [],
      totalProMatches: "",
      currentIndex: 0,
      sortedColumn: "id",
      ascending: true,
      headers: [
        { title: "HERO", value: "name" },
        { title: "PICK%", value: "pick" },
        { title: "BAN%", value: "ban" },
        { title: "WIN%", value: "win" }
      ]
    };

    this.renderItem = this.renderItem.bind(this);
    this.fetchingData = this.fetchingData.bind(this);
    this.onRefreshing = this.fetchingData.bind(this, true);
    this.onPage = this.onPage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.sortHero = this.sortStat.bind(this, "name");
    this.sortPick = this.sortStat.bind(this, "pick");
    this.sortBan = this.sortStat.bind(this, "ban");
    this.sortWin = this.sortStat.bind(this, "win");
    this.onPressRow = this.onPressRow.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.heroStats != nextProps.heroStats &&
      nextProps.heroStats.length > 0
    ) {
      const matchCountPro = this.calculateTotalProMatches(nextProps.heroStats);
      const heroStats = this.processHeroStatsProMatch(
        nextProps.heroStats,
        matchCountPro
      );
      this.setState({
        heroStats: createGroupedArray(heroStats, 20),
        totalProMatches: matchCountPro
      });
    }
  }

  componentDidMount() {
    this.fetchingData();
  }

  fetchingData(refreshing = false) {
    this.props.actions.fetchHeroStats(refreshing);
  }

  calculateTotalProMatches(heroStats) {
    let sum = (a, b) => a + b;

    const matchCountPro =
      heroStats.map(heroStat => heroStat.pro_pick || 0).reduce(sum, 0) / 10;

    return matchCountPro;
  }

  processHeroStatsProMatch(heroStats, matchCountPro) {
    let processedData = [];

    for (let i = 0; i < heroStats.length; i++) {
      let processedStat = {
        heroData: {}
      };
      const heroStat = heroStats[i];

      processedStat.id = heroStat["id"];
      processedStat.heroImg = getHeroImage(heroStat["id"]);
      let heroName = heroStat["localized_name"];
      if (heroName.length > 9) heroName = heroName.substring(0, 6) + "...";
      processedStat.heroName = heroName;
      const proPick = heroStat["pro_pick"] || 0;
      processedStat.proP_Matches = proPick;
      processedStat.proP_Percent = round(proPick / matchCountPro * 100, 1);

      const proBan = heroStat["pro_ban"] || 0;
      processedStat.proB_Matches = proBan;
      processedStat.proB_Percent = round(proBan / matchCountPro * 100, 1);

      const totalMatchesProBP = proPick + proBan;
      processedStat.proBP_Matches = totalMatchesProBP;
      processedStat.proBP_Percent = round(
        totalMatchesProBP / matchCountPro * 100,
        1
      );

      const proWin = heroStat["pro_win"] || 0;
      processedStat.proW_Matches = proWin;
      processedStat.proW_Percent = !heroStat["pro_win"]
        ? 0
        : round(proWin / proPick * 100, 1);

      //hero data
      processedStat.heroData.heroId = heroStat["id"];

      processedData[i] = processedStat;
    }

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
      <HeroStatRowProMatch
        heroStat={item}
        index={index}
        onPress={() => this.onPressRow(item.heroData.heroId)}
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
    this.setState({ currentIndex: index });
  }

  renderFooter() {
    const { currentIndex } = this.state;
    const totalPages = this.state.heroStats.length;

    return (
      <Pagination
        totalPages={totalPages}
        currentIndex={currentIndex}
        numberPagesShow={5}
        onPage={this.onPage}
      />
    );
  }

  keyExtractor(item, index) {
    return "" + item.id + item.heroName;
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
    let { ascending, sortedColumn, heroStats, ungroupedHeroStats } = this.state;
    let sortField = "",
      isAscending = true,
      sortedStat = [],
      sortCriteria = {};

    if (column == sortedColumn) {
      isAscending = !ascending;

      const flattened = heroStats.reduce((a, b) => {
        return a.concat(b);
      });

      const reverse = flattened.reverse();
      heroStats = createGroupedArray(reverse, 20);

      this.setState({
        ascending: isAscending,
        heroStats
      });
    } else {
      if (column == "name") {
        sortField = "heroName ";
        sortCriteria = this.sortByHeroName;
      } else if (column == "pick") {
        sortField = "proP_Percent";
        sortCriteria = this.sortByStat(sortField);
      } else if (column == "ban") {
        sortField = "proB_Percent";
        sortCriteria = this.sortByStat(sortField);
      } else if (column == "win") {
        sortField = "proW_Percent";
        sortCriteria = this.sortByStat(sortField);
      }

      const flattened = heroStats.reduce((a, b) => {
        return a.concat(b);
      });
      const sorted = createGroupedArray(flattened.sort(sortCriteria), 20);
      heroStats = sorted;

      this.setState({
        sortedColumn: column,
        heroStats,
        ascending: isAscending
      });
    }
  }

  renderHeader() {
    const styles = this.props.style;
    const { headers, sortedColumn, ascending } = this.state;
    return (
      <View styleName="vertical h-center">
        <Text
          style={{
            color: themeColors.orange,
            alignSelf: "center",
            marginBottom: 5
          }}
        >
          {this.state.totalProMatches} matches in last 30 days
        </Text>
        <View style={styles.header}>
          {headers.map(header => {
            let asc = false;
            let first = true;
            if (header.value == sortedColumn) {
              asc = ascending;
              first = false;
            }

            if (header.value == "name") {
              return (
                <SortableHeaderItem
                  key={header.value}
                  title={header.title}
                  onSorting={this.sortHero}
                  first={first}
                  ascending={asc}
                />
              );
            } else if (header.value == "pick") {
              return (
                <SortableHeaderItem
                  key={header.value}
                  title={header.title}
                  onSorting={this.sortPick}
                  first={first}
                  ascending={asc}
                />
              );
            } else if (header.value == "ban") {
              return (
                <SortableHeaderItem
                  key={header.value}
                  title={header.title}
                  onSorting={this.sortBan}
                  first={first}
                  ascending={asc}
                />
              );
            } else if (header.value == "win") {
              return (
                <SortableHeaderItem
                  key={header.value}
                  title={header.title}
                  onSorting={this.sortWin}
                  first={first}
                  ascending={asc}
                />
              );
            }
          })}
        </View>
      </View>
    );
  }

  render() {
    const styles = this.props.style;
    const { isLoadingHeroStats, isRefreshingHeroStats } = this.props;
    const {
      currentIndex,
      heroStats,
      totalProMatches,
      screenHeight
    } = this.state;

    let content = <View styleName="fill-parent dota2" />;

    if (isLoadingHeroStats) {
      content = <Loading />;
    } else if (heroStats.length > 0) {
      content = (
        <FlatList
          data={heroStats[currentIndex]}
          renderItem={this.renderItem}
          getItemLayout={this.getItemLayout}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          keyExtractor={this.keyExtractor}
          initialNumToRender={10}
          refreshing={isRefreshingHeroStats}
          onRefresh={this.onRefreshing}
        />
      );
    }

    return (
      <View styleName="fill-parent dota2" style={styles.container}>
        {content}
      </View>
    );
  }
}

HeroStatProfessional.navigationOptions = {
  title: "Stats Pro Matches",
  tabBarLabel: "Professional"
};

const styles = {
  container: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  header: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    backgroundColor: "rgba(0,0,0,0.3)"
  }
};

function mapStateToProps(state) {
  return {
    isRefreshingHeroStats: state.heroStatsState.isRefreshingHeroStats,
    isLoadingHeroStats: state.heroStatsState.isLoadingHeroStats,
    isEmptyHeroStats: state.heroStatsState.isEmptyHeroStats,
    heroStats: state.heroStatsState.heroStats
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(heroStatActions, dispatch)
  };
}

export default connectStyle("dota2app.HeroProfessionalScreen", styles)(
  connect(mapStateToProps, mapDispatchToProps)(HeroStatProfessional)
);
