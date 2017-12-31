import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Button, List, ListItem, Icon, Card, Header } from 'react-native-elements';
import * as firebase from 'firebase';
import { OrderDetailsMiddleware } from '../../../store/middleware/orderDetailMiddleWare';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux'
import Icons from 'react-native-vector-icons/Ionicons';
export default class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            currentUser: '',
            messages: []
        }

    }
    componentWillMount() {
        let uid = firebase.auth().currentUser.uid
        this.setState({
            currentUser: uid
        })
    }
    static navigationOptions = {
        // title:'back',
        headerTitle: 'Order Info',
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

    render() {
        const { navigate } = this.props.navigation
        const params = this.props.navigation.state.params.data
        return (
            <View>
                <ScrollView contentContainerStyle={{ marginTop: 60 }}>
                    <Card
                        title="order details"
                    >
                        <View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Icon name="message" color='#00aced' />
                                <Text style={{ marginLeft: 20 }}>on {params.date}</Text>
                            </View>
                            {params.items.map((u, i) => {
                                return (
                                    <View key={i}>
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
                            <Button
                                title="contact"
                                icon={{ name: 'send' }}
                                buttonStyle={{ backgroundColor: '#659EC7', borderRadius: 100, marginTop: 20 }}
                                onPress={() => { navigate('chatScreen', { suplierId: params.sk_info.userId, shopKeeperID: this.state.currentUser }) }}
                            />

                        </View>
                    </Card>

                </ScrollView>
            </View>
        )
    }
}





