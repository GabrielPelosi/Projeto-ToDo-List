import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Task from './task';
import { TaskPage } from '../../../types/task';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton } from '@material-ui/core';
import NavBar from '../../navbar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../../utils/requests'
import axios from 'axios'
import Pagination from '../../pagination/index'
import { setupInterceptorsTo } from '../../../utils/axiosConfig'
import history from '../../../utils/historyConfig'

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

    const [authState, setAuthState] = useState(false);


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
                setAuthState(true)
                setPage(resp.data)
            }).catch(err => {
                setAuthState(false)
                console.log(err)
            });
    }, [activePAge]);


    const onClickNotAuth = () => {
        history.push('/')
        history.go(0)
    }

    const classes = useStyles();

    if (authState === false) {
        return (
            <div>
                <h3>É preciso estar logado para acessar essa pagina D:</h3>
                <button onClick={onClickNotAuth} className="btn btn-primary btn-block m-1">
                    Clique aqui para ir até a pagina de login!
                </button>
            </div>
        )
    } else {
        return (
            <>
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
                <Pagination page={page} onPageChange={changePage} />
            </>
        );
    }
}

export default TaskList;