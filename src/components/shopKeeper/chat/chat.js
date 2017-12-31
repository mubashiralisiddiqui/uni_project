
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
            await firebase.database().ref(`/users/${user.userId}`).once('value', (snap) => {
             
                this.setState({
                    user: snap.val()
                })

            })
        } catch (e) {
            console.log(e)
        }
        const { suplierId, shopKeeperID } = this.props.navigation.state.params;
        firebase.database().ref(`conversations`).orderByChild('users/' + suplierId).equalTo(true).on('value', (snap) => {
            if (snap.val() && Object.values(snap.val()).find(a => a.users[shopKeeperID])) {
                const messages = [];
                const val = snap.val();
                const key = Object.keys(val).find(a => val[a].users[shopKeeperID]);
                const res = val[key].chats
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
        let uname;
        if (this.state.user.name !== null) {
            uname = this.state.user.name.slice(0, 2)
        }
     
        message =  message.map(a => ({ ...a, createdAt: a.createdAt.getTime(), user: { name: uname }, }))
        const { key } = this.state;
     
        if (key) {
            firebase.database().ref(`/conversations/${key}/chats`).push(message[0]);
        }
    }

    render() {
        const { user } = this.state;
        const id = firebase.auth().currentUser.uid
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