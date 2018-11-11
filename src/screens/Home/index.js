import React, { Component } from "react";
import { StyleSheet, Platform, ScrollView, Image, Text, View, Dimensions, alert, Button, TouchableOpacity} from 'react-native'
import PickLocation from "@components/PickLocation/PickLocation";

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class Home extends Component {
  state = {
    controls: {
      location: {
        value: null,
        valid: false
      }
    }
  };

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      };
    });
  };

addPlace = () => {
  const location = this.state.controls.location.value;
  this.props.navigation.navigate('AddPlace', {location: location});
}

render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <PickLocation onLocationPick={this.locationPickedHandler} />
           <View style={styles.button}>
            <Button
              title="Add Place!"
              color="#fff"
               onPress={this.addPlace}
               disabled={
                !this.state.controls.location.valid
              }
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#e93766',
    padding: 10,
    marginTop: 25,
    borderRadius: 5
  }
})
