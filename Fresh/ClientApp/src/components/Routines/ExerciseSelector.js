import React, { useState, useEffect } from 'react';

import RoutineList from './RoutineList.json';

import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import {
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
    Card,
    CardHeader,
    Divider,
    Button,
    Icon,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    list: {
        height: '40vh',
        overflow: 'auto',
    },
}));
//checked.rightChecked, left, "left"
const objConcat = (a, b, side) => {
    let newObj = { ...b };
    if (side === "left") {
        Object.keys(a).forEach((key) => {
            newObj[key] = { ...a[key] };
        });
    } else {
        Object.keys(a).forEach((key) => {
            newObj[key] = { ...a[key] };
        });
    }

    return newObj;
};

//left, checked.leftChecked
const sweep = (a, b) => {
    let newObj = { ...a };
    Object.keys(a).forEach((key) => {
        if (b[key]) delete newObj[key];
    });

    return newObj;
    //return a.filter((value) => {
    //    return !b.includes(value.title);
    //})
};

// Checked, Left, "Left"
const intersection = (a, b, side) => {
    let checkedList = {};
    if (side === 'left') {
        Object.keys(b).forEach((key) => {
            if (a.leftChecked[key]) return checkedList[key] = b[key];
        });
        //return b.filter((value) => {
        //    return a.leftChecked.indexOf(value.title) !== -1;
        //});
    } else {
        Object.keys(b).forEach((key) => {
            if (a.leftChecked[key]) return checkedList[key] = b[key];
        });
        //return b.filter((value) => {
        //    return a.rightChecked.indexOf(value.title) !== -1;
        //});
    }

    return checkedList;
};

//checked.rightChecked, left
const union = (a, b) => {
    let newObj = {};
    Object.keys(b).forEach((key) => {
        if (!a[key]) {
            return newObj[key] = { ...b[key] };
        }
    })
    return { ...a, ...newObj };
};

export default (props) => {

    const classes = useStyles();

    const [checked, setChecked] = useState({ leftChecked: {}, rightChecked: {} });
    const [left, setLeft] = useState({ ...RoutineList.routines });
    const [right, setRight] = useState({});

    useEffect(() => {
        console.log(left, right);
    }, [left, right]);

    const leftChecked = intersection(checked, left, 'left');
    const rightChecked = intersection(checked, right, 'right');

    const handleToggle = (key, side) => () => {
        const newChecked = { ...checked };

        if (side === 'left') {
            checked.leftChecked[key]
                ?
                delete newChecked.leftChecked[key]
                :
                newChecked.leftChecked[key] = { ...left[key] }
        } else {
            checked.rightChecked[key]
                ?
                delete newChecked.rightChecked[key]
                :
                newChecked.rightChecked[key] = { ...right[key] }
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (side) => {
        if (side === 'left') {
            return Object.keys(checked.leftChecked).length;
        } else {
            return Object.keys(checked.rightChecked).length;
        }
    };

    const handleToggleAll = (items, side) => () => {
        if (numberOfChecked(side) === Object.keys(items).length) {
            side === 'left'
            ?
                setChecked({ ...checked, leftChecked: {} })
            :
                setChecked({ ...checked, rightChecked: {} })
        } else {
            side === 'left'
            ?
            setChecked({ ...checked, leftChecked: union(checked.leftChecked, items) })
            :
            setChecked({ ...checked, rightChecked: union(checked.rightChecked, items) })
        }
    };

    const handleCheckedRight = () => {
        setRight(objConcat(checked.leftChecked, right, "right"));
        setLeft(sweep(left, checked.leftChecked));
        setChecked({
            ...checked,
            leftChecked: [],
        });
    };

    const handleCheckedLeft = () => {
        setLeft(objConcat(checked.rightChecked, left, "left"));
        setRight(sweep(right, checked.rightChecked));
        setChecked({
            ...checked,
            rightChecked: [],
        });
    };

    const customList = (title, items, side) => {
        return (
            <Card>
                <CardHeader
                    className={classes.cardHeader}
                    avatar={
                        <Checkbox
                            onClick={handleToggleAll(items, side)}
                            checked={numberOfChecked(side) === Object.keys(items).length && Object.keys(items).length !== 0}
                            disabled={items.length === 0}
                            inputProps={{ 'aria-label': 'all items selected' }}
                        />
                    }
                    title={title}
                    subheader={`${numberOfChecked(side)}/${Object.keys(items).length} selected`}
                />
                <Divider />
                <List
                    className={classes.list}
                    dense
                    component="div"
                    role="list"
                >

                    {Object.entries(items).map(([key, value]) => {
                        const labelId = `transfer-list-all-item-${key}-label`;

                        if (!key) { return; }

                        let focusList;
                        value.focus.forEach((item) => {
                            if (!focusList) { return focusList = `${item}, `; }
                            focusList += `${item}, `;
                        });

                        return (
                            <ListItem
                                key={key}
                                role="listitem"
                                button
                                onClick={handleToggle(key, side)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={
                                            side === 'left'
                                                ?
                                                Boolean(checked.leftChecked[key])
                                                :
                                                Boolean(checked.rightChecked[key])
                                        }
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    id={labelId}
                                    primary={key}
                                    secondary={focusList}
                                />
                            </ListItem>
                        );
                    })}
                    <ListItem />
                </List>
            </Card>
        );
    };

    return (
        <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <Grid item xs={12}>{customList('Choices', left, 'left')}</Grid>
            <Grid item xs={12}>
                <Grid container className={classes.buttonContainer}>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={Object.keys(leftChecked).length === 0}
                        aria-label="move selected right"
                    >
                        <Icon>expand_more</Icon>
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={Object.keys(rightChecked).length === 0}
                        aria-label="move selected left"
                    >
                        <Icon>expand_less</Icon>
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>{customList('Chosen', right, 'right')}</Grid>

            <Button
                onClick={() => props.ready ? props.handleNext() : props.updateExercise(right)}
                style={{
                    backgroundColor: props.ready ? green[600] : 'transparent',
                    width: '90%',
                    color: props.ready ? 'rgb(255, 255, 255, 0.8)' : '',
                }}
                disabled={Object.keys(right).length < 1}
            >
                <Typography>
                    {props.ready ? 'Next' : 'Done'}
                </Typography>
            </Button>
        </Grid>
    );
};
