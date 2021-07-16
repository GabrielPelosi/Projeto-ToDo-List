import NavBar from '../../navbar'
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import {TaskObject, TaskRequest} from '../../../types/task'
import {useState} from 'react'
import axios from 'axios'
import history from '../../../utils/historyConfig'
import { BASE_URL } from '../../../utils/requests';
import {setupInterceptorsTo} from '../../../utils/axiosConfig'
import Alert from '@material-ui/lab/Alert';

setupInterceptorsTo(axios)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
); 


const CreateTask = () => {
    const classes = useStyles();
    
    const [errorState, setErrorState] = useState<Boolean>(false)


    const [taskSate, setTaskState] = useState<TaskRequest>({
        title: "",
        description: ""
    });

    const onChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskState({...taskSate, [event.target.name]: event.target.value });
        console.log(taskSate)
    }

    const onSubmit =  (event : any) => {
        
        event.preventDefault();
        axios.post(`${BASE_URL}/tasks`,
        taskSate)
        .then(resp => {
            const dataResp = resp.data as TaskObject;
            history.push('/tasks')
            history.go(0)
        }).catch(err => {
            setErrorState(true)
        });
    }

    
    return (
        <>
            <NavBar />
            <form> 
                {errorState ? <Alert severity="error">Titulo e descrição devem estar preenhidas!</Alert>: <div></div>}
                <h3>Create new Task</h3>
                <div className="form-group m-1">
                    <label>Task Title</label>
                    <input onChange={onChange} required id="title" name="title" type="text" className="form-control" placeholder="Title" pattern="[A-Za-z0-9]{1,90}"></input>
                </div>

                <div className="form-group m-1">
                    <label>Task Description</label>
                    <input onChange={onChange} required id="description" name="description" type="text" className="form-control" placeholder="Title"pattern="[A-Za-z0-9]{1,150}"></input>
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}>
                    Save
                    
                </Button>
            </form>
        </>
    )
}

export default CreateTask
