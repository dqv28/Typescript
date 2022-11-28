import React from 'react'
import { Link, NavLink } from 'react-router-dom'

type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar - Brand */}
                <NavLink to={'/'}>
                    <a className="sidebar-brand d-flex align-items-center justify-content-center">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-user" />
                        </div>
                        <div className="sidebar-brand-text mx-3">Admin</div>
                    </a>
                </NavLink>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />
                {/* Nav Item - Dashboard */}
                <li className="nav-item active">
                    <NavLink to={'/admin'}>
                        <a className="nav-link">
                            <i className="fas fa-fw fa-tachometer-alt" />
                            <span>
                                Dashboard
                            </span>
                        </a>
                    </NavLink>
                </li>
                <li className="nav-item active">
                    <NavLink to={'/admin/products'}>
                        <a className="nav-link">
                            <i className="fas fa-fw fa-table" />
                            <span>
                                Products
                            </span>
                        </a>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar