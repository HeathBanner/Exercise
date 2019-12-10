import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Typography,
    Paper,
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
        if (!props.logs || props.data.current) return;
        getGains();
    }, [props])

    const getGains = () => {
        const { current } = props.logs;
        let currentTotal = 0;

        Object.entries(current).forEach(([key, value]) => {
            if (key === "date") return;
            if (current[key]) {
                currentTotal = currentTotal + value.totalCalories;
            }
        });

        props.handleData({
            last: null,
            workouts: null,
            current: { total: currentTotal }
        });
    };

    if (!props.data.current) return "";
    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <Typography className={classes.gainsHeader} variant="h6">
                    Calories Burned This Week:
                </Typography>

                <Typography>
                    0
                </Typography>

                <Icon>trending_flat</Icon>

                <Typography className={classes.gainsHeader} variant="h6">
                    Calories Burned Last Logged Week:
                </Typography>

                <Typography>
                    {props.data.current.total}
                </Typography>
            </Paper>

            <Paper className={classes.paper}>
                <Typography
                    className={classes.gainsHeader}
                    variant="h6"
                >
                    Gains
                </Typography>

                <Typography>
                    No Information Logged This Week
                </Typography>
            </Paper>
        </div>
    );
};
