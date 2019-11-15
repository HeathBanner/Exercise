import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        height: '100vh',
        backgroundColor: 'rgb(204, 160, 41)',
    },
    divider: {
        marginBlockStart: '0.5em',
        width: '60%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
    },
}));

export default () => {

    const classes = useStyles();

    return (
        <Grid
            className={classes.container}
            item
            xs={12}
        >

            <Typography
                style={{ width: '100%' }}
                variant="h4"
                align="center"
            >
                Get Motivated!
            </Typography>

            <Divider className={classes.divider} />

            <Typography
                style={{ width: '100%' }}
                variant="h6"
                align="center"
            >
                Add random motivational quote
            </Typography>

        </Grid>
    );
};
