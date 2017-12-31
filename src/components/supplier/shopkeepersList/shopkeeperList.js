import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Button, List, ListItem, Icon, Header } from 'react-native-elements';
import * as firebase from 'firebase';

export default class ShopkeepersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        }

    }
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        firebase.database().ref('users/').on('value', snapshot => {
            let obj = snapshot.val();
            let array = [];
            for (var prop in obj) {
                if (obj[prop].role === "shopkeeper") {
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
                        <Icon name='home' color="white" onPress={()=>navigate('SupplierDashBoardScreen')}/>
                    }
                    centerComponent={{ text: "All Shopkeepers ", style: { color: "#fff" } }}
                    outerContainerStyles={{ backgroundColor: "#659EC7" }}
                />
                <ScrollView style={{ marginTop: 50 }}>
                    <List>
                        {this.state.orderList.map((l, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    title={l.name + "  " + l.role}
                                    onPress={() => { navigate('ShopkeeperDetailsScreen', { key: i ,data:l}) }}
                                />
                            )
                        })}
                    </List>
                </ScrollView>
            </View>
        )
    }
}