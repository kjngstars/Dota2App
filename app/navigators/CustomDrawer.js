import React, { Component } from "react";
import { TouchableHighlight } from "react-native";
import {
  Screen,
  View,
  ListView,
  Title,
  Heading,
  Divider,
  TouchableOpacity,
  Text
} from "@shoutem/ui";
import ScreenTypes from "../navigators/ScreenTypes";
import { connectStyle } from "@shoutem/theme";
import { connect } from "react-redux";
import * as navigationAction from "../actions/NavigationAction";
import CustomDrawerItem from "./CustomDrawerItem";
import menu from "../json/menu.json";

class CustomDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: this.props.navigation.state.routes[0].index
    };    
  }

  renderHeader() {
    const styles = this.props.style;

    return (
      <View>
        <Heading>Menu</Heading>
        <Divider styleName="line" />
      </View>
    );
  }

  componentWillReceiveProps(nextProps) {
    const currentIndex = this.props.navigation.state.routes[0].index;
    const selectedIndex = nextProps.navigation.state.routes[0].index;
    if(currentIndex != selectedIndex){
      this.setState({selectedIndex});
    }
  }

  render(item) {
    const styles = this.props.style;
    const {selectedIndex} = this.state;
    const stackRoutes = this.props.navigation.state.routes[0].routes;
    const stackCounts = this.props.navigation.state.routes[0].routes.length + 1;
    
    return (
      <View style={styles.container}>
        <Heading style={styles.heading}>Menu</Heading>
        {menu.map((item, index) => {
          const activeStyle =
            stackRoutes[selectedIndex].routeName == item.routeName ? "active" : "";

          return (
            <CustomDrawerItem
              key={index}
              route={item}
              style={styles}
              styleName={activeStyle}
              onPress={() => {
                this.props.navigation.dispatch(
                  navigationAction.navigateToMenuScreen(item.routeName,{stackCounts: stackCounts})
                );
                this.setState({ selectedItem: item.key });
              }}
            />
          );
        })}
      </View>
    );
  }
}

const styles = {
  heading: {
    alignSelf: "flex-start"
  },
  container: {
    ".active": {
      backgroundColor: "#222222"
    }
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    ".active": {
      backgroundColor: "#222222"
    }
  },
  title: {
    ".active": {
      color: "#FFFFFF"
    }
  }
  //   ".active": {
  //     container: {
  //       backgroundColor: "#222222"
  //     },
  //     title: {
  //       color: "#FFFFFF"
  //     }
  //   }
};

export default connectStyle("dota2app.CustomDrawer", styles)(CustomDrawer);

