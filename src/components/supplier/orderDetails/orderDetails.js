import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Button, List, ListItem, Icon, Card } from 'react-native-elements';
import * as firebase from 'firebase';
import { OrderDetailsMiddleware } from '../../../store/middleware/orderDetailMiddleWare'
import { connect } from 'react-redux'

class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        }

    }
    componentDidMount() {
        console.log("params==>", this.props.navigation.state.params)
        this.props.getorder()
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
        const params = this.props.navigation.state.params.key
        return (
            <View>
                {console.log(this.state.orderList, "state of list")}
                <Text>Your Orders </Text>
                <ScrollView>


                </ScrollView>

            </View>
        )
    }
}
const mapStateToprops = (state) => {
    return {
        orderDetails: state.OrderDetailReducer.orderDetails
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getorder: () => { dispatch(OrderDetailsMiddleware()) }
    }
}
export default connect(mapStateToprops, mapDispatchToProps)(OrderDetails)




