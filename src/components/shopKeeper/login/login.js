import React, { Component } from "react";
import { loginStyles } from "./style";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid
} from "react-native";
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { Header, FormInput, FormLabel, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { shopkeeperlogin } from '../../../store/middleware/authMiddleWare'

const Accounts = [];
class ShopKeeperLogin extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: "",
      password: "",
      isLogin: false
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    const { navigate } = this.props.navigation
    this.props.isLoggedIn ? navigate('ShopKeeperDashBoardScreen')
      :
      null
    // AsyncStorage.getItem('shopkeeper', (err, data) => {
    //   console.log('dta==', JSON.parse(data))
    //   let parsedata= JSON.parse(data)
    //   // console.log("parse",parsedata.isLogin)
    //   this.setState({
    //     isLogin:parsedata.isLogin
    //   })
    // })
  }

  _handleLogin() {
    const { navigate } = this.props.navigation
    let obj = {
      email: this.state.email,
      pasword: this.state.password
    }
    this.props.login(obj, navigate)
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAwareScrollView style={loginStyles.container}>
        <View>
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
              text: "shopKeeper Login",
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
              onPress={() => this._handleLogin()}
            />
            <View style={loginStyles.registerSuggestionText}>
              <Text>Not Registered</Text>
              <TouchableOpacity onPress={() => navigate("ShopKeeperSignupScreen")}>
                <Text style={{ fontWeight: "bold" }}>Signup Now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.AuthReducers.isLoggedIn
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload, navigate) => { dispatch(shopkeeperlogin(payload, navigate)) }
  }
}
export default connect(null, mapDispatchToProps)(ShopKeeperLogin);
