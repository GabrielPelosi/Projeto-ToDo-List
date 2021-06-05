import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { TaskObject } from '../../../../types/task'
import { IconButton  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Edit } from '@material-ui/icons';

type Props = {
    task: TaskObject;
}

const Task = ({ task }: Props) => {
    return (
        <>
            <ListItem>
                <ListItemText primary={task.title} secondary={task.description} />
                <IconButton aria-label="delete"> <DeleteIcon/> </IconButton>
                <IconButton > <Edit/> </IconButton>
            </ListItem>
        </>
    )
}

export default Task
