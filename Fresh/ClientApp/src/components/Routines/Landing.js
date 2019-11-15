import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import WorkoutBuilder from './WorkoutBuilder';
import RoutineRenderer from './RoutineRenderer';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Typography,
    Paper,
    CircularProgress,
    Button,
    Modal,
    Backdrop,
    Fade
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '10%',
        width: '90%',
    },
    buildButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'rgb(0, 0, 0, 0.8)',
        color: 'rgb(255, 255, 255, 0.8)',
    },
}));

export default () => {

    const classes = useStyles();

    const reduxStore = useSelector(state => state);
    const dispatch = useDispatch();

    const [routines, setRoutines] = useState({
        loaded: false,
        empty: false,
        builder: false
    });
    const [confirmation, setConfirmation] = useState({ open: false, title: '' });
    const handleDelete = (title) => {
        setConfirmation({ open: true, title: title });
    }

    const handleDeleteRequest = () => {
        fetch(`/getworkout/${confirmation.title}`, {
            method: 'DELETE',
        })
            .then(() => {
                dispatch({ type: 'NEW' });
                setConfirmation({ open: false, title: '' });
            });
    };

    useEffect(() => {
        console.log(confirmation);
    }, [confirmation]);

    useEffect(() => {
        if (routines.loaded && !reduxStore) { return console.log('BLOCKED'); }
        fetch('getworkout')
            .then(res => res.json())
            .then((result) => {
                if (!result[0]) {
                    return setRoutines({ ...routines, empty: true, loaded: true });
                }
                console.log('LOADED');
                dispatch({ type: 'LOADED' });
                setRoutines({ ...routines, list: [...result], loaded: true, builder: false });
            });
    }, [routines, reduxStore]);

    if (!routines.loaded) {
        return (
            <Grid className={classes.container} item xs={12}>
                <CircularProgress />
            </Grid>
        );
    }
    if (routines.builder) { return <WorkoutBuilder />; }
    return (
        <Grid className={classes.container} item xs={12}>

            <Button
                className={classes.buildButton}
                onClick={() => setRoutines({ ...routines, builder: true })}
            >
                <Typography>
                    Build New Workout
                </Typography>
            </Button>

            {routines.empty ? '' : routines.list.map((routine) => {

                return (
                    <RoutineRenderer
                        handleDelete={handleDelete}
                        routine={routine}
                        key={routine.title}
                    />
                );
            })}

            <Modal
                className={classes.modal}
                open={confirmation.open}
                onClose={() => setConfirmation({ open: false, title: '' })}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={confirmation.open}>
                    <Paper className={classes.paper}>
                        <Typography
                            style={{ width: '100%' }}
                        >
                            Are you sure?
                        </Typography>

                        <Button
                            onClick={handleDeleteRequest}
                        >
                            Delete
                        </Button>
                    </Paper>
                </Fade>
            </Modal>
        </Grid>
    );
};
