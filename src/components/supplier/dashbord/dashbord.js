import React from 'react'
import ReactNative from 'react-native';
import {
    StyleSheet,
    PropTypes,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Header, Icon, SideMenu, List, ListItem, Button } from "react-native-elements";
import MapView from 'react-native-maps';
import * as firebase from 'firebase'
var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
import OneSignal from 'react-native-onesignal'
// (Initial Static Location) Mumbai
const LATITUDE = 65.9667;
const LONGITUDE = -18.5333;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            marker: [{
                latitude: LATITUDE,
                longitude: LONGITUDE,
            }],
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
        };
    }
    componentWillMount() {
        firebase.database().ref('userloc/').on('value', (data) => {
            // let obj = Object.values(data.val())

            this.setState({
                marker: Object.values(data.val()).map(a => a.region)
            })

        })
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
    }
    onOpened(openResult) {
    }

    onRegistered(notifData) {
    }

    onIds(device) {
        OneSignal.addEventListener('ids', this.onIds);
    }
    componentDidMount() {
        let currentuser = firebase.auth().currentUser.uid
        firebase.database().ref('users/' + currentuser).on('value', (data) => {
            let obj = data.val();
            this.setState({
                username: obj.name
            })
        })
        firebase.database().ref('order/').on('value', (data) => {
            let obj = data.val();
        })

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }
                });
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

        this.watchID = navigator.geolocation.watchPosition((position) => {
            const newRegion = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }

            this.onRegionChange(newRegion);
        });
        firebase.database().ref('userloc/' + currentuser).update({ region: this.state.region })
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    onRegionChange(region) {
        this.setState({ region });
    }
    static navigationOptions = {
        header: null
    }

    render() {
        const { navigate } = this.props.navigation
        console.log("markerstae in render", this.state.marker)
        return (
            <View style={styles.container}>
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
                        <Text style={{ textAlign: 'center', color: 'white' }}>
                            {this.state.username}
                        </Text>
                    }
                    //  centerComponent={{ text: "Circles " + this.state.circlenum, style: { color: "#fff" } }}
                    outerContainerStyles={{ backgroundColor: "#659EC7" }}
                />
                <MapView
                    ref="map"
                    mapType="terrain"
                    style={styles.map}
                    region={this.state.region}
                    /* onRegionChange={this.onRegionChange} */
                    showsUserLocation={true}
                    followUserLocation={true}
                >
                    {/* {this.state.marker ?
                        this.state.marker.map((v, i) => {
                            console.log("map marker", v)
                            return (
                                <MapView.Marker coordinate={v} key={i} />
                            )
                        })

                        : console.log('errororo')} */}
                         <MapView.Marker coordinate={this.state.region} />

                </MapView>

            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        marginTop: 75,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

});
