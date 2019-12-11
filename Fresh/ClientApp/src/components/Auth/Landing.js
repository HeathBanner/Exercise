import React, { useState } from 'react';

import Register from './Register';
import Menu from './Menu';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Paper,
    TextField,
    Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '10%',
        width: '100%',
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%'
    },
}));

const initState = {
    username: "",
    email: "",
    password: ""
};

export default () => {

    const classes = useStyles();

    const [info, setInfo] = useState({ ...initState });
    const [tab, setTab] = useState(0);

    const handleInput = (type) => event => {
        setInfo({ ...info, [type]: event.target.value });
    };

    const handleSubmit = (type) => {
        if (type === "login") return console.log(`User: ${info.username} is attempting to login`);
        console.log(`User: ${info.username} is attemping to sign up!`);
    };

    const handleTabs = (event, value) => setTab(value);

    return (
        <Grid className={classes.container} item xs={12}>
            <Paper className={classes.paper}>

                <Menu tab={tab} handleTabs={handleTabs} />

                {tab === 0
                    ?

                    <Register render={data => (
                        <>
                            <TextField
                                className={data.classes.fields}
                                value={info.username}
                                onChange={handleInput("username")}
                                label="username"
                            />

                            <TextField
                                className={data.classes.fields}
                                value={info.email}
                                onChange={handleInput("email")}
                                label="email"
                            />

                            <TextField
                                className={data.classes.fields}
                                value={info.password}
                                onChange={handleInput("password")}
                                type={data.show ? "text" : "password"}
                                label="password"
                                InputProps={{
                                    endAdornment: data.showButton(data.show, data.handleShow, data.handleDown)
                                }}
                            />

                            <Button
                                className={data.classes.button}
                                onClick={() => handleSubmit("signup")}
                            >
                                Submit
                        </Button>
                        </>
                    )} />

                    :

                    <Register render={data => (
                        <>
                            <TextField
                                className={data.classes.fields}
                                value={info.email}
                                onChange={handleInput("email")}
                                label="email"
                            />

                            <TextField
                                className={data.classes.fields}
                                value={info.password}
                                onChange={handleInput("password")}
                                type={data.show ? "text" : "password"}
                                label="password"
                                InputProps={{
                                    endAdornment: data.showButton(data.show, data.handleShow, data.handleDown)
                                }}
                            />

                            <Button
                                className={data.classes.button}
                                onClick={() => handleSubmit("login")}
                            >
                                Submit
                            </Button>
                        </>
                    )} /> }

            </Paper>
        </Grid>
    );
};
