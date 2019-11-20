import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    AppBar,
    Tabs,
    Tab,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));

export default (props) => {

    const classes = useStyles();

    const handleChange = (event, newValue) => props.handleChange(newValue);

    return (
        <AppBar position="static" color="default">
            <Tabs
                value={props.value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                <Tab label="Running" />
                <Tab label="Exercise" />
                <Tab label="Biking" />
            </Tabs>
        </AppBar>
    );
};
