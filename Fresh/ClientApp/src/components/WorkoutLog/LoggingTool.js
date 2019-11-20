import React, { useState, useEffect } from 'react';

import Logger from './Logger';
import Success from '../Notifications/Success';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Typography,
    Button,
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

    const [list, setList] = useState([...props.routine.exercise]);
    const [success, setSuccess] = useState({ open: false, message: '' });

    const handleChange = (type, value, index) => {
        let newList = list;
        list[index][type] = value;
        setList([ ...newList ]);
    };

    const handleSubmit = () => {
        let newLog = {
            Routine: props.routine.title,
            Exercise: [ ...list ],
        };
        console.log(newLog);
        fetch('api/workoutlog', {
            method: 'POST',
            body: JSON.stringify(newLog),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                setSuccess({ open: true, message: 'Workout has been logged!' });
            });
    };

    const handleClose = () => setSuccess({ open: false, message: '' });

    useEffect(() => {
        console.log(list);
    }, [list])

    return (
        <Paper className={classes.paper} >

            <Typography
                className={classes.routineHeader}
                variant="h5"
            >
                {props.routine.title}
            </Typography>

            {list.map((item, index) => {
                return <Logger
                    routine={item}
                    index={index}
                    handleChange={handleChange}
                />
            })}

            <Button
                className={classes.button}
                onClick={handleSubmit}
            >
                Log Workout
            </Button>

            <Success
                success={success}
                handleClose={handleClose}
            />

        </Paper>
    );
};
