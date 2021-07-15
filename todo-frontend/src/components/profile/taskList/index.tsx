import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Task from './task';
import {  TaskPage } from '../../../types/task';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton } from '@material-ui/core';
import NavBar from '../../navbar';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { BASE_URL } from '../../../utils/requests'
import axios from 'axios'
import Pagination from '../../pagination/index'
import {setupInterceptorsTo} from '../../../utils/axiosConfig'

setupInterceptorsTo(axios)

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

    const [activePAge, setActivePage] = useState(0);

    const changePage = (index: number) => {
        setActivePage(index);
    }

    const [page, setPage] = useState<TaskPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0,
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/tasks?page=${activePAge}&size=3`
        )
            .then(resp => {
                setPage(resp.data)
            }).catch(err => {
                console.log(err)
            });
    }, [activePAge]);

   
    const classes = useStyles();

    return (
        <>
            <NavBar />
            <List className={classes.root}>
                <label className="m-2">Add task</label>
                <Link to={"/create-task"}>
                    <IconButton >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Link>
                {
                    page.content?.map(task => (
                        <Task task={task} />
                    ))}
            </List>
            <Pagination page={page} onPageChange= {changePage}/>
        </>
    );
}

export default TaskList;