import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { TaskObject } from '../../../../types/task'
import { IconButton  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Edit } from '@material-ui/icons';
import axios from 'axios'
import {setupInterceptorsTo} from '../../../../utils/axiosConfig'
import {BASE_URL} from '../../../../utils/requests'
import history from '../../../../utils/historyConfig'

setupInterceptorsTo(axios)

type Props = {
    task: TaskObject;
}

const Task = ({ task }: Props) => {

    const onClicDeletekButton = () => {
        console.log('teste', `${task.id}`)
        
        axios.delete(`${BASE_URL}/tasks/${task.id}`)
        .then(() =>{
            console.log('show resp msg')
            history.push('/tasks')
            history.go(0)
        }).catch(() =>{
            console.log('show error msg')
        })
        
    }

    return (
        <>
            <ListItem>
                <ListItemText primary={task.title} secondary={task.description} />
                <IconButton onClick={onClicDeletekButton} aria-label="delete"> <DeleteIcon/> </IconButton>
                <IconButton > <Edit/> </IconButton>
            </ListItem>
        </>
    )
}

export default Task
