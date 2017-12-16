import React, { Component } from "react";
import { Screen, Title, Button, Text, View, Icon } from "@shoutem/ui";
import * as navigationAction from "../actions/NavigationAction";
import { connectStyle } from "@shoutem/theme";
import { DefaultNavigationBar } from "../components/NavigationBar";
import Search from "../components/Search";
import { navigateToMenuScreen, goBack } from "../actions/NavigationAction";
import ScreenTypes from "../navigators/ScreenTypes";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import * as matchDetailsAction from "../actions/MatchDetailsAction";
import Spinner from "react-native-spinkit";
import LeftHeader from "../components/LeftHeader";
import { Keyboard } from "react-native";
import { fetchMatchDetails } from "../actions/MatchDetailsAction";

class SearchForMatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matchId: "",
      isWrongMatchId: false
    };

    this.goToMatchCategoryScreen = this.goToMatchCategoryScreen.bind(this);
    this.goToMatchDetailsScreen = this.goToMatchDetailsScreen.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.fetchMatchDetails = this.fetchMatchDetails.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      if (nextProps.matchDetails.error) {
        this.setState({ isWrongMatchId: true });
      } else {
        this.setState({ isWrongMatchId: false });
      }
    }
  }

  goToMatchCategoryScreen() {
    // first: reset match category's stack
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: ScreenTypes.MatchCategory })
      ],
      key: ScreenTypes.MatchCategory
    });

    this.props.navigation.dispatch(navigateToMenuScreen(ScreenTypes.Match));
  }

  goToStart = () => {
    this.props.navigation.dispatch(
      navigateToMenuScreen(ScreenTypes.Home, {
        stackCounts: this.props.stackCounts
      })
    );
  };

  goToMatchDetailsScreen() {
    // first: reset match category's stack

    this.props.navigation.dispatch(
      navigateToMenuScreen(ScreenTypes.MatchDetail)
    );
  }

  onChangeText(text) {
    this.setState({ matchId: text });
  }

  fetchMatchDetails() {
    this.props.fetchMatchDetails(this.state.matchId).then(() => {
      if (!this.state.isWrongMatchId) {
        this.goToMatchDetailsScreen();
      }
    });
  }

  onSubmit() {
    if (this.state.matchId == "") {
      return;
    }
    this.fetchMatchDetails();
  }

  render() {
    const { navigation } = this.props;
    const styles = this.props.style;
    const { isLoadingMatchDetails } = this.props;

    let content = <View />;
    let error = <View />;

    if (!isLoadingMatchDetails && this.state.isWrongMatchId) {
      error = (
        <View
          styleName="horizontal h-start v-center md-gutter"
          style={{ flex: 1, borderWidth: 1, borderColor: "#fff" }}
        >
          <Icon
            name="error"
            styleName="md-gutter-right"
            style={{ color: "#fff", fontSize: 50 }}
          />
          <Title
            style={{ color: "#6BF", fontSize: 23 }}
            styleName="md-gutter-left"
          >
            Can't find match data, {"\n"}please try again!
          </Title>
        </View>
      );
    }

    if (isLoadingMatchDetails) {
      content = (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner
            //style={styles.spinner}
            size={45}
            type="9CubeGrid"
            color="#fff"
          />
        </View>
      );
    } else {
      content = (
        <View style={{ flex: 5 }}>
          <Search
            heading="Search Match By ID"
            placeholder="your match id go here..."
            onChangeText={this.onChangeText}
            onPress={this.fetchMatchDetails}
            value={this.state.matchId}
            onSubmit={this.onSubmit}
          />
        </View>
      );
    }

    return (
      <View styleName="vertical fill-parent dota2">
        <View styleName="sm-gutter" style={styles.container}>
          {error}
          {content}
        </View>
      </View>
    );
  }
}

SearchForMatch.navigationOptions = ({ navigation }) => ({
  title: "Search For Match",
  //headerLeft: <LeftHeader navigation={navigation} />
});

const styles = {
  container: {
    flex: 1
  }
};

function mapStateToProps(state) {
  return {
    isLoadingMatchDetails: state.matchDetailsState.isLoadingMatchDetails,
    matchDetails: state.matchDetailsState.matchDetails,
    stackCounts: state.nav.routes[0].routes[0].routes.length + 1
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMatchDetails: matchId =>
      dispatch(matchDetailsAction.testFetchMatchDetails(matchId))
  };
}

export default connectStyle("dota2app.SearchForMatch", styles)(
  connect(mapStateToProps, mapDispatchToProps)(SearchForMatch)
);
