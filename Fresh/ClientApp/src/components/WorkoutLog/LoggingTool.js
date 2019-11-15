import React from 'react';

import Logger from './Logger';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        padding: '10%',
    },
    routineHeader: {
        marginBottom: 30,
        width: '100%',
        textAlign: 'center',
    },
}));

export default (props) => {

    const classes = useStyles();

    return (
        <Paper className={classes.paper} >

            <Typography className={classes.routineHeader} >
                {props.routine.title}
            </Typography>

            {props.routine.exercise.map((item) => {
                return <Logger routine={item} />
            })}

        </Paper>
    );
};