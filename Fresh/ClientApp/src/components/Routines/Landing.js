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

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: '#41B3A3',
        height: '100vh',
        overflowX: 'scroll',
        padding: '5%'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '10%',
        width: '100%'
    },
    buildButton: {
        width: '100%',
        marginTop: 20,
        padding: 15,
        backgroundColor: '#E8A87C',
        color: 'rgb(255, 255, 255)'
    }
}));

export default () => {

    const classes = useStyles();

    const reduxStore = useSelector(state => state);
    const dispatch = useDispatch();

    const [builder, setBuilder] = useState(false);
    const [confirmation, setConfirmation] = useState({ open: false, title: '' });
    const handleDelete = (title) => {
        setConfirmation({ open: true, title: title });
    }

    const handleDeleteRequest = async () => {
        const options = { method: 'DELETE' };
        const res = await fetch(`/getworkout/${confirmation.title}`, options);
        const json = await res.json();

        // Implement Error Catching

        fetchRoutines();
        setConfirmation({ open: false, title: '' });
    };

    useEffect(() => {
        if (reduxStore.loaded) { return console.log('BLOCKED'); }
        if (reduxStore.loaded && builder) { setBuilder(false); }
        fetchRoutines();
    }, [reduxStore]);

    const fetchRoutines = async () => {
        const res = await fetch('getworkout');
        const json = await res.json();
        
        if (!json[0]) return dispatch({ type: 'EMPTY' });

        dispatch({ type: 'NEW', payload: json });
    };

    const handleBuilder = (type) => setBuilder(type);

    if (!reduxStore.loaded) {
        return (
            <Grid className={classes.container} item xs={12}>
                <CircularProgress />
            </Grid>
        );
    }
    if (builder) {
        return <WorkoutBuilder handleBuilder={handleBuilder} />;
    }
    return (
        <Grid className={classes.container} item xs={12}>

            <Button
                className={classes.buildButton}
                onClick={() => setBuilder(true)}
            >
                <Typography>
                    Build New Workout
                </Typography>
            </Button>

            {reduxStore.empty ? '' : reduxStore.list.map((routine) => {

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
