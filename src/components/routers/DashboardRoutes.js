import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Navbar } from '../ui/Navbar'
import { Home } from '../Home'
import { Device } from '../device/Device'
import { DeviceList } from '../device/DeviceList'
import { Alert } from '../alert/Alert'
import { AlertList } from '../alert/AlertList'

import '../../styles/content.css';

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="content">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/devices" component={Device} />
                    <Route exact path="/devicelist" component={DeviceList} />
                    <Route exact path="/alerts" component={Alert} />
                    <Route exact path="/alertlist" component={AlertList} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </>
    )
}
