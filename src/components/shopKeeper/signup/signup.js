import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
    Button,
    Header,
    FormInput,
    FormLabel,
    Icon,
    Avatar
} from "react-native-elements";
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase'
import styles from './style'
import { signupStyles } from "./style";
import { shopkeeperSignup } from '../../../store/middleware/authMiddleWare';
// import default from '../../supplier/signup/signup';
import OneSignal from 'react-native-onesignal'
class ShopKeeperSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            email: ''
        }
    }
    static navigationOptions = {
        header: null
    }

    signup() {
        const { navigate } = this.props.navigation
        let obj = {
            name: this.state.firstName + this.state.lastName,
            email: this.state.email,
            pasword: this.state.password,
            deviceid:this.props.deviceID
        }
        this.props.signup(obj, navigate)
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView>
                {console.log("state of deviceid==>",this.props.deviceID)}
                <View>
                    <Header
                        statusBarProps={{ barStyle: "light-content" }}

                        centerComponent={{
                            text: " SHOPKEEPER SIGNUP",
                            style: { color: "#fff" }
                        }}
                        outerContainerStyles={{ backgroundColor: "#0097A7" }}
                    />
                    <View style={signupStyles.form}>
                        <Text style={signupStyles.formHeading}>Signup Form</Text>
                        <View style={signupStyles.formFields}>
                            <View>
                                <FormLabel>First Name</FormLabel>
                                <FormInput
                                    onChangeText={txt => this.setState({ firstName: txt })}
                                    value={this.state.firstName}
                                />

                                <FormLabel>Last Name</FormLabel>
                                <FormInput
                                    onChangeText={txt => this.setState({ lastName: txt })}
                                    value={this.state.lastName}
                                />

                                <FormLabel>Email</FormLabel>
                                <FormInput
                                    keyboardType="email-address"
                                    value={this.state.email}
                                    onChangeText={txt => this.setState({ email: txt })}
                                />

                                <FormLabel>Password</FormLabel>
                                <FormInput
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={txt => this.setState({ password: txt })}
                                />
                            </View>
                            <Button
                                title="Sign up"
                                buttonStyle={signupStyles.SignupButton}
                                onPress={() => this.signup()}
                            />
                        </View>
                        <View style={signupStyles.registerSuggestionText}>
                            <Text>Already have an account ?</Text>
                            <TouchableOpacity onPress={() => navigate("ShopKeeperLoginScreen")}>
                                <Text style={{ fontWeight: "bold" }}>Login Now!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </KeyboardAwareScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        deviceID: state.deviceIDReducer.deviceID
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signup: (payload, navigate) => { dispatch(shopkeeperSignup(payload, navigate)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShopKeeperSignup);