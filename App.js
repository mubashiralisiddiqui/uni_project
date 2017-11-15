
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
export default class App extends Component {
  static navigationOptions = {
    header: null

  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          centerComponent={{
            text: "Welcome To SAlESMAN & SHOP KEEPER APP",
            style: { color: "#fff" }
          }}
          outerContainerStyles={{ backgroundColor: "#0288D1" }}
        />
        <Image source={require('./logo.jpg')} />
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  SignupButton: {
    backgroundColor: '#0288D1',
    marginTop: 25
  }
});
