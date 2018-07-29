import React, {Component} from 'react'
import {View, TextInput, Button, Alert, StyleSheet} from 'react-native'
import {login} from "../services/AuthServices"

class LoginForm extends Component {
    state = {
        username: '',
        password: ''
    }

    _handleTextInputChange = (field) => (value) => {
        this.setState({
            [field]: value
        })
    }

    _handlePressLogin = () => {
        const {username, password} = this.state

        if (!username) return Alert.alert('Please enter your username')
        if (!password) return Alert.alert('Please enter your password')

        login({username, password})
            .then(user => {
                this.navigation.navigate('Home')
            })
            .catch(error => {
                const {message} = error

                Alert.alert(message)
            })
    }

    render() {
        const {username, password} = this.state

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Username'
                        value={username}
                        onChangeText={this._handleTextInputChange('username')}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        value={password}
                        onChangeText={this._handleTextInputChange('password')}
                        secureTextEntry/>

                    <Button
                        style={styles.button}
                        title='Login' onPress={this._handlePressLogin}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#eee',
    },

    form: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#999',
        padding: 10,
        marginBottom: 20,
        minWidth: 200,
        textAlign: 'center'
    },

    button: {}
})

export default LoginForm