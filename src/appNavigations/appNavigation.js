
import React from 'react';
import { ScrollView, Text } from "react-native";
import ShopkeeperDrawerContent from './drawerContent'
import SupplierDrawerContent from './supplierDrawerContent'
import { StackNavigator, DrawerItems, DrawerNavigator, DrawerView } from "react-navigation";
import {
  ShopKeeperSignup, ShopKeeperLogin, SupplierSignup, SupplierLogin,
  ShopekeeperDashBoard, SupplierDashBoard, ShopKeeperOrder, OrderList,
  OrderDetails, SupplierList, SupplierDetails, Chat, ShopkeepersList, ShopkeeperDetails
}
  from '../components';
import Home from '../../App';
import { supplierLogin } from '../store/middleware/authMiddleWare';



const SupplierDrawerStack = DrawerNavigator({
  DashBoard: { screen: SupplierDashBoard },
  orderListScreen: { screen: OrderList },
  shopkeepers: { screen: ShopkeepersList },
 
  Logout: { screen: SupplierLogin },
 
},
  {
    gesturesEnabled: false,
    contentComponent: SupplierDrawerContent
  },

)

const ShopkeeperDrawerStack = DrawerNavigator({
  DashBoard: { screen: ShopekeeperDashBoard },
  suppliers: { screen: SupplierList },
  Order: { screen: ShopKeeperOrder },
  Logout: { screen: ShopKeeperLogin },
},

  {
    gesturesEnabled: false,
    contentComponent: ShopkeeperDrawerContent
  },

)

const ShopkeeperDrawerNavigation = StackNavigator({
  DrawerStack: { screen: ShopkeeperDrawerStack },
  SupplierDetailsScreen: { screen: SupplierDetails },

  chatScreen: { screen: Chat },

}, {
    headerMode: 'none',
    navigationOptions: {
      // header: null
      
    },

  })
const SupplierDrawerNavigation = StackNavigator({
  DrawerStack: { screen: SupplierDrawerStack },
  ShopkeeperDetailsScreen: { screen: ShopkeeperDetails },
  OrderDetailsScreen: { screen: OrderDetails },
  chatScreen: { screen: Chat },
}, {
    headerMode: 'none',
    navigationOptions: {
      // header: null
    }
  })

const PrimaryStack = StackNavigator({
  ShopKeeperSignupScreen: { screen: ShopKeeperSignup },
  ShopKeeperLoginScreen: { screen: ShopKeeperLogin },
  SupplierLoginScreen: { screen: SupplierLogin },
  SupplierSignupScreen: { screen: SupplierSignup },
  HomeScreen: { screen: Home },
  ShopKeeperDashBoardScreen: { screen: ShopkeeperDrawerNavigation },
  SupplierDashBoardScreen: { screen: SupplierDrawerNavigation }
}, {
    headerMode: 'float',
    navigationOptions: {
      // header: null
    },
    initialRouteName: 'HomeScreen',
  })


export default PrimaryStack;



















