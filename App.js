import {Platform, StyleSheet, Text, View} from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import { Provider } from "react-redux";

import Loading from '@screens/Loading';
import SignUp from '@screens/SignUp';
import Login from '@screens/Login';
import AddPlace from '@screens/AddPlace';
import Home from '@screens/Home';
import PlacesPage from '@screens/PlacesPage';
import PlaceDetail from '@screens/PlaceDetail';
import configureStore from "./src/store/store.js";

const store = configureStore();

const App = SwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Home,
    AddPlace,
    PlacesPage,
    PlaceDetail
  },
  {
    initialRouteName: 'Loading'
  }
)

export default App
