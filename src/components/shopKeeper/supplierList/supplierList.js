import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Button, List, ListItem, Icon, Header } from 'react-native-elements';
import * as firebase from 'firebase';

export default class SupplierList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        }

    }
    componentDidMount() {
        firebase.database().ref('users/').on('value', snapshot => {
            let obj = snapshot.val();
            let array = [];

            for (var prop in obj) {
                console.log("props offonrin", obj[prop].role)
                if (obj[prop].role === "supplier") {
                    array.push(obj[prop])
                }

            }
            // console.log("array======>", array)
            this.setState({
                orderList: array
            })
            // snapshot.forEach((messageSnapshot) => {
            //     let array = [];
            //     let obj = messageSnapshot.val();
            //     console.log("foreach array", obj)
            //     array.push(obj)
            //     // for (var prop in obj) {

            //     //     array.push(obj[prop]);
            //     //     console.log('array==>', array)
            //     //     this.setState({
            //     //         orderList: array
            //     //     })
            //     // }
            //     // // array.push(obj)
            //     console.log('message snapshot==>', array)
            //     this.setState({
            //         orderList: array
            //     })
            // })
        })
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Header
                    leftComponent={
                        <Icon
                            name="menu"
                            color="white"
                            onPress={() => {
                                navigate("DrawerOpen");
                            }}
                        />
                    }
                    rightComponent={
                        <Icon name='home' color="white" />
                    }

                    centerComponent={{ text: "All suppliers ", style: { color: "#fff" } }}
                    outerContainerStyles={{ backgroundColor: "#009688" }}
                />
                {/* {console.log(this.state.orderList, "state of list")} */}
                <ScrollView style={{ marginTop: 50 }}>
                    <List>

                        {this.state.orderList.map((l, i) => {
                            console.log("list item", l)
                            return (
                                <ListItem
                                    key={i}
                                    title={l.name + "  " + l.role}
                                    onPress={() => { navigate('SupplierDetailsScreen', { key: i }) }}
                                />
                            )
                        })}
                    </List>
                </ScrollView>

            </View>
        )
    }
}