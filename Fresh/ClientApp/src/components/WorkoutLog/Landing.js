import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import VerticalTabs from './VerticalTabs';
import LoggingTool from './LoggingTool';
import API from '../Notifications/API';

import { dateTemplate } from './ObjectTemplates/ToolTemplates';
import Template from '../../progressTemplate';

import { makeStyles } from '@material-ui/styles';
import { Grid, Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: '100%',
        position: 'relative',
        padding: '5%',
    },
    button: {
        width: '100%',
    }
}));

const initNotification = {
    error: false,
    success: false,
    warning: false,
    message: ""
};

export default () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const reduxStore = useSelector(state => state);

    const [current, setCurrent] = useState(null);
    const [notification, setNotification] = useState({ ...initNotification });

    useEffect(async() => {
        const res = await fetch('getworkout');
        const json = await res.json();
        console.log(json);
        dispatch({ type: 'NEW', payload: json });
        setCurrent({ ...json[0] });
    }, [])

    const tabChange = (index) => setCurrent({ ...reduxStore.list[index] });

    const handleChange = (type, value, title) => {
        let newList = current;
        console.log(type, value, title, newList);
        newList.upperBody[title][type] = value;
        setCurrent({ ...newList });
    };

    const handleClose = () => setNotification({ ...initNotification });

    const getCalories = () => {
        const weight = 165 / 2.2;
        const met = Template.HighGym;
        let burned;
        Object.keys(current.upperBody).forEach((key) => {
            if (!current.upperBody[key]) return;

            let energy = (0.0175 * met * weight);
            if (!burned) { return burned = energy * current.upperBody[key].length; }
            burned = burned + (energy * current.upperBody[key].length);
        });

        return Math.round(burned);
    };

    const getDate = () => {
        const today = new Date();

        return {
            Month: today.getMonth() + 1,
            Year: today.getFullYear(),
            Date: today.getDate(),
            Day: dateTemplate[today.getDay()]
            //Date: 12,
            //Day: "Thursday"
        };
    };

    const handleSubmit = async () => {
        const currentDate = getDate();
        const calories = getCalories();
        const newLog = {
            Username: 'Heath',
            CurrentWeek: currentDate,
            WeeklyStats: [
                {
                    [currentDate.Day]: {
                        UpperBody: {
                            ...current.upperBody,
                            Routine: current.title,
                            Calories: calories,
                            Date: currentDate
                        },
                        TotalCalories: calories,
                    },
                    Date: currentDate.Date
                }
            ]
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(newLog),
            headers: { 'Content-Type': 'application/json' }
        };

        const res = await fetch(`api/workoutlog/Heath`, options);
        const json = await res.json();

        if (json) {
            setNotification({ ...notification, success: true, message: 'Workout has been logged!' });
        }
    };

    return (
        <Grid className={classes.container} item xs={12}>
            <VerticalTabs
                list={reduxStore.list}
                tabChange={tabChange}
            />

            {current
                ?
            <LoggingTool routine={current} handleChange={handleChange} />
                :
            <CircularProgress />}

            <Button
                className={classes.button}
                onClick={handleSubmit}
            >
                Log Workout
            </Button>

            <API
                notification={notification}
                handleClose={handleClose}
            />
        </Grid>
    );
};
