import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
}));

export default () => {

    const classes = useStyles();

    return (
        <Grid className={classes.container} item xs={12}>

            <Typography>Progress</Typography>

        </Grid>
    );
};
