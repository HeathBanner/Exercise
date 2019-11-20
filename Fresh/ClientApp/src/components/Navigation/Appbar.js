import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    useScrollTrigger,
    Box,
    Container,
    Slide,
} from '@material-ui/core';

import Drawer from './Drawer';

const useStyles = makeStyles((theme) => ({
    title: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    appbar: {
        backgroundColor: '#E27D60',
    },
}));

const HideOnScroll = (props) => {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

HideOnScroll.propTypes = {
    children: PropTypes.node.isRequired,
    window: PropTypes.func,
};

export default (props) => {

    const classes = useStyles();

    return (
        <Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar className={classes.appbar}>
                    <Toolbar>
                        <Drawer />
                        <Typography
                            className={classes.title}
                            variant="h5"
                        >
                            Exercise App
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </Fragment>
    );
};
