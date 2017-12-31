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
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import styles from './style'
import { signupStyles } from "./style";
import { supplierSignup } from '../../../store/middleware/authMiddleWare';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class SupplierSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            contact: 0
        }
    }
    static navigationOptions = {
        header: null
    }
    _handleSignup() {
        const { navigate } = this.props.navigation
        let obj = {
            name: this.state.firstName + this.state.lastName,
            email: this.state.email,
            pasword: this.state.password,
            deviceid: this.props.deviceID,
            contact: this.state.contact
        }
        this.props.signup(obj, navigate)
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView>
                <View>
                    <Header
                        centerComponent={{
                            text: " Supplier Signup",
                            style: { color: "#fff" }
                        }}
                        outerContainerStyles={{ backgroundColor: "#659EC7" }}
                    />
                    <View style={signupStyles.form}>
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
                                <FormLabel>Contact #</FormLabel>
                                <FormInput
                                    keyboardType="email-address"
                                    value={this.state.contact}
                                    onChangeText={txt => this.setState({ contact: txt })}
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
                                onPress={() => this._handleSignup()}
                            />
                        </View>
                        <View style={signupStyles.registerSuggestionText}>
                            <Text>Already have an account ?</Text>
                            <TouchableOpacity onPress={() => navigate("SupplierLoginScreen")}>
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
        signup: (payload, navigate) => { dispatch(supplierSignup(payload, navigate)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SupplierSignup)