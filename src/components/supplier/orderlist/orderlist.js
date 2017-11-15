import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button, List, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';

export default class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList:[]
        }

    }
    componentDidMount() {
        firebase.database().ref('oreder/').on('value', data => {
            console.log("orders==>", data.val())
            // this.setState({
        
            // })
        })
    }
    render() {
        return (
            <View>
                <Text>Your Orders </Text>

            </View>
        )
    }
}