import React from 'react';
import { ScrollView } from "react-native";
import { StackNavigator, DrawerItems, DrawerNavigator } from "react-navigation";
import {
    ShopKeeperSignup, ShopKeeperLogin, SupplierSignup, SupplierLogin,
    ShopekeeperDashBoard, SupplierDashBoard, ShopKeeperOrder, OrderList
}
    from '../components';
import Home from '../../App';

const ShopKeeperdrawNavigator = DrawerNavigator(
    {
        //   MyProfile: { screen: Profile },

        DashBoard: { screen: ShopekeeperDashBoard },
        Logout: { screen: ShopKeeperLogin },
        Order: { screen: ShopKeeperOrder },
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
            activeTintColor: "black",
            style: {
                flex: 1,
                paddingTop: 15
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
            activeTintColor: "black",
            style: {
                flex: 1,
                paddingTop: 15
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


        SupplierSignupScreen: { screen: SupplierSignup },
        SupplierLoginScreen: { screen: SupplierLogin },
        SupplierDashBoardScreen: { screen: SupplierDrawNavigator },
        orderListScreen: { screen: OrderList },
        HomeScreen: { screen: Home },

        // EventDetail: { screen: EventDetail },
        // AddEvent: { screen: AddEvent },
        // Profile: { screen: Profile },
        // SupplierDashBoardScreen: { screen: drawNavigator }
    },
    {
        headerMode: "screen",
        initialRouteName: "HomeScreen"
    }
);

export default navigation;