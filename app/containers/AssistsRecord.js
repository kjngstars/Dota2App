import React, { Component } from "react";
import {
  View,
  Text,
  Title,
  Image,
  TouchableOpacity,
  Divider,
  ScrollView
} from "@shoutem/ui";

import { FlatList } from "react-native";
import Loading from "../components/Loading";
import RecordRow from "../components/RecordRow";
import Pagination from "../components/Pagination";
import Header from "../components/Header";

import { bindActionCreators } from "redux";
import { createGroupedArray, processRecord } from "../utils/utilsFunction";
import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";
import { connect } from "react-redux";
import { getGetOrdinal } from "../utils/utilsFunction";
import { testFetchAssistsRecord } from "../actions/AssistsRecordAction";
import { RECORD_ROW_HEIGHT } from "../components/RecordRow";

import moment from "moment";

class AssistsRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assistsRecords: [],
      refreshing: false,
      currentPageIndex: 0
    };

    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onPage = this.onPage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps && nextProps.assistsRecords.length > 0) {
      const records = processRecord(nextProps.assistsRecords);
      this.setState({ assistsRecords: createGroupedArray(records, 20) });
    }
  }

  componentDidMount() {
    this.props.actions.testFetchAssistsRecord();
  }

  onPage(index) {
    this.setState({ currentPageIndex: index });
  }

  renderItem({ item, index }) {
    return <RecordRow record={item} index={index} />;
  }

  getItemLayout(data, index) {
    return {
      offset: RECORD_ROW_HEIGHT * index,
      length: RECORD_ROW_HEIGHT,
      index
    };
  }

  onRefresh() {
    this.setState({
      refreshing: true
    });
  }

  keyExtractor(item, index) {
    return item.matchId;
  }

  renderFooter() {
    const { currentPageIndex, assistsRecords } = this.state;
    const totalPages = assistsRecords.length;

    return (
      <Pagination
        totalPages={totalPages}
        currentIndex={currentPageIndex}
        numberPagesShow={5}
        onPage={this.onPage}
      />
    );
  }

  renderHeader() {
    const styles = this.props.style;

    return <Header headers={[{title:"RANK"}, {title:"ASSISTS"}, {title:"ID"}, {title: ""}]} />;
  }

  render() {
    const { isLoadingAssistsRecord } = this.props;
    const { assistsRecords, currentPageIndex } = this.state;
    const styles = this.props.style;
    let content = <View />;

    if (isLoadingAssistsRecord) {
      content = <Loading />;
    } else if (assistsRecords.length > 0) {
      content = (
        <FlatList
          data={assistsRecords[currentPageIndex]}
          renderItem={this.renderItem}
          getItemLayout={this.getItemLayout}
          //refreshing={this.state.refreshing}
          //onRefresh={this.onRefresh}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          keyExtractor={this.keyExtractor}
          initialNumToRender={10}
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

AssistsRecord.navigationOptions = {
  title: "Assists Records",
  tabBarLabel: "A"
};

const styles = {
  container: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15
  }
};

function mapStateToProps(state) {
  return {
    isLoadingAssistsRecord: state.assistsRecordState.isLoadingAssistsRecord,
    isEmptyAssistsRecord: state.assistsRecordState.isEmptyAssistsRecord,
    assistsRecords: state.assistsRecordState.assistsRecords
  };
}

function mapDispatchToprops(dispatch) {
  return {
    actions: bindActionCreators({ testFetchAssistsRecord }, dispatch)
  };
}

export default connectStyle("dota2app.AssistsRecord", styles)(
  connect(mapStateToProps, mapDispatchToprops)(AssistsRecord)
);
