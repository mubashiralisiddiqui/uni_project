import React from 'react'
import ReactNative from 'react-native';
import {
    StyleSheet,
    PropTypes,
    View,
    Text,
    Image,
    Dimensions,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';
import { Header, Icon, SideMenu, List, ListItem, Button } from "react-native-elements";
import MapView from 'react-native-maps';
import * as firebase from 'firebase'
var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

// (Initial Static Location) Mumbai
const LATITUDE = 65.9667;
const LONGITUDE = -18.5333;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import OneSignal from 'react-native-onesignal'
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
        };
    }
    componentDidMount() {   
        let currentuser = firebase.auth().currentUser.uid
        firebase.database().ref('users/' + currentuser).on('value', (data) => {
            console.log(data.val())
            let obj = data.val();
            this.setState({
                username: obj.name
            })
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
        return (
            <View style={styles.container}>
                {console.log("regions==>", this.state.region)}
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
                    centerComponent={{ text:this.state.username, style: { color: '#fff' } }}
                    outerContainerStyles={{ backgroundColor: "#009688" }}
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
                    <MapView.Marker draggable
                        coordinate={this.state.region}
                    // onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
                    />
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
