import React from 'react';

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
        if (type === 'Reps') {
            return props.handleChange('Reps', value, props.title);
        }

        return props.handleChange('Length', value, props.title);
    };

    return (
        <>
            <Typography
                className={classes.exerciseHeader}
                color="primary"
            >
                {props.title}
            </Typography>

            <Divider className={classes.dividers} />
            
            <Typography className={classes.inputHeaders} >
                Reps In Total
            </Typography>
            <TextField
                className={classes.inputs}
                value={props.info.Reps}
                onChange={handleChange('Reps')}
                label="Total"
                variant="outlined"
            />

            <Typography className={classes.inputHeaders} >
                Length X Minutes
            </Typography>
            <TextField
                className={classes.inputs}
                value={props.info.Length}
                onChange={handleChange('Length')}
                label="Time"
                variant="outlined"
            />
        </>
    );
};
