import React from 'react';

import Appbar from '../../components/Navigation/Appbar';
import Landing from '../../components/WorkoutLog/Landing';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        backgroundColor: '#41B3A3',
    },
}));

export default () => {

    const classes = useStyles();

    return (
        <Grid className={classes.container} container>

            <Appbar />

            <Landing />

        </Grid>
    );
};
