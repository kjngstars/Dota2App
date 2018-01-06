import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Icon,
  Row,
  Divider,
  Title,
  TouchableOpacity
} from "@shoutem/ui";
import { FlatList, Keyboard } from "react-native";

import Line from "../components/Line";
import PlayerRow, { PLAYER_ROW_HEIGHT } from "../components/PlayerRow";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

import themeColors from "../themes/colors";
import { createGroupedArray } from "../utils/utilsFunction";
import { navigateToMenuScreen } from "../actions/NavigationAction";

import { connect } from "react-redux";
import { connectStyle } from "@shoutem/theme";
import { bindActionCreators } from "redux";
import * as searchPlayerActions from "../actions/PlayerSearchAction";
import ScreenTypes from "../navigators/ScreenTypes";

class PlayerSearch extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerName: "",
      proPlayers: [],
      publicPlayers: [],
      currentIndexProPlayer: 0,
      currentIndexPublicPlayer: 0,
      isFirstRequestHasBeenSent: false
    };

    this.onSearchPlayer = this.onSearchPlayer.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
    this.renderFooterProPlayers = this.renderFooterProPlayers.bind(this);
    this.renderFooterPublicPlayers = this.renderFooterPublicPlayers.bind(this);
    this.onPageProPlayers = this.onPageProPlayers.bind(this);
    this.onPagePublicPlayers = this.onPagePublicPlayers.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onRowPress = this.onRowPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { proPlayers, publicPlayers } = this.props;
    if (
      proPlayers != nextProps.proPlayers ||
      publicPlayers != nextProps.publicPlayers
    ) {
      if (
        nextProps.proPlayers.length > 0 &&
        nextProps.publicPlayers.length == 0
      ) {
        this.setState({
          proPlayers: createGroupedArray(nextProps.proPlayers, 20),
          publicPlayers: [],
          currentIndexProPlayer: 0,
          currentIndexPublicPlayer: 0
        });
      } else {
        //search in list pro players
        this.setState({
          proPlayers: createGroupedArray(
            this.findProPlayers(nextProps.proPlayers, this.state.playerName),
            5
          ),
          publicPlayers: createGroupedArray(nextProps.publicPlayers, 20),
          currentIndexProPlayer: 0,
          currentIndexPublicPlayer: 0
        });
      }
    }
  }

  findProPlayers(proPlayers, name) {
    let results = [];

    for (let i = 0; i < proPlayers.length; i++) {
      var player = proPlayers[i];
      if (!player.name) continue;
      var playerName = player.name.toLowerCase();

      if (playerName.search(name.toLowerCase()) != -1) {
        results.push(player);
      }
    }

    return results;
  }

  onRowPress(accountId) {
    this.props.navigation.dispatch(
      navigateToMenuScreen(ScreenTypes.PlayerOverview, { accountId: accountId })
    );
  }

  onChangeText(text) {
    this.setState({ playerName: text });
  }

  keyExtractor(item, index) {
    return item.account_id;
  }

  getItemLayout(item, index) {
    return {
      offset: PLAYER_ROW_HEIGHT * index,
      length: PLAYER_ROW_HEIGHT,
      index
    };
  }

  onPageProPlayers(index) {
    this.setState({ currentIndexProPlayer: index });
  }

  onPagePublicPlayers(index) {
    this.setState({ currentIndexPublicPlayer: index });
  }

  renderFooterProPlayers() {
    const { currentIndexProPlayer } = this.state;
    const totalPages = this.state.proPlayers.length;

    return (
      <Pagination
        totalPages={totalPages}
        currentIndex={currentIndexProPlayer}
        numberPagesShow={5}
        onPage={this.onPageProPlayers}
      />
    );
  }

  renderFooterPublicPlayers() {
    const { currentIndexPublicPlayer } = this.state;
    const totalPages = this.state.publicPlayers.length;

    return (
      <Pagination
        totalPages={totalPages}
        currentIndex={currentIndexPublicPlayer}
        numberPagesShow={5}
        onPage={this.onPagePublicPlayers}
      />
    );
  }

  renderItem({ item, index }) {
    return (
      <PlayerRow
        player={item}
        index={index}
        onPress={() => this.onRowPress(item.account_id)}
      />
    );
  }

  onSearchPlayer() {
    Keyboard.dismiss();
    this.props.actions.fetchPlayers(this.state.playerName).then(() => {
      if (!this.state.isFirstRequestHasBeenSent) {
        this.setState({ isFirstRequestHasBeenSent: true });
      }
    });
  }

  render() {
    const styles = this.props.style;
    const { proPlayers, publicPlayers, isFirstRequestHasBeenSent } = this.state;
    const { isSearchingPlayers } = this.props;
    let proPlayerResults = <View />;
    let publicPlayerResults = <View />;
    let content = <View />;

    if (isSearchingPlayers) {
      content = <Loading />;
    } else if (!isFirstRequestHasBeenSent) {
      content = <View />;
    } else {
      if (proPlayers.length == 0 && publicPlayers.length == 0) {
        content = (
          <View>
            <Text>can't find any players!</Text>
          </View>
        );
      } else if (proPlayers.length > 0 && publicPlayers.length == 0) {
        proPlayerResults = (
          <View style={{ marginTop: 5, flex: 1 }}>
            <Text style={{ color: themeColors.orange, fontSize: 18 }}>
              Pro Players
            </Text>
            <Line color={themeColors.greyBorder} />
            <FlatList
              data={this.state.proPlayers[this.state.currentIndexProPlayer]}
              renderItem={this.renderItem}
              getItemLayout={this.getItemLayout}
              //refreshing={this.state.refreshing}
              //onRefresh={this.onRefresh}
              ListFooterComponent={this.renderFooterProPlayers}
              keyExtractor={this.keyExtractor}
              initialNumToRender={10}
            />
          </View>
        );
      } else {
        if (proPlayers && proPlayers.length > 0) {
          proPlayerResults = (
            <View style={styles.proPlayer}>
              <Text style={{ color: themeColors.orange, fontSize: 18 }}>
                Pro Players
              </Text>
              <Line color={themeColors.greyBorder} />
              <FlatList
                data={this.state.proPlayers[this.state.currentIndexProPlayer]}
                renderItem={this.renderItem}
                getItemLayout={this.getItemLayout}
                //refreshing={this.state.refreshing}
                //onRefresh={this.onRefresh}
                ListFooterComponent={this.renderFooterProPlayers}
                keyExtractor={this.keyExtractor}
                initialNumToRender={5}
              />
            </View>
          );
        }

        if (publicPlayers && publicPlayers.length > 0) {
          publicPlayerResults = (
            <View style={styles.publicPlayer}>
              <Text style={{ color: themeColors.orange, fontSize: 18 }}>
                Public Players
              </Text>
              <Line color={themeColors.greyBorder} />
              <FlatList
                data={
                  this.state.publicPlayers[this.state.currentIndexPublicPlayer]
                }
                renderItem={this.renderItem}
                getItemLayout={this.getItemLayout}
                //refreshing={this.state.refreshing}
                //onRefresh={this.onRefresh}
                ListFooterComponent={this.renderFooterPublicPlayers}
                keyExtractor={this.keyExtractor}
                initialNumToRender={10}
              />
            </View>
          );
        }
      }
      content = (
        <View style={{ flex: 1 }}>
          {proPlayerResults}
          {publicPlayerResults}
        </View>
      );
    }
    return (
      <View styleName="fill-parent dota2" style={styles.container}>
        <Row styleName="small" style={styles.searchRow}>
          <Icon name="search" />
          <View>
            <TextInput
              placeholder="Player name here..."
              onChangeText={this.onChangeText}
              value={this.state.playerName}
              onSubmitEditing={this.onSearchPlayer}
            />
          </View>
          <TouchableOpacity onPress={this.onSearchPlayer}>
            <Icon styleName="right-icon" name="right-arrow" />
          </TouchableOpacity>
        </Row>
        {content}
      </View>
    );
  }
}

PlayerSearch.navigationOptions = {
  title: "Player Search"
};

const styles = {
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  searchRow: {
    maxHeight: 40
  },
  proPlayer: {
    marginTop: 5,
    maxHeight: 300
  },
  publicPlayer: {
    flex: 1,
    marginTop: 5
  }
};

function mapStateToProps(state, ownProps) {
  const proPlayers = state.playerResultsState.playerResults[0];
  const publicPlayers = state.playerResultsState.playerResults[1];

  return {
    isSearchingPlayers: state.playerResultsState.isSearchingPlayers,
    isEmptyPlayerResults: state.playerResultsState.isEmptyPlayerResults,
    proPlayers: proPlayers ? proPlayers : [],
    publicPlayers: publicPlayers ? publicPlayers : []
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchPlayerActions, dispatch)
  };
}

export default connectStyle("dota2app.PlayerSearch", styles)(
  connect(mapStateToProps, mapDispatchToProps)(PlayerSearch)
);
