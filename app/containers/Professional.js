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

class Professional extends Component {
  constructor(props) {
    super(props);

    this.state = {
      proMatches: [],
      refreshing: false,
      currentPageIndex: 0
    };

    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onPage = this.onPage.bind(this);    
    this.renderFooter = this.renderFooter.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
  }

  componentDidMount() {    
    this.fetchProMatches();
  }

  componentWillReceiveProps(nextProps) {
    //console.log('componentWillReceiveProps ' + this.state.proMatches.length);
    const { proMatches } = this.props;
    if (proMatches != nextProps.proMatches && nextProps.proMatches.length > 0) {
      //console.log('componentWillReceiveProps professional');
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

  renderItem({ item, index }) {
    return <ProMatchRow match={item} index={index} />;
  }

  getItemLayout(data, index) {
    return {
      offset: PRO_MATCH_ROW_HEIGHT * index,
      length: PRO_MATCH_ROW_HEIGHT,
      index
    };
  }

  onRefresh() {
    this.setState({
      refreshing: true
    });
  }

  fetchProMatches() {
    this.props.actions.testFetchProMatches();
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
    const { isLoadingProMatches, proMatches } = this.props;
    const { currentPageIndex } = this.state;

    let content = <View />;

    if (isLoadingProMatches) {
      content = (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spinner
            //style={styles.spinner}
            size={45}
            type="9CubeGrid"
            color="#fff"
          />
        </View>
      );
    } else if (proMatches.length > 0) {
      content = (
        <FlatList
          style={styles.container}
          data={this.state.proMatches[currentPageIndex]}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <Line color={themeColors.greyBorder} />}
          getItemLayout={this.getItemLayout}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
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
