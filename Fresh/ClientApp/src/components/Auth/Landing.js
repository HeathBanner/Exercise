import React, { useState } from 'react';

import Auth from './Auth';
import Menu from './Menu';
import Notification from '../Notifications/API';
import { PreSubmit, Register } from './Services/Services';

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

const initInfo = {
    username: "",
    email: "",
    password: ""
};
const initNotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};

export default () => {

    const classes = useStyles();

    const [info, setInfo] = useState({ ...initInfo });
    const [tab, setTab] = useState(0);
    const [notify, setNotify] = useState({ ...initNotify });

    const handleInput = (type) => event => {
        setInfo({ ...info, [type]: event.target.value });
    };

    const handleSubmit = async (type) => {
        const flag = PreSubmit(info, type);

        if (flag.warning) return setNotify({ ...notify, ...flag });
        if (type === "signup") {
            const response = await fRegister(info);

            if (response.success) {
                setInfo({ ...initInfo });
                return setNotify({ ...notify, ...response });
            }

            return setNotify({ ...notify, ...response });
        }
        

    };

    const handleClose = () => setNotify({ ...initNotify });

    const handleTabs = (event, value) => setTab(value);

    return (
        <Grid className={classes.container} item xs={12}>
            <Paper className={classes.paper}>

                <Menu tab={tab} handleTabs={handleTabs} />

                {tab === 0
                    ?

                    <Auth render={data => (
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

                    <Auth render={data => (
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

            <Notification
                notification={notify}
                handleClose={handleClose}
            />
        </Grid>
    );
};
