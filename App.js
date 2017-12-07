import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {
  Button,
  Header,
  FormInput,
  FormLabel,
  Icon,
  Avatar
} from "react-native-elements";
import OneSignal from 'react-native-onesignal';
import { connect } from 'react-redux';
import { deviceIDMiddlware } from './src/store/middleware/deviceidmiddleware';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      deviceid: ''

    }
    this.onIds = this.onIds.bind(this)
    console.log('constructure running')
  }
  componentDidMount() {
    OneSignal.configure({
      onIdsAvailable: (device) => {
        console.log('UserId = ', device.userId);
        console.log('PushToken = ', device.pushToken);
      },
      onNotificationReceived: (notification) => {
        console.log('MESSAGE RECEIVED: ', notification["notification"]["notificationID"]);
      },
      onNotificationOpened: (openResult) => {
        console.log('MESSAGE: ', openResult["notification"]["payload"]["body"]);
        console.log('DATA: ', openResult["notification"]["payload"]["additionalData"]);
        console.log('ISACTIVE: ', openResult["notification"]["isAppInFocus"]);

      }
    });
  }




  handleNotification(message, data, isActive) {
    console.log(message, data, isActive)
    if (isActive) {
      // TODO: Toast Notification
      alert("active")

    } else {
      // TODO: Go to the room
      console.log('not active')
    }
  }
  componentWillMount() {

    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {

    OneSignal.removeEventListener('ids', this.onIds);
  }
  onIds(device) {

    const id = device.userId
    console.log('Device info: ', id);
    this.props.decviceinfo(id)

  }

  static navigationOptions = {
    header: null
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'Welcome To E Supply App', style: { color: '#fff',fontStyle:"italic",fontSize:25 } }}
          outerContainerStyles={{ backgroundColor: "#0288D1" }}
        />
        <Image source={require('./appLogo.png')} style={{ width: 200, height: 200, borderRadius: 100 }} />
        <Button
          title="Login As ShopKeeper "
          buttonStyle={styles.SignupButton}
          onPress={() => navigate('ShopKeeperLoginScreen')}
        />
        <Button
          title="Login As Supplier"
          buttonStyle={styles.SignupButton}
          onPress={() => navigate('SupplierLoginScreen')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  SignupButton: {
    backgroundColor: '#0288D1',
    marginTop: 25,
    borderRadius: 50,
    // width: 50,
    // height: 100

  }
});
const mapDispatchToProps = (dispatch) => {
  return {
    decviceinfo: (payload) => { dispatch(deviceIDMiddlware(payload)) }
  }
}

export default connect(null, mapDispatchToProps)(App)