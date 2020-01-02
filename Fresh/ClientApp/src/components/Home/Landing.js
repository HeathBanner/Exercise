import React from 'react';
import { useSelector } from 'react-redux';

import Quotes from './Services/Quotes.json';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        position: 'relative',
        height: '100vh',
        backgroundColor: '#41B3A3',
    },
    motivate: {
        padding: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
    },
    divider: {
        marginBlockStart: '0.5em',
        marginBottom: 20,
        width: '60%',
        backgroundColor: 'rgb(255, 255, 255, 0.2)',
    },
    text: {
        width: '100%',
        color: 'white'
    }
}));

export default () => {

    const classes = useStyles();
    const store = useSelector(state => state);
    const rng = Math.floor(Math.random() * Math.floor(21));

    const renderQuote = () => Quotes.quotes[rng].quote;
    const renderAuthor = () => Quotes.quotes[rng].author;

    return (
        <Grid
            className={classes.container}
            item
            xs={12}
        >
            <div className={classes.motivate}>
                <Typography
                    className={classes.text}
                    variant="h4"
                    align="center"
                >
                    Get Motivated!
                </Typography>

                <Divider className={classes.divider} />

                <Typography
                    className={classes.text}
                    variant="h6"
                    align="center"
                >
                    "{renderQuote()}"
                </Typography>

                <Typography
                    style={{ marginTop: 20 }}
                    className={classes.text}
                    variant="h6"
                    align="center"
                >
                    - {renderAuthor()}
                </Typography>
            </div>
        </Grid>
    );
};
