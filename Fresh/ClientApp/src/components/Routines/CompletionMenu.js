import React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Typography,
    Modal,
    Backdrop,
    Fade
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
    },
}));

export default (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const routineSwitch = () => {
        props.handleBuilder(false);
        dispatch({ type: 'UPDATE' });
    };

    return (
        <Modal
            aria-labelledby="completion menu"
            aria-describedby="notify user of completion status"
            className={classes.modal}
            open={props.open}
            onClose={routineSwitch}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={props.open}>
                <Paper className={classes.paper}>
                    <Typography>
                        {props.message}
                    </Typography>
                </Paper>
            </Fade>
        </Modal>
    );
};
