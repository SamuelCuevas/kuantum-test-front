import React from 'react';
import {
    BrowserRouter as Router,
    Switch
  } from "react-router-dom";
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {

    return (
        <Router>
            <div>
                <Switch>
                    <DashboardRoutes />
                </Switch>
            </div>
        </Router>
    )
}
