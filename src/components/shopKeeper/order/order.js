import React from 'react';
import { View, Text, ListView, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FormLabel, FormInput, ListItem, List, Button, Icon, Header } from 'react-native-elements'
import * as firebase from 'firebase';
import { connect, } from 'react-redux';
import OrderList from '../../supplier/orderlist/orderlist';
import OneSignal from 'react-native-onesignal';
import { NavigationActions } from 'react-navigation'
import LoginIcon from 'react-native-vector-icons/EvilIcons';
const navigateAction = NavigationActions.navigate({

    routeName: 'OrderDetailsScreen',
    params: {},
    action: NavigationActions.navigate({ routeName: 'OrderDetailsScreen' })
})
class Order extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            items: [],
            data: []
        }
    }
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        firebase.database().ref('users/').on('value', (data => {
            const obj = data.val();
            const array = [];
            for (var prop in obj) {
                if (obj[prop].role === "supplier") {
                    array.push(obj[prop])
                }
            }
            this.setState({ data: array })
        }))
    }
    addItem() {
        if (this.state.text.length < 1) {
            alert('please add some items')
        }
        else {
            let pushData = this.state.items.concat(this.state.text)
            this.setState({
                items: pushData,
                Text: ' '
            })
        }
    }
    deleteItem(num) {
        this.state.items.splice(num, 1)
        this.setState({
            items: this.state.items ? this.state.items : []
        })
    }
    routechange() {
        alert('routechange')
        const { navigate } = this.props.navigation;
        navigate('ShopKeeperDashBoardScreen')
    }
    submitItem() {
        const userid = firebase.auth().currentUser.uid;
        let date = new Date();
        var options = {
            weekday: "short", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        let mydate = date.toLocaleTimeString("en-us", options)
        let obj = {
            items: this.state.items,
            sk_info: this.props.userdetail,
            date: mydate,
            shopkeeper: userid
        }
        firebase.database().ref('sh_orders/').push(obj)
            .then(() => {
                alert('your request have been submitted successfully')
                let data = { abc: 'hello hy' } // some array as payload
                this.state.data.map((a, i) => {
                    let data = { abc: 'hello hy' } // some array as payload
                    let uname = this.props.userdetail.name
                    let contents = {
                        'en': 'You got notification from ' + uname + ''
                    }
                    playerId = a.deviceId
                    OneSignal.postNotification(contents, data, playerId);
                })
            })
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container} >
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
                        <Icon name='home' color="white" onPress={() => navigate('ShopKeeperDashBoardScreen')} />
                    }
                    centerComponent={
                        <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Times New Roman', fontWeight: 'bold' }}>
                            Give Your Order
                        </Text>
                    }
                    outerContainerStyles={{ backgroundColor: '#659EC7' }}
                />
                <View style={styles.form}>
                    <FormLabel>Add your Items</FormLabel>
                    <FormInput
                        onChangeText={text => this.setState({ text })}
                    />
                    <Button title="Add"
                        onPress={() => this.addItem()} icon={{ name: "add" }}
                        buttonStyle={{ backgroundColor: '#659EC7', borderRadius: 10 }}
                        textStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold' }}
                    />
                </View>
                <ScrollView>
                    <List>
                        {this.state.items.map((l, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    title={l}
                                    rightIcon={<Icon name="delete" onPress={() => this.deleteItem(i)} color='#FF2323' />}
                                />
                            )
                        })}
                    </List>
                </ScrollView>
                <Button title='submit'
                    buttonStyle={styles.button}
                    onPress={() => this.submitItem()}
                    textStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold' }}
                />
            </View>
        )
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        marginTop: 80,
    },
    button: {
        justifyContent: 'space-around',
        borderRadius: 10,
        backgroundColor: '#659EC7',
        marginBottom: 5
    },
    instructions: {
        color: '#333333',
        fontSize: 19,
        marginBottom: 5,
    },
});
const mapStateToProps = (state) => {
    return {
        userdetail: state.sk_detailReducer.sk_detail,
        deviceID: state.deviceIDReducer.deviceID,
        AlldeviceID: state.deviceIDReducer.AlluserIDs
    }
}
export default connect(mapStateToProps, null)(Order)