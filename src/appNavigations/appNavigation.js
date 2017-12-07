import React from 'react';
import { ScrollView } from "react-native";
import { StackNavigator, DrawerItems, DrawerNavigator } from "react-navigation";
import {
    ShopKeeperSignup, ShopKeeperLogin, SupplierSignup, SupplierLogin,
    ShopekeeperDashBoard, SupplierDashBoard, ShopKeeperOrder, OrderList,
    OrderDetails, SupplierList, SupplierDetails
}
    from '../components';
import Home from '../../App';

const ShopKeeperdrawNavigator = DrawerNavigator(
    {
        DashBoard: { screen: ShopekeeperDashBoard },
        Logout: { screen: ShopKeeperLogin },
        Order: { screen: ShopKeeperOrder },
        suppliers: { screen: SupplierList },

    },
    {
        contentComponent: props => {
            return (
                <ScrollView>
                    <DrawerItems {...props} key={props} style={{ color: 'red' }} />
                </ScrollView>
            );
        },
        contentOptions: {
            drawerWidth: '50px',
            activeTintColor: "#339cc9",
            style: {
                flex: 1,
                paddingTop: 15,
            }
        }
    }
);
ShopKeeperdrawNavigator.navigationOptions = {
    header: null
};
const SupplierDrawNavigator = DrawerNavigator(
    {
        //   MyProfile: { screen: Profile },

        DashBoard: { screen: SupplierDashBoard },
        Logout: { screen: SupplierLogin },
        // Order: { screen: ShopKeeperOrder },
    },
    {
        contentComponent: props => {
            return (
                <ScrollView>
                    <DrawerItems {...props} key={props} />
                </ScrollView>
            );
        },
        contentOptions: {
            drawerWidth: '50px',
            activeTintColor: "#339cc9",
            style: {
                flex: 1,
                paddingTop: 15,
                color: '#339cc9'
            }
        }
    }
);

SupplierDrawNavigator.navigationOptions = {
    header: null
};



const navigation = StackNavigator(
    {
        ShopKeeperSignupScreen: { screen: ShopKeeperSignup },
        ShopKeeperLoginScreen: { screen: ShopKeeperLogin },
        ShopKeeperDashBoardScreen: { screen: ShopKeeperdrawNavigator },
        SupplierDetailsScreen: { screen: SupplierDetails },

        SupplierSignupScreen: { screen: SupplierSignup },
        SupplierLoginScreen: { screen: SupplierLogin },
        SupplierDashBoardScreen: { screen: SupplierDrawNavigator },
        orderListScreen: { screen: OrderList },
        OrderDetailsScreen: { screen: OrderDetails },
        HomeScreen: { screen: Home },
    },
    {
        headerMode: "screen",
        initialRouteName: "HomeScreen"
    }
);

export default navigation;