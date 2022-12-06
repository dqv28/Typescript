import { IUser } from '../interfaces/user'
import instance from './config'

export const register = (user: IUser) => {
    return instance.post('/signup', user)
}

export const login = (user: IUser) => {
    return instance.post('/signin', user)
}

export const getUsersApi = async () => {
    return await instance.get('/users')
}