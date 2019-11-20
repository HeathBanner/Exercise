import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './pages/Home/Home';
import Routines from './pages/Routines/Routines';
import MyRoutines from './pages/Routines/MyRoutines';
import EditWorkout from './pages/MyRoutines/EditWorkout';
import Log from './pages/WorkoutLog/Log';
import Progress from './pages/Progress/Progress';

import './custom.css'

export default () => {

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/routines" component={Routines} />
            <Route exact path="/myroutines" component={MyRoutines} />
            <Route path="/myroutines/:routine" component={EditWorkout} />
            <Route path="/workoutlog" component={Log} />
            <Route path="/progress" component={Progress} />
        </Switch>
    );
};
