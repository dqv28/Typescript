import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'
import PopupLogout from '../layouts/PopupLogout'
import Sidebar from '../layouts/Sidebar'

type Props = {}

const LayoutAdmin = (props: Props) => {
    return (
        <div>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Header />
                        <div className="container-fluid">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

            <PopupLogout />
        </div>
    )
}

export default LayoutAdmin