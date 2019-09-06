import React from 'react';
import {Switch, Route} from 'react-router-dom';

// Components
import Home from '../components/home/home';
import Dashboard from '../components/dashboard/dashboard';

// Router
export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
    </Switch>
);