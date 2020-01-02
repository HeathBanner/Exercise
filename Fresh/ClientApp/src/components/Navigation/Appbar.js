import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Auth from '../Auth/Landing';

import { makeStyles } from '@material-ui/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    useScrollTrigger,
    Slide,
    Button,
    Modal
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
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    auth: {
        position: 'absolute',
        right: 16,
        color: 'white'
    }
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

const isAuth = (store, classes, openModal) => {
    if (!store.loggedIn) {
        return (
            <Button
                className={classes.auth}
                onClick={openModal}
            >
                Login
            </Button>
        );
    }

    return (
        <Button
            className={classes.auth}
            onClick={openModal}
        >
            {store.user.username}
        </Button>
    );
}

export default (props) => {

    const classes = useStyles();
    const store = useSelector(state => state);

    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    return (
        <>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar className={classes.appbar}>
                    <Toolbar className={classes.toolbar} >
                        <Drawer />

                        <Typography
                            className={classes.title}
                            variant="h5"
                        >
                            Exercise App
                        </Typography>

                        { isAuth(store, classes, openModal) }
                    </Toolbar>

                </AppBar>
            </HideOnScroll>

            <Modal
                aria-labelledby="Login Register Panel"
                aria-describedby="Use this panel to login or register"
                open={open}
                onClose={closeModal}
            >
                <Auth />
            </Modal>
            <Toolbar />
        </>
    );
};
