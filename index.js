import React from 'react'
import { AppRegistry } from 'react-native';
// import App from './App';
import AppNavigation from './src/appNavigations/appNavigation';
import * as firebase from 'firebase'
import store from './src/store';
import { Provider } from 'react-redux';
var config = {
    apiKey: "AIzaSyDaYhRMxMVGYIE-jp16ENy0cAjtHVOTTdw",
    authDomain: "final-year-project-648bc.firebaseapp.com",
    databaseURL: "https://final-year-project-648bc.firebaseio.com",
    projectId: "final-year-project-648bc",
    storageBucket: "final-year-project-648bc.appspot.com",
    messagingSenderId: "663564521271"
  };
  firebase.initializeApp(config);


class App extends React.Component {
    render() {
        return (
            <Provider store={store} >
                <AppNavigation />
            </Provider>
        )
    }
}
AppRegistry.registerComponent('fyp', () => App);
