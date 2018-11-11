import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";

import PlaceList from "@components/PlaceList/PlaceList";

class PlacesPage extends Component {
  itemSelectedHandler = key => {
    const selPlace = this.props.places.find(place => {
      return place.key === key;
    });
    this.props.navigation.navigate('PlaceDetail', {selectedPlace: selPlace})
  };

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <PlaceList
          places={this.props.places}
          onItemSelected={this.itemSelectedHandler}
        />
        <View style={styles.button}>
         <Button
           title="Go Back to map"
           color="#fff"
           onPress={() => this.props.navigation.navigate('Home')}
         />
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#e93766',
    padding: 10,
    marginTop: 20,
    borderRadius: 5
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

export default connect(mapStateToProps)(PlacesPage);
