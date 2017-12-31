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
import { Header, FormInput, FormLabel, Button, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { shopkeeperlogin } from '../../../store/middleware/authMiddleWare'
// import LoginIcon from 'react-native-vector-icons/SimpleLineIcons'
import LoginIcon from 'react-native-vector-icons/SimpleLineIcons';

const Accounts = [];
class ShopKeeperLogin extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: "sh@sh.com",
      password: "123456",
      isLogin: false
    };
  }

  static navigationOptions = {
    header: null,
  }

  componentWillMount() {
    const { navigate } = this.props.navigation
    if (this.props.isLoggedIn===true) {
      // navigate('ShopKeeperDashBoardScreen')
    }
  }

  componentDidMount() {
    const { navigate } = this.props.navigation
    // this.props.isLoggedIn ? navigate('ShopKeeperDashBoardScreen')
    //   :
    //   navigate('ShopKeeperLoginScreen')
    // AsyncStorage.getItem('shopkeeper', (err, data) => {
    //   let parsedata= JSON.parse(data)
    //   this.setState({
    //     isLogin:parsedata.isLogin
    //   })
    // })
  }

  _handleLogin() {
    const { navigate } = this.props.navigation
    const islogin = this.props.isLoggedIn
    let obj = {
      email: this.state.email,
      pasword: this.state.password,
      id: this.props.deviceID
    }
    this.props.login(obj, navigate, islogin)
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAwareScrollView style={loginStyles.container}>
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
            text: "ShopKeeper Login",
            style: { color: "#fff", fontFamily: 'Times New Roman' }
          }}
          outerContainerStyles={{ backgroundColor: "#659EC7" }}
        />
        <View style={loginStyles.form}>
          <Image
            source={require('../../../../appLogo.png')}
            style={{ width: 190, height: 190, borderRadius: 100, justifyContent: 'center', display: 'flex', marginLeft: 85 }} />
          <View style={loginStyles.formFields}>
            <FormLabel>Email</FormLabel>
            <FormInput
              keyboardType="email-address"
              onChangeText={txt => this.setState({ email: txt })}
              dataDetectorTypes="address"
              value={this.state.email}
              inputStyle={{ fontFamily: 'Times New Roman' }}
            />
            <FormLabel>Password</FormLabel>
            <FormInput
              secureTextEntry={true}
              onChangeText={txt => this.setState({ password: txt })}
              value={this.state.password}
              inputStyle={{ fontFamily: 'Times New Roman' }}
            />
          </View>

          <Button
            title="Login"
            buttonStyle={loginStyles.loginButton}
            onPress={() => this._handleLogin()}
            textStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold' }}
          />
          <View style={loginStyles.registerSuggestionText}>
            <Text>Not Registered</Text>
            <TouchableOpacity onPress={() => navigate("ShopKeeperSignupScreen")}>
              <Text style={{ fontWeight: "bold" }}>Signup Now!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.AuthReducers.isLoggedIn,
    deviceID: state.deviceIDReducer.deviceID
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload, navigate, islogin) => { dispatch(shopkeeperlogin(payload, navigate, islogin)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShopKeeperLogin);
