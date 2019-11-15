import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    TextField,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    exerciseHeader: {
        marginBottom: 20,
        width: '100%',
        textAlign: 'center',
    },
    inputHeaders: {
        marginBottom: 10,
        width: '100%',
        textAlign: 'center',
    },
    inputs: {
        marginBottom: 20,
    },
}));

export default (props) => {

    const classes = useStyles();

    const [value, setValue] = useState({ reps: '', length: '' });

    const handleChange = (type) => event => {
        if (type === 'reps') {
            return setValue({ ...value, reps: event.target.value });
        }
        return setValue({ ...value, length: event.target.value });
    };

    return (
        <>
            <Typography className={classes.exerciseHeader} >
                {props.routine.title}
            </Typography>
            
            <Typography className={classes.inputHeaders} >
                Reps
            </Typography>
            <TextField
                className={classes.inputs}
                value={value.reps}
                label="reps"
                onChange={handleChange('reps')}
            />

            <Typography className={classes.inputHeaders} >
                Length
            </Typography>
            <TextField
                className={classes.inputs}
                value={value.length}
                label="length"
                onChange={handleChange('length')}
            />
        </>
    );
};
