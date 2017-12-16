import React, { Component } from "react";
import {
  Screen,
  Title,
  Button,
  Text,
  View,
  Heading,
  Overlay,
  Subtitle
} from "@shoutem/ui";
import * as navigationAction from "../actions/NavigationAction";
import { connectStyle } from "@shoutem/theme";
import { NavigationBarWithMatchSearch } from "../components/NavigationBar";
import { navigateToMenuScreen, goBack } from "../actions/NavigationAction";
import { connect } from "react-redux";
import ScreenTypes from "../navigators/ScreenTypes";
import LeftHeader from "../components/LeftHeader";
import PercentStat from "../components/PercentStat";

class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: this.props.index
    };

    this.navigateToMatchScreen = this.navigateToMatchScreen.bind(this);
  }

  componentWillReceiveProps(nextProps) {}

  componentDidMount() {}

  navigateToMatchScreen() {
    this.props.navigation.dispatch(
      navigationAction.navigateToMenuScreen("MatchSearch")
    );
  }

  goBack = () => {
    this.props.navigation.dispatch(goBack(ScreenTypes.MatchSearch));
  };

  render() {
    const styles = this.props.style;
    const { navigation } = this.props;
    return (
      <View styleName="fill-parent dota2" style={styles.container}>
        
      </View>
    );
  }
}

Start.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;  
  return {
    title: "Home",
    //headerLeft:
    //  params.stackCounts > 2 ? <LeftHeader navigation={navigation} /> : null
  };
};

const styles = {
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  }
};

export default connectStyle("dota2app.StartScreen", styles)(connect()(Start));
