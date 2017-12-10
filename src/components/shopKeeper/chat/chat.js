
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
            user: null
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
        const { conId, id } = this.props.navigation.state.params;
        console.log("conersationid", conId);
        firebase.database().ref(`/conversations/${conId}`).on('value', (snap) => {
            console.log("conversationdata",snap.val());
            const messages = [];
            const res = snap.val();
            console.log('snapvalue', res)
            if (res) {
                for (let key in res) {
                    messages.push(res[key]);
                }
                // messages.reverse();
            }
            this.setState({
                messages,
                // loader: false
            });
        })

        firebase.database().ref(`/conversations/${conId}`).on('child_added', (snap) => {

            const newMessage = snap.val();
            const { user } = newMessage;
            if (user._id !== id) {
                console.log(true);
                this.setState((previousState) => ({
                    messages: GiftedChat.append(previousState.messages, [newMessage]),
                }));
            } else {
                console.log(false);
            }

        })

    }




    onSend(message) {
        console.log(message);
        const { conId } = this.props.navigation.state.params;
        console.log("conbersationId", conId);
        firebase.database().ref(`/conversations/${conId}`).push(message[0]);
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, message),
        }));
    }

    render() {
        const { user } = this.state;
        const id = firebase.auth().currentUser.uid
        // console.log("render==>", user.userId)
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