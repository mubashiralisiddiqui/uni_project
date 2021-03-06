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
    static navigationOptions = {
        headerTitle: 'SupplierInfo',
        headerTitleStyle: {
            color: '#ffff',
            textAlign: 'center',
            marginLeft: 70
        },
        headerTintColor: '#ffff',
        headerStyle: {
            backgroundColor: '#659EC7'
        }


    }
    componentDidMount() {
        firebase.database().ref('users/').on('value', snapshot => {
            let obj = snapshot.val();
            let array = [];

            for (var prop in obj) {
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
        return (
            <View>
                <ScrollView contentContainerStyle={{ marginTop: 60 }}>
                    <Card title="Supplier Info" titleStyle={{ color: '#659EC7' }}>
                        <View >
                            <View style={{ flexDirection: 'row', flex: 1, }}>
                                <Icon name="phone" color='#659EC7' />
                                <Text style={{ marginLeft: 20, fontFamily: 'Times New Roman' }}>contact:{params.contact}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Icon name="person" color='#659EC7' />
                                <Text style={{ marginLeft: 20, fontFamily: 'Times New Roman' }}>Name:{params.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Icon name="email" color='#659EC7' />
                                <Text style={{ marginLeft: 20, fontFamily: 'Times New Roman' }}>Email:{params.email}</Text>
                            </View >
                            <Text style={{ marginLeft: 20 }}>Designation:{params.role}</Text>
                            <Button
                                title="contact"
                                icon={{ name: 'send' }}
                                buttonStyle={{ backgroundColor: '#659EC7', borderRadius: 100, marginTop: 10 }}
                                onPress={() => { navigate('chatScreen', { suplierId: params.userId, shopKeeperID: this.state.currentUser }) }}
                            />
                        </View>
                    </Card>
                </ScrollView>
            </View>
        )
    }
}






