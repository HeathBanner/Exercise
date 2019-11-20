import React from 'react';

import Appbar from '../../components/Navigation/Appbar';
import Landing from '../../components/Progress/Landing';

import { Grid } from '@material-ui/core';

export default () => {

    return (
        <Grid
            style={{ backgroundColor: '#85DCB' }}
            container
        >

            <Appbar />

            <Landing />

        </Grid>
    );
};
