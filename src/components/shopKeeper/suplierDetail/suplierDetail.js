import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Button, List, ListItem, Icon, Card,Header } from 'react-native-elements';
import * as firebase from 'firebase';
import { OrderDetailsMiddleware } from '../../../store/middleware/orderDetailMiddleWare'
import { connect } from 'react-redux'

export default class SupplierDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
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

        // firebase.database().ref('order/').on('value', snapshot => {
        //     snapshot.forEach((messageSnapshot) => {
        //         let array = [];
        //         let obj = messageSnapshot.val();
        //         for (var prop in obj) {
        //             array.push(obj[prop]);
        //             console.log('array==>', array)
        //             this.setState({
        //                 orderList: array
        //             })
        //         }
        //     })
        // })
    }
    render() {
        const { navigate } = this.props.navigation;
        const params = this.props.navigation.state.params.key
        console.log("paramss", this.state.orderList[0])
        return (
            <View>
                <ScrollView>
                    <Card title="Supplier Info" titleStyle={{color:'#339cc9'}}>
                    {/* {
                        this.state.orderList&&this.state.orderList.length>0?
                        
                        <Text>helloasf yryer firebase irbase ka issue hay 
                            ni yar ait thek tha 
                            is  ondition k to ander hi nhi ara awarna undefined k a error ata ye tmhara firebase ka masla hayskfjasnkfj</Text>
                       :""
                    }  */}
                        {
                            this.state.orderList.length !== 0 ?
                                this.state.orderList
                                    .map((u, i) => {
                                        return (
                                            <View key={i}>
                                                <Text>Name:{u.name}</Text>
                                                <Text>Email:{u.email}</Text>
                                                <Text>Status:{u.role}</Text>
                                                <Text>Status:{u.contact}</Text>
                                            </View>
                                        );
                                    }):null
                        }
                    </Card>
                </ScrollView>

            </View>
        )
    }
}






