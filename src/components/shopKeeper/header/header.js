import React from 'react';
import { View, Text, Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default class Dashbord extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
                <Header
                    statusBarProps={{ barStyle: "light-content" }}
                    centerComponent={{
                        text: "welcome to shopkeeper  ",
                        style: { color: "#fff" }
                    }}
                    outerContainerStyles={{ backgroundColor: "#0097A7" }}
                />
        )
    }
}
