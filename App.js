import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler
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
    this.onOpened = this.onOpened.bind(this)
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }
  componentWillMount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
  }
  onReceived(notification) {
    console.log("Notification received: ", notification);
  }
  onOpened(openResult) {
    const { navigate } = this.props.navigation;
    navigate("orderListScreen");
    console.log('Messageby me==: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  
  }

  onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
  }

  onIds(device) {
    console.log('Device info: ', device);
    OneSignal.addEventListener('ids', this.onIds);
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
        <Image
          source={require('./appLogo.png')}
          style={{ width: 200, height: 200, borderRadius: 100, marginBottom: 50 }} />
        <Button
          title="Login As ShopKeeper"
          buttonStyle={styles.SignupButton}
          onPress={() => navigate('ShopKeeperLoginScreen')}
          textStyle={{fontFamily:'Georgia',color:'#659EC7',fontWeight:'bold'}}
        />
        <Button
          title="Login As Supplier"
          buttonStyle={styles.SignupButton}
          onPress={() => navigate('SupplierLoginScreen')}
          textStyle={{fontFamily:'Georgia',color:'#659EC7',fontWeight:'bold'}}
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
    backgroundColor:'#659EC7'

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  SignupButton: {
    backgroundColor: 'white',
    marginTop: 25,
    borderRadius: 10,
    height:50
  },
  titleStyle: {
    color: '#fff',
    fontStyle: "italic",
    fontSize: 20,
    fontFamily: 'Times New Roman'
  }
});
const mapDispatchToProps = (dispatch) => {
  return {
    decviceinfo: (payload) => { dispatch(deviceIDMiddlware(payload)) }
  }
}

export default connect(null, mapDispatchToProps)(App)