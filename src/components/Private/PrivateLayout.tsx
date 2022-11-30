import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hook'

type LayoutPrivateProps = {
    children: React.ReactElement
}

const PrivateLayout = ({ children }: LayoutPrivateProps) => {
    const isLogin = useAppSelector((state) => state.auth.isLogin)
    if (!isLogin) return <Navigate to={'/login'} />
    return children
}

export default PrivateLayout