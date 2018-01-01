import React, { Component } from "react";
import { ScrollView } from "react-native";
import { NavigationBarWithMatchSearch } from "../components/NavigationBar";
import {
  View,
  Image,
  Text,
  Caption,
  Row,
  Subtitle,
  Icon,
  Title,
  Heading
} from "@shoutem/ui";

import Ripple from "react-native-material-ripple";

import { getHeroImage } from "../utils/getHeroImage";
import { getAbilityImage } from "../utils/getAbilityImage";
import { reduceText } from "../utils/utilsFunction";

import abilities from "dotaconstants/build/abilities.json";
import ability_ids from "dotaconstants/build/ability_ids.json";

import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";

import { dimensionRelativeToIphone } from "@shoutem/ui/theme";
const DRTI = dimensionRelativeToIphone;

export const CELL_SIZE = 50;
const FULL_WIDTH = 28 * CELL_SIZE;

const levels = [
  { title: 1 },
  { title: 2 },
  { title: 3 },
  { title: 4 },
  { title: 5 },
  { title: 6 },
  { title: 7 },
  { title: 8 },
  { title: 9 },
  { title: 10 },
  { title: 11 },
  { title: 12 },
  { title: 13 },
  { title: 14 },
  { title: 15 },
  { title: 16 },
  { title: 17, empty: true },
  { title: 18 },
  { title: 19, empty: true },
  { title: 20 },
  { title: 21, empty: true },
  { title: 22, empty: true },
  { title: 23, empty: true },
  { title: 24, empty: true },
  { title: 25 }
];

const PlayerHeader = ({ headers }) => {
  return (
    <View
      styleName="horizontal h-center v-center"
      style={{
        width: FULL_WIDTH,
        height: 40,
        backgroundColor: "rgba(0,0,0,0.3)"
      }}
    >
      <View
        style={{ flex: 3, flexDirection: "row", justifyContent: "flex-start" }}
      >
        <Text style={{ fontSize: 13, color: themeColors.white }}>Player</Text>
      </View>
      {headers.map(header => {
        return (
          <View
            key={header.title}
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 13, color: themeColors.white }}>
              {header.title}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

class Skill extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {
    this.setState({ showPopup: !this.state.showPopup });
  }

  render() {    
    const { ability, onAbilityPress } = this.props;

    const abilityImage = getAbilityImage(ability);

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Ripple onPress={onAbilityPress}>
          <Image
            source={abilityImage}
            style={{ width: DRTI(30), height: DRTI(30) }}
          />
        </Ripple>
      </View>
    );
  }
}

class SkillBuildRow extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {    
    const { data, index, onAbilityPress } = this.props;

    let bgColor = themeColors.backgroundTableEven;
    if (index % 2) {
      bgColor = themeColors.backgroundTableOdd;
    }
    const heroImg = getHeroImage(data.hero);
    const abilityIter = data.abilityUpgrades[Symbol.iterator]();
    let ability = abilityIter.next();

    return (
      <View
        styleName="horizontal h-center v-center"
        style={{
          width: FULL_WIDTH,
          height: 40,
          backgroundColor: bgColor
        }}
      >
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            justifyContent: "flex-start",
            borderLeftWidth: 2,
            borderColor: data.color
          }}
        >
          <Image
            source={heroImg}
            style={{ width: DRTI(43), height: DRTI(24), marginLeft: 17 }}
          />
          <Text
            style={{ fontSize: 13, color: themeColors.white, marginLeft: 5 }}
          >
            {reduceText(data.player, 12)}
          </Text>
        </View>
        {levels.map((level, index) => {
          if (level.empty || ability.done) {
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              />
            );
          } else {
            const prevAbility = ability.value;
            ability = abilityIter.next();
            return (
              <Skill
                key={prevAbility}
                ability={prevAbility}
                onAbilityPress={onAbilityPress}
              />
            );
          }
        })}
      </View>
    );
  }
}

class SkillBuild extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    
    const styles = this.props.style;
    const { data, onAbilityPress } = this.props;

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={styles.container}>
          <PlayerHeader headers={levels} />
          {Object.keys(data.playersData).map((key, index) => {
            const playerData = data.playersData[key];

            return (
              <SkillBuildRow
                key={index}
                data={playerData}
                index={index}
                onAbilityPress={onAbilityPress}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flexDirection: "column",
    padding: 10
  }
};

export default connectStyle("dota2app.Overview", styles)(SkillBuild);
