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
        margin: '10% 0%',
        width: '90%'
    },
    routineHeader: {
        marginBottom: 30,
        width: '100%',
        textAlign: 'center',
    },
    button: {
        width: '100%',
        marginTop: 10,
        padding: 15,
        backgroundColor: '#E27D60',
        color: 'white',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#E8A87C',
            color: 'white',
        },
    },
}));

export default (props) => {

    const classes = useStyles();

    return (
        <Paper className={classes.paper} >

            <Typography
                className={classes.routineHeader}
                variant="h5"
            >
                {props.routine.title}
            </Typography>

            {Object.entries(props.routine.upperBody).map(([key, value], index) => {
                if (!value) { return; }
                return (
                    <Logger
                        title={key}
                        info={value}
                        index={index}
                        handleChange={props.handleChange}
                        key={key}
                    />
                );
            })}

        </Paper>
    );
};
