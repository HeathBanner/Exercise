import React, { useEffect } from 'react';

import { routineTemplate } from '../WorkoutLog/ObjectTemplates/ToolTemplates';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Typography,
    Icon
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        padding: '10%'
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        padding: '10%',
        marginBottom: 30,
    },
    gainsHeader: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 20,
    },
    workoutContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20,
    }
}));

export default (props) => {

    const classes = useStyles();

    useEffect(() => {
        if (!props.logs.current || props.data.current) return;
        getGains();
    });

    const getGains = () => {
        const { current, last } = props.logs;

        let currentTotal = 0;
        let lastTotal = 0;
        let newList = { ...routineTemplate };
        console.log(newList);

        Object.entries(current).forEach(([key, value]) => {
            if (key === "date") return;
            if (current[key]) {
                currentTotal = currentTotal + value.totalCalories;
            }
            if (last[key]) {
                lastTotal = lastTotal + last[key].totalCalories;
            }

            if (!current[key] && !last[key]) return;
            if (current[key] && !last[key]) {
                return newList = UpperBodyOne(current[key].upperBody, "current", newList);
            }
            if (!current[key] && last[key]) {
                return newList = UpperBodyOne(last[key].upperBody, "last", newList);
            }

            return newList = UpperBodyUnion(current[key].upperBody, last[key].upperBody, newList);
        });

        props.handleData({
            current: { total: currentTotal },
            last: { total: lastTotal },
            workouts: { ...newList }
        });
    };

    const UpperBodyOne = (list, type, newList) => {
        Object.keys(list).forEach((key) => {
            if (key === "date" || key === "routine" || key === "calories") return;
            if (list[key] && type === "current") {
                if (!newList[key].Reps && !newList[key].Length) {
                    newList[key].Reps = list[key].reps;
                    return newList[key].Length = list[key].length;
                }
                newList[key].Reps += list[key].reps;
                return newList[key].Length += list[key].length;
            }
            if (list[key] && type === "last") {
                if (!newList[key].Reps && !newList[key].Length) {
                    newList[key].Reps = list[key].reps
                    return newList[key].Length = list[key].length;
                }
                newList[key].Reps -= list[key].reps
                return newList[key].Length -= list[key].length;
            }
        });

        return newList;
    };

    const UpperBodyUnion = (cList, pList, newList) => {
        Object.keys(cList).forEach((key) => {
            if (key === "date" || key === "routine" || key === "calories") return;

            if (cList[key] && pList[key]) {
                if (!newList[key].Reps && !newList[key].Length) {
                    newList[key].Reps = cList[key].reps - pList[key].reps
                    return newList[key].Length = cList[key].length - pList[key].length;
                }
                newList[key].Reps += cList[key].reps - pList[key].reps
                return newList[key].Length += cList[key].length - pList[key].length;
            }
            if (cList[key] && !pList[key]) {
                if (!newList[key].Reps && !newList[key].Length) {
                    newList[key].Reps += cList[key].reps
                    return newList[key].Length += cList[key].length;
                }
                newList[key].Reps += cList[key].reps
                return newList[key].Length += cList[key].length;
            }
            if (!cList[key] && pList[key]) {
                if (!newList[key].Reps && !newList[key].Length) {
                    newList[key].Reps = pList[key].reps
                    return newList[key].Length = pList[key].length;
                }
                newList[key].Reps += pList[key].reps
                return newList[key].Length += pList[key].length;
            }
        });

        return newList;
    };

    const IconGen = (item) => {
        const { current, last } = props.data;

        switch (true) {
            case last.total > current.total:
                return <Icon style={{ color: "red" }}>trending_down</Icon>;
            case last.total < current.total:
                return <Icon style={{ color: "green" }}>trending_up</Icon>;
            case item > 0:
                return <Icon style={{ color: "green" }}>trending_up</Icon>;
            case item < 0:
                return <Icon style={{ color: "red" }}>trending_down</Icon>;
            default:
                return <Icon>trending_flat</Icon>;
        }
    };

    const renderGains = () => {
        let arr = [];
        Object.entries(props.data.workouts).forEach(([key, value]) => {
            if (value.Reps) {
                if (value.Reps <= 0) return;
                arr.push(
                    <div key={key} className={classes.workoutContainer}>
                        <Typography>
                            {key}: +{value.Reps} Reps
                            </Typography>
                        <Icon>{IconGen(value.Reps)}</Icon>
                    </div>
                );
            }
            return;
        });

        return arr;
    };

    const renderLosses = () => {
        let arr = [];
        Object.entries(props.data.workouts).forEach(([key, value]) => {
            if (value.Reps) {
                if (value.Reps > 0) return;
                arr.push(
                    <div key={key} className={classes.workoutContainer}>
                        <Typography>
                            {key}: {value.Reps} Reps
                            </Typography>
                        <Icon>{IconGen(value.Reps)}</Icon>
                    </div>
                );
            }
            return;
        });

        return arr;
    };

    if (!props.data.current) return "";

    const gains = renderGains();
    const losses = renderLosses();

    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <Typography className={classes.gainsHeader} variant="h6">
                    Calories Burned This Week:
                </Typography>
                <Typography>
                    {props.data.current.total}
                </Typography>
                <Icon>{IconGen()}</Icon>

                <Typography className={classes.gainsHeader} variant="h6">
                    Calories Burned Last Week:
                </Typography>
                <Typography>
                    {props.data.last.total}
                </Typography>
            </Paper>

            <Paper className={classes.paper}>
                <Typography
                    className={classes.gainsHeader}
                    variant="h6"
                >
                    Gains
                </Typography>

                    {gains.length === 0 ? <Typography>No Gains This Week</Typography> : gains}
            </Paper>

            <Paper className={classes.paper}>
                <Typography
                    className={classes.gainsHeader}
                    variant="h6"
                >
                    Losses
                </Typography>

                    {losses.length === 0 ? <Typography>No Losses This Week</Typography> : losses}
            </Paper>
        </div>
    );
};
