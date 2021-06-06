import NavBar from '../../navbar'
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);


const TaskForm = () => {
    const classes = useStyles();
    return (
        <>
            <NavBar />
            <form >
                <h3>Create new Task</h3>
                <div className="form-group m-1">
                    <label>Task Title</label>
                    <input type="text" className="form-control" placeholder="Title"></input>
                </div>

                <div className="form-group m-1">
                    <label>Task Description</label>
                    <input type="text" className="form-control" placeholder="Title"></input>
                </div>

                <div className="form-group m-1">
                    <label>Task Deadline</label>
                    <input type="date" className="form-control" placeholder="Title"></input>
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

export default TaskForm
