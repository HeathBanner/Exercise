import React, { useState } from 'react';

import MenuTabs from './MenuTabs';
import ProgressChart from './ProgressChart';

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

export default () => {

    const classes = useStyles();

    const [value, setValue] = useState(0);

    const handleChange = (newValue) => setValue(newValue);

    return (
        <Grid className={classes.container} item xs={12}>

            <MenuTabs handleChange={handleChange} value={value} />

            <Typography
                className={classes.header}
                variant="h5"
            >
                This Week
            </Typography>

            <ProgressChart />

        </Grid>
    );
};
