import React from 'react';
import { View, Text, ListView, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FormLabel, FormInput, ListItem, List, Button, Icon, Header } from 'react-native-elements'
import * as firebase from 'firebase';
import { connect, } from 'react-redux';
// import { retry } from './C:/Users/Muhammad/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/async';
import OrderList from '../../supplier/orderlist/orderlist';
//  default from '../../../store/reducers/authReducers';
import OneSignal from 'react-native-onesignal';
class Order extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            items: [],
        }
    }
    componentDidMount() {
        firebase.database().ref('users/').on('value', (data => {
            console.log("users==>", data.val())
            const obj = data.val();
            const array = [];
            for (var prop in obj) {
                array.push(obj[prop])
                console.log("array=>", array)
            }
            array.map((a, i) => {
                console.log('mapdata', a.deviceId)
            })
        }))
    }
    componentWillMount() {
        console.log('willmount runnign')
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('registered', this.onRegistered);
        OneSignal.addEventListener('ids', this.onIds);
    }
    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('registered', this.onRegistered);
        OneSignal.removeEventListener('ids', this.onIds);
    }
    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onRegistered(notifData) {
        console.log("Device had been registered for push notifications!", notifData);
    }

    onIds(device) {
        console.log('Device info: ', device);
        OneSignal.addEventListener('ids', this.onIds);
    }
    addItem() {
        if (this.state.text.length < 1) {
            alert('please add some items')
        }
        else {
            let pushData = this.state.items.concat(this.state.text)
            console.log(pushData, "concat data")
            this.setState({
                items: pushData,
                Text: ' '
            })
        }
    }
    deleteItem(num) {
        console.log("key index==>", num)
        this.state.items.splice(num, 1)
        this.setState({
            items: this.state.items ? this.state.items : []
        })
    }
    send() {
        console.log("send")
        let data = "hellomvhvhvhg" // some array as payload
        let contents = {
            'en': 'You got notification from user'
        }
        playerId = "f5fc8ab9-a13b-4e5a-b4ae-a0fed6a5af7a"
        OneSignal.postNotification(contents, data, playerId);
    }
    submitItem() {
        const userid = firebase.auth().currentUser.uid;
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let fullDate = `${day}/${month}/${year}`
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let sec = date.getSeconds();
        let fullTime = `${hours}:${minutes}:${sec}`
        let obj = {
            items: this.state.items,
            sk_info: this.props.userdetail,
            date: fullDate,
            time: fullTime
        }
        firebase.database().ref('order/' + userid).push(obj)
            .then(() => {
                alert('your request have been submitted successfully')
                let data = { abc: 'hello hy' } // some array as payload
                let contents = {
                    'en': 'You got notification from user'
                }
                let url = "https://documentation.onesignal.com/reference#section-attachments"
                playerId = "3bb383e7-f333-47a8-8f1e-bf8c73fb2d20"
                OneSignal.postNotification(contents, data, playerId);
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
                        <Text style={{ textAlign: 'center', color: 'white' }}>
                            {/* {this.state.username} */}
                        </Text>
                    }
                    //  centerComponent={{ text: "Circles " + this.state.circlenum, style: { color: "#fff" } }}
                    outerContainerStyles={{ backgroundColor: "#009688" }}
                />
                <View style={styles.form}>
                    <FormLabel>Add your Items</FormLabel>
                    <FormInput
                        onChangeText={text => this.setState({ text })}
                    />
                    <Button title="Add"
                        onPress={() => this.addItem()} icon={{ name: "add" }}
                        buttonStyle={{ backgroundColor: '#0097A7' }}
                    />
                </View>
                <ScrollView>
                    <List>
                        {this.state.items.map((l, i) => {
                            console.log("list item", l)
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
                <Button title='submit' buttonStyle={styles.button} onPress={() => this.submitItem()} />
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
        // flex: 1,
        // flexDirection: 'column'
    },
    button: {
        justifyContent: 'space-around',
        borderRadius: 10,
        backgroundColor: '#0097A7',
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
        deviceID: state.deviceIDReducer.deviceID
    }
}
export default connect(mapStateToProps, null)(Order)