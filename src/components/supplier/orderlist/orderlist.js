import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, List, ListItem, Icon, Header, } from 'react-native-elements';
import * as firebase from 'firebase';

export default class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        }
    }
    componentDidMount() {
        firebase.database().ref('sh_orders/').on('value', snapshot => {
            let data = snapshot.val()
            this.setState({
                orderList: Object.values(snapshot.val())
            })
        })
    }
    static navigationOptions = {
        header: null
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
                        <Icon name='home' color="white" onPress={() => navigate('SupplierDashBoardScreen')} />
                    }
                    centerComponent={
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
                            Orders & notifications
                        </Text>
                    }
                    outerContainerStyles={{ backgroundColor: "#659EC7" }}
                />
                <ScrollView style={{ marginTop: 50 }}>
                    <List>
                        {this.state.orderList.map((l, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    title={"order by " + l.sk_info.name}
                                    subtitle={"On " + l.date}
                                    onPress={() => { navigate('OrderDetailsScreen', { key: i, data: l }) }}
                                />
                            )
                        })}
                    </List>
                </ScrollView>

            </View>
        )
    }
}