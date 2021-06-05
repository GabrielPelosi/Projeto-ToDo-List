import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Task from './task';
import { TaskObject } from '../../../types/task';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton } from '@material-ui/core';
import NavBar from '../../navbar';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

const TaskList = () => {


    const tasks: TaskObject[] = [
        {
            id: 1,
            title: "Lavar Louça",
            description: "10/06/2021"

        },
        {
            id: 2,
            title: "Limpar o quintal",
            description: "11/06/2021"

        },
        {
            id: 3,
            title: "Passear com o cachorro",
            description: "14/08/2021"

        }
    ]
    const classes = useStyles();

    return (
        <>
        <NavBar/>
        <List className={classes.root}>
            <label className="m-2">Add task</label>
            <IconButton > <AddCircleOutlineIcon /> </IconButton>
            {
                tasks.map(task => (
                    <Task task={task} />
                ))}
        </List>
        </>
    );
}

export default TaskList;