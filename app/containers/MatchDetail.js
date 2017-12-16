import React, { Component } from "react";
import { Screen, Title, Button, Text, View } from "@shoutem/ui";
import * as navigationAction from "../actions/NavigationAction";
import { connectStyle } from "@shoutem/theme";
import { DefaultNavigationBar } from "../components/NavigationBar";
import Search from "../components/Search";

class MatchDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    <Search heading="Search Match By ID" />;
  }
}

MatchDetail.navigationOptions = ({ navigation }) => ({});

const styles = {};

export default connectStyle("dota2app.StartScreen", styles)(MatchDetail);
