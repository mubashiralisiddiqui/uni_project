import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Button, List, ListItem, Icon, Card, Header } from 'react-native-elements';
import * as firebase from 'firebase';
import { OrderDetailsMiddleware } from '../../../store/middleware/orderDetailMiddleWare'
import { connect } from 'react-redux'

export default class SupplierDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            currentUser: firebase.auth().currentUser.uid
        }

    }

    componentDidMount() {
        console.log("didmount running")
        console.log("params==>", this.props.navigation.state.params)
        firebase.database().ref('users/').on('value', snapshot => {
            let obj = snapshot.val();
            let array = [];

            for (var prop in obj) {
                console.log("props offonrin", obj[prop].role)
                if (obj[prop].role === "supplier") {
                    array.push(obj[prop])
                }
            }
            this.setState({
                orderList: array
            })
        })
    }
    render() {
        const { navigate } = this.props.navigation;
        const params = this.props.navigation.state.params.data
        console.log("paramss", params.userId)
        return (
            <View>
                <ScrollView>
                    <Card title="Supplier Info" titleStyle={{ color: '#339cc9' }}>
                        <View >
                            <View style={{ flexDirection: 'row', flex: 1, }}>
                                <Icon name="phone" color='#00aced' />
                                <Text style={{ marginLeft: 20 }}>contact:{params.contact}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Icon name="person" color='#00aced' />
                                <Text style={{ marginLeft: 20 }}>Name:{params.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Icon name="email" color='#00aced' />
                                <Text style={{ marginLeft: 20 }}>Email:{params.email}</Text>
                            </View >
                            <Text style={{ marginLeft: 20 }}>Designation:{params.role}</Text>
                            <Button
                                title="contact"
                                icon={{ name: 'send' }}
                                buttonStyle={{ backgroundColor: '#0097A7', borderRadius: 100 }}
                                onPress={() => { navigate('chatScreen', { suplierId: params.userId, shopKeeperID: this.state.currentUser }) }}
                            />
                        </View>
                    </Card>
                </ScrollView>

            </View>
        )
    }
}






