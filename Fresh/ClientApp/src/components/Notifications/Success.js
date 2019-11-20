import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import {
    IconButton,
    Icon,
    Snackbar,
    SnackbarContent,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    success: {
        backgroundColor: green[600],
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

export default (props) => {

    const classes = useStyles();

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={props.success.open}
            autoHideDuration={6000}
            onClose={props.handleClose}
        >
            <SnackbarContent
                className={classes.success}
                message={
                    <span className={classes.message}>
                        <Icon>check_circle</Icon>
                        {props.success.message}
                    </span>
                }
                action={
                    <IconButton
                        key="close"
                        color="inherit"
                        onClick={props.handleClose}
                    >
                        <Icon>close</Icon>
                    </IconButton>
                }
            />
        </Snackbar>
    );
};
