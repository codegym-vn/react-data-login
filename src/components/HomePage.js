import React, {Component} from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import {
    getCurrentUser,
    isAuthenticated,
    logout,
    subscribeAuthentication,
    unsubscribeAuthentication
} from "../services/AuthServices"

class HomePage extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#ff6600'
        },
        headerTitleStyle: {
            color: '#fff'
        }
    }

    state = {
        isAuth: isAuthenticated(),
        user: getCurrentUser()
    }

    componentDidMount() {
        subscribeAuthentication(this._handleAuthChange)
    }

    componentWillUnmount() {
        unsubscribeAuthentication(this._handleAuthChange)
    }

    _handleAuthChange = () => {
        this.setState({
            isAuth: isAuthenticated(),
            user: getCurrentUser()
        })
    }

    _handlePressLogout = () => {
        logout()

        this.props.navigation.navigate('Login')
    }

    render() {
        const {user, isAuth} = this.state
        const name = user.name || 'Guest'

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Hello {name}</Text>

                {
                    isAuth &&
                    <Button color='#999' title='Logout' onPress={this._handlePressLogout}/>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    welcome: {
        fontSize: 20,
        marginBottom: 20
    }
})

export default createStackNavigator({
    Home: {
        screen: HomePage
    }
})