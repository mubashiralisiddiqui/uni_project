import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Button, List, ListItem, Icon, Card } from 'react-native-elements';
import * as firebase from 'firebase';

export default class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        }

    }
    componentDidMount() {
        console.log("params==>", this.props.navigation.state.params)
        firebase.database().ref('order/').on('value', snapshot => {
            snapshot.forEach((messageSnapshot) => {
                let array = [];
                let obj = messageSnapshot.val();
                for (var prop in obj) {
                    array.push(obj[prop]);
                    console.log('array==>', array)
                    this.setState({
                        orderList: array
                    })
                }
            })
        })
    }
    render() {
        const params = this.props.navigation.state.params.key
        return (
            <View>
                {console.log(this.state.orderList, "state of list")}
                <Text>Your Orders </Text>
                <ScrollView>

                    <Card
                        key={i}
                        title={
                            this.state.orderList.length !== 0 ?
                                "order by " + this.state.orderList[0].time
                                : ""
                        }
                    ></Card>

                </ScrollView>

            </View>
        )
    }
}