import TaskForm from '../taskForm'


const createTask = () => {
    console.log("TEste")
}
const CreateTask = () => {
    return (
        <div>
            <TaskForm onClickButtonForm={createTask}/>
        </div>
    )
}

export default CreateTask
