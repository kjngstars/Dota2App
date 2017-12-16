import React, { Component } from "react";
import { View, Image, Text, Icon, Title, TouchableOpacity } from "@shoutem/ui";
import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";
import { Animated, Easing } from "react-native";

let color = {
  h: 0,
  s: "83%",
  l: "58%"
};

const full_h = 112;

class PercentStat extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start();
  }

  render() {
    const { style, animate } = this.props;
    const percent = this.props.percent || 0;
    const flex = percent / 100;
    const h = Math.round(percent * full_h / 100);
    let content = <View />;

    if (animate) {
      let flexValueAnimated = this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, flex]
      });

      let backgroundAnimated = this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["hsl(0,83%,58%)", `hsl(${h},83%,58%)`]
      });
      content = (
        <Animated.View
          style={{
            flex: flexValueAnimated,
            backgroundColor: backgroundAnimated
          }}
        />
      );
    } else {
      content = (
        <View
          style={{
            flex: flex,
            backgroundColor: `hsl(${h},${color.s},${color.l})`
          }}
        />
      );
    }

    return <View style={style.container}>{content}</View>;
  }
}

PercentStat.defaultProps = {
  animate: false
};

//0, 83%, 58%
const styles = {
  container: {
    flex: 1,
    maxHeight: 5,
    backgroundColor: "#727272",
    flexDirection: "row"
  }
};

export default connectStyle("dota2app.PercentStat", styles)(PercentStat);
