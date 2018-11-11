import React, { Component } from "react";
import {View, Image, Button, StyleSheet, Text, Dimensions} from "react-native";
import MapView, { PROVIDER_GOOGLE, Callout } from "react-native-maps";
import firebase from 'react-native-firebase';

let id = 0;

class PickLocation extends Component {
  state = {
    currentUser: null,
    focusedLocation: {
      latitude: 31.354675,
      longitude: 34.308826,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
    },
    locationChosen: false,
    markers: [],

  }

  componentDidMount() {
   const { currentUser } = firebase.auth();
   this.setState({ currentUser });
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true,
        markers: [
       ...this.state.markers,
       {
         coordinate: coords,
         key: `foo${id++}`,
       },
     ],
      };
    });
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
  err => {
    console.log(err);
    alert("Fetching the Position failed, please pick one manually!");
  })
  }

    // provider = {PROVIDER_GOOGLE}
  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}> Hi<Text style={{color:'#e93766', fontSize: 20}}> {currentUser && currentUser.email}! </Text> Save your places!</Text>
        <MapView
          initialRegion={this.state.focusedLocation}
          zoomEnabled={true}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
        >
        {this.state.markers.map(marker => (
            <MapView.Marker
                title={marker.key}
                key={marker.key}
                coordinate={marker.coordinate}
              />
            ))}
        </MapView>
        <View>
          <Button title="Locate Me" onPress={this.getLocationHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: 'center',
    marginVertical : 50
  },
  map: {
    height: '100%',
    width: '100%',
    marginTop: 15
  }
});

export default PickLocation;
