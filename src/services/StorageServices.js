import {AsyncStorage} from 'react-native'

const _getKey = (key) => `cg@users:${key}`

export const getUserByUserName = username => {
    if (!username) {
        return Promise.reject(new Error('Username is empty'))
    }

    const key = _getKey(username)

    return AsyncStorage.getItem(key)
        .then(str => {
            if (!str) {
                throw new Error('User not found')
            }

            try {
                return JSON.parse(str)
            } catch (error) {
                //Remove data is broken
                AsyncStorage.removeItem(key)

                throw error
            }
        })
        .catch(error => {
            return Promise.resolve(false)
        })
}

export const createNewUser = ({username, name, password}) => {
    return getUserByUserName(username)
        .then(user => {
            if (user) {
                throw new Error('The user already exists')
            }

            const newUser = {username, name, password}
            const key = _getKey(username)

            return AsyncStorage.setItem(key, JSON.stringify(newUser))
        })
}
