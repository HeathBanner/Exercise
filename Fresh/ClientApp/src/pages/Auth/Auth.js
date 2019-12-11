import React from 'react';

import Appbar from '../../components/Navigation/Appbar';
import Landing from '../../components/Auth/Landing';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        alignContents: 'center',
        justifyContent: 'cneter',
        flexWrap: 'wrap',
        height: '100vh',
        backgroundColor: '#41B3A3'
    }
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
