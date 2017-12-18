import React, { Component } from "react";
import { FlatList, ScrollView, Dimensions, Picker } from "react-native";
import { View, Text, Image, Icon, TouchableOpacity } from "@shoutem/ui";
import Loading from "../components/Loading";
import HeroRankingRow, {
  HERO_RANKING_ROW_HEIGHT
} from "../components/HeroRankingRow";

import { round } from "../utils/utilsFunction";
import { connectStyle } from "@shoutem/theme";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as heroRankingActions from "../actions/HeroRankingAction";
import { getHeroImage } from "../utils/getHeroImage";

class HeroRankings extends Component {
  constructor(props) {
    super(props);

    let screenHeight = Dimensions.get("window").height;

    this.state = {
      screenHeight,
      rankingData: []
    };

    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);

    this.processRankingData = this.processRankingData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.heroRanking != nextProps.heroRanking) {
      const rankingData = this.processRankingData(nextProps.heroRanking);

      this.setState({ rankingData });
    }
  }

  getGetOrdinal(n) {
    var s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  processRankingData(data) {
    let playerRanking = [];
    const highestScore = data.rankings[0].score;

    for (let i = 0; i < data.rankings.length; i++) {
      let playerRank = {};
      let rankData = data[i];

      playerRank.accountId = rankData["account_id"];
      playerRank.ranking = getGetOrdinal(i + 1);
      playerRank.avatar = rankData["avatar"];
      playerRank.name = rankData["name"];
      playerRank.personaname = rankData["personaname"];
      playerRank.score = Math.round(rankData["score"]);
      playerRank.scorePercent = round(rankData.score * 100 / highestScore, 1);

      playerRanking[i] = playerRank;
    }

    return playerRanking;
  }

  renderItem({ item, index }) {
    return <HeroRankingRow playerRank={item} />;
  }

  onRefresh() {}

  getItemLayout(data, index) {
    return {
      offset: HERO_RANKING_ROW_HEIGHT * index,
      length: HERO_RANKING_ROW_HEIGHT,
      index
    };
  }

  keyExtractor(item, index) {
    return item.accountId;
  }

  renderFooter() {}

  render() {
    const styles = this.props.style;
    const { isLoadingHeroRanking } = this.props;

    let content = <View />;

    const { rankingData, screenHeight } = this.state;

    if (isLoadingHeroRanking) {
      content = (
        <View styleName="fill-parent dota2">
          <Loading />
        </View>
      );
    } else if (rankingData.length > 0) {
      <ScrollView style={styles.container}>
        <Text style={{ color: "#fff", alignSelf: "center", marginBottom: 5 }}>
          Rankings - Hero
        </Text>
        <View style={{ flex: 1, height: screenHeight, paddingBottom: 10 }}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity>
                <Text style={{ color: "#fff", marginRight: 5 }}>HERO</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity>
                <Text style={{ color: "#fff", marginRight: 5 }}>PICK%</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity>
                <Text style={{ color: "#fff", marginRight: 5 }}>BAN%</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={rankingData}
            renderItem={this.renderItem}
            getItemLayout={this.getItemLayout}            
            keyExtractor={this.keyExtractor}
            initialNumToRender={10}
          />
        </View>
      </ScrollView>;
    }

    return content;
  }
}

const styles = {
  container: {
    paddingBottom: 10,
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
    isLoadingHeroRanking: state.heroRankingState.isLoadingHeroRanking,
    isEmptyHeroRanking: state.heroRankingState.isEmptyHeroRanking,
    heroRanking: state.heroRankingState.heroRanking
  };
}

function mapDispatchToprops(dispatch) {
  return {
    actions: bindActionCreators(heroRankingActions, dispatch)
  };
}

export default connectStyle("dota2app.HeroRanking", styles)(
  connect(mapStateToProps, mapDispatchToprops)(HeroRankings)
);