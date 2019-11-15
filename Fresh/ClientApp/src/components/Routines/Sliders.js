import React, { Fragment } from 'react';

import Marks from './Marks';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Typography,
    Slider,
    Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '5%',
    },
    title: {
        width: '100%',
        marginTop: 20,
    },
    divider: {
        marginBlockStart: '0.5em',
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
        width: '60%',
    },
    sliders: {
        marginTop: 50,
    },
}));

export default (props) => {

    const classes = useStyles();

    const valueText = (type) => (event, value) => {
        if (value === props.exercise[type]) { return; }
        props.updateSliders(value, type, props.index);
    };

    return (
        <Fragment>
            <Typography
                className={classes.title}
            >
                {props.type}
            </Typography>

            <Divider className={classes.divder} />

            <Typography
                className={classes.title}
            >
                {props.typeOne}
            </Typography>

            <Slider
                className={classes.sliders}
                defaultValue={10}
                onChange={valueText(props.typeOne)}
                aria-labelledby={`${props.type}-slider`}
                step={5}
                marks={Marks(props.typeOne)}
                min={5}
                max={100}
                valueLabelDisplay="on"
            />

            <Typography
                className={classes.title}
            >
                {props.typeTwo}
            </Typography>

            <Slider
                className={classes.sliders}
                defaultValue={10}
                onChange={valueText(props.typeTwo)}
                aria-labelledby={`${props.type}-slider`}
                step={5}
                marks={Marks(props.typeTwo)}
                min={5}
                max={100}
                valueLabelDisplay="on"
            />
        </Fragment>
    );
};
