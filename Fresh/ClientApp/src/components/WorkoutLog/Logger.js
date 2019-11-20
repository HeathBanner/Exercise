import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    TextField,
    Typography,
    Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    exerciseHeader: {
        width: '100%',
        textAlign: 'center',
    },
    inputHeaders: {
        marginBottom: 10,
        width: '100%',
        textAlign: 'center',
    },
    dividers: {
        marginBottom: 20,
        marginBlockStart: '0.5em',
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
        width: '60%',
    },
    inputs: {
        marginBottom: 20,
    },
}));

export default (props) => {

    const classes = useStyles();

    const handleChange = (type) => event => {
        let value = event.target.value;

        if (isNaN(value)) { return; }
        if (value) { value = parseInt(value); }
        if (type === 'reps') {
            return props.handleChange('reps', value, props.index);
        }

        return props.handleChange('length', value, props.index);
    };

    return (
        <>
            <Typography
                className={classes.exerciseHeader}
                color="primary"
            >
                {props.routine.title}
            </Typography>

            <Divider className={classes.dividers} />
            
            <Typography className={classes.inputHeaders} >
                Reps In Total
            </Typography>
            <TextField
                className={classes.inputs}
                value={props.routine.reps}
                onChange={handleChange('reps')}
                label="Total"
                variant="outlined"
            />

            <Typography className={classes.inputHeaders} >
                Length X Minutes
            </Typography>
            <TextField
                className={classes.inputs}
                value={props.routine.length}
                onChange={handleChange('length')}
                label="Time"
                variant="outlined"
            />
        </>
    );
};
