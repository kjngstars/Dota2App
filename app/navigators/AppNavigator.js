import React from "react";
import PropTypes, { func } from "prop-types";
import { connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import RootNavigator from "./RootNavigator";
//import { bindActionCreators } from "redux";
import * as NavigationAction from "../actions/NavigationAction";

const AppWithNavigationState = ({ dispatch, nav, index }) => (
  <RootNavigator navigation={addNavigationHelpers({ dispatch, state: nav, routeIndex: index })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    nav: state.nav,
    index: state.nav.routes[0].routes[0].index
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch: dispatch });
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AppWithNavigationState
);
