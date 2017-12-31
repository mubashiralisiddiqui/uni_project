import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import OrderIcon from 'react-native-vector-icons/EvilIcons';
import LoginIcon from 'react-native-vector-icons/SimpleLineIcons';
import SupplierIcon from 'react-native-vector-icons/FontAwesome';
import NotificationIcon from 'react-native-vector-icons/MaterialIcons';
import ShopIcon from 'react-native-vector-icons/Entypo';
import { logout } from '../store/middleware/authMiddleWare'
import { connect } from 'react-redux';

class SupplierDrawerContainer extends React.Component {
    constructor(props) {
        super(props)
        this.logoutm = this.logoutm.bind(this)
    }
    // logout = () => {
    //     // This will reset back to loginStack
    //     // https://github.com/react-community/react-navigation/issues/1127
    //     console.log('helloooooo', this.props.navigation.dispatch(logout))
    //     const actionToDispatch = NavigationActions.reset({
    //         index: 0,
    //         key: null,  // black magic
    //         actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
    //     })
    //     this.props.navigation.dispatch(logout)

    // }
    logoutm() {
        const { navigate } = this.props.navigation

        this.props.logout(navigate)
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#659EC7', paddingLeft: 20 }}>
                    <Icon name="menu" color="white" />
                    <Text

                        style={styles.menuheader}
                    >
                        Menu
                </Text>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                    <Icon name="home" color="#659EC7" />
                    <Text
                        onPress={() => navigation.navigate('SupplierDashBoardScreen')}
                        style={styles.uglyDrawerItem}>
                        HOME
                </Text>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                    <NotificationIcon color="#659EC7" name="notifications" size={30} style={{ marginTop: 15 }} />
                    <Text
                        onPress={() => navigation.navigate('orderListScreen')}
                        style={styles.uglyDrawerItem}
                    >
                        Notifications
                   </Text>
                </View>


                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                    <ShopIcon name="shop" color="#659EC7" size={30} style={{ marginTop: 15 }} />
                    <Text
                        onPress={() => navigation.navigate('shopkeepers')}
                        style={styles.uglyDrawerItem}
                    >
                        Shopkeepers
                </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                    <LoginIcon name="logout" color="#659EC7" size={30} style={{ marginTop: 15 }} />
                    <Text
                        onPress={() => this.logoutm()}
                        style={styles.uglyDrawerItem}
                    >

                        Log Out
                     </Text>
                    {/* <Button title="logout" onPress={()=>{this.logoutm()}} /> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        // paddingTop: 20,
        // paddingHorizontal: 20
    },
    uglyDrawerItem: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#659EC7',
        padding: 10,
        margin: 5,
    },
    menuheader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffff',
        padding: 10,
        margin: 5,
        marginLeft: 10
    }
})
// const mapStateToProps = (state) => {
//     return {
//         state
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         logoutdispatch: () => { dispatch(logout()) }
//     }
// }
const mapDispatchToProps = (dispatch) => {
    return {
        logout: (navigate) => { dispatch(logout(navigate)) }
    }
}
export default connect(null, mapDispatchToProps)(SupplierDrawerContainer)