import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Menu,
    MenuItem,
    Paper,
    Typography,
    Button,
    Icon
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
    links: {
        width: '100%',
        textDecoration: 'none',
        color: 'inerit',
        '&:hover': {
            textDecoration: 'none',
            color: 'inherit',
        },
    },
    optionButtons: {
        position: 'absolute',
        top: '5%',
        right: '5%',
        minWidth: '0px',
        padding: '10px 0px 0px 0px',
    },
}));

export default (props) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles();
    const routine = props.routine;

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleDelete = () => {
        props.handleDelete(routine.title);
        handleClose();
    };

    return (
        <Paper className={classes.paper}>
            <a
                className={classes.links}
                href={`/myroutines/${routine.title}`}
            >
                <Typography>
                    {routine.title}
                </Typography>
            </a>

            <Button
                className={classes.optionButtons}
                onClick={handleMenu}
            >
                <Icon>
                    more_vert
                </Icon>
            </Button>

            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    Delete
                </MenuItem>
            </Menu>

            {Object.keys(routine.upperBody).map((key) => {
                return routine.upperBody[key] ?
                    <Typography key={key}>
                        {key}
                    </Typography>
                    :
                    ''
            })}
        </Paper>
    );
};
