import React, { Component } from "react";
import { StyleSheet, Platform, ScrollView, Image, Text, View, Dimensions, alert, Button, TouchableOpacity} from 'react-native'
import firebase from 'react-native-firebase';
import { connect } from "react-redux";
import { addPlace } from "../../store/actions/index";
import RadioGroup from 'react-native-radio-buttons-group';
import PlaceInput from "@components/PlaceInput/PlaceInput";
import PickLocation from "@components/PickLocation/PickLocation";
import validate from "@utility/validation";

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class AddPlace extends Component {

  state = {
    data:[
        {label: 'Home', value: 'Home', image: require('@assets/home.png')},
        {label: 'Park', value: 'Park', image: require('@assets/park.png')},
        {label: 'Restaurant', value: 'Restaurant', image: require('@assets/cafe.png')}
    ],
    controls: {
      placeType: {
        value: "",
        image: null
      },
      placeName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true,
          minLength: 5
        }
      },
      placeNum: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true,
          isNum: 0
        }
      },
      location: {
        value: null,
        valid: false
      }
    }
  };

  constructor(props) {
    super(props);
  }

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      };
    });
  };

  placeNumChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeNum: {
            ...prevState.controls.placeNum,
            value: val,
            valid: validate(val, prevState.controls.placeNum.validationRules),
            touched: true
          }
        }
      };
    });
  };

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeType.value,
      this.state.controls.placeName.value,
      this.state.controls.placeNum.value,
      this.props.navigation.state.params.location
    );
     this.props.navigation.navigate('PlacesPage')
  };

  placeTypeHandler = () => {
    let selectedButton = this.state.data.find(e => e.selected == true);
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeType: {
            value: selectedButton.value,
            image: selectedButton.image
          }
        }
      };
    });
  };

render() {
  let selectedButton = this.state.data.find(e => e.selected == true);
  selectedButton = selectedButton ? selectedButton : this.state.data[0].label;
    return (
        <View style={styles.container}>
          <View>
            <Text style={{color:'#e93766', fontSize: 20}}>Choose you location type:</Text>
            <Image source={selectedButton.image} style={{width:80, height: 80, borderWidth:0.5, borderColor:'#e93766', marginVertical: 7, justifyContent: 'center', alignSelf: 'center'}} />
            <RadioGroup radioButtons={this.state.data} onPress={this.placeTypeHandler} />
          </View>
          <PlaceInput
            placeholder="Place Name"
            placeData={this.state.controls.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <PlaceInput
            placeholder="Place phone number"
            placeData={this.state.controls.placeNum}
            onChangeText={this.placeNumChangedHandler}
          />
          <View style={styles.button}>
            <Button
              title="Add Place!"
              color="#fff"
              onPress={this.placeAddedHandler}
              disabled={
                !this.state.controls.placeName.valid ||
                !this.state.controls.placeNum.valid
              }
            />
          </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  button: {
    margin: 8,
    alignItems: 'center',
    backgroundColor: '#e93766',
    padding: 10,
    borderRadius: 5
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeType, placeName, placeNum, location) => dispatch(addPlace(placeType, placeName, placeNum, location))
  };
};

export default connect(null, mapDispatchToProps)(AddPlace);
