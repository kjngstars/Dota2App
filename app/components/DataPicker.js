import React, { Component } from "react";
import { Text, TouchableOpacity, View, Icon } from "@shoutem/ui";
import { FlatList } from "react-native";
import Ripple from "react-native-material-ripple";
import ModalDropdown from 'react-native-modal-dropdown';

class DataPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedIndex: 0
    };

    this.onToggleOpen = this.onToggleOpen.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
  }

  onPressItem(index) {
    this.setState({ isOpen: false, selectedIndex: index });
  }

  onToggleOpen() {
    const { isOpen } = this.state;
    const toggleModal = !isOpen;
    this.setState({isOpen: toggleModal});
  }

  keyExtractor(item) {
    return item.value;
  }

  renderItem({ item, index }) {
    <Ripple
      onPress={() => {
        this.onPressItem(index);
      }}
    >
      <Text style={{ color: "#fff" }}>{item.title}</Text>
    </Ripple>
  }

  render() {
    const { isOpen, selectedIndex } = this.state;
    const { data } = this.props;
    let index = selectedIndex;

    if (this.props.selectedIndex) {
      index = this.props.selectedIndex;
    }

    return (
      <View>
        <View styleName="horizontal h-start">
          <Text styleName="sm-gutter-right">{data[index].title}</Text>
          <TouchableOpacity onPress={this.onToggleOpen}>
            <Icon name="drop-down" />
          </TouchableOpacity>
        </View>
        <ModalDropdown isOpen={isOpen}>
          <FlatList
          options={data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />          
        </ModalDropdown>
      </View>
    );
  }
}

export default DataPicker;
