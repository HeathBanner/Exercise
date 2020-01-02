import React, { useState, useEffect } from 'react';

import MenuTabs from './MenuTabs';
import ProgressChart from './ProgressChart';
import GainLoss from './GainLoss';
import Outdated from './Outdated';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#41B3A3',
    },
    header: {
        textAlign: 'center',
        width: '100%',
        marginTop: 40,
        marginBottom: 20,
        color: 'white',
    },
}));

const initState = {
    current: null,
    last: null
};

export default () => {

    const classes = useStyles();

    const [value, setValue] = useState(0);
    const [logs, setLogs] = useState({ ...initState, goal: null, outdated: false });
    const [data, setData] = useState({ ...initState, workouts: null });

    useEffect(() => {
        getLog();
    }, []);

    useEffect(() => {
        console.log(logs);
    }, [logs]);

    const checkDate = (json) => {
        const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const fnDate = new Date();
        const today = {
            year: fnDate.getFullYear(),
            month: fnDate.getMonth() + 1,
            date: fnDate.getDate(),
            day: week[fnDate.getDay() - 1]
        };
        console.log(today)
        const { year, month, date } = json.currentWeek;
        let flag = false;

        if (today.year === year && today.month === month && today.date === date) return false;
        if (today.year !== year) flag = true;
        if (today.month !== month) flag = true;
        if (today.date - week.indexOf(today.day) !== date) flag = true;

        console.log(today.date - week.indexOf(today.day));
        return flag;
    };

    const getLog = async () => {
        const res = await fetch(`api/workoutlog/username=Heath`);
        const json = await res.json();

        console.log(json);

        if (json) {
            const arrLength = json[0].weeklyStats.length - 1;

            if (checkDate(json[0])) {
                return setLogs({
                    current: json[0].weeklyStats[arrLength],
                    last: json[0].weeklyStats[arrLength - 1],
                    goal: json[0].goal,
                    outdated: true
                });
            }
            
            return setLogs({
                current: json[0].weeklyStats[arrLength],
                last: json[0].weeklyStats[arrLength - 1],
                goal: json[0].goal,
                outdated: false
            });
        }
    };

    const handleChange = (newValue) => setValue(newValue);
    const handleData = (newData) => setData({ ...newData });

    return (
        <Grid className={classes.container} item xs={12}>
            <MenuTabs handleChange={handleChange} value={value} />

            <Typography
                className={classes.header}
                variant="h5"
            >
                This Week
            </Typography>

            <ProgressChart logs={logs} data={data}/>

            {logs.outdated
                ?
            <Outdated
                handleData={handleData}
                logs={logs}
                data={data}
            />
                :
            <GainLoss
                handleData={handleData}
                logs={logs}
                data={data}
            />}

        </Grid>
    );
};
