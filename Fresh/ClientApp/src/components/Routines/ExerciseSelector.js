import React, { useState } from 'react';

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

const not = (a, b) => {
    return b.filter((value, index) => {
        return a[index].title !== value.title;
    });
};

const sweep = (a, b) => {
    return a.filter((value) => {
        return !b.includes(value.title);
    })
};

const intersection = (a, b, side) => {
    if (side === 'left') {
        return b.filter((value) => {
            return a.leftChecked.indexOf(value.title) !== -1;
        });
    } else {
        return b.filter((value) => {
            return a.rightChecked.indexOf(value.title) !== -1;
        });
    }
};

const union = (a, b) => {
    let newArr = [];
    b.forEach((item) => {
        if (!a.includes(item.title)) {
            return newArr.push(item.title);
        }
    })
    return [...a, ...newArr];
};

export default (props) => {

    const classes = useStyles();

    const [checked, setChecked] = useState({ leftChecked: [], rightChecked: [] });
    const [left, setLeft] = useState([...RoutineList.routines]);
    const [right, setRight] = useState([]);

    const leftChecked = intersection(checked, left, 'left');
    const rightChecked = intersection(checked, right, 'right');

    const handleToggle = (value, side) => () => {
        const newChecked = { ...checked };

        if (side === 'left') {
            let currentTitle = left[value].title;
            checked.leftChecked.includes(currentTitle)
            ?
            newChecked.leftChecked.splice(newChecked.leftChecked.indexOf(currentTitle), 1)
            :
            newChecked.leftChecked.push(currentTitle)
        } else {
            let currentTitle = right[value].title;
            checked.rightChecked.includes(currentTitle)
            ?
            newChecked.rightChecked.splice(newChecked.rightChecked.indexOf(currentTitle), 1)
            :
            newChecked.rightChecked.push(currentTitle)
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items, side) => {
        if (side === 'left') {
            return checked.leftChecked.length;
        } else {
            return checked.rightChecked.length;
        }
    };

    const handleToggleAll = (items, side) => () => {
        if (numberOfChecked(items, side) === items.length) {
            side === 'left'
            ?
            setChecked({ ...checked, leftChecked: [] })
            :
            setChecked({ ...checked, rightChecked: [] })
        } else {
            side === 'left'
            ?
            setChecked({ ...checked, leftChecked: union(checked.leftChecked, items) })
            :
            setChecked({ ...checked, rightChecked: union(checked.rightChecked, items) })
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(sweep(left, checked.leftChecked));
        setChecked({
            ...checked,
            leftChecked: [],
        });
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
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
                            checked={numberOfChecked(items, side) === items.length && items.length !== 0}
                            disabled={items.length === 0}
                            inputProps={{ 'aria-label': 'all items selected' }}
                        />
                    }
                    title={title}
                    subheader={`${numberOfChecked(items, side)}/${items.length} selected`}
                />
                <Divider />
                <List
                    className={classes.list}
                    dense
                    component="div"
                    role="list"
                >

                    {items.map((value, index) => {
                        const labelId = `transfer-list-all-item-${value.title}-label`;

                        if (!value.title) { return; }

                        let focusList;
                        value.focus.forEach((item) => {
                            if (!focusList) { return focusList = `${item}, `; }
                            focusList += `${item}, `;
                        });

                        return (
                            <ListItem
                                key={value.title}
                                role="listitem"
                                button
                                onClick={handleToggle(index, side)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={
                                            side === 'left'
                                                ?
                                                checked.leftChecked.includes(value.title)
                                                :
                                                checked.rightChecked.includes(value.title)
                                        }
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    id={labelId}
                                    primary={value.title}
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
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        <Icon>expand_more</Icon>
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
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
                disabled={right.length < 1}
            >
                <Typography>
                    {props.ready ? 'Next' : 'Done'}
                </Typography>
            </Button>
        </Grid>
    );
};
