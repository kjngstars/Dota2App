import React, { Component } from "react";
import { View, Image, Text, Icon, Button, TouchableOpacity } from "@shoutem/ui";
import themeColors from "../themes/colors";
import { connectStyle } from "@shoutem/theme";

const PageNumber = ({ index, currentIndex, onPage }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (index == currentIndex) return;
        onPage(index);
      }}
      style={{ marginLeft: 6, marginRight: 6 }}
    >
      <Text
        style={{
          color: index == currentIndex ? "#fff" : themeColors.action,
          fontSize: 16,
          fontWeight: "bold"
        }}
      >
        {index + 1}
      </Text>
    </TouchableOpacity>
  );
};

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  nextPage() {
    let { currentIndex, totalPages, onPage } = this.props;

    if (currentIndex < totalPages - 1) {
      onPage(currentIndex + 1);
    } else {
      onPage(currentIndex);
    }
  }

  prevPage() {
    let { currentIndex, totalPages, onPage } = this.props;
    if (currentIndex > 0) {
      onPage(currentIndex - 1);
    } else {
      onPage(currentIndex);
    }
  }

  render() {
    const {
      style,
      totalPages,
      currentIndex,
      numberPagesShow = 5,
      onPage
    } = this.props;

    if (totalPages == 1) {
      return <View />;
    }

    let pages = [];
    let first = <View style={style.first} />;
    let last = <View style={style.last} />;
    let isNext = true;
    let isPrev = false;
    const pivot = Math.floor(numberPagesShow / 2);

    if (currentIndex < totalPages - 1) {
      isNext = true;
    } else {
      isNext = false;
    }

    if (currentIndex > 0) {
      isPrev = true;
    } else {
      isPrev = false;
    }

    if (totalPages <= numberPagesShow) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(
          <PageNumber
            key={i}
            index={i}
            currentIndex={currentIndex}
            onPage={onPage}
          />
        );
      }
    } else {
      if (currentIndex - pivot > 0 && currentIndex + pivot < totalPages - 1) {
        let startIndex = currentIndex - pivot;
        const endIndex = startIndex + numberPagesShow - 1;

        pages.push(
          <Text
            key={startIndex - 1}
            style={{ fontSize: 16, fontWeight: "bold" }}
          >
            ...
          </Text>
        );
        for (startIndex; startIndex <= endIndex; startIndex++) {
          pages.push(
            <PageNumber
              key={startIndex}
              index={startIndex}
              currentIndex={currentIndex}
              onPage={onPage}
            />
          );
        }
        pages.push(
          <Text key={startIndex} style={{ fontSize: 16, fontWeight: "bold" }}>
            ...
          </Text>
        );
      } else if (currentIndex - pivot <= 0) {
        let i = 0;
        for (i; i < numberPagesShow; i++) {
          pages.push(
            <PageNumber
              key={i}
              index={i}
              currentIndex={currentIndex}
              onPage={onPage}
            />
          );
        }
        pages.push(
          <Text key={i} style={{ fontSize: 16, fontWeight: "bold" }}>
            ...
          </Text>
        );
      } else {
        let startIndex = totalPages - numberPagesShow;
        pages.push(
          <Text
            key={startIndex - 1}
            style={{ fontSize: 16, fontWeight: "bold" }}
          >
            ...
          </Text>
        );
        for (startIndex; startIndex < totalPages; startIndex++) {
          pages.push(
            <PageNumber
              key={startIndex}
              index={startIndex}
              currentIndex={currentIndex}
              onPage={onPage}
            />
          );
        }
      }
    }

    if (totalPages <= numberPagesShow && isPrev) {
      first = (
        <View styleName="horizontal h-start v-center" style={style.first}>
          <TouchableOpacity onPress={this.prevPage}>
            <Icon
              name="left-arrow"
              style={{ color: themeColors.orange, fontSize: 22 }}
            />
          </TouchableOpacity>
        </View>
      );
    } else if (isPrev) {
      first = (
        <View styleName="horizontal space-between v-center" style={style.first}>
          <TouchableOpacity
            onPress={() => {
              onPage(0);
            }}
          >
            <Text
              style={{
                color: themeColors.action,
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              First
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.prevPage}>
            <Icon
              name="left-arrow"
              style={{ color: themeColors.orange, fontSize: 22 }}
            />
          </TouchableOpacity>
        </View>
      );
    }

    if (totalPages <= numberPagesShow && isNext) {
      last = (
        <View styleName="horizontal h-end v-center" style={style.last}>
          <TouchableOpacity onPress={this.nextPage}>
            <Icon
              name="right-arrow"
              style={{ color: themeColors.orange, fontSize: 22 }}
            />
          </TouchableOpacity>
        </View>
      );
    } else if (isNext) {
      last = (
        <View styleName="horizontal space-between v-center" style={style.last}>
          <TouchableOpacity onPress={this.nextPage}>
            <Icon
              name="right-arrow"
              style={{ color: themeColors.orange, fontSize: 22 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPage(totalPages - 1);
            }}
          >
            <Text
              style={{
                color: themeColors.action,
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              Last
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View styleName="horizontal" style={style.container}>
        {first}
        <View styleName="horizontal h-center v-center" style={style.pages}>
          {pages}
        </View>
        {last}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop:5,
    maxHeight: 50,
    borderTopWidth: 1,
    borderColor: "#fff"
  },
  pages: {
    flex: 4
  },
  first: {
    flex: 1.5
  },
  last: {
    flex: 1.5
  }
};

export default connectStyle("dota2app.PagingFooter", styles)(Pagination);
