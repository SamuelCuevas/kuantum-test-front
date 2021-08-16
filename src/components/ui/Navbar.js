import React from 'react'
import { NavLink } from 'react-router-dom';

import '../../styles/navStyle.css';

export const Navbar = () => {
    return (
        <div className="sidebar">
            <div className="logo_content">
                <div className="logo">
                    <i className='bx bxl-kickstarter'></i>
                    <div className="logo_name">Kuantum Test</div>
                </div>
            </div>
            <ul className="nav_list">
                <li>
                    <NavLink 
                        activeClassName="active"
                        className="navlink" 
                        exact
                        to="/"
                    >
                        <i className='bx bx-grid-alt'></i>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        activeClassName="active"
                        className="navlink" 
                        exact
                        to="/devices"
                    >
                        <i className='bx bx-devices' ></i>
                        Devices
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        activeClassName="active"
                        className="navlink" 
                        exact
                        to="/devicelist"
                    >
                        <i className='bx bx-list-ul' ></i>
                        Device List
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        activeClassName="active"
                        className="navlink" 
                        exact
                        to="/alerts"
                    >
                        <i className='bx bxs-bell'></i>
                        Alerts
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        activeClassName="active"
                        className="navlink" 
                        exact
                        to="/alertlist"
                    >
                        <i className='bx bx-list-ul' ></i>
                        Alert List
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
