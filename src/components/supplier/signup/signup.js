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
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import styles from './style'
import { signupStyles } from "./style";
import { supplierSignup } from '../../../store/middleware/authMiddleWare';

class SupplierSignup extends React.Component {
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
    _handleSignup() {
        const { navigate } = this.props.navigation
        let obj = {
            name: this.state.firstName + this.state.lastName,
            email: this.state.email,
            pasword: this.state.password,
        }
        this.props.signup(obj, navigate)
       
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Header
                    statusBarProps={{ barStyle: "light-content" }}

                    centerComponent={{
                        text: " Supplier Signup",
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
        )
    }
}
const mapStateToProps = (state) => {
    return {

    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        signup: (payload, navigate) => { dispatch(supplierSignup(payload, navigate)) }
    }
}
export default connect(null, mapDispatchToProps)(SupplierSignup)