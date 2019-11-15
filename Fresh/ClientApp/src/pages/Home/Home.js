import React from 'react';

import { Grid } from '@material-ui/core';

import Appbar from '../../components/Navigation/Appbar';
import Landing from '../../components/Home/Landing';
import RoutineInfo from '../../components/Home/RoutineInfo';

export default () => {

    return (
        <Grid container>

            <Appbar />

            <Landing />

            <RoutineInfo />

        </Grid>
    );
};
