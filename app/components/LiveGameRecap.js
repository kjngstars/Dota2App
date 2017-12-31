import React, { PureComponent } from "react";
import { Title, Text, View, Image } from "@shoutem/ui";

import Loading from "../components/Loading";

import { connectStyle } from "@shoutem/theme";
import { connect } from "react-redux";

import { fetchAPI } from "../utils/fetch";
import { reduceText } from "../utils/utilsFunction";

import themeColors from "../themes/colors";

class LiveGameRecap extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      leagueName: "",
      isLoadingLeagueData: this.props.data.leagueId ? true : false
    };

    this.fetchLeagueData = this.fetchLeagueData.bind(this);
  }

  fetchLeagueData(leagueId) {
    var endpoint = "leagues";

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        const league = json.find(e => e["leagueid"] == leagueId);

        this.setState({
          isLoadingLeagueData: false,
          leagueName: league.name
        });
      })
      .catch(error => {
        console.log("Action - FETCH LEAGUE DATA ERROR - " + error);
        this.setState({ isLoadingLeagueData: false, leagueName: "Unknown" });
      });
  }

  componentDidMount() {
    const { data } = this.props;
    if (data.leagueId) {
      this.fetchLeagueData(data.leagueId);
    }
  }

  render() {
    const { data, style } = this.props;
    const { isLoadingLeagueData, leagueName } = this.state;

    let content = <View />;

    if (isLoadingLeagueData) {
      content = <Loading type="ThreeBounce" size={25} />;
    } else {
      content = (
        <View styleName="vertical h-center v-center" style={{ flex: 1 }}>
          {leagueName != "" ? (
            <Text style={style.league}>{leagueName}</Text>
          ) : (
            <View />
          )}
          {data.isBanPick ? (
            <Text style={{ color: themeColors.white, fontSize: 12 }}>
              B/P Phase
            </Text>
          ) : (
            <View />
          )}
          <View styleName="horizontal h-center">
            <Text style={style.radiantScore}>{data.radiantScore}</Text>
            <Text style={{ color: themeColors.white }}> - </Text>
            <Text style={style.direScore}>{data.direScore}</Text>
          </View>
          <Text style={{ color: themeColors.white, fontSize: 13 }}>
            {data.gameTime}
          </Text>
          {data.averageMMR && (
            <Text style={{ color: themeColors.white, fontSize: 12 }}>
              {data.averageMMR} MMR
            </Text>
          )}
        </View>
      );
    }

    return content;
  }
}

const styles = {
  radiantScore: {
    fontSize: 14,
    fontWeight: "bold",
    color: themeColors.radiant
  },
  direScore: {
    fontSize: 14,
    fontWeight: "bold",
    color: themeColors.dire
  },
  league: {
    fontSize: 14,
    color: themeColors.white
  },
};

export default connectStyle("dota2app.LiveGameRecap", styles)(LiveGameRecap);
