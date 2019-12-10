import React from 'react';

import Appbar from '../../components/Navigation/Appbar';
import Landing from '../../components/Goal/Landing';

import { Grid } from '@material-ui/core';

export default () => {

    return (
        <Grid style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundColor: '#41B3A3',
        }} container>
            <Appbar />

            <Landing />
        </Grid>
    );
};
