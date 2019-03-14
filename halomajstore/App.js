import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import Router  from './router/Router';
import firebase from 'firebase';
import { createStore, applyMiddleware } from "redux";
import { setLocation, getMajstors } from './actions';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default class App extends React.Component {

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyDS0BWiaWfO4R_QJgo0ZPrysM6HOmArSHU",
      authDomain: "mojmajstore.firebaseapp.com",
      databaseURL: "https://mojmajstore.firebaseio.com",
      projectId: "mojmajstore",
      storageBucket: "mojmajstore.appspot.com",
      messagingSenderId: "58159635021"
    };

    firebase.initializeApp(config);
    
    this._locationSaved();
    store.dispatch(getMajstors());
  }

  _locationSaved = async () => {
    let location = '';
    try {
      location = await AsyncStorage.getItem('LOCATION') || 'none';
    } catch (error) {
     }
    if(location != 'none') {
      store.dispatch(setLocation(location));
    }
}

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
