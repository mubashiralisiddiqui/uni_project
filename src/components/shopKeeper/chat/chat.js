
import React from 'react';
import { GiftedChat, Actions, Bubble, SystemMessage } from 'react-native-gifted-chat';
import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';
export default class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            text: '',
            user: null,
            key: null
        }
        this.onSend = this.onSend.bind(this)
    }

    async componentDidMount() {
        try {
            const res = await AsyncStorage.getItem('currentUser')
            const user = JSON.parse(res);
            console.log('asyncstorageuser', user)
            await firebase.database().ref(`/users/${user.userId}`).once('value', (snap) => {
                console.log("snapval", snap.val())
                this.setState({
                    user: snap.val()
                })

            })
        } catch (e) {
            console.log(e)
        }
        const { suplierId, shopKeeperID } = this.props.navigation.state.params;
        console.log("conersationid", suplierId, shopKeeperID);
        firebase.database().ref(`conversations`).orderByChild('users/' + suplierId).equalTo(true).on('value', (snap) => {
            console.log("conversationdata", snap.val());
            if (snap.val() && Object.values(snap.val()).find(a => a.users[shopKeeperID])) {
                const messages = [];
                const val = snap.val();
                const key = Object.keys(val).find(a => val[a].users[shopKeeperID]);
                const res = val[key].chats
                console.log('snapvalue', res)
                if (res) {
                    for (let key in res) {
                        messages.push(res[key]);
                    }
                    messages.reverse();
                }
                messages = messages.sort((a, b) => a.createdAt - b.createdAt).map(a => ({ ...a, createdAt: new Date(a.createdAt) }))
                this.setState({
                    messages,
                    key
                });
            } else {
                firebase.database().ref(`conversations`).push({ users: { [suplierId]: true, [shopKeeperID]: true } })
            }
        })
    }




    onSend(message) {
        if (this.state.user.name !== null) {
            console.log(this.state.user.name)
        }
        console.log(message);
        message = message.map(a => ({ ...a, createdAt: a.createdAt.getTime(), user: { name: 'M' }, }))
        const { key } = this.state;
        console.log("conbersationId", key);
        if (key) {
            firebase.database().ref(`/conversations/${key}/chats`).push(message[0]);
        }
    }

    render() {
        const { user } = this.state;
        const id = firebase.auth().currentUser.uid
        // console.log("render==>", user.userId)

        console.log("state of user", this.state.user)
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(message) => this.onSend(message)}
                user={{
                    _id: id, // sent messages should have same user._id
                }}
            />
        );
    }

}