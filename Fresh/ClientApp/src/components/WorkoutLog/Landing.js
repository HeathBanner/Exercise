import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import VerticalTabs from './VerticalTabs';
import LoggingTool from './LoggingTool';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: '100%',
        position: 'relative',
    },
}));

export default () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const reduxStore = useSelector(state => state);

    const [current, setCurrent] = useState(null);

    useEffect(() => {
        fetch('getworkout')
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                dispatch({
                    type: 'NEW',
                    payload: result
                });
                setCurrent({ ...result[0] });
            });
    }, [])

    const tabChange = (index) => setCurrent({ ...reduxStore.list[index] });

    return (
        <Grid className={classes.container} item xs={12}>

            <VerticalTabs
                list={reduxStore.list}
                tabChange={tabChange}
            />

            {current ? <LoggingTool routine={current} /> : ''}
        </Grid>
    );
};
