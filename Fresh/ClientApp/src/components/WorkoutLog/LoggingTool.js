import React, { useState, useEffect } from 'react';

import Logger from './Logger';
import Success from '../Notifications/Success';
import Template from '../../progressTemplate';
import { dateTemplate, routineTemplate } from './ObjectTemplates/ToolTemplates';

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

    const [list, setList] = useState({ ...routineTemplate });
    const [success, setSuccess] = useState({ open: false, message: '' });

    const handleChange = (type, value, title) => {
        let newList = list;
        list[title][type] = value;
        setList({ ...newList });
    };

    const getCalories = () => {
        let weight = 165 / 2.2;
        let met = Template.HighGym;
        let burned;
        Object.keys(list).forEach((key) => {
            let energy = (0.0175 * met * weight);
            console.log(energy, list[key].Length);
            if (!burned) { return burned = energy * list[key].Length; }
            burned = burned + (energy * list[key].Length);
        });

        return Math.round(burned);
    };

    const getDate = () => {
        let today = new Date();

        return {
            Month: today.getMonth(),
            Year: today.getFullYear(),
            Date: today.getDate(),
            Day: dateTemplate[today.getDay()]
        };
    };

    const handleSubmit = () => {
        let currentDate = getDate();
        let newLog = {
            Username: 'Heath',
            CurrentWeek: currentDate,
            WeeklyStats: [
                {
                    [currentDate.Day]: {
                        UpperBody: {
                            ...list,
                            Routine: props.routine.title,
                            Calories: getCalories(),
                            Date: currentDate
                        },
                        TotalCalories: 2000
                    }
                }
            ]
        };
        console.log(newLog);
        fetch(`api/workoutlog/Heath`, {
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
    }, [list]);

    return (
        <Paper className={classes.paper} >

            <Typography
                className={classes.routineHeader}
                variant="h5"
            >
                {props.routine.title}
            </Typography>

            {Object.entries(list).map(([key, value], index) => {
                return (
                    <Logger
                        title={key}
                        info={value}
                        index={index}
                        handleChange={handleChange}
                        key={key}
                    />
                );
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
