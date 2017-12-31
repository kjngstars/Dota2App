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
import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";
import { connect } from "react-redux";

import heroes from "dotaconstants/build/heroes.json";
import { getHeroImage } from "../utils/getHeroImage";

import { dimensionRelativeToIphone } from "@shoutem/ui/theme";
const DRTI = dimensionRelativeToIphone;

class HeroOverview extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    const { heroId } = this.props.navigation.state.params;
    const styles = this.props.style;
    const heroImg = getHeroImage(heroId);

    return (
      <View styleName="fill-parent dota2" style={styles.container}>
        <ScrollView
          style={{ backgroundColor: themeColors.backgroundTableEven }}
        >
          <Image source={heroImg} style={styles.heroAvatar} />
          <Title style={{ color: themeColors.white }}>{heroes[heroId]["localized_name"]}</Title>
          <Text>
            <Text styleName="bold" style={styles.attributeValue}>
              {heroes[heroId]["attack_type"]}
            </Text>{" "}
            <Text style={styles.attributeType}>, {heroes[heroId]["roles"].join(", ")} </Text>
          </Text>
          <View styleName="horizontal h-start v-center">
            <Image
              source={require("../assets/attributes/strength.png")}
              styleName="small-avatar"
            />
            {heroes[heroId].primaryAttribute == "str" ? (
              <Text styleName="bold" style={styles.attributeValue}>
                {heroes[heroId]["base_str"]} + {heroes[heroId]["str_gain"]}
              </Text>
            ) : (
              <Text style={styles.attributeValue}>
                {heroes[heroId]["base_str"]} + {heroes[heroId]["str_gain"]}
              </Text>
            )}
          </View>
          <View styleName="horizontal h-start v-center">
            <Image
              source={require("../assets/attributes/agility.png")}
              styleName="small-avatar"
            />
            {heroes[heroId].primaryAttribute == "agi" ? (
              <Text styleName="bold" style={styles.attributeValue}>
                {heroes[heroId]["base_agi"]} + {heroes[heroId]["agi_gain"]}
              </Text>
            ) : (
              <Text style={styles.attributeValue}>
                {heroes[heroId]["base_agi"]} + {heroes[heroId]["agi_gain"]}
              </Text>
            )}
          </View>
          <View styleName="horizontal h-start v-center">
            <Image
              source={require("../assets/attributes/intelligence.png")}
              styleName="small-avatar"
            />
            {heroes[heroId].primaryAttribute == "int" ? (
              <Text styleName="bold" style={styles.attributeValue}>
                {heroes[heroId]["base_int"]} + {heroes[heroId]["int_gain"]}
              </Text>
            ) : (
              <Text style={styles.attributeValue}>
                {heroes[heroId]["base_int"]} + {heroes[heroId]["int_gain"]}
              </Text>
            )}
          </View>
          <Text>
            <Text style={styles.attributeType}>Base attack: </Text>
            <Text style={styles.attributeValue}>
              {heroes[heroId]["base_attack_min"]} - {heroes[heroId]["base_attack_max"]}
            </Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Attack range: </Text>
            <Text style={styles.attributeValue}>{heroes[heroId]["attack_range"]}</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Attack speed: </Text>
            <Text style={styles.attributeValue}>{heroes[heroId]["attack_rate"]}</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Projectile speed: </Text>
            <Text style={styles.attributeValue}>{heroes[heroId]["projectile_speed"]}</Text>
          </Text>
          <Divider />
          <Text>
            <Text style={styles.attributeType}>Base health: </Text>
            <Text style={styles.attributeValue}>{heroes[heroId]["base_health"]}</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Base Health regen: </Text>
            <Text style={styles.attributeValue}>{heroes[heroId]["base_health_regen"]}</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Base mana: </Text>
            <Text style={styles.attributeValue}>{heroes[heroId]["base_mana"]}</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Base mana regen: </Text>
            <Text style={styles.attributeValue}>{heroes[heroId]["base_mana_regen"]}</Text>
          </Text>
          <Divider />
          <Text>
            <Text style={styles.attributeType}>Base armor: </Text>
            <Text style={styles.attributeValue}>{heroes[heroId]["base_armor"]}</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Base Magic resistance: </Text>
            <Text style={styles.attributeValue}>{heroes[heroId]["base_mr"]}%</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Movement speed: </Text>
            <Text style={styles.attributeValue}>{heroes[heroId]["move_speed"]}</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Turn speed: </Text>
            <Text style={styles.attributeValue}>{heroes[heroId]["turn_rate"]}</Text>
          </Text>
          <Divider />
          <Text>
            <Text style={styles.attributeType}>CM enabled: </Text>
            <Text style={styles.attributeValue}>
              {heroes[heroId]["cm_enabled"] ? "yes" : "no"}
            </Text>
          </Text>
        </ScrollView>
      </View>
    );
  }
}

HeroOverview.navigationOptions = {
  title: "Hero Overview",
  tabBarLabel: "Overview"
};

const styles = {
  container: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: themeColors.mainBackground
  },

  heroAvatar: {
    width: DRTI(200),
    height: DRTI(113)
  },
  attributeValue: {
    color: themeColors.white
  },
  attributeType: {
    color: themeColors.lightGrey
  }
};

export default connectStyle("dota2app.HeroOverview", styles)(HeroOverview);
