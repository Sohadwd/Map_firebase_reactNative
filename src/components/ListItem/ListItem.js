import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const listItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <View>
      <Text>Type: {props.placeType}</Text>
      <Text>Name: {props.placeName}</Text>
      <Text>Phone: {props.placeNum}</Text>
      <Text>location: {props.location.latitude} {props.location.longitude}</Text>
    </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    marginRight: 10,
    padding: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center"
  }
});

export default listItem;
