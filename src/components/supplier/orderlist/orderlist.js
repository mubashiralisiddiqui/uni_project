import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Button, List, ListItem, Icon } from 'react-native-elements';
import * as firebase from 'firebase';

export default class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        }

    }
    componentDidMount() {
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
                // // array.push(obj)
                console.log('message snapshot==>', obj)
                // // this.setState({
                // //     orderList: array
                // })
            })
        })
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                {console.log(this.state.orderList, "state of list")}
                <Text>Your Orders </Text>
                <ScrollView>
                    <List>
                        {this.state.orderList.map((l, i) => {
                            console.log("list item", l)
                            return (
                                <ListItem
                                    key={i}
                                    title={"order by " + l.sk_info.name + l.date + l.time}
                                    onPress={() => { navigate('OrderDetailsScreen', { key: i, data: l }) }}
                                />)
                        })}
                    </List>
                </ScrollView>

            </View>
        )
    }
}