import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Tab,
    Tabs
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    tabPaper: {
        width: '100%'
    }
}));

export default ({ tab, handleTabs }) => {

    const classes = useStyles();

    return (
        <Paper className={classes.tabPaper}>
            <Tabs
                value={tab}
                onChange={handleTabs}
                centered
            >
                <Tab label="Sign Up" />
                <Tab label="Login" />
            </Tabs>
        </Paper>
    );
};
