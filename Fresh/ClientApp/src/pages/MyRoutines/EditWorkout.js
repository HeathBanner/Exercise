import React, {
    useEffect,
    useState,
} from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Typography,
    CircularProgress,
} from '@material-ui/core';

import Appbar from '../../components/Navigation/Appbar';

export default ({ match }) => {

    const [routines, setRoutines] = useState('');

    useEffect(() => {
        if (routines) { return; }
        fetch('getworkout')
            .then(res => res.json())
            .then((result) => {
                setRoutines([ ...result ]);
            });
    }, []);

    if (!routines) {
        return <CircularProgress />;
    }
    return (
        <Grid container>

            <Appbar />

            {routines.map((routine, index) => {
                return (
                    <Typography
                        key={index}
                    >
                        {routine.title}
                    </Typography>
                );
            })}
        </Grid>
    );
};
