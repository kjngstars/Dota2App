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
import { dimensionRelativeToIphone } from "@shoutem/ui/theme";

const DRTI = dimensionRelativeToIphone;

class HeroOverview extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    const { heroData } = this.props;
    const styles = this.props.style;

    return (
      <View styleName="fill-parent dota2" style={styles.container}>
        <ScrollView style={{backgroundColor: themeColors.backgroundTableEven}}>
          <Image source={heroData.img} style={styles.heroAvatar} />
          <Title style={{ color: themeColors.white }}>{heroData.name}</Title>
          <Text>
            <Text styleName="bold" style={styles.attributeValue}>
              {heroData.attackType}
            </Text>{" "}
            <Text style={styles.attributeType}>, {heroData.roles} </Text>
          </Text>
          <View styleName="horizontal h-start v-center">
            <Image
              source={require("../assets/attributes/strength.png")}
              styleName="small-avatar"
            />
            {heroData.primaryAttribute == "str" ? (
              <Text styleName="bold" style={styles.attributeValue}>
                {heroData.baseStr} + {heroData.strGain}
              </Text>
            ) : (
              <Text style={styles.attributeValue}>
                {heroData.baseStr} + {heroData.strGain}
              </Text>
            )}
          </View>
          <View styleName="horizontal h-start v-center">
            <Image
              source={require("../assets/attributes/agility.png")}
              styleName="small-avatar"
            />
            {heroData.primaryAttribute == "agi" ? (
              <Text styleName="bold" style={styles.attributeValue}>
                {heroData.baseAgi} + {heroData.agiGain}
              </Text>
            ) : (
              <Text style={styles.attributeValue}>
                {heroData.baseAgi} + {heroData.agiGain}
              </Text>
            )}
          </View>
          <View styleName="horizontal h-start v-center">
            <Image
              source={require("../assets/attributes/intelligence.png")}
              styleName="small-avatar"
            />
            {heroData.primaryAttribute == "int" ? (
              <Text styleName="bold" style={styles.attributeValue}>
                {heroData.baseInt} + {heroData.intGain}
              </Text>
            ) : (
              <Text style={styles.attributeValue}>
                {heroData.baseInt} + {heroData.intGain}
              </Text>
            )}
          </View>
          <Text>
            <Text style={styles.attributeType}>Base attack: </Text>
            <Text style={styles.attributeValue}>
              {heroData.baseAttackMin} - {heroData.baseAttackMax}
            </Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Attack range: </Text>
            <Text style={styles.attributeValue}>{heroData.attackRange}</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Attack speed: </Text>
            <Text style={styles.attributeValue}>{heroData.attackRate}</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Projectile speed: </Text>
            <Text style={styles.attributeValue}>
              {heroData.projectileSpeed}
            </Text>
          </Text>
          <Divider />
          <Text>
            <Text style={styles.attributeType}>Base health: </Text>
            <Text style={styles.attributeValue}>{heroData.baseHealth}</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Base Health regen: </Text>
            <Text style={styles.attributeValue}>
              {heroData.baseHealthRegen}
            </Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Base mana: </Text>
            <Text style={styles.attributeValue}>{heroData.baseMana}</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Base mana regen: </Text>
            <Text style={styles.attributeValue}>{heroData.baseManaRegen}</Text>
          </Text>
          <Divider />
          <Text>
            <Text style={styles.attributeType}>Base armor: </Text>
            <Text style={styles.attributeValue}>{heroData.baseArmor}</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Base Magic resistance: </Text>
            <Text style={styles.attributeValue}>{heroData.baseMR}%</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Movement speed: </Text>
            <Text style={styles.attributeValue}>{heroData.moveSpeed}</Text>
          </Text>
          <Text>
            <Text style={styles.attributeType}>Turn speed: </Text>
            <Text style={styles.attributeValue}>{heroData.turnRate}</Text>
          </Text>
          <Divider />
          <Text>
            <Text style={styles.attributeType}>CM enabled: </Text>
            <Text style={styles.attributeValue}>
              {heroData.cmEnabled ? "yes" : "no"}
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

function mapStateToProps(state) {
  return {
    heroData: state.heroOverviewState
  };
}

export default connectStyle("dota2app.HeroOverview", styles)(
  connect(mapStateToProps)(HeroOverview)
);
