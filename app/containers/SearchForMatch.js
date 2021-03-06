import React, { Component } from "react";
import { Screen, Title, Button, Text, View, Icon } from "@shoutem/ui";
import * as navigationAction from "../actions/NavigationAction";
import { connectStyle } from "@shoutem/theme";
import { DefaultNavigationBar } from "../components/NavigationBar";
import Search from "../components/Search";
import { navigateToMenuScreen } from "../actions/NavigationAction";
import ScreenTypes from "../navigators/ScreenTypes";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import * as matchDetailsAction from "../actions/MatchDetailsAction";
import Spinner from "react-native-spinkit";
import LeftHeader from "../components/LeftHeader";
import { Keyboard } from "react-native";
import { fetchMatchDetails } from "../actions/MatchDetailsAction";
import themeColors from "../themes/colors";

class SearchForMatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matchId: "",
      isWrongMatchId: false      
    };

    this.goToMatchDetailsScreen = this.goToMatchDetailsScreen.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.fetchMatchDetails = this.fetchMatchDetails.bind(this);
    this.onSubmit = this.onSubmit.bind(this);    
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      if (nextProps.isEmptyMatchDetails) {
        this.setState({ isWrongMatchId: true });
      } else {
        this.setState({ isWrongMatchId: false });
      }
    }
  }

  goToMatchDetailsScreen() {
    this.props.navigation.dispatch(
      navigateToMenuScreen(ScreenTypes.MatchDetail, { matchId: 0 })
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
    const { isLoadingMatchDetails, isEmptyMatchDetails } = this.props;

    let content = <View />;
    let error = <View />;

    if (!isLoadingMatchDetails && isEmptyMatchDetails) {
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
            style={{ color: themeColors.orange, fontSize: 23 }}
            styleName="md-gutter-left"
          >
            Can't find match data, please try again!
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
  title: "Search For Match"
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
    isEmptyMatchDetails: state.matchDetailsState.isEmptyMatchDetails    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMatchDetails: matchId =>
      dispatch(matchDetailsAction.fetchMatchDetails(matchId)),
    testFetchMatchDetails: matchId =>
      dispatch(matchDetailsAction.testFetchMatchDetails(matchId))
  };
}

export default connectStyle("dota2app.SearchForMatch", styles)(
  connect(mapStateToProps, mapDispatchToProps)(SearchForMatch)
);
