import React, { Component } from "react";
import { Heading, View, getTheme } from "@shoutem/ui";
import { Provider } from "react-redux";
import { StyleProvider } from "@shoutem/theme";
import UITheme from "@shoutem/ui/theme";
import { createStore } from "redux";
import AppWithNavigationState from "./app/navigators/AppNavigator";
import configureStore from './app/store/ConfigureStore';

const store = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={theme}>
          <AppWithNavigationState />
        </StyleProvider>
      </Provider>
    );
  }
}

const theme = Object.assign(UITheme(), {
  'dota2app.CommonNavBar': {
    container: {
      flex: 1
    },    
  },  
});
