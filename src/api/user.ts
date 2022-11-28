import instance from './config'

export const getUsers = async () => {
    return await instance.get('/users')
}