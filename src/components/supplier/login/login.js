import React, { Component } from "react";
import { loginStyles } from "./style";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
  BackHandler
} from "react-native";

import { Header, FormInput, FormLabel, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { supplierLogin } from '../../../store/middleware/authMiddleWare';
const Accounts = [];
class SupplierLogin extends Component {
  constructor() {
    super();
    this.state = {
      user: Object,
      email: "",
      password: "",
      isLogin: false
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {

    console.log("will mount runing")
    const { navigate } = this.props.navigation
    this.props.loggedIn ?
      navigate('SupplierDashBoardScreen')
      :
      null
    // BackHandler.addEventListener('hardwarebackpress', () => {
    //   console.log("helloooooo")

    // })

  }
  componentWillUnmount() {
    console.log("umount runing")
    BackHandler.removeEventListener('hardwareBackPress');
  }
  login() {
    const { navigate } = this.props.navigation
    let obj = {
      email: this.state.email,
      pasword: this.state.password
    }
    console.log(this.props.login)
    this.props.login(obj, navigate)
  }

  _handleLogin() {
    const { navigate } = this.props.navigation
    let obj = {
      email: this.state.email,
      pasword: this.state.password
    }
    firebase.auth()
      .signInWithEmailAndPassword(obj.email, obj.pasword)
      .then((user) => {
        var userId = firebase.
          auth().currentUser.uid;
        firebase.database().ref('users/' + userId).on('value', (data) => {
          var obj = data.val();
          console.log('user', obj)
          this.setState({ isLogin: true })
        })
        navigate('SupplierDashBoardScreen');
        ToastAndroid.show('lOGIN SUCCESSFUL !', ToastAndroid.SHORT);
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (

      <KeyboardAwareScrollView style={loginStyles.container}>
        <View>
          {console.log("state",this.props.loggedIn)}
          <Header
            statusBarProps={{ barStyle: "light-content" }}
            leftComponent={
              <Image
                source={{
                  uri:
                    "https://cdn1.iconfinder.com/data/icons/avatar-2-2/512/Salesman_2-256.png"
                }}
                style={{ width: 35, height: 35 }}
              />
            }
            centerComponent={{
              text: "Supplier Login",
              style: { color: "#fff" }
            }}
            outerContainerStyles={{ backgroundColor: "#0097A7" }}
          />
          <View style={loginStyles.form}>
            <Text style={loginStyles.formHeading}>Login Form</Text>
            <View style={loginStyles.formFields}>
              <FormLabel>Email</FormLabel>
              <FormInput
                keyboardType="email-address"
                onChangeText={txt => this.setState({ email: txt })}
                dataDetectorTypes="address"
                value={this.state.email}
              />
              <FormLabel>Password</FormLabel>
              <FormInput
                secureTextEntry={true}
                onChangeText={txt => this.setState({ password: txt })}
                value={this.state.password}
              />
            </View>

            <Button
              title="Login"
              buttonStyle={loginStyles.loginButton}
              onPress={() => this.login()}
            />
            <View style={loginStyles.registerSuggestionText}>
              <Text>Not Registered</Text>
              <TouchableOpacity onPress={() => navigate("SupplierSignupScreen")}>
                <Text style={{ fontWeight: "bold" }}>Signup Now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    loggedIn: state.AuthReducers.isLoggedIn
  }
}
// const mapStateToProps = () => ({
//   loggedIn: state.isLoggedIn
// })
// // const mapDispatchToProps = () => ({
//   login: (paylaod, navigate) => { dispatch(supplierlogin(paylaod, navigate)) }
// })
function mapDispatchToProps(dispatch) {
  return {
    login: (payload, navigate) => { dispatch(supplierLogin(payload, navigate)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SupplierLogin);
