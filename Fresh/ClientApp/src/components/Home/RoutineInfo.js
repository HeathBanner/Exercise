import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Typography,
    Button,
    Paper
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        padding: '15% 5%',
        backgroundColor: '#41B3A3'
    },
    paper: {
        padding: '10%',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyItems: 'center',
        flexWrap: 'wrap',
        width: '90%'
    },
    header: {
        width: '100%',
        marginBottom: 20,
        color: '#85CDCA'
    },
    link: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'none',
            color: 'inherit',
        },
    },
    button: {
        width: '100%',
        padding: 10,
        color: 'white',
        backgroundColor: '#E8A87C'
    }
}));

export default () => {

    const classes = useStyles();

    return (
        <Grid
            className={classes.container}
            item
            xs={12}
        >
            <Paper className={classes.paper}>
                <Typography
                    className={classes.header}
                    variant="h4"
                    align="center"
                >
                    Follow our routines or create your own!
                </Typography>

                <a className={classes.link} href="/routines">
                    <Button className={classes.button}>
                        <Typography>
                            Click here to begin
                        </Typography>
                    </Button>
                </a>
            </Paper>
        </Grid>
    );
};
