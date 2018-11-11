import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "@components/ListItem/ListItem";

const placeList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.places}
      renderItem={(info) => (
        <ListItem
          placeType={info.item.type}
          placeName={info.item.name}
          placeNum={info.item.phone}
          location={info.item.location}
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    marginTop: 50
  }
});

export default placeList;
