import React, { Component } from "react";
import ScreenTypes from "../navigators/ScreenTypes";
import { NavigationBarWithMatchSearch } from "../components/NavigationBar";
import { View, Heading, Screen, Text } from "@shoutem/ui";
import themeColors from "../themes/colors";
import Line from "../components/Line";
import { connectStyle } from "@shoutem/theme";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as proMatchAction from "../actions/ProMatchAction";
import moment from "moment";
import ProMatchRow, { PRO_MATCH_ROW_HEIGHT } from "../components/ProMatchRow";
import Spinner from "react-native-spinkit";
import { createGroupedArray } from "../utils/utilsFunction";
import Pagination from "../components/Pagination";
import { navigateToMenuScreen } from "../actions/NavigationAction";
import Loading from "../components/Loading";
import _ from "lodash";

class Professional extends Component {
  constructor(props) {
    super(props);

    this.state = {
      proMatches: [],
      currentPageIndex: 0
    };

    this.renderItem = this.renderItem.bind(this);
    this.onPage = this.onPage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.onItemPress = this.onItemPress.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
    this.fetchingData = this.fetchingData.bind(this);
    this.onRefreshing = this.fetchingData.bind(this, true);
  }

  componentDidMount() {
    this.fetchingData();
  }

  fetchingData(refreshing = false) {
    this.props.actions.fetchProMatches(refreshing);
  }

  componentWillReceiveProps(nextProps) {
    const { proMatches } = this.props;
    if (proMatches != nextProps.proMatches && nextProps.proMatches.length > 0) {
      let processedMatches = this.processProMatchesData(nextProps.proMatches);

      let proMatches = createGroupedArray(processedMatches, 10);

      this.setState({ proMatches: proMatches });
    }
  }

  processProMatchesData(proMatches) {
    //console.log("processProMatchesData");
    let processedData = [];
    //console.log(proMatches.length);
    for (let i = 0; i < proMatches.length; i++) {
      let processedMatch = {};

      processedMatch.matchId = proMatches[i].match_id;

      let duration = moment("1900-01-01 00:00:00")
        .add(proMatches[i].duration, "seconds")
        .format("HH:mm:ss");
      processedMatch.formattedDuration = duration;
      let friendlyEndedTime = moment.unix(proMatches[i].start_time).fromNow();
      processedMatch.endedTime = friendlyEndedTime;
      processedMatch.radiantName = proMatches[i].radiant_name;
      processedMatch.direName = proMatches[i].dire_name;
      let { league_name } = proMatches[i];
      //if(league_name.length > 17) league_name = league_name.substring(0,14) + "...";
      processedMatch.leagueName = league_name;
      processedMatch.radiantWin = proMatches[i].radiant_win;

      processedData[i] = processedMatch;
    }

    return processedData;
  }

  onPage(index) {
    this.setState({ currentPageIndex: index });
  }

  onItemPress(matchId) {
    this.props.navigation.dispatch(
      navigateToMenuScreen(ScreenTypes.MatchDetail, { matchId: matchId })
    );
  }

  renderItem({ item, index }) {
    return (
      <ProMatchRow
        match={item}
        index={index}
        onPress={() => this.onItemPress(item.matchId)}
      />
    );
  }

  getItemLayout(data, index) {
    return {
      offset: PRO_MATCH_ROW_HEIGHT * index,
      length: PRO_MATCH_ROW_HEIGHT,
      index
    };
  }

  renderFooter() {
    const { currentPageIndex } = this.state;
    const totalPages = this.state.proMatches.length;

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
    return item.matchId;
  }

  render() {
    const styles = this.props.style;
    const { navigation } = this.props;
    const {
      isLoadingProMatches,
      isRefreshingProMatches,      
    } = this.props;
    const { currentPageIndex, proMatches } = this.state;

    let content = <View />;

    if (isLoadingProMatches) {
      content = <Loading />;
    } else if (proMatches.length > 0) {
      content = (
        <FlatList
          style={styles.container}
          data={this.state.proMatches[currentPageIndex]}
          refreshing={isRefreshingProMatches}
          onRefresh={this.onRefreshing}
          renderItem={this.renderItem}
          getItemLayout={this.getItemLayout}
          ListFooterComponent={this.renderFooter}
          keyExtractor={this.keyExtractor}
          initialNumToRender={5}
        />
      );
    }

    return (
      <View styleName="fill-parent dota2" onLayout={this.onLayoutParent}>
        {content}
      </View>
    );
  }
}

Professional.navigationOptions = {
  title: "Professional",
  tabBarLabel: "Pro"
};

const styles = {
  container: {
    marginLeft: 15,
    marginRight: 15
  }
};

function mapStateToProps(state) {
  return {
    isRefreshingProMatches: state.proMatchesState.isRefreshingProMatches,
    isLoadingProMatches: state.proMatchesState.isLoadingProMatches,
    isEmptyProMatches: state.proMatchesState.isEmptyProMatches,
    proMatches: state.proMatchesState.proMatches
  };
}

function mapDispatchToprops(dispatch) {
  return {
    actions: bindActionCreators(proMatchAction, dispatch)
  };
}

export default connectStyle("dota2app.ProfessionalScreen", styles)(
  connect(mapStateToProps, mapDispatchToprops)(Professional)
);
