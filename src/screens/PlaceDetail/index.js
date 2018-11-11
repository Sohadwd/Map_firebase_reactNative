import React, { Component } from "react";
import {View, Text, Button, StyleSheet, TouchableOpacity, Platform} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../../store/actions/index";

class PlaceDetail extends Component {

  placeDeletedHandler = () => {
    const selectedPlace = this.props.navigation.state.params.selectedPlace
    this.props.onDeletePlace(selectedPlace.key);
    this.props.navigation.navigate('PlacesPage')
  };

  render() {
    return (
      <View style={styles.container}>
          <View style={{alignItems: 'center', marginTop: 50, marginBottom : 15}}>
          <Text>You selected  <Text style={styles.placeName}>
            {this.props.navigation.state.params.selectedPlace.name}
          </Text> Place </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.deleteButton} onPress={this.placeDeletedHandler}>
              <Icon
                size={30}
                name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                color="red"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <Button
              title="Go back"
              color="#fff"
              onPress={() => this.props.navigation.navigate("PlacesPage")}/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28,
    color: '#e93766',
    marginTop: 20
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#e93766',
    borderRadius: 5
  },
  deleteButton: {
    alignItems: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
