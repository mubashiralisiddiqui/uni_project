import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import OrderIcon from 'react-native-vector-icons/EvilIcons';
import LoginIcon from 'react-native-vector-icons/SimpleLineIcons';
import SupplierIcon from 'react-native-vector-icons/FontAwesome';
import { logout, shopkeeperSignup } from '../store/middleware/authMiddleWare'
import { connect } from 'react-redux';

class DrawerContainer extends React.Component {
    constructor(props) {
        super(props)
        this.logoutm = this.logoutm.bind(this)
    }
    logoutm() {
        const { navigate } = this.props.navigation

        this.props.logout(navigate)
    }
    static navigationOptions = {
        header: null
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
                        onPress={() => navigation.navigate('ShopKeeperDashBoardScreen')}
                        style={styles.uglyDrawerItem}>
                        HOME
                </Text>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                    <OrderIcon color="#659EC7" name="cart" size={30} style={{ marginTop: 15 }} />
                    <Text
                        onPress={() => navigation.navigate('Order')}
                        style={styles.uglyDrawerItem}
                    >
                        ORDER
                   </Text>
                </View>


                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                    <SupplierIcon name="users" color="#659EC7" size={30} style={{ marginTop: 15 }} />
                    <Text
                        onPress={() => navigation.navigate('suppliers')}
                        style={styles.uglyDrawerItem}
                    >
                        SUPPLIERS
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
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
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
const mapDispatchToProps = (dispatch) => {
    return {
        logout: (navigate) => { dispatch(logout(navigate)) }
    }
}
export default connect(null, mapDispatchToProps)(DrawerContainer)