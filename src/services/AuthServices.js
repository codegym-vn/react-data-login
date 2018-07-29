import {createNewUser, getUserByUserName} from "./StorageServices"
import md5 from 'md5'

const _hashPassword = password => {
    return Promise.resolve(md5(password))
}

const _verifyPassword = (password, hash) => {
    const hashed = md5(password)

    return Promise.resolve(hashed === hash)
}

export const register = ({username, password, name}) => {
    if (!password || password.length < 6) {
        return Promise.reject(new Error('Your password is too short'))
    }

    return _hashPassword(password)
        .then(hash => {
            const user = {username, password: hash, name}

            return createNewUser(user)
        })
}

export const login = ({username, password}) => {
    if (!username) {
        return Promise.reject(new Error('Please enter your username!'))
    }

    return getUserByUserName(username)
        .then(user => {
            if (!user) {
                throw new Error('User is not exits')
            }

            const passwordHashed = user.password || '';

            return _verifyPassword(password, passwordHashed)
                .then(success => {
                    if (!success) {
                        throw new Error('Your password is wrong')
                    }

                    delete user.password

                    return user
                })
        })
}

const _store = {
    isAuthenticated: false,
    user: {}
}

export const isAuthenticated = () => _store.isAuthenticated

export const getCurrentUser = () => _store.user