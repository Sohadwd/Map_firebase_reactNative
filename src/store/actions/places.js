import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeType, placeName, placeNum, location) => {
  return {
      type: ADD_PLACE,
      placeType: placeType,
      placeName: placeName,
      placeNum: placeNum,
      location: location
  };
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};


// NOTE: Here if we need to save the places and data to Realtime Database on firebase
// return dispatch => {
//     const placeData = {
//         placeType: placeType,
//             placeName: placeName,
//             placeNum: placeNum,
//             location: location
//     };
//     fetch("https://sampleapp-b4f97.firebaseio.com/places.json", {
//         method: "POST",
//         body: JSON.stringify(placeData)
//     })
//     .catch(err => console.log(err))
//     .then(res => res.json())
//     .then(parsedRes => {
//         console.log(parsedRes);
//     });
// };
