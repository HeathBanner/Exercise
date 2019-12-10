import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Drawer,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Icon,
} from '@material-ui/core';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    links: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'none',
            color: 'inherit',
        },
    },
});

const navList = [
    {
        text: 'Home',
        icon: 'home',
        link: '/',
    },
    {
        text: 'Routines',
        icon: 'accessibility',
        link: '/myroutines',
    },
    {
        text: 'Workout Log',
        icon: 'assignment',
        link: '/workoutlog',
    },
    {
        text: 'Progress',
        icon: 'trending_up',
        link: '/progress',
    },
    {
        text: 'Goal',
        icon: 'emoji_events',
        link: '/goal'
    }
];

export default () => {

    const classes = useStyles();

    const [state, setState] = useState(false);

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    return (
        <div>

            <Button onClick={toggleDrawer(true)}>
                <Icon style={{ color: 'white' }}>
                    menu
                </Icon>
            </Button>
            <Drawer open={state} onClose={toggleDrawer(false)}>
                <div
                    className={classes.fullList}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {navList.map((item) => (
                            <a
                                className={classes.links}
                                href={item.link}
                                key={item.text}
                            >
                                <ListItem button>
                                    <ListItemIcon>
                                        <Icon>
                                            {item.icon}
                                        </Icon>
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            </a>
                        ))}
                    </List>
                </div>

            </Drawer>

        </div>
    );
};
