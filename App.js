import React from 'react'
import {createBottomTabNavigator} from 'react-navigation'
import HomePage from "./src/components/HomePage"
import LoginPage from "./src/components/LoginPage"
import Ionicons from 'react-native-vector-icons/Ionicons'

const iconMap = {
    Home: 'ios-home',
    Login: 'ios-contact'
}

export default createBottomTabNavigator(
    {
        Login: LoginPage,
        Home: HomePage
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state
                const iconName = iconMap[routeName] || 'ios-information'

                return <Ionicons name={iconName} size={25} color={tintColor}/>;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
)