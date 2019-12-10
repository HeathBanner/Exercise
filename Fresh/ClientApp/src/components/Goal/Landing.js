import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Paper,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    TextField,
    CircularProgress,
    Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '10%',
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '10%',
        width: '100%',
    },
    goalHeader: {
        textAlign: 'center',
        marginBottom: 20,
    },
    formControl: {
        margin: 10,
        width: '100%',
    },
    textField: {
        marginTop: 20,
        width: '100%',
    },
    progressDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: 40,
    },
    done: {
        color: '#18990c'
    },
    save: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
    }
}))

export default () => {

    const classes = useStyles();

    const [goal, setGoal] = useState({ type: "", target: "" });

    const handleChange = (event) => setGoal({ ...goal, type: event.target.value });
    const handleInput = (event) => setGoal({ ...goal, target: event.target.value });
    const onSubmit = async () => {
        const options = {
            method: 'POST',
            body: JSON.stringify(goal),
            headers: { "Content-Type": "application/json" }
        };
        const res = await fetch('api/workoutlog/goal', options);
        const json = await res.json();

        if (json) console.log(json);
    };

    const getProgress = () => {
        if (goal.type && goal.target) return 100;
        if (goal.type) return 50;
        return 20;
    };

    return (
        <Grid className={classes.container} item xs={12}>
            <Paper className={classes.paper}>
                <Typography className={classes.goalHeader}>
                    Select what goal you'd like reach each week
                </Typography>

                <FormControl className={classes.formControl}>
                    <InputLabel>Goal</InputLabel>
                    <Select onChange={handleChange}>
                        <MenuItem value="Reps">Reps</MenuItem>
                        <MenuItem value="Calories">Calories</MenuItem>
                        <MenuItem value="Weight">Weight</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    className={classes.textField}
                    label={goal.type}
                    value={goal.target}
                    onChange={handleInput}
                />
            </Paper>

            <div className={classes.progressDiv}>
                <CircularProgress
                    className={goal.type && goal.target ? classes.done : classes.inProgress}
                    value={getProgress()}
                    variant="static"
                    size={80}
                    color="secondary"
                />

                <Button
                    className={classes.save}
                    onClick={onSubmit}
                >
                    Done
                </Button>
            </div>
        </Grid>
    );
};
