import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Typography,
    Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        height: '100vh',
        padding: '15% 25%',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'none',
            color: 'inherit',
        },
    },
}));

export default () => {

    const classes = useStyles();

    return (
        <Grid
            className={classes.container}
            item
            xs={12}
        >

            <Typography
                style={{ width: '100%' }}
                variant="h4"
                align="center"
            >
                Follow our routines or create your own!
            </Typography>

            <a
                className={classes.link}
                href="/routines"
            >
                <Button>
                    <Typography>
                        Click here to begin
                    </Typography>
                </Button>
            </a>

        </Grid>
    );
};