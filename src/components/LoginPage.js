import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

class LoginPage extends Component {
    static navigationOptions = {
        title: 'Account',
        headerStyle: {
            backgroundColor: '#ff6600'
        },
        headerTitleStyle: {
            color: '#fff'
        }
    }

    state = {
        action: 'login'
    }

    _handleOnChangeAction = action => {
        this.setState({
            action
        })
    }

    render() {
        const {action} = this.state

        return (
            <View style={styles.container}>
                {
                    action === 'login'
                        ? <LoginForm onAction={this._handleOnChangeAction} {...this.props}/>
                        : <RegisterForm onAction={this._handleOnChangeAction} {...this.props}/>

                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        width: '100%',
        height: '100%',
    }
})

export default createStackNavigator({
    Login: {
        screen: LoginPage
    }
})