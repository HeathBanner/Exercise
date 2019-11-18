import React, {
    useState,
    useEffect,
} from 'react';

import ExerciseSelector from './ExerciseSelector';
import Sliders from './Sliders';
import CompletionMenu from './CompletionMenu';

import { makeStyles } from '@material-ui/styles';
import {
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
    },
    paper: {
        position: 'relative',
        width: '90%',
        padding: '5%',
        marginTop: 20,
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
    },
    textFields: {
        marginBottom: 20,
        width: '100%',
        textAlign: 'center',
    },
    goals: {
        width: '100%',
        marginTop: 40,
    },
    divider: {
        marginBlockStart: '0.5em',
        width: '100%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
        marginBottom: 40,
    },
}));

const initRoutine = {
    title: '',
    exercise: [],
    ready: false,
};

export default (props) => {

    const classes = useStyles();

    const [routine, setRoutine] = useState({ ...initRoutine });
    const [step, setStep] = useState(0);
    const [completion, setCompletion] = useState({ message: '', open: false });

    useEffect(() => {
        console.log('Updated');
    });

    const handleInput = (section) => event => {
        setRoutine({ ...routine, [section]: event.target.value });
    };

    const updateExercise = (newList) => {
        setRoutine({ ...routine, exercise: [...newList], ready: true });
    };

    const updateSliders = (value, type, index) => {
        const newExercise = [ ...routine.exercise ];
        newExercise[index][type] = value;

        setRoutine({ ...routine, ...newExercise });
    };

    const handleNext = () => {
        if (step > 1) { return; }
        setStep(step + 1);
    };

    const preSubmit = () => {
        switch (true) {
            case routine.title:
                return console.log('No Title!');
            case routine.exercise.length < 1:
                return console.log('No exercises chosen!');
            default:
                handleSubmit();
        }
    };

    const handleSubmit = () => {
        fetch('getworkout', {
            method: 'POST',
            body: JSON.stringify({
                Title: routine.title,
                Exercise: routine.exercise,
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then((result) => {
                setCompletion({
                    message: 'Routine has been saved!',
                    open: true
                });
            });
    };

    if (step === 0) {
        return (
            <Grid className={classes.container} item xs={12}>
                <Paper className={classes.paper}>
                    <TextField
                        className={classes.textFields}
                        label="Routine Name"
                        value={routine.title}
                        onChange={handleInput('title')}
                    />

                    <ExerciseSelector
                        updateExercise={updateExercise}
                        ready={routine.ready}
                        handleNext={handleNext}
                    />
                </Paper>
            </Grid>
        );
    }
    return (
        <Grid className={classes.container} item xs={12}>

            {routine.exercise.map((item, index) => {
                return (
                    <Paper key={item.title} className={classes.paper}>
                        <Typography>
                            {item.title}
                        </Typography>

                        <Sliders
                            typeOne="Reps"
                            typeTwo="Length"
                            updateSliders={updateSliders}
                            index={index}
                            exercise={item}
                        />
                    </Paper>
                );
            })}
            <Button
                onClick={preSubmit}
            >
                <Typography>
                    Save Workout
                </Typography>
            </Button>

            <CompletionMenu
                message={completion.message}
                open={completion.open}
                handleBuilder={props.handleBuilder}
            />
        </Grid>
    );
};
