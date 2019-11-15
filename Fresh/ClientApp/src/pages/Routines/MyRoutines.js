import React from 'react';

import { Grid } from '@material-ui/core';

import Appbar from '../../components/Navigation/Appbar';
import Landing from '../../components/Routines/Landing';

export default () => {
    return (
        <Grid container>

            <Appbar />

            <Landing />

        </Grid>
    );
};