import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Icon,
    InputAdornment,
    IconButton
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    formContainer: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%',
        padding: '10%',
    },
    header: {
        width: '100%',
        textAlign: 'center',
        color: '#41B3A3',
    },
    divider: {
        marginBlockStart: '0.5em',
        width: '60%',
        marginBottom: 20,
        backgroundColor: 'rgb(226, 124, 96, 0.5)'
    },
    fields: {
        width: '100%',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        marginTop: 20,
        padding: 10,
        color: 'white',
        backgroundColor: '#E27D60',
        transition: 'all 0.4s ease',
        '&:hover': {
            backgroundColor: '#E8A87C',
            color: 'white',
        }
    }
}));

const showButton = (show, handleShow, handleDown) => {
    return (
        <InputAdornment position="end">
            <IconButton
                onClick={handleShow}
                onMouseDown={handleDown}
            >
                <Icon>
                    {show ? "visibility_off" : "visibility"}
                </Icon>
            </IconButton>
        </InputAdornment>
    );
};

export default (props) => {

    const [show, setShow] = useState(false);

    const classes = useStyles();

    const handleShow = () => setShow(!show);
    const handleDown = (event) => event.preventDefault();

    const wrapper = {
        show: show,
        classes: classes,
        handleShow: handleShow,
        handleDown: handleDown,
        showButton: showButton
    };

    return (
        <div className={classes.formContainer}>
            {props.render(wrapper)}
        </div>
    );
};
