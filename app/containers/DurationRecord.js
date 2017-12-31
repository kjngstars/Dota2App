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

import { bindActionCreators } from "redux";
import { createGroupedArray } from "../utils/utilsFunction";
import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";
import { connect } from "react-redux";
import { getGetOrdinal } from "../utils/utilsFunction";
import { fetchDurationRecord } from "../actions/DurationRecordAction";
import { RECORD_ROW_HEIGHT } from "../components/RecordRow";
import moment from "moment";

class DurationRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      durationRecords: [],
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
    if (this.props != nextProps && nextProps.durationRecords.length > 0) {
      const records = this.processDurationRecord(nextProps.durationRecords);
      this.setState({ durationRecords: createGroupedArray(records, 20) });
    }
  }

  componentDidMount() {
    this.props.actions.fetchDurationRecord();
  }

  processDurationRecord(durationRecords) {
    let processedData = [];

    for (let i = 0; i < durationRecords.length; i++) {
      let record = durationRecords[i];
      let processedRecord = {};

      processedRecord.matchId = record["match_id"];

      let duration = moment("1900-01-01 00:00:00")
        .add(record["score"], "seconds")
        .format("HH:mm:ss");
      processedRecord.score = duration;

      let friendlyEndedTime = moment.unix(record["start_time"]).fromNow();
      processedRecord.endedTime = friendlyEndedTime;
      processedRecord.rank = getGetOrdinal(i + 1);

      processedData[i] = processedRecord;
    }

    return processedData;
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
    const { currentPageIndex, durationRecords } = this.state;
    const totalPages = durationRecords.length;

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

    return (
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity >
            <Text style={{ color: "#fff", marginRight: 5 }}>RANK</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity>
            <Text style={{ color: "#fff", marginRight: 5 }}>DURATION</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity>
            <Text style={{ color: "#fff", marginRight: 5 }}>ID</Text>
          </TouchableOpacity>
        </View>        
      </View>
    );
  }

  render() {
    const { isLoadingDurationRecord } = this.props;
    const { durationRecords, currentPageIndex } = this.state;
    const styles = this.props.style;
    let content = <View />;

    if (isLoadingDurationRecord) {
      content = <Loading />;
    } else if (durationRecords.length > 0) {
      content = (
        <FlatList
          data={durationRecords[currentPageIndex]}
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

DurationRecord.navigationOptions = {
  title: "Duration Records",
  tabBarLabel: "Dur"
};

const styles = {
  container: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  header: {       
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    backgroundColor: "rgba(0,0,0,0.3)"
  }
};

function mapStateToProps(state) {
  return {
    isLoadingDurationRecord: state.durationRecordsState.isLoadingDurationRecord,
    isEmptyDurationRecord: state.durationRecordsState.isEmptyDurationRecord,
    durationRecords: state.durationRecordsState.durationRecords
  };
}

function mapDispatchToprops(dispatch) {
  return {
    actions: bindActionCreators({ fetchDurationRecord }, dispatch)
  };
}

export default connectStyle("dota2app.DurationRecord", styles)(
  connect(mapStateToProps, mapDispatchToprops)(DurationRecord)
);
