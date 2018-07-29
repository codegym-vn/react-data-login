import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import LoginForm from "./LoginForm"

class LoginPage extends Component {
    static navigationOptions = {
        title: 'News',
        headerStyle: {
            backgroundColor: '#ff6600'
        },
        headerTitleStyle: {
            color: '#fff'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <LoginForm {...this.props}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
    }
})

export default createStackNavigator({
    Login: {
        screen: LoginPage
    }
})