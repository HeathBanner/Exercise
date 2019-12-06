import React, { useState, useEffect } from 'react';

import {
    Paper,
    Typography,
    Icon
} from '@material-ui/core';

export default (props) => {

    const [values, setValues] = useState({ current: null, last: null });

    useEffect(() => {
        if (!props.logs || values.current) return;
        getGains();
    });

    const getGains = () => {
        const { current, last } = props.logs;

        let currentTotal = 0;
        let lastTotal = 0;
        Object.entries(current).forEach(([key, value]) => {
            console.log(last[key], value);
            if (key === "date") return;
            if (current[key]) currentTotal = currentTotal + value.totalCalories;
            if (last[key]) lastTotal = lastTotal + last[key].totalCalories;
        });

        setValues({ current: currentTotal, last: lastTotal });
    };

    const IconGen = () => {
        const { current, last } = values;
        switch (true) {
            case last > current:
                return "trending_down";
            case last < current:
                return "trending_up";
            default:
                return "trending_flat";
        }
    };

    if (!values.current) return "";
    return (
        <Paper>
            <Typography>
                Calories Burned This Week:
            </Typography>
            <Typography>
                {values.current}
            </Typography>
            <Icon>{IconGen()}</Icon>

            <Typography>
                Calories Burned Last Week:
            </Typography>
            <Typography>
                {values.last}
            </Typography>
        </Paper>
    );
};
