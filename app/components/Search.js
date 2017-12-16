import React from "react";
import {
  View,
  Heading,
  Button,
  Text,
  TextInput,
  Icon,
  Divider
} from "@shoutem/ui";
//import { TextInput } from "react-native";
import { connectStyle } from "@shoutem/theme";
import Line from "./Line";

const Search = ({
  heading,
  placeholder,
  onChangeText,
  style,
  onPress,
  value,
  onSubmit
}) => (
  <View style={style.container}>
    <View styleName="vertical" style={style.headingContainer}>
      <Heading styleName="h-center" style={style.heading}>
        Enter your match id:
      </Heading>
      <Line />
    </View>

    <Divider />
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      styleName="sm-gutter-bottom"
      value={value}
      onSubmitEditing={onSubmit}
    />
    <Button styleName="sm-gutter-top" onPress={onPress}>
      <Icon name="search" />
      <Text>Find</Text>
    </Button>
  </View>
);

Search.navigationOptions = ({ navigation }) => ({
  //header: <MatchHeader navigation={navigation} />
});

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  headingContainer: {
    alignSelf: "center"
  },
  heading: {
    color: "#FFFFFF"
  }
};

export default connectStyle("dota2app.SearchScreen", styles)(Search);
