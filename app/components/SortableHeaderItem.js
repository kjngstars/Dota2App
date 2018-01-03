import React, { PureComponent } from "react";
import { View, Image, Text, Caption, Icon } from "@shoutem/ui";

import Ripple from "react-native-material-ripple";

import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";

import { dimensionRelativeToIphone } from "@shoutem/ui/theme";
const DRTI = dimensionRelativeToIphone;

class SortableHeaderItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onSorting,
      title,
      ascending = false,
      first = false,
      style
    } = this.props;    

    let sortIndicator = <View />;

    if (first) {
      sortIndicator = (
        <Image
          source={require("../assets/sortable.png")}
          style={style.sortIndicator}
        />
      );
    } else {
      if (ascending) {
        sortIndicator = <Icon name="up-arrow" style={style.sortDirection} />;
      } else {
        sortIndicator = <Icon name="down-arrow" style={style.sortDirection} />;
      }
    }

    return (
      <Ripple onPress={onSorting} style={style.container}>
        <Text style={style.headerText}>{title}</Text>
        {sortIndicator}
      </Ripple>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  sortIndicator: {
    width: DRTI(12),
    height: DRTI(12)
  },
  headerText: {
    fontSize: 13,
    color: themeColors.white,
    marginRight: 2
  },
  sortDirection: {
    fontSize: 14,
    color: themeColors.white
  }
};

export default connectStyle("dota2app.SortableHeaderItem", styles)(
  SortableHeaderItem
);
