import React, { Component } from "react";
import { View, Image, Text, Icon, Button, TouchableOpacity } from "@shoutem/ui";
import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";

const PagingFooter = ({
  style,
  maxPages,
  currentPage,
  isNext = true,
  isPrev = false,
  onNext,
  onPrev,
  onPage
}) => {
  var pages = [];
  for (let i = 1; i <= maxPages; i++) {
    pages.push(
      <TouchableOpacity
        key={i}
        onPress={() => {
          if (i == currentPage) return;
          onPage(i);
        }}
        style={{ marginLeft: 8, marginRight: 8 }}
      >
        <Text
          style={{
            color: i == currentPage ? "#fff" : themeColors.action,
            fontSize: 17,
            fontWeight: "bold"
          }}
        >
          {i}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View styleName="horizontal" style={style.container}>
      <View
        styleName="horizontal h-start v-center"
        style={style.prev}
      >
        {isPrev && (
          <TouchableOpacity onPress={onPrev}>
            <Icon name="left-arrow" style={{ color: themeColors.action, fontSize: 25 }} />
          </TouchableOpacity>
        )}
      </View>
      <View styleName="horizontal h-center v-center" style={style.pages}>
        {pages}
      </View>
      <View
        styleName="horizontal h-end v-center"
        style={style.next}
      >
        {isNext && (
          <TouchableOpacity onPress={onNext}>
            <Icon name="right-arrow" style={{ color: themeColors.action, fontSize: 25 }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    maxHeight: 45,
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#fff"
  },
  pages: {
    flex: 4
  },
  prev: {
    flex: 1
  },
  next: {
    flex: 1
  }
};

export default connectStyle("dota2app.PagingFooter", styles)(PagingFooter);
