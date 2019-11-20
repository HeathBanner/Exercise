import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    IconButton,
    Tabs,
    Tab,
    Paper,
    Drawer,
    Icon,
    CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    button: {
        position: 'absolute',
        top: '0%',
        left: 0,
        padding: '15px 15px 15px 0px',
        color: '#E8A87C',
        '&:hover': {
            color: '#E8A87C',
        },
    },
}));

export default (props) => {

    const classes = useStyles();

    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.tabChange(newValue);
    };

    const toggleDrawer = (newState) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(newState);
    };

    return (
        <>
            <IconButton
                className={classes.button}
                onClick={toggleDrawer(true)}
            >
                <Icon>arrow_forward_ios</Icon>
            </IconButton>

            <Drawer
                variant="persistent"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{ style: { top: 0, position: 'absolute' } }}
            >
                <Paper className={classes.root}>
                    <IconButton
                        onClick={toggleDrawer(false)}
                    >
                        <Icon>arrow_back_ios</Icon>
                        Close
                    </IconButton>
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        className={classes.tabs}
                    >
                        {
                            !props.list
                                ?
                            <CircularProgress />
                                :
                            props.list.map((item, index) => {
                                return (
                                    <Tab
                                        label={item.title}
                                        index={index}
                                    />
                                );
                            })
                        }
                    </Tabs>
                </Paper>
            </Drawer>
        </>
    );
};
