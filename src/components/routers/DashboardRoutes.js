import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Navbar } from '../ui/Navbar'

import '../../styles/content.css';

import { Home } from '../Home'
import { Device } from '../device/Device'
import { DeviceList } from '../device/DeviceList'
import { Alert } from '../alert/Alert'
import { AlertList } from '../alert/AlertList'

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            {/* className="container mt-4" */}
            <div className="content">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/devices" component={Device} />
                    <Route exact path="/devicelist" component={DeviceList} />
                    <Route exact path="/alerts" component={Alert} />
                    <Route exact path="/alertlist" component={AlertList} />
                    {/* <Route exact path="/hero/:heroId" component={HeroScreen} />
                    <Route exact path="/search" component={SearchScreen} /> */}
                    <Redirect to="/" />
                </Switch>
            </div>
        </>
    )
}
