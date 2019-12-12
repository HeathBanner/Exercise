import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Auth from './Auth';
import Menu from './Menu';
import Notification from '../Notifications/API';
import { PreSubmit, fetchAuth, InitInfo, InitNotify } from './Services/Services';

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

const Landing = ({ history }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [info, setInfo] = useState({ ...InitInfo });
    const [tab, setTab] = useState(0);
    const [notify, setNotify] = useState({ ...InitNotify });

    const handleInput = (type) => event => {
        setInfo({ ...info, [type]: event.target.value });
    };

    const handleSubmit = async (type) => {
        const flag = PreSubmit(info, type);

        if (flag.warning) return setNotify({ ...notify, ...flag });
        if (type === "signup") {
            const response = await fetchAuth(info, "register");

            if (response.success) {
                setInfo({ ...InitInfo });
                return setNotify({ ...notify, ...response });
            }

            return setNotify({ ...notify, ...response });
        }

        const obj = { username: info.username, password: info.password };
        const response = await fetchAuth(obj, "login");

        if (response.success) {
            dispatch({ type: "LOGIN" });
            setInfo({ ...InitInfo });
            return setNotify({ ...notify, ...response });
        }
        
        return setNotify({ ...notify, ...response });
    };

    const handleClose = () => {
        if (notify.success) return history.push("/");

        setNotify({ ...InitNotify });
    };

    const handleTabs = (event, value) => setTab(value);

    return (
        <Grid className={classes.container} item xs={12}>
            <Paper className={classes.paper}>

                <Menu tab={tab} handleTabs={handleTabs} />

                {tab === 0
                    ?
                    <Auth render={data => (
                        <>
                            {["username", "email", "password"].map((item) => {
                                return <TextField
                                    className={data.classes.fields}
                                    value={info[item]}
                                    onChange={handleInput(item)}
                                    label={item}
                                    type={item !== "password" ? "text" : data.show ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: item === "password" ? data.showButton(data.show, data.handleShow, data.handleDown) : ""
                                    }}
                                />;
                            })}
                            
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
                            {["username", "password"].map((item) => {
                                return <TextField
                                    className={data.classes.fields}
                                    value={info[item]}
                                    onChange={handleInput(item)}
                                    label={item}
                                    type={item !== "password" ? "text" : data.show ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: item === "password" ? data.showButton(data.show, data.handleShow, data.handleDown) : ""
                                    }}
                                />;
                            })}

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

export default withRouter(Landing);
