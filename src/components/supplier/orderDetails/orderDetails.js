import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Button, List, ListItem, Icon, Card } from 'react-native-elements';
import * as firebase from 'firebase';
import { OrderDetailsMiddleware } from '../../../store/middleware/orderDetailMiddleWare'
import { connect } from 'react-redux'

export default class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        }

    }
    render() {
        const params = this.props.navigation.state.params.data
        console.log("params", params)
        return (
            <View>
                {console.log(this.state.orderList, "state of list")}
                <Text>Your Orders </Text>
                <ScrollView>
                    <Card
                        title="order details"
                    >
                        <View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Icon name="message" color='#00aced' />
                                <Text style={{ marginLeft: 20 }}>on {params.date}</Text>
                                <Text style={{ marginLeft: 20 }}>at {params.time}</Text>
                            </View>
                            {params.items.map((u, i) => {
                                return (
                                    <View>
                                        <Text>{u}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </Card>
                    <Card
                        title="ShopkeeperInfo"
                    >
                        <View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Icon name="person" color='#00aced' />
                                <Text style={{ marginLeft: 20 }}>Name {params.sk_info.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Icon name="email" color='#00aced' />
                                <Text style={{ marginLeft: 20 }}>Email:{params.sk_info.email}</Text>
                            </View >
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Icon name="phone" color='#00aced' />
                                <Text style={{ marginLeft: 20 }}>contact:{params.sk_info.contact}</Text>
                            </View >
                        </View>
                    </Card>

                </ScrollView>

            </View>
        )
    }
}
//sk_info.name
//sk_info.email
//sk_info.contact




