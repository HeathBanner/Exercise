import React, { useState, useEffect } from 'react';

import Logger from './Logger';
import Success from '../Notifications/Success';
import Template from '../../progressTemplate';

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

    console.log(Date.now());

    const getCalories = () => {
        let weight = 165 / 2.2;
        let met = Template.HighGym;
        let burned;
        list.forEach((item) => {
            let energy = (0.0175 * met * weight);
            console.log(energy, item.length);
            if (!burned) { return burned = energy * item.length; }
            burned = burned + (energy * item.length);
        });

        return Math.round(burned);
    };

    const getDate = () => {
        const dateTemplate = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let today = new Date();

        return {
            Month: today.getMonth(),
            Year: today.getFullYear(),
            Date: today.getDate(),
            Day: dateTemplate[today.getDay()]
        };
    };

    const handleSubmit = () => {
        let newLog = {
            Routine: props.routine.title,
            Exercise: [...list],
            Calories: getCalories(),
            Date: getDate(),
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
