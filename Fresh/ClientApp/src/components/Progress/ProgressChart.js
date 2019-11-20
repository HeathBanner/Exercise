import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Typography,
    CircularProgress,
    Icon,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        padding: '10%'
    },
    goalHeader: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
    },
    goalContainer: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    circleNum: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        padding: '10%',
        marginBottom: 30,
    },
    gainsHeader: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 20,
    },
}));

export default () => {

    const classes = useStyles();

    return (
        <div className={classes.container}>

            <Typography
                className={classes.goalHeader}
                variant="h6"
            >
                Goal
            </Typography>

            <div className={classes.goalContainer}>
                <CircularProgress
                    variant="static"
                    color="secondary"
                    value={75}
                    size={100}
                />

                <Typography
                    variant="h6"
                    className={classes.circleNum}
                >
                    75%
                </Typography>
            </div>


            <Paper className={classes.paper}>
                <Typography
                    className={classes.gainsHeader}
                    variant="h6"
                >
                    Gains
                </Typography>

                <Typography>
                    Bench Press: +5 Reps
                </Typography>

                <Icon
                    style={{ color: 'green' }}
                >
                    trending_up
                </Icon>
            </Paper>

            <Paper className={classes.paper}>
                <Typography
                    className={classes.gainsHeader}
                    variant="h6"
                >
                    Losses
                </Typography>

                <Typography>
                     Pull Ups: -2 Reps
                </Typography>

                <Icon
                    style={{ color: 'red' }}
                >
                    trending_down
                </Icon>
            </Paper>

        </div>
    );
};
