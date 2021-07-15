import NavBar from '../../navbar'
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import {TaskObject, TaskRequest} from '../../../types/task'
import {useState} from 'react'
import axios from 'axios'
import history from '../../../utils/historyConfig'
import { BASE_URL } from '../../../utils/requests';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
); 


const UpdateTask = () => {
    const classes = useStyles();
    
    const [taskSate, setTaskState] = useState<TaskRequest>({
        title: "",
        description: ""
    });

    const onChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskState({...taskSate, [event.target.name]: event.target.value });
    }

    const onSubmit =  () => {
        
        axios.put(`${BASE_URL}/tasks/`,taskSate)
        .then(resp => {
            const dataResp = resp.data as TaskObject;
            history.push('/tasks')
            history.go(0)
        }).catch(err => {
            if(err.code === '400'){
                console.log(err)
            } 
        });
        
    }

    
    return (
        <>
            <NavBar />
            <form onSubmit={onSubmit}> 
                <h3>Update a Task</h3>
                <label></label>
                <div className="form-group m-1">
                    <label>Task Title</label>
                    <input onChange={onChange} id="title" name="title" type="text" className="form-control" placeholder="Title"></input>
                </div>

                <div className="form-group m-1">
                    <label>Task Description</label>
                    <input onChange={onChange} id="description" name="description" type="text" className="form-control" placeholder="Title"></input>
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}>
                    Save
                    
                </Button>
            </form>
        </>
    )
}

export default UpdateTask
