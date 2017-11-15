import React from 'react'
import { AppRegistry } from 'react-native';
// import App from './App';
import AppNavigation from './src/appNavigations/appNavigation';
import * as firebase from 'firebase'
import store from './src/store';
import { Provider } from 'react-redux';
var config = {
    apiKey: "AIzaSyC87nZiggXZynKhq4xjbYrTHANE7UEhZEo",
    authDomain: "final-year-project-5e267.firebaseapp.com",
    databaseURL: "https://final-year-project-5e267.firebaseio.com",
    projectId: "final-year-project-5e267",
    storageBucket: "",
    messagingSenderId: "1047912628189"
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
