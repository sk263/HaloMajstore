import React from "react";
import { Scene, Router } from "react-native-router-flux";
import MainScreen from '../Screens/MainScreen';
import ListScreen from '../Screens/ListScreen';
import InfoScreen from '../Screens/InfoScreen';
const RouterComponent = props => {
  return (
    <Router>
      <Scene
        key="root"
        hideNavBar
      >
        <Scene initial key="main" component={MainScreen} /> 
        <Scene key="list" component={ListScreen} /> 
        <Scene key="info" component={InfoScreen} /> 
      </Scene>
    </Router>
  );
};

export default RouterComponent;
