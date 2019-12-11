import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Divider,
    Typography,
    CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        padding: '10%'
    },
    goalHeader: {
        width: '100%',
        textAlign: 'center',
        color: 'white',
    },
    divider: {
        marginBlockStart: '0.5em',
        width: '60%',
        backgroundColor: 'rgb(255, 255, 255, 0.2)',
        marginBottom: 20,
    },
    goalContainer: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    circleNum: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        padding: '10%',
        marginBottom: 30,
    },
    gainsHeader: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 20,
    },
    outdated: {
        color: 'gray'
    },
}));

export default (props) => {

    const classes = useStyles();

    const getProgress = () => {
        const target = parseInt(props.logs.goal.target);
        const current = props.data.current.total;

        const diff = (target - current) / target;
        const result = 100 - Math.round(diff * 100);

        if (result > 100) return 100;
        return Math.round(result);
    };

    if (!props.data.current) return "";
    return (
        <div className={classes.container}>
            <Typography
                className={classes.goalHeader}
                variant="h5"
            >
                Goal
            </Typography>

            <Divider className={classes.divider} />

            <Typography
                variant="h6"
                className={classes.goalHeader}
            >
                {props.logs.goal.type}
            </Typography>

            <Typography
                variant="h6"
                className={classes.goalHeader}
            >
                {props.logs.goal.target}
            </Typography>

            <div className={classes.goalContainer}>
                <CircularProgress
                    className={props.logs.outdated ? classes.outdated : ""}
                    variant="static"
                    color="secondary"
                    value={props.logs.outdated ? 100 : getProgress()}
                    size={100}
                />

                <Typography
                    variant="h6"
                    className={classes.circleNum}
                >
                    {props.logs.outdated
                        ?
                        0
                        :
                    getProgress()}%
                </Typography>

            </div>
        </div>
    );
};
